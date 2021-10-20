import Head from "next/head";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";

const Home = () => {
  //hook de next-auth para obtener los datos del usuario logueado
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  //metodo de ejemplo para pegarle a un endpoint que usa el token de login para autorizar
  const getData = async () => {
    try {
      const { data } = await axios.get("/api/fetchWithToken");
      console.log("Received data: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

  const IDPManualLogin = () => {
    console.log("Redirigiendo al IDP...");
    const clientId = "oidc-ppd-test";
    const redirectURI = encodeURI(
      "https://idp-nextjs-test.netlify.app/api/auth/callback/idp"
    );

    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=openid+profile&state=doeeHdmVTm67Am1oc3QXHyMQTKcMPoc2MqguEDqxZwE&nonce=MacymmlRaarX4sqw6BhoHOGzjLjj89VUj7sFuNvEYXA`;
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Login with next-auth</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
          <>
            <p>No hay usuario logueado</p>
            <button className="btn-blue" onClick={() => signIn(["google"])}>
              Login con Google
            </button>
            <button className="btn-blue" onClick={() => IDPManualLogin()}>
              Login con IDP
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-xl my-4">Logueado!</p>
            <p>Nombre: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
            <p>ID: {session.user?.id}</p>
            <button className="btn-blue" onClick={() => signOut()}>
              Logout
            </button>
            <button className="btn-blue" onClick={() => getData()}>
              Get Data
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
