"use client"

<<<<<<< HEAD
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import Lottie from "lottie-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import about from "../assets/lottie/about.json"

/* ─── Animated Counter ─────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2.2,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    const unsub = rounded.on("change", (v) => setDisplay(String(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, target, duration, count, rounded])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ─── Stat Card ─────────────────────────────────────────────── */
interface StatCardProps {
  value: number
  suffix?: string
  label: string
  delay?: number
  accent: string          // tailwind gradient class
  icon: string            // material symbol
}

function StatCard({ value, suffix = "+", label, delay = 0, accent, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative flex-1 min-w-[140px] rounded-2xl overflow-hidden
                 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10
                 shadow-xl shadow-slate-200/60 dark:shadow-black/30 p-5"
    >
      {/* subtle gradient bleed top-left */}
      <div
        className={`absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-20 blur-2xl ${accent}`}
      />

      {/* icon badge */}
      <div
        className={`relative z-10 mb-3 inline-flex items-center justify-center
                    w-10 h-10 rounded-xl text-white text-lg ${accent}`}
      >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>

      {/* number */}
      <p className="relative z-10 text-4xl font-black tracking-tight leading-none text-slate-800 dark:text-white mb-1">
        <AnimatedCounter target={value} suffix={suffix} />
      </p>

      {/* label */}
      <p className="relative z-10 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
        {label}
      </p>

      {/* bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-[3px] w-full ${accent} opacity-70`} />
    </motion.div>
  )
}

/* ─── Main Section ──────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants:any = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  const navigate = useNavigate()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-28 dark:bg-background-dark"
    >
      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* large top-right blob */}
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px]
                        rounded-full bg-primary/8 blur-[120px]" />
        {/* bottom-left blob */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px]
                        rounded-full bg-purple-500/8 blur-[100px]" />
        {/* subtle dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-20 lg:flex-row"
        >

          {/* ── LEFT — Lottie + counters ── */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col items-center gap-8">

            {/* lottie card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden
                         bg-gradient-to-br from-slate-50 to-primary/5
                         dark:from-white/5 dark:to-primary/10
                         border border-slate-100 dark:border-white/10
                         shadow-2xl shadow-slate-200/50 dark:shadow-black/40 p-6"
            >
              {/* decorative ring */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full
                              border-2 border-primary/15 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full
                              border border-purple-500/15 pointer-events-none" />

              <Lottie animationData={about} loop className="w-full" />
            </motion.div>

            {/* ── Stat cards row ── */}
            <div className="flex w-full max-w-[420px] gap-4">
              <StatCard
                value={150}
                suffix="+"
                label="Projects Delivered"
                delay={0.3}
                accent="bg-gradient-to-br from-primary to-primary/70"
                icon="rocket_launch"
              />
              <StatCard
                value={12}
                suffix="+"
                label="Global Awards"
                delay={0.45}
                accent="bg-gradient-to-br from-purple-500 to-violet-400"
                icon="emoji_events"
              />
            </div>
          </motion.div>

          {/* ── RIGHT — Text content ── */}
          <motion.div variants={containerVariants} className="w-full lg:w-1/2 flex flex-col">

            {/* pill badge */}
            <motion.div
              variants={itemVariants}
              className="mb-5 self-start inline-flex items-center gap-2
                         rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
=======
import { motion } from "framer-motion"

const container:any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item:any = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-32 dark:bg-background-dark"
    >
      {/* background glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"
      />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-24 lg:flex-row"
        >
          
          {/* IMAGE */}
          <motion.div variants={item} className="relative lg:w-1/2">

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative z-20 overflow-hidden rounded-[3rem] shadow-2xl"
            >
              <img
                src="/image.png"
                alt="Modern tech workspace"
                className="h-[600px] w-full object-cover"
              />
            </motion.div>

            {/* floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="glass-nav absolute -bottom-12 -right-12 hidden max-w-[280px] rounded-[2.5rem] border border-white/20 p-10 shadow-2xl md:block"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-5xl font-black text-primary">150+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Projects Delivered
                  </p>
                </div>

                <div className="h-px bg-slate-200" />

                <div>
                  <p className="text-5xl font-black text-purple-500">12+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Global Awards
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div variants={container} className="lg:w-1/2">

            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
                Our Essence
              </span>
            </motion.div>

<<<<<<< HEAD
            {/* heading */}
            <motion.h2
              variants={itemVariants}
              className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl
                         text-slate-900 dark:text-white"
            >
              Where{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary to-purple-500
                                 bg-clip-text text-transparent">
                  Geometric Precision
                </span>
                {/* underline squiggle */}
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,6 Q25,0 50,6 Q75,12 100,6 Q125,0 150,6 Q175,12 200,6"
                    fill="none"
                    stroke="url(#squigGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="squigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-primary, #6366f1)" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </motion.svg>
=======
            <motion.h2
              variants={item}
              className="mb-8 text-4xl font-extrabold leading-tight md:text-5xl"
            >
              Where{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Geometric Precision
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
              </span>{" "}
              Meets Organic Creativity
            </motion.h2>

<<<<<<< HEAD
            {/* body copy */}
            <motion.p
              variants={itemVariants}
              className="mb-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400"
            >
              At Code Creative, we believe software should be as dynamic as the
=======
            <motion.p
              variants={item}
              className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              At Morphos IT, we believe software should be as dynamic as the
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
              businesses it powers. We use geometric precision to build robust
              architectures and organic creativity to design seamless user
              interfaces.
            </motion.p>

            <motion.p
<<<<<<< HEAD
              variants={itemVariants}
              className="mb-8 text-lg leading-relaxed text-slate-500 dark:text-slate-400"
            >
              Our team of visionary developers and designers work at the
              intersection of form and function — delivering products that
              aren't just tools, but competitive advantages.
            </motion.p>

            {/* feature pills */}
            <motion.div variants={itemVariants} className="mb-10 flex flex-wrap gap-2">
              {["UI/UX Design", "Full-Stack Dev", "Cloud Solutions", "AI Integration"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 dark:bg-white/8
                             px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300
                             border border-slate-200 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.button
              variants={itemVariants}
              onClick={() => navigate("/aboutus")}
              whileHover="hover"
              className="group self-start flex items-center gap-3
                         rounded-full bg-gradient-to-r from-primary to-purple-500
                         px-7 py-3 text-sm font-bold text-white
                         shadow-lg shadow-primary/30 hover:shadow-primary/50
                         transition-shadow duration-300"
            >
              Learn More About Our Story
              <motion.span
                className="material-symbols-outlined text-[18px]"
                initial={{ x: 0 }}
                variants={{ hover: { x: 5 } }}
                transition={{ type: "spring", stiffness: 300 }}
=======
              variants={item}
              className="mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Our team of visionary developers and designers work at the
              intersection of form and function, delivering products that
              aren't just tools, but competitive advantages.
            </motion.p>

            {/* CTA */}
            <motion.button
              variants={item}
              whileHover={{ x: 5 }}
              className="group mt-4 flex items-center gap-3 font-bold text-primary"
            >
              Learn More About Our Story
              <motion.span
                className="material-symbols-outlined"
                whileHover={{ x: 6 }}
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
              >
                arrow_forward
              </motion.span>
            </motion.button>

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}