"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:   "#ec5b13",
  primaryLt: "#f97c42",
  primaryDim: "#c44a0a",
  bg:        "#f8f6f6",
  bgDark:    "#221610",
  surface:   "#ffffff",
  surfaceAlt:"#f2ede9",
  border:    "rgba(236,91,19,0.15)",
  text:      "#1a0e08",
  textMid:   "#5a3d2e",
  textSoft:  "#9a7060",
}

// ─── Shared animation presets ──────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const
const spring = { type: "spring", stiffness: 180, damping: 20 } as const

const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.72, delay: i * 0.11, ease } }),
}
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.55, delay: i * 0.09 } }),
}
const scaleUp = {
  hidden:  { opacity: 0, scale: 0.84 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.65, delay: i * 0.1, ease } }),
}
const slideRight = {
  hidden:  { opacity: 0, x: -56 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.7, delay: i * 0.1, ease } }),
}

// ─── Scroll-triggered wrapper ──────────────────────────────────────────────────
function Reveal({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.div>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticBtn({ children, style = {}, className = "", onClick }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: () => void }) {
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top  - r.height / 2) * 0.25)
  }
  function onLeave() { x.set(0); y.set(0) }
  return (
    <motion.button style={{ x, y, ...style }} onMouseMove={onMove} onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }} className={className} onClick={onClick}>
      {children}
    </motion.button>
  )
}

// ─── Counter animation ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref   = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count  = useMotionValue(0)
  useAnimationFrame(() => {
    if (!inView) return
    const current = count.get()
    if (current < to) {
      count.set(Math.min(current + to / 60, to))
      if (ref.current) ref.current.textContent = Math.round(count.get()) + suffix
    }
  })
  return <span ref={ref}>0{suffix}</span>
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { val: 7,   suffix: "+", label: "Years" },
  { val: 250, suffix: "+", label: "Projects" },
  { val: 120, suffix: "+", label: "Clients" },
  { val: 85,  suffix: "+", label: "Experts" },
]

const timeline = [
  { year: "2018", icon: "rocket_launch", text: "Founded in a small garage with a vision for smarter software.", side: "left"  },
  { year: "2019", icon: "groups",        text: "Reached our first 50 global clients and expanded our footprint.", side: "right" },
  { year: "2021", icon: "architecture",  text: "Team expansion to 50+ engineers across 3 continents.", side: "left"  },
  { year: "2025", icon: "psychology",    text: "Launched NeuralCore AI services, redefining automated intelligence.", side: "right" },
]

const values = [
  { icon: "lightbulb",   title: "Innovation",     desc: "Always pushing the boundaries of what's possible with modern tech." },
  { icon: "visibility",  title: "Transparency",   desc: "Clear communication and honest feedback at every step of the journey." },
  { icon: "verified",    title: "Quality",        desc: "Zero compromise on code integrity and architectural soundness." },
  { icon: "trending_up", title: "Client Success", desc: "Your growth is our primary metric for success." },
  { icon: "hub",         title: "Collaboration",  desc: "Working as an extension of your team, not just a vendor." },
  { icon: "gavel",       title: "Integrity",      desc: "Building trust through ethical practices and reliable delivery." },
]

const capabilities = [
  { icon: "terminal",   label: "Frontend"     },
  { icon: "database",   label: "Backend"      },
  { icon: "smartphone", label: "App Dev"      },
  { icon: "palette",    label: "UI/UX Design" },
  { icon: "search",     label: "SEO"          },
  { icon: "share",      label: "Social Media" },
  { icon: "smart_toy",  label: "AI/ML"        },
  { icon: "cloud_sync", label: "DevOps"       },
]

