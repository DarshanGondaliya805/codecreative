// CaseStudy.jsx
// npm install framer-motion
// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

import { useRef, useState, useEffect } from "react"
import {
    motion, useScroll, useTransform, useInView,
    useSpring, useMotionValue, AnimatePresence,
} from "framer-motion"

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
    primary: "#ec5b13",
    primaryDk: "#c44a0a",
    primaryLt: "#ff7a3d",
    primaryGlow: "rgba(236,91,19,0.14)",
    primaryGlowS: "rgba(236,91,19,0.07)",
    bg: "#f8f6f6",
    bgCard: "#ffffff",
    bgMuted: "#f2efef",
    bgDeep: "#ede9e9",
    bgDark: "#0f0b08",
    bgDarkCard: "#1c110b",
    bgDarkMid: "#251913",
    text: "#1b1b1d",
    textMuted: "#6b6560",
    textLight: "#9e9792",
    onDark: "#f6ded3",
    onDarkMuted: "rgba(246,222,211,0.55)",
    teal: "#9ecaff",
    border: "rgba(0,0,0,0.07)",
    borderOrange: "rgba(236,91,19,0.24)",
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useView() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return { ref, inView }
}

const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } }),
}

const Icon = ({ name, size = 22, color, fill = 0, style = {} }: any) => (
    <span className="material-symbols-outlined"
        style={{ fontSize: size, color, lineHeight: 1, fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' 24`, ...style }}>
        {name}
    </span>
)

// ─── Scroll progress ──────────────────────────────────────────────────────────
function ScrollBar() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 })
    return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: `linear-gradient(90deg,${C.primary},${C.primaryLt})`, scaleX, transformOrigin: "left" }} />
}

