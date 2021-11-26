import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const { id_token } = await getToken({
    req,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  });
  // console.log("Got token: ", id_token);
  const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${id_token}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
