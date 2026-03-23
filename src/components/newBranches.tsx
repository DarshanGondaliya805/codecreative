// GlobalPresence.tsx — Light mode redesign
// primary: #ec5b13 | background-light: #f8f6f6
// Cards: Country · Flag · City · Analog Clock only
// npm install framer-motion

import { useEffect, useRef, useState, FC } from "react"
import { motion, useInView } from "framer-motion"

// ─── Palette ──────────────────────────────────────────────────────────────────
const PRIMARY   = "#ec5b13"
const BG_LIGHT  = "#f8f6f6"
const BG_CARD   = "#ffffff"
const BG_CLOCK  = "#fdf9f7"
const TEXT_DARK = "#1a0a02"
const TEXT_MID  = "#6b3d2a"
const TEXT_SOFT = "#c4a99a"
const BORDER    = "rgba(236,91,19,0.12)"

// ─── Branch Data ──────────────────────────────────────────────────────────────
const BRANCHES = [
  {
    city: "Ahmedabad",
    country: "India",
    tz: "Asia/Kolkata",
    flag: "https://flagcdn.com/w160/in.png",
    accent: "#ec5b13",      // primary
    ring: "#ec5b13",
    idx: 0,
  },
  {
    city: "New York",
    country: "United States",
    tz: "America/New_York",
    flag: "https://flagcdn.com/w160/us.png",
    accent: "#2563eb",
    ring: "#2563eb",
    idx: 1,
  },
  {
    city: "London",
    country: "United Kingdom",
    tz: "Europe/London",
    flag: "https://flagcdn.com/w160/gb.png",
    accent: "#7c3aed",
    ring: "#7c3aed",
    idx: 2,
  },
  {
    city: "Dubai",
    country: "UAE",
    tz: "Asia/Dubai",
    flag: "https://flagcdn.com/w160/ae.png",
    accent: "#059669",
    ring: "#059669",
    idx: 3,
  },
] as const

type Branch = (typeof BRANCHES)[number]

// ─── Time Helper ──────────────────────────────────────────────────────────────
function getHMS(tz: string) {
  const t = new Date().toLocaleTimeString("en-US", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  })
  const [h, m, s] = t.split(":").map(Number)
  return { h, m, s }
}

// ─── Canvas Clock — Warm Light Face ──────────────────────────────────────────
function drawClock(canvas: HTMLCanvasElement, tz: string, accent: string) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  const size = canvas.clientWidth
  if (!size) return
  canvas.width = size * dpr
  canvas.height = size * dpr
  ctx.scale(dpr, dpr)

  const cx = size / 2, cy = size / 2
  const R = size / 2 - 6

  ctx.clearRect(0, 0, size, size)

  // ── Soft shadow ring ──
  ctx.beginPath()
  ctx.arc(cx, cy, R + 3, 0, Math.PI * 2)
  ctx.strokeStyle = `${accent}22`
  ctx.lineWidth = 6
  ctx.stroke()

  // ── Face ──
  const faceGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.05, cx, cy, R)
  faceGrad.addColorStop(0, "#fff")
  faceGrad.addColorStop(1, BG_CLOCK)
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.fillStyle = faceGrad
  ctx.fill()

  // ── Border ──
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.strokeStyle = BORDER
  ctx.lineWidth = 1.5
  ctx.stroke()

  // ── Ticks ──
  for (let i = 0; i < 60; i++) {
    const ang = (i * 6 - 90) * (Math.PI / 180)
    const maj = i % 5 === 0
    const outer = R - 1
    const inner = maj ? R - 12 : R - 6
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(ang) * outer, cy + Math.sin(ang) * outer)
    ctx.lineTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner)
    ctx.strokeStyle = maj ? `${accent}bb` : "rgba(0,0,0,0.1)"
    ctx.lineWidth = maj ? 2 : 0.9
    ctx.lineCap = "round"
    ctx.stroke()
  }

  // ── Hour dots ──
  for (let i = 0; i < 12; i++) {
    const ang = (i * 30 - 90) * (Math.PI / 180)
    const dr = R - 20
    ctx.beginPath()
    ctx.arc(cx + Math.cos(ang) * dr, cy + Math.sin(ang) * dr, i === 0 ? 3 : 1.8, 0, Math.PI * 2)
    ctx.fillStyle = i === 0 ? accent : "rgba(0,0,0,0.18)"
    ctx.fill()
  }

  // ── Hands ──
  const { h, m, s } = getHMS(tz)
  const hDeg = (h % 12) * 30 + m * 0.5 - 90
  const mDeg = m * 6 + s * 0.1 - 90
  const sDeg = s * 6 - 90

  const drawHand = (
    deg: number, len: number, w: number,
    color: string, tail = 0.16, glow = false
  ) => {
    const rad = deg * (Math.PI / 180)
    ctx.save()
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 7 }
    ctx.beginPath()
    ctx.moveTo(cx - Math.cos(rad) * (len * tail), cy - Math.sin(rad) * (len * tail))
    ctx.lineTo(cx + Math.cos(rad) * len, cy + Math.sin(rad) * len)
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.restore()
  }

  // Hour — thick warm dark
  drawHand(hDeg, R * 0.5, 4.5, TEXT_DARK, 0.18)
  // Minute — medium
  drawHand(mDeg, R * 0.65, 3, TEXT_MID, 0.16)
  // Second — accent color, glow
  drawHand(sDeg, R * 0.75, 1.5, accent, 0.22, true)

  // ── Center cap ──
  ctx.beginPath()
  ctx.arc(cx, cy, 6.5, 0, Math.PI * 2)
  ctx.fillStyle = "#fff"
  ctx.shadowColor = "rgba(0,0,0,0.15)"
  ctx.shadowBlur = 4
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.beginPath()
  ctx.arc(cx, cy, 4, 0, Math.PI * 2)
  ctx.fillStyle = accent
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy, 1.8, 0, Math.PI * 2)
  ctx.fillStyle = "#fff"
  ctx.fill()
}

