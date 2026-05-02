import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './quizSlice'
import historyReducer from './historySlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    history: historyReducer,
  },
})
