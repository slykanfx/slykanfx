export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const {
      name,
      email,
      work,
      message
    } = req.body;

    /* ----------------------------------------
       BASIC VALIDATION
    ---------------------------------------- */

    if (!name || !email || !work || !message) {

      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    /* ----------------------------------------
       SEND TO DISCORD
    ---------------------------------------- */

    await fetch(process.env.DISCORD_WEBHOOK_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        embeds: [{

          title: "📩 New Freelance Inquiry",

          color: 5814783,

          fields: [

            {
              name: "👤 Client",
              value: name,
              inline: true
            },

            {
              name: "📧 Email",
              value: email,
              inline: true
            },

            {
              name: "💼 Service",
              value: work,
              inline: false
            },

            {
              name: "📝 Project Details",
              value: message,
              inline: false
            }

          ],

          footer: {
            text: "SlykanFx Portfolio"
          },

          timestamp: new Date()

        }]
      })
    });

    /* ----------------------------------------
       SEND TO WEB3FORMS
    ---------------------------------------- */

    await fetch("https://api.web3forms.com/submit", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        access_key: process.env.WEB3FORMS_ACCESS_KEY,

        subject: "New Freelance Inquiry",

        from_name: "SlykanFx Portfolio",

        name,
        email,
        work,
        message

      })

    });

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}