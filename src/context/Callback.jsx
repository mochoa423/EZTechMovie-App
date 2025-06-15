import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "OAuth failed");
          }
          return res.json();
        })
        .then((data) => {
          if (data.id_token) {
            const decoded = jwtDecode(data.id_token); 
            localStorage.setItem("user", JSON.stringify(decoded));
            localStorage.setItem("access_token", data.access_token);
            window.location.href = "/";
          } else {
            console.error("No token received from server.");
          }
        })
        .catch((err) => {
          console.error("OAuth callback error:", err.message);
        });
    }
  }, [navigate]);

  return <h2 style={{ padding: "2rem" }}>Authenticating...</h2>;
};

export default Callback;
