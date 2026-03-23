import { motion } from "framer-motion"


interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  dotColor: string;
}

const features: FeatureCard[] = [
  {
    icon: 'psychology',
    title: 'Expertise',
    description: 'Deep domain knowledge across cloud, AI, and enterprise architectures.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    dotColor: 'bg-primary/5',
  },
  {
    icon: 'trending_up',
    title: 'Scalability',
    description: 'Systems built to grow from MVP to millions of users seamlessly.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    dotColor: 'bg-purple-500/5',
  },
  {
    icon: 'bolt',
    title: 'Agility',
    description: 'Rapid iteration cycles that prioritize your time-to-market.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    dotColor: 'bg-cyan-500/5',
  },
  {
    icon: 'support_agent',
    title: 'Support',
    description: '24/7 dedicated assistance to ensure zero downtime for your business.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    dotColor: 'bg-orange-500/5',
  },
]


const container: any = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const card: any = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}
export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-[1200px] mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Experience the intersection of technical excellence and strategic agility.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl transition-all border border-slate-100 dark:border-slate-700 relative overflow-hidden group shadow-sm hover:shadow-xl"
            >
              <div
                className={`absolute -right-4 -top-4 w-24 h-24 ${feature.dotColor} rounded-full group-hover:scale-150 transition-transform duration-500`}
              ></div>

              <div
                className={`size-14 rounded-2xl ${feature.bgColor} flex items-center justify-center ${feature.color} mb-6`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {feature.icon}
                </span>
              </div>

              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}