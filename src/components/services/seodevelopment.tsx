// NeuralAmberSEO.tsx
// primary: #ec5b13 | background-light: #f8f6f6
// npm install framer-motion

import { useRef, useState, useEffect, FC, ReactNode } from "react"
import {
  motion, useInView, useScroll, useTransform, useSpring, Variants,
} from "framer-motion"

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:      "#ec5b13",
  primaryLight: "#ff8c5a",
  primaryLighter:"#ffb599",
  primaryFaint: "rgba(236,91,19,0.08)",
  primaryFaint2:"rgba(236,91,19,0.14)",
  bgLight:      "#f8f6f6",
  bg:           "#ffffff",
  bgCard:       "#ffffff",
  text:         "#1a0e08",
  muted:        "#7a5040",
  mutedLight:   "#b08070",
  border:       "rgba(236,91,19,0.12)",
  grad:         "linear-gradient(135deg,#ffb599 0%,#ec5b13 100%)",
  blue:         "#1b95f1",
} as const

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 38 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (i: number = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
interface RevealProps {
  children: ReactNode; variants?: Variants; custom?: number
  style?: React.CSSProperties; className?: string
}
const Reveal: FC<RevealProps> = ({ children, variants = fadeUp, custom = 0, style = {}, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter: FC<{ to: number; suffix?: string; prefix?: string }> = ({ to, suffix = "", prefix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      let cur = 0; const step = to / 60
      const t = setInterval(() => {
        cur += step
        if (cur >= to) { setVal(to); clearInterval(t) } else setVal(Math.floor(cur))
      }, 16)
      return () => clearInterval(t)
    }
  }, [inView, to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

// ─── Dot Grid ─────────────────────────────────────────────────────────────────
const DotGrid: FC<{ opacity?: number }> = ({ opacity = 0.045 }) => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(236,91,19,${opacity}) 1.5px, transparent 0)`,
    backgroundSize: "36px 36px",
  }} />
)

// ─── GradText ─────────────────────────────────────────────────────────────────
const GradText: FC<{ children: ReactNode; animate?: boolean }> = ({ children, animate: anim }) => (
  <motion.span
    {...(anim ? {
      animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
      transition: { duration: 5, repeat: Infinity, ease: "linear" as const },
    } : {})}
    style={{
      background: `linear-gradient(90deg,${T.primary},${T.primaryLight},${T.primary})`,
      backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>{children}</motion.span>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════════════════════════════════════
const Hero: FC = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={ref} style={{
      position: "relative", paddingTop: 100, paddingBottom: 96,
      background: T.bgLight, overflow: "hidden",
    }}>
      <DotGrid />
      <motion.div style={{ y: bY, position: "absolute", top: "-12%", right: "-8%", width: "48%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(236,91,19,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />
      <motion.div style={{ y: bY, position: "absolute", bottom: "-10%", left: "-6%", width: "38%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,149,241,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 2 }} className="seo-hero-grid">
        {/* Left */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: T.primaryFaint2, border: `1px solid rgba(236,91,19,0.22)`, marginBottom: 24, width: "fit-content" }}>
            <motion.span animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: T.primary, display: "block", boxShadow: `0 0 8px ${T.primary}` }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.primary, letterSpacing: "0.13em", textTransform: "uppercase" }}>Next-Gen SEO Engine</span>
          </motion.div>

          <motion.div style={{ marginBottom: 24, overflow: "hidden" }}>
            {["Grow Your Business", "with Powerful", "SEO Strategies"].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div variants={fadeUp} custom={i + 1} initial="hidden" animate="visible"
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,4.5vw,3.8rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                  {i === 1
                    ? <><span style={{ color: T.text }}>with </span><GradText animate>Powerful</GradText></>
                    : <span style={{ color: i === 2 ? T.text : T.text }}>{line}</span>}
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} custom={4} initial="hidden" animate="visible"
            style={{ color: T.muted, fontSize: 17, maxWidth: 480, marginBottom: 36, lineHeight: 1.82, fontWeight: 300 }}>
            Harness the power of neural-optimized organic growth. We combine deep technical expertise with AI-driven content insights to dominate search rankings.
          </motion.p>

          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(236,91,19,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: T.grad, color: "#370e00", padding: "16px 30px", borderRadius: 14, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(236,91,19,0.28)" }}>
              Get Free SEO Audit
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, borderColor: T.primary, color: T.primary }} whileTap={{ scale: 0.97 }}
              style={{ background: "transparent", color: T.muted, padding: "16px 30px", borderRadius: 14, fontWeight: 600, fontSize: 15, border: `1.5px solid rgba(236,91,19,0.22)`, cursor: "pointer", transition: "border-color 0.25s,color 0.25s" }}>
              Start SEO Campaign
            </motion.button>
          </motion.div>
        </div>

        {/* Right */}
        <Reveal variants={scaleIn} custom={0} className="seo-hero-right">
          <div style={{ position: "relative" }}>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }}
              style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `radial-gradient(circle,rgba(236,91,19,0.1) 0%,transparent 70%)`, filter: "blur(28px)", pointerEvents: "none" }} />
            <motion.div style={{ y: imgY, borderRadius: 28, overflow: "hidden", border: `1.5px solid rgba(236,91,19,0.14)`, boxShadow: "0 28px 72px rgba(236,91,19,0.1),0 4px 20px rgba(0,0,0,0.05)", position: "relative" }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6tqigibvcW6l5uwoePd9Y-nt8pkLnx22uUqu_6wK3ifV4Gz-8rO3kYIqquDxYGHva3KudosdJChin2NVixjwUtTI1Cjxa99WhGedJafcTNvCvVfuiE3ExdJVP0kP_bO3fz1AOCA6hD77KOozjzxE-N6WCpwQeHvCCwOhxBNSm0sAs24IZfcbIHn5LoMrZ-rsv5QX83rwEiZMXIc_5ku63hp6mD4yGv87Kx20dlhl4AVmoSQWhfm7bC0aVH0-K2oTpSSNGHRmg"
                alt="SEO Dashboard" style={{ width: "100%", display: "block", opacity: 0.88 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(248,246,246,0.5) 0%,transparent 50%)" }} />
              {/* Floating stat chip */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255,255,255,0.93)", backdropFilter: "blur(16px)", border: `1px solid rgba(236,91,19,0.2)`, borderRadius: 14, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "block", flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 1 }}>Organic Traffic +142%</p>
                  <p style={{ fontSize: 10, color: T.muted }}>Last 12 months</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SERVICES GRID
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  { icon: "settings_suggest", title: "Technical SEO", desc: "Fixing crawlability, site speed, and indexation issues at the architecture level." },
  { icon: "description", title: "On-Page SEO", desc: "Optimizing titles, headers, and meta data for maximum relevance." },
  { icon: "lan", title: "Off-Page SEO", desc: "Strategic external signals that build your site's authority and trust." },
  { icon: "troubleshoot", title: "Keyword Research", desc: "Finding high-intent search terms that your competitors missed." },
  { icon: "edit_note", title: "Content Optimization", desc: "Crafting high-value content that answers user intent perfectly." },
  { icon: "link", title: "Link Building", desc: "High-quality backlink acquisition through ethical outreach." },
  { icon: "distance", title: "Local SEO", desc: "Dominating the 'near me' searches and Google Map Pack." },
  { icon: "shopping_cart", title: "E-commerce SEO", desc: "Driving targeted traffic to product pages and collections." },
]

const Services: FC = () => (
  <section style={{ padding: "96px 0", background: T.bg }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: T.text, marginBottom: 14, letterSpacing: "-0.02em" }}>Precision SEO Ecosystem</h2>
            <p style={{ color: T.muted, lineHeight: 1.75, fontSize: 15 }}>Everything you need to dominate the SERPs, from core technical foundations to aggressive link building strategies.</p>
          </div>
          <motion.div whileHover={{ x: 6 }} style={{ display: "flex", alignItems: "center", gap: 6, color: T.primary, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            View All Services
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </motion.div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="seo-svc-grid">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} variants={fadeUp} custom={i % 4}>
            <motion.div whileHover={{ y: -7, boxShadow: `0 20px 48px rgba(236,91,19,0.1)`, borderColor: "rgba(236,91,19,0.3)" }}
              style={{ background: T.bgCard, borderRadius: 24, padding: "32px 28px", border: `1.5px solid rgba(236,91,19,0.1)`, height: "100%", boxSizing: "border-box", cursor: "default", transition: "border-color 0.3s" }}>
              <motion.span whileHover={{ scale: 1.15, color: T.primaryLight }}
                className="material-symbols-outlined"
                style={{ fontSize: 36, color: T.primary, display: "block", marginBottom: 18 }}>{s.icon}</motion.span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: T.text, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.72 }}>{s.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 3. PROCESS TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  { n: "1", label: "Website Audit", desc: "Deep diagnostic dive into your current standing." },
  { n: "2", label: "Keyword Research", desc: "Data-driven mapping of your search landscape." },
  { n: "3", label: "Optimization", desc: "Deploying structural and content upgrades." },
  { n: "4", label: "Link Building", desc: "Accelerating authority through backlinks." },
  { n: "5", label: "Tracking", desc: "Continuous monitoring and recalibration." },
]

const ProcessSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] })
  const rawLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineW = useSpring(rawLine as any, { stiffness: 60, damping: 20 })

  return (
    <section style={{ padding: "96px 0", background: T.bgLight, position: "relative", overflow: "hidden" }}>
      <DotGrid />
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: T.text, textAlign: "center", marginBottom: 80, letterSpacing: "-0.02em" }}>
            The Kinetic <GradText>Methodology</GradText>
          </h2>
        </Reveal>

        {/* Line container */}
        <div style={{ position: "relative" }}>
          {/* BG line */}
          <div style={{ position: "absolute", top: 36, left: 0, right: 0, height: 1, background: "rgba(236,91,19,0.12)", zIndex: 0 }} className="seo-proc-line" />
          {/* Animated fill */}
          <motion.div style={{ position: "absolute", top: 35, left: 0, width: lineW as any, height: 2, background: T.grad, borderRadius: 2, zIndex: 1, transformOrigin: "left" }} className="seo-proc-line" />

          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 2 }} className="seo-proc-steps">
            {PROCESS_STEPS.map((step, i) => {
              const stepRef = useRef<HTMLDivElement>(null)
              const stepInView = useInView(stepRef, { once: true, margin: "-40px" })
              return (
                <motion.div key={step.n} ref={stepRef}
                  initial={{ opacity: 0, y: 32 }} animate={stepInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  {/* Node */}
                  <motion.div whileHover={{ scale: 1.12, background: T.grad, color: "#370e00" }}
                    style={{ width: 72, height: 72, borderRadius: 20, background: i === 0 ? T.grad : T.bg, color: i === 0 ? "#370e00" : T.primary, border: i === 0 ? "none" : `2px solid rgba(236,91,19,0.22)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 18, boxShadow: i === 0 ? "0 10px 28px rgba(236,91,19,0.32)" : "0 4px 16px rgba(0,0,0,0.05)", transition: "background 0.3s,color 0.3s" }}>
                    {step.n}
                  </motion.div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 6 }}>{step.label}</h4>
                  <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. TOOLS
