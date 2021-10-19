import Head from "next/head";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import axios from "axios";

const Home = () => {
  //hook de next-auth para obtener los datos del usuario logueado
  const [session, loading] = useSession();

  //metodo de ejemplo para pegarle a un endpoint que usa el token de login para autorizar
  const getData = async () => {
    try {
      const { data } = await axios.get("/api/fetchWithToken");
      console.log("Received data: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Session: ", session);
  }, [session]);

  return (
    <>
      <Head>
        <title>IDP with next-auth test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">Login test with next-auth</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : !session ? (
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
            <p className="font-bold text-xl my-4">Logueado!</p>
            <p>Nombre: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
            <p>ID: {session.user?.id}</p>
            <button className="btn-blue" onClick={() => signOut()}>
              Logout
            </button>
            <button className="btn-blue" onClick={() => getData()}>
              Get Data
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
