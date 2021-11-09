import { TYPE_OPEN, TYPE_MOVIL } from "../../../utils/constants";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const baseURL = "https://backoffice-staging.personal-svcs.com";
    const session = await getSession({ req });
    let externalId = null;
    let type = "OPEN";
    let realType = session ? session.user?.type : null;
    const id = "25693";
    let realId = session ? session.user?.sub : null;
    console.log("type: ", type);
    console.log("real type: ", realType);
    console.log("realId: ", realId);
    console.log("demo id: ", id);
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
      res.status(401).json(resp);
    }

    if (type === TYPE_MOVIL) {
      externalId = id;

      // token = "test"
      // console.log("Movil ID: ", externalId);
    } else if (type === TYPE_OPEN) {
      const app = "PU";
      const crm = "OPEN";
      const subscriptionId = "";
      const provider = "TELECOM_AR";
      const subscriberId = id;

      const json = `{"app":"${app}", "crm":"${crm}", "subscriberId":"${subscriberId}", "provider":"${provider}"}`;
      const encoded = Buffer.from(json, "binary").toString("base64");

      console.log("pre encode: ", json);
      // console.log("encode: ", encoded);
      // console.log("Subscriber ID: ", subscriberId);
      externalId = encoded;
    } else {
      const resp = {
        status: "error",
        message: "No existe ese tipo de usuario",
        result: null,
      };
      res.status(401).json(resp);
    }

    if (externalId) {
      const response = await fetch(
        `${baseURL}/v1/customers/${externalId}/products?status=PURCHASED,CANCELLED,EXPIRED`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status: ", response.status);
      const data = await response.json();
      if (data.result?.length > 0) {
        const resp = {
          status: "success",
          message: "Se encontraron los siguientes productos",
          result: data.result,
          raw: data,
        };
        res.status(200).json(resp);
      } else if (data.errorCode === "PRODUCT_NOT_FOUND") {
        const resp = {
          status: "success",
          message: "El usuario no tiene productos asignados",
          result: [],
          raw: data,
        };
        res.status(401).json(resp);
      } else if (data.errorCode === "CUSTOMER_NOT_FOUND") {
        const resp = {
          status: "error",
          message: "No se encontro usuario",
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
    }
  } catch (error) {
    console.log(error);
    const resp = {
      status: "error",
      message: `Error no identificado (${error})`,
      result: null,
      raw: error,
    };
    res.status(500).json(resp);
  }
}
