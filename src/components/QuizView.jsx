import { ArrowLeft, ArrowRight, Bookmark, Check, CircleAlert, Clock3, Flag, Heart, RotateCcw, Trophy, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

export default function QuizView({ questions, title, onExit, onComplete, savedQuestionIds, onToggleQuestionFavorite, initialMode = 'practice' }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)
  const current = questions[index]
  const answered = selected !== null
  const score = useMemo(() => results.filter(Boolean).length, [results])
  const selectAnswer = (choice) => {
    if (answered) return
    setSelected(choice)
    setResults((items) => [...items, choice === current.answer])
    if (choice === current.answer) onComplete(current.id, true)
    else onComplete(current.id, false)
  }
  const goNext = () => {
    if (index === questions.length - 1) { setFinished(true); return }
    setIndex((value) => value + 1)
    setSelected(null)
  }
  const restart = () => { setIndex(0); setSelected(null); setResults([]); setFinished(false) }
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return <motion.div className="quiz-result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}><div className="result-medal"><Trophy size={38} /></div><span className="section-kicker">SESIÓN TERMINADA</span><h2>{percentage >= 80 ? '¡Vas muy bien!' : 'Cada error te enseña algo'}</h2><p>Terminaste <strong>{title}</strong> y acertaste {score} de {questions.length} preguntas.</p><div className="result-score"><strong>{percentage}%</strong><span>de aciertos</span></div><div className="result-actions"><button className="primary-button" onClick={restart}><RotateCcw size={16} /> Repetir sesión</button><button className="secondary-button" onClick={onExit}>Volver al inicio</button></div></motion.div>
  }
  const progress = (index / questions.length) * 100
  return <motion.div className="view-content quiz-view" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
    <div className="quiz-top"><button className="back-link" onClick={onExit}><ArrowLeft size={17} /> Salir</button><div className="quiz-title"><span>{initialMode === 'simulator' ? 'SIMULACRO' : 'PRÁCTICA'} · {title}</span><strong>Pregunta {index + 1}<small>/{questions.length}</small></strong></div><div className="quiz-tools"><Clock3 size={16} /><span>Sin presión</span></div></div>
    <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
    <div className="quiz-layout"><div className="question-panel"><div className="question-meta"><span className="question-tag">{current.type === 'truefalse' ? 'VERDADERO O FALSO' : 'OPCIÓN MÚLTIPLE'}</span><button className={`bookmark-question ${savedQuestionIds.includes(current.id) ? 'saved' : ''}`} onClick={() => onToggleQuestionFavorite(current.id)}><Bookmark size={18} fill={savedQuestionIds.includes(current.id) ? 'currentColor' : 'none'} /></button></div><h2>{current.prompt}</h2><div className="options-list">{current.options.map((option, choice) => { const isCorrect = choice === current.answer; const isSelected = choice === selected; return <button key={option} className={`option-button ${answered && isCorrect ? 'correct' : ''} ${answered && isSelected && !isCorrect ? 'incorrect' : ''}`} onClick={() => selectAnswer(choice)}><span className="option-letter">{String.fromCharCode(65 + choice)}</span><span>{option}</span>{answered && isCorrect && <Check size={18} />}{answered && isSelected && !isCorrect && <X size={18} />}</button> })}</div>{answered && <motion.div className={`answer-feedback ${selected === current.answer ? 'good' : 'bad'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{selected === current.answer ? <Check size={19} /> : <CircleAlert size={19} />}<div><strong>{selected === current.answer ? 'Respuesta correcta' : 'Revisa este concepto'}</strong><p>{current.explanation}</p></div></motion.div>}<div className="question-footer"><span><Flag size={15} /> Puedes guardar esta pregunta</span><button className="primary-button" disabled={!answered} onClick={goNext}>{index === questions.length - 1 ? 'Ver resultado' : 'Siguiente'} <ArrowRight size={16} /></button></div></div><aside className="quiz-side"><div className="side-progress-card"><div className="side-card-heading"><span>Tu sesión</span><strong>{Math.round(((index + (answered ? 1 : 0)) / questions.length) * 100)}%</strong></div><div className="side-bar"><span style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="side-mini-stats"><span><strong>{score}</strong> correctas</span><span><strong>{results.filter((value) => !value).length}</strong> por revisar</span></div></div><div className="tip-card"><Heart size={18} /><strong>Tip de estudio</strong><p>No memorices solo la respuesta. Explica por qué las otras opciones son incorrectas.</p></div></aside></div>
  </motion.div>
}
