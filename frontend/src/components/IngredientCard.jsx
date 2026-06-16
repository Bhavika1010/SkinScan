import styles from './IngredientCard.module.css'

function ComedoBar({ rating }) {
  return (
    <div className={styles.comedoBar} title={`${rating}/5 comedogenicity`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`${styles.block} ${i <= rating ? styles[ratingColor(rating)] : styles.empty}`} />
      ))}
      <span className={styles.comedoNum}>{rating}/5</span>
    </div>
  )
}

function ratingColor(r) {
  if (r >= 4) return 'high'
  if (r >= 2) return 'mid'
  return 'low'
}

export function ComedogenicCard({ item }) {
  return (
    <div className={`${styles.card} ${styles.comedogenic}`}>
      <div className={styles.top}>
        <span className={styles.badge} data-type="comedogenic">Comedogenic</span>
        <span className={styles.name}>{item.name}</span>
        {item.matched !== item.name && (
          <span className={styles.alias}>matched as {item.matched}</span>
        )}
      </div>
      <ComedoBar rating={item.rating} />
      <p className={styles.reason}>{item.reason}</p>
    </div>
  )
}

export function IrritantCard({ item }) {
  return (
    <div className={`${styles.card} ${styles.irritant}`}>
      <div className={styles.top}>
        <span className={styles.badge} data-type={`irritant-${item.severity}`}>
          {item.severity} irritant
        </span>
        <span className={styles.name}>{item.name}</span>
        {item.matched !== item.name && (
          <span className={styles.alias}>matched as {item.matched}</span>
        )}
      </div>
      <p className={styles.reason}>{item.reason}</p>
    </div>
  )
}

export function BeneficialCard({ item }) {
  return (
    <div className={`${styles.card} ${styles.beneficial}`}>
      <div className={styles.top}>
        <span className={styles.badge} data-type="beneficial">Beneficial</span>
        <span className={styles.name}>{item.name}</span>
        {item.matched !== item.name && (
          <span className={styles.alias}>matched as {item.matched}</span>
        )}
      </div>
      <p className={styles.reason}>{item.benefit}</p>
    </div>
  )
}

export function LowPorosityCard({ item }) {
  return (
    <div className={`${styles.card} ${styles.lp}`}>
      <div className={styles.top}>
        <span className={styles.badge} data-type="lp">LP caution</span>
        <span className={styles.name}>{item.name}</span>
        {item.matched !== item.name && (
          <span className={styles.alias}>matched as {item.matched}</span>
        )}
      </div>
      <p className={styles.reason}>{item.reason}</p>
    </div>
  )
}
