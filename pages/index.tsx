import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log("Session: ", session);
    console.log("IDP Client ID: ", process.env.NEXT_PUBLIC_IDP_CLIENT_ID);
  }, [session]);

  const logout = async () => {
    // const token = session.user?.id_token;
    await fetch(`api/auth/logout`);
    signOut();
  };

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold">Login with next-auth</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
          <>
            <p>No hay usuario logueado</p>
            <button className="btn-blue" onClick={() => signIn("idp")}>
              IDP
            </button>
            <button className="btn-blue" onClick={() => signIn("google")}>
              Google
            </button>
          </>
        ) : (
          <>
            <p className="my-4 text-xl font-bold">Logueado!</p>
            <p>Name: {session.user?.name}</p>
            <p>SUB: {session.user?.sub}</p>
            <p>Type: {session.user?.type}</p>
            {session.user?.subscriberId ? (
              <p>SubscriberID: {session.user?.subscriberId}</p>
            ) : null}
            <button className="btn-blue" onClick={() => logout()}>
              Cerrar sesión
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
