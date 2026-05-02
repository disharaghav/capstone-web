import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem('quizHistory')) || []
  } catch {
    return []
  }
}

const historySlice = createSlice({
  name: 'history',
  initialState: load(),
  reducers: {
    saveResult(state, action) {
      state.unshift(action.payload)
      if (state.length > 20) state.pop()
      localStorage.setItem('quizHistory', JSON.stringify(state))
    },
    clearHistory() {
      localStorage.removeItem('quizHistory')
      return []
    },
  },
})

export const { saveResult, clearHistory } = historySlice.actions
export default historySlice.reducer
