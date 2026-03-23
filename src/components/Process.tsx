<<<<<<< HEAD
// Process.tsx — Properly sized cards with refined animations
// npm install framer-motion lottie-react
// primary: #ec5b13 | bg: #f8f6f6

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef } from "react"
import Lottie from "lottie-react"

// ─── Types ────────────────────────────────────────────────────────────────────
=======
"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef } from "react"

>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
interface ProcessStep {
  number: string
  title: string
  description: string
<<<<<<< HEAD
  accent: string
  glow: string
  side: "left" | "right"
  lottieFile: any
}

// ─── Steps factory — wire your lottie imports here ───────────────────────────
export const makeSteps = (
  contactus: any, research: any, str: any, design: any,
  develop: any, test: any, deploy: any, gro: any
): ProcessStep[] => [
  {
    number: "01", title: "Discover", side: "left",
    description: "We explore your business goals, target audience, and technical challenges to fully understand your product vision.",
    accent: "#ec5b13", glow: "rgba(236,91,19,0.22)", lottieFile: contactus,
  },
  {
    number: "02", title: "Research", side: "right",
    description: "Through competitor analysis and user behavior insights, we identify opportunities that give your product a strategic advantage.",
    accent: "#6366f1", glow: "rgba(99,102,241,0.22)", lottieFile: research,
  },
  {
    number: "03", title: "Strategy", side: "left",
    description: "We design a scalable roadmap, choose the right technologies, and structure the architecture for long-term growth.",
    accent: "#8b5cf6", glow: "rgba(139,92,246,0.22)", lottieFile: str,
  },
  {
    number: "04", title: "Design", side: "right",
    description: "Our design team crafts intuitive UI/UX experiences that focus on usability, aesthetics, and seamless user journeys.",
    accent: "#ec4899", glow: "rgba(236,72,153,0.22)", lottieFile: design,
  },
  {
    number: "05", title: "Develop", side: "left",
    description: "Our engineers build scalable, secure, and high-performance applications using modern frameworks and best practices.",
    accent: "#06b6d4", glow: "rgba(6,182,212,0.22)", lottieFile: develop,
  },
  {
    number: "06", title: "Test", side: "right",
    description: "Rigorous testing ensures performance, security, and reliability across all devices and environments before deployment.",
    accent: "#ef4444", glow: "rgba(239,68,68,0.22)", lottieFile: test,
  },
  {
    number: "07", title: "Launch", side: "left",
    description: "We deploy your product to production with optimized infrastructure and monitoring to ensure a smooth release.",
    accent: "#f97316", glow: "rgba(249,115,22,0.22)", lottieFile: deploy,
  },
  {
    number: "08", title: "Growth", side: "right",
    description: "After launch, we continuously optimize, introduce new features, and scale infrastructure as your product grows.",
    accent: "#10b981", glow: "rgba(16,185,129,0.22)", lottieFile: gro,
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────
function StepCard({ step, isVisible }: { step: ProcessStep; isVisible: boolean }) {
  const fromX = step.side === "right" ? 48 : -48

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, y: 12 }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: fromX, y: 12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: "easeOut" } }}
      style={{
        /* ── KEY FIX: constrain card to the column, never full viewport ── */
        width: "100%",
        maxWidth: 420,
        background: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        position: "relative",
        cursor: "default",
        /* hover glow via CSS custom property workaround */
      }}
      whileFocus={{ outline: "none" }}
    >
      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${step.accent} 0%, ${step.accent}55 100%)`,
          transformOrigin: "left",
          zIndex: 2,
        }}
      />

      {/* Ghost watermark number */}
      <div style={{
        position: "absolute", bottom: -8, right: 10,
        fontFamily: " sans-serif",
        fontSize: 88, fontWeight: 900, lineHeight: 1,
        color: step.accent, opacity: 0.045,
        userSelect: "none", pointerEvents: "none", zIndex: 0,
      }}>
        {step.number}
      </div>

      {/* ── Lottie block — fixed height, no overflow ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          /* FIXED height so lottie never blows the card up */
          height: 190,
          background: `linear-gradient(160deg, ${step.accent}0f 0%, ${step.accent}06 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 65%, ${step.accent}16 0%, transparent 68%)`,
          pointerEvents: "none",
        }} />
        {isVisible && step.lottieFile && (
          <Lottie
            animationData={step.lottieFile}
            loop
            autoplay
            style={{
              /* strict size cap — Lottie fills its container */
              width: 160,
              height: 160,
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          />
        )}
      </motion.div>

      {/* ── Text content ── */}
      <div style={{ padding: "18px 22px 24px", position: "relative", zIndex: 1 }}>

        {/* Step badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 6 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          style={{ marginBottom: 10 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 9, fontWeight: 800, letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "4px 11px", borderRadius: 100,
            background: `${step.accent}14`, color: step.accent,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{
              width: 4, height: 4, borderRadius: "50%",
              background: step.accent, display: "inline-block", flexShrink: 0,
            }} />
            Step {step.number}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 0.45, delay: 0.32 }}
          style={{
            fontFamily: " sans-serif",
            fontSize: 20, fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0f1129",
            marginBottom: 8, lineHeight: 1.15, margin: "0 0 8px",
          }}
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 6 }}
          transition={{ duration: 0.45, delay: 0.38 }}
          style={{
            fontSize: 13, color: "#6b7280",
            lineHeight: 1.72, margin: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {step.description}
        </motion.p>
=======
  icon: string
  accent: string
  glow: string
  reverse?: boolean
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We explore your business goals, target audience, and technical challenges to fully understand your product vision and opportunities.",
    icon: "search",
    accent: "#ec5b13",
    glow: "rgba(236,91,19,0.4)",
  },
  {
    number: "02",
    title: "Research",
    description: "Through competitor analysis, market research, and user behavior insights, we identify opportunities that give your product a strategic advantage.",
    icon: "insights",
    accent: "#6366f1",
    glow: "rgba(99,102,241,0.4)",
    reverse: true,
  },
  {
    number: "03",
    title: "Strategy",
    description: "We design a scalable roadmap, choose the right technologies, and structure the architecture to support long-term growth.",
    icon: "architecture",
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    number: "04",
    title: "Design",
    description: "Our design team crafts intuitive UI/UX experiences that focus on usability, aesthetics, and seamless user journeys.",
    icon: "design_services",
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.4)",
    reverse: true,
  },
  {
    number: "05",
    title: "Develop",
    description: "Our engineers build scalable, secure, and high-performance applications using modern frameworks and best coding practices.",
    icon: "code",
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
  },
  {
    number: "06",
    title: "Test",
    description: "Rigorous testing ensures performance, security, and reliability across devices and environments before deployment.",
    icon: "bug_report",
    accent: "#ef4444",
    glow: "rgba(239,68,68,0.4)",
    reverse: true,
  },
  {
    number: "07",
    title: "Launch",
    description: "We deploy your product to production with optimized infrastructure and monitoring to ensure a smooth release.",
    icon: "rocket_launch",
    accent: "#f97316",
    glow: "rgba(249,115,22,0.4)",
  },
  {
    number: "08",
    title: "Growth",
    description: "After launch, we continuously optimize performance, introduce new features, and scale infrastructure as your product grows.",
    icon: "trending_up",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    reverse: true,
  },
]

// Card animates in from left or right
function StepCard({ step, isVisible }: { step: ProcessStep; isVisible: boolean }) {
  const fromX = step.reverse ? 100 : -100

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : fromX,
        filter: isVisible ? "blur(0px)" : "blur(8px)",
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`lg:w-[46%] ${step.reverse ? "lg:ml-auto" : "lg:mr-auto"}`}
    >
      <div
        className="relative bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        {/* Animated accent corner */}
        <motion.div
          animate={{ width: isVisible ? "100%" : "0%" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="absolute top-0 left-0 h-[2px] rounded-full"
          style={{ background: step.accent }}
        />

        {/* Step number — large ghost text behind */}
        <div
          className="absolute -top-3 right-4 text-[72px] font-black leading-none select-none pointer-events-none"
          style={{ color: step.accent, opacity: 0.06 }}
        >
          {step.number}
        </div>

        <div className={step.reverse ? "text-left" : "lg:text-right"}>
          <motion.div
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span
              className="inline-block text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-3"
              style={{ background: `${step.accent}18`, color: step.accent }}
            >
              Step {step.number}
            </span>
          </motion.div>

          <motion.h5
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-[20px] font-extrabold text-slate-900 dark:text-white mb-3 leading-tight"
          >
            {step.title}
          </motion.h5>

          <motion.p
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="text-slate-500 dark:text-slate-400 text-[14px] leading-[1.75]"
          >
            {step.description}
          </motion.p>
        </div>
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
      </div>
    </motion.div>
  )
}

<<<<<<< HEAD
// ─── Center Timeline Node ─────────────────────────────────────────────────────
function TimelineNode({ step, isVisible }: { step: ProcessStep; isVisible: boolean }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: 60,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      /* align node vertically with the lottie area center */
      paddingTop: 95,
    }}>
      {/* Ripple rings — two pulses */}
      {[0, 1].map((ri) => (
        <motion.div
          key={ri}
          initial={{ scale: 1, opacity: 0 }}
          animate={isVisible
            ? { scale: [1, 2.4 + ri * 0.35], opacity: [0.45, 0] }
            : { scale: 1, opacity: 0 }}
          transition={{ duration: 0.85, delay: ri * 0.18, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 95,
            width: 48, height: 48,
            borderRadius: "50%",
            background: step.glow,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Node circle */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={isVisible
          ? { scale: 1, rotate: 0, opacity: 1 }
          : { scale: 0, rotate: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
        whileHover={{ scale: 1.12, rotate: 6, transition: { duration: 0.22 } }}
        style={{
          width: 48, height: 48,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${step.accent} 0%, ${step.accent}bb 100%)`,
          boxShadow: `0 6px 22px ${step.glow}, 0 2px 6px rgba(0,0,0,0.1)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden", cursor: "default",
        }}
      >
        {/* shine */}
        <div style={{
          position: "absolute", top: -5, left: -5,
          width: 18, height: 18,
          background: "rgba(255,255,255,0.22)",
          transform: "rotate(45deg)", borderRadius: 3,
        }} />
        <span style={{
          fontFamily: " sans-serif",
          fontSize: 12, fontWeight: 900, color: "#fff",
          position: "relative", zIndex: 1, letterSpacing: "-0.02em",
        }}>
          {step.number}
        </span>
      </motion.div>

      {/* Small connector dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#fff", border: `2px solid ${step.accent}`,
          marginTop: 10,
          boxShadow: `0 0 8px ${step.glow}`,
          flexShrink: 0,
        }}
=======
// Icon animates with a burst + spin
function StepIcon({ step, isVisible }: { step: ProcessStep; isVisible: boolean }) {
  return (
    <div className="flex-shrink-0 relative z-10 flex items-center justify-center">
      {/* Ripple ring */}
      <motion.div
        animate={isVisible ? {
          scale: [1, 2.2],
          opacity: [0.5, 0],
        } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute w-16 h-16 rounded-full"
        style={{ background: step.glow }}
      />

      {/* Second ripple */}
      <motion.div
        animate={isVisible ? {
          scale: [1, 1.8],
          opacity: [0.3, 0],
        } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="absolute w-16 h-16 rounded-full"
        style={{ background: step.glow }}
      />

      {/* Main icon box */}
      <motion.div
        animate={{
          scale: isVisible ? 1 : 0,
          rotate: isVisible ? 0 : -30,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 14,
          delay: 0.15,
        }}
        whileHover={{ scale: 1.12, rotate: 6 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white relative"
        style={{
          background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)`,
          boxShadow: `0 8px 32px ${step.glow}`,
        }}
      >
        {/* Shine overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute -top-4 -left-4 w-10 h-10 bg-white/20 rotate-45 rounded-sm" />
        </div>
        <span className="material-symbols-outlined text-[26px] relative z-10">
          {step.icon}
        </span>
      </motion.div>

      {/* Connector dot on the line */}
      <motion.div
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute w-3 h-3 rounded-full bg-white border-2 -bottom-8"
        style={{ borderColor: step.accent }}
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
      />
    </div>
  )
}

