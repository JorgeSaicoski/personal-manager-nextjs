"use client";

import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState, 
  useEffect 
} from "react";
import { 
  initKeycloak,
  isAuthenticated,
  login,
  logout,
  getFullName, 
  keycloakInstance
} from "@/services/auth/keycloak";

// Simple auth context
interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  fullName: string;
  login: () => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  fullName: "",
  login: () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initKeycloak();
        
        if (isAuthenticated()) {
          setAuthenticated(true);
          setFullName(getFullName());
          
          // Set up token refresh
          keycloakInstance.onTokenExpired = () => {
            keycloakInstance.updateToken(30).catch(() => {
              setAuthenticated(false);
            });
          };
        }
      } catch (error) {
        console.error("Auth initialization error", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      keycloakInstance.onTokenExpired = undefined;
    };
  }, []);

  const value = {
    authenticated,
    loading,
    fullName,
    login,
    logout: () => {
      logout();
      setAuthenticated(false);
      setFullName("");
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};