import { motion } from "framer-motion"
import { useState } from "react"

export default function Contact() {

  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert("Message sent successfully 🚀")
    }, 1500)
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">

      {/* floating background blobs */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-20"
        >

          {/* LEFT CONTENT */}
          <motion.div variants={item} className="lg:w-1/2">

            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              Have a Vision? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                Let's Shape It Together
              </span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Whether it's a disruptive MVP or enterprise modernization,
              we turn complex challenges into elegant digital solutions.
            </p>

            <div className="flex items-center gap-6">

              <div className="flex -space-x-4">
                <div className="size-12 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="size-12 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="size-12 rounded-full border-2 border-white bg-slate-400"></div>
              </div>

              <p className="text-sm font-bold text-slate-500">
                Join 100+ innovative partners
              </p>

            </div>

          </motion.div>

          {/* FORM */}
          <motion.div variants={item} className="lg:w-1/2 w-full">

            <motion.div
              whileHover={{ y: -6 }}
              className="p-10 rounded-[3rem] bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl relative"
            >

              {/* glowing blobs */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

              <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="space-y-4">

                  <input
                    className="w-full bg-white/50 dark:bg-slate-900/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all text-sm font-medium outline-none"
                    placeholder="Your Name"
                    type="text"
                  />

                  <input
                    className="w-full bg-white/50 dark:bg-slate-900/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all text-sm font-medium outline-none"
                    placeholder="Email Address"
                    type="email"
                  />

                  <textarea
                    rows={4}
                    className="w-full bg-white/50 dark:bg-slate-900/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all text-sm font-medium outline-none"
                    placeholder="Tell us about your project..."
                  />

                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-primary to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >

                  {loading ? "Sending..." : "Send Message"}

                  {!loading && (
                    <span className="material-symbols-outlined">
                      send
                    </span>
                  )}

                </motion.button>

              </form>

            </motion.div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}