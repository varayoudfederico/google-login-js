import Head from "next/head";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/dist/client/router";

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
    const id_token = cookieCutter.get("idp_id_token");
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
