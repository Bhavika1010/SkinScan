import { useState } from 'react'
import { AlertTriangle, Sparkles, Droplets, HelpCircle } from 'lucide-react'
import { ComedogenicCard, IrritantCard, BeneficialCard, LowPorosityCard } from './IngredientCard'
import styles from './ResultsPanel.module.css'

const TABS = [
  { id: 'all',       label: 'All',        icon: null },
  { id: 'concerns',  label: 'Concerns',   icon: AlertTriangle },
  { id: 'beneficial',label: 'Beneficial', icon: Sparkles },
  { id: 'caution',   label: 'LP Caution', icon: Droplets },
  { id: 'unknown',   label: 'Unknown',    icon: HelpCircle },
]

export default function ResultsPanel({ results }) {
  const [activeTab, setActiveTab] = useState('all')

  const concerns = [...results.comedogenic, ...results.irritants]

  const tabCounts = {
    all: results.total,
    concerns: concerns.length,
    beneficial: results.beneficial.length,
    caution: results.low_porosity_warning.length,
    unknown: results.unrecognized.length,
  }

  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {Icon && <Icon size={13} />}
            {label}
            <span className={styles.count}>{tabCounts[id]}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {/* Concerns */}
        {(activeTab === 'all' || activeTab === 'concerns') && (
          <Section title="Comedogenic" items={results.comedogenic} color="red">
            {results.comedogenic.map((item, i) => <ComedogenicCard key={i} item={item} />)}
          </Section>
        )}
        {(activeTab === 'all' || activeTab === 'concerns') && (
          <Section title="Irritants" items={results.irritants} color="amber">
            {results.irritants.map((item, i) => <IrritantCard key={i} item={item} />)}
          </Section>
        )}

        {/* Beneficial */}
        {(activeTab === 'all' || activeTab === 'beneficial') && (
          <Section title="Beneficial Actives" items={results.beneficial} color="green">
            {results.beneficial.map((item, i) => <BeneficialCard key={i} item={item} />)}
          </Section>
        )}

        {/* LP */}
        {(activeTab === 'all' || activeTab === 'caution') && (
          <Section title="Low Porosity Caution" items={results.low_porosity_warning} color="teal">
            {results.low_porosity_warning.map((item, i) => <LowPorosityCard key={i} item={item} />)}
          </Section>
        )}

        {/* Unknown */}
        {(activeTab === 'all' || activeTab === 'unknown') && results.unrecognized.length > 0 && (
          <Section title="Unrecognized" items={results.unrecognized} color="stone">
            <p className={styles.unknownNote}>
              These ingredients weren't found in the database — not necessarily problematic, just not flagged either way.
            </p>
            <div className={styles.unknownList}>
              {results.unrecognized.map((name, i) => (
                <span key={i} className={styles.unknownTag}>{name}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Empty state per tab */}
        {activeTab !== 'all' && tabCounts[activeTab] === 0 && (
          <div className={styles.empty}>
            <p>Nothing in this category for this product.</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        Ratings based on CosDNA scale (0 = safe, 5 = very comedogenic). Always patch test new products.
      </div>
    </div>
  )
}

function Section({ title, items, color, children }) {
  if (!items || items.length === 0) return null
  return (
    <div className={styles.section}>
      <h3 className={`${styles.sectionTitle} ${styles[color]}`}>{title}</h3>
      <div className={styles.cards}>{children}</div>
    </div>
  )
}
