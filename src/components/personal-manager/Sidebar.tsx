"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./styles/Sidebar.module.scss";

type SidebarProps = {
  children: React.ReactNode;
};

const PersonalManagerSidebar = ({ children }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    {
      key: "tasks",
      label: "Tasks",
      path: "/personal-manager/tasks",
      icon: "📋"
    },
    {
      key: "calendar",
      label: "Calendar", 
      path: "/personal-manager/calendar",
      icon: "📅"
    },
    {
      key: "finances",
      label: "Finances",
      path: "/personal-manager/finances", 
      icon: "💰"
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for toggle event from navbar
  useEffect(() => {
    const handleToggle = () => {
      if (isMobile) {
        setIsMobileOpen(!isMobileOpen);
      }
    };

    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, [isMobile, isMobileOpen]);

  const handleNavigation = (path: string) => {
    router.push(path);
    // Close mobile menu after navigation
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          className={`${styles.overlay} ${isMobileOpen ? styles.visible : ''}`}
          onClick={closeMobileMenu}
        />
      )}
      
      <aside className={`${styles.sidebar} ${
        isCollapsed && !isMobile ? styles.collapsed : ''
      } ${isMobile && isMobileOpen ? styles.open : ''}`}>
        
        {/* Desktop toggle button */}
        {!isMobile && (
          <button 
            className={styles.toggleButton}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}

        <div className={styles.header}>
          <h2>Personal Manager</h2>
        </div>
        
        <nav className={styles.navigation}>
          {navigationItems.map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${
                isActive(item.path) ? styles.active : ""
              }`}
              onClick={() => handleNavigation(item.path)}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default PersonalManagerSidebar;