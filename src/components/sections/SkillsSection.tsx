import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Server, 
  Cpu, 
  Smartphone, 
  Database, 
  Palette, 
  GitBranch, 
  Cloud,
  Shield,
  Code2,
  Terminal,
  Flame,
  ChevronDown,
  Sparkles
} from 'lucide-react'

const skills = [
  {
    name: "React",
    icon: Code,
    level: 95,
    category: "Frontend",
    color: "from-cyan-400 to-blue-500",
    glowColor: "cyan",
    description: "Expert in React, Next.js, and modern React patterns"
  },
  {
    name: "Node.js",
    icon: Server,
    level: 90,
    category: "Backend",
    color: "from-green-400 to-emerald-500",
    glowColor: "green",
    description: "Building scalable server-side applications and APIs"
  },
  {
    name: "Python",
    icon: Cpu,
    level: 85,
    category: "Backend",
    color: "from-blue-400 to-indigo-500",
    glowColor: "blue",
    description: "Data science, automation, and backend development"
  },
  {
    name: "React Native",
    icon: Smartphone,
    level: 88,
    category: "Mobile",
    color: "from-purple-400 to-pink-500",
    glowColor: "purple",
    description: "Cross-platform mobile app development"
  },
  {
    name: "Firebase",
    icon: Flame,
    level: 92,
    category: "Backend",
    color: "from-yellow-400 to-orange-500",
    glowColor: "yellow",
    description: "Real-time databases and cloud functions"
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    level: 87,
    category: "Design",
    color: "from-pink-400 to-rose-500",
    glowColor: "pink",
    description: "User-centered design and prototyping"
  },
  {
    name: "Git",
    icon: GitBranch,
    level: 93,
    category: "Tools",
    color: "from-red-400 to-orange-500",
    glowColor: "red",
    description: "Version control and collaborative development"
  },
  {
    name: "Databases",
    icon: Database,
    level: 86,
    category: "Backend",
    color: "from-teal-400 to-cyan-500",
    glowColor: "teal",
    description: "SQL and NoSQL database design and optimization"
  },
  {
    name: "Cloud Services",
    icon: Cloud,
    level: 84,
    category: "DevOps",
    color: "from-blue-500 to-indigo-500",
    glowColor: "indigo",
    description: "AWS, Vercel, and cloud deployment strategies"
  },
  {
    name: "Security",
    icon: Shield,
    level: 82,
    category: "Security",
    color: "from-green-500 to-teal-500",
    glowColor: "teal",
    description: "Application security and best practices"
  },
  {
    name: "TypeScript",
    icon: Code2,
    level: 91,
    category: "Frontend",
    color: "from-blue-400 to-blue-600",
    glowColor: "blue",
    description: "Type-safe JavaScript development"
  },
  {
    name: "Terminal",
    icon: Terminal,
    level: 89,
    category: "Tools",
    color: "from-gray-600 to-gray-800",
    glowColor: "gray",
    description: "Command line expertise and automation"
  }
]

