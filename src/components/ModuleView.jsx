import { ArrowLeft, Bookmark, CheckCircle2, CircleHelp, Play, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModuleView({ module, progress, onBack, onStart, onToggleFavorite, favorites }) {
  return (
    <motion.div className="view-content" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
      <button className="back-link" onClick={onBack}><ArrowLeft size={17} /> Volver a módulos</button>
      <section className="module-detail-header" style={{ '--module-color': module.color, '--module-soft': module.soft }}>
        <div className="detail-icon">{module.icon}</div>
        <div className="detail-copy"><span className="eyebrow">{module.eyebrow}</span><h2>{module.title}</h2><p>{module.summary}</p></div>
        <div className="detail-stat"><strong>{progress.completed}/{progress.total}</strong><span>dominadas</span></div>
      </section>
      <div className="detail-layout">
        <div>
          <div className="content-card"><div className="card-title-row"><h3><Sparkles size={18} /> Puntos clave</h3><span className="tiny-label">PARA RECORDAR</span></div><ul className="key-list">{module.keyPoints.map((point) => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul></div>
          <div className="content-card"><div className="card-title-row"><h3><CircleHelp size={18} /> Tus tarjetas de este módulo</h3><span className="tiny-label">{module.flashcards.length} TARJETAS</span></div><div className="flash-preview-grid">{module.flashcards.slice(0, 4).map(([front], index) => <div className="mini-card" key={front}><span>0{index + 1}</span><strong>{front}</strong></div>)}</div></div>
        </div>
        <aside className="module-action-card"><div className="action-blob">{module.icon}</div><h3>¿Listo para practicar?</h3><p>Responde preguntas de {module.title.toLowerCase()} y recibe explicación inmediata de cada respuesta.</p><button className="primary-button full" onClick={() => onStart(module.id)}><Play size={16} fill="currentColor" /> Empezar preguntas</button><button className="secondary-button full" onClick={() => onToggleFavorite(module.id)}><Bookmark size={16} fill={favorites.includes(module.id) ? 'currentColor' : 'none'} /> {favorites.includes(module.id) ? 'Guardado' : 'Guardar módulo'}</button></aside>
      </div>
    </motion.div>
  )
}