// ─── Cursor glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
    const x = useMotionValue(-400); const y = useMotionValue(-400)
    const sx = useSpring(x, { damping: 22, stiffness: 140 }); const sy = useSpring(y, { damping: 22, stiffness: 140 })
    useEffect(() => {
        const fn = (e: any) => { x.set(e.clientX); y.set(e.clientY) }
        window.addEventListener("mousemove", fn)
        return () => window.removeEventListener("mousemove", fn)
    }, [])
    return <motion.div style={{ position: "fixed", zIndex: 9999, pointerEvents: "none", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,91,19,0.05) 0%,transparent 70%)", left: sx, top: sy, translateX: "-50%", translateY: "-50%" }} />
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
    const { scrollY } = useScroll()
    const yP = useTransform(scrollY, [0, 500], [0, -70])
    const opP = useTransform(scrollY, [0, 400], [1, 0.25])

    return (
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 32px", paddingTop: 80, background: C.bgDark }}>
            {/* Radial glow */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%,rgba(245,97,27,0.09),transparent 65%)", pointerEvents: "none" }} />
            {/* Grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `linear-gradient(${C.primary} 1px,transparent 1px),linear-gradient(90deg,${C.primary} 1px,transparent 1px)`, backgroundSize: "56px 56px" }} />
            {/* Breathing orb */}
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", right: "6%", top: "15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.primaryGlow},transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />

            <motion.div style={{ y: yP, opacity: opP, maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", zIndex: 1 }}>
                {/* Left */}
                <div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(120,49,18,0.35)", border: `1px solid rgba(255,181,153,0.2)`, marginBottom: 24 }}>
                        <motion.span animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                            style={{ width: 7, height: 7, borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.onDark, fontFamily: "'Syne',sans-serif" }}>Mobile App Case Study</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 52 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(48px,7vw,88px)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.9, color: C.onDark, marginBottom: 24 }}>
                        Taxi<br />
                        <span style={{ background: `linear-gradient(135deg,${C.primary},#f5611b)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", position: "relative", display: "inline-block" }}>
                            Booking App
                            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${C.primary},transparent)`, transformOrigin: "left", borderRadius: 4 }} />
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                        style={{ fontSize: 17, color: C.onDarkMuted, maxWidth: 480, lineHeight: 1.72, marginBottom: 36, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                        A next-generation urban mobility solution designed for seamless ride-hailing, real-time fleet management, and secure passenger experiences.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: `0 16px 40px ${C.primaryGlow}` }} whileTap={{ scale: 0.96 }}
                            style={{ padding: "15px 32px", background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`, borderRadius: 12, color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: `0 6px 20px ${C.primaryGlow}` }}>
                            View Live Project
                        </motion.button>
                        <motion.button whileHover={{ background: "rgba(64,50,43,0.6)" }} whileTap={{ scale: 0.97 }}
                            style={{ padding: "15px 28px", background: "rgba(64,50,43,0.4)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,181,153,0.2)", borderRadius: 12, color: C.onDark, fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "'Syne',sans-serif", transition: "background 0.2s" }}>
                            The Brief
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right: App mockup */}
                <motion.div initial={{ opacity: 0, x: 64 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: "absolute", inset: -16, background: `rgba(236,91,19,0.2)`, filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
                    <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoA4BugtOrni0E91eqcLExZ-WJMQ9ll7cpX5q6sYnLjUnFDEtx7QZXcY13CznnMtlMY8iJJgayMmiOV9TeVoCDQfGs2_DPhEmeWnVsuZBf_iTkMhfGSqj2lW0Es6_U9GEZsz3Cfsot4JX7aiAv-L1Xu66oIKc_ic4IwwIyBd6dwVVeX0NmmEgyZsrIe9On44OglfGyUZao-N3WkpYzINLan4KgHs640-1QOugd-WrxgLcRyLzTeAqztQXG2Nz4nMW-6U1K30tPc2U"
                        alt="App mockup"
                        style={{ position: "relative", width: "100%", maxWidth: 420, borderRadius: 28, boxShadow: "0 40px 100px rgba(0,0,0,0.7)", border: "1px solid rgba(90,65,56,0.4)" }} />
                </motion.div>
            </motion.div>
        </section>
    )
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview() {
    const { ref: rL, inView: iL } = useView()
    const { ref: rR, inView: iR } = useView()
    return (
        <section style={{ padding: "96px 32px", background: C.bgDarkMid }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
                <motion.div ref={rL} initial={{ opacity: 0, x: -40 }} animate={iL ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: C.primary, marginBottom: 14, fontFamily: "'Syne',sans-serif" }}>The Problem</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: C.onDark, lineHeight: 1.3, marginBottom: 16 }}>Fragmented ride services and outdated real-time tracking left users frustrated and drivers inefficient.</h3>
                    <p style={{ fontSize: 15, color: C.onDarkMuted, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>Existing applications suffered from high latency in GPS updates, lack of localized payment support, and unintuitive user flows that led to high churn rates during peak hours.</p>
                </motion.div>
                <motion.div ref={rR} initial={{ opacity: 0, x: 40 }} animate={iR ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 14, fontFamily: "'Syne',sans-serif" }}>The Solution</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: C.onDark, lineHeight: 1.3, marginBottom: 16 }}>An integrated ecosystem focusing on low-latency synchronization and predictive dispatching.</h3>
                    <p style={{ fontSize: 15, color: C.onDarkMuted, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>We engineered a bespoke backend architecture that reduced latency to sub-200ms, implemented a bi-directional real-time communication layer, and a friction-free UI designed for one-handed operation.</p>
                </motion.div>
            </div>
        </section>
    )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
    { icon: "location_on", iconFill: 1, color: C.primary, bg: "rgba(236,91,19,0.12)", title: "Real-time Tracking", desc: "Proprietary GPS polling algorithms ensure driver locations are updated with pin-point accuracy every second." },
    { icon: "shield", iconFill: 1, color: C.teal, bg: "rgba(158,202,255,0.1)", title: "Secure Payments", desc: "PCI-DSS compliant multi-gateway integration supporting crypto, credit cards, and local digital wallets." },
    { icon: "smart_toy", iconFill: 1, color: "#ffb599", bg: "rgba(255,181,153,0.1)", title: "AI Dispatching", desc: "Neural networks predict high-demand areas to pre-position drivers, reducing wait times by 35%." },
]

function Features() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", background: C.bgDark }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ marginBottom: 56 }}>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, marginBottom: 10 }}>Core Intelligence</h2>
                    <p style={{ fontSize: 16, color: C.onDarkMuted, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>Deeply integrated features that define the premium ride experience.</p>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                    {features.map((f, i) => (
                        <motion.div key={f.title}
                            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -10, boxShadow: `0 24px 60px rgba(0,0,0,0.4),0 0 0 1px rgba(255,181,153,0.2)` }}
                            style={{ background: "rgba(64,50,43,0.4)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,181,153,0.18)", borderRadius: 24, padding: 36, cursor: "default", transition: "box-shadow 0.3s" }}>
                            <motion.div whileHover={{ scale: 1.1, rotate: 8 }}
                                style={{ width: 48, height: 48, borderRadius: 12, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                <Icon name={f.icon} size={26} color={f.color} fill={f.iconFill} />
                            </motion.div>
                            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: C.onDark, marginBottom: 10 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: C.onDarkMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const tech = ["React Native", "Node.js", "AWS Lambda", "MongoDB Atlas", "Redis", "Google Maps API"]

function TechStack() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "56px 32px", background: C.bgDarkMid, borderTop: "1px solid rgba(90,65,56,0.2)", borderBottom: "1px solid rgba(90,65,56,0.2)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                    style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.onDarkMuted, fontFamily: "'Syne',sans-serif" }}>
                    Engineered With
                </motion.div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {tech.map((t, i) => (
                        <motion.span key={t}
                            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.07 }}
                            whileHover={{ background: C.primary, color: "#fff", borderColor: C.primary, scale: 1.06 }}
                            style={{ padding: "8px 18px", borderRadius: 100, background: "rgba(53,39,32,0.8)", border: "1px solid rgba(90,65,56,0.3)", color: C.onDark, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "default", transition: "background 0.2s,color 0.2s,border 0.2s" }}>
                            {t}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Impact Stats ─────────────────────────────────────────────────────────────
const stats = [
    { val: "40%", label: "Faster Performance" },
    { val: "2M+", label: "Active Users" },
    { val: "4.9", label: "App Store Rating" },
    { val: "12s", label: "Avg. Match Time" },
]

function useCounter(target: any, isNumber: any, active: any) {
    const [count, setCount] = useState("0")
    useEffect(() => {
        if (!active || !isNumber) { setCount(target); return }
        const num = parseFloat(target)
        let n = 0; const steps = 50; const inc = num / steps
        const t = setInterval(() => {
            n = Math.min(n + inc, num)
            setCount(Number.isInteger(num) ? Math.floor(n).toLocaleString() : n.toFixed(1))
            if (n >= num) clearInterval(t)
        }, 25)
        return () => clearInterval(t)
    }, [active])
    return count
}

function StatCard({ stat, delay, inView }: any) {
    const isNum = /^\d/.test(stat.val) && !stat.val.includes("+") && !stat.val.includes("s")
    const num = useCounter(stat.val, isNum, inView)
    return (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, background: "rgba(236,91,19,0.08)" }}
            style={{ textAlign: "center", background: "rgba(64,50,43,0.25)", borderRadius: 20, padding: "40px 20px", border: "1px solid rgba(255,181,153,0.1)", transition: "background 0.3s" }}>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: delay + 0.1, type: "spring", stiffness: 260, damping: 14 }}
                style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,4vw,54px)", fontWeight: 900, letterSpacing: "-0.05em", color: C.primary, lineHeight: 1, marginBottom: 10 }}>
                {isNum ? num : stat.val}
            </motion.div>
            <div style={{ fontSize: 13, color: C.onDarkMuted, fontFamily: "'DM Sans',sans-serif" }}>{stat.label}</div>
        </motion.div>
    )
}

function Impact() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", background: `rgba(245,97,27,0.04)` }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
                <motion.h2 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, marginBottom: 56 }}>
                    The <span style={{ color: C.primary }}>Impact</span>
                </motion.h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                    {stats.map((s, i) => <StatCard key={s.val} stat={s} delay={i * 0.12} inView={inView} />)}
                </div>
            </div>
        </section>
    )
}

// ─── UI Gallery ───────────────────────────────────────────────────────────────
const gallery = [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx6D7yRxtOE3bRbbKg6FyVoc--SFeukglhb6bq9dY-tXQZslqRTBRWgf4QKccVNZVrpapQKwTvrCupq6A3OfNtSAt9hQh0jDTi6n_FOyiCPwgpF7_Z9b7k1PJXAw-L_00G6MpnWTpVgy3D1YBARKbekN0r0-_1MKzs0seHl1ux9ilDnQ0AWGjT37ZTyB_FOJk2SktqqhzHDB7gOnFIcWWBxrQEmkc6_nT9q2PZIr1acfS4C4ukLB4Ei308HKouZmaCwVTS1nh1b1Q", alt: "Booking" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc8lasIKWQnEet2L4hYmS9hwJ7aRDm-Tf_QN50DGRez20lt2LQCfFrBGW9P-cZ4djb7m0uYVAwtwA9yVEYYGrf-xTmGZDWrnN3zZo5jPZ-pSiWRVmEV11ktDqUc0HMg1ym5fQN3QemhS2MQYo8dRjANwMUOr2__yZhO2fVvn3bCPAU6p4VgLqtg735AZOwTk5iIR8kBdvn5z2I0qhL_MU56zThrynq2GeFTTYO0NTtuxuB7qasFGzdVAyh1dr9Zlk0Moepm9j_FGA", alt: "Tracking" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC6IYd5iMcNs0ulFH5ae3RrvTbiqmijZmgoUU5pt9korlj2IJmAaikUfZpd94_TRhrerID7fpIhhGxZRgcnzyZbYuVWoAPUQRuAZyU8HqpaBpyzgtL8Bc3A_mC4AaI3t0Cll200Pt-wvTfdgyys9pu1tncoFilTWkRJXXDWo91nPSKqE2wKVUZPyYQ1cRvpM50LrlnWBLSCyIRWXxw-Q4HJSQ6sbSZstNJ7IZDWjo4eUSxmq6u9BzUe2HAnncEMXjcPJSHOr2XTR4", alt: "Payment" },
]

function Gallery() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", background: C.bgDark }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
                    <div>
                        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, marginBottom: 6 }}>The Interface</h2>
                        <p style={{ fontSize: 15, color: C.onDarkMuted, fontFamily: "'DM Sans',sans-serif" }}>A clean, functional design language.</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        {["arrow_back", "arrow_forward"].map(ico => (
                            <motion.button key={ico} whileHover={{ background: `rgba(236,91,19,0.2)`, scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(64,50,43,0.4)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,181,153,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                                <Icon name={ico} size={20} color={C.onDark} />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "end" }}>
                    {gallery.map((g, i) => (
                        <motion.div key={g.alt}
                            initial={{ opacity: 0, y: 60 + (i * 20) }} animate={inView ? { opacity: 1, y: i === 0 ? 0 : i === 1 ? 48 : 96 } : {}} transition={{ delay: i * 0.14, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.03, zIndex: 10 }}
                            style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "9/16", background: "rgba(41,29,23,1)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
                            <img src={g.src} alt={g.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Process ──────────────────────────────────────────────────────────────────
const processSteps = [
    { n: "01", title: "Research", desc: "Market analysis & user persona mapping." },
    { n: "02", title: "Design", desc: "Wireframing & interactive high-fi prototyping." },
    { n: "03", title: "Dev", desc: "Agile sprints & modular architecture building." },
    { n: "04", title: "Test", desc: "Beta testing & rigorous security auditing." },
    { n: "05", title: "Deploy", desc: "CI/CD automation & global rollout." },
]

function Process() {
    const { ref, inView } = useView()
    const lineRef = useRef(null)
    const lineInView = useInView(lineRef, { once: true })
    return (
        <section style={{ padding: "96px 32px", background: "rgba(22,12,7,1)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.h2 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, textAlign: "center", marginBottom: 72 }}>
                    Architectural <span style={{ color: C.primary }}>Journey</span>
                </motion.h2>
                <div ref={lineRef} style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: 28, left: 0, right: 0, height: 1, background: "rgba(90,65,56,0.25)" }} />
                    <motion.div initial={{ scaleX: 0 }} animate={lineInView ? { scaleX: 1 } : {}} transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "absolute", top: 28, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${C.primary},rgba(236,91,19,0.2))`, transformOrigin: "left" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24, position: "relative", zIndex: 1 }}>
                        {processSteps.map((s, i) => (
                            <motion.div key={s.n}
                                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.14, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                                <motion.div whileHover={{ scale: 1.12, background: `rgba(236,91,19,0.25)`, borderColor: C.primary }}
                                    style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(53,39,32,0.8)", border: `1px solid rgba(236,91,19,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 16, transition: "all 0.3s", cursor: "default" }}>
                                    {s.n}
                                </motion.div>
                                <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: C.onDark, fontSize: 15 }}>{s.title}</h4>
                                <p style={{ fontSize: 12, color: C.onDarkMuted, lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif" }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── Challenges ────────────────────────────────────────────────────────────────
const challenges = [
    {
        icon: "warning", accentColor: C.primary,
        title: "Challenge: Battery Optimization",
        problem: "Continuous GPS tracking was draining driver device batteries in less than 4 hours.",
        solutionLabel: "The Engineering Solution", solutionLabelColor: C.primary,
        solution: "We implemented geofencing-based polling rates—decreasing frequency when stationary and increasing during active trips, resulting in a 60% reduction in battery consumption."
    },
    {
        icon: "bolt", accentColor: C.teal,
        title: "Challenge: Surge Pricing Latency",
        problem: "Dynamic pricing calculations were lagging, causing price mismatches between request and confirmation.",
        solutionLabel: "The Engineering Solution", solutionLabelColor: C.teal,
        solution: "Shifted logic to the edge via AWS Lambda@Edge, caching heat-map data locally to provide instant, immutable quotes during the 60-second booking window."
    },
]

function Challenges() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", background: C.bgDark }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <motion.h2 ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, marginBottom: 48 }}>
                    Overcoming <span style={{ color: C.primary }}>Hurdles</span>
                </motion.h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {challenges.map((c, i) => (
                        <motion.div key={c.title}
                            initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.18, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ boxShadow: `0 16px 48px rgba(0,0,0,0.4),0 0 0 1px ${c.accentColor}22` }}
                            style={{ padding: "36px 40px", borderRadius: 24, background: "rgba(41,29,23,0.8)", borderLeft: `4px solid ${c.accentColor}`, transition: "box-shadow 0.3s" }}>
                            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, color: C.onDark, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                                <Icon name={c.icon} size={22} color={c.accentColor} />
                                {c.title}
                            </h4>
                            <p style={{ fontSize: 14, color: C.onDarkMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif", marginBottom: 20 }}>{c.problem}</p>
                            <div style={{ borderTop: "1px solid rgba(90,65,56,0.25)", paddingTop: 20 }}>
                                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", color: c.solutionLabelColor, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{c.solutionLabel}</div>
                                <p style={{ fontSize: 15, color: C.onDark, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>{c.solution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Global Offices ───────────────────────────────────────────────────────────
const offices = [
    { city: "Surat", sub: "Innovation Hub, IT Park" },
    { city: "Mumbai", sub: "BKC FinTech Center" },
    { city: "Dubai", sub: "DIFC Innovation Ave" },
    { city: "London", sub: "Silicon Roundabout" },
]

function Offices() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", background: C.bgDarkMid }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center", marginBottom: 56 }}>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, marginBottom: 8 }}>Global <span style={{ color: C.primary }}>Presence</span></h2>
                    <p style={{ fontSize: 15, color: C.onDarkMuted, fontFamily: "'DM Sans',sans-serif" }}>Available wherever you need innovation.</p>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                    {offices.map((o, i) => (
                        <motion.div key={o.city}
                            initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, background: "rgba(64,50,43,0.6)", borderColor: `rgba(236,91,19,0.35)`, boxShadow: `0 16px 40px rgba(0,0,0,0.3)` }}
                            style={{ background: "rgba(64,50,43,0.4)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,181,153,0.18)", borderRadius: 16, padding: "24px", transition: "all 0.3s", cursor: "default" }}>
                            <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 19, color: C.onDark, marginBottom: 6 }}>{o.city}</h4>
                            <p style={{ fontSize: 13, color: C.onDarkMuted, marginBottom: 16, fontFamily: "'DM Sans',sans-serif" }}>{o.sub}</p>
                            <motion.a href="#" whileHover={{ x: 4 }} style={{ color: C.primary, fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Syne',sans-serif", display: "inline-flex", alignItems: "center", gap: 4 }}>
                                GET DIRECTIONS <Icon name="north_east" size={14} color={C.primary} />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function Contact() {
    const { ref, inView } = useView()
    const [sent, setSent] = useState(false)
    const [focused, setFocused] = useState<any>(null)
    const inp: any = (field: any) => ({
        width: "100%", background: "rgba(22,12,7,0.9)", border: "none", borderRadius: 12, padding: "14px 16px",
        color: C.onDark, fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "none",
        boxShadow: focused === field ? `0 0 0 2px rgba(236,91,19,0.4)` : "none", transition: "box-shadow 0.2s"
    })
    return (
        <section style={{ padding: "96px 32px", background: C.bgDark }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ borderRadius: 28, background: "linear-gradient(135deg,rgba(64,50,43,0.8),rgba(28,17,11,0.9))", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)", border: "0.5px solid rgba(255,181,153,0.12)", position: "relative" }}>
                    <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: `rgba(236,91,19,0.08)`, borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {/* Left info */}
                        <div style={{ padding: "52px", display: "flex", flexDirection: "column", gap: 20 }}>
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark }}>Start Your <span style={{ color: C.primary }}>Project</span></h2>
                            <p style={{ fontSize: 15, color: C.onDarkMuted, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>Ready to transform your industry with a bespoke digital solution? Let's build the future together.</p>
                            {[{ icon: "mail", val: "hello@codecreative.io" }, { icon: "call", val: "+1 (555) 000-0000" }].map(c => (
                                <motion.div key={c.val} whileHover={{ x: 4 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <Icon name={c.icon} size={20} color={C.primary} />
                                    <span style={{ fontSize: 15, color: C.onDark, fontFamily: "'DM Sans',sans-serif" }}>{c.val}</span>
                                </motion.div>
                            ))}
                        </div>
                        {/* Right form */}
                        <div style={{ padding: "52px", background: "rgba(64,50,43,0.4)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,181,153,0.18)", borderRadius: "0 28px 28px 0", position: "relative", overflow: "hidden" }}>
                            <AnimatePresence>
                                {sent && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ position: "absolute", inset: 0, borderRadius: "0 28px 28px 0", background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 10 }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} style={{ fontSize: 52 }}>🚀</motion.div>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, color: "#fff" }}>Message Sent!</div>
                                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", textAlign: "center", maxWidth: 260 }}>We'll be in touch within 24 hours to discuss your project.</div>
                                        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setSent(false)}
                                            style={{ marginTop: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 10, padding: "10px 24px", fontFamily: "'Syne',sans-serif", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
                                            Send Another
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[{ label: "Name", type: "text", ph: "John Doe", field: "name" }, { label: "Email", type: "email", ph: "john@example.com", field: "email" }].map((f: any) => (
                                    <div key={f.field}>
                                        <label style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: C.onDarkMuted, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{f.label}</label>
                                        <input type={f.type} placeholder={f.ph} required onFocus={() => setFocused(f.field)} onBlur={() => setFocused(null)} style={inp(f.field)} />
                                    </div>
                                ))}
                                <div>
                                    <label style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: C.onDarkMuted, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>Message</label>
                                    <textarea rows={4} placeholder="Tell us about your idea..." onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} style={inp("msg")} />
                                </div>
                                <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: `0 0 28px rgba(245,97,27,0.35)` }} whileTap={{ scale: 0.97 }}
                                    style={{ padding: "14px", background: C.primary, color: "#fff", border: "none", borderRadius: 12, fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 14, cursor: "pointer", letterSpacing: "0.04em" }}>
                                    Send Message →
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
    const { ref, inView } = useView()
    return (
        <section style={{ padding: "96px 32px", textAlign: "center", background: C.bgDark, position: "relative", overflow: "hidden" }}>
            {[1, 2, 3].map(r => (
                <motion.div key={r} animate={{ scale: [1, 1.5 * r, 1], opacity: [0.18, 0, 0.18] }} transition={{ duration: 3, repeat: Infinity, delay: r * 0.6 }}
                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80 * r, height: 80 * r, borderRadius: "50%", border: `1px solid ${C.primary}`, pointerEvents: "none" }} />
            ))}
            <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,54px)", fontWeight: 900, letterSpacing: "-0.05em", color: C.onDark, marginBottom: 20 }}>
                    Have a similar <span style={{ color: C.primary }}>idea?</span>
                </h2>
                <p style={{ fontSize: 17, color: C.onDarkMuted, lineHeight: 1.68, marginBottom: 40, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                    Our engineering team is ready to scale your vision. From concept to global deployment, we are your strategic technology partner.
                </p>
                <motion.button whileHover={{ scale: 1.06, boxShadow: `0 20px 50px rgba(236,91,19,0.4)` }} whileTap={{ scale: 0.95 }}
                    style={{ padding: "17px 48px", background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`, color: "#fff", border: "none", borderRadius: 100, fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 17, cursor: "pointer", boxShadow: `0 8px 28px ${C.primaryGlow}`, letterSpacing: "-0.02em" }}>
                    Hire Developers
                </motion.button>
            </motion.div>
        </section>
    )
}


// ─── App ──────────────────────────────────────────────────────────────────────
export default function CaseStudy() {
    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif", background: C.bgDark, color: C.onDark, overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(236,91,19,0.25); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0f0b08; }
        ::-webkit-scrollbar-thumb { background:#ec5b13; border-radius:3px; }
        .material-symbols-outlined {
          font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
          font-family:'Material Symbols Outlined';
          display:inline-block; line-height:1; vertical-align:middle;
        }
        @media(max-width:900px){
          .two-col { grid-template-columns:1fr !important; }
          .three-col { grid-template-columns:1fr 1fr !important; }
          .five-col { grid-template-columns:repeat(3,1fr) !important; }
          .four-col { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:600px){
          .three-col,.four-col,.five-col { grid-template-columns:1fr !important; }
        }
      `}</style>

            <ScrollBar />
            <CursorGlow />
            <main>
                <Hero />
                <Overview />
                <Features />
                <TechStack />
                <Impact />
                <Gallery />
                <Process />
                <Challenges />
                <Offices />
                <Contact />
                <BottomCTA />
            </main>
        </div>
    )
}