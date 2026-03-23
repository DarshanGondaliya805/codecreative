import { motion } from "framer-motion";

const fadeUp:any = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger:any = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function SeoPage() {
  return (
    <div className="bg-[#fdf7f4] text-[#1c110b] overflow-hidden">

      {/* HERO */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-7xl font-bold leading-tight mb-8"
            >
              Grow Your Business with{" "}
              <span className="text-[#f5611b]">Powerful SEO</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 mb-10 max-w-xl"
            >
              AI-driven SEO strategies to dominate rankings and scale traffic.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="px-8 py-4 bg-[#f5611b] text-white rounded-xl font-bold hover:scale-105 transition">
                Free SEO Audit
              </button>
              <button className="px-8 py-4 border rounded-xl font-bold hover:bg-gray-100 transition">
                Start Campaign
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6tqigibvcW6l5uwoePd9Y-nt8pkLnx22uUqu_6wK3ifV4Gz-8rO3kYIqquDxYGHva3KudosdJChin2NVixjwUtTI1Cjxa99WhGedJafcTNvCvVfuiE3ExdJVP0kP_bO3fz1AOCA6hD77KOozjzxE-N6WCpwQeHvCWHCCwOhxBNSm0sAs24IZfcbIHn5LoMrZ-rsv5QX83rwEiZMXIc_5ku63hp6mD4yGv87Kx20dlhl4AVmoSQWhfm7bC0aVH0-K2oTpSSNGHRmg"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              "Technical SEO",
              "On-Page SEO",
              "Off-Page SEO",
              "Keyword Research",
              "Content Optimization",
              "Link Building",
              "Local SEO",
              "E-commerce SEO",
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-8 rounded-3xl bg-[#fff7f3] border hover:shadow-xl transition"
              >
                <h3 className="font-bold text-lg mb-3">{item}</h3>
                <p className="text-sm text-gray-600">
                  Performance-focused SEO strategy for measurable growth.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-6 text-center">
          {["Audit", "Research", "Optimize", "Build Links", "Track"].map(
            (step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border rounded-2xl hover:shadow-lg transition"
              >
                <div className="text-xl font-bold mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-semibold">{step}</h4>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {[
            "Google Analytics",
            "Search Console",
            "Ahrefs",
            "SEMrush",
            "Screaming Frog",
            "Moz Pro",
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-8 py-6 rounded-2xl border bg-[#fff7f3] font-semibold"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Why We Lead
            </h2>
            <p className="text-gray-600 mb-6">
              Predictive SEO strategies powered by data.
            </p>

            <div className="bg-[#f5611b] text-white p-8 rounded-3xl">
              <div className="text-5xl font-bold">142%</div>
              <p>Average traffic growth</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {[
              "Data Driven",
              "Proven Methods",
              "Competitor Analysis",
              "Transparent Reports",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-3xl bg-[#fff7f3] border"
              >
                <h3 className="font-bold mb-2">{item}</h3>
                <p className="text-sm text-gray-600">
                  Strategic advantage through smart SEO.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 rounded-3xl border bg-[#fff7f3]"
          >
            <h3 className="font-bold text-xl mb-3">SaaS Growth</h3>
            <p className="text-sm text-gray-600">
              Increased conversions by 64%.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 rounded-3xl border bg-[#fff7f3]"
          >
            <h3 className="font-bold text-xl mb-3">E-commerce Scale</h3>
            <p className="text-sm text-gray-600">
              2k → 80k traffic in 8 months.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 rounded-3xl border bg-[#fff7f3]"
          >
            <h3 className="font-bold text-xl mb-3">Local SEO</h3>
            <p className="text-sm text-gray-600">
              Top rankings for competitive keywords.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto bg-[#f5611b] text-white p-16 rounded-3xl text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Subscribe to SEO Insights
          </h2>

          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              placeholder="Email"
              className="flex-1 p-4 rounded-xl text-black"
            />
            <button className="px-8 py-4 bg-white text-[#f5611b] rounded-xl font-bold">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Let's Rank Your Brand
          </h2>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <input className="p-4 border rounded-xl" placeholder="Name" />
            <input className="p-4 border rounded-xl" placeholder="Email" />
            <input className="p-4 border rounded-xl" placeholder="Website" />
            <select className="p-4 border rounded-xl">
              <option>$1k - $3k</option>
              <option>$3k - $10k</option>
            </select>

            <textarea
              className="p-4 border rounded-xl md:col-span-2"
              placeholder="SEO Goals"
            />

            <button className="md:col-span-2 bg-[#f5611b] text-white py-4 rounded-xl font-bold">
              Send Request
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}