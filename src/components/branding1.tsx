// Hero.tsx — Rebuilt: no whitespace, rich content, proper scroll animation
// deps: framer-motion, lottie-react, react-router-dom

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import coding from "../assets/lottie/Coding.json"
import { useRef } from "react"

// Tech stack pills
const TECH_PILLS = [
  { label: "React",      color: "#61dafb", bg: "rgba(97,218,251,0.12)"  },
  { label: "Node.js",    color: "#68a063", bg: "rgba(104,160,99,0.12)"  },
  { label: "Python",     color: "#f7c948", bg: "rgba(247,201,72,0.12)"  },
  { label: "AWS",        color: "#ff9900", bg: "rgba(255,153,0,0.12)"   },
  { label: "TypeScript", color: "#3178c6", bg: "rgba(49,120,198,0.12)"  },
  { label: "AI / ML",    color: "#ec5b13", bg: "rgba(236,91,19,0.12)"   },
]

// Stat cards
const STATS = [
  { value: "150+", label: "Projects Shipped"    },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "8+",   label: "Years Building"       },
]

// Animated stat card
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "14px 22px", borderRadius: 14,
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(236,91,19,0.12)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        minWidth: 96,
      }}
    >
      <span style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 900,
        fontSize: 24, letterSpacing: "-0.04em", color: "#ec5b13", lineHeight: 1,
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
        letterSpacing: "0.08em", color: "#7a8299", marginTop: 4,
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </motion.div>
  )
}

