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
  primary: "#ec5b13",
  primaryLight: "rgba(236,91,19,0.08)",
  primaryMid: "rgba(236,91,19,0.16)",
  primaryShadow: "rgba(236,91,19,0.28)",
  primaryGlow: "rgba(236,91,19,0.12)",

  bg: "#f8f6f6",
  bgDark: "#221610",
  surface: "#ffffff",
  surfaceAlt: "#f2eeeb",
  surfaceCard: "#faf8f7",
  surfaceHigh: "#ede9e6",

  text: "#221610",
  textMid: "#5a4138",
  textMuted: "#a98a7f",
  textFaint: "#c4a898",

  border: "rgba(236,91,19,0.12)",
  borderMid: "rgba(236,91,19,0.22)",
  divider: "rgba(34,22,16,0.08)",

  tertiary: "#1b7fd4",
  secondary: "#ec5b13",
  error: "#d32f2f",
}

// ─── Animation presets ─────────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const
const sp = { type: "spring", stiffness: 180, damping: 20 } as const

const fadeUp: any = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.72, delay: i * 0.11, ease } }),
}

const scaleUp: any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] } }),
}
const slideRight: any = {
  hidden: { opacity: 0, x: -48 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.68, delay: i * 0.1, ease } }),
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-72px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} style={style}>
      {children}
    </motion.div>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagBtn({ children, style = {}, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  const x = useSpring(0, { stiffness: 270, damping: 28 })
  const y = useSpring(0, { stiffness: 270, damping: 28 })
  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.22)
    y.set((e.clientY - r.top - r.height / 2) * 0.22)
  }
  function onLeave() { x.set(0); y.set(0) }
  return (
    <motion.button style={{ x, y, cursor: "pointer", ...style }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }} onClick={onClick}>
      {children}
    </motion.button>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  useAnimationFrame(() => {
    if (!inView) return
    const cur = count.get()
    if (cur < to) {
      count.set(Math.min(cur + to / 55, to))
      if (ref.current) ref.current.textContent = Math.round(count.get()) + suffix
    }
  })
  return <span ref={ref}>0{suffix}</span>
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const bentoCards = [
  { icon: "bolt", title: "Fast Delivery", desc: "Rapid prototyping and agile delivery cycles ensuring your product hits the market at peak kinetic energy.", wide: true },
  { icon: "grid_view", title: "Pixel Perfect", desc: "Meticulous attention to detail translating high-fidelity designs into fluid, responsive interfaces.", wide: false },
  { icon: "speed", title: "Optimized", desc: "Lightweight bundles and optimized rendering paths for sub-second load times.", wide: false },
]

const techStack = [
  { icon: "deployed_code", label: "React", color: C.tertiary },
  { icon: "layers", label: "Vue.js", color: "#41b883" },
  { icon: "change_history", label: "Angular", color: C.error },
  { icon: "auto_awesome", label: "Next.js", color: C.text },
  { icon: "palette", label: "Tailwind", color: "#06b6d4" },
  { icon: "terminal", label: "TypeScript", color: C.tertiary },
  { icon: "html", label: "HTML5", color: C.primary },
  { icon: "css", label: "CSS3", color: "#2563eb" },
]

const processSteps = [
  { n: "01", title: "Discussion", desc: "Defining project scope and functional requirements." },
  { n: "02", title: "Planning", desc: "Architecture mapping and tech stack selection." },
  { n: "03", title: "Development", desc: "Agile coding with continuous integration loops." },
  { n: "04", title: "Testing", desc: "Rigorous unit and end-to-end quality assurance." },
  { n: "05", title: "Deployment", desc: "Global edge deployment and final production audit." },
]

