import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Mail, Heart, ArrowUp, Code, MapPin, Phone, MessageCircle } from 'lucide-react'

export default function FooterSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    checkMobile()
    handleScroll()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "from-gray-600 to-gray-800" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nazir2003?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn", color: "from-blue-500 to-blue-600" },
    { icon: Mail, href: "mailto:mohamednazirm686@gmail.com", label: "Email", color: "from-red-500 to-orange-500" },
  ]

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#hero" },
        { name: "Skills", href: "#skills" },
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
        { name: "Privacy Policy", href: "/pages/privacy.html" },
        { name: "Terms of Service", href: "/pages/terms.html" }
      ]
    }
  ]

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

  return (
    <>
      <footer className="relative bg-black/90 backdrop-blur-xl border-t border-white/10 mt-auto">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.2) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Floating particles - optimized for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 6 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-cyan-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
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

        <div className="max-w-7xl mx-auto relative z-10 px-4 py-8 md:py-12">
          {/* Main footer content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {/* Brand section */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2">
                  Showcase Sphere
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Creating exceptional digital experiences with cutting-edge technology and innovative design.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span>+91 6374034451</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                  <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  <span>+91 6374034451</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-8 h-8 md:w-10 md:h-10 rounded-full glass-card flex items-center justify-center transition-all duration-300 group"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    {hoveredSocial === index && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 rounded text-xs text-white whitespace-nowrap"
                      >
                        {social.label}
                      </motion.span>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer links */}
            {footerLinks.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
              >
                <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">
                  {section.title}
                </h4>
                <ul className="space-y-1.5 md:space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + linkIndex * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-xs md:text-sm flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Trust badge section */}
            <motion.div
              variants={itemVariants}
            >
              <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">
                Trust & Quality
              </h4>
              
              {/* Trust badge */}
              <div className="glass-card p-3 md:p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-white font-medium">Rated 5/5 by clients</p>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1">50+ successful projects delivered</p>
              </div>

              {/* Quick response badge */}
              <div className="mt-3 md:mt-4 glass-card p-3 md:p-4 rounded-xl">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs md:text-sm text-gray-300">
                    Quick response within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            className="border-t border-white/10 mt-8 md:mt-10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
              <p className="text-gray-500 text-[10px] md:text-xs">
                © {currentYear} Mohamed Nazir. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-cyan-400">
                <span className="text-[10px] md:text-xs">Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                </motion.div>
                <span className="text-[10px] md:text-xs">and</span>
                <Code className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-[10px] md:text-xs"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-[10px] md:text-xs"
              >
                Terms
              </a>
              <a
                href="/sitemap"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-[10px] md:text-xs"
              >
                Sitemap
              </a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center hover:bg-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/25 group"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

// Add this CSS to your global styles
const styles = `
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}