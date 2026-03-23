"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const cards = [
  {
    icon: "🚀",
    title: "SaaS & Product Startups",
    desc: "Helping startups turn ideas into scalable digital products with modern engineering and cloud platforms.",
  },
  {
    icon: "🏢",
    title: "Enterprise Businesses",
    desc: "Modernizing enterprise systems with cloud-native architecture, AI solutions, and advanced software engineering.",
  },
  {
    icon: "💰",
    title: "FinTech & Blockchain",
    desc: "Building secure financial platforms, blockchain ecosystems, and intelligent payment solutions.",
  },
  {
    icon: "❤️",
    title: "Healthcare & HealthTech",
    desc: "Developing secure healthcare applications, telemedicine platforms, and AI-powered medical solutions.",
  },
]

export default function WhoWeHelp() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  })

  // stronger horizontal spread
  const x1 = useTransform(scrollYProgress, [0, 0.6], [350, 0])
  const x2 = useTransform(scrollYProgress, [0, 0.6], [180, 0])
  const x3 = useTransform(scrollYProgress, [0, 0.6], [-180, 0])
  const x4 = useTransform(scrollYProgress, [0, 0.6], [-350, 0])

  // slight vertical floating
  const y1 = useTransform(scrollYProgress, [0, 0.6], [60, 0])
  const y2 = useTransform(scrollYProgress, [0, 0.6], [-40, 0])
  const y3 = useTransform(scrollYProgress, [0, 0.6], [40, 0])
  const y4 = useTransform(scrollYProgress, [0, 0.6], [-60, 0])

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1])

  const xs = [x1, x2, x3, x4]
  const ys = [y1, y2, y3, y4]

  return (
    <section ref={ref} className="py-16 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10 text-center">
          <p className="uppercase text-sm tracking-widest text-gray-800 mb-4">
            Who We Help
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold">
            Empowering bold <span className="text-orange-500">ideas</span> across these sectors
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              style={{
                x: xs[i],
                y: ys[i],
                opacity,
                scale,
              }}
              className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-2xl p-8 shadow-md will-change-transform"
            >
              <div className="text-4xl text-[#FC9319] mb-6">
                {card.icon}
              </div>

              <h4 className="text-2xl font-semibold mb-3">
                {card.title}
              </h4>

              <p className="text-gray-700 text-sm">
                {card.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}