import { useState } from 'react'
import Header from './components/Header'
import IngredientInput from './components/IngredientInput'
import SummaryBar from './components/SummaryBar'
import ResultSection from './components/ResultSection'
import { analyzeIngredients } from './utils/api'
import styles from './App.module.css'

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (text) => {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const data = await analyzeIngredients(text)
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => { setResults(null); setError(null) }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>

          {!results ? (
            <>
              <div className={styles.hero}>
                <h1 className={styles.heroTitle}>
                  Your skin deserves<br />
                  <em>ingredient transparency.</em>
                </h1>
                <p className={styles.heroSub}>
                  Paste any skincare ingredient list and get a clear breakdown of pore-cloggers,
                  irritants, and actives that actually work for you.
                </p>
              </div>
              <IngredientInput onSubmit={handleSubmit} loading={loading} />
              {error && <div className={styles.error}>{error}</div>}
            </>
          ) : (
            <>
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>Scan results</h2>
                <button className={styles.backBtn} onClick={handleReset}>
                  Scan another product
                </button>
              </div>
              <SummaryBar results={results} />
              <div className={styles.resultsCard}>
                <ResultSection results={results} />
              </div>
            </>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>SkinScan — a portfolio project by Arica. Ingredient data based on CosDNA research.</p>
      </footer>
    </div>
  )
}
