import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Code } from 'lucide-react'

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 1500 // Minimum loading time for better UX
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (Math.random() * 10 + 2)
        if (newProgress >= 100) {
          clearInterval(interval)
          
          // Ensure minimum loading time
          const elapsedTime = Date.now() - startTime
          const remainingTime = Math.max(0, minLoadTime - elapsedTime)
          
          setTimeout(() => {
            setIsLoading(false)
            if (onLoadingComplete) {
              onLoadingComplete()
            }
          }, remainingTime)
          
          return 100
        }
        return Math.min(newProgress, 99) // Cap at 99 until complete
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  const loadingMessages = [
    "Initializing 3D engine...",
    "Loading amazing content...",
    "Almost there...",
    "Preparing experience..."
  ]

  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const messageInterval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % loadingMessages.length)
      }, 800)
      return () => clearInterval(messageInterval)
    }
  }, [isLoading, loadingMessages.length])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-4 w-full max-w-md mx-auto">
          {/* 3D Spinner Container */}
          <motion.div
            className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8"
            animate={{ 
              rotateY: 360,
              rotateX: [0, 360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-cyan-500/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-purple-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-cyan-400/70"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            </motion.div>
          </motion.div>

          {/* Loading Title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loading Portfolio
          </motion.h1>

          {/* Loading Message */}
          <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6"
              >
                {loadingMessages[messageIndex]}
              </motion.p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-xs mx-auto">
            {/* Progress Bar */}
            <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden mb-2 sm:mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-500">Loading assets</span>
              <motion.span
                className="text-cyan-400 font-mono font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {Math.round(loadingProgress)}%
              </motion.span>
            </div>
          </div>

          {/* Loading tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-gray-400 text-[10px] sm:text-xs">
                Full 3D experience loading
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating particles - optimized for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(0, 212, 255, ${0.3 + Math.random() * 0.5}) 0%, transparent 100%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 0.5 + Math.random() * 0.5, 0],
                scale: [0, 1 + Math.random(), 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl" />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 opacity-30">
          <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-purple-500 rounded-br-2xl" />
        </div>

        {/* Brand watermark */}
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center">
          <p className="text-gray-700 text-[8px] sm:text-xs tracking-wider">
            SHOWCASE SPHERE
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Add this CSS to your global styles
const styles = `
  .gradient-text {
    background: linear-gradient(135deg, #00d4ff, #7c3aed, #ec4899);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }

  @media (max-width: 768px) {
    .glass-card {
      backdrop-filter: blur(5px);
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}