import axios from "axios";
// import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const secret = "Fede";

export default async function handler(req, res) {
  const token = await getToken({ req, secret, encryption: false, raw: true });
  console.log("Tokenx   : ", JSON.stringify(token, null, 2));
  const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=https://idp-nextjs-test2.netlify.app/api/auth/signout`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Logout response: ", data);
  res.status(200).json(data);
}
