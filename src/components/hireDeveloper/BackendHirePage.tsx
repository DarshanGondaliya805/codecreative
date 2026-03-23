"use client"

import React, { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion"

// ─── Light theme tokens ────────────────────────────────────────────────────────
const C = {
  primary:       "#ec5b13",
  primaryLight:  "rgba(236,91,19,0.07)",
  primaryMid:    "rgba(236,91,19,0.15)",
  primaryBorder: "rgba(236,91,19,0.20)",
  primaryShadow: "rgba(236,91,19,0.25)",
  primaryGlow:   "rgba(236,91,19,0.10)",
  bg:            "#f8f6f6",
  bgDark:        "#221610",
  surface:       "#ffffff",
  surfaceAlt:    "#f2eeeb",
  surfaceDeep:   "#ede9e6",
  text:          "#221610",
  textMid:       "#5a4138",
  textMuted:     "#a98a7f",
  textFaint:     "#c4a898",
  border:        "rgba(236,91,19,0.10)",
  borderMid:     "rgba(236,91,19,0.20)",
  divider:       "rgba(34,22,16,0.07)",
  tertiary:      "#1b7fd4",
  green:         "#16a34a",
}

const ease = [0.25, 0.46, 0.45, 0.94] as const
const spr  = { type: "spring", stiffness: 180, damping: 20 } as const

const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.72, delay: i * 0.11, ease } }),
}
const scaleUp:any = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.62, delay: i * 0.09, ease: [0.34, 1.56, 0.64, 1] } }),
}
const slideRight:any = {
  hidden:  { opacity: 0, x: -52 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.7, delay: i * 0.1, ease } }),
}
const slideLeft:any = {
  hidden:  { opacity: 0, x: 52 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.7, delay: i * 0.1, ease } }),
}

function Reveal({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-72px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} style={style}>
      {children}
    </motion.div>
  )
}

function MagBtn({ children, style = {}, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  const x = useSpring(0, { stiffness: 280, damping: 28 })
  const y = useSpring(0, { stiffness: 280, damping: 28 })
  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.22)
    y.set((e.clientY - r.top  - r.height / 2) * 0.22)
  }
  function onLeave() { x.set(0); y.set(0) }
  return (
    <motion.button style={{ x, y, cursor: "pointer", ...style }} onMouseMove={onMove} onMouseLeave={onLeave} whileTap={{ scale: 0.96 }} onClick={onClick}>
      {children}
    </motion.button>
  )
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count  = useMotionValue(0)
  useAnimationFrame(() => {
    if (!inView) return
    const cur = count.get()
    if (cur < to) { count.set(Math.min(cur + to / 55, to)); if (ref.current) ref.current.textContent = Math.round(count.get()) + suffix }
  })
  return <span ref={ref}>0{suffix}</span>
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const whyCards = [
  { icon: "hub",      title: "Scalable Architecture", desc: "Microservices and serverless designs that grow seamlessly with your user base." },
  { icon: "security", title: "Secure APIs",           desc: "Enterprise-grade authentication and encryption protocols for every data point." },
  { icon: "speed",    title: "High Performance",      desc: "Sub-millisecond latency through aggressive caching and optimized query logic." },
  { icon: "database", title: "Reliable Databases",    desc: "Sophisticated schema design ensuring data integrity and rapid retrieval." },
]

const techStack = [
  { icon: "code",              label: "Node.js"         },
  { icon: "terminal",          label: "Python (Django)" },
  { icon: "coffee",            label: "Java (Spring)"   },
  { icon: "settings_ethernet", label: ".NET Core"       },
  { icon: "api",               label: "REST & GraphQL"  },
  { icon: "storage",           label: "PostgreSQL"      },
  { icon: "data_object",       label: "MongoDB"         },
  { icon: "bolt",              label: "Redis"           },
  { icon: "php",               label: "PHP (Laravel)"   },
  { icon: "database",          label: "MySQL"           },
]

