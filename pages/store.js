import Head from "next/head";
import { useState } from "react";
// import useIDP from "../hooks/useIDP";

const Store = () => {
  //   const { login, logout, user } = useIDP();
  const [idMovil, setIdMovil] = useState(null);
  const [idSubscriber, setIdSubscriber] = useState(null);
  const [result, setResult] = useState([]);

  const getProductosMovil = async () => {
    setResult("Loading...");
    try {
      const res = await fetch(`/api/store/getProducts?idMovil=${idMovil}`);
      const data = await res.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult(error);
    }
  };

  const getProductosApp = async () => {
    setResult("Loading...");
    try {
      const res = await fetch(
        `/api/store/getProducts?idSubscriber=${idSubscriber}`
      );
      const data = await res.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult(error);
    }
  };

  return (
    <>
      <Head>
        <title>STORE test</title>
      </Head>
      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">STORE Test</h1>

        <div>
          <input
            type="text"
            placeholder="543777220160"
            className="border-2 border-gray-400 rounded-xl p-2"
            onChange={(e) => setIdMovil(e.target.value)}
          />
          <button className="btn-blue" onClick={() => getProductosMovil()}>
            Consulta Productos (Movil)
          </button>
          <span>Ejemplo: 543777220160</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="subscriberId"
            className="border-2 border-gray-400 rounded-xl p-2"
            onChange={(e) => setIdSubscriber(e.target.value)}
          />
          <button className="btn-blue" onClick={() => getProductosApp()}>
            Consulta Productos (App)
          </button>
          <span>Ejemplo: 25693</span>
        </div>

        <p className="pt-4">{JSON.stringify(result, null, 2)}</p>
      </main>
    </>
  );
};

export default Store;
