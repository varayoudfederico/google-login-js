import Head from "next/head";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

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
            <button className="btn-blue" onClick={() => signIn(["idp"])}>
              Login con IDP
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-xl my-4">Logueado!</p>
            <p>Name: {session.user?.name}</p>
            {/* <p>SUB: {session.user?.sub}</p> */}
            <button className="btn-blue" onClick={() => signOut()}>
              Logout
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
