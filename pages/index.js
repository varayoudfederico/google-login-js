import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  /*
  Inicio del flujo de logueo de usuario en IDP.
  Esta funcion arma la URL para pegarle al endpoint de "Solicitud de autenticación y autorización" (punto 4. de la documentacion de IDP).
  La URL se extrae completa del documento y se le agregan los paramentros clientID (definido en el archivo .env.local) y redirectURI, 
  definidos en la configuracion del IDP.
  Luego de esta redirección, al usuario se le presenta un cuadro para colocar su nombre de usuario y contraseña. Si el logueo es correcto,
  se redirige a la URL de callback con el "code" que se usará luego para obtener el token. (Ver archivo api/auth/callback/idp.js)
  */

  const login = () => {
    console.log("Redirigiendo al IDP...");

    const clientId = process.env.NEXT_PUBLIC_IDP_CLIENT_ID;
    const redirectURI = encodeURI(
      "https://idp-nextjs-test.netlify.app/api/auth/callback/idp"
    );
    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=openid+profile&state=doeeHdmVTm67Am1oc3QXHyMQTKcMPoc2MqguEDqxZwE&nonce=MacymmlRaarX4sqw6BhoHOGzjLjj89VUj7sFuNvEYXA`;

    router.push(url);
  };

  return (
    <>
      <Head>
        <title>IDP test</title>
      </Head>
      <main className="p-12">
        <h1 className="text-2xl font-bold pb-4">IDP Test</h1>
        <button className="btn-blue" onClick={() => login()}>
          Login
        </button>
      </main>
    </>
  );
};

export default Home;
