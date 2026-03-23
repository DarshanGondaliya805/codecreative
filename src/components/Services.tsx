"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface Service {
  icon: string
  title: string
  description: string
  accent: string
  glow: string
  chip: string
  features: string[]
}

const services: Service[] = [
  {
    icon: "language",
    title: "Web Development",
    description: "Modern, high-performance web applications built with the latest reactive frameworks.",
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.15)",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    features: ["React & Next.js", "Enterprise Portals"],
  },
  {
    icon: "smartphone",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions for iOS and Android.",
    accent: "#0891b2",
    glow: "rgba(8,145,178,0.15)",
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    features: ["Flutter & React Native", "Swift/Kotlin Native"],
  },
  {
    icon: "token",
    title: "SaaS Solutions",
    description: "Scalable multi-tenant architectures built for global distribution.",
    accent: "#9333ea",
    glow: "rgba(147,51,234,0.15)",
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    features: ["Subscription Engines", "API Integration"],
  },
  {
    icon: "cloud",
    title: "Cloud Computing",
    description: "Migration and management of secure, scalable cloud infrastructure.",
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.15)",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    features: ["AWS / Azure / GCP", "DevSecOps"],
  },
  {
    icon: "neurology",
    title: "AI & ML",
    description: "Intelligent automation and predictive analytics tools powered by modern LLMs.",
    accent: "#db2777",
    glow: "rgba(219,39,119,0.15)",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    features: ["LLM Integration", "Data Mining"],
  },
  {
    icon: "palette",
    title: "UI/UX Design",
    description: "Shape-driven interfaces that prioritize user journey and lasting delight.",
    accent: "#4f46e5",
    glow: "rgba(79,70,229,0.15)",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    features: ["Motion Design", "Design Systems"],
  },
]

function ServiceCard({
  service,
  index,
  scrollYProgress,
}: {
  service: Service
  index: number
  scrollYProgress: any
}) {
  const total = services.length

  // Distribute cards evenly across 0.15–0.85 of scroll range
  // This gives breathing room at start AND end so first/last cards aren't rushed
  const scrollStart = 0.05
  const scrollEnd = 0.80
  const usableRange = scrollEnd - scrollStart
  const step = usableRange / (total - 1)

  const cardCenter = scrollStart + index * step
  const animWindow = 0.12

  const start = Math.max(0, cardCenter - animWindow)
  const end = Math.min(1, cardCenter + animWindow * 0.3)

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [55, 0])
  const scale = useTransform(scrollYProgress, [start, end], [0.93, 1])

  return (
    <motion.div style={{ opacity, y, scale }} className="flex-shrink-0">
      <div
        className="w-[340px] rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-800 flex flex-col"
        style={{ minHeight: 320 }}
      >
        <div className="h-1 w-full" style={{ background: service.accent }} />
        <div className="p-7 flex flex-col gap-5 flex-1">
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: service.glow }}
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ color: service.accent }}
              >
                {service.icon}
              </span>
            </div>
            <div className="flex flex-col justify-center pt-0.5">
              <h4 className="text-[17px] font-bold leading-tight text-slate-900 dark:text-white">
                {service.title}
              </h4>
            </div>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-[1.7]">
            {service.description}
          </p>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          <div className="flex flex-wrap gap-2">
            {service.features.map((f) => (
              <span
                key={f}
                className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full ${service.chip}`}
              >
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ color: service.accent }}
                >
                  check_circle
                </span>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Slower horizontal movement — starts later, ends earlier
  // so cards linger longer in view at both ends
  const x = useTransform(scrollYProgress, [0.05, 0.90], ["0%", "-65%"])

  const headingOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0])
  const headingY = useTransform(scrollYProgress, [0.08, 0.16], [0, -20])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    // Increased to 600vh — more scroll distance = slower perceived speed
    <section
      ref={ref}
      className="relative bg-slate-50 dark:bg-slate-950"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="flex-shrink-0 px-12 mb-10"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2"
            style={{ color: "#7c3aed" }}
          >
            What We Do
          </p>
          <h2 className="text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Services
          </h2>
          <p className="text-slate-400 mt-2 text-[15px]">
            Scroll to explore everything we offer
          </p>
        </motion.div>

        <div className="flex-shrink-0 overflow-visible">
          <motion.div style={{ x }} className="flex gap-5 px-12">
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
            <div className="flex-shrink-0 w-16" />
          </motion.div>
        </div>

        <div className="flex-shrink-0 px-12 mt-10 space-y-3">
          <div className="flex gap-2 items-center">
            {services.map((s, i) => {
              const total = services.length
              const scrollStart = 0.05
              const scrollEnd = 0.80
              const step = (scrollEnd - scrollStart) / (total - 1)
              const center = scrollStart + i * step
              const dotOpacity = useTransform(
                scrollYProgress,
                [Math.max(0, center - 0.12), center],
                [0.25, 1]
              )
              const dotScale = useTransform(
                scrollYProgress,
                [Math.max(0, center - 0.12), center],
                [0.7, 1]
              )
              return (
                <motion.div
                  key={i}
                  style={{ opacity: dotOpacity, scale: dotScale, background: s.accent }}
                  className="w-2 h-2 rounded-full"
                />
              )
            })}
          </div>

          <div className="w-48 h-[2px] rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: progressWidth,
                background: "linear-gradient(to right, #7c3aed, #db2777)",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}