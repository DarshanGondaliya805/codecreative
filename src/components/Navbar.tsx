import { motion } from "framer-motion"
import { useState } from "react"
import { WavyText } from "./WavyText"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
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
    //       <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#services">Services</Link>
    //       <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#about">About</Link>
    //       <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#work">Portfolio</Link>
    //       <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#process">Process</Link>
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
            <motion.button
              variants={navItem}
              initial="rest"
              whileHover="hover"
              onClick={() => navigate("/")}
              className="relative text-sm font-semibold text-slate-600 hover:text-primary"
            >
              {/* Home */}
              <WavyText text="Home" />
              <motion.span
                layoutId="navUnderline"
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.25 }}
              />
            </motion.button>

            <div className="group relative py-7"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
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
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/webdesigning">
                      <span className="material-symbols-outlined text-primary">brush</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Web Designing" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Modern, conversion-focused UI/UX for web platforms</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/webdevelopment">
                      <span className="material-symbols-outlined text-primary">code</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text=" Web Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Custom scalable web apps</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/backenddevelopment">
                      <span className="material-symbols-outlined text-primary">dns</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Backend Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Robust APIs, microservices & system architectureS</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/fullstachdevelopment">
                      <span className="material-symbols-outlined text-primary">layers</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Fullstack Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">End-to-end product engineering solutions</div>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/appdevelopment">
                      <span className="material-symbols-outlined text-primary">smartphone</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Mobile Apps" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Native &amp; cross-platform</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/clouddevelopment">
                      <span className="material-symbols-outlined text-primary">cloud</span>
                      <div>
                        <div className="text-sm font-bold"><WavyText text="Cloud Solutions" /></div>
                        <div className="text-xs text-slate-500 mt-1">Scalable infrastructure, DevOps & cloud migration</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/aimldevelopment">
                      <span className="material-symbols-outlined text-primary">psychology</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="AI Development" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1"> automation & LLM integration</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/ecommercedevelopment">
                      <span className="material-symbols-outlined text-primary">shopping_cart</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="E-commerce" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Conversion-driven online stores & platforms</div>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/uiuxdevelopment">
                      <span className="material-symbols-outlined text-primary">palette</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="UI/UX Design" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">User-first interfaces with premium experience</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/qa&automation">
                      <span className="material-symbols-outlined text-primary">verified</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Qa&Automation" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Automated testing & quality assurance pipelines</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/seo">
                      <span className="material-symbols-outlined text-primary">trending_up</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="SEO" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Rank higher with technical & content SEO strategies</div>
                      </div>
                    </Link>
                    <Link className="group/item flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-xl transition-all" to="/service/digitalmarketing">
                      <span className="material-symbols-outlined text-primary">campaign</span>
                      <div>
                        <div className="text-sm font-bold">
                          <WavyText text="Digital Marketing" />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Performance marketing & growth campaigns</div>
                      </div>
                    </Link>
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
                onClick={() => navigate('/hiredeveloper')}
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
                <div className="grid grid-cols-3">
                  <div className="p-6 border-r border-slate-50 dark:border-slate-800">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">By Platform</h3>
                    <div className="space-y-4">
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/fronted">
                        <WavyText text="Frontend" />
                        (React/Next/Angular/Vue)
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/backend">
                        <WavyText text="Backend" />
                        (Node/Python/Php/Java)
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/mobileapp">
                        <WavyText text="Mobile " />
                        (Flutter/IOS/Android/React Native)
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/designer">
                        <WavyText text="UI & UX " />
                        (Figma/Adobe/Canva)
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/30">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Specialized</h3>
                    <div className="space-y-4">
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/fullstack">
                        <WavyText text="Full Stack Engineers" />
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/alml">
                        <WavyText text="AI/ML Specialists" />
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/devops">
                        <WavyText text="DevOps Architects" />
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/seoexpert">
                        <WavyText text="SEO Expert" />
                      </Link>
                      <Link className="block text-sm font-medium hover:text-primary" to="/hiredeveloper/socialmediaexpert">
                        <WavyText text="Social Media Expert" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative p-8 bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col justify-between">


                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Why Code Creative?
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        We provide highly skilled, pre-vetted developers who integrate seamlessly into your team
                        and deliver scalable, high-performance solutions.
                      </p>
                    </div>

                    <button onClick={() => navigate('/hiredeveloper')} className="mt-6 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:scale-105 transition-all shadow-lg">
                      <WavyText text="Hire Developers → " />
                    </button>

                    {/* subtle glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
                  </div>

                </div>
              </motion.div>
            </div>
            <div
              className="group relative py-7"
              onMouseEnter={() => setOpen2(true)}
              onMouseLeave={() => setOpen2(false)}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/solution")}
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary"
              >
                <WavyText text="Solutions" />
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
                animate={open2 ? "show" : "hidden"}
                className="mega-menu absolute top-full left-[-350px] -translate-x-1/2 w-[900px] bg-white rounded-xl shadow-2xl border p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto transition-all duration-200"
              >
                <div className="grid grid-cols-4">

                  {/* 🔹 WEB SOLUTIONS */}
                  <div className="p-6 border-r">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">
                      Web Solutions
                    </h3>
                    <div className="space-y-3">
                      <Link to="/solution/ecommerce-platform" className="block hover:text-primary">
                        <WavyText text="E-commerce Website" />
                      </Link>
                      <Link to="/solution/real-estate" className="block hover:text-primary">                          <WavyText text="Real Estate Website" />
                      </Link>
                      <Link to="/solution/job-portal" className="block hover:text-primary">                          <WavyText text="Job Portal" />
                      </Link>
                      <Link to="/solution/lms-platform" className="block hover:text-primary">                          <WavyText text="LMS Platform" />
                      </Link>
                      <Link to="/solution/portfolio-platform" className="block hover:text-primary">                          <WavyText text="Business Website" />
                      </Link>
                    </div>
                  </div>

                  {/* 🔹 APP SOLUTIONS */}
                  <div className="p-6 border-r">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">
                      App Solutions
                    </h3>

                    <div className="space-y-3">
                      <Link to="/solution/taxi-booking-app" className="block hover:text-primary">
                        <WavyText text="Taxi Booking App" />
                      </Link>
                      <Link to="/solution/food-delivery" className="block hover:text-primary">
                        <WavyText text="Food Delivery App" />
                      </Link>
                      <Link to="/solution/fintech-wallet" className="block hover:text-primary">
                        <WavyText text="FinTech App" />
                      </Link>
                      <Link to="/solution/healthcare-portal" className="block hover:text-primary">
                        <WavyText text="Healthcare App" />
                      </Link>
                      <Link to="/solution/social-media-platform" className="block hover:text-primary">
                        <WavyText text="Social Media App" />
                      </Link>
                    </div>
                  </div>

                  {/* 🔹 TRENDING TECH */}
                  <div className="p-6 border-r">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">
                      Trending Tech
                    </h3>
                    <div className="space-y-3">
                      <Link to="/solution/ai" className="block hover:text-primary">
                        <WavyText text="AI / Machine Learning" />
                      </Link>
                      <Link to="/solution/cloud" className="block hover:text-primary">
                        <WavyText text="Cloud Computing" />
                      </Link>
                      <Link to="/solution/devops" className="block hover:text-primary">
                        <WavyText text="DevOps" />
                      </Link>
                      <Link to="/solution/blockchain" className="block hover:text-primary">
                        <WavyText text="Blockchain" />
                      </Link>
                      <Link to="/solution/iot" className="block hover:text-primary">
                        <WavyText text="IoT Solutions" />
                      </Link>
                    </div>
                  </div>

                  {/* 🔹 CTA SECTION */}
                  <div className="relative p-6 bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col justify-between rounded-xl">

                    <div>
                      <h3 className="text-lg font-bold mb-3">
                        Start Your Project 🚀
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        From idea to launch — we build scalable web & mobile apps like
                        Taxi Booking, FinTech platforms, and SaaS products.
                      </p>
                    </div>

                    <Link
                      to="/contactus"
                      className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-all shadow-md text-center"
                    >
                      <WavyText text=" Contact Us →" />
                    </Link>

                    {/* glow effect */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                  </div>

                </div>
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-sm font-semibold text-slate-600 hover:text-primary"
              onClick={() => navigate("/aboutus")}
            >
              <WavyText text="About Us" />
            </motion.button>
          </nav>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(99,102,241,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contactus')}
              className="hidden sm:flex bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg"
            >
              <WavyText text="Contact Us" />
            </motion.button>

            <button className="lg:hidden p-2 text-slate-600">
              <span className="material-symbols-outlined">
                menu
              </span>
            </button>
          </div>
        </div >
      </motion.header >
    </>
  )
}
