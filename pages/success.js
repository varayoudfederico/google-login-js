import Head from "next/head";

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";

const Success = ({ token }) => {
  return (
    <>
      <Head>
        <title>Callback | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Success</h1>
        <p>Token: {token}</p>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const token = context.query.token;

    return {
      props: {
        token: token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        token: "not_found",
      },
    };
  }
}

export default Success;
