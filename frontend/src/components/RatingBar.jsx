import styles from './RatingBar.module.css'

export default function RatingBar({ rating }) {
  return (
    <div className={styles.wrap}>
      {[1,2,3,4,5].map(i => (
        <div
          key={i}
          className={`${styles.block} ${i <= rating ? styles[`r${rating}`] : styles.empty}`}
        />
      ))}
      <span className={styles.label}>{rating}/5</span>
    </div>
  )
}
