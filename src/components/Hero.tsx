import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"

export default function Hero() {

  const container:any = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 }
    }
  }

  const fadeUp:any = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const float:any = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative pt-44 pb-32 overflow-hidden mesh-gradient-bg min-h-screen flex items-center">

      {/* floating shapes */}
      <motion.div
        variants={float}
        animate="animate"
        className="floating-shape top-20 right-[10%] w-96 h-96 bg-cyan-200 rounded-full"
      />

      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 1 }}
        className="floating-shape bottom-20 left-[5%] w-[500px] h-[500px] bg-purple-200 rounded-full"
      />

      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 2 }}
        className="floating-shape top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-100 rounded-full rotate-45"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1200px] mx-auto px-6 relative z-10 text-center"
      >

        {/* badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-slate-200 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>

          <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
            The Future of Development
          </span>

        </motion.div>

        {/* heading with writing animation */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
        >

          Building Digital Experiences That

          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-cyan-500">

            <Typewriter
              words={[
                "Scale Your Startup",
                "Transform Ideas Into Products",
                "Drive Innovation"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />

          </span>

        </motion.h1>

        {/* description */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We blend technical precision with organic design to create software that doesn't just work—it inspires.
        </motion.p>

        {/* buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl"
          >
            Explore Our Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Watch Reel
          </motion.button>

        </motion.div>

        {/* trust badges */}
        <motion.div
          variants={container}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60"
        >
          {[
            ["verified", "AWS Experts"],
            ["google", "Cloud Experts"],
            ["star", "Top Rated 2026"],
            ["language", "Global Delivery"]
          ].map(([icon, text], i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center gap-2 text-slate-500 font-bold"
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-20 text-slate-400 flex flex-col items-center"
        >
          <span className="text-sm">Scroll</span>
          <span className="material-symbols-outlined">expand_more</span>
        </motion.div>

      </motion.div>
    </section>
  )
}