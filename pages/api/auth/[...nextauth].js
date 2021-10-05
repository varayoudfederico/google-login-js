import next from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import GoogleProvider from "next-auth/providers/google";

const options = {
  // callbacks: {
  //   redirect({url, baseUrl}) {
  //     return "https://cdagservwapint.personal.com.ar/store/logincallback"
  //   }
  // },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
    //       tok: tokens.id_token,
    //     };
    //   },
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // },
    // // Providers.Google({
    // //   clientId: process.env.GOOGLE_CLIENT_ID,
    // //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // // }),
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
};

const nextAuth = (req, res) => NextAuth(req, res, options);

export default nextAuth;
