import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Smartphone, Monitor, Globe, ArrowRight, Star, Filter } from 'lucide-react'

// Helper function to get correct base path for images
const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/my-porfolio2.0' : ''
}

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with real-time inventory, payment processing, and admin dashboard",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    type: "web",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-purple-500 to-pink-500",
    year: "2024"
  },
  {
    title: "Fitness Tracking App",
    description: "Cross-platform mobile app for workout tracking, nutrition planning, and progress analytics",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Charts.js"],
    type: "mobile",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-green-500 to-teal-500",
    year: "2024"
  },
  {
    title: "Kadambam Builders wedsite",
    description: "The platform combines professional branding, secure content management, and dynamic business tools to deliver a scalable digital solution for customer engagement and lead generation.",
    image: `${getBasePath()}/Screenshot 2026-05-08 000907.png`,
    technologies: ["Vite","React 18","TypeScript", "TailwindCSS", "JWT","Supabase"],
    type: "web",
    liveUrl: "https://kadambambuilders.com/",
    githubUrl: "https://kadambambuilders.com/",
    featured: true,
    gradient: "from-blue-500 to-indigo-500",
    year: "2026"
  },
  {
    title: "Social Media App",
    description: "Social networking platform with real-time messaging, content sharing, and community features",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=600&fit=crop",
    technologies: ["Flutter", "Firebase", "WebRTC", "Node.js"],
    type: "mobile",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-orange-500 to-red-500",
    year: "2023"
  },
  {
    title: "Milestone Construction Wedsite",
    description: "Smooth animations, lazy loading, and optimized for fast loading and great user experience.",
    image: `${getBasePath()}/Screenshot 2026-05-08 002122.png`,
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "3D Graphics & Animation"],
    type: "web",
    liveUrl: "https://mohamednazir-tech.github.io/construction/",
    githubUrl: "#",
    featured: true,
    gradient: "from-cyan-500 to-blue-500",
    year: "2026"
  },
  {
    title: "Task Management App",
    description: "Productivity app with team collaboration, real-time updates, and kanban boards",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=300&h=600&fit=crop",
    technologies: ["React Native", "Supabase", "Tailwind", "Zustand"],
    type: "mobile",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-yellow-500 to-orange-500",
    year: "2024"
  }
]

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
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

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.type === filter)

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

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={itemVariants}
      className="group relative"
      layout
    >
      <div className="relative glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Project Image/Device Mockup */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Device frame based on project type */}
          {project.type === "mobile" ? (
            <div className="absolute inset-2 sm:inset-4 bg-black rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-700 shadow-2xl overflow-hidden">
              <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-0.5 sm:h-1 bg-gray-700 rounded-full" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="absolute inset-2 sm:inset-4 bg-black rounded-lg sm:rounded-xl border-2 sm:border-4 border-gray-700 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gray-800 flex items-center px-2 sm:px-3 gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover mt-6 sm:mt-8"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', project.image);
                  console.error('Project:', project.title);
                  // Try fallback
                  e.currentTarget.src = 'https://via.placeholder.com/300x200/1a1a1a/00d4ff?text=' + encodeURIComponent(project.title);
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', project.image);
                }}
              />
            </div>
          )}
          
          {/* Featured badge */}
          {project.featured && (
            <motion.div
              className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-[10px] sm:text-xs text-white font-bold">FEATURED</span>
              </div>
            </motion.div>
          )}

          {/* Floating tech badges - optimized for mobile */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
            {project.technologies.slice(0, isMobile ? 1 : 2).map((tech, i) => (
              <motion.div
                key={tech}
                className="px-1.5 sm:px-3 py-0.5 sm:py-1 bg-black/60 backdrop-blur-sm rounded-full text-[8px] sm:text-xs text-white border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <span className="text-[10px] sm:text-xs text-gray-500">{project.year}</span>
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {project.technologies.slice(0, isMobile ? 3 : 4).map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-gray-300 border border-white/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isMobile ? 3 : 4) && (
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-gray-400">
                +{project.technologies.length - (isMobile ? 3 : 4)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-auto">
            {(() => {
              const hasLiveDemo = project.liveUrl && project.liveUrl !== "#";
              return (
                <motion.a
                  href={hasLiveDemo ? project.liveUrl : undefined}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg transition-all pointer-events-auto z-50 relative"
                  whileHover={hasLiveDemo ? { scale: 1.05 } : {}}
                  whileTap={hasLiveDemo ? { scale: 0.95 } : {}}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!hasLiveDemo) {
                      e.preventDefault();
                      alert("Live demo not available for this project");
                    }
                  }}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  Live Demo
                </motion.a>
              );
            })()}
            
            {(() => {
              const hasGithub = project.githubUrl && project.githubUrl !== "#";
              return (
                <motion.a
                  href={hasGithub ? project.githubUrl : undefined}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 glass-card rounded-lg text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition-all pointer-events-auto z-50 relative"
                  whileHover={hasGithub ? { scale: 1.05 } : {}}
                  whileTap={hasGithub ? { scale: 0.95 } : {}}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!hasGithub) {
                      e.preventDefault();
                      alert("GitHub repository not available for this project");
                    }
                  }}
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.a>
              );
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const filterOptions = [
    { value: "all", label: "All Projects", icon: Globe, count: projects.length },
    { value: "web", label: "Web Apps", icon: Monitor, count: projects.filter(p => p.type === "web").length },
    { value: "mobile", label: "Mobile Apps", icon: Smartphone, count: projects.filter(p => p.type === "mobile").length }
  ]

  return (
    <section id="projects" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
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
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Portfolio</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
          >
            Showcasing my best work in web and mobile development
          </motion.p>

          {/* Mobile Filter Dropdown */}
          {isMobile ? (
            <div className="relative px-4 mb-6">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="w-full glass-card px-6 py-3 rounded-xl flex items-center justify-between text-white"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">
                    {filterOptions.find(f => f.value === filter)?.label}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {filteredProjects.length} projects
                </span>
              </button>
              
              <AnimatePresence>
                {showMobileFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-4 right-4 mt-2 glass-card rounded-xl overflow-hidden z-20"
                  >
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilter(option.value)
                          setShowMobileFilter(false)
                        }}
                        className={`w-full px-6 py-3 flex items-center justify-between transition-colors ${
                          filter === option.value
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <option.icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                        <span className="text-xs">{option.count}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Desktop Filter Buttons */
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 flex-wrap px-4"
            >
              {filterOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                    filter === option.value
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
                      : "glass-card text-gray-300 hover:text-white hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <option.icon className="w-4 h-4" />
                  {option.label}
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {option.count}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 px-4"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <ProjectCard key={`${project.title}-${filter}`} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <p className="text-gray-400">No projects found in this category.</p>
          </motion.div>
        )}

        {/* View More Button */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-10 md:mt-12"
        >
          <motion.button
            className="group px-6 md:px-8 py-3 md:py-4 glass-card rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mx-auto text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Add your "view all" logic here
              console.log("View all projects")
            }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
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