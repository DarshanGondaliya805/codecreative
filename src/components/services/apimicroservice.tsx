// MicroService Landing Page — React + Framer Motion
// npm install framer-motion

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: "#ec5b13",
  primaryDark: "#c44a0a",
  primaryLight: "#ff7a3d",
  primaryGlow: "rgba(236,91,19,0.15)",
  primaryGlowStrong: "rgba(236,91,19,0.25)",
  bg: "#f8f6f6",
  bgCard: "#ffffff",
  bgMuted: "#f2efef",
  bgDeep: "#ede9e9",
  text: "#1a1816",
  textMuted: "#6b6560",
  textLight: "#9e9792",
  border: "rgba(0,0,0,0.07)",
  borderStrong: "rgba(236,91,19,0.3)",
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
}

const fadeIn:any = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 0.6, delay: i * 0.08 } }),
}

const slideLeft:any = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const slideRight:any = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useViewAnim(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px", amount: threshold })
  return { ref, inView }
}

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { damping: 25, stiffness: 200 })
  const sy = useSpring(y, { damping: 25, stiffness: 200 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: sx, top: sy,
        width: 320, height: 320,
        background: "radial-gradient(circle, rgba(236,91,19,0.06) 0%, transparent 70%)",
      }}
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3])

  return (
    <section style={{ paddingTop: 140, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, position: "relative", overflow: "hidden" }}>
      {/* Background mesh */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 10% 50%, ${C.primaryGlow}, transparent)`,
      }} />
      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04,
        backgroundImage: `linear-gradient(${C.primary} 1px, transparent 1px), linear-gradient(90deg, ${C.primary} 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />
      {/* Floating orb */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", right: "5%", top: "15%",
          width: 340, height: 340, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <motion.div style={{ maxWidth: 1280, margin: "0 auto", y, opacity }}>
        <motion.span
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          style={{
            display: "inline-block", padding: "5px 14px", borderRadius: 100,
            background: `rgba(236,91,19,0.1)`, border: `1px solid ${C.primaryGlow}`,
            color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 28,
          }}
        >
          Engineering Excellence
        </motion.span>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          style={{
            fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800,
            lineHeight: 1.08, letterSpacing: "-0.04em",
            color: C.text, marginBottom: 28, maxWidth: 760,
          }}
        >
          Build Systems That Scale{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: C.primary, fontStyle: "italic", position: "relative" }}
          >
            Seamlessly
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 8 }}
              viewBox="0 0 200 8" fill="none"
            >
              <motion.path d="M2 6 Q50 2 100 5 Q150 8 198 3" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.8 }} />
            </motion.svg>
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          style={{ fontSize: 18, color: C.textMuted, lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}
        >
          We design reliable APIs and microservices that power fast, flexible, and scalable applications for the next generation of digital products.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 12px 32px ${C.primaryGlowStrong}` }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
              color: "#fff", padding: "14px 32px", borderRadius: 12,
              fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: `0 6px 20px ${C.primaryGlow}`,
            }}
          >
            Start Your Project
          </motion.button>
          <motion.button
            whileHover={{ background: `rgba(236,91,19,0.08)`, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent", color: C.primary,
              padding: "14px 32px", borderRadius: 12,
              fontSize: 15, fontWeight: 700,
              border: `1.5px solid ${C.borderStrong}`, cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap" }}
        >
          {[["99.9%", "Uptime SLA"], ["40%", "Latency Reduction"], ["2.5x", "Faster Cycles"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.primary, letterSpacing: "-0.03em" }}>{val}</div>
              <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ padding: "96px 24px", ...style }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div>
    </section>
  )
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({ tag, title, sub }: { tag?: string; title: string; sub?: string }) {
  const { ref, inView } = useViewAnim()
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center", marginBottom: 56 }}>
      {tag && (
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>
          {tag}
        </div>
      )}
      <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>{title}</h2>
      <motion.div style={{ width: 40, height: 3, background: C.primary, borderRadius: 3, margin: "12px auto 0" }} />
      {sub && <p style={{ marginTop: 16, color: C.textMuted, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.65, fontSize: 16 }}>{sub}</p>}
    </motion.div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview() {
  const { ref: refL, inView: inL } = useViewAnim()
  const { ref: refR, inView: inR } = useViewAnim()

  return (
    <Section style={{ background: C.bgMuted }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
        <motion.div ref={refL} variants={slideLeft} initial="hidden" animate={inL ? "show" : "hidden"}
          style={{ borderRadius: 20, overflow: "hidden", background: C.bgCard, aspectRatio: "16/10", boxShadow: `0 20px 60px rgba(0,0,0,0.08)`, border: `1px solid ${C.border}`, position: "relative" }}
        >
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWCJTQf4lOw1ndtwh-ur6wrVafu20yQp4-G8Qlj1lv_-jUNFkbWzTzes5bpm9XlN1G49qJ1CqYoiHXmgHHAs2OkMScFBFTeX1mNjryV4LBstwSPplbHtgiOxF1Y9Kg0LFYKbGGMiRL-8NbTWPPSaJxithoAmUwnu8hiZ_g5EPSt6S4pHUXgjS5YbV4r7n-PPLvEmWgX0yNJEBHLQIkQ6efBhy3JbUzKxrk40pbTfVe7Rfde82XS-ltAZlXXgloAmMuc1i9FGvQJQY"
            alt="Server room" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
          {/* Orange overlay tint */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.primaryGlow}, transparent)` }} />
        </motion.div>

        <motion.div ref={refR} variants={slideRight} initial="hidden" animate={inR ? "show" : "hidden"}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 20 }}>The Backbone of Modern Software</h2>
          <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.75, marginBottom: 20 }}>
            In today's digital landscape, rigid monolithic structures are a thing of the past. APIs and Microservices act as the vital connectors and independent engines that allow your platform to grow without friction.
          </p>
          <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.75 }}>
            By decoupling functionalities into discrete, manageable services, we ensure your system remains resilient, maintainable, and ready to adapt to market changes in real-time.
          </p>
          <motion.div
            whileHover={{ x: 4 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, color: C.primary, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Learn more <span style={{ fontSize: 18 }}>→</span>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

// ─── Services Bento ──────────────────────────────────────────────────────────
const services = [
  { icon: "⬡", title: "API Development", desc: "Custom, robust APIs built for speed and reliability. We ensure your data flows securely between clients and servers with optimized endpoints and documentation.", span: 2 },
  { icon: "⎇", title: "Microservices Architecture", desc: "Transforming complex apps into a suite of independently deployable services.", span: 1 },
  { icon: "⬡", title: "System Integration", desc: "Seamlessly connecting your platform with external ecosystems and legacy systems.", span: 1 },
  { icon: "⚡", title: "API Optimization", desc: "Latency reduction, caching strategies, and load balancing for high-performance demands.", span: 1 },
  { icon: "🛡", title: "Security & Maintenance", desc: "24/7 monitoring and proactive security patches to keep your data safe and services online.", span: 1 },
]

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useViewAnim()

  return (
    <motion.div
      ref={ref}
      variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.1}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(0,0,0,0.09), 0 0 0 1px ${C.borderStrong}` }}
      style={{
        gridColumn: `span ${s.span}`,
        background: C.bgCard, padding: 32, borderRadius: 16,
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        cursor: "pointer", transition: "box-shadow 0.3s",
        position: "relative", overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.primaryGlow}, transparent)`, pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={{ color: hovered ? C.primary : C.textMuted }}
        style={{ fontSize: 28, marginBottom: 16, transition: "color 0.3s" }}
      >
        {s.icon}
      </motion.div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10, letterSpacing: "-0.02em" }}>{s.title}</h3>
      <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>{s.desc}</p>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`, transformOrigin: "left" }}
      />
    </motion.div>
  )
}

function Services() {
  return (
    <Section style={{ background: C.bg }}>
      <SectionHeading title="Core Capabilities" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
      </div>
    </Section>
  )
}

// ─── API Paradigms ────────────────────────────────────────────────────────────
const paradigms = [
  { badge: "REST", label: "RESTful APIs", desc: "Standardized, lightweight, and scalable web services." },
  { badge: "GQL", label: "GraphQL", desc: "Precise data fetching with a single endpoint." },
  { badge: "☁", label: "Third-party", desc: "Stripe, Twilio, and AWS cloud integrations." },
  { badge: "⬡", label: "Internal", desc: "Optimized communication for private networks." },
]

function ApiParadigms() {
  const { ref, inView } = useViewAnim()
  return (
    <Section style={{ background: C.bgDeep }}>
      <SectionHeading title="Specialized API Paradigms" />
      <motion.div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
        {paradigms.map((p, i) => (
          <motion.div
            key={p.label}
            variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.12}
            whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.08)` }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              padding: 28, background: C.bgCard, borderRadius: 16, border: `1px solid ${C.border}`,
              cursor: "pointer",
            }}
          >
            <motion.div
              whileHover={{ background: C.primary, color: "#fff", scale: 1.1 }}
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: `rgba(236,91,19,0.1)`, color: C.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14, fontSize: 16, fontWeight: 800,
                transition: "background 0.3s, color 0.3s",
              }}
            >
              {p.badge}
            </motion.div>
            <h4 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 6 }}>{p.label}</h4>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// ─── Architecture Viz ─────────────────────────────────────────────────────────
