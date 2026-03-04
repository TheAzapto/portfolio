import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Test from './pages/Test'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import { ThemeProvider } from './context/ThemeContext'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/project" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/project/:id" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/test" element={<PageTransition><Test /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="app">
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App

