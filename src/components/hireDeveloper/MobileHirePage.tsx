import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function MobileHirePage() {
  return (
    <div className="bg-[#fdf7f4] text-[#1c110b] overflow-hidden">

      {/* HERO */}
      <section className="min-h-[850px] flex items-center px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.span
              variants={fadeUp}
              className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-xs font-bold mb-6"
            >
              Available for New Projects
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              Hire Expert <br />
              <span className="text-[#f5611b]">App Developers</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 max-w-xl mb-10"
            >
              Build high-performance mobile apps for iOS & Android with elite teams.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="px-8 py-4 bg-[#f5611b] text-white rounded-xl font-bold hover:scale-105 transition">
                Hire Now
              </button>
              <button className="px-8 py-4 border rounded-xl font-bold hover:bg-gray-100">
                View Apps
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrC5K8mibZzyyaEN0UKOFEzusBhxkNRfrpW6XZ8REgCF21KXqzfLSrZ9uigDKO0WQg3q82oaxR2JQ32gXhiZnUbeap5_IfQuf3h8DIJkMlY99JkwbQ7vVI5PsNTt4GHxe0_E2w0R6AuFgxrALOtK3EAXzdne_Uanw166C5BYY_mCZGW_n933bSfRXO1FlQ67xg2o5pjdyUW7eu2vbTaBLvBy-ozJY9DY6nUQzmQVSsYO-68fdSXBuKnVJG7QvKeiHqacA5EHbsyY"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-8 bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            "Cross Platform",
            "Smooth UI/UX",
            "High Performance",
            "Deployment Support",
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-[#fff7f3] rounded-2xl border"
            >
              <h3 className="font-bold mb-3">{item}</h3>
              <p className="text-sm text-gray-600">
                High-quality mobile engineering solutions.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TECH */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            "Flutter",
            "React Native",
            "Swift",
            "Kotlin",
            "Firebase",
            "REST APIs",
            "Push",
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="p-6 text-center border rounded-xl bg-[#fff7f3]"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 text-center">
          {["Discuss", "Design", "Develop", "Test", "Deploy"].map(
            (step, i) => (
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
            )
          )}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden border bg-[#fff7f3]"
            >
              <img
                src="https://via.placeholder.com/400"
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h4 className="font-bold mb-2">App Project {i + 1}</h4>
                <p className="text-sm text-gray-600">
                  Scalable mobile solution.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg italic text-gray-600 mb-6"
          >
            "Execution speed was unmatched."
          </motion.p>
          <h5 className="font-bold">Marcus Chen</h5>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-8">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto p-10 bg-[#fff7f3] rounded-3xl border space-y-6"
        >
          <input className="w-full p-4 border rounded-xl" placeholder="Name" />
          <input className="w-full p-4 border rounded-xl" placeholder="Email" />
          <textarea
            className="w-full p-4 border rounded-xl"
            placeholder="Your App Idea"
          />
          <button className="w-full bg-[#f5611b] text-white py-4 rounded-xl font-bold">
            Hire App Developer
          </button>
        </motion.form>
      </section>

    </div>
  );
}