import { FlaskConical, Shuffle, X } from 'lucide-react'
import styles from './InputPanel.module.css'

export default function InputPanel({ input, setInput, onAnalyze, onSample, onReset, loading }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onAnalyze()
  }

  return (
    <div className={styles.panel}>
      <div className={styles.labelRow}>
        <label htmlFor="ingredients" className={styles.label}>
          Paste your ingredient list
        </label>
        <span className={styles.hint}>Ctrl + Enter to analyze</span>
      </div>

      <div className={styles.textareaWrap}>
        <textarea
          id="ingredients"
          className={styles.textarea}
          placeholder="e.g. Water, Glycerin, Niacinamide, Fragrance, Coconut Oil, Alcohol Denat..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={6}
          spellCheck={false}
        />
        {input && (
          <button className={styles.clearBtn} onClick={onReset} title="Clear">
            <X size={14} />
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.sampleBtn}
          onClick={onSample}
          disabled={loading}
        >
          <Shuffle size={14} />
          Load sample
        </button>

        <button
          className={styles.analyzeBtn}
          onClick={onAnalyze}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <FlaskConical size={15} />
          )}
          {loading ? 'Analyzing...' : 'Analyze ingredients'}
        </button>
      </div>
    </div>
  )
}
