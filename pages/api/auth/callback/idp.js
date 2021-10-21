import { serialize, CookieSerializeOptions } from "cookie";

export const setCookie = (res, id, refresh, access, options) => {
  const idValue =
    typeof id === "object" ? "j:" + JSON.stringify(id) : String(id);

  res.setHeader("Set-Cookie", serialize("idp_id_token", idValue, options));

  const refreshValue =
    typeof refresh === "object"
      ? "j:" + JSON.stringify(refresh)
      : String(refresh);

  res.setHeader(
    "Set-Cookie",
    serialize("idp_refresh_token", refreshValue, options)
  );

  // const accessValue =
  //   typeof access === "object" ? "j:" + JSON.stringify(access) : String(access);

  // res.setHeader(
  //   "Set-Cookie",
  //   serialize("idp_access_token", accessValue, options)
  // );
};

export default function handler(req, res) {
  try {
    const code = req.query.code;
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
        setCookie(res, id_token, refresh_token, access_token, { path: "/" });
        // setCookie(res, "idp_access_token", access_token, { path: "/" });
        // setCookie(res, "idp_refresh_token", refresh_token, { path: "/" });
        res.redirect(`/success`);
      });
  } catch (error) {
    res.status(500).json(error);
  }
}
