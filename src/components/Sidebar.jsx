import { motion } from 'framer-motion'
import { BookOpen, Brain, ClipboardCheck, GraduationCap, LayoutDashboard, Menu, Moon, RotateCcw, Sun, X } from 'lucide-react'

const navigation = [
  { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
  { id: 'modules', label: 'Módulos', icon: BookOpen },
  { id: 'flashcards', label: 'Tarjetas', icon: Brain },
  { id: 'quiz', label: 'Preguntas', icon: ClipboardCheck },
]

export default function Sidebar({ activeView, setActiveView, isOpen, setIsOpen, darkMode, setDarkMode, onReset }) {
  return (
    <>
      <div className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><GraduationCap size={23} /></div>
          <div>
            <div className="brand-name">Economía<span>Study</span></div>
            <div className="brand-caption">Segundo parcial</div>
          </div>
          <button className="icon-btn mobile-close" onClick={() => setIsOpen(false)} aria-label="Cerrar menú"><X size={20} /></button>
        </div>

        <div className="sidebar-section-label">Estudiar</div>
        <nav className="side-nav">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`side-link ${activeView === id ? 'active' : ''}`} onClick={() => { setActiveView(id); setIsOpen(false) }}>
              <Icon size={18} />
              <span>{label}</span>
              {activeView === id && <motion.span layoutId="nav-pill" className="nav-pill" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label">Herramientas</div>
        <button className="side-link" onClick={onReset}><RotateCcw size={18} /><span>Reiniciar progreso</span></button>
        <button className="side-link" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}<span>{darkMode ? 'Modo claro' : 'Modo oscuro'}</span></button>

        <div className="sidebar-bottom-card">
          <div className="mini-orbit">✦</div>
          <div>
            <strong>Tu avance se guarda solo</strong>
            <span>Incluso si cierras la pestaña.</span>
          </div>
        </div>
      </aside>
    </>
  )
}
