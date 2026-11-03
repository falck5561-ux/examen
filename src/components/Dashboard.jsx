import { ArrowRight, BookMarked, Flame, Target, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import ModuleCard from './ModuleCard'
import ProgressRing from './ProgressRing'

export default function Dashboard({ modules, getProgress, stats, onOpenModule, onStartQuiz, onOpenFlashcards }) {
  const progressValue = stats.total ? (stats.mastered / stats.total) * 100 : 0
  return (
    <motion.div className="view-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <section className="hero-card">
        <div className="hero-copy">
          <div className="hero-label"><span className="pulse-dot" /> Sesión activa</div>
          <h2>Estudia con intención.<br /><em>Aprueba con confianza.</em></h2>
          <p>Tu centro interactivo para dominar el segundo parcial de Economía en sesiones cortas y enfocadas.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onStartQuiz('quick')}>Empezar repaso <ArrowRight size={17} /></button>
            <button className="ghost-button light" onClick={onOpenFlashcards}><BookMarked size={17} /> Ver tarjetas</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-card-stack card-back">PIB</div>
          <div className="hero-card-stack card-middle">ESTADO</div>
          <div className="hero-card-stack card-front"><span>✦</span><strong>Tu<br />avance</strong><small>economía</small></div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><div className="stat-icon purple"><Target size={19} /></div><div><span>Preguntas dominadas</span><strong>{stats.mastered}<small>/{stats.total}</small></strong></div></div>
        <div className="stat-card"><div className="stat-icon orange"><Flame size={19} /></div><div><span>Racha de estudio</span><strong>{stats.streak}<small> días</small></strong></div></div>
        <div className="stat-card"><div className="stat-icon green"><Trophy size={19} /></div><div><span>Mejor puntuación</span><strong>{stats.bestScore}<small>%</small></strong></div></div>
        <div className="stat-card progress-stat"><ProgressRing value={progressValue} size={54} stroke={6} /><div><span>Progreso total</span><strong>{Math.round(progressValue)}<small>%</small></strong></div></div>
      </section>

      <div className="section-heading"><div><span className="section-kicker">RUTA DE ESTUDIO</span><h2>Módulos del parcial</h2></div><span className="muted-text">6 temas · {stats.total} preguntas</span></div>
      <section className="modules-grid">
        {modules.map((module) => <ModuleCard key={module.id} module={module} progress={getProgress(module.id)} onOpen={onOpenModule} />)}
      </section>
    </motion.div>
  )
}
