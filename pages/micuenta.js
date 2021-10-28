import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import useStore from "../hooks/useStore";

const MiCuenta = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn("idp"),
  });
  const loading = status === "loading";
  const { fetchProducts, result, error, fetching } = useStore();

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold">Mi cuenta</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
          <>
            <p>Debe iniciar sesión para ver esta pagina</p>
          </>
        ) : (
          <>
            <p className="font-bold text-xl my-4">
              Cuenta de {session.user?.name}
            </p>

            <Link href="/">
              <a>
                <button className="btn-blue">Volver</button>
              </a>
            </Link>

            <button className="btn-blue mb-8" onClick={() => fetchProducts()}>
              Consulta productos
            </button>
            {fetching ? <p>Obteniendo datos...</p> : null}
            {error ? (
              <p className="text-lg p-4 m-4 text-red-500">{error}</p>
            ) : null}
            {result ? (
              result.length > 0 ? (
                result.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-100 m-4 rounded-xl">
                    {Object.entries(item).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-bold">{key}</span>: {value}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-lg p-4 m-4">
                  El usuario no tiene productos asignados
                </p>
              )
            ) : null}
          </>
        )}
      </main>
    </>
  );
};

export default MiCuenta;
