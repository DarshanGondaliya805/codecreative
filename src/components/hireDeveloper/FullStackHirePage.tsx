import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function FullStackHirePage() {
  return (
    <div className="bg-[#fdf7f4] text-[#1c110b] overflow-hidden">

      {/* HERO */}
      <section className="pt-24 pb-24 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.span
              variants={fadeUp}
              className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-xs font-bold mb-6"
            >
              Available for Hire
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-tight mb-8"
            >
              Hire Expert <br />
              <span className="text-[#f5611b]">Full Stack Engineers</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 max-w-xl mb-10"
            >
              Scale your team with elite developers building high-performance applications.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="px-8 py-4 bg-[#f5611b] text-white rounded-xl font-bold">
                Hire Now
              </button>
              <button className="px-8 py-4 border rounded-xl font-bold">
                Discuss Project
              </button>
            </motion.div>
          </motion.div>

          {/* VISUAL BLOCK */}
          <motion.div
            initial={{ opacity: 0, rotate: 6 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-3xl bg-[#fff7f3] border shadow-xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-48 bg-[#f5611b] rounded-xl"></div>
              <div className="h-48 bg-gray-300 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-8 bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            "End-to-End Dev",
            "Scalable Systems",
            "Clean Code",
            "Fast Delivery",
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-[#fff7f3] rounded-2xl border"
            >
              <h3 className="font-bold mb-3">{item}</h3>
              <p className="text-sm text-gray-600">
                High-performance engineering execution.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TECH STACK */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            "React / Next",
            "Node / Python",
            "PostgreSQL / Mongo",
            "AWS / Docker",
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-[#fff7f3] rounded-xl border text-center"
            >
              <h3 className="font-bold">{tech}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            "SaaS Development",
            "API Development",
            "System Architecture",
            "Legacy Modernization",
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 border rounded-xl bg-[#fff7f3]"
            >
              <h3 className="font-bold">{service}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-6 text-center">
          {[
            "Discovery",
            "Blueprint",
            "Build",
            "Test",
            "Launch",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border rounded-xl"
            >
              <div className="font-bold mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4>{step}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-2xl border bg-[#fff7f3]"
            >
              <h3 className="font-bold mb-2">
                Project {i + 1}
              </h3>
              <p className="text-sm text-gray-600">
                High-performance application build.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg italic text-gray-600 mb-6"
          >
            "They helped us scale 10x with zero technical debt."
          </motion.p>
          <h5 className="font-bold">CTO, Tech Startup</h5>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-8 bg-white">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto p-10 bg-[#fff7f3] rounded-3xl border space-y-6"
        >
          <input className="w-full p-4 border rounded-xl" placeholder="Name" />
          <input className="w-full p-4 border rounded-xl" placeholder="Email" />
          <select className="w-full p-4 border rounded-xl">
            <option>React + Node</option>
            <option>Python Stack</option>
          </select>
          <textarea
            className="w-full p-4 border rounded-xl"
            placeholder="Project Details"
          />
          <button className="w-full bg-[#f5611b] text-white py-4 rounded-xl font-bold">
            Start Project
          </button>
        </motion.form>
      </section>

    </div>
  );
}