import Head from "next/head";
import useIDP from "../hooks/useIDP";

const Home = () => {
  const { IDPlogin, decodedData } = useIDP();

  return (
    <>
      <Head>
        <title>IDP test</title>
      </Head>
      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">IDP Test</h1>
        <button className="btn-blue" onClick={() => IDPlogin()}>
          Login
        </button>
        {decodedData ? (
          <p>Hay usuario logueado: {decodedData.sub}</p>
        ) : (
          <p>No hay usuario logueado</p>
        )}
      </main>
    </>
  );
};

export default Home;
