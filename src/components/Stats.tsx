import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

interface Stat {
  value: number
  suffix?: string
  label: string
  borderColor: string
  glowColor: string
  hoverGlow: string
}

const stats: Stat[] = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Completed",
    borderColor: "border-primary/30",
    glowColor: "bg-primary/10",
    hoverGlow: "group-hover:bg-primary/20",
  },
  {
    value: 85,
    suffix: "+",
    label: "Happy Clients",
    borderColor: "border-purple-500/30",
    glowColor: "bg-purple-500/10",
    hoverGlow: "group-hover:bg-purple-500/20",
  },
  {
    value: 12,
    suffix: "+",
    label: "Global Awards",
    borderColor: "border-cyan-500/30",
    glowColor: "bg-cyan-500/10",
    hoverGlow: "group-hover:bg-cyan-500/20",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Expert Support",
    borderColor: "border-orange-500/30",
    glowColor: "bg-orange-500/10",
    hoverGlow: "group-hover:bg-orange-500/20",
  },
]

export default function Stats() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })

  return (
    <section
      ref={ref}
      className="py-28 bg-slate-900 text-white overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 60 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center group cursor-pointer"
            >

              {/* circle */}
              <div
                className={`size-32 rounded-full border-2 ${stat.borderColor}
                flex items-center justify-center mb-6 relative`}
              >

                {/* glow */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 ${stat.glowColor}
                  rounded-full blur-xl ${stat.hoverGlow} transition-all`}
                />

                {/* number */}
                <span className="text-4xl font-black relative z-10">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                    />
                  )}
                  {stat.suffix}
                </span>

              </div>

              {/* label */}
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs text-center">
                {stat.label}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}