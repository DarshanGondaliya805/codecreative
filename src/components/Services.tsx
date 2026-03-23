"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import Lottie from "lottie-react"
import { useRef, useState, useEffect, useCallback } from "react"
import supportAnim from "../assets/lottie/support.json"
import { useNavigate } from "react-router-dom"


interface Service {
  icon: string
  title: string
  description: string
  accent: string
  gradientFrom: string
  gradientTo: string
  chip: string
  features: string[]
  number: string
  slug: string
}

const services: Service[] = [
  {
    icon: "language",
    title: "Web Development",
    description: "Modern, high-performance web apps with scalable architecture and SEO-ready structure.",
    accent: "#7c3aed",
    gradientFrom: "#7c3aed",
    gradientTo: "#a855f7",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
    features: ["React", "Next.js", "Angular"],
    number: "01",
    slug: "/service/webdevelopment",
  },
  {
    icon: "smartphone",
    title: "Mobile App Development",
    description: "High-performance mobile apps with native and cross-platform technologies.",
    accent: "#0891b2",
    gradientFrom: "#0891b2",
    gradientTo: "#06b6d4",
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
    features: ["Flutter", "React Native", "Swift", "Kotlin"],
    number: "02",
    slug: "/service/appdevelopment",
  },
  {
    icon: "cloud",
    title: "Cloud Development",
    description: "Secure, scalable, and optimized cloud infrastructure with DevOps automation.",
    accent: "#2563eb",
    gradientFrom: "#2563eb",
    gradientTo: "#3b82f6",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    features: ["AWS", "Azure", "GCP", "DevOps"],
    number: "03",
    slug: "/service/clouddevelopment",
  },
  {
    icon: "shopping_cart",
    title: "E-commerce Development",
    description: "Robust and scalable eCommerce platforms with seamless payment integration.",
    accent: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#fb923c",
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300",
    features: ["Shopify", "WooCommerce", "Custom Store"],
    number: "04",
    slug: "/service/ecommercedevelopment",
  },
  {
    icon: "hub",
    title: "Full Stack Development",
    description: "End-to-end development from frontend UI to backend architecture.",
    accent: "#9333ea",
    gradientFrom: "#9333ea",
    gradientTo: "#c026d3",
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
    features: ["MERN", "MEAN", "API Development"],
    number: "05",
    slug: "/service/fullstackdevelopment",
  },
  {
    icon: "palette",
    title: "UI / UX Design",
    description: "User-centric designs with modern aesthetics and seamless user experience.",
    accent: "#4f46e5",
    gradientFrom: "#4f46e5",
    gradientTo: "#7c3aed",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    features: ["Figma", "Wireframing", "Prototyping"],
    number: "06",
    slug: "/service/uiuxdevelopment",
  },
  {
    icon: "bug_report",
    title: "QA & Automation",
    description: "Ensure product quality with automated and manual testing strategies.",
    accent: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#22c55e",
    chip: "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300",
    features: ["Automation Testing", "Cypress", "Jest"],
    number: "07",
    slug: "/service/qa&automation",
  },
  {
    icon: "design_services",
    title: "Web Designing",
    description: "Creative and responsive web designs focused on branding and engagement.",
    accent: "#ec4899",
    gradientFrom: "#ec4899",
    gradientTo: "#f43f5e",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300",
    features: ["Responsive Design", "Brand UI", "Landing Pages"],
    number: "08",
    slug: "/service/webdesigning",
  },
  {
    icon: "campaign",
    title: "Digital Marketing",
    description: "Grow your business with SEO, social media, and paid marketing strategies.",
    accent: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#fbbf24",
    chip: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300",
    features: ["SEO", "Ads", "Social Media"],
    number: "09",
    slug: "/service/digitalmarketing",
  },
  {
    icon: "dns",
    title: "Backend Development",
    description: "Secure and scalable backend systems with optimized database architecture.",
    accent: "#6366f1",
    gradientFrom: "#6366f1",
    gradientTo: "#818cf8",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    features: ["Node.js", "API", "Database"],
    number: "10",
    slug: "/service/backenddevelopment",
  },
  {
    icon: "neurology",
    title: "AI / ML Development",
    description: "Build intelligent systems using machine learning and AI models.",
    accent: "#db2777",
    gradientFrom: "#db2777",
    gradientTo: "#f43f5e",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300",
    features: ["LLM", "Data Models", "Automation"],
    number: "11",
    slug: "/service/aimldevelopment",
  },
  {
    icon: "integration_instructions",
    title: "API & Microservices",
    description: "Build scalable APIs and microservices architecture for seamless system integration and high-performance applications.",
    accent: "#0ea5e9",
    gradientFrom: "#0ea5e9",
    gradientTo: "#38bdf8",
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
    features: ["REST APIs", "GraphQL", "Microservices", "System Integration"],
    number: "12",
    slug: "/service/microservice",
  }
]

