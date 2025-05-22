"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthRoutes = ({ children }: ProtectedRouteProps) => {
  const { authenticated, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      login();
    }
  }, [authenticated, loading, login]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoutes;