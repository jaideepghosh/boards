import { Toaster } from "@/components/toaster";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Toaster />
      <Component {...pageProps} />
    </UserProvider>
  );
}
