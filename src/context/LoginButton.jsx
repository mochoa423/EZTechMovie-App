import React from "react";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=23196360078-v36nhm94q60dhapv815s3k248d7lb8ag.apps.googleusercontent.com&redirect_uri=http://localhost:5173/Callback&response_type=code&scope=email profile";
  };

  return (
    <button onClick={handleLogin} className="google-login-btn">
      Login
    </button>
  );
};

export default LoginButton;