import Link from 'next/link';
import styles from './page.module.scss';

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📂 Projects</h1>

      <div className={styles.grid}>
        {['Professional', 'Financial', 'Education', 'Other'].map(cat => (
          <Link
            key={cat}
            href={`/personal-manager/projects/${cat.toLowerCase()}`}
            className={styles.card}
          >
            <h3>{cat} Projects</h3>
            <p>
              View and manage all your {cat.toLowerCase()} projects here.
            </p>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/personal-manager/projects/create" className={styles.createBtn}>
          + New Project
        </Link>
      </div>
    </div>
  );
}
