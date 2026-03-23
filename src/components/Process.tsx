"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef } from "react"

interface ProcessStep {
  number: string
  title: string
  description: string
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
      </div>
    </motion.div>
  )
}

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
      />
    </div>
  )
}

// Each row — watches its own visibility
function StepRow({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" })

  return (
    <div
      ref={ref}
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
      </div>
    </div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  })

  const rawLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const lineHeight = useSpring(rawLine as any, { stiffness: 60, damping: 20 })

  return (
    <section
      ref={sectionRef}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}