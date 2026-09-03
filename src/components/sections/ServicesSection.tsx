import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, Smartphone, Palette, Server, Shield, Zap, Rocket, 
  ShoppingCart, Layout, Building2, Search, TrendingUp,
  Users, BarChart, Globe, Layers, PenTool, Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'

const services = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description: "Feature-rich online stores with seamless payment integration and inventory management",
    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Customer Accounts"],
    gradient: "from-emerald-500 to-cyan-500",
    glowColor: "emerald",
    badge: "Popular"
  },
  {
    icon: Layout,
    title: "Responsive Web Design",
    description: "Pixel-perfect designs that adapt beautifully across all devices and screen sizes",
    features: ["Mobile-First", "Cross-Browser", "Touch Optimized", "Fast Loading"],
    gradient: "from-blue-500 to-indigo-500",
    glowColor: "blue",
    badge: "Essential"
  },
  {
    icon: Building2,
    title: "Corporate Website Design",
    description: "Professional websites that establish credibility and showcase your brand identity",
    features: ["Brand Identity", "About Pages", "Team Showcase", "Contact Forms"],
    gradient: "from-indigo-500 to-purple-500",
    glowColor: "indigo",
    badge: "Premium"
  },
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
  },
  {
    icon: Search,
    title: "SEO Content Strategy",
    description: "Data-driven content that ranks high and drives organic traffic to your business",
    features: ["Keyword Research", "Content Writing", "On-Page SEO", "Link Building"],
    gradient: "from-orange-500 to-amber-500",
    glowColor: "orange",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic marketing campaigns to grow your online presence and customer base",
    features: ["Social Media", "Email Marketing", "PPC Ads", "Analytics"],
    gradient: "from-pink-500 to-rose-500",
    glowColor: "pink",
  },
  {
    icon: Users,
    title: "Business Consulting",
    description: "Expert guidance to transform your business vision into a digital success story",
    features: ["Digital Strategy", "Market Analysis", "Growth Planning", "ROI Tracking"],
    gradient: "from-violet-500 to-purple-500",
    glowColor: "violet",
  }
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animated background gradient that follows mouse
  const backgroundStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.03) 0%, transparent 70%)`,
  }

  return (
    <section id="services" className="py-12 md:py-24 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Mouse-following gradient */}
      <div className="absolute inset-0 pointer-events-none" style={backgroundStyle} />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsla(${Math.random() * 60 + 180}, 100%, 50%, 0.2)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
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
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Rocket className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-gray-300">Transform Your Business</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Digital Solutions</span>
            <br />
            <span className="text-white text-2xl md:text-4xl">for Modern Businesses</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            Comprehensive digital services to help your business grow, scale, and succeed
            in the ever-evolving digital landscape
          </motion.p>

          {/* Animated floating stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {[
              { icon: Globe, label: "Global Reach", value: "50+" },
              { icon: Users, label: "Happy Clients", value: "100+" },
              { icon: TrendingUp, label: "Projects Delivered", value: "200+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 glass-card px-4 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 px-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            >
              {/* Glowing background effect */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                animate={{
                  scale: hoveredCard === index ? 1.05 : 1,
                }}
              />

              {/* Glassmorphism card */}
              <div 
                className="glass-card p-5 md:p-6 h-full transition-all duration-500 relative overflow-hidden"
                style={{
                  transform: !isMobile && hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Animated gradient border */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl transition-opacity duration-500 ${
                    hoveredCard === index ? 'opacity-30' : 'opacity-0'
                  }`} 
                />
                
                {/* Shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  animate={{
                    translateX: hoveredCard === index ? '200%' : '-100%',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />

                {/* Badge */}
                {service.badge && (
                  <motion.div
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r ${service.gradient} text-white text-[10px] font-semibold uppercase tracking-wider`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {service.badge}
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${service.gradient} p-3 md:p-3.5 mb-4 shadow-lg`}
                  whileHover={!isMobile ? { 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-xs md:text-sm text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: featureIndex * 0.05 }}
                      >
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-2 md:mr-3 flex-shrink-0`} />
                        <span className="group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Learn more link */}
                <motion.div
                  className="mt-4 pt-4 border-t border-white/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="text-xs text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <Sparkles className="w-3 h-3" />
                  </span>
                </motion.div>
              </div>

              {/* Floating particles on hover */}
              {!isMobile && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 pointer-events-none`}
                  style={{
                    left: `${15 + i * 35}%`,
                    top: `${10 + i * 30}%`,
                  }}
                  animate={{
                    y: hoveredCard === index ? [0, -30, 0] : 0,
                    x: hoveredCard === index ? [0, 10, 0] : 0,
                    opacity: hoveredCard === index ? [0, 0.8, 0] : 0,
                    scale: hoveredCard === index ? [0, 1.5, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === index ? Infinity : 0,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12 md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)`,
              }} />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h3>
            
            <p className="text-gray-300 mb-6 relative z-10 max-w-2xl mx-auto">
              Let's discuss how our digital solutions can help you achieve your business goals
            </p>

            <motion.button
              onClick={scrollToContact}
              className="group relative px-8 md:px-12 py-4 md:py-5 glass-card rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3 text-sm md:text-base">
                Get Started Today
                <Rocket className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-pink-500/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4"
        >
          {[
            { value: "98%", label: "Client Satisfaction", icon: Shield },
            { value: "24/7", label: "Support Available", icon: Zap },
            { value: "50+", label: "Countries Served", icon: Globe },
            { value: "100%", label: "Project Success", icon: Rocket },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-4 md:p-6 text-center relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <motion.div 
                className="text-xl md:text-3xl font-bold gradient-text"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* SEO Content Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 md:mt-20 glass-card p-8 md:p-12 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white">Why Choose Our Digital Solutions?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We combine cutting-edge technology with strategic business insights to deliver 
                <span className="text-cyan-400 font-medium"> measurable results</span>. 
                Our data-driven approach ensures your digital presence drives real business growth.
              </p>
            </div>
            <div className="space-y-2">
              {[
                "Custom-tailored solutions for your business",
                "Proven track record of success",
                "End-to-end service delivery",
                "Continuous optimization & support"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-gray-300 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CSS styles
const styles = `
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.5rem;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .glass-card:hover {
    border-color: rgba(0, 212, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
  }

  .gradient-text {
    background: linear-gradient(135deg, #00d4ff, #7c3aed, #ec4899, #f59e0b);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradientShift 4s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    .glass-card {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 1rem;
    }
  }

  /* Smooth scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7c3aed, #ec4899);
  }

  /* Loading animation for cards */
  .card-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .card-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}