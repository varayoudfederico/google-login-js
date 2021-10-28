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
    <p>Protected page only for logged users</p>
  ) : (
    <p>You can't see this because you're not logged in</p>
  );
};

export default Protected;
