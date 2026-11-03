export default function ProgressRing({ value, size = 76, stroke = 8, label = '%' }) {
  const radius = (size - stroke) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (Math.min(value, 100) / 100) * circumference
  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="ring-track" strokeWidth={stroke} fill="none" r={radius} cx={size / 2} cy={size / 2} />
        <circle className="ring-value" strokeWidth={stroke} fill="none" r={radius} cx={size / 2} cy={size / 2} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span>{Math.round(value)}{label}</span>
    </div>
  )
}
