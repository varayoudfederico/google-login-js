import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
// import useIDP from "../hooks/useIDP";

const Store = () => {
  //   const { login, logout, user } = useIDP();
  const [id, setId] = useState(null);
  // const [idSubscriber, setIdSubscriber] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Result: ", result);
  }, [result]);

  const getProductos = async (type) => {
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      let url =
        type === "MOVIL"
          ? `/api/store/getProducts?idMovil=${id}`
          : `/api/store/getProducts?idSubscriber=${id}`;

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
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>STORE test</title>
      </Head>
      <main className="p-12">
        <Link href="/">
          <a>
            <h1 className="text-2xl font-bold pb-4">STORE Test</h1>
          </a>
        </Link>

        <input
          type="text"
          placeholder="ID"
          className="border-2 border-gray-400 rounded-xl p-2"
          onChange={(e) => setId(e.target.value)}
        />
        <div>
          <button className="btn-blue" onClick={() => getProductos("MOVIL")}>
            Consulta Productos (Movil)
          </button>
          <span>Ejemplo: 543777220160</span>
        </div>
        <div>
          <button className="btn-blue" onClick={() => getProductos("APP")}>
            Consulta Productos (App)
          </button>
          <span>Ejemplo: 25693</span>
        </div>
        {loading ? (
          <p className="text-lg p-4 m-4">Loading...</p>
        ) : (
          <>
            {error ? <p className="text-lg p-4 m-4">{error}</p> : null}
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

export default Store;
