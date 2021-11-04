import { TYPE_OPEN, TYPE_MOVIL } from "../../../utils/constants";

export default async function handler(req, res) {
  try {
    const baseURL = "https://backoffice-staging.personal-svcs.com";
    let externalId = null;
    const type = req.query.type;
    const id = req.query.id;
    const productPid = req.query.productPid;
    const mail = req.query.mail;
    let subscriptionId = null;
    let addressId = null;

    console.log("type: ", type);
    console.log("id: ", id);
    console.log("productPid: ", productPid);
    console.log("mail: ", mail);

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

    if (type === TYPE_OPEN) {
      const BIUrl = new URL("http://localhost:3000/api/store/baseInstalada");
      BIUrl.searchParams.append("subscriberId", id);
      console.log("BI URL: ", BIUrl.href);
      const BIresponse = await fetch(BIUrl.href);
      const BIdata = await BIresponse.json();
      console.log("BI DATA:", BIdata);
      if (BIdata.status !== "success") {
        const resp = {
          status: "error",
          message: "No se pudieron obtener susbcriberId y addressId",
          result: null,
          raw: BIdata,
        };
        res.status(500).json(resp);
      } else {
        subscriptionId = BIdata.result.subscriptionId;
        addressId = BIdata.result.addressId;
        console.log("subscriptionId: ", subscriptionId);
        console.log("addressId: ", addressId);
      }

      if (!subscriptionId) {
        const resp = {
          status: "error",
          message: "Falta subscriptionId",
          result: null,
        };
        return res.status(401).json(resp);
      }

      if (!addressId) {
        const resp = {
          status: "error",
          message: "Falta addressId",
          result: null,
        };
        return res.status(401).json(resp);
      }
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
      const altaResponse = await fetch(
        `${baseURL}/v1/customers/${externalId}/products`,
        {
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
        }
      );
      const altaData = await altaResponse.json();
      //   return res.status(200).json(data);
      if (altaData.result?.serviceUrl) {
        const resp = {
          status: "success",
          message: "Se dio de alta correctamente",
          result: altaData.result.serviceUrl,
          raw: altaData,
        };
        return res.status(200).json(resp);
      } else if (altaData.errorCode === "CONTENT_PID_ALREADY_EXISTS") {
        const resp = {
          status: "error",
          message: "El usuario ya cuenta con el producto activado",
          result: null,
          raw: altaData,
        };
        return res.status(401).json(resp);
      } else if (altaData.errorCode === "CONTENT_NOT_FOUND") {
        const resp = {
          status: "error",
          message: "El producto que se quiere activar no existe",
          result: null,
          raw: altaData,
        };
        return res.status(401).json(resp);
      } else {
        const resp = {
          status: "error",
          message: `Error no identificado (${altaData.errorCode})`,
          result: null,
          raw: altaData,
        };
        return res.status(500).json(resp);
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
    return res.status(500).json(resp);
  }
}
