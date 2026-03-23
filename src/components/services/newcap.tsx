// TechCurate.jsx
// npm install framer-motion
// Fonts: Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:        "#ec5b13",
  primaryDark:    "#c44a0a",
  primaryLight:   "#ff7a3d",
  primaryGlow:    "rgba(236,91,19,0.15)",
  primaryGlowSm:  "rgba(236,91,19,0.08)",
  bg:             "#f8f6f6",
  bgCard:         "#ffffff",
  bgMuted:        "#f2efef",
  bgDeep:         "#ede9e9",
  bgDark:         "#1b1b1d",
  text:           "#1b1b1d",
  textMuted:      "#6b6560",
  textLight:      "#9e9792",
  border:         "rgba(0,0,0,0.07)",
  borderOrange:   "rgba(236,91,19,0.25)",
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } }),
}
const fadeLeft:any = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}
const fadeRight:any = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

function useViewAnim() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin:'-60px' })
  return { ref, inView }
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 })
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200,
      background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`,
      scaleX, transformOrigin: "left",
    }} />
  )
}

// ─── Cursor Glow ───────────────────────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-400); const y = useMotionValue(-400)
  const sx = useSpring(x, { damping: 22, stiffness: 140 })
  const sy = useSpring(y, { damping: 22, stiffness: 140 })
  useEffect(() => {
    const fn = (e:any) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("mousemove", fn)
    return () => window.removeEventListener("mousemove", fn)
  }, [])
  return (
    <motion.div style={{
      position: "fixed", zIndex: 9999, pointerEvents: "none",
      width: 360, height: 360, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(236,91,19,0.05) 0%, transparent 70%)",
      left: sx, top: sy, translateX: "-50%", translateY: "-50%",
    }} />
  )
}

// ─── Material Icon ─────────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color, style = {} }:any) => (
  <span className="material-symbols-outlined" style={{ fontSize: size, color, lineHeight: 1, ...style }}>{name}</span>
)

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: scrolled ? "rgba(248,246,246,0.94)" : "rgba(248,246,246,0.75)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, border 0.3s",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <motion.div whileHover={{ scale: 1.03 }} style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: "-0.05em", color: C.text, cursor: "pointer" }}>
          Tech<span style={{ color: C.primary }}>Curate</span>
        </motion.div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {["Services", "Solutions", "Case Studies", "About"].map((l, i) => (
            <motion.a
              key={l} href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.1 }}
              whileHover={{ color: C.primary }}
              style={{ fontSize: 14, fontWeight: 600, color: i === 0 ? C.primary : C.textMuted, textDecoration: "none", transition: "color 0.2s", fontFamily: "'DM Sans',sans-serif" }}
            >
              {l}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${C.primaryGlow}` }}
          whileTap={{ scale: 0.95 }}
          style={{ padding: "10px 24px", background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: `0 4px 14px ${C.primaryGlow}` }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 500], [0, -70])
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0.25])

  // Animated counter
  const [count, setCount] = useState(0)
  useEffect(() => {
    let n = 0; const t = setInterval(() => { n += 3; if (n >= 99) { setCount(99); clearInterval(t) } else setCount(n) }, 18)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 28px", paddingTop: 80, overflow: "hidden", background: C.bg }}>
      {/* BG grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: `linear-gradient(${C.primary} 1px,transparent 1px),linear-gradient(90deg,${C.primary} 1px,transparent 1px)`, backgroundSize: "56px 56px" }} />
      {/* Glow orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", right: "8%", top: "15%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${C.primaryGlow}, transparent 65%)`, filter: "blur(20px)", pointerEvents: "none" }}
      />

      <motion.div style={{ y: yParallax, opacity: opacityParallax, maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", zIndex: 1 }}>
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: `rgba(236,91,19,0.1)`, border: `1px solid ${C.borderOrange}`, marginBottom: 24 }}>
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: C.primary, display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: C.primary, fontFamily: "'Syne',sans-serif" }}>Enterprise Infrastructure</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0, color: C.text, marginBottom: 24 }}
          >
            Cloud Infrastructure{" "}
            <span style={{ color: C.primary, position: "relative", display: "inline-block" }}>
              Solutions
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", bottom: 2, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${C.primary},transparent)`, transformOrigin: "left", borderRadius: 4 }} />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ fontSize: 18, color: C.textMuted, lineHeight: 1.72, maxWidth: 480, marginBottom: 36, fontFamily: "'DM Sans',sans-serif" }}>
            Scale your digital ecosystem with high-performance, resilient cloud architectures designed for the modern enterprise.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: `0 16px 40px ${C.primaryGlow}` }} whileTap={{ scale: 0.96 }}
              style={{ padding: "15px 32px", background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: `0 6px 20px ${C.primaryGlow}` }}>
              Start Your Project
            </motion.button>
            <motion.button whileHover={{ background: `rgba(236,91,19,0.07)` }} whileTap={{ scale: 0.97 }}
              style={{ padding: "15px 28px", background: "transparent", borderRadius: 12, color: C.primary, fontWeight: 700, fontSize: 15, border: `1.5px solid ${C.borderOrange}`, cursor: "pointer", fontFamily: "'Syne',sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}>
              <Icon name="play_circle" size={20} color={C.primary} />
              View Methodology
            </motion.button>
          </motion.div>

          {/* Live counter strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[{ val: `${count}%`, label: "Uptime SLA" }, { val: "450%", label: "Faster Deploy" }, { val: "60%", label: "Latency Drop" }].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>{val}</div>
                <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: hero image */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: -24, background: `rgba(236,91,19,0.07)`, filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
          <motion.div whileHover={{ y: -8, boxShadow: `0 40px 80px rgba(0,0,0,0.12)` }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", background: C.bgCard, padding: 28, borderRadius: 28, boxShadow: `0 20px 60px rgba(0,0,0,0.08)`, border: `1px solid ${C.border}`, aspectRatio: "1/1", width: "100%", maxWidth: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Orange corner accent */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 100, height: 100, background: `linear-gradient(135deg,${C.primaryGlow},transparent)`, borderRadius: "28px 0 0 0", pointerEvents: "none" }} />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5BpsQADCuPJENGUOee1vGxATlAxK1La_h3x-CpPprU-ozpL3XeIFj519PoWkbHttapjk3TIgmj6if0zm9q5O8uULp_3DfdcCiBZPwvM8Z5YoSAN6IsUPDsIOp4OEdvVzU94B51CXZY7tEoozLRma5l_fDTCiwYuGKQ-9eegwzg9hsFhcJrn7rBCz8EgBu2Syw6Nb_WvX7rLX4s8bjdgwDGBTZaAU0j69Udt2ry5xTPWKd6V24nzSYYsQ3f5K6NXuvGeSiroidjCg"
              alt="Cloud infra illustration" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 16, position: "relative", zIndex: 1 }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Overview ──────────────────────────────────────────────────────────────────
function Overview() {
  const { ref: refL, inView: inL } = useViewAnim()
  const { ref: refR, inView: inR } = useViewAnim()
  return (
    <section style={{ background: C.bgMuted, padding: "96px 28px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h2 ref={refL} variants={fadeUp} initial="hidden" animate={inL ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 44 }}>
          Systematic <span style={{ color: C.primary }}>Excellence</span>
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {[
            "At TechCurate, we view infrastructure not just as servers, but as the central nervous system of your digital business. Our approach merges architectural precision with the agility of modern DevOps, ensuring your platform is always performant, secure, and ready to scale at a moment's notice.",
            "We leverage the industry's most robust cloud providers to create customized ecosystems that reduce latency and operational overhead. By automating the complex, we empower your internal teams to focus on innovation while we handle the foundation.",
          ].map((txt, i) => (
            <motion.p key={i}
              ref={i === 0 ? refL : refR}
              variants={i === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              animate={i === 0 ? (inL ? "show" : "hidden") : (inR ? "show" : "hidden")}
              style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.78, fontFamily: "'DM Sans',sans-serif" }}>
              {txt}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────────
const serviceCards = [
  { icon: "cloud_sync", title: "Multi-Cloud Strategy", desc: "Strategic deployment across AWS, Azure, and GCP to eliminate vendor lock-in and optimize costs." },
  { icon: "security",   title: "Zero-Trust Security",  desc: "Implementing robust identity management and micro-segmentation at every architectural layer." },
  { icon: "speed",      title: "Performance Audit",    desc: "Real-time bottleneck identification and automated scaling configuration for peak traffic handling." },
]

function Services() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 28px", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>Our Offerings</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text }}>Holistic Service Portfolio</h3>
          <motion.div style={{ width: 48, height: 3, background: C.primary, borderRadius: 3, margin: "14px auto 0" }} />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {serviceCards.map((c, i) => (
            <motion.div key={c.title}
              variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.12}
              whileHover={{ y: -6, boxShadow: `0 20px 50px rgba(0,0,0,0.08), 0 0 0 1.5px ${C.borderOrange}` }}
              style={{ background: C.bgCard, padding: 32, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "box-shadow 0.3s", cursor: "default", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${C.primaryGlowSm},transparent)`, opacity: 0, transition: "opacity 0.3s", pointerEvents: "none" }} className="hover-overlay" />
              <motion.div whileHover={{ scale: 1.1 }}
                style={{ width: 48, height: 48, background: `rgba(236,91,19,0.1)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "transform 0.3s" }}>
                <Icon name={c.icon} size={24} color={C.primary} />
              </motion.div>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 10 }}>{c.title}</h4>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>{c.desc}</p>
              <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.primary},transparent)`, scaleX: 0, transformOrigin: "left" }}
                whileHover={{ scaleX: 1 }} transition={{ duration: 0.35 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features Bento Grid ────────────────────────────────────────────────────────
function Features() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 28px", background: C.bgMuted }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.h3 variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, textAlign: "center", marginBottom: 48 }}>
          Built for <span style={{ color: C.primary }}>Resilience</span>
        </motion.h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "auto auto", gap: 16, minHeight: 520 }}>
          {/* IaC — large */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0}
            whileHover={{ boxShadow: `0 20px 50px rgba(0,0,0,0.1)` }}
            style={{ gridColumn: "span 2", gridRow: "span 2", background: C.bgCard, borderRadius: 24, padding: 40, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: `radial-gradient(circle,${C.primaryGlow},transparent 70%)`, pointerEvents: "none" }} />
            <motion.div whileHover={{ rotate: 8, scale: 1.1 }} style={{ marginBottom: 20 }}>
              <Icon name="terminal" size={44} color={C.primary} />
            </motion.div>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>Infrastructure as Code</h4>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>Version-controlled infrastructure using Terraform and Ansible, allowing for reproducible and disaster-proof environments.</p>
          </motion.div>
          {/* Auto resilience */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.1}
            whileHover={{ y: -4 }}
            style={{ gridColumn: "span 2", background: C.bgDeep, borderRadius: 24, padding: 36, border: `1px solid ${C.border}` }}>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 10 }}>Automated Resilience</h4>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" }}>Self-healing clusters that detect failure and redistribute traffic instantly.</p>
            <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
              {[85, 60, 90, 45, 75].map((h, j) => (
                <motion.div key={j}
                  initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.4 + j * 0.07, duration: 0.5 }}
                  style={{ flex: 1, borderRadius: 4, background: C.primary, opacity: 0.15 + h / 200, transformOrigin: "bottom", height: h * 0.5 }} />
              ))}
            </div>
          </motion.div>
          {/* Uptime */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.2}
            whileHover={{ scale: 1.03 }}
            style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, borderRadius: 24, padding: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 14 }}
                style={{ fontFamily: "'Syne',sans-serif", fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                99.99%
              </motion.div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginTop: 6 }}>Uptime Guarantee</div>
            </div>
          </motion.div>
          {/* Global edge */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.3}
            whileHover={{ y: -4 }}
            style={{ background: C.bgCard, borderRadius: 24, padding: 36, border: `1px solid ${C.border}` }}>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 8 }}>Global Edge</h4>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" }}>Global CDN distribution with edge nodes in 40+ regions.</p>
            {/* Mini globe dots */}
            <div style={{ marginTop: 18, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["🇺🇸", "🇬🇧", "🇩🇪", "🇸🇬", "🇮🇳", "🇦🇺"].map((flag, j) => (
                <motion.span key={j} initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.5 + j * 0.05 }}
                  style={{ fontSize: 18 }}>{flag}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Process ────────────────────────────────────────────────────────────────────
const processSteps = [
  { n: "01", title: "Discovery & Audit",     desc: "We analyze your current stack and business objectives to identify critical optimization points." },
  { n: "02", title: "Architectural Design",  desc: "Drafting a high-level schematic of the new environment with security as a core pillar." },
  { n: "03", title: "Provisioning",          desc: "Deploying the infrastructure using our audited automation scripts and IaC protocols." },
  { n: "04", title: "Optimization",          desc: "Continuous tuning of resource allocation to ensure maximum efficiency and minimum cost." },
]

function Process() {
  const { ref, inView } = useViewAnim()
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section style={{ padding: "96px 28px", background: C.bg }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <motion.h3 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, textAlign: "center", marginBottom: 64 }}>
          Operational <span style={{ color: C.primary }}>Roadmap</span>
        </motion.h3>
        <div ref={lineRef} style={{ position: "relative" }}>
          {/* Track */}
          <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 1, background: C.border }} />
          {/* Animated fill */}
          <motion.div initial={{ scaleY: 0 }} animate={lineInView ? { scaleY: 1 } : {}} transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${C.primary},rgba(236,91,19,0.2))`, transformOrigin: "top" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {processSteps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, x: -32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: 32, alignItems: "flex-start", paddingLeft: 64, position: "relative" }}>
                {/* Dot */}
                <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 260, damping: 14 }}
                  style={{ position: "absolute", left: 14, top: 4, width: 20, height: 20, borderRadius: "50%", background: i === 0 ? C.primary : C.bgCard, border: `2px solid ${i === 0 ? C.primary : C.border}`, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i > 0 && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, opacity: 0.5 }} />}
                </motion.div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 40, fontWeight: 900, color: "rgba(0,0,0,0.07)", lineHeight: 1, flexShrink: 0, userSelect: "none", marginTop: -4 }}>{s.n}</div>
                <div>
                  <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Tech Stack ─────────────────────────────────────────────────────────────────