// Styles to be injected
const styles = `
  .skill-card {
    position: relative;
    min-height: 300px;
  }

  @media (max-width: 768px) {
    .skill-card {
      min-height: auto;
    }
  }

  .skill-card-front,
  .skill-card-back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backface-visibility: hidden;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 1.5rem;
  }

  .skill-card-back {
    transform: rotateY(180deg);
  }

  .skill-card:hover .skill-card-front {
    transform: rotateY(180deg);
  }

  .skill-card:hover .skill-card-back {
    transform: rotateY(0deg);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    border-color: rgba(0, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }

  .gradient-text {
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 640px) {
    .glass-card {
      border-radius: 1rem;
    }
    
    .skill-card-front,
    .skill-card-back {
      border-radius: 1rem;
    }
  }

  /* Disable 3D flip on mobile */
  @media (max-width: 768px) {
    .skill-card {
      perspective: none !important;
    }
    
    .skill-card:hover .skill-card-front {
      transform: none !important;
    }
    
    .skill-card-back {
      display: none !important;
    }
    
    .skill-card-front {
      position: relative !important;
      transform: none !important;
    }
  }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    border-radius: 4px;
  }

  /* Line clamp for mobile */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  useEffect(() => {
    // Inject styles
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setMounted(true)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      document.head.removeChild(styleElement)
    }
  }, [])

  const categories = ["All", "Frontend", "Backend", "Mobile", "Design", "Tools", "Security", "DevOps"]
  
  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const getGlowStyle = (color: string) => {
    const glowColors: Record<string, string> = {
      cyan: '0 0 20px rgba(34, 211, 238, 0.3)',
      green: '0 0 20px rgba(74, 222, 128, 0.3)',
      blue: '0 0 20px rgba(96, 165, 250, 0.3)',
      purple: '0 0 20px rgba(168, 85, 247, 0.3)',
      yellow: '0 0 20px rgba(250, 204, 21, 0.3)',
      pink: '0 0 20px rgba(244, 114, 182, 0.3)',
      red: '0 0 20px rgba(248, 113, 113, 0.3)',
      teal: '0 0 20px rgba(20, 184, 166, 0.3)',
      indigo: '0 0 20px rgba(99, 102, 241, 0.3)',
      gray: '0 0 20px rgba(156, 163, 175, 0.3)',
    }
    return glowColors[color] || glowColors.cyan
  }

  if (!mounted) return null

  return (
    <section id="skills" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Technical Expertise</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Skills & Expertise</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
          >
            Technologies and tools I master to deliver exceptional results
          </motion.p>

          {/* Mobile Filter Dropdown */}
          {isMobile ? (
            <div className="relative px-4 mb-6">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="w-full glass-card px-6 py-3 rounded-xl flex items-center justify-between text-white"
              >
                <span className="font-medium">{selectedCategory}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileFilter ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showMobileFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-4 right-4 mt-2 glass-card rounded-xl overflow-hidden z-20"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setShowMobileFilter(false)
                        }}
                        className={`w-full px-6 py-3 text-left transition-colors ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-cyan-400"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Desktop Category Filter */
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 md:gap-3 px-4"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-400 to-purple-600 text-white shadow-lg shadow-cyan-400/25"
                      : "glass-card text-gray-300 hover:text-white hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="skill-card group relative cursor-pointer"
              style={{ 
                perspective: !isMobile ? "1000px" : "none",
                boxShadow: getGlowStyle(skill.glowColor)
              }}
              whileHover={{ y: !isMobile ? -5 : 0 }}
            >
              {/* Card Front */}
              <div className="skill-card-front glass-card p-5 md:p-6 flex flex-col items-center text-center overflow-hidden">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <motion.div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${skill.color} p-3 md:p-4 mb-4 shadow-lg`}
                  whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <skill.icon className="w-full h-full text-white" />
                </motion.div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                
                <span className="text-xs md:text-sm text-gray-400 mb-4 px-2 py-1 rounded-full bg-white/5">
                  {skill.category}
                </span>

                {/* Skill level bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
                
                <div className="flex justify-between w-full mt-2">
                  <span className="text-xs text-gray-400">Proficiency</span>
                  <span className="text-xs font-semibold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Mobile: Show description on front */}
                {isMobile && (
                  <p className="text-xs text-gray-300 mt-3 line-clamp-2">
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Card Back - Only on desktop */}
              {!isMobile && (
                <div className="skill-card-back glass-card p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-cyan-400/10 to-purple-600/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {skill.name}
                  </h3>
                  
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {skill.description}
                  </p>

                  <motion.div
                    className="mt-6 px-4 py-2 bg-white/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`text-xs font-medium bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                      {skill.level}% Mastery
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Floating particles on hover */}
              {!isMobile && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100`}
                  style={{
                    left: `${25 + i * 25}%`,
                    top: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary - Mobile Friendly */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-8 px-4"
        >
          {[
            { label: "Projects Completed", value: "50+", icon: Code },
            { label: "Happy Clients", value: "40+", icon: Flame },
            { label: "Years Experience", value: "5+", icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-4 md:p-6 text-center flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}