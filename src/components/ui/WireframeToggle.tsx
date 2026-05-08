import React from 'react'
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

interface WireframeToggleProps {
  wireframe: boolean
  setWireframe: (wireframe: boolean) => void
}

export default function WireframeToggle({ wireframe, setWireframe }: WireframeToggleProps) {
  return (
    <motion.button
      className="fixed top-24 right-8 z-40 glass-card p-3 rounded-full group"
      onClick={() => setWireframe(!wireframe)}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <Settings className={`w-6 h-6 transition-colors duration-300 ${
        wireframe ? 'text-neon-purple' : 'text-neon-blue'
      }`} />
      
      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-darker border border-white/20 rounded-lg px-3 py-2 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        Toggle Wireframe
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-darker"></div>
      </motion.div>
    </motion.button>
  )
}
