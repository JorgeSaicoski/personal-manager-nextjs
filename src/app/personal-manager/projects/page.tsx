import Link from 'next/link'
import styles from './page.module.scss'

const categories = [
  { title: 'Professional Projects', slug: 'professional' },
  { title: 'Financial Projects',    slug: 'financial'    },
  { title: 'Education Projects',    slug: 'education'    },
  { title: 'Other Projects',        slug: 'other'        },
]

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📂 Projects</h1>

      <div className={styles.grid}>
        {categories.map(({ title, slug }) => (
          <Link
            key={slug}
            href={`/personal-manager/projects/${slug}`}
            className={styles.card}
          >
            <h2>{title} &rarr;</h2>
          </Link>
        ))}
      </div>

      {/* Placeholder for “create new” button or list */}
      <div className={styles.footer}>
        <Link href="/personal-manager/projects/create" className={styles.createBtn}>
          + New Project
        </Link>
      </div>
    </div>
  )
}
