import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import jwt_decode from "jwt-decode";

const demoToken =
  "eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiMG9TM1o0dENkSEhmaTY4dWRja2NKZyIsInN1YiI6IjExMzAzNTI1NTUiLCJvcmciOiJUZWxlY29tIiwiYXVkaXRUcmFja2luZ0lkIjoiM2NlZjFjMTQtYmE0Ny00MzVlLWI4N2QtMjUwYTVhOTRhN2ExLTEwMzQ2ODciLCJzdWJuYW1lIjoiMTEzMDM1MjU1NSIsImlzcyI6Imh0dHBzOi8vaWRwc2VzaW9udC50ZWxlY29tLmNvbS5hcjo0NDMvb3BlbmFtL29hdXRoMi9jb252ZXJnZW50ZSIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwibm9uY2UiOiJNYWN5bW1sUmFhclg0c3F3NkJob0hPR3pqTGpqODlWVWo3c0Z1TnZFWVhBIiwic2lkIjoieUdpcmZvZjFKYVA4bGhwYlFldXFENjg4MmR0SWZEN3dHVzUxY3lOdElrcz0iLCJhdWQiOiJvaWRjLXBwZC10ZXN0IiwiY19oYXNoIjoiN3Q4SGZPUlR5RUE0Y2d2RmIxVmpEUSIsImFjciI6IjAiLCJvcmcuZm9yZ2Vyb2NrLm9wZW5pZGNvbm5lY3Qub3BzIjoib2N3Z09VMnlsQmQ2WHhSaWF2QWcwdjZuRjBBIiwic19oYXNoIjoiVVNMNlpSUG91S0VEandzWkdRUG9WdyIsImF6cCI6Im9pZGMtcHBkLXRlc3QiLCJhdXRoX3RpbWUiOjE2MzQ5MDk4NzUsInJlYWxtIjoiL2NvbnZlcmdlbnRlIiwicmVsYXRlZERhdGEiOnt9LCJleHAiOjE2MzQ5MTM0NzYsInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNjM0OTA5ODc2fQ.x3ceag0vMnbRJ2NJ3vpB0eb_zjwi2-Lh4UUDYrGteUzDWR97zfFOwWIOa9C-dhRTRfbktt4oPGDkOInmVOWH6RF4lR8WB3gEl6ocjMdvrRPrYJ-iziQ-01YWpjXfVKYnvRIEHXPiizb6krNqLongk3kyP-2UzXAzii0iA4MGM-E8oCNdmpt3QJ5yyRJjqWr3LiofMZgHp2XcBTRJueoO2WXclczDiWA82286-Y40L7Cf6hERJ6zZyy9m-eI1k499qT7PHiYZ4BjpEGv3mIOhgZTdKYelayYZqVPaOUqUGe4yrCJNLqTUW3V6L7zs7jywvMrLREz1Df6hRzsEJDpUKg";

const useIDP = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Reading cookies...");
    const id_token = cookieCutter.get("idp_id_token");
    // const id_token = demoToken;
    const refresh_token = cookieCutter.get("idp_refresh_token");
    const access_token = cookieCutter.get("idp_access_token");

    console.log("ID TOKEN: ", id_token);
    console.log("REFRESH TOKEN: ", refresh_token);
    console.log("ACCESS TOKEN: ", access_token);

    if (id_token) {
      setUser(jwt_decode(id_token));
    }
  }, []);

  useEffect(() => {
    console.log("Decoded JWT: ", user);
    if (user?.relatedData) {
      const relatedData = JSON.stringify(user.relatedData);
      console.log("Related Data:", relatedData);
    }
  }, [user]);

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
      "https://idp-nextjs-test2.netlify.app/api/auth/callback/idp"
    );
    const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=openid+profile&state=doeeHdmVTm67Am1oc3QXHyMQTKcMPoc2MqguEDqxZwE&nonce=MacymmlRaarX4sqw6BhoHOGzjLjj89VUj7sFuNvEYXA`;
    router.push(url);
  };

  const logout = () => {
    console.log("Logout...");
    const idToken = cookieCutter.get("idp_id_token") || "";
    deleteCookies();
    setUser(null);
    if (idToken) {
      const redirect_uri = encodeURI(
        "https://idp-nextjs-test2.netlify2.app/api/auth/signout"
      );
      const url = `https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/connect/endSession?id_token_hint=${idToken}&post_logout_redirect_uri=${redirect_uri}`;
      router.push(url);
    } else {
      router.push("/");
    }
  };

  const deleteCookies = () => {
    console.log("Deleting cookies...");
    cookieCutter.set("idp_id_token", "", { expires: new Date(0) });
    cookieCutter.set("idp_refresh_token", "", { expires: new Date(0) });
    cookieCutter.set("idp_access_token", "", { expires: new Date(0) });
  };

  return { login, logout, user };
};

export default useIDP;
