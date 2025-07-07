// pages/_app.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const publicPages = ["/", "/sign-in", "/sign-up"];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        // Optional: protect private pages here or use middleware
        <Component {...pageProps} />
      )}
    </ClerkProvider>
  );
}

export default MyApp;
