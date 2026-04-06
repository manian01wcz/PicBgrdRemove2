"use client";

import { useEffect, useState } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<{ name: string; email: string; picture: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ name: payload.name, email: payload.email, picture: payload.picture });
      } else {
        localStorage.removeItem("user_token");
      }
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("user_token");
    setUser(null);
  };

  return { user, signOut };
}
