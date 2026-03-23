import { motion } from "framer-motion"

interface CaseStudy {
  image: string
  alt: string
  tags: string[]
  title: string
}

const caseStudies: CaseStudy[] = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX_R4g1LUEyIe4O6NUWTgYHNuXoFctvxwnDtTJUWQlwBHYXvRvpiYSLYG50tWBU7lTv5SOA6cASqd_vnDqJeI3OchEr5M5kPPYeVbP8T9Wj2fLOT8ePDezoXMItNr-64lyfU4oeAxgO4KCj7t92-VXcilwSfECeGYuSWBB5LQBxZtoY--1dZYrCdyD3uRTNWLedBCz_8qsmRtFg9_JsjLWBebCB1Ie4jF5n3f0Xjsfz-zy2doNO3vSfAddcpWCvB4VnUi-Glqc6vA",
    alt: "Fintech Dashboard",
    tags: ["Fintech", "SaaS"],
    title: "NeoBank: Global Trading Experience",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7Azw6mHJitlMLbGfNSNpYWmIdHY407P-LvdSxWdUXFX7_peZ8niURlztYFgMDbtN5ogsLanccaSpBws2z-2PLgbn5ZA-a1JFQ01tls5gK1lN5GGvNm57aD2SGlZctg7CD_9sUy9Hw3hErVoPRkxSsIApsMvyx40GoC5RBu0s-nnzpYsPLtiMX8wLKsPGj3CO5TY4kQbv_e6bRQmLjbz18JmPCX1f2DA5o1ZQMOZvbdX4x0I2-8yIg5ylNnAZrQkBDE8PUd0zl3xE",
    alt: "E-commerce App",
    tags: ["E-commerce", "Mobile"],
    title: "Velvet: AI-Driven Fashion Discovery",
  },
]

export default function Portfolio() {

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.25 }
    }
  }

  const card = {
    hidden: { opacity: 0, y: 80 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-28 bg-white dark:bg-background-dark" id="work">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* section title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
        >
          Featured Case Studies
        </motion.h2>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >

          {caseStudies.map((study) => (

            <motion.div
              key={study.title}
              variants={card}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer"
            >

              {/* image container */}
              <div className="rounded-[2.5rem] overflow-hidden mb-8 shadow-lg relative aspect-[4/3]">

                <motion.img
                  src={study.image}
                  alt={study.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8 }}
                />

                {/* overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-10"
                >

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg"
                  >
                    Read Case Study
                    <span className="material-symbols-outlined">
                      north_east
                    </span>
                  </motion.button>

                </motion.div>

              </div>

              {/* tags */}
              <div className="flex gap-4 mb-4">

                {study.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-1 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500"
                  >
                    {tag}
                  </motion.span>
                ))}

              </div>

              {/* title */}
              <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {study.title}
              </h4>

            </motion.div>

          ))}

        </motion.div>

      </div>
    </section>
  )
}