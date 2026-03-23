import { motion } from "framer-motion"
<<<<<<< HEAD
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Typewriter } from "react-simple-typewriter"


function AIScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let particles: any[] = []
    const count = 60

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    // resize
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    // create particles
    particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    }))

    const center = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    })

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const c = center()

      particles.forEach((p, i) => {
        // attraction to center (AI core)
        const dx = c.x - p.x
        const dy = c.y - p.y
        p.vx += dx * 0.0005
        p.vy += dy * 0.0005

        // mouse interaction
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const dist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (dist < 120) {
          p.vx += mdx * 0.002
          p.vy += mdy * 0.002
        }

        p.x += p.vx
        p.y += p.vy

        // friction
        p.vx *= 0.96
        p.vy *= 0.96

        // draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = "#f97316"
        ctx.fill()

        // connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(249,115,22,${1 - dist / 120})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      // 🔥 AI CORE glow
      ctx.beginPath()
      ctx.arc(c.x, c.y, 80, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 80)
      gradient.addColorStop(0, "rgba(249,115,22,0.4)")
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fill()

      requestAnimationFrame(draw)
    }

    draw()

    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}

// ── Floating particles ─────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 5 + Math.random() * 5,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    dur: 6 + Math.random() * 8,
    opacity: 0.12 + Math.random() * 0.2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-orange-600"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            opacity: p.opacity,
            animation: `floatUp ${p.dur}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(110vh) scale(1); }
          100% { transform: translateY(-10vh) scale(0.4); }
        }
        @keyframes shimmer {
          0%,100% { opacity:0.5; transform:scaleX(0.96); }
          50%      { opacity:1;   transform:scaleX(1); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(1); opacity:0.4; }
          100% { transform:scale(1.8); opacity:0; }
        }
        @keyframes wiggle {
          0%,100% { transform:rotate(-2deg); }
          50%     { transform:rotate(2deg); }
        }
        @keyframes typeIn {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate()
  const container: any = {
=======
import { Typewriter } from "react-simple-typewriter"

export default function Hero() {

  const container:any = {
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 }
    }
  }

<<<<<<< HEAD
  const fadeUp: any = {
=======
  const fadeUp:any = {
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

<<<<<<< HEAD
  const float: any = {
=======
  const float:any = {
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
<<<<<<< HEAD
    <section className="relative pt-14 pb-32 overflow-hidden mesh-gradient-bg min-h-screen flex items-center">
      <style>
       {`@keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }`}

      </style>
      <Particles />
      <AIScene />
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[0]"
      >
        <motion.div
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-[200px] h-[200px] rounded-full border border-orange-400"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-[#faf8f5] to-sky-50/30" />
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      {/* Decorative floating icons */}
      <div className="absolute top-32 left-10 md:left-40 opacity-10 select-none" style={{ animation: "floatY 6s ease-in-out infinite" }}>
        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 72 }}>terminal</span>
      </div>
      <div className="absolute bottom-24 right-10 md:right-40 opacity-10 select-none" style={{ animation: "floatY 8s ease-in-out infinite 1s" }}>
        <span className="material-symbols-outlined text-sky-500" style={{ fontSize: 72 }}>cloud_done</span>
      </div>
      <div className="absolute top-1/2 left-8 opacity-8 select-none hidden lg:block" style={{ animation: "floatY 7s ease-in-out infinite 2s" }}>
        <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: 48 }}>psychology</span>
      </div>
      <div className="absolute top-1/3 right-8 opacity-8 select-none hidden lg:block" style={{ animation: "floatY 5s ease-in-out infinite .5s" }}>
        <span className="material-symbols-outlined text-violet-400" style={{ fontSize: 48 }}>hub</span>
      </div>
=======
    <section className="relative pt-44 pb-32 overflow-hidden mesh-gradient-bg min-h-screen flex items-center">

>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
      {/* floating shapes */}
      <motion.div
        variants={float}
        animate="animate"
        className="floating-shape top-20 right-[10%] w-96 h-96 bg-cyan-200 rounded-full"
      />

      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 1 }}
        className="floating-shape bottom-20 left-[5%] w-[500px] h-[500px] bg-purple-200 rounded-full"
      />

      <motion.div
        variants={float}
        animate="animate"
        transition={{ delay: 2 }}
        className="floating-shape top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-100 rounded-full rotate-45"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1200px] mx-auto px-6 relative z-10 text-center"
      >

        {/* badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-slate-200 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>

          <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
            The Future of Development
          </span>

        </motion.div>

        {/* heading with writing animation */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
        >

          Building Digital Experiences That

          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-cyan-500">

            <Typewriter
              words={[
                "Scale Your Startup",
                "Transform Ideas Into Products",
                "Drive Innovation"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />

          </span>

        </motion.h1>

        {/* description */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We blend technical precision with organic design to create software that doesn't just work—it inspires.
        </motion.p>

        {/* buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
            onClick={() => navigate("/casestudy")}
=======
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
            className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl"
          >
            Explore Our Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
            onClick={() => navigate('/contactus')}
            className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">phone</span>
            Let's Conect
=======
            className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Watch Reel
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
          </motion.button>

        </motion.div>

        {/* trust badges */}
        <motion.div
          variants={container}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60"
        >
          {[
            ["verified", "AWS Experts"],
<<<<<<< HEAD
            ["cloud", "Cloud Experts"],
=======
            ["google", "Cloud Experts"],
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
            ["star", "Top Rated 2026"],
            ["language", "Global Delivery"]
          ].map(([icon, text], i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center gap-2 text-slate-500 font-bold"
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-20 text-slate-400 flex flex-col items-center"
        >
          <span className="text-sm">Scroll</span>
          <span className="material-symbols-outlined">expand_more</span>
        </motion.div>

      </motion.div>
    </section>
  )
}