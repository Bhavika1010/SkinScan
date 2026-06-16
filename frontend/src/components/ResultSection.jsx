import RatingBar from './RatingBar'
import styles from './ResultSection.module.css'

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 }

function Badge({ type }) {
  const labels = { high: 'HIGH', medium: 'MEDIUM', low: 'LOW' }
  return <span className={`${styles.badge} ${styles['badge_' + type]}`}>{labels[type]}</span>
}

function IngredientName({ name, matched }) {
  const display = name.replace(/\b\w/g, c => c.toUpperCase())
  const matchedDisplay = matched.replace(/\b\w/g, c => c.toUpperCase())
  const showAlias = name.toLowerCase() !== matched.toLowerCase()
  return (
    <span className={styles.nameWrap}>
      <span className={styles.name}>{display}</span>
      {showAlias && <span className={styles.alias}>({matchedDisplay})</span>}
    </span>
  )
}

export default function ResultSection({ results }) {
  const sorted_irritants = [...results.irritants].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
  )

  return (
    <div className={styles.sections}>

      {results.comedogenic.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.red}`}>Pore-clogging ingredients</h3>
          <div className={styles.list}>
            {results.comedogenic.map((item, i) => (
              <div key={i} className={`${styles.card} ${styles.cardRed}`}>
                <div className={styles.cardTop}>
                  <IngredientName name={item.name} matched={item.matched} />
                  <RatingBar rating={item.rating} />
                </div>
                <p className={styles.reason}>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {sorted_irritants.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.amber}`}>Irritants & sensitizers</h3>
          <div className={styles.list}>
            {sorted_irritants.map((item, i) => (
              <div key={i} className={`${styles.card} ${styles.cardAmber}`}>
                <div className={styles.cardTop}>
                  <IngredientName name={item.name} matched={item.matched} />
                  <Badge type={item.severity} />
                </div>
                <p className={styles.reason}>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.beneficial.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.sage}`}>Beneficial actives</h3>
          <div className={styles.list}>
            {results.beneficial.map((item, i) => (
              <div key={i} className={`${styles.card} ${styles.cardSage}`}>
                <div className={styles.cardTop}>
                  <IngredientName name={item.name} matched={item.matched} />
                </div>
                <p className={styles.reason}>{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.low_porosity_warning.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.amber}`}>Heavy / low-porosity caution</h3>
          <div className={styles.list}>
            {results.low_porosity_warning.map((item, i) => (
              <div key={i} className={`${styles.card} ${styles.cardAmberLight}`}>
                <div className={styles.cardTop}>
                  <IngredientName name={item.name} matched={item.matched} />
                  <span className={styles.tagHeavy}>Heavy</span>
                </div>
                <p className={styles.reason}>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.unrecognized.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.soft}`}>Not in database</h3>
          <div className={styles.unknownGrid}>
            {results.unrecognized.map((name, i) => (
              <span key={i} className={styles.unknownChip}>
                {name.replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            ))}
          </div>
          <p className={styles.unknownNote}>These weren't flagged — not necessarily bad, just not in our database yet.</p>
        </div>
      )}

      <p className={styles.disclaimer}>
        Comedogenicity ratings based on the CosDNA scale (0 = safe, 5 = very likely to clog pores).
        Results are a guide — always patch test new products.
      </p>
    </div>
  )
}