const techCols = [
  { cat: "Cloud Providers",  tags: ["AWS", "Google Cloud", "Azure"] },
  { cat: "Orchestration",    tags: ["Kubernetes", "Docker", "Terraform"] },
  { cat: "Data Management",  tags: ["PostgreSQL", "Redis", "MongoDB"] },
  { cat: "Monitoring",       tags: ["Prometheus", "Grafana", "Datadog"] },
]

function TechStack() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 28px", background: C.bgMuted }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.h3 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, textAlign: "center", marginBottom: 56 }}>
          Engineered with <span style={{ color: C.primary }}>Precision</span>
        </motion.h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {techCols.map((col, ci) => (
            <motion.div key={col.cat}
              variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={ci * 0.1}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLight, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{col.cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {col.tags.map((tag, ti) => (
                  <motion.span key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: ci * 0.08 + ti * 0.07 }}
                    whileHover={{ background: C.primary, color: "#fff", borderColor: C.primary, scale: 1.04 }}
                    style={{ padding: "6px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.text, cursor: "default", transition: "background 0.2s, color 0.2s, border 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Use Cases ──────────────────────────────────────────────────────────────────
const useCases = [
  { title: "FinTech Scalability",     tag: "Case Study", desc: "Helping a leading neo-bank scale from 10k to 1M users while maintaining PCI-DSS compliance.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDytVn1scRxsUzw5HsDQ6cShflO8v3v7KOSlQVAeJzpx47sFuq9SOexkcFpB3Y9Jz5c1GuTIoxC8Ad_UDicBEDe0TG6SCNohvIRf2snWA5rd87momHJLAVHoxxhvx3fW5c13zxg5eqKrmK2Q9LxtxLNcoVnvv7zV9Z5XSrIZadi-bR_kzAdORMBXdScC5A4TfPAlCe5sM4lZxAiFm-S-8SQx8hR3TkxPTfJQ67PcoGdbTxDVEQlk-yW-at1NZ9IgQbJvzqGubj0rlY" },
  { title: "Global Retail Logistics", tag: "Case Study", desc: "Reducing latency for an international e-commerce giant by implementing edge-computing nodes.",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtHzzUF0ik3dLe2H5ePHOp2d-G-akI1p8JmxO2SlHYFn_0AZiLZL5_WVhHEo4I5exPD_iNEyXw-QBCBh1ERsp8p916Omn6rTrrLog_rAR5C7SBHT-qkZzLXjwaoIFKfgi7hMdILPXPHhmvYhCx-8UjBVl4CzfUIrqNrBOJ1tomB-gjqc_CrV3ZU-VGGmLJbbaJexPl-b1OoUIyeOEIHmFtRj-Nyg4gLWCAqmswgv5Vdur4NwYMqunqxBPhFsyELyiJBuCD0IoIXlI" },
]

function UseCases() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 28px", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.h3 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, marginBottom: 48 }}>
          Applied <span style={{ color: C.primary }}>Success</span>
        </motion.h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {useCases.map((c, i) => (
            <motion.div key={c.title}
              variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.13}
              style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, aspectRatio: "16/10", marginBottom: 20, background: C.bgDeep }}>
                <motion.img whileHover={{ scale: 1.07 }} transition={{ duration: 0.7 }}
                  src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(236,91,19,0.6), transparent)`, display: "flex", alignItems: "flex-end", padding: 24 }}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: "12px 24px", background: "#fff", color: C.primary, fontWeight: 800, fontSize: 14, borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>
                    View Case Study →
                  </motion.button>
                </motion.div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary, marginBottom: 6, fontFamily: "'Syne',sans-serif" }}>{c.tag}</div>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 8 }}>{c.title}</h4>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Benefits / Metrics ─────────────────────────────────────────────────────────
const bars = [
  { label: "Deployment Speed", val: "+450%", pct: 85 },
  { label: "Latency Reduction", val: "-60%",  pct: 60 },
  { label: "Cost Efficiency",   val: "+35%",  pct: 70 },
]

function Benefits() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 28px", background: C.bgDark, color: "#f6ded3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left */}
        <motion.div ref={ref} variants={fadeLeft} initial="hidden" animate={inView ? "show" : "hidden"}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 32, color: "#f6ded3" }}>
            Why <span style={{ color: C.primaryLight }}>TechCurate?</span>
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: 20, listStyle: "none" }}>
            {[
              { strong: "Predictable Costs", rest: ": Eliminate cloud sprawl with automated budget policing." },
              { strong: "Bulletproof Reliability", rest: ": Automated failovers across multiple geographic regions." },
              { strong: "Elite Security", rest: ": ISO 27001-ready architectures from day one." },
            ].map(({ strong, rest }, i) => (
              <motion.li key={strong}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12 }}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `rgba(236,91,19,0.18)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon name="check_circle" size={18} color={C.primaryLight} />
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif", color: "rgba(246,222,211,0.85)" }}>
                  <strong style={{ color: "#f6ded3" }}>{strong}</strong>{rest}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        {/* Right: Metric bars */}
        <motion.div variants={fadeRight} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,181,153,0.7)", marginBottom: 32, fontFamily: "'Syne',sans-serif" }}>Metric Impact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {bars.map((b, i) => (
              <div key={b.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(246,222,211,0.85)", fontFamily: "'DM Sans',sans-serif" }}>{b.label}</span>
                  <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ fontSize: 14, fontWeight: 800, color: C.primaryLight, fontFamily: "'Syne',sans-serif" }}>{b.val}</motion.span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${b.pct}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "100%", background: `linear-gradient(90deg,${C.primary},${C.primaryLight})`, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "How long does a migration typically take?", a: "Typical migrations take 4 to 8 weeks, depending on existing complexity and data volume. We prioritize zero-downtime cutovers for mission-critical systems." },
  { q: "Do you offer 24/7 managed services?",        a: "Yes, we provide round-the-clock monitoring and incident response with SLA-backed uptime guarantees tailored to your business requirements." },
  { q: "Can we use our own cloud provider accounts?", a: "Absolutely. We support bring-your-own-account (BYOA) models across AWS, Azure, and GCP. Our tooling integrates directly with your existing accounts." },
]

function FAQ() {
  const { ref, inView } = useViewAnim()
  const [open, setOpen] = useState(0)
  return (
    <section style={{ padding: "96px 28px", background: C.bg }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.h3 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.text, textAlign: "center", marginBottom: 48 }}>
          Frequently <span style={{ color: C.primary }}>Asked</span>
        </motion.h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <motion.div key={f.q}
              variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.1}
              style={{ background: C.bgCard, border: `1px solid ${open === i ? C.borderOrange : C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: open === i ? `0 8px 28px rgba(236,91,19,0.1)` : "0 2px 10px rgba(0,0,0,0.04)", transition: "border 0.3s, box-shadow 0.3s" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.text }}>{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                  style={{ width: 28, height: 28, borderRadius: "50%", background: open === i ? C.primary : "transparent", border: `1.5px solid ${open === i ? C.primary : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s, border 0.3s" }}>
                  <Icon name="expand_more" size={18} color={open === i ? "#fff" : C.textMuted} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 24px 20px", fontSize: 14, color: C.textMuted, lineHeight: 1.72, fontFamily: "'DM Sans',sans-serif" }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "120px 28px", background: C.bgMuted, position: "relative", overflow: "hidden" }}>
      {/* Animated rings */}
      {[1, 2, 3].map(r => (
        <motion.div key={r}
          animate={{ scale: [1, 1.5 * r, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: r * 0.6 }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80 * r, height: 80 * r, borderRadius: "50%", border: `1px solid ${C.primary}`, pointerEvents: "none" }} />
      ))}
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(30px,5.5vw,60px)", fontWeight: 900, letterSpacing: "-0.05em", color: C.text, marginBottom: 20, lineHeight: 1.08 }}>
            Let's build something <span style={{ color: C.primary }}>meaningful</span> together.
          </h2>
          <p style={{ fontSize: 18, color: C.textMuted, marginBottom: 40, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" }}>
            Ready to evolve your infrastructure? Our architects are ready to chat.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 24px 50px rgba(236,91,19,0.3)` }}
            whileTap={{ scale: 0.96 }}
            style={{ padding: "18px 44px", background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "#fff", border: "none", borderRadius: 14, fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 17, cursor: "pointer", boxShadow: `0 8px 28px rgba(236,91,19,0.25)`, letterSpacing: "-0.02em" }}>
            Contact Our Architecture Team →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = ["Privacy Policy", "Terms of Service", "Cookie Settings", "Global Support"]
  return (
    <footer style={{ background: "#f0eeee", borderTop: `1px solid ${C.border}`, padding: "48px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 900, letterSpacing: "-0.04em", color: C.text, marginBottom: 4 }}>
            Tech<span style={{ color: C.primary }}>Curate</span>
          </div>
          <p style={{ fontSize: 13, color: C.textLight, fontFamily: "'DM Sans',sans-serif" }}>© 2024 TechCurate Systems. Built with precision.</p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {links.map(l => (
            <motion.a key={l} href="#" whileHover={{ color: C.primary }}
              style={{ fontSize: 13, color: C.textLight, textDecoration: "none", transition: "color 0.2s", fontFamily: "'DM Sans',sans-serif" }}>
              {l}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function TechCurate() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(236,91,19,0.18); color: #ec5b13; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f8f6f6; }
        ::-webkit-scrollbar-thumb { background: #ec5b13; border-radius: 3px; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          display: inline-block; line-height: 1;
        }
        @media(max-width:768px){
          .nav-links { display: none !important; }
        }
      `}</style>

      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Overview />
        <Services />
        <Features />
        <Process />
        <TechStack />
        <UseCases />
        <Benefits />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}