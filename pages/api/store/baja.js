import { TYPE_OPEN, TYPE_MOVIL } from "../../../utils/constants";

export default async function handler(req, res) {
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

    if (!subscriptionId && type == TYPE_OPEN) {
      const resp = {
        status: "error",
        message: "Falta subscriptionId",
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
      const response = await fetch(
        `${baseURL}/v1/customers/${externalId}/products/${productPid}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = response.status;
      console.log("Status: ", status);
      if (status === 204) {
        const resp = {
          status: "success",
          message: "Se dio de baja correctamente",
          result: null,
          raw: null,
        };
        return res.status(200).json(resp);
      } else {
        const data = await response.json();

        if (data?.errorCode === "BAD_GATEWAY") {
          const resp = {
            status: "error",
            message: "No se encontro el producto que se quiere dar de baja",
            result: null,
            raw: data,
          };
          return res.status(401).json(resp);
        } else if (data?.errorCode === "VALIDATION_ERROR") {
          const resp = {
            status: "error",
            message: "El producto ya fue dado de baja",
            result: null,
            raw: data,
          };
          return res.status(401).json(resp);
        } else if (data?.errorCode === "CUSTOMER_NOT_FOUND") {
          const resp = {
            status: "error",
            message: "No se encontró cliente",
            result: null,
            raw: data,
          };
          return res.status(401).json(resp);
        } else {
          const resp = {
            status: "error",
            message: `Error no identificado (${data?.errorCode})`,
            result: null,
            raw: data,
          };
          return res.status(500).json(resp);
        }
      }
    }
  } catch (error) {
    console.log(error);
    const resp = {
      status: "error",
      message: `Error no identificado (${error})`,
      result: null,
      raw: data,
    };
    return res.status(500).json(resp);
  }
}
