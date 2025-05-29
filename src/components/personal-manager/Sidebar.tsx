"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./styles/Sidebar.module.scss";

type SidebarProps = {
  children: React.ReactNode;
};

const PersonalManagerSidebar = ({ children }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
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