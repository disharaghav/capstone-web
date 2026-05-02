import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetQuiz } from '../store/quizSlice'
import styles from './Results.module.css'

export default function Results() {
  const { questions, answers } = useSelector((s) => s.quiz)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!questions.length) {
    navigate('/')
    return null
  }

  const score = questions.filter((q, i) => answers[i] === q.correct_answer).length
  const pct = Math.round((score / questions.length) * 100)

  const grade =
    pct >= 80 ? { label: 'Excellent!', color: '#4ade80' }
    : pct >= 60 ? { label: 'Good Job!', color: '#fbbf24' }
    : { label: 'Keep Practicing', color: '#f87171' }

  return (
    <div className={styles.page}>
      <div className={styles.scoreCard}>
        <p className={styles.gradeLabel} style={{ color: grade.color }}>{grade.label}</p>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreNum}>{pct}%</span>
          <span className={styles.scoreDetail}>{score} / {questions.length}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={() => { dispatch(resetQuiz()); navigate('/') }}>
          Play Again
        </button>
        <button className={styles.secondaryBtn} onClick={() => navigate('/history')}>
          View History
        </button>
      </div>

      <h2 className={styles.reviewTitle}>Review Answers</h2>

      <div className={styles.reviewList}>
        {questions.map((q, i) => {
          const correct = answers[i] === q.correct_answer
          return (
            <div key={i} className={`${styles.reviewItem} ${correct ? styles.reviewCorrect : styles.reviewIncorrect}`}>
              <div className={styles.reviewHeader}>
                <span className={styles.qNum}>Q{i + 1}</span>
                <span className={correct ? styles.tagCorrect : styles.tagIncorrect}>
                  {correct ? '✓ Correct' : '✗ Wrong'}
                </span>
              </div>
              <p className={styles.qText}>{q.question}</p>
              {!correct && (
                <div className={styles.answerInfo}>
                  <span className={styles.yourAns}>
                    Your answer: <strong>{answers[i] || 'Skipped'}</strong>
                  </span>
                  <span className={styles.correctAns}>
                    Correct: <strong>{q.correct_answer}</strong>
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
