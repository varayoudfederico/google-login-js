export default function handler(req, res) {
  const callback = console.log(req.query);
  const code = req.query.code;
  fetch(
    `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token?grant_type=authorization_code&code=${code}&redirect_uri=https://idp-nextjs-test.netlify.app/api/auth/callback/idp`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic b2lkYy1wcGQtdGVzdDpUM2MwMjAyMV8=",
      },
      body: JSON.stringify(callback),
    }
  )
    .then((res) => res.json())
    .then((data) => res.status(200).json(data));
}