// Floating pill positioned around the lottie
function FloatingPill({ label, color, bg, delay, floatClass }: {
  label: string; color: string; bg: string; delay: number; floatClass: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={floatClass}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 13px", borderRadius: 100,
        background: bg, border: `1px solid ${color}40`,
        backdropFilter: "blur(6px)",
        boxShadow: `0 4px 14px ${color}22`,
        pointerEvents: "none",
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: color, display: "inline-block", flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        fontSize: 11, color, letterSpacing: "0.04em",
      }}>
        {label}
      </span>
    </motion.div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)

  // Mild exit parallax only — does NOT affect initial render
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY    = useTransform(scrollYProgress, [0, 1], [0, -50])
  const rawOpac = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5])
  const smoothY    = useSpring(rawY,    { stiffness: 80, damping: 22 })
  const smoothOpac = useSpring(rawOpac, { stiffness: 80, damping: 22 })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .hero-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #f8f6f6;
          padding: 100px 0 64px;
        }

        .hero-dots {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle at 1.5px 1.5px, rgba(236,91,19,0.055) 1.5px, transparent 0);
          background-size: 32px 32px;
        }
        .hero-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          filter: blur(72px);
        }
        .hero-orb-1 {
          width: 500px; height: 500px; top: -100px; right: -60px;
          background: radial-gradient(circle, rgba(236,91,19,0.10) 0%, transparent 70%);
          animation: orbA 7s ease-in-out infinite alternate;
        }
        .hero-orb-2 {
          width: 380px; height: 380px; bottom: -60px; left: -40px;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
          animation: orbB 9s ease-in-out infinite alternate;
        }
        .hero-orb-3 {
          width: 260px; height: 260px; top: 35%; right: 22%;
          background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);
          animation: orbA 11s ease-in-out infinite alternate;
        }
        @keyframes orbA { from{ transform:translateY(0) scale(1); } to{ transform:translateY(28px) scale(1.04); } }
        @keyframes orbB { from{ transform:translateY(0) scale(1); } to{ transform:translateY(-22px) scale(0.97); } }

        .pill-f1 { animation: pf 3.6s ease-in-out infinite; }
        .pill-f2 { animation: pf 4.3s ease-in-out infinite 0.5s; }
        .pill-f3 { animation: pf 3.9s ease-in-out infinite 1.0s; }
        .pill-f4 { animation: pf 5.1s ease-in-out infinite 0.25s; }
        .pill-f5 { animation: pf 4.7s ease-in-out infinite 0.8s; }
        @keyframes pf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

        .lottie-float { animation: lf 4.6s ease-in-out infinite; }
        @keyframes lf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

        .glow-pulse { animation: gp 3.8s ease-in-out infinite; }
        @keyframes gp { 0%,100%{opacity:.35;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.55;transform:translate(-50%,-50%) scale(1.09)} }

        .scroll-bounce { animation: sb 2s ease-in-out infinite; }
        @keyframes sb { 0%,100%{transform:translateX(-50%) translateY(0); opacity:.7} 50%{transform:translateX(-50%) translateY(6px); opacity:1} }

        @media(max-width:768px){
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-lottie { display: none !important; }
          .hero-stats  { justify-content: center !important; }
          .hero-pills-row { justify-content: center !important; }
          .hero-btns { justify-content: center !important; }
          .hero-eyebrow { justify-content: center !important; }
          .hero-root { padding-top: 90px; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="hero-root"
        style={{ y: smoothY, opacity: smoothOpac }}
      >
        {/* BG layers */}
        <div className="hero-dots" aria-hidden />
        <div className="hero-orb hero-orb-1" aria-hidden />
        <div className="hero-orb hero-orb-2" aria-hidden />
        <div className="hero-orb hero-orb-3" aria-hidden />

        <div
          className="hero-inner"
          style={{
            maxWidth: 1180, margin: "0 auto", padding: "0 36px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 56, alignItems: "center", width: "100%",
            position: "relative", zIndex: 1,
          }}
        >
          {/* ────── LEFT ────── */}
          <div>

            {/* Eyebrow */}
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04, ease: [0.22,1,0.36,1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(236,91,19,0.09)",
                border: "1px solid rgba(236,91,19,0.2)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#ec5b13",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#ec5b13", display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(236,91,19,0.18)",
                  animation: "gp 2.4s ease-in-out infinite",
                }} />
                Premium IT Partner
              </span>
            </motion.div>

            {/* H1 line 1 */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.13, ease: [0.22,1,0.36,1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(34px,4.8vw,60px)",
                fontWeight: 900, lineHeight: 1.04,
                letterSpacing: "-0.04em", color: "#0d1321",
                margin: "0 0 4px",
              }}
            >
              Engineering
            </motion.h1>

            {/* H1 line 2 — gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.21, ease: [0.22,1,0.36,1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(34px,4.8vw,60px)",
                fontWeight: 900, lineHeight: 1.04,
                letterSpacing: "-0.04em",
                background: "linear-gradient(130deg,#ec5b13 0%,#ff8c5a 55%,#f97316 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "0 0 22px",
              }}
            >
              Intelligence
            </motion.h1>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.29, ease: [0.22,1,0.36,1] }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15.5, lineHeight: 1.74, color: "#5a6480",
                fontWeight: 300, maxWidth: 460,
                margin: "0 0 28px",
              }}
            >
              We craft scalable web & mobile products powered by AI, cloud infrastructure,
              and modern tech — from initial idea all the way to a product your users love.
            </motion.p>

            {/* Tech pills */}
            <motion.div
              className="hero-pills-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 34 }}
            >
              {TECH_PILLS.map((p, i) => (
                <motion.span
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.78 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.36, delay: 0.40 + i * 0.055, ease: [0.34,1.56,0.64,1] }}
                  whileHover={{ y: -3, transition: { duration: 0.16 } }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 100,
                    background: p.bg, border: `1px solid ${p.color}33`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11, fontWeight: 700, color: p.color,
                    letterSpacing: "0.04em", cursor: "default",
                  }}
                >
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: p.color, display: "inline-block", flexShrink: 0,
                  }} />
                  {p.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}
            >
              <motion.button
                onClick={() => navigate("/contactus")}
                whileHover={{ y: -3, boxShadow: "0 14px 36px rgba(236,91,19,0.38)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 28px", borderRadius: 100,
                  background: "linear-gradient(135deg,#ec5b13 0%,#f97316 100%)",
                  color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.03em",
                  boxShadow: "0 6px 24px rgba(236,91,19,0.28)",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "box-shadow 0.2s",
                }}
              >
                Get Started
                <span style={{ fontSize: 16 }}>→</span>
              </motion.button>

              <motion.button
                onClick={() => navigate("/casestudy")}
                whileHover={{ y: -3, borderColor: "#ec5b13", color: "#ec5b13" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 28px", borderRadius: 100,
                  background: "transparent", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.03em",
                  color: "#0d1321",
                  border: "1.5px solid rgba(0,0,0,0.13)",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                View Work
                <span style={{ fontSize: 14, opacity: 0.55 }}>↗</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              {STATS.map((s, i) => (
                <StatCard key={s.label} value={s.value} label={s.label} delay={0.62 + i * 0.07} />
              ))}
            </motion.div>
          </div>

          {/* ────── RIGHT — Lottie ────── */}
          <motion.div
            className="hero-lottie"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22,1,0.36,1] }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* glow orb behind lottie */}
            <div
              className="glow-pulse"
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: 340, height: 340, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(236,91,19,0.13) 0%,rgba(99,102,241,0.06) 50%,transparent 72%)",
                pointerEvents: "none", zIndex: 0,
              }}
            />
            {/* ring */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 460, height: 460, borderRadius: "50%",
              border: "1px solid rgba(236,91,19,0.07)",
              pointerEvents: "none", zIndex: 0,
            }} />

            {/* Lottie with float */}
            <div
              className="lottie-float"
              style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}
            >
              <Lottie animationData={coding} loop autoplay style={{ width: "100%", height: "auto" }} />
            </div>

            {/* Floating tech pills around lottie */}
            <div className="pill-f1" style={{ position:"absolute", top:"10%", right:"4%", zIndex:3 }}>
              <FloatingPill label="React.js"   color="#61dafb" bg="rgba(97,218,251,0.14)"  delay={0.55} floatClass="" />
            </div>
            <div className="pill-f2" style={{ position:"absolute", top:"37%", right:"-4%", zIndex:3 }}>
              <FloatingPill label="Node.js"    color="#68a063" bg="rgba(104,160,99,0.14)"  delay={0.68} floatClass="" />
            </div>
            <div className="pill-f3" style={{ position:"absolute", bottom:"20%", right:"2%", zIndex:3 }}>
              <FloatingPill label="AI / ML"    color="#ec5b13" bg="rgba(236,91,19,0.14)"   delay={0.82} floatClass="" />
            </div>
            <div className="pill-f4" style={{ position:"absolute", top:"16%", left:"0%", zIndex:3 }}>
              <FloatingPill label="Cloud"      color="#0ea5e9" bg="rgba(14,165,233,0.14)"  delay={0.63} floatClass="" />
            </div>
            <div className="pill-f5" style={{ position:"absolute", bottom:"28%", left:"-2%", zIndex:3 }}>
              <FloatingPill label="TypeScript" color="#3178c6" bg="rgba(49,120,198,0.14)"  delay={0.75} floatClass="" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="scroll-bounce"
          style={{
            position: "absolute", bottom: 28, left: "50%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            zIndex: 2,
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#b0bbc8",
          }}>
            Scroll
          </span>
          <div style={{
            width: 22, height: 34, borderRadius: 11,
            border: "1.5px solid rgba(236,91,19,0.28)",
            display: "flex", justifyContent: "center", paddingTop: 5,
          }}>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              style={{ width: 3, height: 3, borderRadius: "50%", background: "#ec5b13" }}
            />
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}