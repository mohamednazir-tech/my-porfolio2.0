import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Sparkles } from 'lucide-react'

// 3D Components
import FloatingLaptop from './components/3D/FloatingLaptop'
import FloatingPhone from './components/3D/FloatingPhone'
import CursorFollower from './components/3D/CursorFollower'
import LoadingScreen from './components/ui/LoadingScreen'
import WireframeToggle from './components/ui/WireframeToggle'

// Section Components
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'
import FooterSection from './components/sections/FooterSection'

// Page Components
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import logo from "./assets/logo-removebg-preview.png";

// 3D Background Scene
function Scene3D({ wireframe }: { wireframe: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <FloatingLaptop wireframe={wireframe} />
      <FloatingPhone wireframe={wireframe} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

declare global {
  interface Window {
    __PAGE?: string;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [wireframe, setWireframe] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()

  const isLegalPage = location.pathname === '/privacy' || location.pathname === '/terms'
  const isHomePage = !isLegalPage

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'skills', 'projects', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    setTimeout(handleScroll, 100)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Improved scroll to section function
  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to:', sectionId)
    
    // Close mobile menu
    setIsMenuOpen(false)
    
    // Find the element
    const element = document.getElementById(sectionId)
    
    if (element) {
      console.log('Element found, scrolling...')
      
      // Get the navbar height to offset the scroll
      const navbar = document.querySelector('nav')
      const navbarHeight = navbar ? navbar.offsetHeight : 80
      
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Update URL without causing page reload
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`)
      }
    } else {
      console.error('Element not found:', sectionId)
      
      // Fallback: try with a delay for dynamic content
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId)
        if (retryElement) {
          retryElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ]

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-dark overflow-x-hidden">
      {/* 3D Cursor Follower */}
      <CursorFollower />
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D wireframe={wireframe} />
      </div>

      {/* Wireframe Toggle */}
      <WireframeToggle wireframe={wireframe} setWireframe={setWireframe} />

      {/* Navigation - Show on home page */}
      {isHomePage && (
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 glass-card border-0 mx-4 mt-4 rounded-2xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo}
                  alt="Nexora Code Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="text-2xl font-bold gradient-text">
                  Nexora Code
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      activeSection === item.id 
                        ? 'text-neon-blue' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-neon-blue/20 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 space-y-2"
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'text-neon-blue bg-neon-blue/20' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              {/* Ensure each section has the correct ID */}
              <section id="hero">
                <HeroSection />
              </section>
              <section id="services">
                <ServicesSection />
              </section>
              <section id="skills">
                <SkillsSection />
              </section>
              <section id="projects">
                <ProjectsSection />
              </section>
              <section id="testimonials">
                <TestimonialsSection />
              </section>
              <section id="contact">
                <ContactSection />
              </section>
            </>
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>

      {/* Footer - Show on home page */}
      {isHomePage && <FooterSection scrollToSection={scrollToSection} />}

      {/* Floating Social Icons - Show on home page */}
      {isHomePage && (
        <motion.div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col space-y-4">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/nazir2003?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:mohamednazirm686@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360, scale: 1.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <social.icon className="w-5 h-5 text-neon-blue" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}