export default function handler(req, res) {
  try {
    const baseURL = "https://backoffice-staging.personal-svcs.com";
    let externalId = "";
    let token = "";
    if (req.query.idMovil) {
      externalId = req.query.idMovil;
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXJzb25hbCIsImluc3RhbmNlIjoiNjEifQ.3kME1eJT9rvVUvGqUgSJTEzFEJvCAAZJVXqkaTEjtEs";
      console.log("Movil ID: ", externalId);
    } else if (req.query.idSubscriber) {
      const app = "PU";
      const crm = "OPEN";
      const subscriptionID = "";
      const provider = "TELECOM_AR";
      const subscriberId = req.query.idSubscriber;

      const encoded = Buffer.from(
        `{"app":"${app}", "crm":"${crm}", "subscriberId":${subscriberId}, "subscriptionId":${subscriptionId}, "provider":"${provider}"}`,
        "binary"
      ).toString("base64");

      console.log("encode: ", encoded);
      console.log("Subscriber ID: ", idSubscriber);
      // externalId = req.query.idMovil;
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXJzb25hbCIsImluc3RhbmNlIjoiNjEifQ.3kME1eJT9rvVUvGqUgSJTEzFEJvCAAZJVXqkaTEjtEs";
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
          console.log(data);

          res.status(200).json(data);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
