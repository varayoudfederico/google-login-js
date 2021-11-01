import NextAuth from "next-auth";
import { TYPE_OPEN, TYPE_MOVIL } from "../utils/constants";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    subscriberId: string;
    id_token: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id_token: string;
      name: string;
      sub: string;
      type: TYPE_OPEN | TYPE_MOVIL;
      subscriberId: string;
    };
  }

  interface Profile {
    relatedData: {
      SUBSCRIBERID: string;
    };
  }
}
