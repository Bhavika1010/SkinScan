import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoLeaf}>✦</span>
          <span className={styles.logoText}>SkinScan</span>
        </div>
        <p className={styles.tagline}>Know what's really in your products</p>
      </div>
    </header>
  )
}
