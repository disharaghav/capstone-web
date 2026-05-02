import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import History from './pages/History'
import Navbar from './components/Navbar'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', gap: '1rem',
          fontFamily: 'var(--font-display)'
        }}>
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-muted)' }}>Please refresh the page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem', background: 'var(--accent)',
              color: '#000', border: 'none', borderRadius: 'var(--radius)',
              fontWeight: 700, fontSize: '1rem'
            }}
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </ErrorBoundary>
  )
}
