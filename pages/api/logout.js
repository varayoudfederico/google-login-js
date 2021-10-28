import axios from "axios";
// import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const secret = "Fede";
// const apiURL = process.env.API_URL;

// const fetchAPI = async (token) => {
//   const res = await axios.get(apiURL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res;
// };

// const logout = () => {
//   console.log("Logout...");
//   const idToken = cookieCutter.get("idp_id_token") || "";
//   deleteCookies();
//   setUser(null);
//   if (idToken) {
//     const redirect_uri = encodeURI(SIGNOUT_URI);
//     router.push(url);
//   } else {
//     router.push("/");
//   }
// };

export default async function handler(req, res) {
  const token = await getToken({ req, secret, encryption: false, raw: true });
  console.log("Token   : ", token);
  const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=https://idp-nextjs-test2.netlify.app/api/auth/signout`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Logout response: ", data);
  res.status(200).json(data);
}
