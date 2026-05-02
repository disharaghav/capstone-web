import { useSelector, useDispatch } from 'react-redux'
import { clearHistory } from '../store/historySlice'
import styles from './History.module.css'

export default function History() {
  const history = useSelector((s) => s.history)
  const dispatch = useDispatch()

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quiz History</h1>
          <p className={styles.subtitle}>{history.length} attempt{history.length !== 1 ? 's' : ''} saved</p>
        </div>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={() => dispatch(clearHistory())}>
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>
          <span>📭</span>
          <p>No quiz history yet. Start a quiz to track your progress!</p>
        </div>
      ) : (
        <div className={styles.list}>
          {history.map((item, i) => {
            const pct = Math.round((item.score / item.total) * 100)
            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardLeft}>
                  <p className={styles.cardCat}>{item.category}</p>
                  <p className={styles.cardDate}>{formatDate(item.date)}</p>
                  <span className={styles.cardDiff}>{item.difficulty}</span>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.pct} style={{
                    color: pct >= 80 ? 'var(--correct)' : pct >= 60 ? '#fbbf24' : 'var(--incorrect)'
                  }}>
                    {pct}%
                  </span>
                  <span className={styles.fraction}>{item.score}/{item.total}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
