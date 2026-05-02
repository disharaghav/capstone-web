import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchQuestions, setConfig, resetQuiz } from '../store/quizSlice'
import { CATEGORIES, DIFFICULTIES } from '../utils/constants'
import { useDebounce } from '../hooks/useDebounce'
import styles from './Home.module.css'

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error, config } = useSelector((s) => s.quiz)

  const [amount, setAmount] = useState(config.amount)
  const [category, setCategory] = useState(config.category)
  const [difficulty, setDifficulty] = useState(config.difficulty)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 400)

  const filteredCategories = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleStart = () => {
    dispatch(resetQuiz())
    dispatch(setConfig({ amount, category, difficulty }))
    dispatch(fetchQuestions({ amount, category, difficulty }))
      .unwrap()
      .then(() => navigate('/quiz'))
      .catch(() => {})
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.tag}>Open Trivia · Real Questions · Instant Feedback</p>
        <h1 className={styles.title}>
          Test Your<br /><span>Knowledge</span>
        </h1>
        <p className={styles.subtitle}>
          Pick a topic, set your difficulty, and challenge yourself.
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Configure Your Quiz</h2>

        <div className={styles.field}>
          <label>Number of Questions</label>
          <div className={styles.amountRow}>
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                className={`${styles.chip} ${amount === n ? styles.chipActive : ''}`}
                onClick={() => setAmount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Difficulty</label>
          <div className={styles.amountRow}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                className={`${styles.chip} ${difficulty === d.id ? styles.chipActive : ''}`}
                onClick={() => setDifficulty(d.id)}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Category</label>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.categoryGrid}>
            {filteredCategories.map((c) => (
              <button
                key={c.id}
                className={`${styles.categoryBtn} ${category === c.id ? styles.categoryActive : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {error && <p className={styles.error}>⚠️ {error}. Please try again.</p>}

        <button
          className={styles.startBtn}
          onClick={handleStart}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading Questions...' : 'Start Quiz →'}
        </button>
      </div>
    </div>
  )
}
