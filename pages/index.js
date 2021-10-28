import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import useStore from "../hooks/useStore";

const Home = () => {
  const { data: session, status } = useSession();
  const { fetchProducts, result, error, fetching } = useStore();
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
        <Link href="/micuenta">
          <a>
            <button className="btn-blue">Ir a mi cuenta</button>
          </a>
        </Link>

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

export default Home;
