"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion"

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const fadeIn: any = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
}

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
}

// ─── Section reveal wrapper ────────────────────────────────────────────────────

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const whyCards = [
  { icon: "insights",                title: "Data-Driven Solutions",     desc: "We extract actionable intelligence from raw data silos using proprietary analysis frameworks." },
  { icon: "dynamic_feed",            title: "Scalable AI Systems",       desc: "Architecture designed to handle millions of requests while maintaining millisecond latency." },
  { icon: "precision_manufacturing", title: "Advanced Algorithms",       desc: "State-of-the-art model architectures including transformers, CNNs, and RL agents." },
  { icon: "check_circle",            title: "End-to-End Implementation", desc: "From initial feasibility study to production deployment and MLOps maintenance." },
]

const services = [
  { icon: "architecture", title: "ML Model Dev",        desc: "Custom machine learning models tailored to your unique business logic and proprietary datasets.",         bullets: ["Hyperparameter Tuning", "Model Compression"] },
  { icon: "neurology",    title: "Deep Learning",        desc: "Neural networks that solve complex pattern recognition tasks across multiple domains.",                   bullets: ["Multi-modal Learning", "Transfer Learning"] },
  { icon: "translate",    title: "NLP",                  desc: "Advanced natural language processing for sentiment analysis, translation, and summary.",                  bullets: ["LLM Fine-tuning", "Entity Recognition"] },
  { icon: "visibility",   title: "Computer Vision",      desc: "Enabling machines to see, identify and process images similarly to human vision.",                        bullets: ["Object Detection", "Semantic Segmentation"] },
  { icon: "query_stats",  title: "Predictive Analytics", desc: "Forecast future trends and behaviors using historical data and statistical algorithms.",                  bullets: ["Churn Prediction", "Market Forecasting"] },
  { icon: "forum",        title: "AI Chatbots",          desc: "Conversational AI interfaces that provide 24/7 intelligent customer engagement.",                         bullets: ["Contextual Memory", "RAG Integration"] },
]

const techStack = ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI", "AWS", "Google Cloud AI"]

const steps = [
  { n: 1, title: "Problem Understanding", desc: "Defining KPIs and mapping AI potential." },
  { n: 2, title: "Data Prep",             desc: "ETL, cleaning and feature engineering." },
  { n: 3, title: "Model Dev",             desc: "Architecture selection and training." },
  { n: 4, title: "Evaluation",            desc: "Testing against real-world scenarios." },
  { n: 5, title: "Deployment",            desc: "Continuous CI/CD for ML models." },
]

const testimonials = [
  {
    quote: "NeuralKinetic didn't just provide developers; they provided architects who understood our business context. The model they delivered outperformed our internal benchmarks within weeks.",
    name: "David Chen",    role: "CTO, DataWave Systems",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoE3ggPhXNcWfL6gC72vUhRLoFFrObttoKV_X5nuYcPTRspS7caloqAZZwjkwHql_jGu4afSxhDIJ2Ip1kIWpBb5VxORBVOZXMxv1ZtCFwNqTwz0qu56C0eYq6ZofufooWWDKD40LQNTTYCzNAF_uMOAHRMXy_SWDL3yQLVnyUXvW5-dhNzNADMu0pBqvQzlUwB0C3zQzZQp3oZ1DbKjlyeNl_rYvsaHMn-hEyNF96ZczSR9spBpY_dj3KEzkSRH8XdxVn79HZHns",
  },
  {
    quote: "The Computer Vision system developed by NeuralKinetic has transformed our quality control process on the factory floor. The accuracy is astounding.",
    name: "Sarah Jenkins", role: "VP Ops, SmartFab Inc",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9myEuNQu-OUbJfnFYzZXFRat9wYzycliYJzcFmkY-UQrb72kYVJlB0hERwfdAOSJrF7-zK3Dm6tE1OCjZHfYLoIMb_dgmsbqQ_LVmAj_m8ThQg5eQJqw2vpFruwzYObP6LvDQi1gPDNDmuv_acAmRo7jNnBUMEanUmcOoUBsOyOU07uZibcsddEVV_8ybpfyr-ZFs3A2C7c5hSx_sbmynYkrREPR10QM70rExrE6JCW4gZNSNMs5tmjqBqz4s2MSQs5zylhLlGIo",
  },
  {
    quote: "Their predictive analytics models allowed us to anticipate market shifts before they happened. It's become our most valuable strategic tool.",
    name: "Marcus Thorne", role: "Director, Alpha Growth",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1PB4ZbAHWv0A8Hj1zbDxMfgxj3qLMnQuWgGMNpr12jklaJ_eHe2Qe8gfrcHIGfN8pJmQur7169bMP2qyxk0bR6iwge1tNnwetErOQafchwKOIrImc7oS6bHN6Gv0tx-NZWFOELhN5WYdlBkV2ZYHHznqUjG2XGuKSmJLnUbdrhW-Vy_BK85OsPbUCuzxMCsqd8hcXqNKtNFpDU_pktalZrrOE8_9zLdijFuoDLSawPfSOaLRXatRM7WhWonHdv7pLfiol2-se18c",
  },
]

