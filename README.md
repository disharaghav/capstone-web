# QuizQuest 📚

An adaptive quiz learning app built with React, Redux Toolkit, and the Open Trivia Database API.

## Tech Stack

- **Frontend**: React 18 (Vite), JavaScript (ES6+)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **API**: Open Trivia Database (free, no key required)
- **Styling**: CSS Modules

## Features

- ✅ Browse & filter 15+ quiz categories
- ✅ Set difficulty (Easy / Medium / Hard)
- ✅ Choose number of questions (5, 10, 15, 20)
- ✅ Debounced category search
- ✅ Live answer feedback (correct/incorrect)
- ✅ Detailed results review with correct answers
- ✅ Quiz history saved in localStorage
- ✅ Error Boundary for graceful error handling
- ✅ Responsive, dark-mode-first UI

## Advanced Features Used (per SOP)
1. Search + filter + sort (category search with debounce)
2. Debounced API calls (useDebounce hook on search input)
3. Error boundary implementation (App.jsx ErrorBoundary class)

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
# Deploy /dist folder to Vercel or Netlify
```

## API Used

[Open Trivia Database](https://opentdb.com/) — Free, no API key needed.
Endpoint: `https://opentdb.com/api.php`

## Project Structure

```
src/
├── components/     # Navbar
├── pages/          # Home, Quiz, Results, History
├── store/          # Redux slices (quiz, history)
├── hooks/          # useDebounce
└── utils/          # constants (categories, difficulties)
```
