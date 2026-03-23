<<<<<<< HEAD
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef } from "react"
// import Lottie from "lottie-react"
import { Link, useNavigate } from "react-router-dom"

// ── Inline Lottie JSON data (lightweight hand-drawn question mark) ──────────
// Using a simple programmatic Lottie for the hero decoration
// const questionMarkLottie = {
//   v: "5.7.4",
//   fr: 30,
//   ip: 0,
//   op: 90,
//   w: 200,
//   h: 200,
//   nm: "Question Mark",
//   ddd: 0,
//   assets: [],
//   layers: [
//     {
//       ddd: 0,
//       ind: 1,
//       ty: 4,
//       nm: "Q Mark",
//       sr: 1,
//       ks: {
//         o: { a: 0, k: 100 },
//         r: {
//           a: 1,
//           k: [
//             { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] }, t: 0, s: [0] },
//             { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] }, t: 45, s: [10] },
//             { t: 90, s: [0] },
//           ],
//         },
//         p: { a: 0, k: [100, 100, 0] },
//         s: {
//           a: 1,
//           k: [
//             { i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] }, t: 0, s: [90, 90] },
//             { i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] }, t: 45, s: [110, 110] },
//             { t: 90, s: [90, 90] },
//           ],
//         },
//       },
//       ao: 0,
//       shapes: [
//         {
//           ty: "gr",
//           it: [
//             {
//               ty: "el",
//               p: { a: 0, k: [0, -20] },
//               s: { a: 0, k: [60, 60] },
//             },
//             {
//               ty: "st",
//               c: { a: 0, k: [0.37, 0.53, 1, 1] },
//               o: { a: 0, k: 100 },
//               w: { a: 0, k: 8 },
//               lc: 2,
//               lj: 2,
//             },
//             {
//               ty: "fl",
//               c: { a: 0, k: [0, 0, 0, 0] },
//               o: { a: 0, k: 0 },
//             },
//             { ty: "tr", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
//           ],
//         },
//       ],
//       ip: 0,
//       op: 90,
//       st: 0,
//     },
//   ],
// }

// ── Lottie checkmark for open state ─────────────────────────────────────────
// const checkLottie = {
//   v: "5.7.4",
//   fr: 60,
//   ip: 0,
//   op: 60,
//   w: 48,
//   h: 48,
//   nm: "Check",
//   ddd: 0,
//   assets: [],
//   layers: [
//     {
//       ddd: 0,
//       ind: 1,
//       ty: 4,
//       nm: "circle",
//       sr: 1,
//       ks: {
//         o: { a: 0, k: 100 },
//         r: { a: 0, k: 0 },
//         p: { a: 0, k: [24, 24, 0] },
//         s: { a: 0, k: [100, 100, 100] },
//       },
//       ao: 0,
//       shapes: [
//         {
//           ty: "gr",
//           it: [
//             {
//               ty: "el",
//               p: { a: 0, k: [0, 0] },
//               s: {
//                 a: 1,
//                 k: [
//                   { i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] }, t: 0, s: [0, 0] },
//                   { t: 20, s: [44, 44] },
//                 ],
//               },
//             },
//             {
//               ty: "fl",
//               c: { a: 0, k: [0.37, 0.53, 1, 1] },
//               o: { a: 0, k: 15 },
//             },
//             {
//               ty: "st",
//               c: { a: 0, k: [0.37, 0.53, 1, 1] },
//               o: { a: 0, k: 100 },
//               w: { a: 0, k: 2 },
//               lc: 2,
//               lj: 2,
//             },
//             { ty: "tr", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
//           ],
//         },
//       ],
//       ip: 0,
//       op: 60,
//       st: 0,
//     },
//   ],
// }

// ── FAQ data ─────────────────────────────────────────────────────────────────
interface FaqItem {
  question: string
  answer: string
  accent: string
  bg: string
  icon: string
=======
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
  iconColor: string
  hoverBorder: string
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
}

const faqs: FaqItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "Comprehensive digital solutions including web development, mobile applications, SaaS architecture, and custom AI development tailored to your business needs.",
<<<<<<< HEAD
    accent: "#6085FF",
    bg: "rgba(96,133,255,0.07)",
    icon: "🌐",
=======
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary/50",
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
  },
  {
    question: "How long does a project take?",
    answer:
<<<<<<< HEAD
      "Timelines vary based on complexity. A typical MVP takes 8–12 weeks, while larger enterprise transformations can span 6+ months with continuous iterative delivery.",
    accent: "#A855F7",
    bg: "rgba(168,85,247,0.07)",
    icon: "⏱",
=======
      "Timelines vary based on complexity. A typical MVP takes 8-12 weeks, while larger enterprise transformations can span 6+ months with continuous iterative delivery.",
    iconColor: "text-purple-500",
    hoverBorder: "hover:border-purple-500/50",
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
  },
  {
    question: "What technologies do you use?",
    answer:
      "We specialize in modern stacks including React, Next.js, Node.js, Python, AWS, and Flutter, ensuring your product is scalable, secure, and future-proof.",
<<<<<<< HEAD
    accent: "#06B6D4",
    bg: "rgba(6,182,212,0.07)",
    icon: "⚙️",
=======
    iconColor: "text-cyan-500",
    hoverBorder: "hover:border-cyan-500/50",
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
  },
  {
    question: "Do you provide support after development?",
    answer:
      "Yes, we offer 24/7 dedicated support and maintenance packages to ensure zero downtime and continuous optimization as your business grows.",
<<<<<<< HEAD
    accent: "#F97316",
    bg: "rgba(249,115,22,0.07)",
    icon: "🛡️",
  },
]