// ─── Glass card (light version) ────────────────────────────────────────────────

function GlassCard({ children, className = "", custom = 0 }: { children: React.ReactNode; className?: string; custom?: number }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={custom}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AlmlHirePageLight() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Light palette using the user-specified variables ── */
        :root {
          /* Brand */
          --primary:            #ec5b13;
          --primary-light:      rgba(236, 91, 19, 0.10);
          --primary-mid:        rgba(236, 91, 19, 0.18);
          --primary-border:     rgba(236, 91, 19, 0.20);

          /* Backgrounds */
          --background-light:   #f8f6f6;   /* main page bg */
          --background-dark:    #221610;   /* CTA / accent dark section */
          --surface:            #ffffff;   /* card white */
          --surface-alt:        #f2eeeb;   /* slightly warm off-white */
          --surface-raised:     #ffffff;   /* elevated card */

          /* Text */
          --on-surface:         #1a0c06;   /* near-black warm */
          --on-surface-mid:     #5c3d2c;   /* mid brown */
          --on-surface-variant: #8c6652;   /* muted brown */
          --on-surface-faint:   #b89080;   /* very muted */

          /* Borders */
          --outline:            rgba(236, 91, 19, 0.15);
          --outline-mid:        rgba(236, 91, 19, 0.25);
          --divider:            rgba(26, 12, 6, 0.08);

          /* Tertiary accent (kept from original) */
          --tertiary:           #1b7fd4;
        }

        body {
          background: var(--background-light);
          color: var(--on-surface);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .font-headline { font-family: 'Space Grotesk', sans-serif; }

        /* ── Light glass card ── */
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--outline);
          box-shadow: 0 2px 16px rgba(26, 12, 6, 0.07), 0 1px 3px rgba(26, 12, 6, 0.05);
        }

        /* ── Glow blobs — warm & light ── */
        .glow-accent {
          filter: blur(90px);
          background: radial-gradient(circle, rgba(236,91,19,0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Gradient text ── */
        .grad-text {
          background: linear-gradient(135deg, var(--primary) 0%, #f97c42 60%, #ec5b13 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Subtle dot-grid texture ── */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(236,91,19,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── Utility color helpers ── */
        .text-primary         { color: var(--primary); }
        .text-tertiary        { color: var(--tertiary); }
        .text-on-surface      { color: var(--on-surface); }
        .text-on-surface-variant { color: var(--on-surface-variant); }

        /* ── Form elements ── */
        input, select, textarea {
          color: var(--on-surface);
          background: var(--surface-alt);
        }
        input::placeholder, textarea::placeholder {
          color: var(--on-surface-faint);
        }
        select option {
          background: var(--surface);
          color: var(--on-surface);
        }

        /* ── Material icons ── */
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          font-size: 24px; line-height: 1;
          letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap;
          word-wrap: normal; direction: ltr;
          font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
          user-select: none;
        }

        /* ── Pulse badge dot ── */
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 6px 2px rgba(236,91,19,0.45); }
          50%      { box-shadow: 0 0 14px 5px rgba(236,91,19,0.75); }
        }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }

        /* ── Floating icons inside hero card ── */
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .float-el      { animation: float 4s ease-in-out infinite; }
        .float-el-slow { animation: float 6s ease-in-out infinite reverse; }

        /* ── Section alt bg ── */
        .section-alt { background: var(--surface-alt); }
        .section-white { background: var(--surface); }
        .section-main  { background: var(--background-light); }
      `}</style>

      <main style={{ background: "var(--background-light)", overflowX: "hidden" }}>

        {/* ════════════════════════ HERO ══════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 2rem" }}
        >
          {/* dot-grid texture */}
          <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }} />

          {/* warm glow blobs */}
          <motion.div style={{ y: heroY, position: "absolute", top: "20%", left: "-6rem", width: "28rem", height: "28rem" }} className="glow-accent" />
          <motion.div style={{ y: heroY, position: "absolute", bottom: "20%", right: "-6rem", width: "32rem", height: "32rem" }} className="glow-accent" />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY, width: "100%", maxWidth: "90rem", margin: "0 auto", position: "relative", zIndex: 10, padding: "5rem 0" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

              {/* Left text block */}
              <motion.div initial="hidden" animate="visible" style={{ maxWidth: "36rem" }}>

                {/* Badge */}
                <motion.div variants={fadeUp} custom={0}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.9rem", borderRadius: "9999px", background: "rgba(236,91,19,0.08)", border: "1px solid var(--outline-mid, rgba(236,91,19,0.25))", marginBottom: "2rem" }}
                >
                  <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "9999px", background: "var(--primary)", display: "inline-block" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--primary)", textTransform: "uppercase", fontFamily: "Space Grotesk" }}>
                    Next-Gen Intelligence
                  </span>
                </motion.div>

                {/* H1 */}
                <motion.h1 variants={fadeUp} custom={1}
                  className="font-headline"
                  style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--on-surface)", marginBottom: "1.5rem" }}
                >
                  Hire AI/ML Specialists to Build{" "}
                  <span className="grad-text">Intelligent Solutions</span>
                </motion.h1>

                {/* Sub */}
                <motion.p variants={fadeUp} custom={2}
                  style={{ fontSize: "1.1rem", color: "var(--on-surface-mid)", lineHeight: 1.75, marginBottom: "2.5rem" }}
                >
                  Accelerate your digital transformation with elite machine learning engineers. We build production-ready AI systems that automate complexity and unlock hidden value in your data.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} custom={3} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 48px rgba(236,91,19,0.28)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{ padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary), #f97c42)", color: "#fff", fontWeight: 700, borderRadius: "0.75rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontFamily: "Space Grotesk", boxShadow: "0 8px 24px rgba(236,91,19,0.25)" }}
                  >
                    Hire AI Experts
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>arrow_forward</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, background: "var(--surface)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{ padding: "1rem 2rem", background: "var(--surface-alt)", border: "1px solid var(--outline)", color: "var(--on-surface)", fontWeight: 600, borderRadius: "0.75rem", cursor: "pointer", fontSize: "0.95rem", fontFamily: "Space Grotesk" }}
                  >
                    Book Consultation
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right — hero card */}
              <motion.div
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: "relative" }}
              >
                {/* decorative rotated bg plate */}
                <div style={{ position: "absolute", inset: "-0.5rem", borderRadius: "2.75rem", background: "linear-gradient(135deg, rgba(236,91,19,0.12), rgba(236,91,19,0.04))", transform: "rotate(3deg)" }} />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: "relative", borderRadius: "2.5rem", padding: "1.5rem", overflow: "hidden", aspectRatio: "1/1", background: "var(--surface)", border: "1px solid var(--outline)", boxShadow: "0 24px 80px rgba(26,12,6,0.12)" }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(236,91,19,0.06) 0%, transparent 60%)" }} />
                  <motion.img
                    whileHover={{ filter: "saturate(1)", scale: 1.03 }}
                    transition={{ duration: 0.7 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCndo5cqB_NlZz-itlStXcVQqMzDRGEfuvEhzzEQejgEHY_pzs5NJ8CRVe0DSU100S8XlTOe3mzJBm-m7K01TdennNhvch86Pe3quYZQ0ZMn6fejmwr5p-oxWZxAD5L3ckc4sFOfY6mweH9BYBsZNwANdadgAnfgS18Wjlu8aSIq5Hs5R7_aiJzAsQkFgOaB7AvuXoOTRb9091xfE5R-lfgcSovxx22O9HWb6AXRItVFd3d2CI4_DedqpP_O-EqWBs-zZkSF_dQuqU"
                    alt="Neural Network"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1.25rem", filter: "saturate(0.5) brightness(1.05)" }}
                  />

                  {/* floating icon chips */}
                  <motion.div className="glass-card float-el"
                    style={{ position: "absolute", top: "2.5rem", left: "2.5rem", padding: "0.875rem", borderRadius: "1rem" }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "2rem" }}>psychology</span>
                  </motion.div>
                  <motion.div className="glass-card float-el-slow"
                    style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", padding: "0.875rem", borderRadius: "1rem" }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "var(--tertiary)", fontSize: "2rem" }}>hub</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════ WHY CHOOSE US ══════════════════════════════ */}
        <section className="section-alt" style={{ padding: "6rem 2rem" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.div variants={fadeUp} custom={0}
                style={{ textAlign: "center", maxWidth: "42rem", margin: "0 auto 5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h2 className="font-headline" style={{ fontSize: "clamp(2rem,4vw,3.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--on-surface)" }}>
                  Engineered for Excellence
                </h2>
                <p style={{ color: "var(--on-surface-variant)" }}>Why leading tech enterprises choose NeuralKinetic for their AI roadmap.</p>
              </motion.div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {whyCards.map((card, i) => (
                  <GlassCard key={card.title} custom={i}>
                    <motion.div style={{ padding: "2rem" }}>
                      <motion.span
                        className="material-symbols-outlined"
                        style={{ color: "var(--primary)", fontSize: "2.25rem", display: "block", marginBottom: "1.5rem" }}
                        whileHover={{ scale: 1.2, rotate: 5, transition: { type: "spring", stiffness: 300 } }}
                      >
                        {card.icon}
                      </motion.span>
                      <h3 className="font-headline" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.875rem", color: "var(--on-surface)" }}>
                        {card.title}
                      </h3>
                      <p style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", lineHeight: 1.7 }}>{card.desc}</p>
                    </motion.div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ SERVICES ═══════════════════════════════════ */}
        <section id="services" className="section-white" style={{ padding: "6rem 2rem" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.div variants={fadeUp} custom={0}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
                <div style={{ maxWidth: "28rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h2 className="font-headline" style={{ fontSize: "clamp(2rem,4vw,3.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--on-surface)" }}>
                    Core Competencies
                  </h2>
                  <p style={{ color: "var(--on-surface-variant)", fontSize: "1.05rem" }}>
                    Specialized vertical AI expertise for complex industrial challenges.
                  </p>
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  style={{ color: "var(--primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.95rem", fontFamily: "Space Grotesk" }}
                >
                  Explore All Services <span className="material-symbols-outlined">arrow_right_alt</span>
                </motion.button>
              </motion.div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {services.map((svc, i) => (
                  <motion.div
                    key={svc.title}
                    variants={fadeUp}
                    custom={i * 0.5}
                    whileHover={{ y: -6, boxShadow: "0 20px 56px rgba(236,91,19,0.10)", borderColor: "var(--primary)", transition: { duration: 0.25 } }}
                    style={{ padding: "2.25rem", borderRadius: "1.75rem", background: "var(--background-light)", border: "1px solid var(--outline)", position: "relative", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.3s, border-color 0.3s" }}
                  >
                    {/* corner deco */}
                    <motion.div
                      initial={{ x: "2rem", y: "-2rem" }}
                      whileHover={{ x: "0.5rem", y: "-0.5rem" }}
                      style={{ position: "absolute", top: 0, right: 0, width: "7rem", height: "7rem", background: "rgba(236,91,19,0.05)", borderRadius: "0 0 0 100%" }}
                    />
                    <motion.span
                      className="material-symbols-outlined"
                      style={{ color: "var(--primary)", fontSize: "1.875rem", display: "block", marginBottom: "1.25rem" }}
                      whileHover={{ scale: 1.15, rotate: -5, transition: { type: "spring", stiffness: 250 } }}
                    >
                      {svc.icon}
                    </motion.span>
                    <h4 className="font-headline" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.875rem", color: "var(--on-surface)" }}>{svc.title}</h4>
                    <p style={{ color: "var(--on-surface-mid)", lineHeight: 1.7, marginBottom: "1.25rem", fontSize: "0.9rem" }}>{svc.desc}</p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {svc.bullets.map(b => (
                        <li key={b} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 500, color: "var(--on-surface-variant)" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "var(--primary)", flexShrink: 0, opacity: 0.6 }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ TECH STACK ═════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem", background: "var(--background-light)", borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.p variants={fadeIn} custom={0}
                style={{ textAlign: "center", color: "var(--on-surface-faint)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3rem" }}>
                Our Technology Stack
              </motion.p>
              <motion.div
                variants={fadeIn} custom={1}
                whileHover={{ opacity: 1 }}
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "3rem", opacity: 0.45, transition: "opacity 0.5s" }}
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    className="font-headline"
                    whileHover={{ scale: 1.15, color: "var(--primary)", opacity: 1, transition: { duration: 0.2 } }}
                    style={{ fontSize: "1.1rem", fontWeight: 700, cursor: "default", color: "var(--on-surface)" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ PROCESS ════════════════════════════════════ */}
        <section className="section-alt" style={{ padding: "6rem 2rem", overflow: "hidden" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "5rem" }}>
                <h2 className="font-headline" style={{ fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--on-surface)" }}>
                  Our Deployment Process
                </h2>
                <p style={{ color: "var(--on-surface-variant)" }}>Structured methodology for consistent project success.</p>
              </motion.div>

              <div style={{ position: "relative", display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                {/* connector line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                  style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: "2px", background: "linear-gradient(90deg, transparent, var(--primary), transparent)", opacity: 0.25, transformOrigin: "left", pointerEvents: "none" }}
                />
                {steps.map((step, i) => (
                  <motion.div
                    key={step.n}
                    variants={fadeUp}
                    custom={i * 0.8}
                    className="glass-card"
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    style={{ flex: "1 1 140px", padding: "1.75rem 1.25rem", textAlign: "center", position: "relative", zIndex: 10 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.12 }}
                      style={{ width: "3rem", height: "3rem", background: "rgba(236,91,19,0.1)", border: "1.5px solid var(--primary)", color: "var(--primary)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, margin: "0 auto 1.5rem", fontSize: "1rem", fontFamily: "Space Grotesk" }}
                    >
                      {step.n}
                    </motion.div>
                    <h5 className="font-headline" style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.9rem", color: "var(--on-surface)" }}>{step.title}</h5>
                    <p style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", lineHeight: 1.5 }}>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ CASE STUDIES ═══════════════════════════════ */}
        <section id="case-studies" className="section-white" style={{ padding: "6rem 2rem" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.h2 variants={fadeUp} custom={0}
                className="font-headline"
                style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "4rem", color: "var(--on-surface)" }}>
                Successful Deployments
              </motion.h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 380px)", gap: "1.25rem" }}>

                {/* Large card 1 */}
                <motion.div variants={scaleIn} custom={0}
                  className="glass-card"
                  whileHover={{ scale: 1.01, boxShadow: "0 24px 64px rgba(236,91,19,0.12)" }}
                  transition={{ duration: 0.3 }}
                  style={{ gridColumn: "1 / 3", position: "relative", overflow: "hidden", borderRadius: "2.5rem", cursor: "pointer" }}
                >
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX5ssHo9H41LZo0aNbuJ2_ZDpl7Kc3HJ6KhpAQCr1eez05zThV7S0HaROAzbtveAb_tjT4rYm3ZhWxuLVL7OBcebx0fc56Jj9b02VZI6Fe_U_HX9SBFOPHNth3L9g4q8V0jXeJs9jyEhIlHy5yUJfpnVYs3U_catqSJ-8zIhj3qqyucpzGOKLiMb8Kfykg6G7g9_zJYpAOqr08P8zIRPxmH6gsvAkOYle6X3pzAmQWv2OZo9ahmlkM3gXUxXjB1256f_c_wPNCfvc"
                    alt="FinTech"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
                  />
                  {/* gradient toward bottom — dark version for readability */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.85) 0%, rgba(34,22,16,0.2) 50%, transparent 100%)" }} />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem", right: "2.5rem" }}
                  >
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffb599", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>FinTech</span>
                    <h4 className="font-headline" style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.75rem", color: "#fff" }}>Fraud Detection Engine</h4>
                    <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: "32rem", fontSize: "0.95rem" }}>Reduced fraudulent transactions by 94% using real-time anomaly detection.</p>
                  </motion.div>
                </motion.div>

                {/* Small card 1 */}
                <motion.div variants={scaleIn} custom={1}
                  className="glass-card"
                  whileHover={{ scale: 1.02 }}
                  style={{ position: "relative", overflow: "hidden", borderRadius: "2.5rem", cursor: "pointer" }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvX6f1-f-SYSu-HP3tflatBqPUhf450DRVcTRDwTNP2jESmeAcT_BaIJ4M0DbBKqz_daLq3OYjzcGPZk9sTDMWUKEX98DH0K1asE95czRwFB5kMIhC50afGN9fLD3tooKIhlTsBbdZTYdZeg6iBdyz6g-ksIVudu7cPwydF3gFqjNx9MQRKAZDPyD5lBDLiLc8JhiW3bImy9fjYNBIuC245boOBmjLfcg3wTYyzR_iYWr9eILCFeYuFVX5Nxx_a8B3CGEZxJFrHDo"
                    alt="E-Commerce"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ecaff", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>E-Commerce</span>
                    <h4 className="font-headline" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>Recommendation System</h4>
                  </div>
                </motion.div>

                {/* Stats card */}
                <motion.div variants={scaleIn} custom={2}
                  style={{ position: "relative", overflow: "hidden", borderRadius: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", padding: "2.5rem", background: "rgba(236,91,19,0.06)", border: "1px solid var(--outline)" }}
                  whileHover={{ scale: 1.02, background: "rgba(236,91,19,0.10)" }}
                >
                  <motion.h4
                    className="font-headline"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    style={{ fontSize: "3.5rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}
                  >
                    250%
                  </motion.h4>
                  <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--on-surface-mid)" }}>Efficiency increase for logistics partner.</p>
                </motion.div>

                {/* Large card 2 */}
                <motion.div variants={scaleIn} custom={3}
                  className="glass-card"
                  whileHover={{ scale: 1.01 }}
                  style={{ gridColumn: "2 / 4", position: "relative", overflow: "hidden", borderRadius: "2.5rem", cursor: "pointer" }}
                >
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiB_6Icvbju9E2Aw7wwNtK3JRepvugf0ZUVRcnvKd3Ztx5JW8U3yfHAZT4kx8G6exO2aBkPd8I9zBvuWOjWJ9iHMZ5HpIHBejcHl4sE1XcU16A7LfKw-IIkrDD8OhXVEZ-ONBnjwiv-cWqEqS7-mcWmgJTSqCv-a-1wxaSG0vSI3Ve0-ETxhOIl0zlo_y3Uexp-y-6EDvr5OsaNCRZ2JHBTmRXmK47XEbxOTDTC8XecF15lPMIUV-pDbvGg8W6Ds5eP7Ooa1P_YoI"
                    alt="Customer Service"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(34,22,16,0.88) 0%, rgba(34,22,16,0.2) 50%, transparent 100%)" }} />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}
                  >
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffb599", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Customer Service</span>
                    <h4 className="font-headline" style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>Enterprise Chatbot Solution</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>Automating 80% of level-1 support queries.</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ TESTIMONIALS ═══════════════════════════════ */}
        <section className="section-alt" style={{ padding: "6rem 2rem" }}>
          <Section>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-headline"
                style={{ textAlign: "center", fontSize: "clamp(1.8rem,3.5vw,2.75rem)", fontWeight: 700, marginBottom: "4rem", color: "var(--on-surface)" }}>
                What Our Clients Say
              </motion.h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={fadeUp}
                    custom={i * 0.7}
                    className="glass-card"
                    whileHover={{ y: -6, boxShadow: "0 24px 64px rgba(236,91,19,0.10)", borderColor: "rgba(236,91,19,0.3)", transition: { duration: 0.25 } }}
                    style={{ padding: "2.25rem", borderRadius: "2rem", position: "relative", overflow: "hidden" }}
                  >
                    {/* giant quote mark */}
                    <span className="material-symbols-outlined"
                      style={{ position: "absolute", top: "0.75rem", right: "1.5rem", fontSize: "5rem", color: "rgba(236,91,19,0.07)", lineHeight: 1, fontVariationSettings: "'FILL' 1", pointerEvents: "none" }}>
                      format_quote
                    </span>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem" }}>
                      {[...Array(5)].map((_, si) => (
                        <motion.span
                          key={si}
                          className="material-symbols-outlined"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + si * 0.06, type: "spring", stiffness: 200 }}
                          style={{ fontSize: "1.1rem", color: "var(--primary)", fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </motion.span>
                      ))}
                    </div>

                    <p style={{ fontSize: "0.975rem", fontStyle: "italic", color: "var(--on-surface-mid)", lineHeight: 1.75, marginBottom: "1.75rem" }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <motion.div whileHover={{ scale: 1.08 }}
                        style={{ width: "3rem", height: "3rem", borderRadius: "9999px", overflow: "hidden", flexShrink: 0, border: "2px solid var(--outline)" }}>
                        <img src={t.img} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </motion.div>
                      <div>
                        <h6 className="font-headline" style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--on-surface)" }}>{t.name}</h6>
                        <p style={{ fontSize: "0.7rem", color: "var(--on-surface-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        </section>

        {/* ════════════════════════ CONTACT FORM ═══════════════════════════════ */}
        <section id="contact" className="section-white" style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
          {/* bg glow */}
          <div className="glow-accent" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "40rem", height: "40rem", opacity: 0.5, pointerEvents: "none" }} />

          <Section>
            <motion.div
              variants={scaleIn}
              custom={0}
              style={{ maxWidth: "64rem", margin: "0 auto", borderRadius: "3rem", padding: "clamp(2rem,5vw,5rem)", position: "relative", zIndex: 10, background: "var(--surface-raised)", border: "1px solid var(--outline)", boxShadow: "0 24px 80px rgba(236,91,19,0.08)" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

                {/* Left info */}
                <motion.div variants={fadeUp} custom={0} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <h2 className="font-headline"
                    style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--on-surface)" }}>
                    Start Your AI Project Today
                  </h2>
                  <p style={{ color: "var(--on-surface-mid)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                    Tell us about your technical challenges and we'll match you with the right specialists.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[
                      { icon: "mail",        text: "hello@neuralkinetic.ai" },
                      { icon: "location_on", text: "Global Remote / San Francisco HQ" },
                    ].map(item => (
                      <motion.div
                        key={item.icon}
                        whileHover={{ x: 4 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
                      >
                        <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>{item.icon}</span>
                        <span style={{ color: "var(--on-surface-mid)", fontSize: "0.95rem" }}>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  variants={fadeUp}
                  custom={1}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                  onSubmit={e => e.preventDefault()}
                >
                  {[
                    { label: "Name",  type: "text",  placeholder: "John Doe" },
                    { label: "Email", type: "email", placeholder: "john@company.com" },
                  ].map((field, i) => (
                    <motion.div key={field.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--on-surface-variant)", marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <motion.input
                        whileFocus={{ boxShadow: "0 0 0 2px rgba(236,91,19,0.3)", outline: "none" }}
                        type={field.type}
                        placeholder={field.placeholder}
                        style={{ width: "100%", background: "var(--background-light)", border: "1px solid var(--outline)", borderRadius: "0.75rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.95rem", color: "var(--on-surface)", transition: "box-shadow 0.2s" }}
                      />
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--on-surface-variant)", marginBottom: "0.5rem" }}>
                      Project Type
                    </label>
                    <select
                      style={{ width: "100%", background: "var(--background-light)", border: "1px solid var(--outline)", borderRadius: "0.75rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.95rem", appearance: "none", color: "var(--on-surface)" }}
                    >
                      <option>Machine Learning Development</option>
                      <option>Natural Language Processing</option>
                      <option>Computer Vision</option>
                      <option>AI Strategy Consulting</option>
                    </select>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--on-surface-variant)", marginBottom: "0.5rem" }}>
                      Details
                    </label>
                    <motion.textarea
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(236,91,19,0.3)", outline: "none" }}
                      rows={4}
                      placeholder="Tell us more about your needs..."
                      style={{ width: "100%", background: "var(--background-light)", border: "1px solid var(--outline)", borderRadius: "0.75rem", padding: "0.875rem 1.25rem", outline: "none", fontSize: "0.95rem", resize: "none", color: "var(--on-surface)", transition: "box-shadow 0.2s" }}
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(236,91,19,0.30)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    style={{ width: "100%", padding: "1.1rem", background: "linear-gradient(135deg, var(--primary), #f97c42)", color: "#fff", fontWeight: 900, borderRadius: "0.75rem", border: "none", cursor: "pointer", fontSize: "1rem", fontFamily: "Space Grotesk", letterSpacing: "0.01em", boxShadow: "0 8px 24px rgba(236,91,19,0.25)" }}
                  >
                    Submit Project Request
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </Section>
        </section>

      </main>
    </>
  )
}