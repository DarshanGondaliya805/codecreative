import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function JoinTeam() {
  const navigate = useNavigate()

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-28 bg-slate-900 text-white relative overflow-hidden">

      {/* floating shapes */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          {/* title */}
          <motion.h2
            variants={item}
            className="text-4xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent"
          >
            Join the Future of Innovation
          </motion.h2>

          {/* description */}
          <motion.p
            variants={item}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            We're looking for visionary thinkers and bold builders to help us shape the next generation of digital experiences.
          </motion.p>

          {/* CTA button */}
          <motion.button
            variants={item}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate('/career')}
            className="group bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center gap-3 mx-auto"
          >
            Join Our Team
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="material-symbols-outlined"
            >
              arrow_forward
            </motion.span>
          </motion.button>

          {/* features */}
          <motion.div
            variants={container}
            className="mt-16 flex flex-wrap justify-center gap-12 opacity-60"
          >

            <motion.div
              variants={item}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined">bolt</span>
              Fast-Paced
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined">workspace_premium</span>
              Global Impact
            </motion.div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}