const processSteps = [
  { n: "01", title: "Requirement Analysis", desc: "Deep dive into logic, data flows, and performance KPIs.",               accent: true  },
  { n: "02", title: "System Architecture",  desc: "Designing schemas, microservices, and load balancing maps.",            accent: false },
  { n: "03", title: "Backend Development",  desc: "High-performance coding with strict adherence to clean standards.",     accent: false },
  { n: "04", title: "Security Checks",      desc: "Vulnerability scanning and penetration testing on all endpoints.",      accent: false },
  { n: "05", title: "Deployment",           desc: "CI/CD automation for seamless cloud-native orchestration.",             accent: false },
]

const projects = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ADOOqtvNXN5CR8QnpAYe01EpYPiqYiBs05jt7hbBlEYmsS4F-pRvQfmo8TI0GI8b_we8pWRcvV_Z9zE1igYdkjcvE8dsTbJZMiJdjwQevIoBRJGSl_8lq_eTJCWDJc-D3CUTVXbfsoA_Tg2ZaXVqd1ywofpAStnL4o4kwnEkiOcLsnkIw-pJwfU4cBSWwfcAvAPpZMf6_8p5rX5_ars9TDe9AQ8dl-hO7ZO52qdu8UAgxg8PTHs8ibdWEd0wDyZegZaeqGtLQUg",  tag: "FinTech API",       title: "Global Payments Engine",   desc: "A high-concurrency Node.js gateway processing $50M+ in monthly transactions with 99.99% uptime." },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaOp2ujwncY6uLzZNKMgoZCh0zpRtkaHYCzIxabn55GC-WotqTwJLs9xLRJQUOMZEJ-vloDyk-0BwxKBdkRViIMKZUrOKCQM_TLdSORmgNYpkGu-d0DvWofinpOGlxuO41-bYlyJXTcZmalrA_Bjcw10FaFz3i7DjQWQucVEhi-TmUQHTNn71bDvXNVWRMQaihvznVV7k-EbMrux8rJxowfhCYPfZF3FKdJ5axLqow4271-BqpXXGLjjeohXzVuE2TPcm4ohn6RZY", tag: "IoT Infrastructure", title: "Smart City Hub",         desc: "Real-time data ingestion for 100k+ sensors using Python and Redis cluster for instant telemetry." },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0kcE6uwZF4r65vkSdp24zEmek1ulrnieI9UR93LV2OcyqLjj5HNBTMeNXPAKyEB3Epfq-PLx0fXF3SVHSxZHpfS0DRmZUMj9em2wBDVVCTnr3hR7_s8JZM12w7lEo9gsWJ-qWQhXdgTsEZMkFodJwHJbUONIi96OV5W6b5DXzU11pfobSO2RoGD5VFVxyugUS47XDtFiMzo4KNXz3br8SO4wAI4Pm8fdQHZy6jgbecIR7ozEuwUDQQJ1UfCAGDiXx4d-tOzhTZYo",  tag: "Enterprise SaaS",  title: "HR Intelligence Platform", desc: "Microservices-based backend built on Spring Boot for highly secure employee data orchestration." },
]

const stats = [
  { val: 250, suffix: "+",  label: "Systems Built"   },
  { val: 99,  suffix: "%",  label: "Success Rate"    },
  { val: 50,  suffix: "M+", label: "Tx / Month"      },
  { val: 100, suffix: "k+", label: "Sensors Managed" },
]

