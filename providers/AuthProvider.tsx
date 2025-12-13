"use client";

import { AuthContext } from "@/context/AuthContext";
import { passwordDB, tokenDB, userDB } from "@/lib/myBackend";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<string | null>("");
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const countRef = useRef<number>(0);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    if (username === userDB && password === passwordDB) {
      setUser(username);
      setToken(tokenDB);
    } else {
      setUser(null);
      setToken(null);
      throw new Error("Invalid credentials");
    }
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const isAuthenticated = !!token;

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      loading,
      getToken: () => token,
      getCount: () => countRef.current,
    }),
    [isAuthenticated, login, logout, loading, token]
  );

  useEffect(() => {
    /*
    if (!isAuthenticated) {
      router.push("/login");
    }
		console.log("AuthProvider useEffect - isAuthenticated:", isAuthenticated);
    const interval = setInterval(() => {
      countRef.current += 1;
      if (!isAuthenticated && countRef.current === 5) {
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(interval);
    */
  }, [isAuthenticated, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
