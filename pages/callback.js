import Head from "next/head";

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";

const Callback = ({ code }) => {
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "JWT fefege...",
    };

    const grant_type = "authorization_code";
    const code = code;
    const redirect_uri =
      "https://idp-nextjs-test.netlify.app/api/auth/callback/idp";

    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token?grant_type=${grant_type}&code=${code}&redirect_uri=${redirect_uri}`;
    console.log(url);
    const res = await axios.post(url, { headers: headers });
    console.log(res.data);
  };

  return (
    <>
      <Head>
        <title>Callback | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Callback</h1>
        <p>Code: {code}</p>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const code = context.query.code;

    return {
      props: {
        code: code,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        code: "not_found",
      },
    };
  }
}

export default Callback;
