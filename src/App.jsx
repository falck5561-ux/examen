import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './components/Dashboard.jsx'
import ModuleView from './components/ModuleView.jsx'
import FlashcardsView from './components/FlashcardsView.jsx'
import QuizView from './components/QuizView.jsx'
import SearchResults from './components/SearchResults.jsx'
import { allFlashcards, allQuestions, getModule, modules } from './data/studyData.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const initialProgress = { answered: {}, favorites: [], favoriteModules: [], bestScore: 0, streak: 0, lastStudy: null }

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedModule, setSelectedModule] = useState(null)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizTitle, setQuizTitle] = useState('Repaso rápido')
  const [quizMode, setQuizMode] = useState('practice')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useLocalStorage('economia-study-theme', false)
  const [progress, setProgress] = useLocalStorage('economia-study-progress', initialProgress)

  const stats = useMemo(() => {
    const answered = Object.values(progress.answered)
    return { total: allQuestions.length, mastered: answered.filter((item) => item.correct).length, streak: progress.streak || 0, bestScore: progress.bestScore || 0 }
  }, [progress])

  const getProgress = (moduleId) => {
    const questions = getModule(moduleId).questions
    const completed = questions.filter((question) => progress.answered[question.id]?.correct).length
    return { completed, total: questions.length }
  }

  const markAnswered = (questionId, correct) => {
    const today = new Date().toISOString().slice(0, 10)
    setProgress((current) => {
      const next = { ...current, answered: { ...current.answered, [questionId]: { correct, date: today } }, lastStudy: today }
      if (current.lastStudy !== today) next.streak = (current.streak || 0) + 1
      return next
    })
  }

  const openModule = (moduleId) => { setSelectedModule(moduleId); setActiveView('module') }
  const startQuiz = (mode = 'quick', moduleId = null) => {
    let questions = moduleId ? getModule(moduleId).questions.map((q) => ({ ...q, moduleId })) : allQuestions
    if (mode === 'quick') questions = shuffle(questions).slice(0, 10)
    if (mode === 'simulator') questions = shuffle(questions).slice(0, 20)
    setQuizQuestions(questions)
    setQuizMode(mode === 'simulator' ? 'simulator' : 'practice')
    setQuizTitle(moduleId ? getModule(moduleId).title : mode === 'simulator' ? 'Simulacro completo' : 'Repaso rápido')
    setActiveView('quiz')
  }
  const completeQuiz = (id, correct) => {
    markAnswered(id, correct)
  }
  const onQuizComplete = (id, correct) => completeQuiz(id, correct)
  const toggleQuestionFavorite = (id) => setProgress((current) => ({ ...current, favorites: current.favorites.includes(id) ? current.favorites.filter((item) => item !== id) : [...current.favorites, id] }))
  const toggleModuleFavorite = (id) => setProgress((current) => ({ ...current, favoriteModules: current.favoriteModules.includes(id) ? current.favoriteModules.filter((item) => item !== id) : [...current.favoriteModules, id] }))
  const resetProgress = () => { if (window.confirm('¿Quieres borrar todo tu progreso guardado?')) setProgress(initialProgress) }
  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    const moduleResults = modules.filter((module) => `${module.title} ${module.summary} ${module.keyPoints.join(' ')}`.toLowerCase().includes(q)).map((module) => ({ kind: 'module', id: module.id, moduleId: module.id, moduleTitle: module.title, title: module.title, description: module.summary }))
    const questionResults = allQuestions.filter((question) => `${question.prompt} ${question.options.join(' ')} ${question.explanation}`.toLowerCase().includes(q)).slice(0, 8).map((question) => ({ kind: 'question', id: question.id, moduleId: question.moduleId, moduleTitle: question.moduleTitle, title: question.prompt, description: question.explanation }))
    return [...moduleResults, ...questionResults]
  }, [search])

  const renderView = () => {
    if (search.trim()) return <SearchResults results={results} query={search.trim()} onOpenModule={openModule} onStartQuiz={(moduleId) => startQuiz('module', moduleId)} />
    if (activeView === 'dashboard') return <Dashboard modules={modules} getProgress={getProgress} stats={stats} onOpenModule={openModule} onStartQuiz={startQuiz} onOpenFlashcards={() => setActiveView('flashcards')} />
    if (activeView === 'modules') return <div className="view-content"><div className="page-intro"><div><span className="section-kicker">RUTA DE ESTUDIO</span><h2>Todos tus módulos</h2><p>Elige un tema y empieza una sesión de práctica.</p></div></div><div className="modules-grid">{modules.map((module) => <div key={module.id} className="module-card-wrapper"><button className="module-card" style={{ '--module-color': module.color, '--module-soft': module.soft }} onClick={() => openModule(module.id)}><div className="module-card-top"><span className="module-icon">{module.icon}</span><span className="module-arrow">→</span></div><span className="eyebrow">{module.eyebrow}</span><h3>{module.title}</h3><p>{module.summary}</p><div className="module-progress-line"><span style={{ width: `${(getProgress(module.id).completed / getProgress(module.id).total) * 100}%`, background: module.color }} /></div><div className="module-card-footer"><span>{getProgress(module.id).completed}/{getProgress(module.id).total} preguntas dominadas</span></div></button><button className="module-mini-quiz" onClick={() => startQuiz('module', module.id)}>Practicar ahora →</button></div>)}</div></div>
    if (activeView === 'flashcards') return <FlashcardsView cards={allFlashcards} onBack={() => setActiveView('dashboard')} />
    if (activeView === 'quiz') return <QuizView questions={quizQuestions} title={quizTitle} initialMode={quizMode} onExit={() => setActiveView('dashboard')} onComplete={onQuizComplete} savedQuestionIds={progress.favorites} onToggleQuestionFavorite={toggleQuestionFavorite} />
    if (activeView === 'module' && selectedModule) return <ModuleView module={getModule(selectedModule)} progress={getProgress(selectedModule)} favorites={progress.favoriteModules} onBack={() => setActiveView('modules')} onStart={(id) => startQuiz('module', id)} onToggleFavorite={toggleModuleFavorite} />
    return null
  }

  return <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}><Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={menuOpen} setIsOpen={setMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode} onReset={resetProgress} /><main className="main-area"><Topbar onOpenMenu={() => setMenuOpen(true)} search={search} setSearch={setSearch} onQuickQuiz={() => startQuiz('quick')} />{renderView()}</main></div>
}
