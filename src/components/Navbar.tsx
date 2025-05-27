"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./styles/Navbar.module.scss";

const Navbar = () => {
  const { authenticated, loading, fullName, login, logout } = useAuth();

  const handleManageAccount = () => {
    const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080";
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "master";
    const accountUrl = `${keycloakUrl}/realms/${realm}/account/`;
    window.open(accountUrl, '_blank');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.title}>Sarkis.dev</div>
      <div className={styles.authSection}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : authenticated ? (
          <>
            <div className={styles.userInfo}>
              <span className={styles.welcome}>Welcome, </span>
              <span className={styles.username}>{fullName}</span>
            </div>
            <button className={styles.accountButton} onClick={handleManageAccount}>
              Manage Account
            </button>
            <button className={styles.authButton} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className={styles.authButton} onClick={login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;