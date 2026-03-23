// KineticBlog.jsx
// npm install framer-motion
// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

import { useRef, useState, useEffect } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion"

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
    primary: "#ec5b13",
    primaryDark: "#c44a0a",
    primaryLight: "#ff7a3d",
    primaryGlow: "rgba(236,91,19,0.14)",
    primaryGlowSm: "rgba(236,91,19,0.07)",
    bg: "#f8f6f6",
    bgCard: "#ffffff",
    bgMuted: "#f2efef",
    bgDeep: "#ede9e9",
    bgDark: "#1c110b",
    bgDarkCard: "#251913",
    bgDarkHigh: "#291d17",
    text: "#1b1b1d",
    textMuted: "#6b6560",
    textLight: "#9e9792",
    border: "rgba(0,0,0,0.07)",
    borderOrange: "rgba(236,91,19,0.22)",
    onDark: "#f6ded3",
    onDarkMuted: "rgba(246,222,211,0.55)",
}

// ─── Helpers ────────────────────────────────────────────────────────────────────
const fadeUp: any = {
    hidden: { opacity: 0, y: 36 },
    show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.68, delay: d, ease: [0.16, 1, 0.3, 1] } }),
}

function useViewAnim() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return { ref, inView }
}

const Icon = ({ name, size = 22, color, style = {} }: any) => (
    <span className="material-symbols-outlined" style={{ fontSize: size, color, lineHeight: 1, ...style }}>{name}</span>
)

// ─── Scroll Progress ─────────────────────────────────────────────────────────────
function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 })
    return (
        <motion.div style={{
            position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200,
            background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`,
            scaleX, transformOrigin: "left",
        }} />
    )
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────────
function CursorGlow() {
    const x = useMotionValue(-400); const y = useMotionValue(-400)
    const sx = useSpring(x, { damping: 24, stiffness: 150 })
    const sy = useSpring(y, { damping: 24, stiffness: 150 })
    useEffect(() => {
        const fn = (e: any) => { x.set(e.clientX); y.set(e.clientY) }
        window.addEventListener("mousemove", fn)
        return () => window.removeEventListener("mousemove", fn)
    }, [])
    return (
        <motion.div style={{
            position: "fixed", zIndex: 9998, pointerEvents: "none",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,91,19,0.05) 0%, transparent 70%)",
            left: sx, top: sy, translateX: "-50%", translateY: "-50%",
        }} />
    )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────────
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24)
        window.addEventListener("scroll", fn)
        return () => window.removeEventListener("scroll", fn)
    }, [])

    return (
        <motion.nav
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "sticky", top: 0, width: "100%", zIndex: 100,
                background: scrolled ? "rgba(28,17,11,0.95)" : "rgba(28,17,11,0.82)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                borderBottom: scrolled ? "1px solid rgba(255,181,153,0.15)" : "1px solid transparent",
                boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
                transition: "background 0.3s, box-shadow 0.3s",
            }}
        >
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <motion.div whileHover={{ scale: 1.04 }} style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 900, letterSpacing: "-0.06em", color: C.primary, cursor: "pointer" }}>
                    KINETIC
                </motion.div>
                <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
                    {["Work", "Services", "Insights", "About", "Careers"].map((l, i) => (
                        <motion.a key={l} href="#"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * i + 0.1 }}
                            whileHover={{ color: "#fff" }}
                            style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: l === "Insights" ? C.primary : "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s", fontFamily: "'Syne',sans-serif", borderBottom: l === "Insights" ? `2px solid ${C.primary}` : "none", paddingBottom: l === "Insights" ? 3 : 0 }}
                        >
                            {l}
                        </motion.a>
                    ))}
                </div>
                <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${C.primaryGlow}` }} whileTap={{ scale: 0.95 }}
                    style={{ padding: "10px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "'Syne',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Get in Touch
                </motion.button>
            </div>
        </motion.nav>
    )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────────
function Hero() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 400], [0, -50])
    const opacity = useTransform(scrollY, [0, 350], [1, 0.3])

    return (
        <header style={{ padding: "80px 40px 60px", maxWidth: 1440, margin: "0 auto", position: "relative", overflow: "hidden" }}>
            {/* Grid texture */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", backgroundImage: `linear-gradient(${C.primary} 1px,transparent 1px),linear-gradient(90deg,${C.primary} 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />
            {/* Orange glow */}
            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", right: "5%", top: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.primaryGlow}, transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />

            <motion.div style={{ y, opacity }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: `rgba(236,91,19,0.1)`, border: `1px solid ${C.borderOrange}`, marginBottom: 20 }}>
                    <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: C.primary, fontFamily: "'Syne',sans-serif" }}>Insights & Intelligence</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(52px,8vw,96px)", fontWeight: 900, letterSpacing: "-0.07em", lineHeight: 0.9, color: C.text, marginBottom: 20 }}>
                    OUR{" "}
                    <span style={{ color: C.primary, position: "relative", display: "inline-block" }}>
                        BLOG
                        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: "absolute", bottom: 6, left: 0, right: 0, height: 5, background: `linear-gradient(90deg,${C.primary},transparent)`, transformOrigin: "left", borderRadius: 4 }} />
                    </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    style={{ fontSize: "clamp(16px,2vw,22px)", color: C.textMuted, maxWidth: 600, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.65, fontWeight: 300 }}>
                    Insights, tips, and trends from the frontier of digital intelligence and engineered design.
                </motion.p>
            </motion.div>
        </header>
    )
}