/* ─── Particle canvas background ──────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const colors = ["#7c3aed", "#9333ea", "#4f46e5", "#2563eb", "#0891b2", "#db2777"]
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 1,
      opacity: Math.random() * 0.35 + 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0")
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 110) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
}

/* ─── Service card with 3-D tilt + shimmer ─────────────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-70px" })
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(my, { stiffness: 180, damping: 22 })
  const ry = useSpring(mx, { stiffness: 180, damping: 22 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }, [mx, my])

  const onLeave = useCallback(() => {
    mx.set(0); my.set(0); setHovered(false)
  }, [mx, my])

  const row = Math.floor(index / 3)
  const col = index % 3

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, delay: row * 0.12 + col * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="group relative"
    >
      {/* animated glowing border ring */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `linear-gradient(135deg, ${service.gradientFrom}90, ${service.gradientTo}60, transparent 60%, ${service.gradientFrom}40)`,
        }}
      />

      <div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col
                   bg-white dark:bg-slate-900/95
                   border border-slate-100 dark:border-slate-800/70
                   shadow-sm group-hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]
                   dark:group-hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]
                   transition-shadow duration-500"
        style={{ minHeight: 300 }}
      >
        {/* shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ x: "-120%", skewX: "-20deg" }}
          animate={hovered ? { x: "220%" } : { x: "-120%" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{ background: `linear-gradient(105deg, transparent 35%, ${service.accent}22 50%, transparent 65%)` }}
        />

        {/* top accent bar */}
        <div
          className="h-[3px] w-full flex-shrink-0 transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})`,
            boxShadow: hovered ? `0 0 12px 1px ${service.gradientFrom}80` : "none",
          }}
        />

        {/* ambient glow top-right */}
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          animate={hovered ? { opacity: 0.22, scale: 1.2 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ background: service.accent }}
        />

        <div className="relative z-10 p-7 flex flex-col gap-5 flex-1">

          {/* icon + ghost number */}
          <div className="flex items-center justify-between">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${service.accent}1a` }}
              animate={hovered ? { scale: 1.1, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <span className="material-symbols-outlined text-[25px]" style={{ color: service.accent }}>
                {service.icon}
              </span>
            </motion.div>

            <motion.span
              className="text-[52px] font-black leading-none select-none"
              style={{ color: service.accent }}
              animate={hovered ? { opacity: 0.2, y: -4 } : { opacity: 0.06, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {service.number}
            </motion.span>
          </div>

          {/* title */}
          <h3 className="text-[18px] font-extrabold text-slate-900 dark:text-white leading-snug">
            {service.title}
          </h3>

          {/* description */}
          <p className="text-slate-500 dark:text-slate-400 text-[13.5px] leading-[1.75] flex-1">
            {service.description}
          </p>

          {/* animated divider */}
          <div className="relative h-px bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})` }}
              initial={{ width: "0%" }}
              animate={hovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>

          {/* feature chips */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: row * 0.12 + col * 0.09 + 0.28 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-full ${service.chip}`}
              >
                <span className="material-symbols-outlined text-[12px]" style={{ color: service.accent }}>
                  check_circle
                </span>
                {f}
              </motion.span>
            ))}
          </div>

          {/* CTA arrow */}
          <motion.div
            className="flex items-center gap-1.5 text-[12px] font-bold mt-1 w-fit cursor-pointer"
            style={{ color: service.accent }}
            animate={hovered ? { x: 5 } : { x: 0 }}
            onClick={()=>navigate(service.slug) }
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            Explore more
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section heading ─────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "12+", label: "Global Awards" },
    { value: "98%", label: "Client Satisfaction" },
  ]

  return (
    <motion.div ref={ref} className="mb-20 flex flex-col items-center text-center">
      {/* badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.88 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7 inline-flex items-center gap-2.5 rounded-full px-5 py-2
                   border border-violet-200 dark:border-violet-700/40
                   bg-violet-50 dark:bg-violet-950/30"
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-violet-500"
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
          What We Do
        </span>
      </motion.div>

      {/* heading overflow-clip reveal */}
      <div className="overflow-hidden mb-5">
        <motion.h2
          initial={{ y: 70, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] md:text-[58px] font-extrabold leading-[1.07]
                     text-slate-900 dark:text-white max-w-3xl"
        >
          Services Built for{" "}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #db2777 55%, #f97316 100%)",
              }}
            >
              Scale & Speed
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
              viewBox="0 0 320 10"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,6 Q40,1 80,6 Q120,11 160,6 Q200,1 240,6 Q280,11 320,6"
                fill="none"
                stroke="url(#swGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.65, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="swGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="55%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.28 }}
        className="max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400"
      >
        From concept to deployment, our full-spectrum expertise covers every layer
        of modern digital product development.
      </motion.p>

      {/* stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.42 }}
        className="mt-10 flex flex-wrap justify-center gap-10"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span
              className="text-[32px] font-black leading-none bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #db2777)" }}
            >
              {s.value}
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function BottomCTA() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="mt-16 relative overflow-hidden rounded-3xl
                 border border-slate-200 dark:border-slate-800
                 bg-gradient-to-br from-white via-slate-50 to-white
                 dark:from-slate-900 dark:to-slate-950
                 px-6 sm:px-10 py-8
                 flex flex-col md:flex-row items-center justify-between gap-6
                 shadow-md hover:shadow-2xl transition-all duration-500"
    >

      {/* ✨ animated glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={hov ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(219,39,119,0.08))",
        }}
      />

      {/* 🧑‍💻 LOTTIE CHARACTER */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="w-[120px] md:w-[160px] flex-shrink-0"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Lottie animationData={supportAnim} loop />
        </motion.div>
      </motion.div>

      {/* TEXT */}
      <div className="relative z-10 text-center md:text-left max-w-md">
        <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Let’s Build Something Powerful Together 🚀
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Tell us your idea — we’ll design, develop, and scale it into a
          high-performing digital product.
        </p>
      </div>

      {/* CTA BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-10 flex items-center gap-2.5
                   rounded-xl px-8 py-3.5 text-sm font-bold text-white
                   shadow-lg shadow-violet-500/30 hover:shadow-pink-500/40
                   transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
        }}
        onClick={() => navigate("/contactus")}
      >
        {/* shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={hov ? { x: ["-100%", "200%"] } : { x: "-100%" }}
          transition={{ duration: 0.7 }}
          style={{
            background:
              "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
          }}
        />

        Start Your Project

        <motion.span
          className="material-symbols-outlined text-[18px]"
          animate={hov ? { x: 6 } : { x: 0 }}
        >
          arrow_forward
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
/* ─── EXPORT ──────────────────────────────────────────────── */
export default function Services() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#07070f] py-28">

      <ParticleField />

      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-64 -left-64 w-[800px] h-[800px] rounded-full bg-violet-500/4 blur-[160px]" />
        <div className="absolute -bottom-64 -right-64 w-[800px] h-[800px] rounded-full bg-pink-500/4 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/3 blur-[120px]" />
        {/* dot grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.022] dark:opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <BottomCTA />
      </div>
    </section>
  )
}