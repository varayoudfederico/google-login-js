import Head from "next/head";

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";

const Success = () => {
  return (
    <>
      <Head>
        <title>Callback | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Success</h1>
      </main>
    </>
  );
};

export default Success;
