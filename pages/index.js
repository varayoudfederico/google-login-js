
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";


const Home = () => {
  const [session, loading] = useSession();


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
            <button onClick={() => signIn()}>Login</button>
          </>
        ) : (
          <>
            <p>Logueado como: {session.user?.email}</p>
            {/* <img src={session.user?.image} /> */}
            <button onClick={() => signOut()}>Logout</button>
            {/* {getToken} */}
          </>
        )}
        {/* <div>
          <h1>API Example</h1>
          <p>
            The examples below show responses from the example API endpoints.
          </p>
          <p>
            <em>You must be signed in to see responses.</em>
          </p>

          <h2>JSON Web Token</h2>
          <p>/api/examples/jwt</p>
          <iframe src="/api/examples/jwt" />
        </div> */}
      </main>
    </div>
  );
};

export default Home;
