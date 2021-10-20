import axios from "axios";
// import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
const apiURL = process.env.API_URL;

const fetchAPI = async (token) => {
  const res = await axios.get(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

const fetchWithToken = async (req, res) => {
  const token = await getToken({ req, secret, encryption: false, raw: true });
  const { data } = await fetchAPI(token);
  res.status(200).json(data);
};

export default fetchWithToken;
