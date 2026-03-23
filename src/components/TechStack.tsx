"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const techStack = [
  {
    category: "Software Engineering",
    icon: "code",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.15)",
    sections: {
      Frontend: [
        { title: "React", desc: "UI Library", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { title: "Next.js", desc: "React Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { title: "Vue.js", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { title: "Nuxt.js", desc: "Vue Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
        { title: "Angular", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
        { title: "Svelte", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
        { title: "HTML5", desc: "Markup", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { title: "CSS3", desc: "Styling", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { title: "JavaScript", desc: "Language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { title: "TypeScript", desc: "Language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { title: "Tailwind CSS", desc: "CSS Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { title: "Bootstrap", desc: "CSS Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { title: "Sass", desc: "Preprocessor", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      ],
      Backend: [
        { title: "Node.js", desc: "Runtime", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { title: "Express.js", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { title: "NestJS", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
        { title: "Django", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        { title: "Flask", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
        { title: "Spring Boot", desc: "Java Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { title: "Laravel", desc: "PHP Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { title: "GraphQL", desc: "API Layer", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
        { title: "REST API", desc: "Architecture", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      ],
      Mobile: [
        { title: "React Native", desc: "Cross Platform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { title: "Flutter", desc: "Framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { title: "Swift", desc: "iOS Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
        { title: "Kotlin", desc: "Android Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { title: "Ionic", desc: "Hybrid Apps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
      ],
      DevOps: [
        { title: "Docker", desc: "Container", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { title: "GitHub", desc: "Version Control", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { title: "Vite", desc: "Build Tool", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      ],
    },
  },
  {
    category: "AI & Data",
    icon: "neurology",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
    sections: {
      "ML Frameworks": [
        { title: "TensorFlow", desc: "AI Platform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { title: "PyTorch", desc: "Deep Learning", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { title: "Python", desc: "Language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      ],
      "LLM & APIs": [
        { title: "OpenAI", desc: "GPT Models", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { title: "Jupyter", desc: "Notebooks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      ],
    },
  },
  {
    category: "Cloud & Infra",
    icon: "cloud",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
    sections: {
      Platforms: [
        { title: "AWS", desc: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
        { title: "Azure", desc: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { title: "GCP", desc: "Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      ],
      Orchestration: [
        { title: "Kubernetes", desc: "Orchestration", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { title: "Docker", desc: "Container", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { title: "Linux", desc: "OS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      ],
    },
  },
  {
    category: "QA & Design",
    icon: "palette",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    sections: {
      Testing: [
        { title: "Jest", desc: "Unit Testing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
        { title: "Cypress", desc: "E2E Testing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" },
      ],
      Design: [
        { title: "Figma", desc: "Design Tool", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { title: "Adobe XD", desc: "UI Design", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
      ],
    },
  },
]

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.22 } },
}

export default function TechStack() {
  const [activeCat, setActiveCat] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  const currentCat = techStack[activeCat]
  const sectionNames = Object.keys(currentCat.sections)
  const currentSection = sectionNames[activeSection]
  const items = (currentCat.sections as any)[currentSection]

  const changeCategory = (i: number) => {
    setActiveCat(i)
    setActiveSection(0)
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none transition-all duration-700"
        style={{ background: currentCat.glow, opacity: 0.6 }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.35em] mb-3" style={{ color: currentCat.color }}>
            Tech Stack
          </p>
          <h2 className="text-[38px] font-extrabold text-slate-900 dark:text-white leading-tight">
            Tools We Master
          </h2>
          <p className="text-slate-400 mt-3 text-[15px] max-w-sm mx-auto">
            Hand-picked technologies that power every layer of your product.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex gap-2 flex-wrap mb-8"
        >
          {techStack.map((cat, i) => (
            <motion.button
              key={i}
              onClick={() => changeCategory(i)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeCat === i ? currentCat.color : "transparent",
                color: activeCat === i ? "white" : "#94a3b8",
                border: `1.5px solid ${activeCat === i ? currentCat.color : "#e2e8f0"}`,
              }}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              {cat.category}
            </motion.button>
          ))}
        </motion.div>

        {/* Main panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row min-h-[400px]">

            {/* Sidebar */}
            <div
              className="lg:w-52 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 p-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible"
            >
              <div className="hidden lg:block px-3 py-2 mb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Sections
                </p>
              </div>

              {sectionNames.map((name, i) => (
                <motion.button
                  key={name}
                  onClick={() => setActiveSection(i)}
                  whileHover={{ x: 3 }}
                  className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all duration-200 relative"
                  style={{
                    background: activeSection === i ? `${currentCat.color}15` : "transparent",
                    color: activeSection === i ? currentCat.color : "#64748b",
                  }}
                >
                  {activeSection === i && (
                    <motion.div
                      layoutId="sidebarIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                      style={{ background: currentCat.color }}
                    />
                  )}
                  <span className="pl-2">{name}</span>
                  <span
                    className="ml-auto text-[11px] font-black px-1.5 py-0.5 rounded-md"
                    style={{
                      background: activeSection === i ? `${currentCat.color}20` : "#f1f5f9",
                      color: activeSection === i ? currentCat.color : "#94a3b8",
                    }}
                  >
                    {(currentCat.sections as any)[name].length}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Grid area */}
            <div className="flex-1 p-6 lg:p-8">
              {/* Section header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCat}-${activeSection}-header`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${currentCat.color}15` }}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ color: currentCat.color }}
                    >
                      {currentCat.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-slate-900 dark:text-white leading-tight">
                      {currentSection}
                    </h3>
                    <p className="text-[12px] text-slate-400">
                      {items.length} technologies
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tech cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCat}-${activeSection}`}
                  variants={gridVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                >
                  {items.map((tech: any, i: number) => (
                    <motion.div
                      key={i}
                      variants={cardVariants as any}
                      whileHover={{
                        y: -5,
                        boxShadow: `0 12px 32px ${currentCat.glow}`,
                        borderColor: currentCat.color,
                      }}
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent cursor-pointer transition-colors duration-200"
                    >
                      {/* Logo */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110 transition-transform duration-200"
                      >
                        <img
                          src={tech.logo}
                          alt={tech.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const t = e.currentTarget
                            t.style.display = "none"
                            const parent = t.parentElement
                            if (parent) {
                              parent.innerHTML = `<span class="material-symbols-outlined text-2xl" style="color:${currentCat.color}">code</span>`
                            }
                          }}
                        />
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">
                          {tech.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {tech.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats bar
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-10"
        >
          {[
            { label: "Technologies", value: techStack.reduce((a, c) => a + Object.values(c.sections).flat().length, 0) + "+" },
            { label: "Categories", value: techStack.length },
            { label: "Years Experience", value: "7+" },
            { label: "Projects Shipped", value: "200+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[26px] font-black text-slate-900 dark:text-white" style={{ color: currentCat.color }}>
                {stat.value}
              </p>
              <p className="text-[12px] text-slate-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div> */}

      </div>
    </section>
  )
}