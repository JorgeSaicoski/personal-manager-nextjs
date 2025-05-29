"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./styles/Navbar.module.scss";

const Navbar = () => {
  const { authenticated, loading, fullName, username, login, logout } = useAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check if we're in personal manager section
  const isPersonalManager = pathname.startsWith('/personal-manager');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleManageAccount = () => {
    const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080";
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "master";
    const accountUrl = `${keycloakUrl}/realms/${realm}/account/`;
    window.open(accountUrl, '_blank');
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const triggerSidebarToggle = () => {
    // Dispatch custom event to trigger sidebar toggle
    window.dispatchEvent(new CustomEvent('toggleSidebar'));
    setShowMobileMenu(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        {/* Mobile hamburger for personal manager */}
        {isMobile && isPersonalManager && authenticated && (
          <button 
            className={styles.hamburger}
            onClick={triggerSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <div className={styles.title}>Sarkis.dev</div>
      </div>

      <div className={styles.authSection}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : authenticated ? (
          <>
            {/* Desktop auth section */}
            {!isMobile ? (
              <>
                <div className={styles.userInfo}>
                  <span className={styles.welcome}>Welcome, </span>
                  <span className={styles.username}>{fullName || username}</span>
                </div>
                <button className={styles.accountButton} onClick={handleManageAccount}>
                  Manage Account
                </button>
                <button className={styles.authButton} onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              /* Mobile auth section */
              <div className={styles.mobileAuth}>
                <button 
                  className={styles.mobileMenuButton}
                  onClick={toggleMobileMenu}
                  aria-label="User menu"
                >
                  <span className={styles.username}>{fullName || username}</span>
                  <span className={styles.menuIcon}>▼</span>
                </button>
                
                {showMobileMenu && (
                  <div className={styles.mobileDropdown}>
                    <button onClick={handleManageAccount}>
                      Manage Account
                    </button>
                    <button onClick={() => { logout(); setShowMobileMenu(false); }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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