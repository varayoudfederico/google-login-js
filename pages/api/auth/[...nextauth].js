import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
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
      accessTokenUrl:
        "https://cdagservwapint.personal.com.ar/store/logincallback",
      requestTokenUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/access_token",
      authorizationUrl:
        "https://idpsesiont.telecom.com.ar/openam/oauth2/realms/convergente/authorize",
      profileUrl: "",
      async profile(profile, tokens) {},
      //     // You can use the tokens, in case you want to fetch more profile information
      //     // For example several OAuth providers do not return email by default.
      //     // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
      //     return {
      //       id: profile.id,
      //       name: profile.name,
      //       email: profile.email,
      //       image: profile.picture,
      //       tok: tokens.id_token,
      //     };
      //   },
      // profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      // async profile(profile, tokens) {
      //   // You can use the tokens, in case you want to fetch more profile information
      //   // For example several OAuth providers do not return email by default.
      //   // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture
      //   }
      // },
      clientId: process.env.IDP_CLIENT_ID,
      clientSecret: "",
    },
  ],
});
