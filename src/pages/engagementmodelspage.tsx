"use client"

import React, { useRef, useState } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
    AnimatePresence,
} from "framer-motion"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C: any = {
    primary: "#ec5b13",
    primaryLight: "rgba(236,91,19,0.08)",
    primaryMid: "rgba(236,91,19,0.15)",
    primaryBorder: "rgba(236,91,19,0.18)",
    primaryShadow: "rgba(236,91,19,0.25)",

    bg: "#f8f6f6",
    bgDark: "#221610",
    surface: "#ffffff",
    surfaceAlt: "#f1efef",
    surfaceHigh: "#ebe9e9",

    text: "#221610",
    textMid: "#5a4138",
    textMuted: "#a98a7f",
    textFaint: "rgba(248,246,246,0.6)",

    border: "rgba(236,91,19,0.10)",
    borderMid: "rgba(236,91,19,0.20)",
    divider: "rgba(90,65,56,0.12)",
}

// ─── Animation presets ─────────────────────────────────────────────────────────
const ease: any = [0.25, 0.46, 0.45, 0.94] as const
const spring: any = { type: "spring", stiffness: 180, damping: 20 } as const

const fadeUp = {
    hidden: { opacity: 0, y: 44 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.72, delay: i * 0.11, ease } }),
}

const scaleUp: any = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] } }),
}


// ─── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({ children, style = {}, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-70px" })
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} style={style} className={className}>
            {children}
        </motion.div>
    )
}

