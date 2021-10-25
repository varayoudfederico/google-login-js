import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import Providers from "next-auth/providers";

export default NextAuth({
  callbacks: {
    async jwt(token, account) {
      console.log("token cb", token);
      console.log("account cb", account);
      // Persist the OAuth access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token, user) {
      console.log("session se", session);
      console.log("token se", token);
      console.log("user se", user);
      // Send properties to the client, like an access_token from a provider.
      // session.user.id = token.sub;
      return session;
    },
  },
  // jwt: {
  //   encryption: false,
  // },
  // secret: process.env.SECRET,
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    {
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      name: "Google",
      type: "oauth",
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },

    {
      id: "idp",
      name: "IDP",
      type: "oauth",
      wellKnown:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile" } },
      // idToken: true,
      // checks: ["none"],
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET,
      profile(OAuthProfile) {
        return {
          ...OAuthProfile,
        };
      },
    },

    // {
    //   id: "google",
    //   name: "Google",
    //   type: "oauth",
    //   version: "2.0",
    //   scope:
    //     "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    //   params: { grant_type: "authorization_code" },
    //   accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
    //   requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
    //   authorizationUrl:
    //     "https://accounts.google.com/o/oauth2/auth?response_type=code",
    //   profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    //   async profile(profile, tokens) {
    //     // You can use the tokens, in case you want to fetch more profile information
    //     // For example several OAuth providers do not return email by default.
    //     // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
    //     return {
    //       id: profile.id,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },

    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // },
    // {
    //   id: "google",
    //   name: "Google",
    //   type: "oauth",
    //   wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    //   authorization: { params: { scope: "openid email profile" } },
    //   idToken: true,
    //   checks: ["pkce", "state"],
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     }
    //   },
    // },

    // {
    //   id: "idp",
    //   name: "IDP",
    //   type: "oauth",
    //   version: "2.0",
    //   scope: "openid profile",
    //   params: { grant_type: "authorization_code" },
    //   accessTokenUrl:
    //     "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
    //   requestTokenUrl:
    //     "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize",
    //   authorizationUrl:
    //     "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize?response_type=code",
    //   profileUrl:
    //     "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/.well-known/openid-configuration",
    //   async profile(profile, tokens) {
    //     // You can use the tokens, in case you want to fetch more profile information
    //     // For example several OAuth providers do not return email by default.
    //     // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
    //     return {
    //       sub: profile.sub,
    //       org: profile.org,
    //     };
    //   },

    //   clientId: process.env.IDP_CLIENT_ID,
    //   clientSecret: process.env.IDP_CLIENT_SECRET,
    // },
  ],
});
