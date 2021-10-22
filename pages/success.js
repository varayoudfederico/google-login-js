import Head from "next/head";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/dist/client/router";

const demoToken =
  "eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiMG9TM1o0dENkSEhmaTY4dWRja2NKZyIsInN1YiI6IjExMzAzNTI1NTUiLCJvcmciOiJUZWxlY29tIiwiYXVkaXRUcmFja2luZ0lkIjoiM2NlZjFjMTQtYmE0Ny00MzVlLWI4N2QtMjUwYTVhOTRhN2ExLTEwMzQ2ODciLCJzdWJuYW1lIjoiMTEzMDM1MjU1NSIsImlzcyI6Imh0dHBzOi8vaWRwc2VzaW9udC50ZWxlY29tLmNvbS5hcjo0NDMvb3BlbmFtL29hdXRoMi9jb252ZXJnZW50ZSIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwibm9uY2UiOiJNYWN5bW1sUmFhclg0c3F3NkJob0hPR3pqTGpqODlWVWo3c0Z1TnZFWVhBIiwic2lkIjoieUdpcmZvZjFKYVA4bGhwYlFldXFENjg4MmR0SWZEN3dHVzUxY3lOdElrcz0iLCJhdWQiOiJvaWRjLXBwZC10ZXN0IiwiY19oYXNoIjoiN3Q4SGZPUlR5RUE0Y2d2RmIxVmpEUSIsImFjciI6IjAiLCJvcmcuZm9yZ2Vyb2NrLm9wZW5pZGNvbm5lY3Qub3BzIjoib2N3Z09VMnlsQmQ2WHhSaWF2QWcwdjZuRjBBIiwic19oYXNoIjoiVVNMNlpSUG91S0VEandzWkdRUG9WdyIsImF6cCI6Im9pZGMtcHBkLXRlc3QiLCJhdXRoX3RpbWUiOjE2MzQ5MDk4NzUsInJlYWxtIjoiL2NvbnZlcmdlbnRlIiwicmVsYXRlZERhdGEiOnt9LCJleHAiOjE2MzQ5MTM0NzYsInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNjM0OTA5ODc2fQ.x3ceag0vMnbRJ2NJ3vpB0eb_zjwi2-Lh4UUDYrGteUzDWR97zfFOwWIOa9C-dhRTRfbktt4oPGDkOInmVOWH6RF4lR8WB3gEl6ocjMdvrRPrYJ-iziQ-01YWpjXfVKYnvRIEHXPiizb6krNqLongk3kyP-2UzXAzii0iA4MGM-E8oCNdmpt3QJ5yyRJjqWr3LiofMZgHp2XcBTRJueoO2WXclczDiWA82286-Y40L7Cf6hERJ6zZyy9m-eI1k499qT7PHiYZ4BjpEGv3mIOhgZTdKYelayYZqVPaOUqUGe4yrCJNLqTUW3V6L7zs7jywvMrLREz1Df6hRzsEJDpUKg";

/*
Tercer paso del flujo de IDP
Una vez que se obtienen los token de acceso y se guardaron en cookies desde el archivo idp.js, se redirecciona
a esta pagina.
Aca, se lee la informacion de estas cookies usando la libreria "cookie-cutter". Luego, se decodifica el token de ID
con la libreria "jwt-decode", y se guardan estos datos en el estado "decodedData". 
A modo de ejemplo, se muestra el dato "sub" en esta pagina, correspondiente al ID del usuario logueado.
Una vez que el usuario quiera cerrar sesion, presiona el boton Logout, el cual llama al endpoint de endSession (punto 
  7. de la documentacion).
*/

const Success = () => {
  const [decodedData, setDecodedData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // const id_token = cookieCutter.get("idp_id_token");
    const id_token = demoToken;
    const refresh_token = cookieCutter.get("idp_refresh_token");
    const access_token = cookieCutter.get("idp_access_token");

    console.log("ID TOKEN: ", id_token);
    console.log("REFRESH TOKEN: ", refresh_token);
    console.log("ACCESS TOKEN: ", access_token);

    if (id_token) {
      setDecodedData(jwt_decode(id_token));
    }
  }, []);

  useEffect(() => {
    console.log("Decoded JWT: ", decodedData);
    if (decodedData?.relatedData) {
      const relatedData = JSON.stringify(decodedData.relatedData);
      console.log("Related Data:", relatedData);
    }
  }, [decodedData]);

  const logout = () => {
    console.log("Logout...");
    const idToken = cookieCutter.get("idp_id_token") || "";
    const redirect_uri = encodeURI(
      "https://idp-nextjs-test.netlify.app/api/auth/signout"
    );
    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${idToken}&post_logout_redirect_uri=${redirect_uri}`;

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

export default Success;
