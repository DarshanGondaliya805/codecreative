"use client"

<<<<<<< HEAD
import { motion, useScroll,  useSpring } from "framer-motion"
=======
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion"
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
import { useRef, useEffect, useState } from "react"

interface TimelineItem {
  year: string
  title: string
  description: string
  accent: string
  border: string
  glow: string
  chipColor: string
  reverse: boolean
  isCurrent?: boolean
}

const items: TimelineItem[] = [
  {
    year: "2018",
    title: "Company Founded",
    description: "The beginning of our mission to blend technical precision with organic design thinking.",
    accent: "#ec5b13",
    border: "#ec5b13",
    glow: "rgba(236,91,19,0.35)",
    chipColor: "bg-orange-100 text-orange-700",
    reverse: false,
  },
  {
    year: "2019",
    title: "First 50 Clients",
    description: "Rapid growth fueled by our commitment to delivering high-performance digital products.",
    accent: "#8b5cf6",
    border: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    chipColor: "bg-violet-100 text-violet-700",
    reverse: true,
  },
  {
    year: "2021",
    title: "Expanded Dev Team",
    description: "Scaling our talent pool to include world-class engineers and visionary designers.",
    accent: "#06b6d4",
    border: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    chipColor: "bg-cyan-100 text-cyan-700",
    reverse: false,
  },
  {
    year: "2023",
    title: "Global Clients in 15+ Countries",
    description: "Establishing a truly international presence with projects spanning multiple continents.",
    accent: "#f97316",
    border: "#f97316",
    glow: "rgba(249,115,22,0.35)",
    chipColor: "bg-orange-100 text-orange-700",
    reverse: true,
  },
  {
    year: "2025",
    title: "Launched AI & SaaS Services",
    description: "Pioneering the next generation of intelligent automation and scalable architecture.",
    accent: "#ec5b13",
    border: "#ec5b13",
    glow: "rgba(236,91,19,0.5)",
    chipColor: "bg-orange-100 text-orange-700",
    reverse: false,
    isCurrent: true,
  },
]

// Individual card — slides in from left or right when its node becomes active
function TimelineCard({
  item,
  index,
  activeIndex,
}: {
  item: TimelineItem
  index: number
  activeIndex: number
}) {
  const isVisible = activeIndex >= index
  const fromX = item.reverse ? 80 : -80

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : fromX,
        scale: isVisible ? 1 : 0.94,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`md:w-[45%] ${item.reverse ? "md:ml-auto md:text-left" : "md:mr-auto md:text-right"}`}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
      >
        {/* Accent left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ background: item.accent }}
        />

        <div className={`pl-3 ${item.reverse ? "text-left" : "md:text-right"}`}>
          {/* Year badge */}
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background: `${item.accent}18`, color: item.accent }}
          >
            {item.year}
          </span>

          <h4 className="text-[17px] font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
            {item.title}
          </h4>

          <p className="text-slate-500 dark:text-slate-400 text-[13.5px] leading-relaxed">
            {item.description}
          </p>

          {item.isCurrent && (
            <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-orange-500 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Current
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const sectionRef = useRef<any>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
<<<<<<< HEAD
=======
  const [rocketPx, setRocketPx] = useState(0)
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
  const [lineH, setLineH] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 60%"],
  })

  // Smooth spring for rocket so it glides between nodes
  const springY = useSpring(0, { stiffness: 80, damping: 18, mass: 0.8 })

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (progress) => {
      if (!lineRef.current || !sectionRef.current) return

      const lineRect = lineRef.current.getBoundingClientRect()
      const sectionRect = sectionRef.current.getBoundingClientRect()
      const lineTopInSection = lineRect.top - sectionRect.top + sectionRef.current.scrollTop

      const totalLineHeight = lineRef.current.offsetHeight

      // Gather node positions relative to line top
      const nodePositions = nodeRefs.current.map((node) => {
        if (!node) return 0
        const nodeRect = node.getBoundingClientRect()
        const nodeCenterInSection = nodeRect.top - sectionRect.top + sectionRef.current.scrollTop + nodeRect.height / 2
        return nodeCenterInSection - lineTopInSection
      })

      // Determine which node is active based on progress
      const segmentSize = 1 / items.length
      const currentSegment = Math.floor(progress / segmentSize)
      const clampedSegment = Math.min(currentSegment, items.length - 1)
      setActiveIndex(clampedSegment)

      // Interpolate rocket Y between node positions
      if (nodePositions.length === 0) return

      const segProgress = (progress - clampedSegment * segmentSize) / segmentSize
      const fromPos = nodePositions[clampedSegment] ?? 0
      const toPos = nodePositions[Math.min(clampedSegment + 1, items.length - 1)] ?? fromPos
      const targetY = fromPos + (toPos - fromPos) * Math.min(segProgress, 1)

      springY.set(targetY - 20) // -20 to center rocket on line

      // Line fill height
      setLineH(Math.min(progress, 1) * totalLineHeight)
    })
    return unsub
  }, [scrollYProgress, springY])

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
      id="timeline"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-orange-500 mb-3">
            Our Journey
          </p>
          <h3 className="text-[38px] font-extrabold text-slate-900 dark:text-white leading-tight">
            Company Timeline
          </h3>
        </div>

        {/* Timeline layout */}
        <div className="relative">

          {/* Center vertical track */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block rounded-full"
          />

          {/* Animated fill line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] hidden md:block rounded-full overflow-hidden z-[1]"
            style={{ height: lineH, background: "linear-gradient(to bottom, #ec5b13, #8b5cf6, #06b6d4, #f97316, #ec5b13)" }}
          />

          {/* Rocket — absolutely positioned, moves via spring */}
          <motion.div
            style={{ y: springY }}
            className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #ec5b13, #f97316)",
                boxShadow: "0 0 20px rgba(236,91,19,0.5)",
              }}
            >
              <span className="material-symbols-outlined text-white text-[20px]">
                rocket_launch
              </span>
            </div>
          </motion.div>

          {/* Items */}
          <div className="space-y-20">
            {items.map((item, index) => (
              <div
                key={item.year}
                className="flex flex-col md:flex-row items-center gap-6 relative"
              >
                {/* Left side — card or spacer */}
                {!item.reverse ? (
                  <TimelineCard item={item} index={index} activeIndex={activeIndex} />
                ) : (
                  <div className="hidden md:block md:w-[45%]" />
                )}

                {/* Center node */}
                <div className="flex-shrink-0 flex items-center justify-center z-10">
                  <motion.div
                    ref={(el) => { nodeRefs.current[index] = el }}
                    animate={{
                      scale: activeIndex >= index ? 1 : 0.7,
                      boxShadow: activeIndex >= index
                        ? `0 0 0 4px white, 0 0 20px ${item.glow}`
                        : "0 0 0 3px white",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-5 h-5 rounded-full border-4 bg-white dark:bg-slate-950"
                    style={{
                      borderColor: activeIndex >= index ? item.border : "#cbd5e1",
                    }}
                  />
                </div>

                {/* Right side — card or spacer */}
                {item.reverse ? (
                  <TimelineCard item={item} index={index} activeIndex={activeIndex} />
                ) : (
                  <div className="hidden md:block md:w-[45%]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}