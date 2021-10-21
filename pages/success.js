import Head from "next/head";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";

import { useRouter } from "next/dist/client/router";

const Success = () => {
  const [decodedData, setDecodedData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const id_token = cookieCutter.get("idp_id_token");

    if (id_token) {
      console.log("token from cookie", id_token);
      setDecodedData(jwt_decode(id_token));
    }
  }, []);

  // useEffect(() => {
  //   if (id_token) setDecodedData(jwt_decode(id_token));
  // }, [id_token]);

  useEffect(() => {
    console.log("Decoded JWT: ", decodedData);
  }, [decodedData]);

  const logout = () => {
    console.log("Logout...");

    const redirect_uri = encodeURI(
      "https://idp-nextjs-test.netlify.app/api/auth/signout"
    );
    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${cookieCutter.get(
      "idp_id_token"
    )}&post_logout_redirect_uri=${redirect_uri}`;

    router.push(url);
  };

  return (
    <>
      <Head>
        <title>Success | IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12 max-w-6xl flex flex-col">
        <h1 className="text-2xl font-bold pb-4">Success</h1>
        {/* <p>
          <span className="font-bold">ID Token:</span> {id_token}
        </p>
        <p>
          <span className="font-bold">Access Token:</span> {access_token}
        </p>
        <p>
          <span className="font-bold">Refresh Token:</span> {refresh_token}
        </p> */}
        <p>
          <span className="font-bold">Sub:</span> {decodedData?.sub}
        </p>
        <button className="btn-blue mt-16" onClick={() => logout()}>
          Logout
        </button>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    if (
      context.query.id_token &&
      context.query.access_token &&
      context.query.refresh_token
    ) {
      const id_token = context.query.id_token;
      const access_token = context.query.access_token;
      const refresh_token = context.query.refresh_token;
      return {
        props: {
          id_token: id_token,
          access_token: access_token,
          refresh_token: refresh_token,
        },
      };
    } else {
      return {
        props: {
          id_token: null,
          access_token: null,
          refresh_token: null,
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

// export async function getServerSideProps(context) {
//   try {
//     if (
//       context.query.id_token &&
//       context.query.access_token &&
//       context.query.refresh_token
//     ) {
//       const id_token = context.query.id_token;
//       const access_token = context.query.access_token;
//       const refresh_token = context.query.refresh_token;
//       return {
//         props: {
//           id_token: id_token,
//           access_token: access_token,
//           refresh_token: refresh_token,
//         },
//       };
//     } else {
//       return {
//         props: {
//           id_token: null,
//           access_token: null,
//           refresh_token: null,
//         },
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         err: "not_found",
//       },
//     };
//   }
// }

export default Success;
