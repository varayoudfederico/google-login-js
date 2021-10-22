import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import useIDP from "../hooks/useIDP";

const Success = () => {
  const { logout, user } = useIDP();

  return (
    <>
      <Head>
        <title>Success | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12 max-w-6xl flex flex-col">
        <h1 className="text-2xl font-bold pb-4">Logueo con exito!</h1>
        <p>
          <span className="font-bold">Sub:</span> {user?.sub}
        </p>
        <Link href="/">
          <a>
            <button className="btn-blue mt-16">Volver al inicio</button>
          </a>
        </Link>
        <button className="btn-blue mt-16" onClick={() => logout()}>
          Logout
        </button>
      </main>
    </>
  );
};

export default Success;
