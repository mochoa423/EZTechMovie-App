import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      
      fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
          }
        })
        .catch((err) => {
          console.error("OAuth callback error:", err);
        });
    }
  }, [code]);

  return <h2>Authenticating...</h2>;
};

export default Callback;
