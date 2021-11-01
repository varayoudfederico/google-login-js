import NextAuth from "next-auth";
import { TYPE_OPEN, TYPE_MOVIL } from "../utils/constants";
import { JWT } from "next-auth/jwt";
/*
Aca se expanden los tipos por defecto de los objetos Session, Profile y JWT de next-auth con los 
parametros adicionales agregados en los callbacks en el archivo /api/auth/nextauth.ts para evitar
errores de Typescript
*/
declare module "next-auth/jwt" {
  interface JWT {
    subscriberId: string;
    id_token: string;
  }
}

declare module "next-auth" {
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
