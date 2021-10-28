console.log("Test");

const demoProfile = {
  at_hash: "ZUpgLdFG2ApztreHJV5A4A",
  sub: "testidpperf3@fakemail.com",
  org: "Telecom",
  auditTrackingId: "564720c4-8bae-4eb3-b2e2-077f5a32caa2-235395",
  subname: "testidpperf3@fakemail.com",
  iss: "https://idpsesiont.telecom.com.ar:443/openam/oauth2/convergente",
  tokenName: "id_token",
  sid: "+a+XH3S6jLq92AvtL1d3yLbupSs1IW3TZRGRt9uuXgU=",
  aud: "oidc-ppd-test",
  c_hash: "5fcmG1gbbfGER_UxjhlAgw",
  acr: "0",
  "org.forgerock.openidconnect.ops": "QBWwobtstmf8rYJzgZPSQ5DkoJk",
  s_hash: "4uhfTI_dB4Sy2c7nhQdSfg",
  azp: "oidc-ppd-test",
  auth_time: 1635424031,
  realm: "/convergente",
  relatedData: { SUBSCRIBERID: ["3"], FLOWID: ["1100002"] },
  exp: 1635427632,
  tokenType: "JWTToken",
  iat: 1635424032,
  user: null,
};
let token = {};
profile = demoProfile;
// Persist the OAuth access_token to the token right after signin
if (profile && profile.relatedData) {
  token.relatedData = profile.relatedData;
}
if (profile && profile.relatedData?.SUBSCRIBERID[0]) {
  token.subscriberId = profile.relatedData.SUBSCRIBERID[0];
}

if (profile && profile.sub) {
  token.sub = profile.sub;
}

if (profile && profile.sub.includes("@")) {
  token.type = "OPEN";
} else token.type = "Movil";

console.log(token);
