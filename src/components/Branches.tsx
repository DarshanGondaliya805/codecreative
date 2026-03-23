import { motion } from "framer-motion"

interface Branch {
  icon: string
  city: string
  description: string
  type: string
  iconColor: string
  iconBg: string
}

const branches: Branch[] = [
  {
    icon: "location_city",
    city: "San Francisco",
    description: "Headquarters & Innovation Hub",
    type: "Main Office",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: "location_city",
    city: "London",
    description: "European Strategy Center",
    type: "Regional Hub",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: "location_city",
    city: "Tokyo",
    description: "Asia-Pacific Engineering Base",
    type: "Growth Office",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
  },
]

export default function Branches() {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  const card = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">
            Global Presence
          </h2>

          <h3 className="text-4xl font-bold">
            Our Branches
          </h3>

        </motion.div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >

          {branches.map((branch) => (

            <motion.div
              key={branch.city}
              variants={card}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all group cursor-pointer"
            >

              {/* icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className={`size-12 rounded-xl ${branch.iconBg} ${branch.iconColor} flex items-center justify-center mb-6`}
              >
                <span className="material-symbols-outlined">
                  {branch.icon}
                </span>
              </motion.div>

              {/* city */}
              <h4 className="text-xl font-bold mb-2">
                {branch.city}
              </h4>

              {/* description */}
              <p className="text-slate-500 text-sm mb-4">
                {branch.description}
              </p>

              {/* type */}
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {branch.type}
              </p>

            </motion.div>

          ))}

        </motion.div>

      </div>
    </section>
  )
}