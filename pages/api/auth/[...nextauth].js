import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  callbacks: {
    async session({ session, token, user }) {
      console.log(token);
      // Send properties to the client, like an access_token from a provider.
      session.externalId = "external test";
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      wellKnown:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile" } },
      idToken: true,
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET,
      profile(profile, tokens) {
        console.log("profile: ", profile);
        console.log("tokens: ", tokens);
        return {
          id: profile.sub,
          name: profile.sub,
          externalId: profile.sub,
        };
      },
    },
  ],
});
