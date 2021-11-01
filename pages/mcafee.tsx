import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import useStore from "../hooks/useStore";

const MiCuenta = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { altaProducto, bajaProducto, result, error, fetching } = useStore();

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold">McAfee</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
          <>
            <p>Debe iniciar sesión para ver esta pagina</p>
          </>
        ) : (
          <>
            <p className="font-bold text-xl my-4">
              Landing McAfee
            </p>

            <Link href="/">
              <a>
                <button className="btn-blue">Volver</button>
              </a>
            </Link>

            <button className="btn-blue mb-8" onClick={() => altaProducto("test", "test")}>
              Dar alta
            </button>
            <button className="btn-blue mb-8" onClick={() => bajaProducto("test")}>
              Dar baja
            </button>
            {fetching ? <p>Procesando...</p> : null}
            {error ? (
              <p className="text-lg p-4 m-4 text-red-500">{error}</p>
            ) : null}
            {result ? (
              <p className="text-lg p-4 m-4 text-green-500">{result}</p>
            ) : null}
          </>
        )}
      </main>
    </>
  );
};

export default MiCuenta;
