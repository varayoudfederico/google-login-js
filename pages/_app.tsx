import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}  refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
