import { useSession, signIn } from "next-auth/react";

const Protected = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("Please login first");
      signIn("idp");
    },
  });

  return session ? (
    <p>Mi cuenta</p>
  ) : (
    <p>Debe iniciar sesión para ver esta pagina</p>
  );
};

export default Protected;
