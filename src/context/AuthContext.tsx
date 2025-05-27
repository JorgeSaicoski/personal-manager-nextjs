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
          
          // Set up token refresh and expiration handling
          keycloakInstance.onTokenExpired = () => {
            console.log('Token expired, attempting refresh...');
            keycloakInstance.updateToken(30)
              .then((refreshed) => {
                if (refreshed) {
                  console.log('Token refreshed successfully');
                } else {
                  console.log('Token not refreshed, still valid');
                }
              })
              .catch((error) => {
                console.error('Failed to refresh token:', error);
                // Token refresh failed, redirect to login
                setAuthenticated(false);
                setFullName("");
                login();
              });
          };

          // Set up auth success callback
          keycloakInstance.onAuthSuccess = () => {
            console.log('Authentication successful');
            setAuthenticated(true);
            setFullName(getFullName());
          };

          // Set up auth error callback
          keycloakInstance.onAuthError = (error) => {
            console.error('Authentication error:', error);
            setAuthenticated(false);
            setFullName("");
          };

          // Set up auth logout callback
          keycloakInstance.onAuthLogout = () => {
            console.log('User logged out');
            setAuthenticated(false);
            setFullName("");
          };
        }
      } catch (error) {
        console.error("Auth initialization error", error);
        setAuthenticated(false);
        setFullName("");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      // Clean up event handlers
      keycloakInstance.onTokenExpired = undefined;
      keycloakInstance.onAuthSuccess = undefined;
      keycloakInstance.onAuthError = undefined;
      keycloakInstance.onAuthLogout = undefined;
    };
  }, []);

  const value = {
    authenticated,
    loading,
    fullName,
    login,
    logout: () => {
      console.log('Logging out...');
      setAuthenticated(false);
      setFullName("");
      logout();
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};