const team = [
  { name: "Alex Rivera",    role: "Founder & CEO",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4MMTEHZEAJilsfwTJKMCTvpWwG5LMkHDyAyk0jUY27jBkDIEab6I4997vXnhL-YbmUUgCKENphaTURfeoGcRXtzopB6m-PNaD8fwCoZMbmFc73Q2wQrO6ExG25VEBpX-ctUCcdiXnhfCsmvOrJPfPd7goFcEj9DhQyBXqTtbVG01B5K8VZbYJZj_5L8YopHmK3b-_dre99p9Zn3rCFJyVSPbljxg2ujr-q5cQjYWttG_rQnXtPprbPGUWZ2ft8RYOY2KlBNmQjog" },
  { name: "Sarah Chen",     role: "Chief Tech Officer",img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiUsvIGTHLECuBhfKqY53G69XcMMdxTn0DRgtBV6pb79d971uZuO8mJeFJTwP6dygD_2TLrDvilZYnA0GzQWrg2MwbkevTbzpPe6r2yctcBzRT5Pc31K_yK_gmCzTwyWGrcDgSSq-mp1ypXNcsM0GbE8ZMOLHaRQZ_MAZ1FJqX_DUG0gRKLajcHXJAHxWzwGLO-bB4IjZ44DAmNNqqTQx6xbmuSNFHpXhev9pWx2ZnOcml8TapgOdVo9O9dQcfNLdDqMWwkJDVTLU" },
  { name: "Marcus Thorne",  role: "Head of Design",    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOkDgcSFTtOSS0T0bVwwVn0LzEf7v1yoeLb7k4gwYTSUDN2NHw6zPHpaTsd-1XvAqaELRNLQuG2FuU1bux9yVODUU_c-VZELWN9LgY5VYxZfICEIjc5au_z_kYgs5X1-kLThF1ROL-MfSJSrfWbr6sh-B0a3JoWNSwLz9XcaOQpuXrd7e2_191zbcicZHPiO9JCIqSfeuQQuuRw_ypbUxCHuEYJ2fSsKpYLMvBoxvDF3VYdNKu_Fjn8iKn8EyVQpjC6uO30X6VKPc" },
  { name: "Dr. Elena Volkov",role:"AI Research Lead",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDsN3H_6D8xFZxEWx8BqXDM1kUlZg4lqgKSi_s0ZDViqWjXOson9ci9QI0NPJpWPADvqH6IEGpkf0yZ1KeThPHMf1bJyzrxFNk5Qj-2_rzXLDoq-6LOxe6tiNkwIQb-bdqdbwsnkW662PqeSV11qQaFGbY7HqJWwrOUREfwipk1r0B46E1osrvfCHiF9YMasbwZw3MWp78WvucYWLd0j29Fkxjw31xCdHsXQPrewONOONXIgT4m1wJLFYnt_cYLif4sKpVJweTf8" },
]

const whyUs = [
  { title: "Experienced Team",      desc: "Our engineers come from top tier tech backgrounds and FAANG experience." },
  { title: "Agile Methodology",     desc: "Rapid iterations and weekly sprints to keep you in the loop." },
  { title: "Scalable Architecture", desc: "We build for millions of users from day one, ensuring no technical debt." },
  { title: "End-to-End Delivery",   desc: "From discovery and design to deployment and maintenance." },
  { title: "24/7 Premium Support",  desc: "We are here when you need us, regardless of timezones." },
]

const techStack = [
  { icon: "javascript", label: "React"   },
  { icon: "deployed_code",label:"Node"   },
  { icon: "terminal",   label: "Python"  },
  { icon: "cloud",      label: "AWS"     },
  { icon: "package_2",  label: "Docker"  },
  { icon: "draw",       label: "Figma"   },
]

const testimonials = [
  {
    quote: "NeuralAgency transformed our legacy systems into a modern AI-powered platform in record time. Their engineering standards are world-class.",
    name: "Jonathan Vance", role: "CTO, GlobalLogistics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmxQSZ-C_gom1tigzUhxFLaX4mrEJllOhz0V-Haw9zrMZBudItowyoioAdJhwEzmnL4cdZOjDD9OVIkav5VcwZzrhpGdCWr8Jmh27uEQyr82FlbJW5mNnl1w0G3EVTOk7Wd0OxWO4HmJQd0TI7St4F-SFk7QUxcuA8nUp_EtuaHvPazn8ZAGK-6-rr-umTUV_nxiMawIJ7OMhQvIHmsjF-fyuIjDmSfBKKFA3n1L0b_KQGky0Jp-WaHi9U6pJAkG9XQR5Ut0o61Ek",
  },
  {
    quote: "The UI/UX team at NeuralAgency deeply understood our brand and created a seamless experience that tripled our conversion rate.",
    name: "Sarah Jenkins", role: "Founder, BloomFintech",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA80ZhJhIMH-nQut6-Gf5O7LhZOhqHzLx_52BV3T6SQiLS3iiK8n_dfEw4dPoJq7Q660K-qRdUWOkxP3UKofKu6z31szSsnomzxmlZrh3em-I4RTVm_96cSS1-RB-yMU2jCbDa73Dzju1Uz4mF-RclMG_9R2dSB68Lcs3KP-_PmdUIwZTosEk8UgZiYtMW08iikhG4ljdFiPYVm93LNypx8lOs3O693sCLs8MGccp-UvqCQwOOdDV_701FPX1lw1FOvfdidQpWvSE8",
  },
]

const contacts = [
  { icon: "mail",        label: "Email",    value: "hello@neuralagency.io" },
  { icon: "call",        label: "Phone",    value: "+1 (555) 000-1234" },
  { icon: "location_on", label: "Location", value: "San Francisco, CA" },
]

// ─── Floating orb background ──────────────────────────────────────────────────
function Orb({ top, left, size, opacity, delay }: { top: string; left: string; size: string; opacity: number; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ position: "absolute", top, left, width: size, height: size, borderRadius: "9999px",
        background: `radial-gradient(circle, rgba(236,91,19,${opacity}) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none" }}
    />
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const heroFade  = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        body { background:${C.bg}; color:${C.text}; font-family:'DM Sans',sans-serif; -webkit-font-smoothing:antialiased; }
        .hl { font-family:'Syne',sans-serif; }
        .material-symbols-outlined {
          font-family:'Material Symbols Outlined'; font-weight:normal; font-style:normal;
          font-size:24px; line-height:1; letter-spacing:normal; text-transform:none;
          display:inline-block; white-space:nowrap; word-wrap:normal; direction:ltr;
          font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; user-select:none;
        }
        ::selection { background:rgba(236,91,19,0.15); }
        input { color:${C.text}; background:transparent; }
        input::placeholder { color:${C.textSoft}; }
        /* Scrollbar */
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.surfaceAlt}; }
        ::-webkit-scrollbar-thumb { background:${C.primary}; border-radius:99px; }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, ${C.primaryDim}, ${C.primary}, ${C.primaryLt}, ${C.primary}, ${C.primaryDim});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes pulse-ring {
          0%   { transform:scale(1);   opacity:0.6; }
          100% { transform:scale(1.6); opacity:0; }
        }
        .dot-ping::before {
          content:''; position:absolute; inset:-6px; border-radius:9999px;
          border:2px solid ${C.primary}; animation:pulse-ring 1.8s ease-out infinite;
        }
        @keyframes float-slow {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-14px) rotate(2deg); }
        }
        .hero-img-wrap { animation:float-slow 7s ease-in-out infinite; }
      `}</style>

      <main style={{ background: C.bg, overflowX: "hidden" }}>

        <section ref={heroRef} style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", padding:"0 2rem", background:C.bg }}>
          {/* background orbs */}
          <Orb top="-8%"  left="60%"  size="600px" opacity={0.12} delay={0} />
          <Orb top="50%"  left="-8%"  size="400px" opacity={0.08} delay={2} />
          <Orb top="70%"  left="80%"  size="320px" opacity={0.06} delay={4} />

          {/* Faint grid texture */}
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(236,91,19,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,91,19,0.04) 1px, transparent 1px)`, backgroundSize:"48px 48px", pointerEvents:"none" }} />

          <motion.div style={{ opacity: heroFade, y: parallaxY, width:"100%", maxWidth:"88rem", margin:"0 auto", position:"relative", zIndex:10, padding:"6rem 0" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>

              {/* Left */}
              <motion.div initial="hidden" animate="visible">
                {/* breadcrumb */}
                <motion.nav variants={fadeIn} custom={0} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.8rem", color:C.textSoft, marginBottom:"2rem" }}>
                  <a href="#" style={{ color:C.primary, textDecoration:"none", fontWeight:600 }}>Home</a>
                  <span className="material-symbols-outlined" style={{ fontSize:"0.9rem" }}>chevron_right</span>
                  <span>About Us</span>
                </motion.nav>

                <motion.h1 variants={fadeUp} custom={1} className="hl"
                  style={{ fontSize:"clamp(4rem,8vw,7rem)", fontWeight:800, lineHeight:0.9, letterSpacing:"-0.04em", marginBottom:"1.75rem", color:C.text }}>
                  About{" "}
                  <span className="shimmer-text">Us</span>
                </motion.h1>

                <motion.p variants={fadeUp} custom={2}
                  style={{ fontSize:"1.2rem", color:C.textMid, lineHeight:1.75, maxWidth:"32rem", marginBottom:"2.5rem" }}>
                  We build digital products and scalable solutions that help businesses grow in the era of intelligence.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} style={{ display:"flex", gap:"1rem" }}>
                  <MagneticBtn style={{ padding:"0.9rem 2rem", background:C.primary, color:"#fff", fontWeight:700, borderRadius:"0.75rem", border:"none", cursor:"pointer", fontFamily:"Syne,sans-serif", fontSize:"0.95rem", boxShadow:`0 8px 32px rgba(236,91,19,0.35)` }}>
                    Get Started
                  </MagneticBtn>
                  <MagneticBtn style={{ padding:"0.9rem 2rem", background:C.surface, color:C.text, fontWeight:700, borderRadius:"0.75rem", border:`1.5px solid ${C.border}`, cursor:"pointer", fontFamily:"Syne,sans-serif", fontSize:"0.95rem" }}>
                    Our Work
                  </MagneticBtn>
                </motion.div>
              </motion.div>

              {/* Right – rotating image card */}
              <motion.div
                initial={{ opacity:0, x:80, rotate:3 }}
                animate={{ opacity:1, x:0, rotate:-3 }}
                transition={{ duration:1, delay:0.3, ease }}
                style={{ position:"relative" }}
              >
                <div style={{ position:"absolute", inset:0, background:C.surfaceAlt, borderRadius:"3rem", transform:"rotate(6deg)", boxShadow:`0 24px 64px rgba(236,91,19,0.12)` }} />
                <motion.div
                  className="hero-img-wrap"
                  whileHover={{ rotate:0, scale:1.02 }}
                  transition={{ duration:0.6 }}
                  style={{ position:"relative", borderRadius:"3rem", overflow:"hidden", aspectRatio:"1/1", boxShadow:`0 32px 80px rgba(26,14,8,0.18)` }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuANOQjLyt-XdMlnr4htR4CIPVxP5OkC4Cz81iz54pY0VgkAXqRKgkiZd5ftnSKSeqVnVbka7d1NdlU97_TyVxbtEVDOF2ZeO0jKW6iJb7R1dtZiTvUgGSpvaIC9sJz5fBmozeeAybY9XXdOVtJbnMJv-TE5CYQvS9zzOgAmfrBy4kORtWJc89AhFy9BIi3XKCQ0GuCVTNY1iud0aq9HTxEoKEruwgmIUyFL_UUrFURPywUAlDpZ3KQLY_IkW2OH-1mlK5Ma5xVzLag"
                    alt="Team collaborating"
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}
                  />
                  {/* warm tint overlay */}
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(236,91,19,0.15) 0%, transparent 60%)" }} />
                </motion.div>
                {/* decorative badge */}
                <motion.div
                  initial={{ opacity:0, scale:0, rotate:-20 }}
                  animate={{ opacity:1, scale:1, rotate:0 }}
                  transition={{ ...spring, delay:0.9 }}
                  style={{ position:"absolute", bottom:"2rem", left:"-2rem", background:C.surface, borderRadius:"1rem", padding:"0.75rem 1.25rem", boxShadow:`0 8px 32px rgba(26,14,8,0.14)`, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:"0.6rem" }}
                >
                  <div style={{ position:"relative" }}>
                    <div className="dot-ping" style={{ width:"10px", height:"10px", borderRadius:"9999px", background:C.primary, position:"relative" }} />
                  </div>
                  <span style={{ fontSize:"0.8rem", fontWeight:700, fontFamily:"Syne,sans-serif", color:C.text }}>85+ AI Experts Active</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════ STATS ══════════════════════════════════════ */}
        <section style={{ padding:"5rem 2rem", background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
                {/* Mission text */}
                <div>
                  <motion.div variants={fadeUp} custom={0} style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:`rgba(236,91,19,0.08)`, border:`1px solid ${C.border}`, borderRadius:"99px", padding:"0.3rem 1rem", marginBottom:"1.5rem" }}>
                    <span style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", color:C.primary, textTransform:"uppercase", fontFamily:"Syne,sans-serif" }}>Our Mission & Vision</span>
                  </motion.div>
                  <motion.h2 variants={fadeUp} custom={1} className="hl" style={{ fontSize:"2.25rem", fontWeight:700, marginBottom:"1.25rem", letterSpacing:"-0.02em" }}>
                    Accelerating Global Innovation
                  </motion.h2>
                  <motion.p variants={fadeUp} custom={2} style={{ color:C.textMid, lineHeight:1.8, fontSize:"1.05rem" }}>
                    To accelerate global innovation by providing world-class engineering talent and AI-driven strategies. We believe that technology should be an invisible force that empowers human potential, not a hurdle that restricts it. Our vision is to become the architectural backbone for the next generation of digital giants.
                  </motion.p>
                </div>

                {/* Stats grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      variants={scaleUp}
                      custom={i}
                      whileHover={{ y:-4, boxShadow:`0 16px 48px rgba(236,91,19,0.14)` }}
                      style={{ padding:"1.75rem", borderRadius:"1.25rem", background:C.bg, border:`1px solid ${C.border}`, transition:"box-shadow 0.3s" }}
                    >
                      <div className="hl" style={{ fontSize:"2.75rem", fontWeight:800, color:C.primary, lineHeight:1, marginBottom:"0.4rem" }}>
                        <Counter to={s.val} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize:"0.7rem", color:C.textSoft, textTransform:"uppercase", letterSpacing:"0.14em", fontWeight:600 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ TIMELINE ═══════════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.bg, overflow:"hidden" }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <motion.h2 variants={fadeUp} custom={0} className="hl"
                style={{ fontSize:"clamp(2rem,3.5vw,2.75rem)", fontWeight:700, textAlign:"center", marginBottom:"5rem", letterSpacing:"-0.02em" }}>
                Our <span style={{ color:C.primary }}>Evolution</span>
              </motion.h2>

              <div style={{ position:"relative" }}>
                {/* center line */}
                <motion.div
                  initial={{ scaleY:0 }}
                  whileInView={{ scaleY:1 }}
                  viewport={{ once:true }}
                  transition={{ duration:1.4, ease }}
                  style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"2px", background:`linear-gradient(to bottom, transparent, ${C.primary}, transparent)`, transformOrigin:"top" }}
                />

                <div style={{ display:"flex", flexDirection:"column", gap:"5rem" }}>
                  {timeline.map((item, i) => (
                    <div key={item.year} style={{ display:"grid", gridTemplateColumns:"1fr 80px 1fr", alignItems:"center", gap:"2rem" }}>
                      {/* Left content */}
                      {item.side === "left" ? (
                        <motion.div variants={slideRight} custom={i} style={{ textAlign:"right" }}>
                          <div className="hl" style={{ fontSize:"1.75rem", fontWeight:700, color:C.primary, marginBottom:"0.4rem" }}>{item.year}</div>
                          <p style={{ color:C.textMid, lineHeight:1.6 }}>{item.text}</p>
                        </motion.div>
                      ) : <div />}

                      {/* Center icon */}
                      <motion.div
                        initial={{ scale:0, rotate:-90 }}
                        whileInView={{ scale:1, rotate:0 }}
                        viewport={{ once:true }}
                        transition={{ ...spring, delay:i * 0.15 }}
                        whileHover={{ scale:1.15, rotate:10 }}
                        style={{ width:"64px", height:"64px", borderRadius:"9999px", background:C.surface, border:`2px solid ${C.primary}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", boxShadow:`0 0 0 6px ${C.bg}, 0 0 0 8px rgba(236,91,19,0.15)`, cursor:"default" }}
                      >
                        <span className="material-symbols-outlined" style={{ color:C.primary, fontSize:"1.5rem" }}>{item.icon}</span>
                      </motion.div>

                      {/* Right content */}
                      {item.side === "right" ? (
                        <motion.div variants={fadeUp} custom={i}>
                          <div className="hl" style={{ fontSize:"1.75rem", fontWeight:700, color:C.primary, marginBottom:"0.4rem" }}>{item.year}</div>
                          <p style={{ color:C.textMid, lineHeight:1.6 }}>{item.text}</p>
                        </motion.div>
                      ) : <div />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ CORE VALUES ════════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.surfaceAlt }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <motion.div variants={fadeUp} custom={0} style={{ marginBottom:"4rem" }}>
                <h2 className="hl" style={{ fontSize:"clamp(2rem,3.5vw,2.75rem)", fontWeight:700, marginBottom:"0.75rem", letterSpacing:"-0.02em" }}>
                  Our Core <span style={{ color:C.primary }}>Values</span>
                </h2>
                <p style={{ color:C.textMid, maxWidth:"30rem" }}>The principles that guide every line of code we write and every pixel we place.</p>
              </motion.div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"1.25rem" }}>
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    variants={scaleUp}
                    custom={i * 0.6}
                    whileHover={{ y:-6, boxShadow:`0 20px 56px rgba(236,91,19,0.12)`, borderColor:C.primary }}
                    style={{ padding:"2rem", borderRadius:"1.5rem", background:C.surface, border:`1px solid ${C.border}`, transition:"box-shadow 0.3s, border-color 0.3s", cursor:"default" }}
                  >
                    <motion.span
                      whileHover={{ scale:1.2, rotate:-8 }}
                      transition={{ type:"spring", stiffness:250 }}
                      className="material-symbols-outlined"
                      style={{ color:C.primary, fontSize:"2.25rem", display:"block", marginBottom:"1.25rem" }}
                    >
                      {v.icon}
                    </motion.span>
                    <h3 className="hl" style={{ fontSize:"1.1rem", fontWeight:700, marginBottom:"0.65rem" }}>{v.title}</h3>
                    <p style={{ color:C.textSoft, fontSize:"0.875rem", lineHeight:1.7 }}>{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ CAPABILITIES ══════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.bg }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <motion.h2 variants={fadeUp} custom={0} className="hl"
                style={{ fontSize:"clamp(2rem,3.5vw,2.75rem)", fontWeight:700, textAlign:"center", marginBottom:"4rem", letterSpacing:"-0.02em" }}>
                Full-Spectrum <span style={{ color:C.primary }}>Capabilities</span>
              </motion.h2>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"1rem" }}>
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    variants={fadeUp}
                    custom={i * 0.5}
                    whileHover={{ background: `rgba(236,91,19,0.06)`, y:-4 }}
                    style={{ padding:"2rem", borderRadius:"1rem", background:C.surfaceAlt, border:`1px solid transparent`, cursor:"default", transition:"background 0.25s, border-color 0.25s" }}
                  >
                    <motion.span
                      className="material-symbols-outlined"
                      style={{ color:C.primary, fontSize:"1.75rem", display:"block", marginBottom:"0.75rem" }}
                      whileHover={{ scale:1.15, rotate:5 }}
                      transition={{ type:"spring", stiffness:280 }}
                    >
                      {cap.icon}
                    </motion.span>
                    <h4 className="hl" style={{ fontWeight:700, fontSize:"0.95rem" }}>{cap.label}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ TEAM ═══════════════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.surfaceAlt }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <motion.div variants={fadeUp} custom={0}
                style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem" }}>
                <div>
                  <h2 className="hl" style={{ fontSize:"clamp(2rem,3.5vw,2.75rem)", fontWeight:700, marginBottom:"0.5rem", letterSpacing:"-0.02em" }}>
                    Meet the <span style={{ color:C.primary }}>Visionaries</span>
                  </h2>
                  <p style={{ color:C.textSoft }}>The minds behind the neural network.</p>
                </div>
                <MagneticBtn style={{ color:C.primary, fontWeight:700, display:"flex", alignItems:"center", gap:"0.4rem", background:"none", border:"none", cursor:"pointer", fontFamily:"Syne,sans-serif", fontSize:"0.95rem" }}>
                  Join Our Team <span className="material-symbols-outlined" style={{ fontSize:"1.1rem" }}>arrow_forward</span>
                </MagneticBtn>
              </motion.div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2rem" }}>
                {team.map((member, i) => (
                  <motion.div
                    key={member.name}
                    variants={scaleUp}
                    custom={i * 0.7}
                    style={{ cursor:"default" }}
                    className="team-card"
                  >
                    <motion.div
                      whileHover={{ scale:1.02 }}
                      style={{ aspectRatio:"4/5", borderRadius:"1.5rem", overflow:"hidden", marginBottom:"1rem", position:"relative", boxShadow:`0 8px 32px rgba(26,14,8,0.1)` }}
                    >
                      <motion.img
                        src={member.img}
                        alt={member.name}
                        style={{ width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(0.6)", transition:"filter 0.5s" }}
                        whileHover={{ filter:"grayscale(0)" } as any}
                      />
                      {/* gradient overlay */}
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(26,14,8,0.5) 0%, transparent 50%)" }} />
                      {/* hover shimmer */}
                      <motion.div
                        initial={{ x:"-100%", opacity:0.4 }}
                        whileHover={{ x:"200%", opacity:0 }}
                        transition={{ duration:0.7 }}
                        style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform:"skewX(-20deg)" }}
                      />
                    </motion.div>
                    <h4 className="hl" style={{ fontSize:"1.1rem", fontWeight:700, marginBottom:"0.25rem" }}>{member.name}</h4>
                    <p style={{ color:C.primary, fontSize:"0.85rem", fontWeight:600, marginBottom:"0.75rem" }}>{member.role}</p>
                    <div style={{ display:"flex", gap:"0.75rem" }}>
                      {["language","alternate_email"].map(icon => (
                        <motion.span
                          key={icon}
                          className="material-symbols-outlined"
                          whileHover={{ color:C.primary, y:-2 }}
                          style={{ color:C.textSoft, fontSize:"1.1rem", cursor:"pointer", transition:"color 0.2s" }}
                        >
                          {icon}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ WHY US ═════════════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.bg }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>

              {/* Left checklist */}
              <div>
                <motion.h2 variants={fadeUp} custom={0} className="hl"
                  style={{ fontSize:"clamp(2rem,3.5vw,2.75rem)", fontWeight:700, marginBottom:"2.5rem", letterSpacing:"-0.02em" }}>
                  What Sets Us <span style={{ color:C.primary }}>Apart?</span>
                </motion.h2>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"1.75rem" }}>
                  {whyUs.map((item, i) => (
                    <motion.li
                      key={item.title}
                      variants={slideRight}
                      custom={i}
                      whileHover={{ x:6 }}
                      style={{ display:"flex", gap:"1rem", alignItems:"flex-start", cursor:"default" }}
                    >
                      <motion.div
                        whileHover={{ scale:1.15, rotate:8 }}
                        style={{ marginTop:"0.15rem", width:"28px", height:"28px", borderRadius:"9999px", background:`rgba(236,91,19,0.12)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${C.border}` }}
                      >
                        <span className="material-symbols-outlined" style={{ color:C.primary, fontSize:"0.9rem", fontVariationSettings:"'FILL' 1" }}>check</span>
                      </motion.div>
                      <div>
                        <h5 className="hl" style={{ fontWeight:700, marginBottom:"0.25rem" }}>{item.title}</h5>
                        <p style={{ color:C.textSoft, fontSize:"0.875rem", lineHeight:1.6 }}>{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right tech stack card */}
              <motion.div
                variants={scaleUp}
                custom={0}
                style={{ borderRadius:"2rem", background:C.surface, padding:"2.5rem", border:`1px solid ${C.border}`, boxShadow:`0 16px 64px rgba(26,14,8,0.07)` }}
              >
                <h3 className="hl" style={{ fontSize:"1.4rem", fontWeight:700, marginBottom:"2rem" }}>Our Tech Stack</h3>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2rem" }}>
                  {techStack.map((t, i) => (
                    <motion.div
                      key={t.label}
                      whileHover={{ scale:1.08, color:C.primary }}
                      initial={{ opacity:0.5 }}
                      whileInView={{ opacity:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i * 0.07 }}
                      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem", color:C.textSoft, cursor:"default" }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize:"2.25rem" }}>{t.icon}</span>
                      <span style={{ fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>{t.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ TESTIMONIALS ══════════════════════════════ */}
        <section style={{ padding:"6rem 2rem", background:C.surfaceAlt }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
              <motion.h2 variants={fadeUp} custom={0} className="hl"
                style={{ fontSize:"clamp(1.75rem,3vw,2.5rem)", fontWeight:700, textAlign:"center", marginBottom:"4rem", letterSpacing:"-0.02em" }}>
                Trusted by <span style={{ color:C.primary }}>Industry Leaders</span>
              </motion.h2>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={scaleUp}
                    custom={i}
                    whileHover={{ y:-6, boxShadow:`0 24px 64px rgba(236,91,19,0.1)` }}
                    style={{ padding:"2.5rem", borderRadius:"1.75rem", background:C.surface, border:`1px solid ${C.border}`, position:"relative", overflow:"hidden" }}
                  >
                    {/* giant quote mark */}
                    <span className="material-symbols-outlined" style={{ fontSize:"5rem", color:`rgba(236,91,19,0.08)`, position:"absolute", top:"1rem", right:"2rem", lineHeight:1, pointerEvents:"none" }}>format_quote</span>

                    {/* Stars */}
                    <div style={{ display:"flex", gap:"0.2rem", marginBottom:"1.5rem" }}>
                      {[...Array(5)].map((_, si) => (
                        <motion.span
                          key={si}
                          initial={{ opacity:0, scale:0 }}
                          whileInView={{ opacity:1, scale:1 }}
                          viewport={{ once:true }}
                          transition={{ delay:i*0.1 + si*0.07, ...spring }}
                          className="material-symbols-outlined"
                          style={{ color:C.primary, fontSize:"1rem", fontVariationSettings:"'FILL' 1" }}
                        >
                          star
                        </motion.span>
                      ))}
                    </div>

                    <p style={{ fontSize:"1.05rem", fontStyle:"italic", color:C.text, lineHeight:1.75, marginBottom:"2rem", position:"relative" }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                      <motion.img
                        whileHover={{ scale:1.08 }}
                        src={t.img}
                        alt={t.name}
                        style={{ width:"48px", height:"48px", borderRadius:"9999px", objectFit:"cover", border:`2px solid ${C.border}` }}
                      />
                      <div>
                        <div className="hl" style={{ fontWeight:700, fontSize:"0.95rem" }}>{t.name}</div>
                        <div style={{ fontSize:"0.8rem", color:C.textSoft }}>{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ CTA BANNER ═════════════════════════════════ */}
        <section style={{ padding:"5rem 2rem" }}>
          <Reveal>
            <motion.div
              variants={scaleUp}
              custom={0}
              style={{ maxWidth:"80rem", margin:"0 auto", borderRadius:"3rem", background:C.bgDark, padding:"clamp(3rem,6vw,6rem)", position:"relative", overflow:"hidden", border:`1px solid rgba(236,91,19,0.2)` }}
            >
              {/* bg orb */}
              <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"500px", height:"500px", borderRadius:"9999px", background:`radial-gradient(circle, rgba(236,91,19,0.18) 0%, transparent 70%)`, filter:"blur(60px)", pointerEvents:"none" }} />

              <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                <motion.h2 variants={fadeUp} custom={0} className="hl"
                  style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:800, color:"#fff", marginBottom:"2.5rem", letterSpacing:"-0.03em", lineHeight:1.1 }}>
                  Let's Build Something<br />
                  <span style={{ color:C.primary }}>Great Together</span>
                </motion.h2>
                <motion.div variants={fadeUp} custom={1} style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                  <MagneticBtn style={{ padding:"1rem 2.5rem", background:C.primary, color:"#fff", fontWeight:700, borderRadius:"0.875rem", border:"none", cursor:"pointer", fontSize:"1.05rem", fontFamily:"Syne,sans-serif", boxShadow:`0 12px 40px rgba(236,91,19,0.4)` }}>
                    Hire Experts
                  </MagneticBtn>
                  <MagneticBtn style={{ padding:"1rem 2.5rem", background:"rgba(255,255,255,0.06)", color:"#fff", fontWeight:700, borderRadius:"0.875rem", border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer", fontSize:"1.05rem", fontFamily:"Syne,sans-serif" }}>
                    Contact Us
                  </MagneticBtn>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </section>

        {/* ═══════════════════════ CONTACT CHIPS ══════════════════════════════ */}
        <section style={{ paddingBottom:"5rem", padding:"0 2rem 5rem" }}>
          <Reveal>
            <div style={{ maxWidth:"80rem", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
              {contacts.map((c, i) => (
                <motion.div
                  key={c.label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y:-4, boxShadow:`0 12px 40px rgba(236,91,19,0.12)`, borderColor:C.primary }}
                  style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1.5rem", borderRadius:"1.25rem", background:C.surface, border:`1px solid ${C.border}`, transition:"box-shadow 0.25s, border-color 0.25s", cursor:"default" }}
                >
                  <motion.div
                    whileHover={{ rotate:10, scale:1.1 }}
                    style={{ width:"48px", height:"48px", borderRadius:"9999px", background:`rgba(236,91,19,0.1)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
                  >
                    <span className="material-symbols-outlined" style={{ color:C.primary }}>{c.icon}</span>
                  </motion.div>
                  <div>
                    <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.14em", fontWeight:700, color:C.textSoft, marginBottom:"0.2rem" }}>{c.label}</div>
                    <div className="hl" style={{ fontWeight:700 }}>{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

      </main>
    </>
  )
}