<<<<<<< HEAD
// ─── Row ──────────────────────────────────────────────────────────────────────
function StepRow({ step }: { step: ProcessStep }) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useInView(ref, { once: true, margin: "-6% 0px -6% 0px" })
=======
// Each row — watches its own visibility
function StepRow({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" })
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b

  return (
    <div
      ref={ref}
<<<<<<< HEAD
      style={{
        display: "grid",
        /* left column | center spine | right column */
        gridTemplateColumns: "1fr 80px 1fr",
        alignItems: "start",
        columnGap: 16,
      }}
    >
      {/* LEFT slot */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        /* push card to the right edge of the left column */
      }}>
        {step.side === "left"
          ? <StepCard step={step} isVisible={isVisible} />
          : <div />}
      </div>

      {/* CENTER spine */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TimelineNode step={step} isVisible={isVisible} />
      </div>

      {/* RIGHT slot */}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {step.side === "right"
          ? <StepCard step={step} isVisible={isVisible} />
          : <div />}
=======
      className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-0 relative`}
    >
      {/* Left slot */}
      <div className="lg:w-[46%] w-full flex items-center justify-end">
        {!step.reverse && <StepCard step={step} isVisible={isVisible} />}
      </div>

      {/* Center icon */}
      <div className="lg:w-[8%] flex justify-center">
        <StepIcon step={step} isVisible={isVisible} />
      </div>

      {/* Right slot */}
      <div className="lg:w-[46%] w-full flex items-center justify-start">
        {step.reverse && <StepCard step={step} isVisible={isVisible} />}
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
      </div>
    </div>
  )
}

<<<<<<< HEAD
// ─── Section Header ───────────────────────────────────────────────────────────
function Header() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: "center", marginBottom: 80 }}
    >
      {/* Eyebrow */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 26, height: 2, background: "#ec5b13",
            borderRadius: 2, transformOrigin: "right",
          }}
        />
        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "#ec5b13",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          How We Work
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 26, height: 2, background: "#ec5b13",
            borderRadius: 2, transformOrigin: "left",
          }}
        />
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: " sans-serif",
        fontSize: "clamp(30px, 4.5vw, 50px)",
        fontWeight: 800, letterSpacing: "-0.04em",
        color: "#0f1129", marginBottom: 14, lineHeight: 1.05,
      }}>
        Our{" "}
        <span style={{
          background: "linear-gradient(135deg, #ec5b13 0%, #ff8c5a 55%, #ffb599 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Process
        </span>
      </h2>

      <p style={{
        fontSize: 14, color: "#9ca3af",
        maxWidth: 380, margin: "0 auto", lineHeight: 1.72,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Eight steps from idea to impact — refined through hundreds of successful projects.
      </p>
    </motion.div>
  )
}

// ─── Scroll-driven timeline line ─────────────────────────────────────────────
function TimelineLine({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 30%"],
  })

  const rawH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineH = useSpring(rawH as any, { stiffness: 60, damping: 22 })

  return (
    <>
      {/* static bg track */}
      <div style={{
        position: "absolute",
        left: "50%", transform: "translateX(-50%)",
        top: 0, bottom: 0, width: 1,
        background: "rgba(236,91,19,0.10)",
        zIndex: 0,
      }} />
      {/* animated fill */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%", transform: "translateX(-50%)",
          top: 0, width: 2,
          height: lineH as any,
          background: "linear-gradient(to bottom,#ec5b13,#6366f1,#8b5cf6,#ec4899,#06b6d4,#ef4444,#f97316,#10b981)",
          borderRadius: 2,
          zIndex: 1,
          transformOrigin: "top",
        }}
      />
    </>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
interface ProcessProps {
  steps: ProcessStep[]
}

export default function Process({ steps }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null)
=======
export default function Process() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  })

  const rawLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineHeight = useSpring(rawLine as any, { stiffness: 60, damping: 20 })
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b

  return (
    <section
      ref={sectionRef}
<<<<<<< HEAD
      style={{
        padding: "100px 24px 120px",
        background: "#f8f6f6",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        /* mobile: single column */
        @media (max-width: 720px) {
          .proc-timeline-grid {
            grid-template-columns: 1fr !important;
            column-gap: 0 !important;
          }
          .proc-timeline-grid .proc-center-col {
            display: none !important;
          }
          .proc-timeline-grid .proc-left-col,
          .proc-timeline-grid .proc-right-col {
            justify-content: center !important;
          }
          .proc-timeline-wrap::before,
          .proc-timeline-wrap > div:first-child {
            display: none !important;
          }
        }
      `}</style>

      {/* Dot grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(236,91,19,0.05) 1.5px, transparent 0)`,
        backgroundSize: "34px 34px",
      }} />

      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: 420, height: 420, borderRadius: "50%",
        background: "rgba(236,91,19,0.045)", filter: "blur(80px)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "-5%",
        width: 380, height: 380, borderRadius: "50%",
        background: "rgba(6,182,212,0.035)", filter: "blur(70px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Header />

        {/* Timeline wrapper — relative so the line can be absolutely positioned */}
        <div
          className="proc-timeline-wrap"
          style={{ position: "relative" }}
        >
          <TimelineLine sectionRef={sectionRef as React.RefObject<HTMLElement>} />

          {/* Rows stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 56, position: "relative", zIndex: 2 }}>
            {steps.map(step => (
              <StepRow key={step.number} step={step} />
=======
      className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-orange-500/5 animate-pulse" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full blur-[100px] bg-cyan-500/5 animate-pulse" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-orange-500 mb-3">
            How We Work
          </p>
          <h2 className="text-[40px] font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Process
          </h2>
          <p className="text-slate-400 mt-3 text-[15px] max-w-md mx-auto">
            Eight steps from idea to impact — refined through hundreds of successful projects.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative">

          {/* Background line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800 hidden lg:block" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full hidden lg:block origin-top"
            style={{
              height: lineHeight as any,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, #ec5b13, #6366f1, #8b5cf6, #ec4899, #06b6d4, #ef4444, #f97316, #10b981)",
              position: "absolute",
              top: 0,
              width: 2,
            }}
          />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} />
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
            ))}
          </div>
        </div>
      </div>
    </section>
  )
<<<<<<< HEAD
}

// ─── Usage (in your page) ─────────────────────────────────────────────────────
// import contactus from "../assets/lottie/Discover.json"
// import research  from "../assets/lottie/thinking.json"
// import str       from "../assets/lottie/strategy.json"
// import design    from "../assets/lottie/design.json"
// import develop   from "../assets/lottie/develop.json"
// import test      from "../assets/lottie/test.json"
// import deploy    from "../assets/lottie/launch.json"
// import gro       from "../assets/lottie/growth.json"
// import Process, { makeSteps } from "./Process"
//
// const steps = makeSteps(contactus, research, str, design, develop, test, deploy, gro)
// return <Process steps={steps} />
=======
}
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
