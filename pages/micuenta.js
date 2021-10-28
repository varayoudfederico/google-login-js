import { useSession, signIn } from "next-auth/react";

const MiCuenta = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn("idp"),
  });

  return session ? (
    <p>Mi cuenta</p>
  ) : (
    <p>Debe iniciar sesión para ver esta pagina</p>
  );
};

export default MiCuenta;
