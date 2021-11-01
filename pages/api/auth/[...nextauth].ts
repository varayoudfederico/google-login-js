import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  callbacks: {
    /*
    Despues del login, se llama a este callback, en cual recibe los params account (con los token recibidos)
    y profile (con los datos del usuario que vinieron en el id_token decodificados).
    Para pasarlos al front, hay que asignar los datos que se quieran conservar de esos parametros al objeto token.
    */
    async jwt({ token, account, profile }) {
      // console.log("in jwt token: ", token);
      // console.log("in jwt account : ", account);
      // console.log("in jwt profile: ", profile);
      if (account?.id_token) {
        token.id_token = account.id_token;
      }

      if (profile?.relatedData?.SUBSCRIBERID) {
        token.subscriberId = profile.relatedData.SUBSCRIBERID[0];
      }

      if (profile?.sub) {
        token.sub = profile.sub;
      }

      if (profile?.sub) {
        if (profile.sub.includes("@")) {
          token.type = "OPEN";
        } else token.type = "Movil";
      }

      return token;
    },
    /*
    Este callback se llama despues de la ejecucion del anterior. Aca tengo que asignar todas las variables que
    guarde en el objeto token en el callback anterior a la sesion de usuario. Todos estos parametros podran ser accedidos
    desde el front usando el hook useSession().
    */
    async session({ session, token, user }) {
      // console.log("in session session: ", session);
      // console.log("in session token : ", token);
      // console.log("in session user: ", user);
      session.user.sub = token.sub;
      session.user.type = token.type;
      if (token.subscriberId) {
        session.user.subscriberId = token.subscriberId;
      }
      if (token.id_token) {
        session.user.id_token = token.id_token;
      }
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
        };
      },
    },
  ],
});