export default function BackendHirePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY    = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const heroFade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const [form, setForm] = useState({ name: "", email: "", details: "", tech: "Node.js", budget: "$10k - $25k" })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .hl  { font-family: 'Space Grotesk', sans-serif; }
        .mono{ font-family: 'DM Mono', monospace; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal;
          font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr;
          font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; user-select: none; vertical-align: middle;
        }
        ::selection { background: rgba(236,91,19,0.14); }
        a { text-decoration: none; color: inherit; }
        input, textarea, select { font-family: 'DM Sans', sans-serif; color: ${C.text}; }
        input::placeholder, textarea::placeholder { color: ${C.textFaint}; }
        select option { background: ${C.surface}; color: ${C.text}; }
        .dot-bg { background-image: radial-gradient(circle, rgba(236,91,19,0.08) 1px, transparent 1px); background-size: 32px 32px; }
        .glass { background: rgba(255,255,255,0.76); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid ${C.border}; box-shadow: 0 2px 16px rgba(34,22,16,0.06); }
        .glow  { filter: blur(90px); border-radius: 9999px; pointer-events: none; position: absolute; }
        .shimmer { overflow: hidden; position: relative; }
        .shimmer::after { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.55) 50%, transparent 62%); transform: translateX(-110%); }
        .shimmer:hover::after { transform: translateX(200%); transition: transform 0.5s ease; }
        @keyframes pulse-ring { 0%,100% { box-shadow: 0 0 0 0 rgba(236,91,19,0.55); } 50% { box-shadow: 0 0 0 6px rgba(236,91,19,0); } }
        .pulse-dot { animation: pulse-ring 2s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .float { animation: float 5.5s ease-in-out infinite; }
      `}</style>

      <main style={{ background: C.bg, overflowX: "hidden" }}>

        {/* ══════════════════ HERO ══════════════════════════════════════════════ */}
        <section ref={heroRef}
          style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "6rem 3rem 5rem", overflow: "hidden", background: `linear-gradient(135deg, ${C.bg} 0%, #fff3ec 100%)` }}>
          <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />
          <div className="glow" style={{ top: "0%", right: "-5%",  width: "600px", height: "600px", background: "rgba(236,91,19,0.11)" }} />
          <div className="glow" style={{ bottom: "5%", left: "-8%", width: "420px", height: "420px", background: "rgba(27,127,212,0.07)" }} />

          <motion.div style={{ opacity: heroFade, y: heroY, width: "100%", maxWidth: "88rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

              {/* Left */}
              <motion.div initial="hidden" animate="visible">
                <motion.div variants={fadeUp} custom={0}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", borderRadius: "9999px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, marginBottom: "2rem" }}>
                  <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "9999px", background: C.primary, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: C.primary, textTransform: "uppercase", fontFamily: "Space Grotesk" }}>Active Backend Intelligence</span>
                </motion.div>

                <motion.h1 variants={fadeUp} custom={1} className="hl"
                  style={{ fontSize: "clamp(3rem,6.5vw,5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.75rem", color: C.text }}>
                  Hire Expert <br />
                  <span style={{ background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Backend</span>{" "}Developers
                </motion.h1>

                <motion.p variants={fadeUp} custom={2}
                  style={{ fontSize: "1.1rem", color: C.textMid, fontWeight: 300, maxWidth: "34rem", lineHeight: 1.78, marginBottom: "2.75rem" }}>
                  Build secure, scalable, and high-performance server-side applications with our backend experts. Engineered for complexity, designed for speed.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <MagBtn style={{ padding: "1rem 2.25rem", background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 10px 32px ${C.primaryShadow}` }}>Hire Now</MagBtn>
                  <MagBtn style={{ padding: "1rem 2.25rem", background: "rgba(255,255,255,0.76)", color: C.text, fontWeight: 700, borderRadius: "0.875rem", border: `1px solid ${C.border}`, fontFamily: "Space Grotesk", fontSize: "1rem", backdropFilter: "blur(12px)" }}>Discuss Project</MagBtn>
                </motion.div>
              </motion.div>

              {/* Right — hero card */}
              <motion.div initial={{ opacity: 0, x: 80, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 3 }} transition={{ duration: 0.9, delay: 0.3, ease }} style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-0.5rem", borderRadius: "2.25rem", background: `linear-gradient(135deg, rgba(236,91,19,0.09), rgba(236,91,19,0.02))`, transform: "rotate(5deg)" }} />
                <motion.div className="glass" whileHover={{ rotate: 0, scale: 1.02 }} transition={{ duration: 0.6 }} style={{ borderRadius: "2rem", overflow: "hidden", maxWidth: "26rem", margin: "0 auto", boxShadow: `0 28px 72px rgba(34,22,16,0.12)` }}>
                  <div style={{ position: "relative", aspectRatio: "1/1" }}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAw32CSVtZEFh1R8XRfWRpCasr1b5_cfX3dDxK4L8BH_a4XlYC4lMUE0NoEx5mTwoxsok-PtSY3McRJr9XWo3tevadM6nEBy6lKq_n11RDNPAlnMhwCneCEbvdHiElcDPUk6NXazLOmGsl-g3nlsi3wYiZG48CjaX7tULcDiW-lnCTm-wCIq80DB0R8Sv4xTk2I2Yl8ETH51BD8nDfs_YOOJml8rfVdVXIYX4XLJ7NfX9618FATU_TawRm-U_CpqehoVz2vjL3Yf4"
                      alt="Server" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.7 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.4) 0%, transparent 55%)" }} />
                  </div>
                  {/* server status */}
                  <div className="glass float" style={{ position: "absolute", bottom: "1.5rem", left: "1.25rem", right: "1.25rem", padding: "1rem 1.25rem", borderRadius: "1rem", zIndex: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "9999px", background: C.green, flexShrink: 0 }} />
                      <span className="mono" style={{ fontSize: "0.7rem", color: C.tertiary, fontWeight: 500 }}>Server Status: Optimized</span>
                    </div>
                    <div style={{ height: "5px", width: "100%", background: C.surfaceDeep, borderRadius: "99px", overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 1.4, delay: 0.9, ease }}
                        style={{ height: "100%", background: `linear-gradient(90deg, ${C.primary}, #f97c42)`, borderRadius: "99px" }} />
                    </div>
                  </div>
                </motion.div>
                {/* floating badge */}
                <motion.div initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ ...spr, delay: 1.1 }}
                  className="glass" style={{ position: "absolute", top: "2rem", left: "-2.5rem", padding: "0.875rem 1.25rem", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", boxShadow: "0 8px 28px rgba(34,22,16,0.10)" }}>
                  <span className="material-symbols-outlined" style={{ color: C.primary }}>cloud_done</span>
                  <div>
                    <p className="hl" style={{ fontWeight: 700, fontSize: "0.78rem", color: C.text }}>99.99% Uptime</p>
                    <p style={{ fontSize: "0.68rem", color: C.textMuted }}>SLA Guaranteed</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════ STATS ═════════════════════════════════════════════ */}
        <section style={{ padding: "3.5rem 3rem", background: C.surface, borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}` }}>
          <Reveal>
            <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={scaleUp} custom={i}
                  whileHover={{ y: -4, borderColor: C.primaryBorder, boxShadow: `0 12px 36px ${C.primaryGlow}` }}
                  style={{ textAlign: "center", padding: "1.75rem 1rem", borderRadius: "1.25rem", background: C.surfaceAlt, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}>
                  <div className="hl" style={{ fontSize: "2.6rem", fontWeight: 800, color: C.primary, lineHeight: 1, marginBottom: "0.35rem" }}>
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: "0.75rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ WHY CHOOSE US ════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surfaceAlt }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", maxWidth: "42rem", margin: "0 auto 4rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text, letterSpacing: "-0.02em" }}>
                Why Engineering Leaders <span style={{ color: C.primary }}>Choose Us</span>
              </h2>
              <p style={{ color: C.textMuted }}>We don't just write code; we architect resilient digital backbones that support global scale.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
              {whyCards.map((card, i) => (
                <motion.div key={card.title} variants={scaleUp} custom={i} className="shimmer"
                  whileHover={{ y: -6, borderColor: C.primaryBorder, boxShadow: `0 18px 52px ${C.primaryGlow}` }}
                  style={{ padding: "2rem", borderRadius: "1.5rem", background: C.surface, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}>
                  <motion.span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "2.25rem", display: "block", marginBottom: "1.25rem" }}
                    whileHover={{ scale: 1.2, rotate: -8 }} transition={{ type: "spring", stiffness: 260 }}>
                    {card.icon}
                  </motion.span>
                  <h3 className="hl" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.65rem", color: C.text }}>{card.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: "0.875rem", lineHeight: 1.7 }}>{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ TECH ECOSYSTEM ═══════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surface }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ maxWidth: "28rem" }}>
                <h2 className="hl" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, marginBottom: "0.875rem", color: C.text, letterSpacing: "-0.02em" }}>
                  Our Tech <span style={{ color: C.primary }}>Ecosystem</span>
                </h2>
                <p style={{ color: C.textMid, lineHeight: 1.72 }}>We master the languages that power the web. From legacy modernization to cutting-edge cloud native builds.</p>
              </div>
              <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                {["Cloud Native", "Open Source"].map(tag => (
                  <span key={tag} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, fontSize: "0.7rem", fontWeight: 700, color: C.primary, fontFamily: "Space Grotesk", letterSpacing: "0.06em" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem" }}>
              {techStack.map((tech, i) => (
                <motion.div key={tech.label} variants={scaleUp} custom={i * 0.7} className="shimmer"
                  whileHover={{ y: -5, borderColor: C.primaryBorder, boxShadow: `0 12px 36px ${C.primaryGlow}` }}
                  style={{ padding: "1.5rem", borderRadius: "1rem", background: C.surfaceAlt, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.875rem", transition: "border-color 0.3s, box-shadow 0.3s", cursor: "default" }}>
                  <motion.div whileHover={{ scale: 1.15, background: C.primaryLight }}
                    style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s", border: `1px solid ${C.border}` }}>
                    <motion.span className="material-symbols-outlined" style={{ color: C.textMuted, fontSize: "1.4rem", transition: "color 0.25s" }}
                      whileHover={{ color: C.primary } as any}>{tech.icon}</motion.span>
                  </motion.div>
                  <span className="hl" style={{ fontWeight: 600, fontSize: "0.8rem", color: C.text, textAlign: "center" }}>{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ ENGINEERING LIFECYCLE ════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surfaceAlt }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "5rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text, letterSpacing: "-0.02em" }}>
                Our Engineering <span style={{ color: C.primary }}>Lifecycle</span>
              </h2>
              <p style={{ color: C.textMuted }}>A rigorous process designed to eliminate technical debt before it starts.</p>
            </motion.div>
            <div style={{ position: "relative" }}>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }}
                style={{ position: "absolute", top: "1.5rem", left: "10%", right: "10%", height: "2px", background: `linear-gradient(90deg, ${C.primary}, rgba(236,91,19,0.18))`, opacity: 0.3, transformOrigin: "left", pointerEvents: "none" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.5rem" }}>
                {processSteps.map((step, i) => (
                  <motion.div key={step.n} variants={fadeUp} custom={i * 0.9} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem", position: "relative", zIndex: 1 }}>
                    <motion.div initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ ...spr, delay: i * 0.12 }} whileHover={{ scale: 1.1, rotate: 8 }}
                      style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "0.875rem",
                        ...(step.accent ? { background: C.primary, color: "#fff", boxShadow: `0 8px 24px ${C.primaryShadow}` } : { background: C.surface, color: C.primary, border: `2px solid ${C.primaryBorder}`, boxShadow: "0 4px 14px rgba(34,22,16,0.07)" }) }}>
                      {step.n}
                    </motion.div>
                    <h4 className="hl" style={{ fontWeight: 700, fontSize: "0.95rem", color: C.text, lineHeight: 1.3 }}>{step.title}</h4>
                    <p style={{ fontSize: "0.8rem", color: C.textMuted, lineHeight: 1.6 }}>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ CASE STUDIES ═════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surface }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "3.5rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.5rem", color: C.text, letterSpacing: "-0.02em" }}>
                Case <span style={{ color: C.primary }}>Studies</span>
              </h2>
              <p style={{ color: C.textMuted }}>Real-world systems handling millions of daily transactions.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
              {projects.map((proj, i) => (
                <motion.div key={proj.title} variants={scaleUp} custom={i}
                  whileHover={{ y: -6, boxShadow: `0 24px 64px rgba(34,22,16,0.09)` }}
                  style={{ borderRadius: "2rem", overflow: "hidden", background: C.surfaceAlt, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s", cursor: "default" }}>
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                    <motion.img src={proj.src} alt={proj.title} whileHover={{ scale: 1.08 }} transition={{ duration: 0.65 }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.2) 0%, transparent 50%)" }} />
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: C.primary, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem", fontFamily: "Space Grotesk" }}>{proj.tag}</span>
                    <h3 className="hl" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.65rem", color: C.text }}>{proj.title}</h3>
                    <p style={{ color: C.textMid, fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{proj.desc}</p>
                    <motion.a href="#" whileHover={{ gap: "0.875rem" } as any} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 700, color: C.tertiary, transition: "gap 0.2s" }}>
                      View Case Study <span className="material-symbols-outlined" style={{ fontSize: "0.95rem" }}>arrow_forward</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ TESTIMONIALS ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surfaceAlt }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <motion.div variants={slideRight} custom={0}>
                <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "1.25rem", color: C.text, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Built by Experts, <span style={{ color: C.primary }}>Trusted by Global Tech</span>
                </h2>
                <p style={{ color: C.textMid, fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                  We've helped startups and Fortune 500 companies alike build the core of their digital products.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  {[{ val: 250, suf: "+", label: "Systems Built" }, { val: 99, suf: "%", label: "Success Rate" }].map((s, si) => (
                    <React.Fragment key={s.label}>
                      {si > 0 && <div style={{ width: "1px", height: "3rem", background: C.divider }} />}
                      <div style={{ textAlign: "center" }}>
                        <div className="hl" style={{ fontSize: "2.25rem", fontWeight: 800, color: C.text }}><Counter to={s.val} suffix={s.suf} /></div>
                        <div style={{ fontSize: "0.75rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={slideLeft} custom={0}>
                <motion.div className="glass shimmer" whileHover={{ y: -6, borderColor: C.primaryBorder, boxShadow: `0 24px 64px ${C.primaryGlow}` }}
                  style={{ padding: "2.5rem", borderRadius: "2rem", position: "relative", overflow: "hidden", transition: "box-shadow 0.3s, border-color 0.3s" }}>
                  <span className="material-symbols-outlined"
                    style={{ position: "absolute", top: "1.5rem", right: "2rem", fontSize: "5rem", color: C.primaryLight, lineHeight: 1, pointerEvents: "none", fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <motion.img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVsTef7bu0WcMwRZ602bqR2YSZiXWYIHHqpPazpf27HHAdoKkmlJoFMYTHpUwOcE7hDyhA0C8qdvulb64ClM30J59DTdcI3VBsf0iUAP8LXl8RtivH8u_W8naBC-cLwXAk4r2UvM75y29Axl9hu7l0C1YI2gzI6DWhTVL810ciEf4VyWSSdRaFesQQKF5RopH_zqnUD4k4SgE0_jYudnctNLvj-Y_T3rsdD_GMvLYEZRshWnG-sVHPnq47tREDhiLHUqOLHdmSssQ"
                      alt="David Chen" whileHover={{ scale: 1.08 }}
                      style={{ width: "3rem", height: "3rem", borderRadius: "9999px", objectFit: "cover", border: `2px solid ${C.primaryBorder}` }} />
                    <div>
                      <h4 className="hl" style={{ fontWeight: 700, fontSize: "0.95rem", color: C.text }}>David Chen</h4>
                      <p style={{ fontSize: "0.75rem", color: C.textMuted }}>CTO, Nexus Dynamics</p>
                    </div>
                  </div>
                  <p style={{ fontStyle: "italic", color: C.textMid, lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.975rem", position: "relative" }}>
                    "The backend architecture DevHire provided handled our Black Friday traffic without a single hiccup. Their engineering depth is unmatched."
                  </p>
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {[...Array(5)].map((_, si) => (
                      <motion.span key={si} className="material-symbols-outlined"
                        initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        transition={{ delay: si * 0.08, type: "spring", stiffness: 220 }}
                        style={{ color: C.primary, fontSize: "1rem", fontVariationSettings: "'FILL' 1" }}>star</motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ CONTACT FORM ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", position: "relative", overflow: "hidden", background: C.surface }}>
          <div className="glow" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "rgba(236,91,19,0.09)" }} />
          <Reveal style={{ maxWidth: "52rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div variants={scaleUp} custom={0}
              style={{ background: C.surfaceAlt, padding: "clamp(2.5rem,5vw,4rem)", borderRadius: "2.5rem", border: `1px solid ${C.border}`, boxShadow: `0 24px 80px rgba(34,22,16,0.07)` }}>
              <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text, letterSpacing: "-0.02em" }}>
                  Start Your Backend Project Today
                </h2>
                <p style={{ color: C.textMuted }}>Tell us your challenges, and we'll provide the engineering talent to solve them.</p>
              </motion.div>

              <form onSubmit={e => e.preventDefault()} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[{ key: "name", label: "Full Name", type: "text", ph: "John Doe", val: form.name }, { key: "email", label: "Work Email", type: "email", ph: "john@company.com", val: form.email }].map((field, fi) => (
                  <motion.div key={field.key} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.1 + 0.2 }}>
                    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, marginBottom: "0.5rem" }}>{field.label}</label>
                    <motion.input whileFocus={{ boxShadow: `0 0 0 2px ${C.primaryMid}`, outline: "none" }} type={field.type} placeholder={field.ph} value={field.val}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.875rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.9rem", transition: "box-shadow 0.2s" }} />
                  </motion.div>
                ))}

                <motion.div style={{ gridColumn: "1 / -1" }} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, marginBottom: "0.5rem" }}>Project Details</label>
                  <motion.textarea whileFocus={{ boxShadow: `0 0 0 2px ${C.primaryMid}`, outline: "none" }} rows={4} placeholder="Briefly describe your requirements…"
                    value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.875rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.9rem", resize: "none", transition: "box-shadow 0.2s" }} />
                </motion.div>

                {[{ key: "tech", label: "Tech Preference", opts: ["Node.js","Python / Django","Java / Spring","Go / Rust"], val: form.tech },
                  { key: "budget", label: "Budget Range", opts: ["$10k - $25k","$25k - $50k","$50k+"], val: form.budget }].map((sel, si) => (
                  <motion.div key={sel.key} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + si * 0.1 }}>
                    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, marginBottom: "0.5rem" }}>{sel.label}</label>
                    <select value={sel.val} onChange={e => setForm(f => ({ ...f, [sel.key]: e.target.value }))}
                      style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.875rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.9rem", appearance: "none", cursor: "pointer" }}>
                      {sel.opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </motion.div>
                ))}

                <motion.div style={{ gridColumn: "1 / -1", paddingTop: "0.5rem" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                  <MagBtn style={{ width: "100%", padding: "1.1rem", background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 8px 28px ${C.primaryShadow}` }}>
                    Hire Backend Developer
                  </MagBtn>
                </motion.div>
              </form>
            </motion.div>
          </Reveal>
        </section>

      </main>
    </>
  )
}