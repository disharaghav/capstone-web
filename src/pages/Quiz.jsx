import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { answerQuestion, nextQuestion } from '../store/quizSlice'
import { saveResult } from '../store/historySlice'
import styles from './Quiz.module.css'

export default function Quiz() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { questions, currentIndex, answers, status } = useSelector((s) => s.quiz)
  const timerRef = useRef(null)

  useEffect(() => {
    if (status === 'idle') navigate('/')
    if (status === 'finished') {
      const score = questions.filter((q, i) => answers[i] === q.correct_answer).length
      dispatch(saveResult({
        date: new Date().toISOString(),
        score,
        total: questions.length,
        category: questions[0]?.category || 'Mixed',
        difficulty: questions[0]?.difficulty || 'mixed',
        questions: questions.map((q, i) => ({
          question: q.question,
          correct: q.correct_answer,
          chosen: answers[i] || null,
        })),
      }))
      navigate('/results')
    }
  }, [status])

  if (!questions.length) return null

  const q = questions[currentIndex]
  const chosen = answers[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (ans) => {
    if (chosen) return
    dispatch(answerQuestion({ questionIndex: currentIndex, answer: ans }))
  }

  const handleNext = () => dispatch(nextQuestion())

  const diffColor = { easy: '#4ade80', medium: '#fbbf24', hard: '#f87171' }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>{q.category}</span>
          <span
            className={styles.diff}
            style={{ color: diffColor[q.difficulty] || 'var(--text-muted)' }}
          >
            {q.difficulty}
          </span>
        </div>
        <span className={styles.counter}>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.card}>
        <p className={styles.question}>{q.question}</p>

        <div className={styles.answers}>
          {q.allAnswers.map((ans) => {
            let cls = styles.ansBtn
            if (chosen) {
              if (ans === q.correct_answer) cls = `${styles.ansBtn} ${styles.correct}`
              else if (ans === chosen) cls = `${styles.ansBtn} ${styles.incorrect}`
              else cls = `${styles.ansBtn} ${styles.dimmed}`
            }
            return (
              <button key={ans} className={cls} onClick={() => handleAnswer(ans)}>
                {ans}
              </button>
            )
          })}
        </div>

        {chosen && (
          <div className={styles.feedback}>
            <p className={chosen === q.correct_answer ? styles.correct_text : styles.incorrect_text}>
              {chosen === q.correct_answer ? '✓ Correct!' : `✗ Correct answer: ${q.correct_answer}`}
            </p>
            <button className={styles.nextBtn} onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
