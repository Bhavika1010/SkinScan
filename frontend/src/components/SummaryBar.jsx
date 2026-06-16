import styles from './SummaryBar.module.css'

export default function SummaryBar({ results }) {
  const concerns = results.comedogenic.length + results.irritants.length
  return (
    <div className={styles.bar}>
      <div className={`${styles.pill} ${styles.scanned}`}>
        <span className={styles.num}>{results.total}</span>
        <span className={styles.label}>scanned</span>
      </div>
      <div className={`${styles.pill} ${concerns > 0 ? styles.danger : styles.ok}`}>
        <span className={styles.num}>{concerns}</span>
        <span className={styles.label}>{concerns === 1 ? 'concern' : 'concerns'}</span>
      </div>
      <div className={`${styles.pill} ${styles.good}`}>
        <span className={styles.num}>{results.beneficial.length}</span>
        <span className={styles.label}>beneficial</span>
      </div>
      <div className={`${styles.pill} ${styles.warn}`}>
        <span className={styles.num}>{results.low_porosity_warning.length}</span>
        <span className={styles.label}>heavy</span>
      </div>
      <div className={`${styles.pill} ${styles.unknown}`}>
        <span className={styles.num}>{results.unrecognized.length}</span>
        <span className={styles.label}>unknown</span>
      </div>
    </div>
  )
}
