import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

const Home = () => {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Login test with next-auth</h1>
        {!session ? (
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
            <p>Logueado!</p>
            <p>Email: {session.user?.email}</p>
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
