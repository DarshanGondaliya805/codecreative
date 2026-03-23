import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Shared Styles ────────────────────────────────────────────────────────────
const C = {
    bg: "#fffbf8",
    bgAlt: "#fff7f3",
    bgCard: "#fff",
    surface: "#fff2eb",
    orange: "#f5611b",
    orangeLight: "#ffb599",
    orangeFaint: "rgba(245,97,27,0.08)",
    blue: "#1b95f1",
    blueLight: "#9ecaff",
    text: "#1c0d05",
    muted: "#7a5a48",
    border: "rgba(245,97,27,0.15)",
    grad: "linear-gradient(135deg,#ffb599,#f5611b)",
};

const glass = {
    background: "rgba(255,181,153,0.14)",
    backdropFilter: "blur(20px)",
    border: `1px solid ${C.border}`,
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: any = {
    hidden: { opacity: 0, y: 36 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const fadeIn: any = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.1 } }),
};
const scaleIn: any = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

function Section({ children, style = {}, className = "" }: any) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} style={style} className={className}>
            {children}
        </motion.div>
    );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,251,248,0.88)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <motion.div whileHover={{ rotate: 12, scale: 1.1 }}
                        style={{ width: 36, height: 36, borderRadius: 10, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 18, fontVariationSettings: "'FILL' 1" }}>deployed_code</span>
                    </motion.div>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, letterSpacing: "-0.02em" }}>Neural Amber</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="na-hide-mobile">
                    {["Home", "Services", "Portfolio", "Process", "Contact"].map(l => (
                        <motion.a key={l} href="#" whileHover={{ color: C.orange }}
                            style={{ fontSize: 13, fontWeight: 500, color: C.muted, textDecoration: "none" }}>{l}</motion.a>
                    ))}
                    <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 24px rgba(245,97,27,0.35)` }} whileTap={{ scale: 0.97 }}
                        style={{ background: C.grad, color: "#370e00", padding: "9px 22px", borderRadius: 12, fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer" }}>
                        Get Started
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

    return (
        <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, background: C.bg, overflow: "hidden" }}>
            {/* BG blobs */}
            <motion.div style={{ y: y1, position: "absolute", top: "-10%", left: "-8%", width: "45%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,97,27,0.11) 0%,transparent 70%)", pointerEvents: "none" }} />
            <motion.div style={{ y: y2, position: "absolute", bottom: "-10%", right: "-8%", width: "38%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(158,202,255,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 10 }} className="na-hero-grid">
                {/* Left */}
                <div>
                    <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: C.orangeFaint, border: `1px solid rgba(245,97,27,0.22)`, marginBottom: 28 }}>
                        <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: 8, height: 8, borderRadius: "50%", background: C.grad, display: "block" }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase" }}>Next-Gen UI/UX Studio</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
                        style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.4rem,4.5vw,4rem)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
                        Crafting Beautiful &{" "}
                        <motion.span
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            style={{ background: `linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            User-Centered
                        </motion.span>{" "}Digital Experiences
                    </motion.h1>

                    <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
                        style={{ color: C.muted, fontSize: 17, maxWidth: 480, marginBottom: 40, lineHeight: 1.75 }}>
                        We bridge the gap between human intuition and technical excellence to build interfaces that feel natural and perform flawlessly.
                    </motion.p>

                    <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <motion.button whileHover={{ scale: 1.04, boxShadow: `0 14px 36px rgba(245,97,27,0.4)` }} whileTap={{ scale: 0.97 }}
                            style={{ background: C.grad, color: "#370e00", padding: "16px 30px", borderRadius: 16, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: `0 6px 20px rgba(245,97,27,0.3)` }}>
                            Start Your Design Project
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.03, background: "rgba(245,97,27,0.07)" }} whileTap={{ scale: 0.97 }}
                            style={{ background: "rgba(245,97,27,0.04)", color: C.text, padding: "16px 30px", borderRadius: 16, fontWeight: 600, fontSize: 15, border: `1.5px solid rgba(245,97,27,0.2)`, cursor: "pointer" }}>
                            View Portfolio
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right – floating mockup cards */}
                <div style={{ position: "relative", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }} className="na-hero-right">
                    {/* Back card 1 */}
                    <motion.div
                        initial={{ opacity: 0, rotate: 10, x: 40 }} animate={{ opacity: 1, rotate: 6, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ rotate: 8, scale: 1.03 }}
                        style={{ position: "absolute", top: 0, right: 0, width: 220, height: 280, ...glass, borderRadius: 20, padding: 12, boxShadow: "0 20px 48px rgba(245,97,27,0.12)" }}>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaKE78r2CnkKDv5rO-ccV04W-8JAh3IH0dAs_rUlv9o67H-O56D8iQgz0eGeNlBJfXRhj-Z-3dBTEGgm0IP3aCeJ2o2m44wrwmR0Hv9-Bap0jwbaoLh4kwwc-peguyR-a3l0Sx2nYOLOVTrrqz7EFmKtDR1Hpc8RQHedBEA8Furk9lH7-tW47G9yLnnOaqnT6Ek2pugJDPMXuUvnmag3Vk2iWQYIA1JZxqfs_THWiqrq9yjWhMdqrvsYHoJA81CWMjrQgkDGwGkX4"
                            alt="Mobile app dashboard" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, opacity: 0.8 }} />
                    </motion.div>

                    {/* Back card 2 */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -16, x: -40 }} animate={{ opacity: 1, rotate: -12, x: 0 }}
                        transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ rotate: -10, scale: 1.03 }}
                        style={{ position: "absolute", bottom: 32, left: 0, width: 240, height: 160, ...glass, borderRadius: 20, padding: 12, boxShadow: "0 20px 48px rgba(27,149,241,0.12)" }}>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrjGI_xT56IwiHNORLEPL2EHEQwkEYonCXRtR4oChkwnxSW5-jNK5DBc-Z7HMhmzQvaUAXWMaohme-bZTnMB-ctyzaK2-a9QTJXDmijrGTv5aiyNoUABjbhyjuCJFqxd_83RrpMR7FelZi_H3BaOddk6mlWggJ2X2gwI2-8iErXlRtdxrfsSMa1fKcS8_tEtl3RxmtK8-u1HPEzglzUyWNbwMZ6aMIlLyco2J167FlXv94j42IDiKmhGZPbWfXVmj912vZzfKNTgI"
                            alt="UX wireframe" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, opacity: 0.65 }} />
                    </motion.div>

                    {/* Center phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }} 
                        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        animate={{ y: [0, -10, 0] } as any}
                        // transition={{ delay: 0.35, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 220, height: 420, ...glass, borderRadius: 40, border: `2.5px solid rgba(245,97,27,0.25)`, padding: 8, boxShadow: `0 32px 64px rgba(245,97,27,0.18)`, position: "relative", zIndex: 10 }}>
                        <div style={{ background: "#f0e8e2", height: "100%", borderRadius: 32, overflow: "hidden", position: "relative" }}>
                            <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 64, height: 16, background: "rgba(245,97,27,0.15)", borderRadius: 9999, zIndex: 2 }} />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAaLst50mGcNkxJ3NEKIIGXuu1AGjv85OjnPlpJLcJxKF9tzpblM4ar1QUse85vXhtgz13CX4RIRcbnGj1UmpPE53BB8mcZQ5bVnnIYsQOrHyOK-u4u0hLtROnPNHRJmPv99VWOBlWYVSBlbafEjLyHshMPl3CmIjBkUyL5kAIn2T1eE9DsBuXAZ1FTLtV1csc7tjWPnxbP4oIhLQxHms7ySL_zBylupP4y2a7MrFzQQHOk0IG6ZU2hXW1-frguTqNYDFX_VXyFrU"
                                alt="App prototype" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Services Bento ───────────────────────────────────────────────────────────
function Services() {
    const bentoCards = [
        { icon: "person_search", title: "UX Research", desc: "Data-driven insights to understand user behaviors and pain points.", accent: C.blue, span: 2 },
        { icon: "account_tree", title: "Wireframing", desc: "Architecting flows that convert.", accent: C.orange, span: 1 },
        { icon: "layers", title: "Design Systems", desc: "Scalable asset libraries.", accent: C.orange, span: 1 },
    ];

    return (
        <section style={{ padding: "96px 0", background: C.bgAlt }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <Section>
                    <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, marginBottom: 16 }}>Our Specializations</h2>
                        <p style={{ color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                            From discovery to deployment, a full spectrum of design services tailored for modern digital products.
                        </p>
                    </motion.div>
                </Section>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="na-bento-grid">
                    {/* Large UI Design */}
                    <Section style={{ gridColumn: "span 2", gridRow: "span 2" }}>
                        <motion.div variants={scaleIn} custom={0}
                            whileHover={{ y: -6, boxShadow: `0 24px 48px rgba(245,97,27,0.12)` }}
                            style={{ background: C.bgCard, borderRadius: 28, padding: 40, height: "100%", position: "relative", overflow: "hidden", border: `1.5px solid rgba(245,97,27,0.1)`, boxSizing: "border-box" }}>
                            <motion.span style={{ position: "absolute", top: 16, right: 16, fontSize: 120, color: "rgba(245,97,27,0.06)", lineHeight: 1 }}
                                animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}
                                className="material-symbols-outlined">design_services</motion.span>
                            <motion.div whileHover={{ background: C.grad, scale: 1.05 }}
                                style={{ width: 56, height: 56, borderRadius: 18, background: C.orangeFaint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transition: "background 0.3s" }}>
                                <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 26 }}>palette</span>
                            </motion.div>
                            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.6rem", fontWeight: 700, color: C.text, marginBottom: 16 }}>UI Design</h3>
                            <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 28, fontSize: 15 }}>
                                We create visually stunning interfaces that align perfectly with your brand identity and delight your users at every touchpoint.
                            </p>
                            {["Visual Language Development", "Micro-interactions"].map((item, i) => (
                                <motion.div key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                                    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 16 }}>check_circle</span>
                                    <span style={{ fontSize: 13, color: C.muted }}>{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Section>

                    {/* Small cards */}
                    {bentoCards.map((c, i) => (
                        <Section key={c.title} style={{ gridColumn: `span ${c.span}` }}>
                            <motion.div variants={fadeUp} custom={i + 1}
                                whileHover={{ y: -5, borderColor: "rgba(245,97,27,0.35)" }}
                                style={{ background: C.bgCard, borderRadius: 24, padding: 28, height: "100%", border: `1.5px solid rgba(245,97,27,0.1)`, boxSizing: "border-box", transition: "border-color 0.3s" }}>
                                <motion.div whileHover={{ background: C.grad }}
                                    style={{ width: 48, height: 48, borderRadius: 14, background: C.orangeFaint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "background 0.3s" }}>
                                    <span className="material-symbols-outlined" style={{ color: c.accent, fontSize: 22 }}>{c.icon}</span>
                                </motion.div>
                                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.text, marginBottom: 8 }}>{c.title}</h3>
                                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
                            </motion.div>
                        </Section>
                    ))}

                    {/* Bottom row */}
                    {[
                        { icon: "smartphone", title: "Mobile & Web Design", desc: "Seamless performance across all device form factors.", accent: C.orange },
                        { icon: "bolt", title: "Rapid Prototyping", desc: "Interactive models to test concepts before coding.", accent: C.blue },
                    ].map((c, i) => (
                        <Section key={c.title} style={{ gridColumn: "span 2" }}>
                            <motion.div variants={fadeUp} custom={i + 4}
                                whileHover={{ y: -5, boxShadow: `0 16px 36px rgba(245,97,27,0.1)` }}
                                style={{ background: C.bgCard, borderRadius: 24, padding: 28, display: "flex", alignItems: "center", gap: 20, border: `1.5px solid rgba(245,97,27,0.1)`, boxSizing: "border-box" }}>
                                <div style={{ width: 60, height: 60, borderRadius: 18, background: C.orangeFaint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span className="material-symbols-outlined" style={{ color: c.accent, fontSize: 28 }}>{c.icon}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.text, marginBottom: 6 }}>{c.title}</h3>
                                    <p style={{ color: C.muted, fontSize: 13 }}>{c.desc}</p>
                                </div>
                            </motion.div>
                        </Section>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Design Process ───────────────────────────────────────────────────────────
function Process() {
    const phases = [
        { num: "Phase 01", label: "Discovery", desc: "We dive deep into your business goals, target audience, and market landscape to define the core problem.", accent: C.orange, active: true },
        { num: "Phase 02", label: "Prototyping", desc: "Building high-fidelity interactive models that demonstrate look, feel, and functionality.", accent: C.muted, active: false },
        { num: "Phase 03", label: "Usability Testing", desc: "We validate designs with real users, gathering feedback to iterate and refine the experience.", accent: C.muted, active: false },
        { num: "Launch", label: "Dev Handoff", desc: "Pixel-perfect specs, assets, and documentation for a seamless development process.", accent: C.blue, active: true },
    ];

    const steps = ["Research & Discovery", "User Analysis", "Wireframing & UI"];

    return (
        <section style={{ padding: "96px 0", background: C.bg }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: 64 }} className="na-process-grid">
                    <Section>
                        <motion.div variants={fadeUp} custom={0}>
                            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 800, color: C.text, marginBottom: 20, lineHeight: 1.15 }}>Our Design Journey</h2>
                            <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 40, fontSize: 15 }}>
                                A structured methodology ensuring every pixel serves a purpose and every interaction adds value.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {steps.map((s, i) => (
                                    <motion.div key={s} variants={fadeUp} custom={i + 1} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <motion.div whileHover={{ scale: 1.1 }}
                                            style={{ width: 44, height: 44, borderRadius: "50%", background: i === 0 ? C.grad : "transparent", border: i === 0 ? "none" : `2px solid rgba(245,97,27,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: i === 0 ? "#370e00" : C.muted, fontSize: 14, flexShrink: 0 }}>
                                            {i + 1}
                                        </motion.div>
                                        <span style={{ fontWeight: i === 0 ? 700 : 500, color: i === 0 ? C.text : C.muted, fontSize: 15 }}>{s}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </Section>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                        {phases.map((p, i) => (
                            <Section key={p.label}>
                                <motion.div variants={scaleIn} custom={i}
                                    whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(245,97,27,0.1)` }}
                                    style={{ background: C.bgCard, borderRadius: 24, padding: 32, borderLeft: p.active ? `4px solid ${p.accent}` : `4px solid rgba(245,97,27,0.1)`, opacity: p.active ? 1 : 0.6, height: "100%", boxSizing: "border-box" }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.active ? p.accent : C.muted, display: "block", marginBottom: 12 }}>{p.num}</span>
                                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: C.text, marginBottom: 12 }}>{p.label}</h4>
                                    <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
                                </motion.div>
                            </Section>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Tools ────────────────────────────────────────────────────────────────────
