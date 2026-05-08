import { useEffect, useState } from 'react'

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
        return newTrail.slice(-10) // Keep only last 10 positions
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-50 rounded-full bg-neon-blue opacity-20"
          style={{
            left: pos.x - 4,
            top: pos.y - 4,
            width: 8,
            height: 8,
            opacity: (index + 1) / 10 * 0.3,
            transform: `scale(${(index + 1) / 10})`,
          }}
        />
      ))}
      
      {/* Main cursor orb */}
      <div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-glow"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transition: 'all 0.1s ease-out',
        }}
      />
      
      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-40 w-12 h-12 rounded-full border border-neon-blue opacity-50"
        style={{
          left: position.x - 24,
          top: position.y - 24,
          transition: 'all 0.2s ease-out',
        }}
      />
    </>
  )
}
