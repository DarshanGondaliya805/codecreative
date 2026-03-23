import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function SeoHirePage() {
  return (
    <div className="bg-[#fdf7f4] text-[#1c110b] overflow-hidden">

      {/* HERO */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.span
              variants={fadeUp}
              className="inline-flex px-3 py-1 rounded-full bg-orange-100 text-xs font-bold mb-6"
            >
              High Performance SEO
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-tight mb-8"
            >
              Grow Your <br />
              <span className="text-[#f5611b]">Organic Traffic</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 max-w-xl mb-10"
            >
              Data-driven SEO strategies engineered for long-term growth and dominance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="px-8 py-4 bg-[#f5611b] text-white rounded-xl font-bold">
                Get Free Audit
              </button>
              <button className="px-8 py-4 border rounded-xl font-bold">
                View Case Studies
              </button>
            </motion.div>
          </motion.div>

          {/* CHART MOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[#fff7f3] border shadow-xl"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-full h-20 bg-orange-200 rounded"></div>
              <div className="w-full h-32 bg-orange-300 rounded"></div>
              <div className="w-full h-24 bg-orange-400 rounded"></div>
              <div className="w-full h-40 bg-[#f5611b] rounded"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border">
                <div className="text-xs text-gray-500">Traffic</div>
                <div className="font-bold text-[#f5611b]">+124%</div>
              </div>
              <div className="p-4 bg-white rounded-xl border">
                <div className="text-xs text-gray-500">Authority</div>
                <div className="font-bold text-blue-500">78</div>
              </div>
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
            "Proven Strategies",
            "Data Driven",
            "White Hat SEO",
            "Transparent Reports",
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-[#fff7f3] rounded-2xl border"
            >
              <h3 className="font-bold mb-3">{item}</h3>
              <p className="text-sm text-gray-600">
                Performance-focused SEO execution.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "On-Page SEO",
            "Technical SEO",
            "Keyword Research",
            "Link Building",
            "Local SEO",
            "SEO Audits",
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-10 border rounded-xl bg-[#fff7f3]"
            >
              <h3 className="font-bold">{service}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {["Audit", "Strategy", "Execute", "Scale"].map((step, i) => (
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

      {/* CASE STUDIES */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[1, 2].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-2xl border bg-[#fff7f3]"
            >
              <h3 className="font-bold mb-2">
                Case Study {i + 1}
              </h3>
              <p className="text-sm text-gray-600">
                Organic growth and authority scaling.
              </p>
            </motion.div>
          ))}
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
          <input className="w-full p-4 border rounded-xl" placeholder="Website" />
          <textarea
            className="w-full p-4 border rounded-xl"
            placeholder="Your Goals"
          />
          <button className="w-full bg-[#f5611b] text-white py-4 rounded-xl font-bold">
            Request Audit
          </button>
        </motion.form>
      </section>

    </div>
  );
}