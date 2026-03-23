import { motion } from "framer-motion"
import { useState } from "react"
import { WavyText } from "./WavyText"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const dropdown: any = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  }

  const navItem: any = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  }
  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-200/50 dark:border-slate-800/50">
    //   <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
    //     <div className="flex items-center gap-2 group cursor-pointer">
    //       <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
    //         <span className="material-symbols-outlined font-bold">Code</span>
    //       </div>
    //       <h1 className="text-xl font-extrabold tracking-tight">Code<span className="text-primary">Creative</span></h1>
    //     </div>
    //     <div className="hidden md:flex items-center gap-10">
    //       <a className="text-sm font-semibold hover:text-primary transition-colors" href="#services">Services</a>
    //       <a className="text-sm font-semibold hover:text-primary transition-colors" href="#about">About</a>
    //       <a className="text-sm font-semibold hover:text-primary transition-colors" href="#work">Portfolio</a>
    //       <a className="text-sm font-semibold hover:text-primary transition-colors" href="#process">Process</a>
    //       <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/25 active:scale-95">
    //         Start a Project
    //       </button>
    //     </div>
    //   </div>
    // </nav>
    <>
      <div className="fixed top-0 left-0 w-full h-96 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 glass-header w-full"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-primary p-1.5 rounded-lg"
            >
              <span className="material-symbols-outlined text-white text-2xl">Code</span>
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Code<span className="text-primary">Creative</span></span>
          </motion.div>
          <nav className="hidden lg:flex items-center gap-8">
            <motion.a
              variants={navItem}
              initial="rest"
              whileHover="hover"
              className="relative text-sm font-semibold text-slate-600 hover:text-primary"
              href="#"
            >
              {/* Home */}
              <WavyText text="Home" />
              <motion.span
                layoutId="navUnderline"
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>

            <div className="group relative py-7"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary"
              >
                <WavyText text="Services" />
                <motion.span
                  className="material-symbols-outlined text-xs"
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  expand_more
                </motion.span>
              </motion.button>
              <motion.div
                variants={dropdown}
                initial="hidden"
                animate={open ? "show" : "hidden"}
                className="mega-menu absolute top-full -translate-x-1/2 w-[720px] bg-white rounded-xl shadow-2xl border p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto transition-all duration-200"              >

                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-6">
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">code</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text=" Web Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Custom scalable web apps</div>
                      </div>
                    </a>
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">cloud</span>
                      <div>
                        <div className="text-sm font-bold"><WavyText text="Cloud Solutions" /></div>
                        <div className="text-xs text-slate-500 mt-1">Architecture &amp; migration</div>
                      </div>
                    </a>
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">terminal</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="DevOps Services" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">CI/CD &amp; automation</div>
                      </div>
                    </a>
                  </div>
                  <div className="flex flex-col gap-6">
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">smartphone</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Mobile Apps" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Native &amp; cross-platform</div>
                      </div>
                    </a>
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">psychology</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="AI Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Custom LLM solutions</div>
                      </div>
                    </a>
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">shopping_cart</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="E-commerce" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Conversion-led stores</div>
                      </div>
                    </a>
                  </div>
                  <div className="flex flex-col gap-6">
                    <a className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" href="#">
                      <span className="material-symbols-outlined text-primary">palette</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="UI/UX Design" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">User-centric digital experiences</div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="group relative py-7"
              onMouseEnter={() => setOpen1(true)}
              onMouseLeave={() => setOpen1(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary"
              >
                <WavyText text="Hire Developers" />
                <motion.span
                  className="material-symbols-outlined text-xs"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  expand_more
                </motion.span>
              </motion.button>
              <motion.div
                variants={dropdown}
                initial="hidden"
                animate={open1 ? "show" : "hidden"}
                className="mega-menu absolute top-full -translate-x-1/2 w-[720px] bg-white rounded-xl shadow-2xl border p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto transition-all duration-200" >
                <div className="grid grid-cols-2">
                  <div className="p-6 border-r border-slate-50 dark:border-slate-800">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">By Platform</h3>
                    <div className="space-y-4">
                      <a className="block text-sm font-medium hover:text-primary" href="#">Frontend (React/Next)</a>
                      <a className="block text-sm font-medium hover:text-primary" href="#">Backend (Node/Python)</a>
                      <a className="block text-sm font-medium hover:text-primary" href="#">Mobile (Flutter/iOS)</a>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/30">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Specialized</h3>
                    <div className="space-y-4">
                      <a className="block text-sm font-medium hover:text-primary" href="#">Full Stack Engineers</a>
                      <a className="block text-sm font-medium hover:text-primary" href="#">AI/ML Specialists</a>
                      <a className="block text-sm font-medium hover:text-primary" href="#">DevOps Architects</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-sm font-semibold text-slate-600 hover:text-primary"
              href="#"
            >
              <WavyText text="About Us" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-sm font-semibold text-slate-600 hover:text-primary"
              href="#"
            >
              <WavyText text="Solution" />

            </motion.a>
          </nav>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(99,102,241,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg"
            >
              <WavyText text="Contact Us" />
            </motion.button>

            <button className="lg:hidden p-2 text-slate-600">
              <span className="material-symbols-outlined">
                <WavyText text="menu" />
              </span>
            </button>
          </div>
        </div >
      </motion.header >
    </>
  )
}
