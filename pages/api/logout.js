import axios from "axios";
// import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const secret = "Fede";

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  console.log("Tokenx   : ", JSON.stringify(token, null, 2));
  // const response = await fetch(url);
  // const data = await response.json();
  // console.log("Logout response: ", data);
  res.status(200).json(token);
}
