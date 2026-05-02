import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ amount, category, difficulty }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ amount })
      if (category) params.append('category', category)
      if (difficulty) params.append('difficulty', difficulty)
      params.append('type', 'multiple')

      const res = await axios.get(`https://opentdb.com/api.php?${params}`)
      if (res.data.response_code !== 0) throw new Error('Failed to fetch')

      return res.data.results.map((q) => ({
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHtml),
        category: q.category,
        difficulty: q.difficulty,
        allAnswers: shuffle([
          decodeHtml(q.correct_answer),
          ...q.incorrect_answers.map(decodeHtml),
        ]),
      }))
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentIndex: 0,
    answers: [],
    status: 'idle', // idle | loading | active | finished | error
    error: null,
    config: { amount: 10, category: '', difficulty: '' },
  },
  reducers: {
    setConfig(state, action) {
      state.config = { ...state.config, ...action.payload }
    },
    answerQuestion(state, action) {
      const { questionIndex, answer } = action.payload
      state.answers[questionIndex] = answer
    },
    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1
      } else {
        state.status = 'finished'
      }
    },
    resetQuiz(state) {
      state.questions = []
      state.currentIndex = 0
      state.answers = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload
        state.currentIndex = 0
        state.answers = []
        state.status = 'active'
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  },
})

export const { setConfig, answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions
export default quizSlice.reducer
