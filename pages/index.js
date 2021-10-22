import Head from "next/head";
import useIDP from "../hooks/useIDP";

const Home = () => {
  const { IDPlogin, IDPlogout, decodedData } = useIDP();

  return (
    <>
      <Head>
        <title>IDP test</title>
      </Head>
      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">IDP Test</h1>

        {decodedData ? (
          <>
            <p>Hay usuario logueado: {decodedData.sub}</p>
            <button className="btn-blue" onClick={() => IDPlogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p>No hay usuario logueado</p>
            <button className="btn-blue" onClick={() => IDPlogin()}>
              Login
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