const services2 = ["Auth", "Payments", "Inventory"]

function ArchViz() {
  const { ref, inView } = useViewAnim()
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setPulse(p => (p + 1) % services2.length), 1400)
    return () => clearInterval(t)
  }, [inView])

  return (
    <Section style={{ background: C.bg }}>
      <SectionHeading
        title="The Modular Ecosystem"
        sub="Our architectural approach focuses on creating independent, resilient nodes that communicate through a secure gateway."
      />
      <motion.div ref={ref} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", position: "relative", padding: "24px 0" }}>
        {/* Client */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0}
          style={{ background: C.bgCard, border: `1.5px solid ${C.borderStrong}`, borderRadius: 16, padding: "24px 28px", textAlign: "center", minWidth: 160, boxShadow: `0 8px 28px ${C.primaryGlow}` }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.primary, marginBottom: 8 }}>API Gateway</div>
          <div style={{ width: "100%", height: 2, background: `rgba(236,91,19,0.15)`, borderRadius: 2, marginBottom: 10 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Single Entry Point</span>
        </motion.div>

        {/* Connector line with animated dot */}
        <motion.div
          variants={fadeIn} initial="hidden" animate={inView ? "show" : "hidden"} custom={1}
          style={{ width: 80, height: 2, background: `linear-gradient(90deg, ${C.primaryGlow}, rgba(236,91,19,0.4))`, position: "relative", flexShrink: 0 }}
        >
          <motion.div
            animate={inView ? { x: [0, 76, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: C.primary }}
          />
        </motion.div>

        {/* Services */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={1}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {services2.map((svc, i) => (
            <motion.div
              key={svc}
              animate={{ borderColor: pulse === i ? C.primary : C.border, boxShadow: pulse === i ? `0 0 16px ${C.primaryGlow}` : "none", scale: pulse === i ? 1.03 : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: C.bgCard, padding: "12px 20px", borderRadius: 10,
                border: "1.5px solid", minWidth: 140, textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: pulse === i ? C.primary : C.textLight, display: "block", marginBottom: 2 }}>
                Svc {i + 1}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{svc}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Second connector */}
        <motion.div
          variants={fadeIn} initial="hidden" animate={inView ? "show" : "hidden"} custom={2}
          style={{ width: 80, height: 2, background: `linear-gradient(90deg, rgba(236,91,19,0.4), ${C.primaryGlow})`, position: "relative", flexShrink: 0 }}
        >
          <motion.div
            animate={inView ? { x: [76, 0, 76] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: C.primary }}
          />
        </motion.div>

        {/* Message Broker */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={2}
          style={{ background: C.bgMuted, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 28px", textAlign: "center", minWidth: 160 }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, marginBottom: 8 }}>Message Broker</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Async Event Bus</span>
        </motion.div>
      </motion.div>
    </Section>
  )
}

// ─── Integration & Security ───────────────────────────────────────────────────
function IntegrationSecurity() {
  const { ref, inView } = useViewAnim()
  const blocks = [
    {
      title: "Enterprise Integration",
      color: C.primary,
      items: [
        { icon: "💳", text: "Payment Gateways (Stripe, PayPal, Adyen)" },
        { icon: "👥", text: "CRM Sync (Salesforce, HubSpot, Pipedrive)" },
        { icon: "📊", text: "Data Warehousing & BI Connectors" },
      ],
    },
    {
      title: "Fortified Security",
      color: "#e03b3b",
      items: [
        { icon: "🔑", text: "JWT, OAuth2 & OpenID Connect" },
        { icon: "⏱", text: "Intelligent Rate Limiting & Throttling" },
        { icon: "🔒", text: "End-to-End Encryption (TLS/SSL)" },
      ],
    },
  ]

  return (
    <Section style={{ background: C.bgMuted }}>
      <motion.div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {blocks.map((b, bi) => (
          <motion.div
            key={b.title}
            variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={bi * 0.15}
            whileHover={{ boxShadow: `0 20px 50px rgba(0,0,0,0.08)` }}
            style={{ background: C.bgCard, padding: 40, borderRadius: 20, border: `1px solid ${C.border}` }}
          >
            <motion.div style={{ width: 36, height: 3, background: b.color, borderRadius: 3, marginBottom: 20 }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 24 }}>{b.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {b.items.map(({ icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: bi * 0.15 + i * 0.1 + 0.3 }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 15, color: C.textMuted }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const stack = [
  { cat: "Backend", items: ["Node.js", "NestJS"] },
  { cat: "API Logic", items: ["REST", "GraphQL"] },
  { cat: "Database", items: ["PostgreSQL", "MongoDB"] },
  { cat: "Cloud", items: ["AWS", "Kubernetes"] },
]

function TechStack() {
  const { ref, inView } = useViewAnim()
  return (
    <Section style={{ background: C.bg }}>
      <SectionHeading title="Engineered with Precision" />
      <motion.div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
        {stack.map((col, ci) => (
          <motion.div key={col.cat} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={ci * 0.12} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLight, marginBottom: 24 }}>{col.cat}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.items.map((tech, ti) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: ci * 0.1 + ti * 0.1 + 0.2 }}
                  whileHover={{ color: C.primary, scale: 1.05 }}
                  style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: "-0.02em", transition: "color 0.2s" }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// ─── Process Timeline ─────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Requirement Analysis", desc: "Defining endpoints and business logic flow." },
  { num: "02", title: "Architecture", desc: "Mapping services and data models." },
  { num: "03", title: "Development", desc: "Agile coding of services and logic." },
  { num: "04", title: "Testing", desc: "Unit, integration, and load testing." },
  { num: "05", title: "Deployment", desc: "CI/CD pipelines to cloud production." },
  { num: "06", title: "Support", desc: "Ongoing optimization and updates." },
]

function Timeline() {
  const { ref, inView } = useViewAnim()
  const [active, setActive] = useState<number | null>(null)

  return (
    <Section style={{ background: C.bgDeep }}>
      <SectionHeading title="Development Roadmap" />
      <motion.div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, position: "relative" }}>
        {/* Connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: 28, left: 24, right: 24, height: 1,
            background: `linear-gradient(90deg, ${C.primary}, rgba(236,91,19,0.2))`,
            transformOrigin: "left", pointerEvents: "none",
          }}
        />
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={i * 0.12}
            onHoverStart={() => setActive(i)}
            onHoverEnd={() => setActive(null)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <motion.div
              animate={{ color: active === i ? C.primary : `rgba(236,91,19,0.22)`, scale: active === i ? 1.05 : 1 }}
              style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 12 }}
            >
              {s.num}
            </motion.div>
            {/* Active dot */}
            <motion.div
              animate={{ scale: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
              style={{ position: "absolute", top: 14, left: -4, width: 10, height: 10, borderRadius: "50%", background: C.primary }}
            />
            <h6 style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>{s.title}</h6>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// ─── Who We Serve ─────────────────────────────────────────────────────────────
const clients = [
  { icon: "🛒", title: "E-commerce", desc: "Handling high-volume transactions and inventory sync across global platforms." },
  { icon: "☁️", title: "SaaS Platforms", desc: "Scalable backends for multi-tenant applications with complex user permissions." },
  { icon: "🏢", title: "Enterprise", desc: "Internal tool orchestration and legacy system modernization." },
]

const metrics = [
  { val: "99.9%", label: "System Uptime Reliability" },
  { val: "40%", label: "Reduced Server Latency" },
  { val: "2.5x", label: "Faster Development Cycles" },
]

function WhoWeServe() {
  const { ref: refL, inView: inL } = useViewAnim()
  const { ref: refR, inView: inR } = useViewAnim()

  return (
    <Section style={{ background: C.bg }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>
        <div ref={refL}>
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inL ? "show" : "hidden"}
            style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 32 }}
          >
            Who We Serve
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {clients.map((c, i) => (
              <motion.div
                key={c.title}
                variants={fadeUp} initial="hidden" animate={inL ? "show" : "hidden"} custom={i * 0.12 + 0.1}
                whileHover={{ x: 6 }}
                style={{ display: "flex", gap: 20, alignItems: "flex-start", cursor: "pointer" }}
              >
                <motion.div
                  whileHover={{ background: C.primary, scale: 1.1 }}
                  style={{
                    flexShrink: 0, width: 48, height: 48, background: C.bgMuted,
                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, transition: "background 0.3s",
                  }}
                >
                  {c.icon}
                </motion.div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 4 }}>{c.title}</h4>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          ref={refR}
          variants={slideRight} initial="hidden" animate={inR ? "show" : "hidden"}
          style={{
            padding: 48, borderRadius: 24,
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: "#fff", boxShadow: `0 24px 60px ${C.primaryGlowStrong}`,
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.03em" }}>Business Impact</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {metrics.map(({ val, label }, i) => (
              <div key={label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inR ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.3 }}
                >
                  <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4, marginBottom: 20 }}>{label}</div>
                </motion.div>
                {i < metrics.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 20 }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { ref, inView } = useViewAnim()
  return (
    <Section style={{ background: C.bgMuted }}>
      <motion.div
        ref={ref}
        variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}
      >
        {/* Animated rings */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
          {[1, 2, 3].map(r => (
            <motion.div
              key={r}
              animate={{ scale: [1, 1.4 * r, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: r * 0.5 }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 60 * r, height: 60 * r, borderRadius: "50%",
                border: `1px solid ${C.primary}`,
                pointerEvents: "none",
              }}
            />
          ))}
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
          }}>🚀</div>
        </div>

        <h2 style={{ fontSize: "clamp(28px, 5vw, 50px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, marginBottom: 32, lineHeight: 1.1 }}>
          Let's build a system that grows with your business.
        </h2>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${C.primaryGlowStrong}` }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: "#fff", padding: "18px 44px", borderRadius: 14,
            fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer",
            boxShadow: `0 8px 28px ${C.primaryGlow}`,
            letterSpacing: "-0.01em",
          }}
        >
          Start Your Project →
        </motion.button>
      </motion.div>
    </Section>
  )
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100,
        background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`,
        scaleX, transformOrigin: "left",
      }}
    />
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function MicroServicePage() {
  return (
    <div style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(236,91,19,0.18); color: #ec5b13; }
        .hidden-mobile { display: flex; }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>

      <ScrollProgress />
      <CursorGlow />
      
      <Hero />
      <Overview />
      <Services />
      <ApiParadigms />
      <ArchViz />
      <IntegrationSecurity />
      <TechStack />
      <Timeline />
      <WhoWeServe />
      <FinalCTA />
    </div>
  )
}