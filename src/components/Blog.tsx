import { motion } from "framer-motion"

interface BlogPost {
  category: string
  categoryColor: string
  categoryBg: string
  title: string
  excerpt: string
  dotColor: string
  hoverColor: string
}

const posts: BlogPost[] = [
  {
    category: "Engineering",
    categoryColor: "text-primary",
    categoryBg: "bg-primary/10",
    title: "The Future of AI-First Development Pipelines",
    excerpt: "Exploring how generative models are reshaping the SDLC in 2024.",
    dotColor: "bg-primary/5",
    hoverColor: "group-hover:text-primary",
  },
  {
    category: "Design",
    categoryColor: "text-purple-500",
    categoryBg: "bg-purple-500/10",
    title: "Mastering Shape-Driven User Interfaces",
    excerpt: "Why organic geometry is replacing the rigid box-model in modern UX.",
    dotColor: "bg-purple-500/5",
    hoverColor: "group-hover:text-purple-500",
  },
  {
    category: "Cloud",
    categoryColor: "text-cyan-500",
    categoryBg: "bg-cyan-500/10",
    title: "Scaling to 10M: Lessons in Serverless Architecture",
    excerpt: "Key performance metrics and pitfalls when building for massive scale.",
    dotColor: "bg-cyan-500/5",
    hoverColor: "group-hover:text-cyan-500",
  },
]

export default function Blog() {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  const card = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-28 bg-white dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">

          <div>
            <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">
              Latest Insights
            </h2>

            <h3 className="text-4xl font-bold">
              Digital Strategy & Trends
            </h3>
          </div>

          <motion.a
            whileHover={{ x: 6 }}
            className="font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
            href="#"
          >
            View All Articles
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.a>

        </div>

        {/* cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >

          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={card}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="group bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden transition-all hover:bg-white hover:shadow-2xl cursor-pointer"
            >

              {/* animated background blob */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className={`absolute -right-10 -top-10 w-32 h-32 ${post.dotColor} rounded-full`}
              />

              {/* category */}
              <span
                className={`inline-block px-4 py-1 rounded-full ${post.categoryBg} ${post.categoryColor} text-xs font-bold mb-6`}
              >
                {post.category}
              </span>

              {/* title */}
              <h4 className="text-xl font-bold mb-4 leading-tight">
                {post.title}
              </h4>

              {/* excerpt */}
              <p className="text-slate-500 text-sm mb-6">
                {post.excerpt}
              </p>

              {/* read more */}
              <motion.a
                whileHover={{ x: 6 }}
                className={`font-bold text-sm flex items-center gap-2 ${post.hoverColor} transition-colors`}
                href="#"
              >
                Read More
                <span className="material-symbols-outlined text-sm">
                  east
                </span>
              </motion.a>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  )
}