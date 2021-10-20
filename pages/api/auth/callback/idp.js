export default function handler(req, res) {
  try {
    const code = req.query.code;
    const encoded = Buffer.from(
      `${process.env.NEXT_PUBLIC_IDP_CLIENT_ID}:${process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET}`,
      "binary"
    ).toString("base64");

    fetch(
      `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token?grant_type=authorization_code&code=${code}&redirect_uri=https://idp-nextjs-test.netlify.app/api/auth/callback/idp`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const id_token = data.id_token || "";
        const access_token = data.access_token || "";
        const refresh_token = data.refresh_token || "";
        res.redirect(
          `/success?id_token=${id_token}&access_token=${access_token}&refresh_token=${refresh_token}`
        );
      });
  } catch (error) {
    res.status(500).json(error);
  }
}
