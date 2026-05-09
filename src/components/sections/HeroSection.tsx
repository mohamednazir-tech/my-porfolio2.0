import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Mail, Github, Linkedin, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  // Typing animation text
  const roles = ["websites", "apps", "user experiences", "digital solutions"]
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timer: NodeJS.Timeout

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }, 50)
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        if (displayText.length === currentRole.length) {
          setIsDeleting(true)
        }
      }, 100)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 overflow-hidden"
      style={{ 
        minHeight: isMobile ? '100vh' : '100vh',
        paddingTop: isMobile ? '80px' : '0'
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
      
      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          top: isMobile ? '10%' : '20%',
          left: isMobile ? '-50%' : '-20%',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-pink-600/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          bottom: isMobile ? '10%' : '20%',
          right: isMobile ? '-50%' : '-20%',
        }}
      />

      {/* Floating geometric shapes - reduced for mobile */}
      {!isMobile && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 border border-cyan-400/20 rounded-lg"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 2) * 30}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Small floating dots for mobile */}
      {isMobile && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center z-10 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-xs md:text-sm text-gray-300">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6"
        >
          <span className="block gradient-text text-shadow-glow">
            I build
          </span>
          <motion.span
            className="block gradient-text inline-block min-w-[200px] md:min-w-[300px]"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 md:mb-10 max-w-3xl mx-auto px-4"
        >
          Transforming ideas into stunning digital experiences with cutting-edge technology 
          and exceptional design
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-white overflow-hidden shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              View My Work
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mt-8 md:mt-12"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/nazir2003?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
            { icon: MessageCircle, href: "https://wa.me/916374034451", label: "WhatsApp" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2 sm:p-3 rounded-full hover:scale-110 transition-all duration-300 hover:bg-cyan-500/20"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 hover:text-cyan-400 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator - hidden on mobile */}
        {!isMobile && (
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        )}

        {/* Contact quick link - repositioned for mobile */}
        <motion.a
          href="#contact"
          className={`fixed ${
            isMobile ? 'bottom-4 right-4' : 'bottom-8 left-8'
          } z-40 glass-card p-3 sm:p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25`}
          whileHover={{ rotate: 360 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
        </motion.a>
      </motion.div>   
    </section>
  )
}

// Add this CSS to your global styles or component
const styles = `
  .gradient-text {
    background: linear-gradient(135deg, #00d4ff, #7c3aed, #ec4899);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient 3s ease infinite;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .text-shadow-glow {
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    border-color: rgba(0, 212, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 640px) {
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