// ─── Magnetic button ───────────────────────────────────────────────────────────
function MagBtn({ children, style = {}, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
    const x = useSpring(0, { stiffness: 280, damping: 28 })
    const y = useSpring(0, { stiffness: 280, damping: 28 })
    function onMove(e: React.MouseEvent<HTMLButtonElement>) {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.22)
        y.set((e.clientY - r.top - r.height / 2) * 0.22)
    }
    function onLeave() { x.set(0); y.set(0) }
    return (
        <motion.button style={{ x, y, ...style }} onMouseMove={onMove} onMouseLeave={onLeave}
            whileTap={{ scale: 0.96 }} onClick={onClick}>
            {children}
        </motion.button>
    )
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const overviewItems = [
    { icon: "payments", label: "Cost-effective" },
    { icon: "trending_up", label: "Scalable" },
    { icon: "dynamic_feed", label: "Flexible" },
    { icon: "visibility", label: "Transparent" },
]

const models = [
    {
        icon: "groups", title: "Dedicated Team", popular: false,
        desc: "A dedicated squad of engineers and designers fully integrated into your workflow for long-term excellence.",
        bullets: ["Monthly Billing", "Complete Control", "Unlimited Revisions"],
        btnLabel: "Hire a Team", variant: "outline" as const,
    },
    {
        icon: "account_balance_wallet", title: "Fixed Price", popular: true,
        desc: "Ideal for projects with well-defined scopes and strict deadlines. We deliver results at a locked-in cost.",
        bullets: ["Zero Risk", "Milestone Payments", "Delivery Guarantee"],
        btnLabel: "Get Quote", variant: "filled" as const,
    },
    {
        icon: "schedule", title: "Hourly Model", popular: false,
        desc: "Ultimate flexibility for ongoing maintenance, small features, or exploratory R&D tasks.",
        bullets: ["Pay-as-you-go", "Task Prioritization", "Daily Timesheets"],
        btnLabel: "Start Small", variant: "outline" as const,
    },
]

const tableRows = [
    { param: "Scope", vals: ["Evolving & Dynamic", "Well Defined", "Flexible/Ad-hoc"] },
    { param: "Budget", vals: ["Monthly Retainer", "Fixed Total", "Hourly Rate"] },
    { param: "Control", vals: ["High (Direct Management)", "Medium (Outcome Based)", "Low (Task Based)"] },
    { param: "Best For", vals: ["Enterprise Scale", "MVP Launch", "Maintenance"] },
]

const steps = [
    { n: "01", title: "Discussion", desc: "Initial requirements gathering and analysis.", filled: true },
    { n: "02", title: "Selection", desc: "Choosing the optimal model for your goals.", filled: false },
    { n: "03", title: "Allocation", desc: "Identifying and assigning the right talent.", filled: false },
    { n: "04", title: "Kickoff", desc: "Project launch and workflow integration.", filled: false },
    { n: "05", title: "Support", desc: "Ongoing management and optimization.", filled: false },
]

const industries = [
    { icon: "account_balance", label: "Fintech" },
    { icon: "medical_services", label: "Healthcare" },
    { icon: "shopping_cart", label: "E-commerce" },
    { icon: "smart_display", label: "Media" },
    { icon: "school", label: "EdTech" },
    { icon: "local_shipping", label: "Logistics" },
]

const faqs = [
    {
        q: "Can we switch models mid-project?",
        a: "Yes, Neural Amber is built for flexibility. We regularly help clients transition from Fixed Price to Dedicated Teams as their product reaches market-fit and scaling needs arise.",
    },
    {
        q: "How do you handle IP rights?",
        a: "All Intellectual Property rights are transferred to the client upon milestone payment completion. We sign strict NDAs and compliance agreements before kickoff.",
    },
    {
        q: "What is the minimum engagement duration?",
        a: "For Dedicated Teams, we typically suggest a 3-month minimum to ensure deep integration. Hourly and Fixed Price models can be as short as 2 weeks.",
    },
]

const testimonials = [
    {
        quote: "The dedicated team model from Neural Amber felt less like an agency and more like an extension of our own core engineering group. Simply exceptional.",
        name: "Marcus Chen", role: "CTO, Nexus Dynamics",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIyw-1GRVKikMfPNiPHgAlyGGBdPQBlko3BPCga--xZ2yMK4Z3nYcQXhqfdxMgTFtJOyabWlHj3UKDp9Am5jDs9m8_NQubYdvJ5NL3W1tLGfTubvnkbWlHNpBFoe_mkRt7-iWRI7I_HgEjLoZjh2H5F-j8qtcKSi9A1axE4dj53OZlgRPBBLk8zWWNikLHgWN491WDv--4E2LzWWlAHa5_1mVADF8HqtVPPniA-rxFdwJp0xBGWC94WzUIYUS1902uFg6kofA_Tjc",
    },
    {
        quote: "Their fixed-price MVP model allowed us to launch within 3 months with zero budget creep. Their transparency during the process was refreshing.",
        name: "Sarah Jenkins", role: "Founder, Bloom Health",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiCwsdJDFKljIGU1vd7UpywRf3BYbMphbnZf4iOsq7kRKxwuIoGq5BQfZOgqJwFdjiCxlzw7C5DhLixIDtwAdcIBwdQp2td-hvqyptErY85jZfkA7LSqLV7hQZ55Ub_SH7C9zAyLVupAcEfVo1jVDrOTLsGHASVgEYHZjVgGvquYmfsFobnqtyCcCixxQVh9d10NtsvpwcvCwU6YHUyaXKn8Y7cXIjdtanCUXOCVbGUZEAkY5Wvz1FYK1fugiS8eUpanLD9rWMojQ",
    },
]

// ─── FAQ Item component ────────────────────────────────────────────────────────
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div
            variants={fadeUp}
            custom={i}
            style={{ borderBottom: `1px solid ${C.divider}` }}
        >
            <motion.button
                onClick={() => setOpen(o => !o)}
                whileHover={{ color: C.primary }}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
            >
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "1rem", color: C.text, transition: "color 0.2s" }}>{q}</span>
                <motion.span
                    className="material-symbols-outlined"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    style={{ color: C.primary, flexShrink: 0 }}
                >
                    expand_more
                </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{ paddingBottom: "1.25rem", color: C.textMid, fontSize: "0.9rem", lineHeight: 1.75 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function EngagementModelsPage() {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
    const heroFade = useTransform(scrollYProgress, [0, 0.65], [1, 0])

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
          font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; user-select: none;
          vertical-align: middle;
        }
        ::selection { background: rgba(236,91,19,0.14); }
        a { text-decoration: none; color: inherit; }
        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid ${C.border};
          box-shadow: 0 2px 20px rgba(34,22,16,0.06);
        }
        .dot-bg {
          background-image: radial-gradient(circle, rgba(236,91,19,0.09) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(236,91,19,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(236,91,19,0); }
        }
        .pulse-dot { animation: pulse-ring 2s ease-in-out infinite; }
        .glow {
          filter: blur(90px);
          background: radial-gradient(circle, rgba(236,91,19,0.13) 0%, transparent 70%);
          pointer-events: none;
        }
        /* shimmer sweep on hover */
        .shimmer { overflow: hidden; position: relative; }
        .shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%);
          transform: translateX(-110%);
        }
        .shimmer:hover::after { transform: translateX(200%); transition: transform 0.5s ease; }
        table { border-collapse: collapse; width: 100%; }
      `}</style>

            <main style={{ background: C.bg, overflowX: "hidden" }}>

                {/* ══════════════════ HERO ══════════════════════════════════════════════ */}
                <section ref={heroRef} style={{ position: "relative", overflow: "hidden", padding: "6rem 2rem 5rem", background: `linear-gradient(135deg, ${C.bg} 0%, #fff0e9 100%)` }}>
                    <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }} />
                    <div className="glow" style={{ position: "absolute", top: "-10%", right: "-5%", width: "480px", height: "480px" }} />
                    <div className="glow" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "380px", height: "380px", opacity: 0.5 }} />

                    <motion.div style={{ opacity: heroFade, y: heroY, maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
                        <motion.div
                            initial="hidden" animate="visible"
                            style={{ maxWidth: "42rem" }}
                        >
                            {/* Badge */}
                            <motion.div variants={fadeUp} custom={0}
                                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "9999px", padding: "0.35rem 1rem", marginBottom: "1.75rem" }}>
                                <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "9999px", background: C.primary, display: "inline-block", flexShrink: 0 }} />
                                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.13em", color: C.primary, textTransform: "uppercase", fontFamily: "Space Grotesk" }}>
                                    Optimized Partnership
                                </span>
                            </motion.div>

                            {/* H1 */}
                            <motion.h1 variants={fadeUp} custom={1} className="hl"
                                style={{ fontSize: "clamp(3rem,7vw,5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, color: C.text, marginBottom: "1.5rem" }}>
                                Flexible{" "}
                                <span style={{ background: `linear-gradient(135deg, ${C.primary}, #f97c42)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                    Engagement
                                </span>
                                <br />Models
                            </motion.h1>

                            {/* Sub */}
                            <motion.p variants={fadeUp} custom={2}
                                style={{ fontSize: "1.1rem", color: C.textMid, lineHeight: 1.75, maxWidth: "34rem", marginBottom: "2.5rem" }}>
                                Scale your engineering capacity with precision. We offer tailored collaboration frameworks designed to align with your project complexity, budget, and desired level of control.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div variants={fadeUp} custom={3} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <MagBtn style={{ padding: "1rem 2.25rem", background: C.primary, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 8px 28px ${C.primaryShadow}` }}>
                                    Get Started
                                </MagBtn>
                                <MagBtn style={{ padding: "1rem 2.25rem", background: "rgba(255,255,255,0.72)", color: C.text, fontWeight: 700, borderRadius: "0.875rem", border: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "1rem", backdropFilter: "blur(12px)" }}>
                                    View Case Studies
                                </MagBtn>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ══════════════════ OVERVIEW PILLS ════════════════════════════════════ */}
                <section style={{ padding: "4rem 2rem", background: C.surface }}>
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
                            {overviewItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    variants={scaleUp}
                                    custom={i}
                                    whileHover={{ background: C.primaryLight, y: -4 }}
                                    style={{ padding: "1.5rem", borderRadius: "1.25rem", background: C.surfaceAlt, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem", cursor: "default", transition: "background 0.25s" }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.12, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 260 }}
                                        style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(34,22,16,0.07)" }}
                                    >
                                        <span className="material-symbols-outlined" style={{ color: C.primary }}>{item.icon}</span>
                                    </motion.div>
                                    <span className="hl" style={{ fontWeight: 700, fontSize: "0.9rem", color: C.text }}>{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ MODELS ════════════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem" }}>
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 className="hl" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 700, marginBottom: "0.75rem", color: C.text }}>
                                Choose Your Path to Success
                            </h2>
                            <p style={{ color: C.textMuted, maxWidth: "30rem", margin: "0 auto", fontSize: "0.975rem" }}>
                                Select the model that fits your operational needs and project lifecycle.
                            </p>
                        </motion.div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "start" }}>
                            {models.map((m, i) => (
                                <motion.div
                                    key={m.title}
                                    variants={scaleUp}
                                    custom={i}
                                    whileHover={!m.popular ? { y: -6, boxShadow: `0 24px 64px rgba(34,22,16,0.10)` } : {}}
                                    style={{
                                        background: C.surface,
                                        padding: "2.25rem",
                                        borderRadius: "0.875rem",
                                        border: m.popular ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
                                        boxShadow: m.popular ? `0 24px 64px ${C.primaryShadow}` : "0 4px 20px rgba(34,22,16,0.06)",
                                        display: "flex", flexDirection: "column",
                                        position: "relative",
                                        transform: m.popular ? "scale(1.04)" : "scale(1)",
                                        zIndex: m.popular ? 2 : 1,
                                        transition: "box-shadow 0.3s",
                                    }}
                                >
                                    {/* popular badge */}
                                    {m.popular && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ ...spring, delay: 0.3 }}
                                            style={{ position: "absolute", top: 0, right: "2rem", transform: "translateY(-50%)", background: C.primary, color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.25rem 0.875rem", borderRadius: "9999px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Space Grotesk" }}
                                        >
                                            Most Popular
                                        </motion.div>
                                    )}

                                    <motion.span
                                        className="material-symbols-outlined"
                                        style={{ color: C.primary, fontSize: "2.5rem", display: "block", marginBottom: "1.25rem" }}
                                        whileHover={{ scale: 1.15, rotate: -8 }}
                                        transition={{ type: "spring", stiffness: 260 }}
                                    >
                                        {m.icon}
                                    </motion.span>

                                    <h3 className="hl" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.875rem", color: C.text }}>{m.title}</h3>
                                    <p style={{ color: C.textMid, marginBottom: "1.5rem", flexGrow: 1, fontSize: "0.9rem", lineHeight: 1.7 }}>{m.desc}</p>

                                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                                        {m.bullets.map((b, bi) => (
                                            <motion.li
                                                key={b}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: bi * 0.07 + i * 0.05 + 0.2 }}
                                                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: C.textMid, listStyle: "none" }}
                                            >
                                                <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "1rem" }}>check_circle</span>
                                                {b}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <MagBtn
                                        style={{
                                            width: "100%", padding: "0.875rem", borderRadius: "0.75rem", fontWeight: 700, cursor: "pointer",
                                            fontSize: "0.9rem", fontFamily: "Space Grotesk",
                                            ...(m.variant === "filled"
                                                ? { background: C.primary, color: "#fff", border: "none", boxShadow: `0 6px 20px ${C.primaryShadow}` }
                                                : { background: "transparent", color: C.primary, border: `2px solid ${C.primary}` }),
                                        }}
                                    >
                                        {m.btnLabel}
                                    </MagBtn>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ COMPARISON TABLE ══════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem", background: C.surface }}>
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "3.5rem", color: C.text }}>
                            Deep Comparison
                        </motion.h2>

                        <motion.div variants={scaleUp} custom={0}
                            style={{ borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(34,22,16,0.07)", border: `1px solid ${C.border}` }}>
                            <table>
                                <thead>
                                    <tr style={{ background: C.surfaceAlt }}>
                                        {["Parameters", "Dedicated Team", "Fixed Price", "Hourly"].map((h) => (
                                            <th key={h} className="hl" style={{ padding: "1.25rem 1.5rem", fontWeight: 700, textAlign: "left", fontSize: "0.9rem", color: C.text, borderBottom: `1px solid ${C.divider}` }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map((row, ri) => (
                                        <motion.tr
                                            key={row.param}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: ri * 0.08 + 0.2 }}
                                            whileHover={{ background: C.primaryLight }}
                                            style={{ background: C.surface, transition: "background 0.2s", borderBottom: `1px solid ${C.divider}` }}
                                        >
                                            <td style={{ padding: "1.1rem 1.5rem", fontWeight: 700, fontSize: "0.9rem", color: C.text }}>{row.param}</td>
                                            {row.vals.map(v => (
                                                <td key={v} style={{ padding: "1.1rem 1.5rem", color: C.textMid, fontSize: "0.875rem" }}>{v}</td>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </Reveal>
                </section>

                {/* ══════════════════ PROCESS STEPS ════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem" }}>
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "4rem", color: C.text }}>
                            Onboarding Lifecycle
                        </motion.h2>

                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", position: "relative" }}>
                            {/* connector */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease }}
                                style={{ position: "absolute", top: "2rem", left: "10%", right: "10%", height: "2px", background: `linear-gradient(90deg, ${C.primary}, rgba(236,91,19,0.2))`, opacity: 0.25, transformOrigin: "left", pointerEvents: "none" }}
                            />

                            {steps.map((step, i) => (
                                <motion.div
                                    key={step.n}
                                    variants={fadeUp}
                                    custom={i * 0.9}
                                    style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -90 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ ...spring, delay: i * 0.13 }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        style={{
                                            width: "4rem", height: "4rem", borderRadius: "0.875rem", fontWeight: 700, fontSize: "1.1rem",
                                            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
                                            fontFamily: "Space Grotesk",
                                            ...(step.filled
                                                ? { background: C.primary, color: "#fff", boxShadow: `0 8px 28px ${C.primaryShadow}` }
                                                : { background: C.surface, color: C.primary, border: `2px solid ${C.primary}`, boxShadow: "0 4px 16px rgba(34,22,16,0.07)" }),
                                        }}
                                    >
                                        {step.n}
                                    </motion.div>
                                    <h4 className="hl" style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem", color: C.text }}>{step.title}</h4>
                                    <p style={{ fontSize: "0.8rem", color: C.textMuted, lineHeight: 1.55 }}>{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ INDUSTRIES ════════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem", background: C.surfaceAlt }}>
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "3.5rem", color: C.text }}>
                            Domain Expertise
                        </motion.h2>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem" }}>
                            {industries.map((ind, i) => (
                                <motion.div
                                    key={ind.label}
                                    variants={scaleUp}
                                    custom={i * 0.7}
                                    className="shimmer"
                                    whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(34,22,16,0.10)` }}
                                    style={{ background: C.surface, padding: "1.5rem 1rem", borderRadius: "1rem", textAlign: "center", boxShadow: "0 2px 12px rgba(34,22,16,0.05)", cursor: "default", border: `1px solid ${C.border}`, transition: "box-shadow 0.3s" }}
                                >
                                    <motion.span
                                        className="material-symbols-outlined"
                                        style={{ color: C.primary, fontSize: "1.875rem", display: "block", marginBottom: "0.6rem" }}
                                        whileHover={{ scale: 1.2, rotate: -8 }}
                                        transition={{ type: "spring", stiffness: 280 }}
                                    >
                                        {ind.icon}
                                    </motion.span>
                                    <div className="hl" style={{ fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{ind.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ FAQ ════════════════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem" }}>
                    <Reveal style={{ maxWidth: "52rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "3.5rem", color: C.text }}>
                            Engagement FAQ
                        </motion.h2>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {faqs.map((faq, i) => <FaqItem key={faq.q} q={faq.q} a={faq.a} i={i} />)}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ TESTIMONIALS ══════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem", background: C.surfaceHigh, overflow: "hidden", position: "relative" }}>
                    <div className="glow" style={{ position: "absolute", top: "-20%", right: "-5%", width: "400px", height: "400px", opacity: 0.4 }} />
                    <Reveal style={{ maxWidth: "80rem", margin: "0 auto" }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 700, textAlign: "center", marginBottom: "3.5rem", color: C.text }}>
                            Trusted by Innovators
                        </motion.h2>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    variants={scaleUp}
                                    custom={i}
                                    className="glass-card"
                                    whileHover={{ y: -6, boxShadow: `0 24px 64px ${C.primaryShadow}`, borderColor: C.primaryBorder }}
                                    style={{ padding: "2.5rem", borderRadius: "1.25rem", position: "relative", overflow: "hidden" }}
                                >
                                    {/* quote mark */}
                                    <span style={{ position: "absolute", top: "1.5rem", right: "2rem", fontSize: "5rem", color: C.primaryLight, fontFamily: "serif", lineHeight: 1, pointerEvents: "none" }}>"</span>

                                    {/* Stars */}
                                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1.25rem" }}>
                                        {[...Array(5)].map((_, si) => (
                                            <motion.span
                                                key={si}
                                                className="material-symbols-outlined"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 + si * 0.07, type: "spring", stiffness: 200 }}
                                                style={{ color: C.primary, fontSize: "1rem", fontVariationSettings: "'FILL' 1" }}
                                            >
                                                star
                                            </motion.span>
                                        ))}
                                    </div>

                                    <p style={{ fontSize: "1rem", fontStyle: "italic", color: C.text, lineHeight: 1.75, marginBottom: "1.75rem", position: "relative" }}>
                                        "{t.quote}"
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                                        <motion.img
                                            whileHover={{ scale: 1.08 }}
                                            src={t.img} alt={t.name}
                                            style={{ width: "3rem", height: "3rem", borderRadius: "9999px", objectFit: "cover", border: `2px solid ${C.primaryBorder}` }}
                                        />
                                        <div>
                                            <div className="hl" style={{ fontWeight: 700, fontSize: "0.9rem", color: C.text }}>{t.name}</div>
                                            <div style={{ fontSize: "0.75rem", color: C.textMuted }}>{t.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ══════════════════ CTA BANNER ════════════════════════════════════════ */}
                <section style={{ padding: "5rem 2rem", background: C.bgDark, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: C.primaryLight, pointerEvents: "none" }} />
                    <div className="glow" style={{ position: "absolute", top: "0", right: "0", width: "500px", height: "500px", opacity: 0.3 }} />

                    <Reveal style={{ maxWidth: "52rem", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                        <motion.h2 variants={fadeUp} custom={0} className="hl"
                            style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", fontWeight: 700, color: C.bg, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                            Not Sure Which Model<br />Fits Your Needs?
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={1}
                            style={{ color: C.textFaint, marginBottom: "2.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                            Schedule a free 15-minute consultation with our engagement architects to find your perfect fit.
                        </motion.p>
                        <motion.div variants={fadeUp} custom={2} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <MagBtn style={{ padding: "1rem 2.5rem", background: C.primary, color: "#fff", fontWeight: 700, borderRadius: "0.875rem", border: "none", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "1rem", boxShadow: `0 8px 32px ${C.primaryShadow}` }}>
                                Book Consultation
                            </MagBtn>
                            <MagBtn style={{ padding: "1rem 2.5rem", background: "rgba(255,255,255,0.06)", color: C.bg, fontWeight: 700, borderRadius: "0.875rem", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "Space Grotesk", fontSize: "1rem", backdropFilter: "blur(12px)" }}>
                                Download Pricing Guide
                            </MagBtn>
                        </motion.div>
                    </Reveal>
                </section>

            </main>
        </>
    )
}