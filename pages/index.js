import Head from "next/head";
import router from "next/router";
import useIDP from "../hooks/useIDP";

const Home = () => {
  const { login, logout, user } = useIDP();

  return (
    <>
      <Head>
        <title>IDP test</title>
      </Head>
      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">IDP Test</h1>

        {user ? (
          <>
            <p>Hay usuario logueado: {user.sub}</p>
            <button className="btn-blue" onClick={() => logout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p>No hay usuario logueado</p>
            <button className="btn-blue" onClick={() => login()}>
              Login
            </button>
          </>
        )}

        <button className="btn-blue" onClick={() => router.push("/store")}>
          Ir a Store test
        </button>
      </main>
    </>
  );
};

export default Home;