// ─── Clock Component ──────────────────────────────────────────────────────────
const AnalogClock: FC<{ tz: string; accent: string; size?: number }> = ({
  tz, accent, size = 164,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const draw = () => { if (ref.current) drawClock(ref.current, tz, accent) }
    draw()
    const id = setInterval(draw, 1000)
    return () => clearInterval(id)
  }, [tz, accent])
  return (
    <canvas ref={ref}
      style={{ width: size, height: size, borderRadius: "50%", display: "block" }} />
  )
}

// ─── Decorative Arc (card bg accent) ─────────────────────────────────────────
const ArcBlob: FC<{ accent: string; visible: boolean }> = ({ accent, visible }) => (
  <motion.div
    animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "absolute", bottom: -40, right: -40,
      width: 180, height: 180, borderRadius: "50%",
      background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)`,
      pointerEvents: "none",
    }}
  />
)

// ─── Branch Card ──────────────────────────────────────────────────────────────
const BranchCard: FC<{ branch: Branch }> = ({ branch }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 52, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: branch.idx * 0.11, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: 26,
        overflow: "hidden",
        background: BG_CARD,
        border: `1.5px solid ${hov ? `${branch.accent}40` : BORDER}`,
        boxShadow: hov
          ? `0 28px 56px rgba(236,91,19,0.12), 0 4px 16px rgba(0,0,0,0.06)`
          : "0 4px 20px rgba(0,0,0,0.05)",
        cursor: "default",
        transition: "border-color 0.35s, box-shadow 0.35s",
      }}
    >
      {/* Top bar — sweeps on hover */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${branch.accent} 40%, ${branch.accent}66 100%)`,
          transformOrigin: "left",
        }}
      />

      {/* Ambient blob */}
      <ArcBlob accent={branch.accent} visible={hov} />

      <div style={{ position: "relative", zIndex: 1, padding: "26px 24px 28px", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* ── Country + Flag ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: TEXT_SOFT,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {branch.country}
          </span>

          {/* Flag */}
          <motion.div
            animate={{ scale: hov ? 1.07 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              width: 40, height: 26, borderRadius: 6, overflow: "hidden",
              border: `1px solid ${BORDER}`,
              boxShadow: hov ? `0 4px 12px ${branch.accent}30` : "0 2px 8px rgba(0,0,0,0.08)",
              flexShrink: 0, transition: "box-shadow 0.35s",
            }}
          >
            <img src={branch.flag} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </motion.div>
        </div>

        {/* ── City name ── */}
        <div style={{
          fontSize: "clamp(22px, 2.6vw, 27px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: TEXT_DARK,
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          {branch.city}
        </div>

        {/* ── Thin rule ── */}
        <div style={{
          width: "100%", height: 1,
          background: `linear-gradient(90deg, ${branch.accent}30, transparent)`,
          marginBottom: 20,
        }} />

        {/* ── Clock ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <motion.div
            animate={{ scale: hov ? 1.04 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: "50%",
              boxShadow: hov
                ? `0 8px 32px ${branch.accent}28, 0 2px 8px rgba(0,0,0,0.06)`
                : "0 2px 12px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.4s",
            }}
          >
            <AnalogClock tz={branch.tz} accent={branch.accent} size={152} />
          </motion.div>
        </div>

        {/* ── Live indicator ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 18, justifyContent: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.55, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: branch.accent,
              boxShadow: `0 0 7px ${branch.accent}99`,
            }}
          />
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: branch.accent,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Live
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: "center", marginBottom: 56 }}
    >
      {/* Label + decorative lines */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 32, height: 2, background: `linear-gradient(90deg,transparent,${PRIMARY})`, borderRadius: 2, transformOrigin: "right" }}
        />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: PRIMARY, fontFamily: "'DM Sans',sans-serif" }}>
          Our Footprint
        </span>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 32, height: 2, background: `linear-gradient(90deg,${PRIMARY},transparent)`, borderRadius: 2, transformOrigin: "left" }}
        />
      </div>

      {/* Headline */}
      <h2 style={{
        fontSize: "clamp(32px, 5.5vw, 56px)",
        fontWeight: 800,
        letterSpacing: "-0.045em",
        color: TEXT_DARK,
        lineHeight: 1.0,
        marginBottom: 14,
      }}>
        Global{" "}
        <span style={{
          background: `linear-gradient(135deg, ${PRIMARY} 0%, #ff8c5a 60%, #ffb599 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Presence
        </span>
      </h2>

      <p style={{
        fontSize: 14, color: TEXT_MID, lineHeight: 1.72,
        maxWidth: 400, margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Local expertise. Unified intelligence. Four continents, one vision.
      </p>
    </motion.div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function GlobalPresence() {
  return (
    <section style={{
      background: BG_LIGHT,
      minHeight: "100vh",
      padding: "80px 24px",
      fontFamily: " sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style> */}

      {/* Dot grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(236,91,19,0.07) 1.5px, transparent 0)`,
        backgroundSize: "38px 38px",
      }} />

      {/* Warm corner glows */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,${PRIMARY}0e 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))",
          gap: 20,
        }}>
          {BRANCHES.map(b => <BranchCard key={b.city} branch={b} />)}
        </div>
      </div>
    </section>
  )
}