// ── Floating particle component ──────────────────────────────────────────────
function FloatingParticle({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(1px)" }}
      animate={{
        y: [0, -18, 0],
        opacity: [0.25, 0.6, 0.25],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FAQ() {
  const navigate = useNavigate()
  const [active, setActive] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const toggle = (index: number) => setActive(active === index ? null : index)

  const particles = [
    { delay: 0, x: "8%", y: "15%", size: 8, color: "rgba(96,133,255,0.4)" },
    { delay: 0.7, x: "88%", y: "12%", size: 5, color: "rgba(168,85,247,0.5)" },
    { delay: 1.2, x: "5%", y: "70%", size: 6, color: "rgba(6,182,212,0.45)" },
    { delay: 0.4, x: "92%", y: "65%", size: 9, color: "rgba(249,115,22,0.35)" },
    { delay: 1.8, x: "50%", y: "5%", size: 4, color: "rgba(96,133,255,0.3)" },
    { delay: 0.9, x: "75%", y: "88%", size: 7, color: "rgba(168,85,247,0.4)" },
    { delay: 2.1, x: "18%", y: "90%", size: 5, color: "rgba(6,182,212,0.35)" },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-white dark:bg-[#0A0B14] overflow-hidden"
      id="faq"
    >
      {/* ── Ambient glow blobs ── */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,133,255,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -40%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          transform: "translate(50%, 40%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* ── Grid texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,133,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,133,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[780px] mx-auto px-6">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Lottie badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(96,133,255,0.1)", border: "1px solid rgba(96,133,255,0.25)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Animated pulsing dot */}
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "#6085FF" }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#6085FF" }}>
              Got Questions?
            </span>
          </motion.div>

          <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Frequently Asked{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #6085FF 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Questions
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #6085FF, #A855F7)" }}
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-base mt-3 max-w-md mx-auto">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* ── FAQ list ── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = active === index
            const isHovered = hoveredIndex === index
=======
    iconColor: "text-orange-500",
    hoverBorder: "hover:border-orange-500/50",
  },
]

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null)

  const toggle = (index: number) => {
    setActive(active === index ? null : index)
  }

  return (
    <section className="py-28 bg-white dark:bg-background-dark" id="faq">

      <div className="max-w-[800px] mx-auto px-6">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">
            Got Questions?
          </h2>

          <h3 className="text-4xl font-bold">
            Frequently Asked Questions
          </h3>
        </motion.div>

        {/* faq list */}
        <div className="space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = active === index
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b

            return (
              <motion.div
                key={faq.question}
                layout
<<<<<<< HEAD
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${isOpen ? faq.accent + "55" : isHovered ? faq.accent + "33" : "rgba(148,163,184,0.12)"}`,
                  background: isOpen
                    ? faq.bg
                    : isHovered
                      ? faq.bg
                      : "rgba(248,250,252,0.6)",
                  boxShadow: isOpen
                    ? `0 0 0 1px ${faq.accent}22, 0 8px 32px ${faq.accent}18`
                    : isHovered
                      ? `0 4px 20px ${faq.accent}12`
                      : "none",
                  transition: "border 0.3s, background 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Accent left bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                  style={{ background: faq.accent }}
                  animate={{ scaleY: isOpen ? 1 : isHovered ? 0.6 : 0, originY: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Shimmer on hover */}
                <AnimatePresence>
                  {isHovered && !isOpen && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0, x: "-100%" }}
                      animate={{ opacity: 1, x: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${faq.accent}10, transparent)`,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Question button */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 text-left flex items-center gap-4"
                >
                  {/* Animated icon container */}
                  <motion.div
                    className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: faq.bg, border: `1px solid ${faq.accent}30` }}
                    animate={{
                      scale: isHovered || isOpen ? 1.1 : 1,
                      rotate: isOpen ? [0, -8, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.icon}
                    {/* Ping ring on open */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          className="absolute inset-0 rounded-xl"
                          style={{ border: `2px solid ${faq.accent}` }}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 1.6, opacity: 0 }}
                          exit={{}}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <span
                    className="font-bold text-base sm:text-lg flex-1"
                    style={{ color: isOpen ? faq.accent : undefined }}
                  >
                    {faq.question}
                  </span>

                  {/* Chevron with Lottie-style morph */}
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen ? faq.accent : "transparent",
                      border: `1.5px solid ${isOpen ? faq.accent : "rgba(148,163,184,0.3)"}`,
                    }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <motion.path
                        d="M2 5L7 10L12 5"
                        stroke={isOpen ? "#fff" : faq.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ pathLength: 1 }}
                        initial={{ pathLength: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
=======
                className={`group bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all ${faq.hoverBorder}`}
              >

                {/* question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-bold text-lg">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`material-symbols-outlined ${faq.iconColor}`}
                  >
                    expand_more
                  </motion.span>
                </button>

                {/* answer */}
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
<<<<<<< HEAD
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5 pl-20 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                      >
                        {/* Lottie-style animated dots before answer */}
                        <motion.div
                          className="flex gap-1 mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: faq.accent }}
                              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 0.8, repeat: 2, delay: i * 0.15 }}
                            />
                          ))}
                        </motion.div>
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(96,133,255,0.08), rgba(168,85,247,0.08))",
              border: "1px solid rgba(96,133,255,0.2)",
            }}
          >
            {/* Lottie-style pulsing icon */}
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💬
            </motion.span>
            <span className="text-sm text-slate-500 dark:text-slate-400" onClick={() => navigate("/contactus")}>
              Still have questions?{" "}
              <Link
                to="/contactus"
                className="font-semibold"
                style={{ color: "#ec5b13" }}
              >
                Chat with us →
              </Link>
            </span>
          </div>
        </motion.div>
=======
                      transition={{ duration: 0.35 }}
                      className="px-6 pb-6 text-slate-500 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}

        </div>
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b

      </div>
    </section>
  )
}