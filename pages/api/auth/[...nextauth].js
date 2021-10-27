import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("in jwt token: ", token);
      console.log("in jwt account : ", account);
      console.log("in jwt profile: ", profile);
      // Persist the OAuth access_token to the token right after signin
      if (profile && profile.relatedData) {
        token.relatedData = profile.relatedData;
      }

      if (profile && profile.sub) {
        token.sub = profile.sub;
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log("in session session: ", session);
      console.log("in session token : ", token);
      console.log("in session user: ", user);
      // Send properties to the client, like an access_token from a provider.
      session.user.relatedData = token.relatedData;
      session.user.sub = token.sub;
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
        profile.test = "test string";

        return {
          id: profile.sub,
          name: profile.sub,
        };
      },
    },
  ],
});
