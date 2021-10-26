import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import useIDP from "../hooks/useIDP";

const Success = () => {
  const { logout, user } = useIDP();
  // const user = {
  //   at_hash: "R59adehxD0Ky6WYQ6u1u3Q",
  //   sub: "testidpperf3@fakemail.com",
  //   org: "Telecom",
  //   auditTrackingId: "dbd36a7c-0acd-4af2-81e3-4b07a79affbd-16417",
  //   subname: "testidpperf3@fakemail.com",
  //   iss: "https://idpsesiont.telecom.com.ar:443/openam/oauth2/convergente",
  //   tokenName: "id_token",
  //   nonce: "jLJOz5dnXr1L2QzJshw7wI0CA7pQfLQz_wzn4EArA1t",
  //   sid: "DXKl0b5fnbZiC7YzajI27CO90dOT2h88YfS763wlVOY=",
  //   aud: "oidc-ppd-test",
  //   c_hash: "HIBT8-ii7PqQUjwPmuha0A",
  //   acr: "0",
  //   "org.forgerock.openidconnect.ops": "hzPaEs3U4Yy0q_ugvadcst_Cj70",
  //   s_hash: "USL6ZRPouKEDjwsZGQPoVw",
  //   azp: "oidc-ppd-test",
  //   auth_time: 1635271071,
  //   realm: "/convergente",
  //   relatedData: {
  //     SUBSCRIBERID: ["3"],
  //     FLOWID: ["1100002"],
  //   },
  //   exp: 1635274783,
  //   tokenType: "JWTToken",
  //   iat: 1635271183,
  // };

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
            <div className="p-4 bg-gray-100 m-4 rounded-xl">
              {Object.entries(user).map(([key, value]) => {
                if (key !== "relatedData") {
                  return (
                    <p key={key}>
                      <span className="font-bold">{key}</span>: {value}
                    </p>
                  );
                } else {
                  return Object.entries(user.relatedData).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className="font-bold">{key}</span>: {value}
                      </p>
                    )
                  );
                }
              })}
            </div>
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
