import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
  iconColor: string
  hoverBorder: string
}

const faqs: FaqItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "Comprehensive digital solutions including web development, mobile applications, SaaS architecture, and custom AI development tailored to your business needs.",
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary/50",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines vary based on complexity. A typical MVP takes 8-12 weeks, while larger enterprise transformations can span 6+ months with continuous iterative delivery.",
    iconColor: "text-purple-500",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We specialize in modern stacks including React, Next.js, Node.js, Python, AWS, and Flutter, ensuring your product is scalable, secure, and future-proof.",
    iconColor: "text-cyan-500",
    hoverBorder: "hover:border-cyan-500/50",
  },
  {
    question: "Do you provide support after development?",
    answer:
      "Yes, we offer 24/7 dedicated support and maintenance packages to ensure zero downtime and continuous optimization as your business grows.",
    iconColor: "text-orange-500",
    hoverBorder: "hover:border-orange-500/50",
  },
]

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null)

  const toggle = (index: number) => {
    setActive(active === index ? null : index)
  }

  return (
    <section className="py-28 bg-white dark:bg-background-dark" id="faq">

      <div className="max-w-[800px] mx-auto px-6">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">
            Got Questions?
          </h2>

          <h3 className="text-4xl font-bold">
            Frequently Asked Questions
          </h3>
        </motion.div>

        {/* faq list */}
        <div className="space-y-4">

          {faqs.map((faq, index) => {

            const isOpen = active === index

            return (
              <motion.div
                key={faq.question}
                layout
                className={`group bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all ${faq.hoverBorder}`}
              >

                {/* question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-bold text-lg">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`material-symbols-outlined ${faq.iconColor}`}
                  >
                    expand_more
                  </motion.span>
                </button>

                {/* answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-6 pb-6 text-slate-500 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  )
}