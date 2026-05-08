import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, UserCheck, Cookie, FileText, ArrowLeft, CheckCircle, Clock, Server, Share2, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PrivacyPolicy() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sections = [
    { id: "introduction", title: "Introduction", icon: Eye, color: "cyan" },
    { id: "information", title: "Information We Collect", icon: Database, color: "purple" },
    { id: "usage", title: "How We Use Your Info", icon: UserCheck, color: "green" },
    { id: "protection", title: "Data Protection", icon: Lock, color: "red" },
    { id: "cookies", title: "Cookies", icon: Cookie, color: "yellow" },
    { id: "third-party", title: "Third-Party Services", icon: Share2, color: "blue" },
    { id: "rights", title: "Your Rights", icon: CheckCircle, color: "emerald" },
    { id: "contact", title: "Contact Us", icon: FileText, color: "orange" }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
      {/* Background Effects - Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 h-64 md:w-80 md:h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-64 h-64 md:w-80 md:h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 md:mb-8 transition-all duration-300 group text-sm md:text-base"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.a>
          
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-4 md:mb-6 shadow-lg shadow-purple-500/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
            <p className="text-gray-500 text-xs md:text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </motion.div>

        {/* Quick Navigation - Mobile Dropdown */}
        {isMobile ? (
          <div className="max-w-4xl mx-auto mb-6">
            <select
              onChange={(e) => scrollToSection(e.target.value)}
              className="w-full glass-card px-4 py-3 rounded-xl text-white bg-black/50 border border-white/10 focus:border-cyan-500 transition-colors text-sm"
              defaultValue=""
            >
              <option value="" disabled>Jump to section...</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Desktop Quick Navigation */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                    activeSection === section.id
                      ? `bg-gradient-to-r from-${section.color}-500 to-${section.color}-600 text-white shadow-lg`
                      : 'glass-card text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <section.icon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">{section.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-4 md:space-y-6"
        >
          {/* Introduction */}
          <section id="introduction" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              </div>
              Introduction
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              At Mohamed Nazir's portfolio, we are committed to protecting your personal information and ensuring transparency about our data practices. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="information" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Database className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Personal Information</h3>
                <p className="text-sm md:text-base">When you contact us through our contact form, we may collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm md:text-base">
                  <li>Name and email address</li>
                  <li>Phone number</li>
                  <li>Message content</li>
                  <li>Professional information you choose to share</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Technical Information</h3>
                <p className="text-sm md:text-base">We automatically collect certain technical information:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm md:text-base">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referral source</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="usage" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <UserCheck className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              </div>
              How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm md:text-base">We use your information to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400 text-sm md:text-base">
                <li>Respond to your inquiries and provide requested information</li>
                <li>Improve our website and services based on user feedback</li>
                <li>Send you relevant information about our services (with your consent)</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Ensure the security and proper functioning of our website</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section id="protection" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
              </div>
              Data Protection
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Secure SSL encryption for data transmission</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data</li>
              <li>Secure storage of contact information</li>
            </ul>
          </section>

          {/* Cookies */}
          <section id="cookies" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Cookie className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              </div>
              Cookies and Tracking
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Provide personalized content and features</li>
              <li>Improve website performance and functionality</li>
            </ul>
            <p className="text-gray-300 mt-4 text-sm md:text-base">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* Third-Party Services */}
          <section id="third-party" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Share2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              Third-Party Services
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Our website may integrate with third-party services such as:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Analytics services (Google Analytics)</li>
              <li>Social media platforms</li>
              <li>Contact form processing services</li>
              <li>Content delivery networks</li>
            </ul>
            <div className="mt-4 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs md:text-sm">
                ⚠️ These services have their own privacy policies, and we are not responsible for their data practices.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="rights" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              </div>
              Your Rights
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section id="contact" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              Contact Us
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-gray-400 text-sm md:text-base">
              <p>📧 Email: mohamednazirm686@gmail.com</p>
              <p>📞 Phone: +91 6374034451</p>
              <p>💬 WhatsApp: +91 6374034451</p>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                <Server className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              Policy Updates
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date.
            </p>
          </section>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10"
        >
          <p className="text-gray-500 text-xs md:text-sm">
            By using our website, you agree to the terms of this Privacy Policy.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-1 h-1 bg-cyan-500 rounded-full" />
            <span className="text-gray-600 text-[10px] md:text-xs">Secure & Confidential</span>
            <div className="w-1 h-1 bg-cyan-500 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
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

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .animate-pulse {
    animation: pulse 3s ease-in-out infinite;
  }

  .delay-1000 {
    animation-delay: 1s;
  }

  @media (max-width: 768px) {
    .glass-card {
      backdrop-filter: blur(5px);
    }
  }

  .scroll-mt-20 {
    scroll-margin-top: 80px;
  }

  @media (max-width: 768px) {
    .scroll-mt-20 {
      scroll-margin-top: 60px;
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}