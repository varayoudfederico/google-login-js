import { serialize, CookieSerializeOptions } from "cookie";

export const setCookies = (res, id, refresh, access, options) => {
  const idValue =
    typeof id === "object" ? "j:" + JSON.stringify(id) : String(id);

  const refreshValue =
    typeof refresh === "object"
      ? "j:" + JSON.stringify(refresh)
      : String(refresh);

  const accessValue =
    typeof access === "object" ? "j:" + JSON.stringify(access) : String(access);

  // valor de la duracion de la cookie, en ms
  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", [
    serialize("idp_id_token", idValue, options),
    serialize("idp_refresh_token", refreshValue, options),
    serialize("idp_access_token", accessValue, options),
  ]);
};

/*
Segundo paso del flujo de logueo en IDP.
Luego de que el usuario se haya logueado de forma exitosa, el IDP redirige a la URL de esta API.
Dentro de esa redirección, el parametro mas importante es "code", necesario para canjearlo por un token valido
en el endpoint de Solicitud de Token (punto 5. de la documentacion de IDP).
Para obtener este token, se debe pegar al endpoint con el metodo POST. La URL del endpoint se extrae de la documentacion,
solo se le agrega la variable code, extraida de la respuesta del endpoint anterior.
Este endpoint requiere un header para funcionar correctamente. Este header contiene los parametros "Content-Type" y "Authorization".
Authorization contiene los datos clientId y clientSecret, ambos definidos en el archivo .env, los cuales son pasados por un encode y 
agregados al header.
Si la pegada es exitosa, el endpoint devuelve varios datos, entre ellos se extraen los token de acceso necesarios para el funcionamiento de la pagina:
ID TOKEN (Tiene la informacion del usuario), ACCESS TOKEN y REFRESH TOKEN.
Estos token se pasan a la funcion setCookies, la cual setea una Cookie para cada uno de los token, para que estos puedan ser accedidos por el front.
Luego de agregar las cookies con los token a la respuesta, se hace una redireccion a la pagina /success.
*/

export default function handler(req, res) {
  try {
    const code = req.query.code;
    console.log("Code: ", code);
    // res.redirect(`/success`);
    const encoded = Buffer.from(
      `${process.env.NEXT_PUBLIC_IDP_CLIENT_ID}:${process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET}`,
      "binary"
    ).toString("base64");

    fetch(
      `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token?grant_type=authorization_code&code=${code}&redirect_uri=https://idp-nextjs-test.netlify.app/api/auth/callback/idp`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const id_token = data.id_token || "";
        const access_token = data.access_token || "";
        const refresh_token = data.refresh_token || "";
        setCookies(res, id_token, refresh_token, access_token, {
          path: "/",
          httpOnly: false,
          sameSite: "lax",
          maxAge: 1800000,
        });
        res.redirect(`/success`);
      });
  } catch (error) {
    res.status(500).json(error);
  }
}
