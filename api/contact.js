export default async function handler(req, res) {

  /* ----------------------------------------
     ALLOW ONLY POST
  ---------------------------------------- */

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
       DISCORD WEBHOOK
    ---------------------------------------- */

    const discordResponse = await fetch(
      process.env.DISCORD_WEBHOOK_URL,
      {

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
      }
    );

    /* ----------------------------------------
       CHECK DISCORD STATUS
    ---------------------------------------- */

    if (!discordResponse.ok) {

      console.error(
        "DISCORD REQUEST FAILED:",
        discordResponse.status
      );

      return res.status(500).json({
        success: false,
        message: "Discord Webhook Failed"
      });
    }

    /* ----------------------------------------
       WEB3FORMS EMAIL
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

    /* ----------------------------------------
       CHECK WEB3 STATUS
    ---------------------------------------- */

    if (!web3Response.ok) {

      console.error(
        "WEB3FORMS REQUEST FAILED:",
        web3Response.status
      );

      return res.status(500).json({
        success: false,
        message: "Web3Forms Failed"
      });
    }

    /* ----------------------------------------
       SUCCESS
    ---------------------------------------- */

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully"
    });

  } catch (error) {

    console.error(
      "SERVER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}