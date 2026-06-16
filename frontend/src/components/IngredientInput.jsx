import { useState } from 'react'
import styles from './IngredientInput.module.css'

const SAMPLE = `Water, Glycerin, Niacinamide, Sodium Hyaluronate, Coconut Oil, Fragrance, Alcohol Denat, Centella Asiatica Extract, Panthenol, Aloe Barbadensis Leaf Juice, Phenoxyethanol, Shea Butter, Citric Acid`

export default function IngredientInput({ onSubmit, loading }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSubmit(value)
  }

  const loadSample = () => setValue(SAMPLE)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Paste your ingredient list</h2>
        <p className={styles.sub}>Copy the full ingredient list from the back of your product — we'll do the rest.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="e.g. Water, Glycerin, Niacinamide, Fragrance, Coconut Oil..."
          rows={5}
          disabled={loading}
        />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.sampleBtn}
            onClick={loadSample}
            disabled={loading}
          >
            Try a sample
          </button>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || !value.trim()}
          >
            {loading ? 'Scanning...' : 'Scan ingredients'}
          </button>
        </div>
      </form>
    </div>
  )
}
