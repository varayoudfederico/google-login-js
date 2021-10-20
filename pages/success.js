import Head from "next/head";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";

const Success = ({ token }) => {
  const [decodedData, setDecodedData] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (token) setDecodedData(jwt_decode(token));

    console.log(decodedData);
  }, [token]);

  const logout = () => {
    console.log("Logout...");
    const redirect_uri = encodeURI(
      "https://idp-nextjs-test.netlify.app/api/auth/signout"
    );

    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=${redirect_uri}`;
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>Success | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Success</h1>
        <p>Token: {token}</p>
        <p>Sub: {decodedData?.sub}</p>
        <button className="btn-blue mt-16" onClick={() => logout()}>
          Logout
        </button>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    if (context.query.token) {
      const token = context.query.token;
      return {
        props: {
          token: token,
        },
      };
    } else {
      return {
        props: {
          token: null,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        err: "not_found",
      },
    };
  }
}

export default Success;
