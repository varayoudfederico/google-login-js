import Head from "next/head";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

  const getProducts = async () => {
    setResult(null);
    setError(null);
    setFetching(true);
    const demoSubscriberID = "25693";
    try {
      const url =
        session.user?.type === "Movil"
          ? `/api/store/getProducts?idMovil=54${session.user?.sub}`
          : session.user?.type === "OPEN"
          ? `/api/store/getProducts?idSubscriber=${demoSubscriberID}`
          : `/api/store/getProducts`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      data.status === "success"
        ? setResult(data.result)
        : setError(data.message);

      // setResult(data.result);
    } catch (error) {
      console.error(error);
      // setResult(error);
    }
    setFetching(false);
  };

  const logout = async () => {
    console.log("Logout...");
    const token = session.user?.id_token;
    if (token) {
      console.log("toke:", token);
      // const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${token}&post_logout_redirect_uri=https://idp-nextjs-test2.netlify.app/api/auth/signout`;
      const response = await fetch(`api/logout?token=${token}`);
      const data = await response.json();
      console.log("res", data);
      console.log("res", response);
    }

    signOut();
  };

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Login with next-auth</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
          <>
            <p>No hay usuario logueado</p>
            <button className="btn-blue" onClick={() => signIn(["idp"])}>
              Ingresar
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
            <button className="btn-blue mb-8" onClick={() => getProducts()}>
              Consulta productos
            </button>
            {fetching ? <p>Obteniendo datos...</p> : null}
            {error ? (
              <p className="text-lg p-4 m-4 text-red-500">{error}</p>
            ) : null}
            {result ? (
              <>
                {result.length > 0 ? (
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
                )}
              </>
            ) : null}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