// ─── Featured Post ────────────────────────────────────────────────────────────────
function FeaturedPost() {
    const { ref, inView } = useViewAnim()
    return (
        <section ref={ref} style={{ padding: "0 40px 80px", maxWidth: 1440, margin: "0 auto" }}>
            <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", borderRadius: 20, background: C.bgDarkCard, boxShadow: `0 32px 80px rgba(0,0,0,0.18)`, border: "1px solid rgba(255,181,153,0.08)", position: "relative", cursor: "pointer" }}
                whileHover={{ boxShadow: `0 40px 100px rgba(236,91,19,0.1)` }}
            >
                {/* Image side */}
                <div style={{ position: "relative", overflow: "hidden", minHeight: 380 }}>
                    <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbhONy7V35CU8GBntPv90loWv0Zv9v_yf-qSauz-RkbiVH3I2NmeRn2I9GEBZFX3R7SUaD3AVdD6On9yh-neTqWd9znLvCHU2HnG1y5eskuAlS-lJlff3f4R_aNVdPXXYAVK1zQo93nOHqDSA6ITVQv7G4gR-5yNtKyAD2c87FZY2vG1qO6Vb3zOniZTjUm1C5nDJKka1LxSYrBjOMBLU_vGWw_kpj2vQZsIV1FphvEpIfGIp4ug3opICDMVRtjyhtWFRk9QGzGDI"
                        alt="Neural network" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(37,25,19,0.3))" }} />
                    <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.35 }}
                        style={{ position: "absolute", top: 20, left: 20, padding: "6px 16px", background: C.primary, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", borderRadius: 100, fontFamily: "'Syne',sans-serif" }}>
                        Featured Insight
                    </motion.div>
                </div>

                {/* Content side */}
                <div style={{ padding: "48px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary, fontFamily: "'Syne',sans-serif" }}>AI & Machine Learning</span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,181,153,0.3)", display: "inline-block" }} />
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: C.onDarkMuted, fontFamily: "'DM Sans',sans-serif" }}>12 Min Read</span>
                    </motion.div>

                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.onDark, lineHeight: 1.15, marginBottom: 20 }}
                        className="featured-title">
                        The Neural Shift: How Generative Design is Rewriting UI Patterns.
                    </motion.h2>

                    <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.38 }}
                        style={{ fontSize: 15, color: C.onDarkMuted, lineHeight: 1.72, marginBottom: 32, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        Exploration of the convergence between human intuition and machine precision. We dive deep into the algorithms shaping the next decade of digital interfaces.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,181,153,0.2)", flexShrink: 0 }}>
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLgCIDAL_I5GTEoDCVo836z_0dCRGbrj2tUuEtXXrMD9DcXI9X5OeQ61trRe066q8l8fr7lJ4bTp1V06tycwwWviAb6NrlbKdvq3ukfW5vCNjeTcUo6anE5i1SpriIwV-QPgmRgSVpHIR_Zkpud2Qospck5g7qXgM-Q44R7KI3u3VXq5ijj-YpR_zy5749zyb19hrSA7CfGZ0RXo3Jy6PUEIBqvTJD5irWLQNfzZcWVdHiRBjS06-4z8hAAqaZtHp92XDGa5mICVc"
                                    alt="Author" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: C.onDark, fontFamily: "'Syne',sans-serif" }}>Marcus Thorne</div>
                                <div style={{ fontSize: 11, color: C.onDarkMuted }}>Head of R&D • Oct 24, 2024</div>
                            </div>
                        </div>
                        <motion.a href="#" whileHover={{ x: 4 }}
                            style={{ display: "flex", alignItems: "center", gap: 6, color: C.primary, fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Syne',sans-serif" }}>
                            Read More <Icon name="arrow_forward" size={16} color={C.primary} />
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

// ─── Blog Cards Data ──────────────────────────────────────────────────────────────
const posts = [
    { tag: "DevOps", title: "Infrastructure as Fluid: Scaling with Kinetic Clouds.", desc: "Moving beyond static servers to highly adaptive environments that respond to real-time traffic pulses.", author: "Elena Vance", read: "5 min", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9kdmL9_FzkDLymObCYLCJE8Q4JMsHtQ6UfHsVvm4pNAxfgNgBO3YWUSTqBgFWpq5mZHH7rogRdyHeDX6qYhFFqXcC5Gx2511UwMbcS-W-Z3Q60mfLLgXVDiyXAb63prUYxU8YimYaPrF7NgpYpX9nEEHAcIGlu0em4ZTskBYinYIoqL92qLZPUXojmux79RwFfebqf7Z0TxdGXGTj_PRGbAXQD8C9OlOlruzven1JqSsBz6vxehGgTIkQ46s6OFqGYx9Y9S43744" },
    { tag: "UI/UX Design", title: "The Psychology of Micro-Interactions in SaaS.", desc: "Why the smallest digital responses trigger the largest user retention gains.", author: "Sarah Chen", read: "8 min", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7yDjlv9ca-BIzG6W4vCG50hbQR98Bta-Ru3Z1ewexyEI1WXZvNrAsoQ25uA2He-sFYJ-1sueQ7mdFOHUkRGz1To0rACbdZbXCJc2UWEDTgnJ3g78oJVYS5FhH31OYH8_tYY8be1FNLsDnUnUYTn1XhqYZliW0ALPlpbhEI4qR3odG764nV4S0gMF4RQzdZxUp5GOtCp-fxgm30m-C4jekiQYbWeGfAPJ1CJpQpTO27Lvr7RAIyADVAF9TIrNub4v7rRe8J99TktY" },
    { tag: "SEO & Marketing", title: "Algorithm Proofing: Content in the AI Search Era.", desc: "Strategies for maintaining visibility as search engines transition to answer engines.", author: "David K.", read: "10 min", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJG8okztRnaNcX8tSnIbEh9gLFHdi5S4tbannL-ACJnAw0nBpo89Z9bGjmnkQUQ3X20cxBHZ4czmMxK5-dy8SjptcnkkAqKwcV7k8LwP68R-oHDqJMYbyagQqudF2ZWvJhg9EbOuosPuy-RXQqilncHWMbSUyG5X6DP5yeCr5LytcCCs-HN2xoQrPPjMNpZscfXcUOXAZsg-l1tAscImTHiKuJ87j6UGem4XFhXn6nBUyfsG9ebOASNojx41qA8KTVqEF3yfQ8yqY" },
    { tag: "Development", title: "Rust vs Go: Choosing Your Engine for 2025.", desc: "A performance-first breakdown of the industry's most robust backend languages.", author: "Julian Frost", read: "15 min", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3lm5__4CRsvr_mqEn3H2FzANtKToR8Ov9q50e2bDNXQqgxRHk4LJ0_3IZwuuGDlQAuW19Ya4pGzNhjKUpqPtWRoubQVyL7GPIka96ibBHxVAIfqJkwaEm6UFBHqRfXJ20BbeRBMX9KvVroJ4gYUxV-6Eo7gsjoGGc9vdTXSkU5TFDhOmcHSv1gNlXWU2S8eBI9E8fexSA2XVMFdcAlwGgt7gJWQPrHc9Y7W5M0NhdrXyY2ZiJeEdugotVUqnNDl7RhPZ9NGgFuQw" },
]

// ─── Blog Card ────────────────────────────────────────────────────────────────────
function BlogCard({ post, index, inView }: any) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.68, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -10, boxShadow: `0 24px 60px rgba(236,91,19,0.1), 0 0 0 1.5px ${C.borderOrange}` }}
            style={{ background: C.bgCard, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.05)", transition: "box-shadow 0.3s", cursor: "pointer" }}
        >
            <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <motion.img animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.7 }}
                    src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
                    style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(236,91,19,0.25), transparent)` }} />
                {/* Tag pill */}
                <motion.div animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }} transition={{ duration: 0.3 }}
                    style={{ position: "absolute", bottom: 14, left: 16, padding: "4px 12px", background: C.primary, color: "#fff", fontSize: 9, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: 100, fontFamily: "'Syne',sans-serif" }}>
                    {post.tag}
                </motion.div>
            </div>
            <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: C.primary, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>{post.tag}</span>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em", color: hovered ? C.primary : C.text, lineHeight: 1.25, marginBottom: 10, transition: "color 0.3s" }}>
                    {post.title}
                </h3>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.68, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, marginBottom: 20, flex: 1 }}>{post.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.textLight, fontFamily: "'DM Sans',sans-serif" }}>{post.author} • {post.read} read</span>
                    <motion.a href="#" whileHover={{ x: 3 }} style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary, textDecoration: "none", fontFamily: "'Syne',sans-serif" }}>
                        Read →
                    </motion.a>
                </div>
            </div>
        </motion.article>
    )
}

// ─── Filter Bar ────────────────────────────────────────────────────────────────────
const filters = ["All", "Development", "UI/UX Design", "AI/ML"]
function FilterBar({ active, setActive }: any) {
    return (
        <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {filters.map(f => (
                <motion.button key={f} onClick={() => setActive(f)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    style={{ padding: "9px 20px", borderRadius: 100, background: active === f ? C.primary : C.bgMuted, color: active === f ? "#fff" : C.textMuted, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", transition: "background 0.25s, color 0.25s", boxShadow: active === f ? `0 4px 16px ${C.primaryGlow}` : "none" }}>
                    {f}
                </motion.button>
            ))}
        </motion.div>
    )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────────
const categories = [
    { label: "Engineering", count: "14" },
    { label: "Creative Strategy", count: "09" },
    { label: "AI Research", count: "21" },
    { label: "Culture", count: "05" },
]
const tags = ["#web3", "#future_ui", "#ethics_ai", "#react_v19", "#hyper_growth"]

function Sidebar() {
    const { ref, inView } = useViewAnim()
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    return (
        <motion.aside ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Search */}
            <motion.div whileHover={{ boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}
                style={{ background: C.bgCard, padding: "24px 24px", borderRadius: 18, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 14 }}>Search Knowledge</div>
                <div style={{ position: "relative" }}>
                    <input type="text" placeholder="Keywords..."
                        style={{ width: "100%", background: C.bgMuted, border: "none", borderRadius: 10, padding: "11px 40px 11px 14px", fontSize: 13, color: C.text, fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
                    <Icon name="search" size={18} color={C.primary} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }} />
                </div>
            </motion.div>

            {/* Categories */}
            <motion.div whileHover={{ boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}
                style={{ background: C.bgCard, padding: "24px", borderRadius: 18, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 16 }}>Taxonomy</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {categories.map((c, i) => (
                        <motion.li key={c.label}
                            initial={{ opacity: 0, x: -14 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}
                            whileHover={{ x: 4 }}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                            <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s" }}
                                onMouseEnter={(e: any) => e.target.style.color = C.primary}
                                onMouseLeave={(e: any) => e.target.style.color = C.textMuted}>
                                {c.label}
                            </span>
                            <span style={{ fontSize: 9, fontWeight: 800, background: C.bgMuted, padding: "2px 8px", borderRadius: 4, color: C.primary, fontFamily: "'Syne',sans-serif" }}>{c.count}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Tags */}
            <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 14 }}>Popular Nodes</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {tags.map((t, i) => (
                        <motion.span key={t}
                            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
                            whileHover={{ background: C.primary, color: "#fff", scale: 1.04 }}
                            style={{ padding: "6px 12px", background: C.bgMuted, borderRadius: 100, fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", color: C.textMuted, cursor: "pointer", transition: "background 0.2s, color 0.2s", fontFamily: "'Syne',sans-serif" }}>
                            {t}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <motion.div whileHover={{ boxShadow: `0 16px 48px rgba(236,91,19,0.2)` }}
                style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, padding: "28px 24px", borderRadius: 18 }}>
                <div style={{ position: "absolute", bottom: -24, right: -24, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(16px)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>Sync Your Neural Feed</h4>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 18, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, lineHeight: 1.6 }}>Get engineered insights delivered weekly. No noise, just signals.</p>
                    <AnimatePresence mode="wait">
                        {subscribed ? (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px", textAlign: "center", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>
                                ✅ You're subscribed!
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={e => { e.preventDefault(); setSubscribed(true) }} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@kinetic.io"
                                    style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "11px 14px", fontSize: 13, color: "#fff", fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
                                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    style={{ width: "100%", background: "#fff", color: C.primary, border: "none", borderRadius: 10, padding: "12px", fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>
                                    Subscribe
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.aside>
    )
}

// ─── Main Content ─────────────────────────────────────────────────────────────────
function MainContent() {
    const { ref, inView } = useViewAnim()
    const [activeFilter, setActiveFilter] = useState("All")
    const [sortValue, setSortValue] = useState("Latest")
    const [showAll, setShowAll] = useState(false)

    const displayed = showAll ? posts : posts.slice(0, 4)

    return (
        <div style={{ flex: 1 }}>
            {/* Filter bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
                <FilterBar active={activeFilter} setActive={setActiveFilter} />
                <div style={{ position: "relative" }}>
                    <select value={sortValue} onChange={e => setSortValue(e.target.value)}
                        style={{ appearance: "none", background: C.bgMuted, border: "none", borderRadius: 100, padding: "9px 36px 9px 18px", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.text, cursor: "pointer", fontFamily: "'Syne',sans-serif", outline: "none" }}>
                        <option>Latest</option>
                        <option>Popular</option>
                        <option>Trending</option>
                    </select>
                    <Icon name="expand_more" size={16} color={C.textMuted} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                </div>
            </div>

            {/* Grid */}
            <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {displayed.map((post, i) => (
                    <BlogCard key={post.title} post={post} index={i} inView={inView} />
                ))}
            </div>

            {/* Load more */}
            <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
                <motion.button
                    onClick={() => setShowAll(!showAll)}
                    whileHover={{ background: C.primary, color: "#fff", borderColor: C.primary, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ padding: "14px 44px", borderRadius: 12, border: `1.5px solid ${C.borderOrange}`, color: C.primary, fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", cursor: "pointer", fontFamily: "'Syne',sans-serif", transition: "background 0.25s, color 0.25s, border 0.25s" }}>
                    {showAll ? "Show Less" : "Load More Insights"}
                </motion.button>
            </div>
        </div>
    )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────────
function BottomCTA() {
    const { ref, inView } = useViewAnim()
    return (
        <section style={{ padding: "0 40px 80px", maxWidth: 1440, margin: "0 auto" }}>
            <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                style={{ background: C.bgDarkCard, padding: "64px 56px", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", border: "1px solid rgba(255,181,153,0.08)", position: "relative", overflow: "hidden" }}>
                {/* Ambient glow */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: `radial-gradient(ellipse, ${C.primaryGlow}, transparent 70%)`, pointerEvents: "none" }} />
                <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
                    style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, letterSpacing: "-0.05em", color: C.onDark, marginBottom: 16, position: "relative" }}>
                    Need Help With Your <span style={{ color: C.primary }}>Project?</span>
                </motion.h2>
                <motion.p variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.1}
                    style={{ fontSize: 16, color: C.onDarkMuted, maxWidth: 500, marginBottom: 40, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, lineHeight: 1.65, position: "relative" }}>
                    Our engineering team is ready to help you build the future of your digital ecosystem.
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} custom={0.2}
                    style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
                    <motion.button whileHover={{ scale: 1.05, boxShadow: `0 16px 40px rgba(236,91,19,0.3)` }} whileTap={{ scale: 0.95 }}
                        style={{ padding: "14px 36px", background: C.primary, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "'Syne',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Hire Experts
                    </motion.button>
                    <motion.button whileHover={{ background: "rgba(255,181,153,0.08)", scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        style={{ padding: "14px 36px", background: "rgba(64,50,43,0.5)", backdropFilter: "blur(12px)", border: "0.5px solid rgba(255,181,153,0.2)", color: C.onDark, borderRadius: 12, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "'Syne',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}>
                        Contact Us
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    )
}

// ─── Footer ───────────────────────────────────────────────────────────────────────
function Footer() {
    const footerLinks = ["Privacy", "Terms", "LinkedIn", "Instagram"]
    return (
        <footer style={{ background: C.bgDark, borderTop: "0.5px solid rgba(255,181,153,0.18)" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: "-0.06em", color: C.primary, marginBottom: 16 }}>KINETIC</div>
                    <p style={{ fontSize: 14, color: C.onDarkMuted, maxWidth: 320, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                        Engineering intelligence for the digital elite. We design systems that breathe, move, and evolve.
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
                    <nav style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "flex-end" }}>
                        {footerLinks.map(l => (
                            <motion.a key={l} href="#" whileHover={{ color: C.primary, x: 3 }}
                                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.onDarkMuted, textDecoration: "none", fontFamily: "'Syne',sans-serif", transition: "color 0.2s" }}>
                                {l}
                            </motion.a>
                        ))}
                    </nav>
                    <p style={{ fontSize: 10, color: "rgba(246,222,211,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
                        © 2024 KINETIC AGENCY. ENGINEERED FOR INTELLIGENCE.
                    </p>
                </div>
            </div>
        </footer>
    )
}

// ─── App ──────────────────────────────────────────────────────────────────────────
export default function KineticBlog() {
    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(236,91,19,0.2); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f8f6f6; }
        ::-webkit-scrollbar-thumb { background: #ec5b13; border-radius: 3px; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          display: inline-block; line-height: 1; vertical-align: middle;
        }
        .featured-title:hover { color: #ec5b13 !important; transition: color 0.3s; }
        @media(max-width:900px){ .blog-layout { flex-direction: column !important; } }
      `}</style>

            <ScrollProgress />
            <CursorGlow />
            <Navbar />

            <main>
                <Hero />
                <FeaturedPost />

                {/* Main 2-col layout */}
                <div className="blog-layout" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px", display: "flex", gap: 48, alignItems: "flex-start" }}>
                    <MainContent />
                    <Sidebar />
                </div>
            </main>

            <BottomCTA />
            <Footer />
        </div>
    )
}