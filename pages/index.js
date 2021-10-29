import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

  const logout = async () => {
    const token = session.user?.id_token;
    if (token) await fetch(`api/logout?token=${token}`);
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
            <button className="btn-blue" onClick={() => signIn(["idp"])}>
              Ingresar
            </button>
            <button className="btn-blue" onClick={() => signIn(["google"])}>
              Google
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
            <Link href="/micuenta">
              <a>
                <button className="btn-blue">Ir a mi cuenta</button>
              </a>
            </Link>
            <Link href="/mcafee">
              <a>
                <button className="btn-blue">Ver McAfee</button>
              </a>
            </Link>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
