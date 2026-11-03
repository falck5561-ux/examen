import { Menu, Search, Sparkles } from 'lucide-react'

export default function Topbar({ onOpenMenu, search, setSearch, onQuickQuiz }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-trigger" onClick={onOpenMenu} aria-label="Abrir menú"><Menu size={22} /></button>
      <div className="topbar-title">
        <span className="topbar-kicker">CENTRO DE ESTUDIO</span>
        <h1>Tu preparación, en un solo lugar</h1>
      </div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar tema o pregunta..." />
        </label>
        <button className="quick-button" onClick={onQuickQuiz}><Sparkles size={16} /> Repaso rápido</button>
      </div>
    </header>
  )
}
