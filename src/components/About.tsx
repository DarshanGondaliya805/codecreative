"use client"

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
                Our Essence
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="mb-8 text-4xl font-extrabold leading-tight md:text-5xl"
            >
              Where{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Geometric Precision
              </span>{" "}
              Meets Organic Creativity
            </motion.h2>

            <motion.p
              variants={item}
              className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              At Morphos IT, we believe software should be as dynamic as the
              businesses it powers. We use geometric precision to build robust
              architectures and organic creativity to design seamless user
              interfaces.
            </motion.p>

            <motion.p
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