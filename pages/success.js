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

      <main className="p-12 flex flex-col">
        {user ? (
          <>
            <h1 className="text-2xl font-bold pb-4">Login con exito!</h1>
            <p>
              <span className="font-bold">Sub:</span> {user?.sub}
            </p>
            <button className="btn-blue mt-16 w-32" onClick={() => logout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold pb-4">
              Hubo un error en el login
            </h1>
          </>
        )}

        <Link href="/">
          <a>
            <button className="btn-blue mt-16">Volver al inicio</button>
          </a>
        </Link>
      </main>
    </>
  );
};

export default Success;
