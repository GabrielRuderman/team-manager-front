import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { validateToken } from "./api/userApi";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.pathname === "/") {
      setLoading(false);
      return; 
    }

    validateToken().then(response => {
      const isAuthenticated = response?.code === 1;
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  return <Component {...pageProps} />;
}

export default MyApp;