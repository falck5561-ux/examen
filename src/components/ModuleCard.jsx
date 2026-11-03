import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModuleCard({ module, progress, onOpen }) {
  const percentage = progress.total ? (progress.completed / progress.total) * 100 : 0
  return (
    <motion.button className="module-card" whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} onClick={() => onOpen(module.id)} style={{ '--module-color': module.color, '--module-soft': module.soft }}>
      <div className="module-card-top">
        <span className="module-icon">{module.icon}</span>
        <span className="module-arrow"><ArrowUpRight size={17} /></span>
      </div>
      <span className="eyebrow">{module.eyebrow}</span>
      <h3>{module.title}</h3>
      <p>{module.summary}</p>
      <div className="module-progress-line"><span style={{ width: `${percentage}%`, background: module.color }} /></div>
      <div className="module-card-footer"><span>{progress.completed}/{progress.total} preguntas dominadas</span>{progress.completed === progress.total && <CheckCircle2 size={17} />}</div>
    </motion.button>
  )
}
