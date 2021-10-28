export default function handler(req, res) {
  try {
    const baseURL = "https://backoffice-staging.personal-svcs.com";
    let externalId = null;
    let token = req.query.idMovil
      ? process.env.NEXT_PUBLIC_TOKEN_CONSULTA_MOVIL
      : process.env.NEXT_PUBLIC_TOKEN_CONSULTA_APP;

    if (req.query.idMovil) {
      externalId = req.query.idMovil;

      // token = "test"
      // console.log("Movil ID: ", externalId);
    } else if (req.query.idSubscriber) {
      const app = "PU";
      const crm = "OPEN";
      const subscriptionId = "";
      const provider = "TELECOM_AR";
      const subscriberId = req.query.idSubscriber;

      const json = `{"app":"${app}", "crm":"${crm}", "subscriberId":"${subscriberId}", "subscriptionId":"${subscriptionId}", "provider":"${provider}"}`;
      const encoded = Buffer.from(json, "binary").toString("base64");

      // console.log("pre encode: ", json);
      // console.log("encode: ", encoded);
      // console.log("Subscriber ID: ", subscriberId);
      externalId = encoded;
    } else {
      const resp = {
        status: "error",
        message: "Falta identificador de usuario",
        result: null,
      };
      res.status(401).json(resp);
    }

    if (externalId) {
      fetch(
        `${baseURL}/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.result?.length > 0) {
            const resp = {
              status: "success",
              message: "Se encontraron los siguientes productos",
              result: data.result,
            };
            res.status(200).json(resp);
          } else if (data.errorCode === "PRODUCT_NOT_FOUND") {
            const resp = {
              status: "success",
              message: "El usuario no tiene productos asignados",
              result: [],
            };
            res.status(401).json(resp);
          } else if (data.errorCode === "CUSTOMER_NOT_FOUND") {
            const resp = {
              status: "error",
              message: "No se encontro usuario",
              result: null,
            };
            res.status(401).json(resp);
          } else {
            const resp = {
              status: "error",
              message: `Error no identificado (${data.errorCode})`,
              result: null,
            };
            res.status(500).json(resp);
          }
        });
    }
  } catch (error) {
    console.log(error);
    const resp = {
      status: "error",
      message: `Error no identificado (${error})`,
      result: null,
    };
    res.status(500).json(resp);
  }
}