const projects = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9X5ONcn-5Df2tBe6yWwb6s8NuGMkg3tHKL_v9eNfZXdXJAfIC5qcjf-iu4bMZcoMu9vrfxGZAwZ-E6zajBmXr7_Juf9aE-qJhEefHWMQ5ZX87iz_n2r9HBaOyEwwrkwZGU1kfxEeOIZ_EzQO8vbmxXCc8rh0b9UpqJYHepX7Gei4ojtcnGzJzl-O5O43MUH0e3_pVTmI4nsazZyfyDWpV-7MU1nFPMc9hDuB5vHMx59IDcBB_cxS5ymtWkifz_bSHt9Ncod8bdms",
    tag: "SaaS Platform", tagColor: C.primary, tagText: "#fff",
    title: "Nebula CRM Analytics", desc: "A high-performance dashboard featuring real-time WebSockets and complex data viz.",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjjkGQVYKFuKpCY__nrB7bVh_69bVISgrhZ3z-BUP34ukuiNVJR1WtKCJP87CiRgHT6Wy5cUY3oiye2HC0p5lXqsVEvNdy4LmZ3xyxQfG8CrmpkgKZewMJ_oHovbQ_geL2ncco8TvZTalcHtrFf3Q0XkzT5bo5-H0wJbOUQhtog6JZ5PsmHAQUPbhnUQRUFWd4KUy_EYcm1oIqDjUbYrrSrWn4QJUXh__YAXi_VpSg7vm6B859FvPf31cVeQSMo-MwAGH-VcES8MY",
    tag: "E-Commerce", tagColor: C.tertiary, tagText: "#fff",
    title: "Luxe Threads Store", desc: "Next.js powered headless commerce with sub-100ms transitions and cart logic.",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDweUNxjYPsTnF1MgPFS2Z3cXRezry0TQkmZo-CfyicYK84_Kmi8zcHZh7fO1BE4ux065QLa9BswQ1fx2NN5KRonHkfX0p4RuHVYJe4TJtmvkSbmRsmO-HZnpRRXaYUe2WOvtMuFKQA7PWEYDWcuFytoj2lngF4JmeFdoWL6GpRtYjoDn0amkDTEDKpkePN55RO_lli75HAB1zymg6NIt17Oy8k9bUUl2cZz_F5KRNbfFh0QzlWBB5OS23OxXx1cl5JisK2MrGc6Ts",
    tag: "AI Interface", tagColor: "#5c3d2c", tagText: "#ffdbce",
    title: "Gen-AI Playground", desc: "Complex prompt engineering interface with interactive node-based workflows.",
  },
]

const reviews = [
  { stars: 5, text: "The team delivered a React-based CRM 2 weeks ahead of schedule. Performance scores are consistently 95+ on Lighthouse.", author: "Sarah Jenkins, Product Head" },
  { stars: 5, text: "Their attention to UX micro-interactions is what sets them apart. Truly an elite frontend partner.", author: "David Wright, Startup Founder" },
]

