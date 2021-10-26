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
            {user ? (
              <div key={idx} className="p-4 bg-gray-100 m-4 rounded-xl">
                {Object.entries(user).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-bold">{key}</span>: {value}
                  </p>
                ))}
              </div>
            ) : null}
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
