import { ChevronLeft, ChevronRight, RotateCw, Shuffle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function FlashcardsView({ cards, onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[index]
  const next = () => { setFlipped(false); setIndex((current) => (current + 1) % cards.length) }
  const previous = () => { setFlipped(false); setIndex((current) => (current - 1 + cards.length) % cards.length) }
  const shuffle = () => { setFlipped(false); setIndex(Math.floor(Math.random() * cards.length)) }
  return (
    <motion.div className="view-content flashcards-view" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-intro"><div><span className="section-kicker">MEMORIA ACTIVA</span><h2>Tarjetas de estudio</h2><p>Intenta responder antes de girar la tarjeta. La memoria se fortalece cuando recuperas la idea sin mirar.</p></div><button className="ghost-button" onClick={onBack}><ChevronLeft size={17} /> Módulos</button></div>
      <div className="flash-toolbar"><span>{index + 1} / {cards.length}</span><button className="secondary-button" onClick={shuffle}><Shuffle size={16} /> Aleatoria</button></div>
      <div className="flash-stage" onClick={() => setFlipped(!flipped)}>
        <AnimatePresence mode="wait">
          <motion.div key={`${card.id}-${flipped}`} className={`big-flash-card ${flipped ? 'flipped' : ''}`} initial={{ opacity: 0, rotateY: flipped ? -75 : 75, scale: 0.95 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: flipped ? 75 : -75, scale: 0.95 }} transition={{ duration: 0.36 }} style={{ '--card-color': card.moduleColor }}>
            <div className="flash-card-meta"><span>{card.moduleTitle}</span><span>{flipped ? 'RESPUESTA' : 'PREGUNTA'}</span></div>
            <div className="flash-card-main"><span className="flash-star">✦</span><h3>{flipped ? card.back : card.front}</h3></div>
            <div className="flash-card-hint"><RotateCw size={15} /> Toca para girar</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flash-controls"><button className="round-control" onClick={previous}><ChevronLeft size={22} /></button><span>Desliza por tus tarjetas</span><button className="round-control" onClick={next}><ChevronRight size={22} /></button></div>
    </motion.div>
  )
}
