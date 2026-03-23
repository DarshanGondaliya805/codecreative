import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Morphos IT transformed our legacy system into a high-performance cloud application. Their attention to detail and design is unmatched.",
    name: "James Wilson",
    role: "CTO, FinFlow",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIrCjfDdcp1YdLe1t-mY3WOa5NfjM21YnOrb_j5PiAr8kBhAqYCBGzEvHcysSn0R0tddZa7ZhkmD9v9XAbpU3hpLYQWjo105ARbWi6c7uoSnZ4Z-uGssG2R82Pw9GPF4FUDAmqHv4DrvIYqTVEdR7kefc88Vwn88q7r92-PSq1HYtgkScsGZMRuStdi5KhpT6zB6oGn5hiU-b5XnwwUVLsxjH78OqBlXbO7S-l0LG2hf3DTOHpssd80ixlRcFO4sv2u_cLst7_ZR8",
  },
  {
    quote:
      "The agility they brought to our mobile project was breathtaking. We went from prototype to 50k users in record time.",
    name: "Sarah Chen",
    role: "Founder, Velvet UI",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVrJhPLnV_fT--PwF8A6_WjWmXeIrKYv1R3ZYqFr1FnGkxT8wTKijHYNxRkkdeVUoVcebXdEgIvtGzijgow2KSemUXTu8kPYgikMJJj_r6qEx5qSpMGigWvorVonzW411PkmtzXqdccrZpDGKHoT73clhIFGmc3ydX2pkJo5jnFKJmjjjawFxLP9dGNqUck7F0GD4oAE65twkNRcpOULIVP7gqfORKBYXcQeGcwj3-eldWmFqAv3QTubg-QT6hmvNvm7eF9VyffIU",
  },
]

export default function Testimonials() {

  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const testimonial = testimonials[index]

  // typing effect
  useEffect(() => {
    setDisplayText("")
    let i = 0

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + testimonial.quote[i])
      i++
      if (i >= testimonial.quote.length) clearInterval(interval)
    }, 20)

    return () => clearInterval(interval)
  }, [index])

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">

      <div className="max-w-[1200px] mx-auto px-6">

        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* left side */}
          <div className="md:w-1/3">

            <h2 className="text-4xl font-bold mb-6">
              What Our Partners Say
            </h2>

            <p className="text-slate-500 mb-8 leading-relaxed">
              Join the 100+ companies that trust Morphos IT with their digital transformation journey.
            </p>

            <div className="flex gap-4">

              <button
                onClick={prev}
                className="size-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-white hover:shadow-lg transition-all"
              >
                <span className="material-symbols-outlined">
                  arrow_back
                </span>
              </button>

              <button
                onClick={next}
                className="size-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-white hover:shadow-lg transition-all"
              >
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>

            </div>
          </div>

          {/* testimonial card */}
          <div className="md:w-2/3">

            <AnimatePresence mode="wait">

              <motion.div
                key={index}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="p-10 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50"
              >

                {/* stars */}
                <div className="flex gap-1 text-orange-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined"
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* quote with typing */}
                <p className="text-lg font-medium italic mb-8 leading-relaxed min-h-[120px]">
                  "{displayText}"
                </p>

                {/* author */}
                <div className="flex items-center gap-4">

                  <div className="size-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  )
}