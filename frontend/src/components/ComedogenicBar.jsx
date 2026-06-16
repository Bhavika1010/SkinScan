import styles from "./ComedogenicBar.module.css";

export default function ComedogenicBar({ rating }) {
  const color = rating >= 4 ? "high" : rating >= 2 ? "mid" : "low";

  return (
    <div className={styles.wrapper}>
      <div className={styles.bars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`${styles.bar} ${styles[color]} ${i <= rating ? styles.filled : styles.empty}`}
          />
        ))}
      </div>
      <span className={`${styles.label} ${styles[color]}`}>{rating}/5</span>
    </div>
  );
}
