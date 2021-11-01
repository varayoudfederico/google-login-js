import { TYPE_OPEN, TYPE_MOVIL } from "../../../utils/constants";

export default function handler(req, res) {
  try {
    const baseURL = "https://backoffice-staging.personal-svcs.com";
    let externalId = null;
    const type = req.query.type;
    const id = req.query.id;
    const productPid = req.query.productPid;
    const mail = req.query.mail;
    const subscriptionId = req.query.subscriptionId;
    const addressId = req.query.addressId;

    console.log("type: ", type);
    console.log("id: ", id);
    console.log("productPid: ", productPid);
    console.log("mail: ", mail);
    console.log("subscriptionId: ", subscriptionId);
    console.log("addressId: ", addressId);

    let token =
      type === TYPE_MOVIL
        ? process.env.NEXT_PUBLIC_TOKEN_CONSULTA_MOVIL
        : process.env.NEXT_PUBLIC_TOKEN_CONSULTA_APP;

    if (!id) {
      const resp = {
        status: "error",
        message: "Falta identificador de usuario",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (!type) {
      const resp = {
        status: "error",
        message: "Falta tipo de usuario",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (!productPid) {
      const resp = {
        status: "error",
        message: "Falta PID del producto a activar",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (!mail) {
      const resp = {
        status: "error",
        message: "Falta mail del usuario",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (!subscriptionId && type == TYPE_OPEN) {
      const resp = {
        status: "error",
        message: "Falta subscriptionId",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (!addressId && type == TYPE_OPEN) {
      const resp = {
        status: "error",
        message: "Falta addressId",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (type === TYPE_MOVIL) {
      externalId = id;
      //   externalId = "543777220160";
      // hardcodeado para pruebas

      // token = "test"
      // console.log("Movil ID: ", externalId);
    } else if (type === TYPE_OPEN) {
      const app = "PU";
      const crm = "OPEN";
      //   const subscriptionId = subscriptionId; //hardcodeado, cambiar
      const provider = "TELECOM_AR";
      const subscriberId = id; //hardcodeado, cambiar

      const json = `{"app":"${app}", "crm":"${crm}", "subscriberId":"${subscriberId}", "subscriptionId":"${subscriptionId}", "provider":"${provider}"}`;
      const encoded = Buffer.from(json, "binary").toString("base64");

      console.log("pre encode: ", json);
      console.log("encode: ", encoded);
      // console.log("Subscriber ID: ", subscriberId);
      externalId = encoded;
    } else {
      const resp = {
        status: "error",
        message: "No existe tipo de usuario",
        result: null,
      };
      return res.status(401).json(resp);
    }

    if (externalId) {
      fetch(`${baseURL}/v1/customers/${externalId}/products`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productPid,
          mail,
          addressId,
          promoId: null,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //   return res.status(200).json(data);
          if (data.result?.serviceUrl) {
            const resp = {
              status: "success",
              message: "Se dio de alta correctamente",
              result: data.result.serviceUrl,
              raw: data,
            };
            res.status(200).json(resp);
          } else if (data.errorCode === "CONTENT_PID_ALREADY_EXISTS") {
            const resp = {
              status: "error",
              message: "El usuario ya cuenta con el producto activado",
              result: null,
              raw: data,
            };
            res.status(401).json(resp);
          } else if (data.errorCode === "CONTENT_NOT_FOUND") {
            const resp = {
              status: "error",
              message: "El producto que se quiere activar no existe",
              result: null,
              raw: data,
            };
            res.status(401).json(resp);
          } else {
            const resp = {
              status: "error",
              message: `Error no identificado (${data.errorCode})`,
              result: null,
              raw: data,
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
      raw: error,
    };
    return res.status(500).json(resp);
  }
}
