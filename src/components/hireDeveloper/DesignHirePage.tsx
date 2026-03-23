// NeuralArchitect.jsx
// npm install framer-motion
// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
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

// ─── Design Tokens ─────────────────────────────────────────────────────────
const C = {
  bg: "#1c110b",
  bgLow: "#251913",
  bgContainer: "#291d17",
  bgHigh: "#352720",
  bgLowest: "#160c07",
  surface: "#1c110b",
  primary: "#ffb599",
  orange: "#ec5b13",
  orangeDim: "#c44a0a",
  text: "#f6ded3",
  textMuted: "#e2bfb3",
  textFaint: "rgba(246,222,211,0.5)",
  border: "rgba(90,65,56,0.4)",
  borderPrimary: "rgba(255,181,153,0.2)",
  footer: "#221610",
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function useViewAnim() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return { ref, inView }
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({ opacity: 1, transition: { duration: 0.6, delay: d } }),
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { damping: 20, stiffness: 150 })
  const sy = useSpring(y, { damping: 20, stiffness: 150 })
  useEffect(() => {
    const move = (e: any) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])
  return (
    <motion.div
      style={{
        left: sx, top: sy, position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,91,19,0.06) 0%, transparent 70%)",
        translateX: "-50%", translateY: "-50%",
      }}
    />
  )
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 100,
        background: `linear-gradient(90deg, ${C.orange}, ${C.primary})`,
        scaleX, transformOrigin: "left",
      }}
    />
  )
}


// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 32px", paddingTop: 80 }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(236,91,19,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${C.orange} 1px, transparent 1px), linear-gradient(90deg, ${C.orange} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      {/* Floating orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", right: "5%", top: "20%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(236,91,19,0.12), transparent 70%)`, pointerEvents: "none", filter: "blur(10px)" }}
      />

      <motion.div style={{ y, opacity, maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", zIndex: 1 }}>
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(120,49,18,0.3)", border: `1px solid rgba(255,181,153,0.2)`, marginBottom: 28 }}
          >
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange, boxShadow: `0 0 8px ${C.orange}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary, fontFamily: "'Space Grotesk', sans-serif" }}>Expert Design Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(44px,6vw,78px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.92, color: C.text, marginBottom: 28 }}
          >
            Hire Expert{" "}
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: C.orange, position: "relative", display: "inline-block" }}
            >
              UI/UX Designers
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.orange}, transparent)`, transformOrigin: "left", borderRadius: 3 }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: 18, color: C.textMuted, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}
          >
            Create intuitive, engaging, and user-centered digital experiences that drive growth and delight your customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(236,91,19,0.25)" }}
              whileTap={{ scale: 0.96 }}
              style={{ padding: "16px 36px", background: `linear-gradient(135deg, ${C.primary}, #f5611b)`, borderRadius: 12, color: "#4f1700", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hire Now
            </motion.button>
            <motion.button
              whileHover={{ background: C.bgContainer }}
              whileTap={{ scale: 0.96 }}
              style={{ padding: "16px 36px", background: "rgba(41,29,23,0.6)", backdropFilter: "blur(20px)", border: `0.5px solid rgba(255,181,153,0.2)`, borderRadius: 12, color: C.text, fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.2s" }}
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Image grid */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group"
          style={{ position: "relative" }}
        >
          <div style={{ position: "absolute", inset: -40, background: `rgba(236,91,19,0.08)`, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, position: "relative" }}>
            <motion.div
              whileHover={{ translateY: -8 }}
              style={{ gridColumn: "span 8", transform: "translateY(32px)", transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXDn_LNiRjPcGb8v_b6l6jb-vFHFISTqzZtqVGLn96ox2bbFefoPdFugAcihzCEnVqiLBqFnEwuah-8CKDigRPgGao9-ISrdSMpV27ujLBDxHq2IG4Q2Gd7WPZnLmv9naT8rkuazvqWsCDoAUzrmzk_vXN66zvD11bq3wUdvAKekacj58aBpQxwdcSb4yx2ts2ZoTQOmpFia3ouSHNS_8ZeDvdcETTOOUmQrirONzoSEPLmKElvNeNvSUkqAGkGwfNmjTUwf55s5M"
                alt="UI dashboard" style={{ borderRadius: 16, width: "100%", objectFit: "cover", aspectRatio: "4/3", border: `1px solid rgba(90,65,56,0.3)`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }} />
            </motion.div>
            <motion.div
              whileHover={{ translateY: -16 }}
              style={{ gridColumn: "span 4", alignSelf: "center", transform: "translateX(-32px) translateY(-48px)", transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuApOVDAZVlUm-UfIawyEQWG-rmotXtz8bUd6HSpv3MEY1aheyHYFC0xnZyqUmb130u_pVpW3M0siKi-f_0taAnMZAALJPd6m7MSf6LTJV3ko-KMB8Be-0P6k_1xX71ldcm53PrLiHU2jScutu7t7s07swtr2BT_CVhBAllsBh3UNUH8dujtji9JmoGMZkYI3gEUxStPCWI2C5x1AGmhpFii7UWsYmA-QM5w7knUTn5Q5crsBJoKC7DJ-Y4GVYaP40V34vJ7Orab43Y"
                alt="Mobile UI" style={{ borderRadius: 16, width: "100%", objectFit: "cover", aspectRatio: "9/16", border: `1px solid rgba(90,65,56,0.3)`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────
const advantageCards = [
  { icon: "psychology", title: "User-Centered Design", desc: "We place your users at the core of every decision, ensuring experiences that are as functional as they are beautiful.", span: 2 },
  { icon: "view_quilt", title: "Modern Interfaces", desc: "Cutting-edge visuals that reflect your brand's unique identity.", span: 1 },
  { icon: "analytics", title: "Research-Driven", desc: "Data-backed strategies that remove guesswork from design.", span: 1 },
]

function WhyUs() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 32px", background: C.bgLow }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 16 }}>The Architect Advantage</h2>
          <div style={{ width: 64, height: 3, background: C.orange, borderRadius: 3, margin: "0 auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {advantageCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.12}
              whileHover={{ borderColor: "rgba(236,91,19,0.4)", y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}
              style={{ gridColumn: `span ${card.span}`, padding: 32, borderRadius: 20, background: C.bgContainer, border: `1px solid ${C.border}`, cursor: "default", transition: "border 0.3s, box-shadow 0.3s" }}
            >
              <motion.span
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="material-symbols-outlined"
                style={{ fontSize: 40, color: C.orange, display: "block", marginBottom: 20 }}
              >{card.icon}</motion.span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: card.span === 2 ? 22 : 18, fontWeight: 700, color: C.text, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>{card.desc}</p>
            </motion.div>
          ))}
          {/* Large feature card */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.4}
            whileHover={{ borderColor: "rgba(236,91,19,0.4)" }}
            style={{ gridColumn: "span 4", padding: 32, borderRadius: 20, background: C.bgContainer, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", transition: "border 0.3s" }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: C.orange, display: "block", marginBottom: 20 }}>trending_up</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>Conversion-Focused UX</h3>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7 }}>Every pixel is engineered to guide users toward your business goals, increasing retention and conversion rates across all platforms.</p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 240, height: 200, borderRadius: 14, overflow: "hidden", background: C.bgHigh }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW63v4S0sosbc9u2g-FRX75E1wS-KMnid4SSNhWIxV0hO9yUBR6vzn-HwtXzSCcokl3b9OMFp3OVApxKBcvyxR9u1Kf3uFymmUtRoG9jb-BfGhlSLgwm33mA8fnI9sm74rTRFEBa4YOGWVbOYsLk5KlTLPLQ1QaA9R60iVWq7I84SC17feaTGvPp7MOqnk6XAXHrzhf9lyUhGYar6Eyyjyc4j1xztYdUdXWxn0vERmnbOOWG7tcpqG9Yl-Fg8H153iGxYgeD6sq_8"
                alt="Analytics" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, filter: "grayscale(1)", transition: "opacity 0.4s, filter 0.4s" }}
                onMouseEnter={(e: any) => { e.target.style.opacity = "1"; e.target.style.filter = "grayscale(0)" }}
                onMouseLeave={(e: any) => { e.target.style.opacity = "0.6"; e.target.style.filter = "grayscale(1)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  { num: "01", title: "UI Design", desc: "Stunning visual layouts that captivate and engage." },
  { num: "02", title: "UX Research", desc: "Deep-dive interviews and behavioral analysis." },
  { num: "03", title: "Wireframing", desc: "Strategic blueprints for seamless user flows." },
  { num: "04", title: "Design Systems", desc: "Scalable component libraries for rapid development." },
  { num: "05", title: "Prototyping", desc: "Interactive high-fidelity prototypes for testing." },
  { num: "06", title: "Usability Testing", desc: "Real-world feedback to refine and perfect." },
]

function Services() {
  const { ref, inView } = useViewAnim()
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ padding: "96px 32px", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: 580 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 16 }}>
              Precision Engineering for <span style={{ color: C.orange }}>Digital Products</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7 }}>Full-cycle design services tailored to scale your product from concept to market leader.</p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            style={{ display: "flex", alignItems: "center", gap: 6, color: C.orange, fontWeight: 700, fontSize: 14, background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View All Services <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.2}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderRadius: 20, overflow: "hidden", border: `1px solid rgba(90,65,56,0.2)`, background: "rgba(90,65,56,0.2)", gap: 1 }}
        >
          {services.map((s, i: any) => (
            <motion.div
              key={s.num}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "48px", background: hovered === i ? C.bgContainer : C.bg, transition: "background 0.3s", cursor: "default", position: "relative", overflow: "hidden" }}
            >
              <AnimatePresence>
                {hovered === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(236,91,19,0.04), transparent)`, pointerEvents: "none" }} />
                )}
              </AnimatePresence>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 10, letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65 }}>{s.desc}</p>
              <motion.div animate={{ width: hovered === i ? "40px" : "0px" }} style={{ height: 2, background: C.orange, borderRadius: 2, marginTop: 20, transition: "width 0.4s" }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Tools ────────────────────────────────────────────────────────────────────
const tools = [
  { icon: "token", label: "Figma" },
  { icon: "layers", label: "Adobe XD" },
  { icon: "diamond", label: "Sketch" },
  { icon: "web", label: "Framer" },
  { icon: "integration_instructions", label: "InVision" },
]

function Tools() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "64px 32px", background: C.bgLowest, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.p variants={fadeIn} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ textAlign: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: C.textMuted, marginBottom: 44 }}>
          Mastery of the Ecosystem
        </motion.p>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "32px 80px", opacity: 0.55, filter: "grayscale(1)", transition: "opacity 0.5s, filter 0.5s" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = "grayscale(0)" }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.55"; e.currentTarget.style.filter = "grayscale(1)" }}
        >
          {tools.map((tool, i) => (
            <motion.div key={tool.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "default" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: C.text }}>{tool.icon}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: C.text, fontSize: 15 }}>{tool.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
const processSteps = [
  { n: 1, title: "Research", desc: "Discovery and strategy." },
  { n: 2, title: "Wireframing", desc: "Structural blueprints." },
  { n: 3, title: "UI Design", desc: "Visual execution." },
  { n: 4, title: "Prototyping", desc: "Interactive flows." },
  { n: 5, title: "Testing", desc: "Refinement cycle." },
]

function Process() {
  const { ref, inView } = useViewAnim()
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section style={{ padding: "96px 32px", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.h2 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, textAlign: "center", marginBottom: 80 }}>
          The Kinetic Framework
        </motion.h2>
        <div style={{ position: "relative" }}>
          {/* Background line */}
          <div ref={lineRef} style={{ position: "absolute", top: 22, left: 0, right: 0, height: 1, background: "rgba(90,65,56,0.2)" }} />
          {/* Animated fill line */}
          <motion.div
            style={{ position: "absolute", top: 22, left: 0, height: 1, background: `linear-gradient(90deg, ${C.orange}, ${C.primary})`, originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${processSteps.length}, 1fr)`, gap: 32, position: "relative" }}>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", zIndex: 1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.12, borderColor: C.orange, color: C.orange, boxShadow: `0 0 20px rgba(236,91,19,0.3)` }}
                  style={{ width: 44, height: 44, borderRadius: "50%", background: C.bgContainer, border: i === 0 ? `2px solid ${C.orange}` : `2px solid rgba(90,65,56,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: i === 0 ? C.orange : C.text, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, transition: "all 0.3s", cursor: "default" }}
                >
                  {step.n}
                </motion.div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: C.text, marginBottom: 6, fontSize: 15 }}>{step.title}</h4>
                <p style={{ fontSize: 12, color: C.textMuted }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
const portfolioItems = [
  { tag: "Mobile Application", title: "NeoBank Experience", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXV_PPiQfBoO7YIGv9jxqBaP4zdwjtkWKzbWv86lJz-e-yIccjIRFAheUHrSzGJWhBQxReBqcQaxhONv6IbwBa03T4D37zmxmMhzvoEMocm2rbdc_JIHt3JLZrEoaqb-Fy3LjaknpgE7FrrQdbHoTFXPuHVffVmfF5tGXE95r2yMC_57ArgmOlKAZyH-62mg_7Dfv0q4E5M5HogoDnul40V7j2b8n46imj9T68V3Nq2g10GtJWLhr4mWLq3tOyVM38u-uEslrLlo0" },
  { tag: "SaaS Dashboard", title: "CloudOps Analytics", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_AbXHPNEXzbB9wOF0UUOarOjqrwV_cPb-X-z2KO8E786YgaCqmHTRg-1DwBIrG1vY2WcEs_ceKML8_8lI8Yb5YKLCXNKQufU01MBt5JTAD2JnmoIA4J6-FactaVdJwI1_XIqaAiMtdIpWTQViTn70c9SizcGFgDw-tjXpLh9mPDE_GMGEfIeATtM4qjxRf031nNmBccHb2UL9rKFB2lAWLRwP26tGCnwEBCNYKahS2qqGE0orrPX1srmLa_5csmVG-GLFuOcdPKU" },
  { tag: "E-Commerce", title: "Aura Luxury Retail", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT9wlbXPuoethTz6g-YXS4pi2RTUt1SeXFkoXQx-geT4wf_ko6EGX6jpCQHjTGk5uuoJ1joiUcThzwn_1knU92-4w5Fs5nOelH37B1bsUorWI8Lj96SA4wYnHfzsxH7xw3E1mH80ZgQTUkSb4IhtUIDSfQ-pZUjoX2aQia6AT68d0zcArk7V5EzB8muMivAjol61tBJW8tGlzYJjW7pntUdIx_UAcAyu8pALLzR48KIpa1NH1oqNrmpGVGowb7IuSFiYtolvNaNTk" },
]

function Portfolio() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 32px", background: C.bgLow }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 12 }}>Curated Case Studies</h2>
          <p style={{ fontSize: 15, color: C.textMuted }}>Explore how we've helped startups and enterprises redefine their digital presence.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ cursor: "pointer" }}
            >
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, aspectRatio: "4/5", marginBottom: 20 }}>
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7 }}
                  src={item.img} alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <motion.div
                  initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,17,11,0.92), transparent)", display: "flex", alignItems: "flex-end", padding: 24 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                    style={{ width: "100%", padding: "14px", background: C.primary, color: "#4f1700", fontWeight: 800, fontSize: 14, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    View Case Study
                  </motion.button>
                </motion.div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.tag}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { quote: "NeuralArchitect transformed our abstract ideas into a tangible, breathtaking product. Their design system alone saved us months of dev time.", name: "Marcus Chen", role: "CTO, Flux Technologies", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG4wRkYJkiEHfee-0nIHLhvSruLGUH_YQHXV96OGa9UmF2xVi4Oqin4aZvrxbj5v5rgmTijQgFPnWPRxkIqQ-u4Cpkhh2Puf2odePYelfXF6HRxa-oo5v3YEkjW99MJNCfR9RylMK8n8OoiFrkLiGk9rJ0CRRa-5RGl1W33pXmnrYjJ17FGjCfTRNP2feW2ZNi38xIyag3cT4VAyd2xof7J7C7FTLABcfQ1gdAMWg57EpEymnN7Zcxmbr79rnrP6fj3nv2l0NcQsU" },
  { quote: "Rarely do you find a team that balances user psychology with such high-end visual aesthetics. Truly a world-class design partner.", name: "Sarah Jenkins", role: "Founder, Bloom AI", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0JBecZO1a4hnwsZAxgH6MtwbcqrX0XghVByF6OzvKcQosA0--_7iev4-rOpUzOq8nb7lP5FtBhx9bdNag8-M1wDF5FUovG-EvcM4wEmbS_xpLXL1AzN1egYbmB-x4cdRbi5bi9JfdEfcmLfGIXWzim2FENGzp076QiwkOvtbC4eQoEamARqQ68-QqHrD3MmsapezosCW9QJTTJjkVwXO30ji_whVEyK2acTFMnSw-125k-cx29vdTK1eH2il7UMdvtFd_hOun5OA" },
]

function Testimonials() {
  const { ref, inView } = useViewAnim()
  return (
    <section style={{ padding: "96px 32px", background: C.bg, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(90,65,56,0.3)" }} />
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.text, whiteSpace: "nowrap" }}>Voices of Success</h2>
          <div style={{ flex: 1, height: 1, background: "rgba(90,65,56,0.3)" }} />
        </motion.div>
        <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 16 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: "rgba(255,181,153,0.25)", boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}
              style={{ minWidth: 400, background: C.bgContainer, padding: 40, borderRadius: 20, border: `1px solid ${C.border}`, flexShrink: 0, transition: "border 0.3s, box-shadow 0.3s" }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="material-symbols-outlined" style={{ fontSize: 18, color: C.orange, fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p style={{ fontSize: 16, fontStyle: "italic", color: C.text, lineHeight: 1.7, marginBottom: 28 }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: C.text, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Hire Form ────────────────────────────────────────────────────────────────
function HireForm() {
  const { ref, inView } = useViewAnim()
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<any>(null)

  const inputStyle = (field: any) => ({
    width: "100%", background: C.bgLowest, border: "none", borderRadius: 12, padding: "14px 16px",
    color: C.text, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none",
    boxShadow: focused === field ? `0 0 0 2px rgba(255,181,153,0.35)` : "none",
    transition: "box-shadow 0.2s",
  })

  return (
    <section style={{ padding: "96px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `rgba(236,91,19,0.05)`, filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", position: "relative", zIndex: 1 }}>
        {/* Left */}
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 20 }}>
            Ready to Build the <span style={{ color: C.orange }}>Future?</span>
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7, marginBottom: 44 }}>
            Whether you're a startup or a global brand, we're here to help you scale through intentional design.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {["Initial Consultation Free", "Dedicated Product Manager", "Weekly Design Syncs"].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.12 }}
                style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(236,91,19,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: C.orange }}>check</span>
                </div>
                <span style={{ color: C.text, fontSize: 15 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.15}
          style={{ background: C.bgContainer, padding: 40, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 32px 80px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}
        >
          <AnimatePresence>
            {sent && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, borderRadius: 20, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDim})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 10 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} style={{ fontSize: 52 }}>🎨</motion.div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>Inquiry Sent!</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", textAlign: "center", maxWidth: 280 }}>We'll reach out within 24 hours to discuss your project.</div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => setSent(false)}
                  style={{ marginTop: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 10, padding: "10px 24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, cursor: "pointer" }}>
                  Start Another
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 28 }}>Start Your Design Project</h3>
          <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {["Name", "Email"].map((f: any) => (
                <div key={f}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{f}</label>
                  <input type={f === "Email" ? "email" : "text"} placeholder={f === "Name" ? "John Doe" : "john@company.com"} required
                    onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                    style={inputStyle(f)} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>Project Type</label>
              <select onFocus={() => setFocused("type")} onBlur={() => setFocused(null)} style={{ ...inputStyle("type"), appearance: "none", cursor: "pointer" }}>
                {["UI/UX Design", "Design System", "Product Audit", "Web Redesign"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>Details</label>
              <textarea rows={4} placeholder="Tell us about your project..." onFocus={() => setFocused("details")} onBlur={() => setFocused(null)}
                style={{ ...inputStyle("details"), resize: "none" }} />
            </div>
            <motion.button type="submit"
              whileHover={{ boxShadow: "0 20px 40px rgba(236,91,19,0.3)", scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: "16px", background: C.orange, color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
              Send Inquiry →
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function NeuralArchitect() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(236,91,19,0.25); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1c110b; }
        ::-webkit-scrollbar-thumb { background: #ec5b13; border-radius: 3px; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; font-family: 'Material Symbols Outlined'; }
      `}</style>

      <ScrollProgress />
      <CursorGlow />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <WhyUs />
        <Services />
        <Tools />
        <Process />
        <Portfolio />
        <Testimonials />
        <HireForm />
      </main>
    </div>
  )
}