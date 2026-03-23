"use client"

import React, { useRef } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
} from "framer-motion"

// ─── Light theme tokens (using the specified variables) ────────────────────────
const T = {
    primary: "#ec5b13",
    primaryLight: "rgba(236,91,19,0.08)",
    primaryMid: "rgba(236,91,19,0.15)",
    primaryBorder: "rgba(236,91,19,0.20)",
    primaryShadow: "rgba(236,91,19,0.22)",
    tertiary: "#1b7fd4",
    tertiaryLight: "rgba(27,127,212,0.10)",
    tertiaryBorder: "rgba(27,127,212,0.20)",

    bg: "#f8f6f6",   // --background-light
    bgDark: "#221610",   // --background-dark
    surface: "#ffffff",
    surfaceAlt: "#f2eeeb",
    surfaceCard: "#faf8f7",

    text: "#1a0c06",
    textMid: "#5c3d2c",
    textMuted: "#9a7060",
    textFaint: "#c4a898",

    border: "rgba(236,91,19,0.13)",
    borderMid: "rgba(236,91,19,0.22)",
    divider: "rgba(26,12,6,0.08)",
}

// ─── Animation variants ────────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const

const fadeUp = {
    hidden: { opacity: 0, y: 44 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.72, delay: i * 0.11, ease },
    }),
}

const scaleUp: any = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: (i = 0) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.6, delay: i * 0.09, ease: [0.34, 1.56, 0.64, 1] },
    }),
}
const slideRight: any = {
    hidden: { opacity: 0, x: -40 },
    visible: (i = 0) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease },
    }),
}
const slideLeft: any = {
    hidden: { opacity: 0, x: 40 },
    visible: (i = 0) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease },
    }),
}

// ─── Scroll-triggered reveal wrapper ──────────────────────────────────────────
function Reveal({
    children, className = "", style = {},
}: {
    children: React.ReactNode; className?: string; style?: React.CSSProperties
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-70px" })
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
            {children}
        </motion.div>
    )
}

// ─── Magnetic CTA button ───────────────────────────────────────────────────────
function MagBtn({
    children, href, style = {},
}: {
    children: React.ReactNode; href?: string; style?: React.CSSProperties
}) {
    const x = useSpring(0, { stiffness: 260, damping: 28 })
    const y = useSpring(0, { stiffness: 260, damping: 28 })
    function onMove(e: React.MouseEvent<HTMLElement>) {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.22)
        y.set((e.clientY - r.top - r.height / 2) * 0.22)
    }
    function onLeave() { x.set(0); y.set(0) }

    const Tag = href ? motion.a : motion.button
    return (
        <Tag
            href={href}
            style={{ x, y, ...style } as any}
            onMouseMove={onMove as any}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.04, boxShadow: `0 16px 40px ${T.primaryShadow}` }}
            whileTap={{ scale: 0.96 }}
        >
            {children}
        </Tag>
    )
}

// ─── Animated horizontal rule ─────────────────────────────────────────────────
function AnimLine({ color = T.primary }: { color?: string }) {
    return (
        <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ display: "inline-block", width: "3rem", height: "1px", background: color, transformOrigin: "left", verticalAlign: "middle", marginRight: "0.75rem" }}
        />
    )
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const collectCards = [
    { icon: "person", title: "Personal Info", desc: "Names, email addresses, phone numbers, and company details provided during project inquiries." },
    { icon: "memory", title: "Technical Data", desc: "IP addresses, browser types, device identifiers, and operating system versioning." },
    { icon: "analytics", title: "Usage Data", desc: "Navigation patterns, time spent on specific pages, and interaction telemetry." },
]

const useItems = [
    { title: "Service Delivery", desc: "To provide, maintain, and improve the specific digital products we develop for you." },
    { title: "Experience Optimization", desc: "Personalizing your interface and remembering your preferences for future sessions." },
    { title: "Strategic Communication", desc: "Sending technical notices, updates, security alerts, and support messages." },
    { title: "Advanced Analytics", desc: "Monitoring trends and usage to enhance our underlying technology stack." },
]

