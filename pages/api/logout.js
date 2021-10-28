import axios from "axios";
// import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const secret = "Fede";

export default async function handler(req, res) {
  const token = req.query.token;
  console.log("Tokenx   : ", token);
  const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=https://idp-nextjs-test2.netlify.app/api/auth/signout`;
  console.log("logout url: ", url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("Logout response: ", data);
  res.status(200).json(data);
}
