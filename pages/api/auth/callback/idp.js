export default function handler(req, res) {
  console.log(req.query);
  if (req.query.code) {
    res.writeHead(302, {
      Location:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      //add other headers here...
    });
    res.end();
  } else {
    res.status(200).json({ data: req.query });
  }
}
