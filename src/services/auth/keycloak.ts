import Keycloak from "keycloak-js";

// Keycloak initialization options
const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "master",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "frontend-app",
};

// Initialize Keycloak instance
const keycloakInstance = new Keycloak(keycloakConfig);

// Function to initialize Keycloak
const initKeycloak = () => {
  const silentCheckUrl = window.location.origin + '/silent-check-sso.html';
  
  console.log('Silent check SSO URL:', silentCheckUrl);
  
  return keycloakInstance
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: silentCheckUrl,
      checkLoginIframe: false,
      enableLogging: true,
    })
    .then((authenticated) => {
      console.log("Keycloak initialized, authenticated:", authenticated);
      return authenticated;
    })
    .catch((error) => {
      console.error("Failed to initialize Keycloak", error);
      return false;
    });
};

// Login function
const login = () => {
  keycloakInstance.login();
};

// Logout function - Fixed to properly redirect
const logout = () => {
  keycloakInstance.logout({
    redirectUri: window.location.origin
  });
};

// Get user profile
const getUserProfile = () => {
  return keycloakInstance.loadUserProfile();
};

// Get username
const getUsername = () => {
  return keycloakInstance.tokenParsed?.preferred_username || '';
};

// Get user's full name
const getFullName = () => {
  return keycloakInstance.tokenParsed?.name || '';
};

// Check if user has a specific role
const hasRole = (role: string) => {
  return keycloakInstance.hasRealmRole(role);
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!keycloakInstance.authenticated;
};

// Get authentication token
const getToken = () => {
  return keycloakInstance.token;
};

// Update authentication token - important for keeping the session alive
const updateToken = (minValidity: number = 5) => {
  return keycloakInstance.updateToken(minValidity);
};

export {
  keycloakInstance,
  initKeycloak,
  login,
  logout,
  getUserProfile,
  getUsername,
  getFullName,
  hasRole,
  isAuthenticated,
  getToken,
  updateToken,
};