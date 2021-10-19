import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  callbacks: {
    async jwt(token, account) {
      // Persist the OAuth access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token, user) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub;
      return session;
    },
  },
  jwt: {
    encryption: false,
  },
  secret: process.env.SECRET,
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      version: "2.0",
      scope: "openid+profile",
      params: { grant_type: "authorization_code" },
      response_type: "code",
      clientId: process.env.IDP_CLIENT_ID,
      clientSecret: process.env.IDP_CLIENT_SECRET,
      accessTokenUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      requestTokenUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      authorizationUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code",
      profileUrl: "",
      async profile(profile, tokens) {},
    },
  ],
});
