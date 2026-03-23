import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function SocialHirePage() {
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
              Social Growth Experts
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-tight mb-8"
            >
              Grow Your Brand with <br />
              <span className="text-[#f5611b]">Social Media</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 max-w-xl mb-10"
            >
              Boost engagement, followers, and revenue with data-driven social strategies.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="px-8 py-4 bg-[#f5611b] text-white rounded-xl font-bold">
                Get Free Strategy
              </button>
              <button className="px-8 py-4 border rounded-xl font-bold">
                View Results
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhiRyHrc4iyTMNQySoXEwjczukrO_dwAaF4Z4NcnT1Ew--foRxmWn0X8_E6phFQ9C810nfplcYdFdnQUkrz2mEfqqrQwyHmZsUsjOUY6lMKBn-hb5XGTQ9URHgFK9qM1EThFGsVNlo1gJ0SQonvrEuNEJtwyw-tWzuxI129SJu6thdw4fU0BNHz9ZgRKa3qnFuKHay9JYvIkCkalY6D8a7nSiQx17oYpLO1u7q9PaVGG1JIJtRkrw-9h9nx6Orf6AghA0Pye9SobE"
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
            "Data-Driven Strategy",
            "Creative Content",
            "Brand Growth",
            "ROI Campaigns",
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-[#fff7f3] rounded-2xl border"
            >
              <h3 className="font-bold mb-3">{item}</h3>
              <p className="text-sm text-gray-600">
                High-impact social media execution.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "Content Strategy",
            "Design & Copy",
            "Management",
            "Paid Ads",
            "Influencer Marketing",
            "Analytics",
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
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            "Analyze",
            "Plan",
            "Create",
            "Publish",
            "Optimize",
            "Scale",
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
                Growth Case {i + 1}
              </h3>
              <p className="text-sm text-gray-600">
                Social engagement and reach scaling.
              </p>
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
            "They scaled our TikTok to 100k in 3 months."
          </motion.p>
          <h5 className="font-bold">Sarah Chen</h5>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-8">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto p-10 bg-[#fff7f3] rounded-3xl border space-y-6"
        >
          <input className="w-full p-4 border rounded-xl" placeholder="Name" />
          <input className="w-full p-4 border rounded-xl" placeholder="Email" />
          <input className="w-full p-4 border rounded-xl" placeholder="Business Type" />
          <textarea
            className="w-full p-4 border rounded-xl"
            placeholder="Your Goals"
          />
          <button className="w-full bg-[#f5611b] text-white py-4 rounded-xl font-bold">
            Get Strategy
          </button>
        </motion.form>
      </section>

    </div>
  );
}