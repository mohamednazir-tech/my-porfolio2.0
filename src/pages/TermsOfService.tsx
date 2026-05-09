import { motion } from 'framer-motion'
import { FileText, Shield, AlertCircle, CheckCircle, ArrowLeft, Users, Code, DollarSign, Scale, Clock, Mail, Phone, MessageCircle, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TermsOfService() {
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
    { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircle, color: "green" },
    { id: "service", title: "Description of Service", icon: Code, color: "blue" },
    { id: "responsibilities", title: "User Responsibilities", icon: Users, color: "purple" },
    { id: "privacy", title: "Privacy & Data", icon: Shield, color: "cyan" },
    { id: "intellectual", title: "Intellectual Property", icon: FileText, color: "pink" },
    { id: "payments", title: "Services & Payments", icon: DollarSign, color: "emerald" },
    { id: "liability", title: "Limitation of Liability", icon: AlertCircle, color: "yellow" },
    { id: "governing", title: "Governing Law", icon: Scale, color: "orange" }
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
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
            These terms govern your use of Mohamed Nazir's portfolio website and services.
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

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-4 md:space-y-6"
        >
          {/* Acceptance of Terms */}
          <section id="acceptance" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              </div>
              Acceptance of Terms
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              By accessing and using Mohamed Nazir's portfolio website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <div className="mt-4 p-3 md:p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-xs md:text-sm flex items-center gap-2">
                <Heart className="w-3 h-3 md:w-4 md:h-4" />
                By continuing to use this website, you acknowledge that you have read and understood these terms.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section id="service" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Code className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              Description of Service
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Mohamed Nazir's portfolio is a professional showcase website that displays:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Personal and professional information</li>
              <li>Portfolio of completed projects</li>
              <li>Services offered</li>
              <li>Contact information and inquiry forms</li>
              <li>Testimonials and client feedback</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section id="responsibilities" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              User Responsibilities
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              As a user of this website, you agree to:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>Provide accurate and truthful information when contacting us</li>
              <li>Use the contact form for legitimate business inquiries only</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not use the website for any illegal or harmful purposes</li>
              <li>Respect intellectual property rights and not reproduce content without permission</li>
              <li>Not send spam, malware, or malicious content through our contact forms</li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section id="privacy" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              </div>
              Privacy and Data Protection
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Your privacy is important to us. Our use of any information collected from you is governed by our Privacy Policy.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="/pages/privacy" className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors">
                <Shield className="w-3 h-3" />
                Read Privacy Policy
              </a>
            </div>
          </section>

          {/* Intellectual Property */}
          <section id="intellectual" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Intellectual Property</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Mohamed Nazir or is used with permission and is protected by copyright and other intellectual property laws.
            </p>
            <div className="mt-4 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs md:text-sm">
                ⚠️ You may not reproduce, distribute, modify, or create derivative works of any content without explicit written permission.
              </p>
            </div>
          </section>

          {/* Services and Payments */}
          <section id="payments" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              </div>
              Services and Payments
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              For any paid services offered through this website:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-400 text-sm md:text-base">
              <li>All prices are clearly stated before service engagement</li>
              <li>Payment terms and methods will be agreed upon in writing</li>
              <li>Refunds are handled on a case-by-case basis according to the specific service agreement</li>
              <li>Additional work beyond the original scope will require separate agreement</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section id="liability" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              </div>
              Limitation of Liability
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Mohamed Nazir shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this website or any services offered through it.
            </p>
            <p className="text-gray-300 mt-3 text-sm md:text-base">
              This includes but is not limited to damages for loss of profits, goodwill, data, or other intangible losses.
            </p>
          </section>

          {/* Governing Law */}
          <section id="governing" className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Scale className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              Governing Law
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of India, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of India.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Changes to Terms</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We reserve the right to modify these terms at any time. Any changes will be posted on this page with an updated revision date. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              Contact Us
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-gray-400 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <p>mohamednazirm686@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <p>+91 6374034451</p>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <p>+91 6374034451 (WhatsApp)</p>
              </div>
            </div>
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
            By using our website, you agree to the terms of this Terms of Service.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-1 h-1 bg-cyan-500 rounded-full" />
            <span className="text-gray-600 text-[10px] md:text-xs">Read Carefully</span>
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