function Tools() {
    const tools = [
        { name: "Figma", icon: "pentagon" },
        { name: "Adobe XD", icon: "admob" },
        { name: "Photoshop", icon: "brush" },
        { name: "Framer", icon: "view_in_ar" },
        { name: "Sketch", icon: "drive_sketch" },
    ];

    return (
        <section style={{ padding: "72px 0", background: C.bgAlt }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                <Section>
                    <motion.p variants={fadeIn} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.muted, marginBottom: 48 }}>
                        The Architect's Toolkit
                    </motion.p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 36 }}>
                        {tools.map((t, i) => (
                            <motion.div key={t.name} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                whileHover={{ y: -10, boxShadow: `0 16px 32px rgba(245,97,27,0.14)`, borderColor: "rgba(245,97,27,0.35)" }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...glass, borderRadius: 18, padding: "20px 16px", width: 90, cursor: "pointer", transition: "border-color 0.3s" }}>
                                <motion.span whileHover={{ rotate: 15 }} className="material-symbols-outlined" style={{ fontSize: 32, color: C.orange }}>
                                    {t.icon}
                                </motion.span>
                                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{t.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            </div>
        </section>
    );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
    const projects = [
        {
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIatNaXBFXkljfbm5p1IIB14zuCZI1MR5y7dYjAhxIKcwegPDLIYvbJpwWEZFRVj9XbAndTWSRbiHIb1NemwLMDWPFSnJYGiF8AX3MHIuU25cuXp0SMK0Ct09pDporRVPF9A-2GdY65_R6cJANZJPK2Qses9Xb0GlqEG5PLHNziyKvt2pFfyzMVdN_3hKChhpZeyPILtYmq4c-300AcFNQi6cA683lNHroZrb40cvY6AUeJJdICHspY3SmCAXnUm0ud5SLTu6toKM",
            tags: [{ label: "Fintech", color: C.orange }, { label: "SaaS", color: C.muted }],
            title: "Quantum Pay: Digital Banking",
            desc: "Revolutionizing cross-border payments with a seamless mobile experience.",
        },
        {
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFz8GpKBIW1z3eXhK_wI34auFs1o9fD-jsSHd-AYvfCtA27LBv48gxoJeZDd2-nZAgn9KHGG3QiohNRz_cL5YwXUs6ulwSrFYZqdTlLSiIV7i8t4uHqz3FAuX2ga-0Zv5ORUHN_rtrGKEVgb2TuWqP4dPPb3YLhNhS9RXGBnpZm1bKH_VvcgC4bUbuEcTyKivOjfk1ZxMjG80fXdfAKChNX7Cxmzs5J0wNeAEO2judGzsu17KZxQclb4YBu3sDshVPCd0ZSwR7wN4",
            tags: [{ label: "E-Commerce", color: C.blue }, { label: "Web Design", color: C.muted }],
            title: "Flora: Green Market Experience",
            desc: "A minimalist approach to sustainable shopping and product storytelling.",
        },
    ];

    return (
        <section style={{ padding: "96px 0", background: C.bg }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <Section>
                    <motion.div variants={fadeUp} custom={0} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
                        <div>
                            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, marginBottom: 12 }}>Signature Works</h2>
                            <p style={{ color: C.muted, maxWidth: 420, lineHeight: 1.7 }}>A curated selection of our most impactful design transformations.</p>
                        </div>
                        <motion.button whileHover={{ x: 8 }} style={{ display: "flex", alignItems: "center", gap: 6, color: C.orange, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>
                            View All Case Studies
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                        </motion.button>
                    </motion.div>
                </Section>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="na-portfolio-grid">
                    {projects.map((p, i) => (
                        <Section key={p.title}>
                            <motion.div variants={fadeUp} custom={i} style={{ cursor: "pointer" }}>
                                <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", aspectRatio: "16/10", marginBottom: 24 }}>
                                    <motion.img src={p.img} alt={p.title} whileHover={{ scale: 1.08 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,17,11,0.45) 0%, transparent 60%)" }} />
                                    <div style={{ position: "absolute", bottom: 24, left: 24, display: "flex", gap: 8 }}>
                                        {p.tags.map(t => (
                                            <span key={t.label} style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", color: "#fff", padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 700, border: "1px solid rgba(255,255,255,0.3)" }}>{t.label}</span>
                                        ))}
                                    </div>
                                </div>
                                <motion.h3 whileHover={{ color: C.orange }}
                                    style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: C.text, marginBottom: 8, transition: "color 0.2s" }}>{p.title}</motion.h3>
                                <p style={{ color: C.muted, fontSize: 14 }}>{p.desc}</p>
                            </motion.div>
                        </Section>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Why Different ────────────────────────────────────────────────────────────
function WhyDifferent() {
    const reasons = [
        { num: "01.", title: "User-Centered Focus", desc: "We don't just design for screens; we design for people. Every decision is backed by psychological principles and user feedback." },
        { num: "02.", title: "Modern Aesthetics", desc: "Our designs are contemporary, clean, and professional, ensuring your product looks relevant in today's competitive market." },
        { num: "03.", title: "Design Consistency", desc: "Through robust design systems, we ensure your product remains unified as it scales across platforms and teams." },
    ];

    return (
        <section style={{ padding: "96px 0", background: C.bgAlt }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <Section>
                    <motion.h2 variants={fadeUp} custom={0} style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 64 }}>
                        Why We're Different
                    </motion.h2>
                </Section>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }} className="na-why-grid">
                    {reasons.map((r, i) => (
                        <Section key={r.title}>
                            <motion.div variants={fadeUp} custom={i}
                                whileHover={{ borderColor: C.orange, y: -4 }}
                                style={{ padding: "36px 32px", borderLeft: `2px solid rgba(245,97,27,0.2)`, transition: "border-color 0.3s, transform 0.3s" }}>
                                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: C.orange, marginBottom: 16 }}>{r.num}</div>
                                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.15rem", fontWeight: 700, color: C.text, marginBottom: 12 }}>{r.title}</h4>
                                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75 }}>{r.desc}</p>
                            </motion.div>
                        </Section>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
    const testimonials = [
        { quote: "The team at Neural Amber transformed our complex data platform into an intuitive tool that our clients actually enjoy using. Their attention to detail is unmatched.", name: "David Chen", role: "CTO at Vertex Solutions", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9xx3_dpddMYj0PeIKntbmgW3VJc53BqjKUniXji15SxEshGmU3ARcx7T0zIsIVUyEX1NYf1hNbYzEdauvPP1Q736u5FxpYbHVL4l5To9EhUhdwgzNQjk0lbsEbPmx_PBfWcNTVwFP_7YelYWp2dQJvS4a8J1IyMzmWxHhuLWXNkDyTl5_b8vLJYmhuLo7JZNKgVXhsEZcpCBCg2M3qRwJ19anCc1ip-vwBno5HWn4wg0wHntOKdW33S-k6FGNkDXqedA73kS6zac" },
        { quote: "Design is no longer a bottleneck for us. The design system they built allowed our engineering team to ship features 3x faster while maintaining brand integrity.", name: "Sarah Williams", role: "Head of Product at Bloom", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWCYTutQLTsFvGTXUdcjyFZZyKdyGc4to9gn-hnigptQRvYdy2w_HzNe_-esOl7rpoG27kkBlE5x3FG44i8clhLzSuwn_fct0-sfY76mMxAGB9k_YRkR4aecqRhg2-_Uz5qQ_UpHJQIk7GdUP296VUQwsS9cUHO0dnsMZMVBgWDPVbwvPr_-yyyCwIcnyeQhE0AUgv2c8eqcH_GuRjtdvNL3e_YNlGrM0h_osqXyJDEu-kUujTbWiVcUh_lD9rpQh7oD1NYmBJu-0" },
    ];

    return (
        <section style={{ padding: "96px 0", background: C.bg }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <Section>
                    <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 800, color: C.text, marginBottom: 16 }}>Voices of Success</h2>
                        <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
                            {[...Array(5)].map((_, i) => (
                                <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                                    className="material-symbols-outlined" style={{ color: C.orange, fontVariationSettings: "'FILL' 1", fontSize: 22 }}>star</motion.span>
                            ))}
                        </div>
                    </motion.div>
                </Section>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="na-testimonial-grid">
                    {testimonials.map((t, i) => (
                        <Section key={t.name}>
                            <motion.div variants={scaleIn} custom={i}
                                whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(245,97,27,0.1)` }}
                                style={{ ...glass, background: C.bgCard, padding: 40, borderRadius: 28, position: "relative", overflow: "hidden" }}>
                                <motion.span animate={{ rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }}
                                    className="material-symbols-outlined"
                                    style={{ position: "absolute", top: 24, right: 24, fontSize: 80, color: "rgba(245,97,27,0.07)", lineHeight: 1 }}>
                                    format_quote
                                </motion.span>
                                <p style={{ fontSize: 15, lineHeight: 1.8, color: C.text, marginBottom: 32, fontStyle: "italic", position: "relative", zIndex: 1 }}>"{t.quote}"</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <img src={t.img} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                                    <div>
                                        <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t.name}</div>
                                        <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </Section>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
    return (
        <section style={{ padding: "96px 0", background: C.bgAlt, overflow: "hidden" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <Section>
                    <motion.div variants={scaleIn}
                        style={{ ...glass, background: "rgba(255,181,153,0.16)", borderRadius: 48, padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }}
                            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "120%", aspectRatio: "1", borderRadius: "50%", background: `radial-gradient(circle,rgba(245,97,27,0.15),transparent 70%)`, pointerEvents: "none" }} />
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, color: C.text, marginBottom: 20, position: "relative" }}>
                            Ready to Elevate Your Digital Product?
                        </h2>
                        <p style={{ color: C.muted, fontSize: 18, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7, position: "relative" }}>
                            Let's build something extraordinary together. Book a free consultation to discuss your vision.
                        </p>
                        <motion.button whileHover={{ scale: 1.06, boxShadow: `0 20px 48px rgba(245,97,27,0.45)` }} whileTap={{ scale: 0.97 }}
                            style={{ background: C.grad, color: "#370e00", padding: "20px 48px", borderRadius: 20, fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer", boxShadow: `0 8px 32px rgba(245,97,27,0.35)`, position: "relative" }}>
                            Book My Design Strategy Call
                        </motion.button>
                    </motion.div>
                </Section>
            </div>
        </section>
    );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
    const inputStyle: any = {
        width: "100%", background: C.bgAlt, border: `1.5px solid rgba(245,97,27,0.15)`,
        borderRadius: 14, padding: "14px 16px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box",
    };

    return (
        <section style={{ padding: "96px 0", background: C.bg }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="na-contact-grid">
                <Section>
                    <motion.div variants={fadeUp} custom={0}>
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, marginBottom: 20 }}>Start a Conversation</h2>
                        <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.75, marginBottom: 48 }}>
                            Have a specific project in mind? Fill out the form and our design lead will get back to you within 24 hours.
                        </p>
                        {[
                            { icon: "mail", label: "Email Us", value: "hello@neuralamber.design" },
                            { icon: "call", label: "Call Us", value: "+1 (555) 234-DESIGN" },
                        ].map((c, i) => (
                            <motion.div key={c.label} variants={fadeUp} custom={i + 1} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                                <motion.div whileHover={{ scale: 1.1, background: C.grad }}
                                    style={{ width: 52, height: 52, borderRadius: 14, ...glass, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 22 }}>{c.icon}</span>
                                </motion.div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>{c.label}</div>
                                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{c.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Section>

                <Section>
                    <motion.div variants={scaleIn} custom={0}
                        style={{ ...glass, background: C.bgCard, padding: 40, borderRadius: 36 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="na-form-grid">
                                {[["Name", "John Doe", "text"], ["Email", "john@example.com", "email"]].map(([l, p, t]) => (
                                    <div key={l}>
                                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>{l}</label>
                                        <input type={t} placeholder={p} style={inputStyle}
                                            onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.08)"; }}
                                            onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Service Required</label>
                                <select style={inputStyle}>
                                    {["UI/UX Design", "Web Design", "Design System", "Product Consulting"].map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Project Details</label>
                                <textarea rows={4} placeholder="Tell us about your project goals..."
                                    style={{ ...inputStyle, resize: "vertical" }}
                                    onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.08)"; }}
                                    onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
                            </div>
                            <motion.button whileHover={{ scale: 1.02, boxShadow: `0 14px 36px rgba(245,97,27,0.4)` }} whileTap={{ scale: 0.98 }}
                                style={{ width: "100%", background: C.grad, color: "#370e00", padding: "17px", borderRadius: 14, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                                Send Message
                            </motion.button>
                        </div>
                    </motion.div>
                </Section>
            </div>
        </section>
    );
}


// ─── Root ─────────────────────────────────────────────────────────────────────
export default function UiUxDevelopment() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #fffbf8; }
        @media (max-width: 900px) {
          .na-hero-grid, .na-process-grid, .na-contact-grid { grid-template-columns: 1fr !important; }
          .na-hero-right { display: none !important; }
          .na-bento-grid { grid-template-columns: 1fr 1fr !important; }
          .na-portfolio-grid, .na-testimonial-grid, .na-why-grid { grid-template-columns: 1fr !important; }
          .na-footer-grid { grid-template-columns: 1fr !important; }
          .na-hide-mobile { display: none !important; }
          .na-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .na-bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

            <div style={{ fontFamily: "'Inter',sans-serif", background: "#fffbf8", color: C.text, overflowX: "hidden" }}>
                <Hero />
                <Services />
                <Process />
                <Tools />
                <Portfolio />
                <WhyDifferent />
                <Testimonials />
                <CTA />
                <Contact />
            </div>
        </>
    );
}