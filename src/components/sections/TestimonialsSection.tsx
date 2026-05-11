import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Quote, Phone, MessageCircle, User, ThumbsUp } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "Exceptional work! Our new e-commerce platform exceeded all expectations. The attention to detail and innovative solutions transformed our business operations completely.",
    rating: 5,
    project: "E-Commerce Platform",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "FitLife Studios",
    content: "The fitness app development was flawless. User engagement increased by 300% within the first month. The app received 5-star ratings across all platforms and stores.",
    rating: 5,
    project: "Fitness Tracking App",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    role: "CTO",
    company: "DataFlow Analytics",
    content: "Outstanding dashboard design and implementation. Real-time analytics have never been more beautiful and intuitive. The team's technical expertise is remarkable.",
    rating: 5,
    project: "SaaS Dashboard",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "Connect Social",
    content: "Brilliant mobile app development! The social features and real-time messaging work flawlessly. Our user base has grown 200% since launch. Highly recommended!",
    rating: 5,
    project: "Social Media App",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Director",
    company: "GrowthHub",
    content: "The landing page conversion rate increased by 250% after the redesign. Perfect blend of aesthetics and functionality. We couldn't be happier with the results.",
    rating: 5,
    project: "Marketing Landing Page",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [direction, setDirection] = useState(0)
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isMobile) return // Don't auto-rotate on mobile
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, isMobile])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  }

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <motion.div
      className="glass-card p-5 sm:p-8 rounded-2xl relative overflow-hidden"
      whileHover={!isMobile ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 text-cyan-400/20" />
      
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Rating */}
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-4 sm:line-clamp-none">
        "{testimonial.content}"
      </p>

      {/* Project info */}
      <div className="mb-4 sm:mb-6">
        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 rounded-full text-xs sm:text-sm text-cyan-400 font-medium">
          <ThumbsUp className="w-3 h-3" />
          {testimonial.project}
        </span>
      </div>

      {/* Author info */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
            {testimonial.image ? (
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Author details */}
          <div>
            <h4 className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</h4>
            <p className="text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
            <p className="text-gray-500 text-[10px] sm:text-xs">{testimonial.company}</p>
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-1 sm:gap-2">
          <motion.a
            href={`tel:${testimonial.phone}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-cyan-400 transition-colors" />
          </motion.a>
          <motion.a
            href={`https://wa.me/${testimonial.whatsapp.replace('+', '')}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-cyan-400 transition-colors" />
          </motion.a>
        </div>
      </div>

      {/* Floating particles - desktop only */}
      {!isMobile && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )

  const currentTestimonial = testimonials[currentIndex]
  const displayedTestimonials = isMobile 
    ? [currentTestimonial]
    : testimonials.filter((_, index) => index !== currentIndex).slice(0, 3)

  return (
    <section id="testimonials" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
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
            <Quote className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Testimonials</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Client Testimonials</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            What my clients say about working with me
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main testimonial display with animation */}
          <div className="max-w-4xl mx-auto px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialCard testimonial={currentTestimonial} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 w-6 sm:w-8 h-1.5 sm:h-2"
                    : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Preview testimonials - desktop only */}
          {!isMobile && displayedTestimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:mt-12">
              {displayedTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    const newIndex = testimonials.findIndex(t => t.name === testimonial.name)
                    setDirection(newIndex > currentIndex ? 1 : -1)
                    setCurrentIndex(newIndex)
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {testimonial.image ? (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-xs sm:text-sm truncate">{testimonial.name}</h4>
                      <p className="text-gray-400 text-[10px] sm:text-xs truncate">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
                    "{testimonial.content.substring(0, 80)}..."
                  </p>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats summary */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:flex md:justify-center gap-3 md:gap-8 px-4"
        >
          {[
            // { value: "50+", label: "Happy Clients", icon: User },
            // { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
            // { value: "40+", label: "Projects Delivered", icon: Star },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-3 md:p-4 text-center flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-lg md:text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={itemVariants}
          className="mt-10 md:mt-12 text-center"
        >
          <div className="inline-flex gap-1.5 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"
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

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
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