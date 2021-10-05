import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

const Home = () => {
  const [session, loading] = useSession();

  console.log(process.env.NEXTAUTH_URL);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Login test with next-auth</h1>
        {!session ? (
          <>
            <p>Debe loguearse</p>
            <button onClick={() => signIn(["google"])}>Login con Google</button>
            <button onClick={() => signIn(["idp"])}>Login con IDP</button>
          </>
        ) : (
          <>
            <p>Logueado como: {session.user?.email}</p>
            <button onClick={() => signOut()}>Logout</button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
