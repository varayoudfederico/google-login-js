export default async function handler(req, res) {
//   console.log("BASE INSTALADA: Obteniendo token de acceso...");

  try {
    if (!req.query.subscriberId) {
      const resp = {
        status: "error",
        message: "Falta parametro subscriberId",
        result: null,
        raw: null,
      };
      return res.status(500).json(resp);
    }

    const subscriberId = req.query.subscriberId;

    const baseUrlToken =
      "https://sesiont.personal.com.ar/openam/oauth2/realms/root/realms/authappext/access_token";

    const stringToEncode = `${process.env.BASE_INSTALADA_USERNAME}:${process.env.BASE_INSTALADA_PASSWORD}`;
    const encodedString = Buffer.from(stringToEncode, "binary").toString(
      "base64"
    );

    const tokenResponse = await fetch(baseUrlToken, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedString}`,
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });
    const data = await tokenResponse.json();

    if (!data.id_token) {
      const resp = {
        status: "error",
        message: "No se pudo obtener token para acceso",
        result: null,
        raw: data,
      };
      return res.status(500).json(resp);
    }
    const id_token = data.id_token;
    // console.log(id_token);

    const urlBI = new URL(
      "https://apit.telecom.com.ar/proxyrest/esbcable/customerManagement/products/installedBase"
    );

    urlBI.searchParams.append("isActive", "true");
    urlBI.searchParams.append("subscriberId", subscriberId);

    const BIresponse = await fetch(urlBI.href, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id_token}`,
      },
    });
    const dataBI = await BIresponse.json();
    const subscriptionId = dataBI.subscriptions?.subscription[0]?.id || null;
    const addressId = dataBI.subscriptions?.subscription[0]?.addressId || null;

    if (subscriptionId && addressId) {
      const resp = {
        status: "success",
        message: "Se encontró subscriptionID y addressID",
        result: { subscriptionId, addressId },
        raw: dataBI,
      };
      return res.status(200).json(resp);
    } else {
      const resp = {
        status: "error",
        message: `Error no identificado (${dataBI.errorCode})`,
        result: null,
        raw: dataBI,
      };
      return res.status(500).json(resp);
    }

    // res.json(id_token);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}
