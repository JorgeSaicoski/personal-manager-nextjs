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
  getUsername, 
  keycloakInstance
} from "@/services/auth/keycloak";

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  fullName: string;
  username: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  fullName: "",
  username: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initKeycloak();
        
        if (authenticated) {
          setAuthenticated(true);
          setFullName(getFullName());
          setUsername(getUsername());
          
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
                setAuthenticated(false);
                setFullName("");
                setUsername("");
                login();
              });
          };

          keycloakInstance.onAuthSuccess = () => {
            console.log('Authentication successful');
            setAuthenticated(true);
            setFullName(getFullName());
            setUsername(getUsername());
          };

          keycloakInstance.onAuthError = (error) => {
            console.error('Authentication error:', error);
            setAuthenticated(false);
            setFullName("");
            setUsername("");
          };

          keycloakInstance.onAuthLogout = () => {
            console.log('User logged out');
            setAuthenticated(false);
            setFullName("");
            setUsername("");
          };
        }
      } catch (error) {
        console.error("Auth initialization error", error);
        setAuthenticated(false);
        setFullName("");
        setUsername("");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
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
    username,
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