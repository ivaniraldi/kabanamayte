export default function GlassmorphicCard({ children, className = "" }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl ${className}`}>
      {children}
    </div>
  )
}