const stats = [
  { val: 150, suffix: "+", label: "Projects Shipped" },
  { val: 98, suffix: "%", label: "Client Satisfaction" },
  { val: 5, suffix: "x", label: "Avg Performance Gain" },
  { val: 24, suffix: "/7", label: "Support Coverage" },
]

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function FrontendHirePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const heroFade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const [form, setForm] = useState({ name: "", email: "", details: "" })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .hl { font-family: 'Space Grotesk', sans-serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal;
          font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr;
          font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; user-select: none; vertical-align: middle;
        }
        ::selection { background: rgba(236,91,19,0.14); }
        a { text-decoration: none; color: inherit; }
        input, textarea { font-family: 'DM Sans', sans-serif; color: ${C.text}; }
        input::placeholder, textarea::placeholder { color: ${C.textFaint}; }

        /* dot grid */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(236,91,19,0.09) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* glass */
        .glass {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${C.border};
        }

        /* glow */
        .glow {
          filter: blur(80px);
          border-radius: 9999px;
          pointer-events: none;
          position: absolute;
        }

        /* shimmer */
        .shimmer { overflow: hidden; position: relative; }
        .shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.55) 50%, transparent 62%);
          transform: translateX(-110%);
        }
        .shimmer:hover::after { transform: translateX(200%); transition: transform 0.5s ease; }

        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(236,91,19,0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(236,91,19,0); }
        }
        .pulse-dot { animation: pulse-ring 2s ease-in-out infinite; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .float-slow { animation: float 6s ease-in-out infinite; }
      `}</style>

      <main style={{ background: C.bg, overflowX: "hidden" }}>

        {/* ══════════════════ HERO ══════════════════════════════════════════════ */}
        <section ref={heroRef}
          style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "6rem 3rem 5rem", overflow: "hidden", background: `linear-gradient(135deg, ${C.bg} 0%, #fff2ea 100%)` }}>

          <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />
          <div className="glow" style={{ top: "10%", right: "-5%", width: "560px", height: "560px", background: "rgba(236,91,19,0.12)", opacity: 0.8 }} />
          <div className="glow" style={{ bottom: "5%", left: "-8%", width: "400px", height: "400px", background: "rgba(27,127,212,0.08)", opacity: 0.6 }} />

          <motion.div style={{ opacity: heroFade, y: heroY, width: "100%", maxWidth: "88rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

              {/* Left */}
              <motion.div initial="hidden" animate="visible">
                <motion.div variants={fadeUp} custom={0}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 1rem", borderRadius: "9999px", background: C.primaryLight, border: `1px solid ${C.borderMid}`, marginBottom: "2rem" }}>
                  <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "9999px", background: C.primary, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: C.primary, textTransform: "uppercase", fontFamily: "Space Grotesk" }}>
                    Available for Hire
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} custom={1} className="hl"
                  style={{ fontSize: "clamp(3.2rem,6.5vw,5.2rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.75rem", color: C.text }}>
                  Hire Expert <br />
                  <em style={{ background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
                    Frontend
                  </em>{" "}Developers
                </motion.h1>

                <motion.p variants={fadeUp} custom={2}
                  style={{ fontSize: "1.1rem", color: C.textMid, fontWeight: 300, maxWidth: "34rem", lineHeight: 1.78, marginBottom: "2.75rem" }}>
                  Engineering kinetic web experiences with high-performance code and architectural precision. Build your next scalable UI today.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <MagBtn style={{ padding: "1rem 2.25rem", background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 10px 32px ${C.primaryShadow}` }}>
                    Hire Now
                  </MagBtn>
                  <MagBtn style={{ padding: "1rem 2.25rem", background: "rgba(255,255,255,0.72)", color: C.text, fontWeight: 700, borderRadius: "0.875rem", border: `1px solid ${C.border}`, fontFamily: "Space Grotesk", fontSize: "1rem", backdropFilter: "blur(12px)" }}>
                    View Portfolio
                  </MagBtn>
                </motion.div>
              </motion.div>

              {/* Right — rotating image card */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ duration: 0.9, delay: 0.35, ease }}
                style={{ position: "relative" }}
              >
                {/* decorative back plate */}
                <div style={{ position: "absolute", inset: "-0.5rem", borderRadius: "2.25rem", background: `linear-gradient(135deg, rgba(236,91,19,0.1), rgba(236,91,19,0.03))`, transform: "rotate(5deg)" }} />

                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  style={{ position: "relative", borderRadius: "2rem", overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 28px 72px rgba(34,22,16,0.14)` }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOhT9VAaUKjjSxykFwknQUboQH0UIxmRAKpav9P6GqlTcNLQuOOOFUvoFgaXDezNs6bTRJGV4nwrhcwzBhmuQKt5xHAqf6XCw9Qhy2EO7R13KH0dAP0VYoNmJBYvCbYoRv3AhY6w0jVWRJ6rLTBX4DnuSh0JKbz58avHfb8Jg1zfvkRXk-FcgdVcrp8gYre4CaRBQFgjcTGvCI4VMezMHLKN4jAKYbPso9foI_PoEiXj5_JIfHX72A6kkW2LypwP0qOaYogWZuCDY"
                    alt="Developer"
                    style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
                  />
                  {/* warm tint overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.35) 0%, transparent 50%)" }} />
                </motion.div>

                {/* floating stat badge */}
                <motion.div
                  className="float-slow glass"
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...sp, delay: 1 }}
                  style={{ position: "absolute", bottom: "-1.5rem", left: "-2rem", padding: "0.875rem 1.25rem", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", boxShadow: "0 8px 28px rgba(34,22,16,0.1)" }}
                >
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.borderMid}` }}>
                    <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "1.1rem" }}>bolt</span>
                  </div>
                  <div>
                    <p className="hl" style={{ fontWeight: 700, fontSize: "0.8rem", color: C.text }}>Sub-100ms Load</p>
                    <p style={{ fontSize: "0.7rem", color: C.textMuted }}>Lighthouse score 95+</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════ STATS STRIP ═══════════════════════════════════════ */}
        <section style={{ padding: "3rem 3rem", background: C.surface, borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}` }}>
          <Reveal>
            <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={scaleUp} custom={i}
                  whileHover={{ y: -4, boxShadow: `0 12px 36px ${C.primaryGlow}`, borderColor: C.borderMid }}
                  style={{ textAlign: "center", padding: "1.75rem", borderRadius: "1.25rem", background: C.surfaceAlt, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}>
                  <div className="hl" style={{ fontSize: "2.5rem", fontWeight: 800, color: C.primary, lineHeight: 1, marginBottom: "0.4rem" }}>
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: "0.78rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ BENTO GRID — WHY US ══════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surfaceAlt }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "4rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text, letterSpacing: "-0.02em" }}>
                Architectural Excellence
              </h2>
              <p style={{ color: C.textMuted, maxWidth: "32rem" }}>We don't just write code; we engineer digital foundations that scale with your vision.</p>
            </motion.div>

            {/* bento grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
              {bentoCards.map((card, i) => (
                <motion.div key={card.title} variants={scaleUp} custom={i}
                  className="shimmer"
                  whileHover={{ y: -5, borderColor: C.borderMid, boxShadow: `0 16px 48px ${C.primaryGlow}` }}
                  style={{ gridColumn: card.wide ? "1 / 3" : undefined, padding: "2rem", borderRadius: "1.75rem", background: C.surface, border: `1px solid ${C.border}`, transition: "border-color 0.3s, box-shadow 0.3s", cursor: "default" }}>
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", background: C.primaryLight, border: `1px solid ${C.borderMid}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "1.625rem" }}>{card.icon}</span>
                  </motion.div>
                  <h3 className="hl" style={{ fontSize: card.wide ? "1.4rem" : "1.15rem", fontWeight: 700, marginBottom: "0.75rem", color: C.text }}>{card.title}</h3>
                  <p style={{ color: C.textMid, fontSize: "0.9rem", lineHeight: 1.72 }}>{card.desc}</p>
                </motion.div>
              ))}

              {/* support wide card */}
              <motion.div variants={scaleUp} custom={3}
                style={{ gridColumn: "1 / 5", padding: "2.25rem", borderRadius: "1.75rem", background: C.primaryLight, border: `1px solid ${C.borderMid}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <h3 className="hl" style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: C.text }}>Dedicated Engineering Support</h3>
                  <p style={{ color: C.textMid, fontSize: "0.9rem", maxWidth: "36rem" }}>Round-the-clock maintenance and technical scaling support to keep your systems running at peak performance.</p>
                </div>
                <MagBtn style={{ padding: "0.875rem 2rem", background: C.primary, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", fontFamily: "Space Grotesk", fontSize: "0.9rem", boxShadow: `0 6px 20px ${C.primaryShadow}`, flexShrink: 0 }}>
                  Get Support
                </MagBtn>
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ TECH STACK ════════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surface }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "1rem", color: C.text, letterSpacing: "-0.02em" }}>
                The Stack of the Future
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                style={{ width: "5rem", height: "3px", background: C.primary, borderRadius: "99px", margin: "0 auto", transformOrigin: "center" }}
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: "1rem" }}>
              {techStack.map((tech, i) => (
                <motion.div key={tech.label} variants={scaleUp} custom={i * 0.7}
                  className="shimmer"
                  whileHover={{ y: -6, boxShadow: `0 14px 36px rgba(34,22,16,0.09)`, borderColor: tech.color }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5rem 1rem", borderRadius: "1.25rem", background: C.surfaceAlt, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}>
                  <motion.span className="material-symbols-outlined"
                    style={{ color: tech.color, fontSize: "2.25rem", display: "block", marginBottom: "0.6rem" }}
                    whileHover={{ scale: 1.2, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 260 }}>
                    {tech.icon}
                  </motion.span>
                  <span className="hl" style={{ fontWeight: 600, fontSize: "0.8rem", color: C.text }}>{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ PROCESS ═══════════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surfaceAlt, overflow: "hidden" }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.div variants={fadeUp} custom={0} style={{ textAlign: "right", marginBottom: "4rem" }}>
              <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.5rem", color: C.text, letterSpacing: "-0.02em" }}>
                Our Engineering Lifecycle
              </h2>
              <p style={{ color: C.textMuted }}>A streamlined, scientific approach to product delivery.</p>
            </motion.div>

            <div style={{ position: "relative" }}>
              {/* connector line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease }}
                style={{ position: "absolute", top: "2rem", left: "10%", right: "10%", height: "2px", background: `linear-gradient(90deg, ${C.primary}, rgba(236,91,19,0.2))`, opacity: 0.3, transformOrigin: "left", pointerEvents: "none" }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.5rem" }}>
                {processSteps.map((step, i) => (
                  <motion.div key={step.n} variants={fadeUp} custom={i * 0.9}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...sp, delay: i * 0.12 }}
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      style={{
                        width: "4rem", height: "4rem", borderRadius: "9999px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1rem",
                        marginBottom: "1.5rem",
                        ...(i === 4
                          ? { background: C.primary, color: "#fff", boxShadow: `0 0 24px ${C.primaryShadow}` }
                          : { background: C.surface, color: C.primary, border: `2px solid ${C.borderMid}`, boxShadow: "0 4px 16px rgba(34,22,16,0.07)" }),
                      }}>
                      {step.n}
                    </motion.div>
                    <h4 className="hl" style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem", color: C.text }}>{step.title}</h4>
                    <p style={{ fontSize: "0.8rem", color: C.textMuted, lineHeight: 1.55 }}>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ PORTFOLIO ═════════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem", background: C.surface }}>
          <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <motion.h2 variants={fadeUp} custom={0} className="hl"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "3.5rem", color: C.text, letterSpacing: "-0.02em" }}>
              The Digital Gallery
            </motion.h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
              {projects.map((proj, i) => (
                <motion.div key={proj.title} variants={scaleUp} custom={i}
                  whileHover={{ y: -6, boxShadow: `0 24px 64px rgba(34,22,16,0.10)` }}
                  style={{ borderRadius: "2rem", overflow: "hidden", background: C.surfaceAlt, border: `1px solid ${C.border}`, transition: "box-shadow 0.3s", cursor: "default" }}>
                  {/* image */}
                  <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                    <motion.img
                      src={proj.src} alt={proj.title}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* tag */}
                    <span style={{ position: "absolute", top: "1rem", left: "1rem", background: proj.tagColor, color: proj.tagText, fontSize: "0.6rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "99px", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Space Grotesk" }}>
                      {proj.tag}
                    </span>
                    {/* warm overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.25) 0%, transparent 50%)" }} />
                  </div>
                  {/* content */}
                  <div style={{ padding: "1.75rem" }}>
                    <h4 className="hl" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem", color: C.text }}>{proj.title}</h4>
                    <p style={{ color: C.textMid, fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{proj.desc}</p>
                    <motion.button
                      whileHover={{ gap: "0.875rem" }}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: C.primary, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "0.875rem", transition: "gap 0.2s" }}>
                      View Case Study
                      <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
                    </motion.button>
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

              {/* Left — feature quote */}
              <motion.div variants={slideRight} custom={0}>
                <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, marginBottom: "1.5rem", color: C.text, letterSpacing: "-0.02em" }}>
                  Voices of Innovation
                </h2>
                <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: C.textMid, lineHeight: 1.8, marginBottom: "2rem", borderLeft: `4px solid ${C.primary}`, paddingLeft: "1.25rem" }}>
                  "FrontEnd Labs transformed our messy legacy code into a cinematic interface that our users absolutely love. Their engineering rigour is unmatched."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <motion.div whileHover={{ scale: 1.08 }}
                    style={{ width: "3rem", height: "3rem", borderRadius: "9999px", overflow: "hidden", border: `2px solid ${C.borderMid}` }}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk1DrXyKAawYkxpybnwK03vVGF-WaVb37bmGCW9SIwyWTbbbYxmP9jKYa01oeMxCuPbnHJSUouaxMMgSu8Y4hiRvVqaQ7F8WLjUIxZfP_glT-pQWK8Kh_b5Xif3OXKPMwtQme_ObgGmtV85D4dghDZpLdD02CHZ2QE8uNHev7ifvQtB3ZRauBrqRa9rJuf_sgNaZISc2NQbA9bfkXVnT_nj_bYfDK1oyp37_G80JPneLuVvXkYX_iFEVpgXPt-Nq3MbPVJZkoxZpw"
                      alt="Marcus Chen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </motion.div>
                  <div>
                    <h5 className="hl" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Marcus Chen</h5>
                    <p style={{ fontSize: "0.75rem", color: C.textMuted }}>CTO, HyperStream</p>
                  </div>
                </div>
              </motion.div>

              {/* Right — review cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {reviews.map((rev, i) => (
                  <motion.div key={rev.author} variants={scaleUp} custom={i}
                    className="glass shimmer"
                    whileHover={{ y: -4, borderColor: C.borderMid, boxShadow: `0 16px 48px ${C.primaryGlow}` }}
                    style={{ padding: "1.75rem", borderRadius: "1.5rem", transition: "box-shadow 0.3s, border-color 0.3s", opacity: i === 1 ? 0.72 : 1 }}>
                    {/* stars */}
                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.875rem" }}>
                      {[...Array(rev.stars)].map((_, si) => (
                        <motion.span key={si} className="material-symbols-outlined"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + si * 0.07, type: "spring", stiffness: 220 }}
                          style={{ color: C.primary, fontSize: "0.9rem", fontVariationSettings: "'FILL' 1" }}>
                          star
                        </motion.span>
                      ))}
                    </div>
                    <p style={{ color: C.text, fontSize: "0.9rem", lineHeight: 1.72, marginBottom: "0.875rem" }}>"{rev.text}"</p>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.primary }}>— {rev.author}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════ CONTACT FORM ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 3rem" }}>
          <Reveal style={{ maxWidth: "52rem", margin: "0 auto" }}>
            <motion.div variants={scaleUp} custom={0}
              style={{ background: C.surfaceAlt, padding: "clamp(2.5rem,5vw,4rem)", borderRadius: "2.5rem", border: `1px solid ${C.border}`, boxShadow: `0 24px 80px rgba(34,22,16,0.08)`, position: "relative", overflow: "hidden" }}>

              {/* bg glow */}
              <div className="glow" style={{ top: "-30%", left: "-10%", width: "350px", height: "350px", background: "rgba(236,91,19,0.1)", opacity: 0.7 }} />

              <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "2.5rem", position: "relative" }}>
                <h2 className="hl" style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text, letterSpacing: "-0.02em" }}>
                  Start Your Project Today
                </h2>
                <p style={{ color: C.textMuted }}>Let's build the kinetic future of your application.</p>
              </motion.div>

              <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  {[
                    { key: "name", label: "Full Name", type: "text", ph: "John Doe", val: form.name },
                    { key: "email", label: "Work Email", type: "email", ph: "john@company.com", val: form.email },
                  ].map((field, i) => (
                    <motion.div key={field.key}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <motion.input
                        whileFocus={{ boxShadow: `0 0 0 2px ${C.primaryMid}`, outline: "none" }}
                        type={field.type}
                        placeholder={field.ph}
                        value={field.val}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.875rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.9rem", transition: "box-shadow 0.2s" }}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, marginBottom: "0.5rem" }}>
                    Project Details
                  </label>
                  <motion.textarea
                    whileFocus={{ boxShadow: `0 0 0 2px ${C.primaryMid}`, outline: "none" }}
                    rows={4}
                    placeholder="Describe your frontend needs..."
                    value={form.details}
                    onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.875rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.9rem", resize: "none", transition: "box-shadow 0.2s" }}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                  <MagBtn style={{ width: "100%", padding: "1.1rem", background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 8px 28px ${C.primaryShadow}` }}>
                    Hire Developer
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