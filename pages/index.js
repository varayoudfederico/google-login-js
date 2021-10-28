import Head from "next/head";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

  const getProducts = () => {
    console.log("Fetching productos...");
  };

  const logout = async () => {
    console.log("Logout...");
    const token = session.user?.id_token;
    if (token) {
      console.log("toke:", token);
      const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=https://idp-nextjs-test2.netlify.app/api/auth/signout`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("res", data);
      console.log("res", response);
    }

    // signOut();
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
            <button className="btn-blue" onClick={() => signIn(["idp"])}>
              Ingresar
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-xl my-4">Logueado!</p>
            <p>Name: {session.user?.name}</p>
            <p>SUB: {session.user?.sub}</p>
            <p>Type: {session.user?.type}</p>
            {session.user?.subscriberId ? (
              <p>SubscriberID: {session.user?.subscriberId}</p>
            ) : null}
            <button className="btn-blue" onClick={() => logout()}>
              Cerrar sesión
            </button>
            <button className="btn-blue" onClick={() => getProducts()}>
              Consulta productos
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
