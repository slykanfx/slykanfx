export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

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

    if (!name || !email || !work || !message) {

      return res.status(400).json({
        success: false,
        message: "Missing Fields"
      });
    }

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

    if (!discordResponse.ok) {

      return res.status(500).json({
        success: false,
        message: "Discord Failed"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}