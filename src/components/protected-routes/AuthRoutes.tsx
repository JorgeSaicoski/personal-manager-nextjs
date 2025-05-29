"use client";

import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthRoutes = ({ children }: ProtectedRouteProps) => {
  const { authenticated, loading, login } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        gap: '20px'
      }}>
        <p>Please log in to access this page</p>
        <button 
          onClick={login}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#9FBE5A',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRoutes;