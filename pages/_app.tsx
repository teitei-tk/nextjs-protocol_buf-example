import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...pageProps} />;
    </Suspense>
  );
}

export default MyApp;
