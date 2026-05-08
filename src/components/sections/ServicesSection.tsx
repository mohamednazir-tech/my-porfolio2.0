import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Smartphone, Palette, Server, Shield, Zap, Rocket } from 'lucide-react'
import { useState, useEffect } from 'react'

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks and best practices",
    features: ["React/Next.js", "TypeScript", "Node.js", "API Integration"],
    gradient: "from-cyan-500 to-blue-500",
    glowColor: "cyan",
    
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android",
    features: ["React Native", "Flutter", "iOS/Android", "App Store Deployment"],
    gradient: "from-purple-500 to-pink-500",
    glowColor: "purple",
    
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that delight users and drive engagement",
    features: ["Figma", "Prototyping", "User Research", "Design Systems"],
    gradient: "from-purple-500 to-indigo-500",
    glowColor: "indigo",
    
  },
  {
    icon: Server,
    title: "Full Stack Solutions",
    description: "End-to-end development from frontend to backend and deployment",
    features: ["Database Design", "Cloud Services", "DevOps", "Microservices"],
    gradient: "from-green-500 to-teal-500",
    glowColor: "green",
    
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast applications optimized for speed and scalability",
    features: ["Code Optimization", "CDN Setup", "Caching", "SEO"],
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "yellow",
    
  },
  {
    icon: Shield,
    title: "Security & Maintenance",
    description: "Secure applications with ongoing support and maintenance",
    features: ["Security Audits", "Updates", "Monitoring", "Backup"],
    gradient: "from-red-500 to-rose-500",
    glowColor: "red",
    
  }
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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
        duration: 0.5,
        staggerChildren: 0.1,
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
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
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">What I Offer</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Services</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            Comprehensive digital solutions to bring your vision to life
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 px-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            >
              {/* Glassmorphism card */}
              <div 
                className="glass-card p-5 md:p-8 h-full transition-all duration-500 relative overflow-hidden"
                style={{
                  transform: !isMobile && hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Animated gradient border */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl transition-opacity duration-500 ${
                    hoveredCard === index ? 'opacity-20' : 'opacity-0'
                  }`} 
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-3 md:p-4 mb-4 md:mb-6 shadow-lg`}
                  whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-xs md:text-sm text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-2 md:mr-3`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floating particles on hover - desktop only */}
              {!isMobile && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 pointer-events-none`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: hoveredCard === index ? [0, -25, 0] : 0,
                    opacity: hoveredCard === index ? [0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === index ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            onClick={scrollToContact}
            className="group relative px-6 md:px-8 py-3 md:py-4 glass-card rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
              Discuss Your Project
              <Rocket className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4"
        >
          {[
            { value: "50+", label: "Projects Delivered", icon: Code },
            { value: "40+", label: "Happy Clients", icon: Rocket },
            { value: "98%", label: "Client Satisfaction", icon: Shield },
            { value: "24/7", label: "Support Available", icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-3 md:p-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Add this CSS to your global styles
const styles = `
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    border-color: rgba(0, 212, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }

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

  @media (max-width: 768px) {
    .glass-card {
      backdrop-filter: blur(5px);
      border-radius: 1rem;
    }
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
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}