// ═══════════════════════════════════════════════════════════════════════════════
const TOOLS = [
  { icon: "query_stats", name: "Google Analytics" },
  { icon: "search_insights", name: "Search Console" },
  { icon: "monitoring", name: "Ahrefs" },
  { icon: "bar_chart_4_bars", name: "SEMrush" },
  { icon: "bug_report", name: "Screaming Frog" },
  { icon: "star", name: "Moz Pro" },
]

const Tools: FC = () => (
  <section style={{ padding: "72px 0", background: T.bg, overflow: "hidden" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.primary, marginBottom: 8 }}>Our Arsenal</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: T.text, letterSpacing: "-0.02em" }}>Industry-Leading Tools</h2>
        </div>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {TOOLS.map((t, i) => (
          <Reveal key={t.name} variants={scaleIn} custom={i}>
            <motion.div whileHover={{ y: -6, borderColor: "rgba(236,91,19,0.4)", boxShadow: "0 16px 32px rgba(236,91,19,0.1)", background: T.primaryFaint }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 28px", background: T.bgLight, border: `1.5px solid rgba(236,91,19,0.12)`, borderRadius: 20, cursor: "default", transition: "border-color 0.3s,background 0.3s" }}>
              <motion.span whileHover={{ scale: 1.2, rotate: 8 }}
                className="material-symbols-outlined" style={{ color: T.blue, fontSize: 22 }}>{t.icon}</motion.span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: T.text }}>{t.name}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 5. WHY US
// ═══════════════════════════════════════════════════════════════════════════════
const WHY = [
  { icon: "data_exploration", title: "Data-Driven Strategies", desc: "Every recommendation is backed by cold, hard data from multiple analytical sources." },
  { icon: "verified", title: "Proven Methods", desc: "We only use white-hat, sustainable SEO practices that keep you safe from penalties." },
  { icon: "psychology", title: "Competitor Analysis", desc: "Reverse-engineering your competition's successes to find your strategic edge." },
  { icon: "auto_graph", title: "Transparent Reporting", desc: "Clear, real-time dashboards so you always know exactly where your ROI stands." },
]

const WhyUs: FC = () => (
  <section style={{ padding: "96px 0", background: T.bgLight }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }} className="seo-why-grid">
      {/* Left */}
      <Reveal variants={fadeLeft}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", color: T.text, lineHeight: 1.12, marginBottom: 18, letterSpacing: "-0.025em" }}>
            Why Neural Amber Leads the Market
          </h2>
          <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>We don't just guess. We use predictive modeling to identify future search trends before they hit peak volume.</p>

          {/* Stat card */}
          <motion.div whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(236,91,19,0.3)" }}
            style={{ background: T.grad, borderRadius: 28, padding: "36px 32px", boxShadow: "0 8px 28px rgba(236,91,19,0.25)" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "3.5rem", color: "#370e00", marginBottom: 8, lineHeight: 1 }}>
              <Counter to={142} suffix="%" />
            </div>
            <p style={{ color: "rgba(55,14,0,0.72)", fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}>Average increase in organic traffic for our clients in 2023.</p>
          </motion.div>
        </div>
      </Reveal>

      {/* Right grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {WHY.map((w, i) => (
          <Reveal key={w.title} variants={fadeUp} custom={i}>
            <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(236,91,19,0.09)" }}
              style={{ background: T.bg, borderRadius: 24, padding: "32px 28px", border: `1.5px solid rgba(236,91,19,0.1)`, height: "100%", boxSizing: "border-box" }}>
              <motion.span whileHover={{ scale: 1.15 }}
                className="material-symbols-outlined" style={{ fontSize: 34, color: T.primary, display: "block", marginBottom: 16 }}>{w.icon}</motion.span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: T.text, marginBottom: 10 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.75 }}>{w.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 6. RESULTS BENTO
// ═══════════════════════════════════════════════════════════════════════════════
const Results: FC = () => (
  <section style={{ padding: "96px 0", background: T.bg }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
      <Reveal>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: T.text, textAlign: "center", marginBottom: 64, letterSpacing: "-0.02em" }}>
          Quantifiable <GradText animate>Impact</GradText>
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridTemplateRows: "1fr 1fr", gap: 20, minHeight: 480 }} className="seo-bento-grid">
        {/* Tall left */}
        <Reveal variants={scaleIn} custom={0} style={{ gridRow: "1 / 3" }}>
          <motion.div whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(236,91,19,0.1)" }}
            style={{ background: T.bgLight, borderRadius: 28, padding: 36, border: `1.5px solid rgba(236,91,19,0.1)`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>SaaS Expansion</span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: T.text, marginBottom: 10 }}>SaaS Expansion</h3>
              <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.72 }}>Increased conversion rate by 64% through optimized landing page SEO.</p>
            </div>
            <div style={{ marginTop: 24, borderRadius: 18, overflow: "hidden" }}>
              <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoY3-PHN6mji2iCcBw1NH0_BnLO9hpLm3X1402Xn2DeORp8cW_7rNmG502LhxtCfQTqPyTs6jNOB_ZEUG7DQTWmRF8Zhe6EHQ7H9Vww1eTPhl4Khz_NDaS-kkP1QNQedeGfa2116GmVCuFi4MIEele49c6PNEVgz6J7TfNN9K0rOAQHDjEzYmhwMMZF7RWnPHehKbiiAXiGSKvj9AJYws4t6RXyxBGS5WKPQnJ7P6ioakykktk4NtfhQ6W-QtN54NsCJAGzc8VAL8"
                alt="Growth chart" style={{ width: "100%", display: "block" }} />
            </div>
            {/* Stat overlay */}
            <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderRadius: 12, padding: "8px 14px", border: `1px solid rgba(236,91,19,0.18)` }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 18, color: T.primary }}>+64%</span>
              <span style={{ fontSize: 11, color: T.muted, marginLeft: 6 }}>Conversions</span>
            </div>
          </motion.div>
        </Reveal>

        {/* Top right */}
        <Reveal variants={fadeUp} custom={1}>
          <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(236,91,19,0.09)" }}
            style={{ background: T.bgLight, borderRadius: 28, padding: "32px 36px", border: `1.5px solid rgba(236,91,19,0.1)`, display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>E-commerce</span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: T.text, marginBottom: 8 }}>E-commerce Dominance</h3>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.72 }}>Scaled a fashion brand from 2k to 80k monthly organic visitors in 8 months.</p>
            </div>
            <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="material-symbols-outlined" style={{ fontSize: 72, color: `rgba(236,91,19,0.12)`, fontVariationSettings: "'FILL' 1", flexShrink: 0 }}>trending_up</motion.span>
          </motion.div>
        </Reveal>

        {/* Bottom right — 2 cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { tag: "Local", title: "Local Growth", desc: "Top 3 Map Pack rankings for 12 competitive medical keywords.", stat: "#1", label: "Map Pack" },
            { tag: "B2B", title: "B2B Authority", desc: "Established domain authority of 72 within one year of content strategy.", stat: "72", label: "DA Score" },
          ].map((c, i) => (
            <Reveal key={c.title} variants={fadeUp} custom={i + 2}>
              <motion.div whileHover={{ y: -5, boxShadow: "0 16px 36px rgba(236,91,19,0.09)" }}
                style={{ background: T.bgLight, borderRadius: 28, padding: "28px 24px", border: `1.5px solid rgba(236,91,19,0.1)`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.primary, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: T.text, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>{c.desc}</p>
                </div>
                <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "2rem", color: T.primary }}>{c.stat}</span>
                  <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{c.label}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 7. INDUSTRIES
// ═══════════════════════════════════════════════════════════════════════════════
const INDUSTRIES = [
  { icon: "shopping_bag", label: "E-commerce" }, { icon: "cloud_done", label: "SaaS" },
  { icon: "medical_services", label: "Healthcare" }, { icon: "account_balance", label: "Finance" },
  { icon: "location_city", label: "Real Estate" }, { icon: "school", label: "Education" }, { icon: "flight_takeoff", label: "Travel" },
]

const Industries: FC = () => (
  <section style={{ padding: "72px 0", background: T.bgLight }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
      <Reveal>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: T.text, marginBottom: 52, letterSpacing: "-0.02em" }}>Sector Expertise</h2>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.label} variants={scaleIn} custom={i}>
            <motion.div whileHover={{ y: -7, background: T.primaryFaint2, borderColor: "rgba(236,91,19,0.35)" }}
              style={{ padding: "20px 24px", background: T.bg, border: `1.5px solid rgba(236,91,19,0.1)`, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "default", transition: "background 0.3s,border-color 0.3s", minWidth: 110 }}>
              <motion.span whileHover={{ scale: 1.2, rotate: 8 }}
                className="material-symbols-outlined" style={{ color: T.primary, fontSize: 28 }}>{ind.icon}</motion.span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{ind.label}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 8. NEWSLETTER CTA
// ═══════════════════════════════════════════════════════════════════════════════
const Newsletter: FC = () => (
  <section style={{ padding: "72px 24px", background: T.bg }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Reveal variants={scaleIn}>
        <motion.div whileHover={{ boxShadow: "0 40px 100px rgba(236,91,19,0.22)" }}
          style={{ background: T.grad, borderRadius: 44, padding: "64px 56px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 24px 64px rgba(236,91,19,0.28)" }}>
          <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.24, 0.12] }} transition={{ duration: 5, repeat: Infinity }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", aspectRatio: "1", borderRadius: "50%", background: "rgba(255,255,255,0.15)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#370e00", marginBottom: 14, letterSpacing: "-0.025em" }}>Subscribe to our Newsletter</h2>
            <p style={{ color: "rgba(55,14,0,0.7)", fontSize: 15, marginBottom: 40, lineHeight: 1.75 }}>Get the latest SEO insights and digital trends delivered to your inbox.</p>
            <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="Enter your email"
                style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 14, padding: "14px 18px", color: "#370e00", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                onFocus={e => { (e.target as HTMLInputElement).style.background = "rgba(255,255,255,0.35)" }}
                onBlur={e => { (e.target as HTMLInputElement).style.background = "rgba(255,255,255,0.25)" }} />
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.97 }}
                style={{ background: "#fff", color: T.primary, padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </div>
  </section>
)

// ═══════════════════════════════════════════════════════════════════════════════
// 9. CONTACT FORM
// ═══════════════════════════════════════════════════════════════════════════════
const ContactForm: FC = () => {
  const iS: React.CSSProperties = {
    width: "100%", background: T.bgLight, border: `1.5px solid rgba(236,91,19,0.14)`,
    borderRadius: 14, padding: "14px 18px", color: T.text, fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(236,91,19,0.5)"
    e.target.style.boxShadow = "0 0 0 3px rgba(236,91,19,0.08)"
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(236,91,19,0.14)"
    e.target.style.boxShadow = "none"
  }

  return (
    <section style={{ padding: "96px 0", background: T.bgLight }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: T.text, marginBottom: 14, letterSpacing: "-0.025em" }}>Let's Rank Your Brand</h2>
            <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.7 }}>Fill out the form and our SEO strategists will be in touch within 24 hours.</p>
          </div>
        </Reveal>

        <Reveal variants={scaleIn}>
          <motion.div whileHover={{ boxShadow: "0 24px 64px rgba(236,91,19,0.08)" }}
            style={{ background: T.bg, borderRadius: 36, padding: "48px 44px", boxShadow: "0 8px 32px rgba(236,91,19,0.06)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="seo-form-grid">
              {[["Full Name", "text"], ["Business Email", "email"], ["Website URL", "url"]].map(([label, type]) => (
                <div key={label}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: "0.04em" }}>{label}</label>
                  <input type={type} style={iS} onFocus={focus} onBlur={blur} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: "0.04em" }}>Monthly SEO Budget</label>
                <select style={iS} onFocus={focus} onBlur={blur}>
                  {["$1,000 - $3,000", "$3,000 - $10,000", "$10,000+"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: "0.04em" }}>SEO Goals</label>
                <textarea rows={4} placeholder="What are you looking to achieve?"
                  style={{ ...iS, resize: "vertical" }} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <motion.button whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(236,91,19,0.4)" }} whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", background: T.grad, color: "#370e00", padding: "18px", borderRadius: 16, fontWeight: 700, fontSize: 17, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(236,91,19,0.25)" }}>
                  Send Consultation Request
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SeoDevelopment() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #f8f6f6; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 1024px) {
          .seo-hero-grid, .seo-why-grid { grid-template-columns: 1fr !important; }
          .seo-hero-right { display: none !important; }
          .seo-svc-grid { grid-template-columns: repeat(2,1fr) !important; }
          .seo-bento-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .seo-proc-line { display: none !important; }
        }
        @media (max-width: 640px) {
          .seo-svc-grid { grid-template-columns: 1fr !important; }
          .seo-proc-steps { flex-direction: column !important; align-items: center !important; }
          .seo-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bgLight, color: T.text, overflowX: "hidden" }}>
        <Hero />
        <Services />
        <ProcessSection />
        <Tools />
        <WhyUs />
        <Results />
        <Industries />
        <Newsletter />
        <ContactForm />
      </div>
    </>
  )
}