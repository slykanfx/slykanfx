export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    /* ----------------------------------------
       SAFE BODY PARSE
    ---------------------------------------- */

    const body =
      typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const {
      name,
      email,
      work,
      message
    } = body;

    /* ----------------------------------------
       VALIDATION
    ---------------------------------------- */

    if (!name || !email || !work || !message) {

      return res.status(400).json({
        success: false,
        message: "Missing Fields"
      });
    }

    /* ----------------------------------------
       DISCORD
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
              name: "👤 Name",
              value: name,
              inline: true
            },

            {
              name: "📧 Email",
              value: email,
              inline: true
            },

            {
              name: "💼 Work",
              value: work,
              inline: false
            },

            {
              name: "📝 Message",
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
       WEB3FORMS
    ---------------------------------------- */

    const web3Response = await fetch(
      "https://api.web3forms.com/submit",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({

          access_key: process.env.WEB3FORMS_ACCESS_KEY,

          subject: "New Freelance Inquiry",

          from_name: "SlykanFx Portfolio",

          name: name,

          email: email,

          work: work,

          message: message

        })
      }
    );

    const web3Data = await web3Response.json();

    console.log("WEB3 RESPONSE:", web3Data);

    /* ----------------------------------------
       CHECK WEB3 STATUS
    ---------------------------------------- */

    if (!web3Data.success) {

      console.error("WEB3 ERROR:", web3Data);

      return res.status(500).json({
        success: false,
        message: "Web3Forms Failed"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}