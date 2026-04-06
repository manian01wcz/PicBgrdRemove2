"use client";

import { useEffect } from "react";

export default function AuthButton() {
  useEffect(() => {
    /* global google */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: "720834503427-83vnq4qf7640uadfq6nrgg1105kb36t7.apps.googleusercontent.com",
        callback: (res: any) => {
          localStorage.setItem("user_token", res.credential);
          window.location.reload();
        },
      });
      google.accounts.id.renderButton(document.getElementById("auth-btn")!, {
        theme: "outline",
        size: "large",
      });
    };
  }, []);

  return <div id="auth-btn"></div>;
}