const borderItems = [
    { color: T.primary, title: "Third-Party Links", desc: "Our site may contain links to external sites not operated by us. We have no control over the content and practices of these sites." },
    { color: T.tertiary, title: "Data Retention", desc: "We retain personal information for as long as necessary to provide services and comply with legal obligations." },
]

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
    const heroFade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: ${T.bg};
          color: ${T.text};
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .hl { font-family: 'Space Grotesk', sans-serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal; font-size: 24px;
          line-height: 1; letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap; word-wrap: normal;
          direction: ltr; font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
          user-select: none; vertical-align: middle;
        }
        ::selection { background: rgba(236,91,19,0.14); }
        a { text-decoration: none; color: inherit; }

        /* ── Glass panel — light version ── */
        .glass-panel {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${T.border};
          box-shadow: 0 2px 20px rgba(26,12,6,0.06);
        }

        /* ── Dot grid texture ── */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(236,91,19,0.10) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* ── Pulse badge ── */
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(236,91,19,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(236,91,19,0); }
        }
        .pulse-dot { animation: pulse-ring 2s ease-in-out infinite; }

        /* ── Glow blob ── */
        .glow {
          filter: blur(80px);
          background: radial-gradient(circle, rgba(236,91,19,0.13) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Shimmer on hover cards ── */
        .shimmer-wrap { overflow: hidden; position: relative; }
        .shimmer-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .shimmer-wrap:hover::after {
          transform: translateX(200%);
          transition: transform 0.55s ease;
        }
      `}</style>

            <main style={{ background: T.bg, overflowX: "hidden", minHeight: "100vh" }}>

                {/* ══════════════════ HERO ══════════════════════════════════════════════ */}
                <header ref={heroRef} style={{ position: "relative", paddingTop: "6rem", paddingBottom: "4rem", paddingInline: "2rem", overflow: "hidden" }}>
                    {/* dot grid */}
                    <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />
                    {/* glow blobs */}
                    <motion.div style={{ y: heroY, position: "absolute", top: "-10%", right: "-5%", width: "520px", height: "520px" }} className="glow"
                    />
                    <div className="glow" style={{ position: "absolute", top: "-10%", right: "-5%", width: "520px", height: "520px" }} />
                    <div className="glow" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "340px", height: "340px", background: "radial-gradient(circle, rgba(27,127,212,0.09) 0%, transparent 70%)" }} />

                    <motion.div style={{ opacity: heroFade, y: heroY, position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto" }}>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease }}
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.9rem", borderRadius: "9999px", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, marginBottom: "1.75rem" }}
                        >
                            <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "9999px", background: T.primary, display: "inline-block", flexShrink: 0 }} />
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.13em", color: T.primary, textTransform: "uppercase", fontFamily: "Space Grotesk" }}>
                                Legal Documentation
                            </span>
                        </motion.div>

                        {/* H1 */}
                        <motion.h1
                            className="hl"
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.1, ease }}
                            style={{ fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, color: T.text, marginBottom: "1.5rem" }}
                        >
                            Privacy{" "}
                            <span style={{ background: `linear-gradient(135deg, ${T.primary}, #f97c42)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                Policy
                            </span>
                        </motion.h1>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease }}
                            style={{ fontSize: "clamp(1rem,2.5vw,1.25rem)", color: T.textMid, fontWeight: 300, maxWidth: "38rem", lineHeight: 1.75, marginBottom: "2rem" }}
                        >
                            Your privacy is important to us. Learn how we collect, use, and protect your information within our digital architecture.
                        </motion.p>

                        {/* Date */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: T.textMuted, fontWeight: 500 }}
                        >
                            <span className="material-symbols-outlined" style={{ color: T.primary, fontSize: "1.1rem" }}>calendar_today</span>
                            <span>Last Updated: October 24, 2024</span>
                        </motion.div>
                    </motion.div>
                </header>

                {/* ══════════════════ INTRODUCTION ══════════════════════════════════════ */}
                <section style={{ padding: "3rem 2rem 4rem" }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <motion.div
                            variants={scaleUp}
                            custom={0}
                            className="glass-panel"
                            style={{ padding: "clamp(2rem,4vw,3rem)", borderRadius: "2rem" }}
                            whileHover={{ boxShadow: `0 16px 56px ${T.primaryShadow}`, borderColor: T.primaryBorder }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.h2 variants={fadeUp} custom={0} className="hl"
                                style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "1.25rem", color: T.primary }}>
                                Introduction
                            </motion.h2>
                            <motion.p variants={fadeUp} custom={1}
                                style={{ fontSize: "1.05rem", color: T.textMid, lineHeight: 1.8 }}>
                                At Neural Kinetic, we are committed to maintaining the trust and confidence of all visitors to our website and clients of our digital services. This Privacy Policy outlines how we handle data with the same precision and care we apply to our engineering. It applies to all information collected through our website, mobile applications, and related services (collectively, "Services").
                            </motion.p>
                        </motion.div>
                    </Reveal>
                </section>

                {/* ══════════════════ INFORMATION WE COLLECT ════════════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: T.surfaceAlt }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, marginBottom: "3rem", color: T.text, display: "flex", alignItems: "center" }}>
                            <AnimLine />
                            Information We Collect
                        </motion.h2>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1.25rem" }}>
                            {collectCards.map((card, i) => (
                                <motion.div
                                    key={card.title}
                                    variants={scaleUp}
                                    custom={i}
                                    className="shimmer-wrap"
                                    whileHover={{ y: -6, boxShadow: `0 18px 48px rgba(26,12,6,0.09)`, borderColor: T.primaryBorder }}
                                    style={{ padding: "1.75rem", borderRadius: "1.25rem", background: T.surface, border: `1px solid ${T.border}`, cursor: "default", transition: "box-shadow 0.3s, border-color 0.3s" }}
                                >
                                    <motion.span
                                        className="material-symbols-outlined"
                                        style={{ color: T.tertiary, fontSize: "2rem", display: "block", marginBottom: "1rem" }}
                                        whileHover={{ scale: 1.18, rotate: -8 }}
                                        transition={{ type: "spring", stiffness: 260 }}
                                    >
                                        {card.icon}
                                    </motion.span>
                                    <h3 className="hl" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.65rem", color: T.text }}>{card.title}</h3>
                                    <p style={{ fontSize: "0.875rem", color: T.textMuted, lineHeight: 1.65 }}>{card.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ HOW WE USE ════════════════════════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: T.bg }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>

                            {/* Sticky left */}
                            <motion.div variants={slideRight} custom={0} style={{ position: "sticky", top: "7rem" }}>
                                <h2 className="hl" style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 700, marginBottom: "1rem", color: T.primary, lineHeight: 1.2 }}>
                                    How We Use Your Information
                                </h2>
                                <p style={{ color: T.textMid, marginBottom: "1.25rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
                                    We process data to orchestrate a seamless digital experience and ensure our engineering meets your specific requirements.
                                </p>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease }}
                                    style={{ width: "6rem", height: "3px", borderRadius: "99px", background: `linear-gradient(90deg, ${T.primary}, transparent)`, transformOrigin: "left" }}
                                />
                            </motion.div>

                            {/* Right list */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                                {useItems.map((item, i) => (
                                    <motion.li
                                        key={item.title}
                                        variants={slideLeft}
                                        custom={i}
                                        whileHover={{ x: 5, borderColor: T.primaryBorder, background: T.primaryLight }}
                                        style={{ listStyle: "none", display: "flex", gap: "1rem", padding: "1.1rem 1.25rem", borderRadius: "1rem", border: `1px solid ${T.border}`, background: T.surface, cursor: "default", transition: "background 0.25s, border-color 0.25s" }}
                                    >
                                        <motion.span
                                            className="material-symbols-outlined"
                                            style={{ color: T.primary, flexShrink: 0, marginTop: "0.1rem" }}
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            check_circle
                                        </motion.span>
                                        <div>
                                            <strong className="hl" style={{ display: "block", color: T.text, fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                                                {item.title}
                                            </strong>
                                            <span style={{ fontSize: "0.825rem", color: T.textMuted, lineHeight: 1.6 }}>{item.desc}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ COOKIES + DATA SHARING (BENTO) ════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: T.surfaceAlt }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "1.25rem" }}>

                            {/* Cookies card */}
                            <motion.div
                                variants={scaleUp} custom={0}
                                className="glass-panel shimmer-wrap"
                                whileHover={{ y: -4, boxShadow: `0 20px 56px rgba(26,12,6,0.08)` }}
                                style={{ padding: "2.25rem", borderRadius: "2rem" }}
                            >
                                <h3 className="hl" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem", color: T.text }}>
                                    <span className="material-symbols-outlined" style={{ color: T.tertiary }}>cookie</span>
                                    Cookies Policy
                                </h3>
                                <p style={{ color: T.textMid, lineHeight: 1.75, marginBottom: "1.25rem", fontSize: "0.925rem" }}>
                                    We use cookies and similar tracking technologies to track activity on our Services. These small data files are stored on your device and help us understand your journey through our digital architecture.
                                </p>
                                <motion.a
                                    href="#"
                                    whileHover={{ x: 4, color: T.primary }}
                                    style={{ color: T.tertiary, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", transition: "color 0.2s" }}
                                >
                                    Manage preferences
                                    <span className="material-symbols-outlined" style={{ fontSize: "0.9rem" }}>open_in_new</span>
                                </motion.a>
                            </motion.div>

                            {/* Data sharing card */}
                            <motion.div
                                variants={scaleUp} custom={1}
                                whileHover={{ y: -4, boxShadow: `0 20px 56px ${T.primaryShadow}`, borderColor: T.primaryBorder }}
                                style={{ padding: "2.25rem", borderRadius: "2rem", background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, transition: "box-shadow 0.3s, border-color 0.3s" }}
                            >
                                <h3 className="hl" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem", color: T.text }}>
                                    <motion.span
                                        className="material-symbols-outlined"
                                        style={{ color: T.primary }}
                                        whileHover={{ rotate: 15, scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 280 }}
                                    >
                                        share
                                    </motion.span>
                                    Data Sharing
                                </h3>
                                <p style={{ fontSize: "0.875rem", color: T.textMid, lineHeight: 1.75 }}>
                                    We do not sell your personal data. Sharing only occurs with vetted 3rd party service providers, for legal compliance, or during significant business operations.
                                </p>
                            </motion.div>
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ SECURITY + USER RIGHTS ════════════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: T.bg }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

                            {/* Security */}
                            <motion.div
                                variants={scaleUp} custom={0}
                                whileHover={{ y: -5, boxShadow: `0 20px 56px rgba(26,12,6,0.08)`, borderColor: T.primaryBorder }}
                                style={{ padding: "2.25rem", border: `1px solid ${T.border}`, borderRadius: "2rem", background: T.surface, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
                                    style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.875rem", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: `1px solid ${T.primaryBorder}` }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: T.primary, fontVariationSettings: "'FILL' 1" }}>shield</span>
                                </motion.div>
                                <h3 className="hl" style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.875rem", color: T.text }}>Data Security</h3>
                                <p style={{ color: T.textMid, lineHeight: 1.75, fontSize: "0.925rem" }}>
                                    We implement industry-standard encryption, secure server environments, and rigid access controls to safeguard your data against unauthorized access or disclosure.
                                </p>
                            </motion.div>

                            {/* User Rights */}
                            <motion.div
                                variants={scaleUp} custom={1}
                                whileHover={{ y: -5, boxShadow: `0 20px 56px rgba(27,127,212,0.08)`, borderColor: T.tertiaryBorder }}
                                style={{ padding: "2.25rem", border: `1px solid ${T.border}`, borderRadius: "2rem", background: T.surface, transition: "box-shadow 0.3s, border-color 0.3s", cursor: "default" }}
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: 20 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 180, delay: 0.18 }}
                                    style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.875rem", background: T.tertiaryLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: `1px solid ${T.tertiaryBorder}` }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: T.tertiary, fontVariationSettings: "'FILL' 1" }}>gavel</span>
                                </motion.div>
                                <h3 className="hl" style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.875rem", color: T.text }}>User Rights</h3>
                                <p style={{ color: T.textMid, lineHeight: 1.75, fontSize: "0.925rem" }}>
                                    You hold the right to access, delete, update, or port your data. You may also opt-out of marketing communications at any moment through your dashboard.
                                </p>
                            </motion.div>
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ THIRD PARTY + RETENTION ═══════════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: T.surfaceAlt }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.25rem" }}>
                        {borderItems.map((item, i) => (
                            <motion.div
                                key={item.title}
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                                style={{ borderLeft: `4px solid ${item.color}`, paddingLeft: "2rem", paddingBlock: "0.25rem", cursor: "default" }}
                            >
                                <motion.h3
                                    className="hl"
                                    initial={{ opacity: 0, x: -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: i * 0.12, ease }}
                                    style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: T.text }}
                                >
                                    {item.title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.12 + 0.15 }}
                                    style={{ color: T.textMid, lineHeight: 1.75, fontSize: "0.925rem" }}
                                >
                                    {item.desc}
                                </motion.p>
                            </motion.div>
                        ))}
                    </Reveal>
                </section>

                {/* ══════════════════ CTA BANNER ════════════════════════════════════════ */}
                <section style={{ padding: "4rem 2rem 6rem" }}>
                    <Reveal style={{ maxWidth: "56rem", margin: "0 auto" }}>
                        <motion.div
                            variants={scaleUp}
                            custom={0}
                            style={{ borderRadius: "2.5rem", background: T.bgDark, padding: "clamp(2.5rem,5vw,4rem)", textAlign: "center", border: `1px solid rgba(236,91,19,0.22)`, position: "relative", overflow: "hidden" }}
                        >
                            {/* inner glow */}
                            <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "400px", height: "400px", borderRadius: "9999px", background: "radial-gradient(circle, rgba(236,91,19,0.16) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
                            <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: "300px", height: "300px", borderRadius: "9999px", background: "radial-gradient(circle, rgba(27,127,212,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

                            <motion.h2
                                variants={fadeUp} custom={0}
                                className="hl"
                                style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", position: "relative", letterSpacing: "-0.02em" }}
                            >
                                Questions or Updates?
                            </motion.h2>

                            <motion.p
                                variants={fadeUp} custom={1}
                                style={{ color: "rgba(246,222,211,0.7)", marginBottom: "2.5rem", maxWidth: "30rem", marginInline: "auto", lineHeight: 1.75, position: "relative", fontSize: "1rem" }}
                            >
                                This policy may be updated periodically to reflect changes in our data architecture. For any privacy-related queries, please contact our intelligence office.
                            </motion.p>

                            <motion.div variants={fadeUp} custom={2} style={{ position: "relative" }}>
                                <MagBtn
                                    href="mailto:privacy@neuralkinetic.io"
                                    style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2.25rem", background: `linear-gradient(135deg, ${T.primary}, #f97c42)`, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", cursor: "pointer", fontSize: "0.95rem", fontFamily: "Space Grotesk", boxShadow: `0 8px 28px ${T.primaryShadow}` } as React.CSSProperties}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>mail</span>
                                    privacy@neuralkinetic.io
                                </MagBtn>
                            </motion.div>
                        </motion.div>
                    </Reveal>
                </section>

            </main>
        </>
    )
}