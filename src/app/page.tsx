"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/personal-manager");
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Sarkis.dev</h1>
        <p className={styles.subtitle}>
          Smart Development & Deployment Solutions for Small and Medium
          Companies
        </p>
        <div className={styles.cta}>
          <button onClick={handleGetStarted}>
            Get Started with Personal Manager
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Personal Manager Features</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📋</div>
              <h3 className={styles.cardTitle}>Task Management</h3>
              <p className={styles.cardText}>
                Organize your work efficiently with our intuitive task
                management system. Track progress, set priorities, and never
                miss a deadline.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📚</div>
              <h3 className={styles.cardTitle}>Study Organization</h3>
              <p className={styles.cardText}>
                Plan your learning journey with structured study schedules,
                progress tracking, and goal management for continuous
                improvement.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💰</div>
              <h3 className={styles.cardTitle}>Finance Tracking</h3>
              <p className={styles.cardText}>
                Keep your personal and business finances organized with expense
                tracking, budget planning, and financial insights.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📅</div>
              <h3 className={styles.cardTitle}>Calendar Integration</h3>
              <p className={styles.cardText}>
                Sync all your activities in one place. Manage appointments,
                deadlines, and events with our comprehensive calendar system.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🔐</div>
              <h3 className={styles.cardTitle}>Enterprise Security</h3>
              <p className={styles.cardText}>
                Built with Keycloak SSO for enterprise-grade authentication.
                Secure user management, role-based access, and seamless login
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={styles.technology}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Technology Stack</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <div className={styles.techIcon}>⚡</div>
              <h3 className={styles.techTitle}>Golang Backend</h3>
              <p className={styles.techText}>
                High-performance, efficient backend services that reduce server
                costs and provide lightning-fast response times.
              </p>
            </div>

            <div className={styles.techCard}>
              <div className={styles.techIcon}>🔐</div>
              <h3 className={styles.techTitle}>Keycloak SSO</h3>
              <p className={styles.techText}>
                Enterprise-grade authentication and authorization. Single
                sign-on, user federation, and identity management for secure
                applications.
              </p>
            </div>

            <div className={styles.techCard}>
              <div className={styles.techIcon}>🐳</div>
              <h3 className={styles.techTitle}>Container Deployment</h3>
              <p className={styles.techText}>
                Docker/Podman containerization for consistent deployments across
                development, staging, and production environments.
              </p>
            </div>

            <div className={styles.techCard}>
              <div className={styles.techIcon}>🚀</div>
              <h3 className={styles.techTitle}>Modern Frontend</h3>
              <p className={styles.techText}>
                React/Next.js applications with TypeScript for type-safe,
                maintainable, and performant user interfaces.
              </p>
            </div>

            <div className={styles.techCard}>
              <div className={styles.techIcon}>🌐</div>
              <h3 className={styles.techTitle}>NGINX Gateway</h3>
              <p className={styles.techText}>
                High-performance reverse proxy and API gateway for efficient
                request routing, load balancing, and SSL termination across
                microservices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About Sarkis.dev</h2>
          <div className={styles.aboutText}>
            <p>
              We specialize in{" "}
              <span className={styles.highlight}>
                development and deployment solutions
              </span>
              tailored for small and medium companies. Our mission is to provide
              efficient, cost-effective technology solutions that scale with
              your business.
            </p>

            <p>
              We believe that{" "}
              <span className={styles.highlight}>
                serverless isn't made for every company
              </span>
              . High costs can burden growing businesses, so we focus on local
              deployments for internal software and VM/dedicated server rentals
              with providers like Hetzner and DigitalOcean for public-facing
              applications.
            </p>

            <p>
              Using{" "}
              <span className={styles.highlight}>
                Golang for backend development
              </span>
              , we deliver high-performance applications that reduce operational
              costs while maintaining reliability and scalability.
            </p>
          </div>

          <div className={styles.values}>
            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Open Source First</h4>
              <p className={styles.valueText}>
                We work with open source technologies and only close software
                when companies require specific security measures.
              </p>
            </div>

            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Cost Optimization</h4>
              <p className={styles.valueText}>
                We study each case individually to provide the best approach
                with minimal costs for maximum efficiency.
              </p>
            </div>

            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Performance Focus</h4>
              <p className={styles.valueText}>
                High-performance solutions built with modern technologies like
                Go to ensure your applications run smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerText}>
          Built with ❤️ by <span className={styles.brand}>Sarkis.dev</span> -
          Smart solutions for growing companies
        </div>
      </footer>
    </div>
  );
}
