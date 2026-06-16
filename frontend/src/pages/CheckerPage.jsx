import { useChecker } from "../hooks/useChecker.js";
import IngredientInput from "../components/IngredientInput.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import styles from "./CheckerPage.module.css";

export default function CheckerPage() {
  const { results, loading, error, analyze, reset } = useChecker();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>Skincare Tool</div>
        <h1 className={styles.title}>Ingredient Checker</h1>
        <p className={styles.subtitle}>
          Paste any product's ingredient list and instantly see what's
          working for your skin — and what isn't.
        </p>
      </header>

      <main className={styles.main}>
        <IngredientInput
          onSubmit={analyze}
          loading={loading}
        />

        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>!</span>
            {error}
          </div>
        )}

        {results && <ResultsPanel results={results} />}
      </main>

      <footer className={styles.footer}>
        Built with Flask + React &mdash; ingredient data sourced from CosDNA & dermatological references
      </footer>
    </div>
  );
}
