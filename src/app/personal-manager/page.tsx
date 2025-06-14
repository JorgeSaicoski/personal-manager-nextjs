"use client";

import AuthRoutes from "@/components/protected-routes/AuthRoutes";
import styles from "./page.module.scss";

export default function PersonalManagerPage() {
  return (
    <AuthRoutes>
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeContent}>
            <h1>Welcome to Personal Manager</h1>
            <p>Choose a service from the sidebar to get started:</p>
            
            <div className={styles.serviceCards}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>📋</div>
                <h3>Tasks</h3>
                <p>Manage your daily tasks and projects</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>📅</div>
                <h3>Calendar</h3>
                <p>Plan and schedule your activities</p>
              </div>
              
              <div className={styles.card}>
                <div className={styles.cardIcon}>💰</div>
                <h3>Finances</h3>
                <p>Track your expenses and budget</p>
              </div>
            </div>
          </div>
        </div>
    </AuthRoutes>
  );
}