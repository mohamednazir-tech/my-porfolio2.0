import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare, Sparkles, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isMobile, setIsMobile] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate form submission with validation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success (you can replace with actual API call)
    if (formData.name && formData.email && formData.message) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } else {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "from-gray-600 to-gray-800" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nazir2003?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn", color: "from-blue-500 to-blue-600" },
    { icon: MessageCircle, href: "https://wa.me/15551234567", label: "WhatsApp", color: "from-green-500 to-green-600" },
    { icon: Mail, href: "mailto:mohamednazirm686@gmail.com", label: "Email", color: "from-red-500 to-orange-500" },
  ]

  return (
    <section id="contact" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-gray-900/50 to-black/30" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles - reduced for mobile */}
      {!isMobile && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 border border-cyan-500/20 rounded-lg"
          style={{
            left: `${5 + i * 15}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Small floating dots for mobile */}
      {isMobile && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
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
            <span className="text-sm text-gray-300">Contact</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together
          </motion.p>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto px-4"
        >
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 md:p-8 rounded-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/50 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                    <span className="text-sm text-green-400">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                    <span className="text-sm text-red-400">Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300 text-sm md:text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300 text-sm md:text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={isMobile ? 4 : 5}
                  className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300 resize-none text-sm md:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            {/* Contact Details */}
            <div className="glass-card p-5 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                Contact Information
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Email</p>
                    <p className="text-white font-medium text-sm md:text-base truncate">mohamednazirm686@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Phone</p>
                    <p className="text-white font-medium text-sm md:text-base">+91 6374034451</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs md:text-sm">Location</p>
                    <p className="text-white font-medium text-sm md:text-base">Remote</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-5 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <span className="text-white font-medium text-xs md:text-sm group-hover:text-cyan-400 transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="glass-card p-4 md:p-6 rounded-2xl border border-green-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Available for Projects</p>
                  <p className="text-gray-400 text-xs md:text-sm">Currently accepting new clients</p>
                </div>
              </div>
            </motion.div>

            {/* Quick response time */}
            <div className="glass-card p-4 md:p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Quick Response Time</p>
                  <p className="text-gray-400 text-xs md:text-sm">Usually replies in &lt; 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 glass-card rounded-full"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            <span className="text-white font-medium text-sm md:text-base">
              Let's create something amazing together
            </span>
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
          </motion.div>
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