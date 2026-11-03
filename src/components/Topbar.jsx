import { Menu, Search, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

export default function Topbar({ onOpenMenu, search, setSearch, onClearSearch, onQuickQuiz }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  return (
    <header className="topbar">
      <button className="icon-btn menu-trigger" onClick={onOpenMenu} aria-label="Abrir menú"><Menu size={22} /></button>
      <div className="topbar-title">
        <span className="topbar-kicker">CENTRO DE ESTUDIO</span>
        <h1>Tu preparación, en un solo lugar</h1>
      </div>
      <div className="topbar-actions">
        <label className={`search-box ${mobileSearchOpen ? 'mobile-search-open' : ''}`} onClick={() => setMobileSearchOpen(true)}>
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar tema o pregunta..." />
          {search && <button type="button" className="clear-search" onClick={(event) => { event.preventDefault(); onClearSearch() }} aria-label="Limpiar búsqueda"><X size={15} /></button>}
        </label>
        <button className="quick-button" onClick={onQuickQuiz}><Sparkles size={16} /> Repaso rápido</button>
      </div>
    </header>
  )
}
