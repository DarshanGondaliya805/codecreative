<<<<<<< HEAD
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C:any = {
  bg: "#fffbf8",
  bgAlt: "#fff7f3",
  bgCard: "#ffffff",
  orange: "#f5611b",
  orangeLight: "#ffb599",
  orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1",
  text: "#1c0d05",
  muted: "#7a5a48",
  border: "rgba(245,97,27,0.15)",
  grad: "linear-gradient(135deg,#ffb599 0%,#f5611b 100%)",
};

const glass:any = {
  background: "rgba(255,181,153,0.13)",
  backdropFilter: "blur(18px)",
  border: `1px solid ${C.border}`,
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 38 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, style = {}, variants = fadeUp, custom = 0 }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style}>
      {children}
    </motion.div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 80, background: C.bg, overflow: "hidden" }}>
      {/* Blobs */}
      <motion.div style={{ y: blobY1, position: "absolute", top: "-8%", left: "-12%", width: "44%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,97,27,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <motion.div style={{ y: blobY2, position: "absolute", bottom: "-8%", right: "-12%", width: "38%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,149,241,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 10 }} className="na3-hero-grid">

        {/* LEFT */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.07)", border: `1px solid rgba(245,97,27,0.2)`, marginBottom: 28 }}>
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: C.grad, display: "block", boxShadow: "0 0 8px #ffb599" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase" }}>Next-Gen Digital Experiences</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.4rem,4.5vw,4.2rem)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Creative Web Design{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ background: `linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              That Engages
            </motion.span>{" "}and Converts
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color: C.muted, fontSize: 17, maxWidth: 500, marginBottom: 40, lineHeight: 1.8, fontWeight: 300 }}>
            We engineer high-performance digital interfaces that blend aesthetic sophistication with technical precision. Elevate your brand with neural-centric design.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: C.grad, color: "#370e00", padding: "16px 30px", borderRadius: 16, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(245,97,27,0.3)" }}>
              Start Your Website Design
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, background: "rgba(245,97,27,0.07)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(245,97,27,0.04)", color: C.text, padding: "16px 30px", borderRadius: 16, fontWeight: 600, fontSize: 15, border: `1.5px solid rgba(245,97,27,0.2)`, cursor: "pointer" }}>
              View Our Portfolio
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT – floating mock grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="na3-hero-right">
          {/* Col 1 */}
          <div style={{ paddingTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal variants={scaleIn} custom={2}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAt06_Fni46uN3dZVImyiVxCWRkMT9RShZgAh6Xe3yWIz-UL3PosBK0tNRMpJJI5qFQqTKI9MuHWvnbM4s9BN2jhpeutJwmAWNKmd1hdWXfV2wSPCntx9nInD74EiG8p_inUjQtVrZEtVr4X_m9Uaj-CiCMsE7_oPfkO1FGVUiZN9qKiFB2maU8DTZjws91GQ2oU51I67PBYiTNQQ1ohL_y_dhPrs8EFbqqvhAS-MZA3DG_CGOuswwsNNhA4XHyuBXhQfN9kPHIAY"
                  alt="UI layout" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, opacity: 0.85, marginBottom: 12 }} />
                <div style={{ height: 6, width: "66%", background: "rgba(245,97,27,0.15)", borderRadius: 9999, marginBottom: 6 }} />
                <div style={{ height: 6, width: "45%", background: "rgba(245,97,27,0.1)", borderRadius: 9999 }} />
              </motion.div>
            </Reveal>
            <Reveal variants={scaleIn} custom={3}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245,97,27,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 18 }}>grid_view</span>
                  </div>
                  <div>
                    <div style={{ height: 6, width: 56, background: "rgba(245,97,27,0.15)", borderRadius: 9999, marginBottom: 5 }} />
                    <div style={{ height: 6, width: 36, background: "rgba(245,97,27,0.1)", borderRadius: 9999 }} />
                  </div>
                </div>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ width: "100%", height: 80, background: "rgba(245,97,27,0.06)", borderRadius: 12, border: `1px solid rgba(245,97,27,0.12)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "rgba(245,97,27,0.3)", fontSize: 28 }}>bar_chart</span>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal variants={scaleIn} custom={4}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex" }}>
                    {["rgba(245,97,27,0.3)", "rgba(245,97,27,0.5)", "rgba(27,149,241,0.4)"].map((bg, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: bg, border: "2px solid #fffbf8", marginLeft: i === 0 ? 0 : -8 }} />
                    ))}
                  </div>
                  <motion.span whileHover={{ scale: 1.2, color: C.orange }}
                    className="material-symbols-outlined" style={{ color: C.orange, fontSize: 18 }}>add_circle</motion.span>
                </div>
                <div style={{ height: 120, background: "rgba(245,97,27,0.05)", borderRadius: 12, border: `1px solid rgba(245,97,27,0.1)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "rgba(245,97,27,0.3)", fontSize: 40 }}>web</span>
                </div>
              </motion.div>
            </Reveal>
            <Reveal variants={scaleIn} custom={5}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 16px 32px rgba(245,97,27,0.25)" }}
                style={{ background: C.grad, borderRadius: 20, padding: 24, boxShadow: "0 8px 24px rgba(245,97,27,0.3)" }}>
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 32, display: "block", marginBottom: 8 }}>bolt</motion.span>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: "#370e00" }}>Fast Lane Optimization</div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. SERVICES GRID ─────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "brush", title: "Custom Website Design", desc: "Unique layouts and visuals designed from the ground up to reflect your brand's DNA." },
  { icon: "devices", title: "Responsive Web Design", desc: "Fluid experiences that adapt seamlessly to smartphones, tablets, and massive desktops." },
  { icon: "rocket_launch", title: "Landing Page Design", desc: "High-conversion pages optimized for marketing campaigns and product launches." },
  { icon: "corporate_fare", title: "Corporate Website Design", desc: "Professional, authoritative digital presences for established organizations." },
  { icon: "shopping_cart", title: "E-Commerce Design", desc: "User-centric shopping experiences built to drive sales and reduce friction." },
  { icon: "auto_fix_high", title: "Website Redesign", desc: "Breathe new life into aging platforms with modern UX and refreshed aesthetics." },
  { icon: "account_circle", title: "Portfolio Website Design", desc: "Digital galleries that showcase your work with elegance and narrative flow." },
  { icon: "gesture", title: "UI/UX Website Design", desc: "Deep focus on user psychology and behavioral patterns for maximum engagement." },
];

function Services() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, marginBottom: 16 }}>Our Web Design Specialties</h2>
            <p style={{ color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
              High-performance digital products tailored for the specific needs of modern enterprises and visionary startups.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="na3-services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i % 4} style={{ height: "100%" }}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(245,97,27,0.1)" }}
                style={{ background: C.bgCard, borderRadius: 28, padding: 32, height: "100%", border: `1.5px solid rgba(245,97,27,0.1)`, overflow: "hidden", position: "relative", boxSizing: "border-box" }}>
                <motion.span whileHover={{ scale: 1.15, color: C.orange }}
                  className="material-symbols-outlined"
                  style={{ fontSize: 36, color: C.orange, display: "block", marginBottom: 20 }}>
                  {s.icon}
                </motion.span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: C.text, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                {/* Underline reveal */}
                <motion.div initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 2, background: C.grad, borderRadius: 9999 }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. DESIGN PROCESS ────────────────────────────────────────────────────────
const STEPS = [
  { icon: "analytics", label: "Requirement Analysis", desc: "Defining goals and scope." },
  { icon: "search_insights", label: "Research & Planning", desc: "Competitor & user audits." },
  { icon: "account_tree", label: "Wireframing", desc: "Low-fidelity skeletal design." },
  { icon: "palette", label: "UI Design", desc: "Applying brand & aesthetics." },
  { icon: "dynamic_form", label: "Prototype & Feedback", desc: "Iterative testing phase." },
  { icon: "verified", label: "Final Delivery", desc: "Launch and hand-off.", highlight: true },
];

function DesignProcess() {
  return (
    <section style={{ padding: "96px 0", background: C.bg, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 80 }}>Our Design Framework</h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <Reveal>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", top: 40, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(245,97,27,0.25), rgba(245,97,27,0.5), rgba(245,97,27,0.25), transparent)`, transformOrigin: "left", zIndex: 0 }}
              className="na3-process-line" />
          </Reveal>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 1 }} className="na3-steps">
            {STEPS.map((step, i) => (
              <Reveal key={step.label} variants={fadeUp} custom={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.12, background: step.highlight ? C.grad : C.grad, boxShadow: "0 12px 28px rgba(245,97,27,0.3)" }}
                  style={{
                    width: 76, height: 76, borderRadius: 20,
                    background: step.highlight ? C.grad : C.bgCard,
                    border: step.highlight ? "none" : `1.5px solid rgba(245,97,27,0.25)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, transition: "background 0.3s",
                    boxShadow: step.highlight ? "0 8px 24px rgba(245,97,27,0.35)" : "0 4px 12px rgba(245,97,27,0.08)",
                  }}>
                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="material-symbols-outlined"
                    style={{ color: step.highlight ? "#370e00" : C.orange, fontSize: 28 }}>
                    {step.icon}
                  </motion.span>
                </motion.div>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 6 }}>{step.label}</h4>
                <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. TOOLS ─────────────────────────────────────────────────────────────────
const TOOLS = [
  { icon: "design_services", name: "Figma" },
  { icon: "layers", name: "Adobe XD" },
  { icon: "draw", name: "Sketch" },
  { icon: "photo_camera", name: "Photoshop" },
  { icon: "format_shapes", name: "Illustrator" },
  { icon: "web_asset", name: "Framer" },
];

function Tools() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }} className="na3-tools-wrap">
          {/* Text */}
          <Reveal style={{ flex: "0 0 300px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.4rem)", fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>Engineered with Top-Tier Tooling</h2>
            <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 14 }}>We utilize industry-leading design systems and prototyping software to ensure our output is pixel-perfect and dev-ready.</p>
          </Reveal>

          {/* Grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="na3-tools-grid">
            {TOOLS.map((t, i) => (
              <Reveal key={t.name} variants={scaleIn} custom={i}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(245,97,27,0.45)", boxShadow: "0 16px 32px rgba(245,97,27,0.12)" }}
                  style={{ height: 110, ...glass, background: C.bgCard, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, cursor: "default", transition: "border-color 0.3s" }}>
                  <motion.div whileHover={{ scale: 1.15, background: C.grad }}
                    style={{ width: 42, height: 42, background: C.orangeFaint, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 22 }}>{t.icon}</span>
                  </motion.div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: C.text, fontSize: 14 }}>{t.name}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. WHY CHOOSE US ─────────────────────────────────────────────────────────
const ADVANTAGES = [
  { title: "Modern & Creative Designs", desc: "Pushing boundaries with avant-garde layouts and bespoke visual elements." },
  { title: "Mobile-Responsive Layouts", desc: "Seamless performance on every device screen, from 4K monitors to handhelds." },
  { title: "SEO-Friendly Structure", desc: "Code architected for maximum visibility and high search engine ranking." },
  { title: "Fast Loading Websites", desc: "Performance-tuned assets ensuring sub-second load times and high Core Web Vitals." },
  { title: "User-Centered Design", desc: "Focusing on the human element to create intuitive, friction-free flows." },
  { title: "Conversion-Focused Layouts", desc: "Strategic call-to-action placement designed to turn visitors into loyal customers." },
];

function WhyUs() {
  return (
    <section style={{ padding: "96px 0", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }} className="na3-why-grid">
        {/* Left */}
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.5rem)", fontWeight: 800, color: C.text, marginBottom: 20, lineHeight: 1.2 }}>The Neural Advantage</h2>
          <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 14, marginBottom: 32 }}>We don't just build sites; we craft digital ecosystems designed to accelerate growth and foster deep user connections.</p>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(245,97,27,0.12)" }}
            style={{ ...glass, background: "rgba(245,97,27,0.05)", borderRadius: 24, padding: 32 }}>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "3rem", fontWeight: 800, color: C.orange, marginBottom: 8 }}>
              98%
            </motion.div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Client satisfaction rate across 150+ successful web deployments.</p>
          </motion.div>
        </Reveal>

        {/* Right grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} variants={fadeUp} custom={i % 2}>
              <motion.div
                whileHover={{ borderColor: C.orange, y: -3 }}
                style={{ background: C.bgAlt, borderRadius: 20, padding: "24px 28px", borderLeft: `4px solid rgba(245,97,27,0.25)`, transition: "border-color 0.3s" }}>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 8 }}>{a.title}</h4>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{a.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. PORTFOLIO ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZvgL7FL1f7ikCG8mx2prh8gcWVNjc6C3vHyLOQIVq6khkkp0dgJD8GOxoyNA9yNcKlAs0oavwlyf9e817KcZSJLWaRBBpwLmZoGnGEPVZ0yUVzLl7j0iGNsXKfFKN-xnFBJG3mBpbpXp0gL2EwJ0axFZvjmc2gvYL2olqFITv-yxqSM0HhcULXNQyeEg_kLHy1RQtcGOR_OINTMOwVdb6sC90wKk6ts75ym5uMzNFyvkqA6teYzUBCtaRTcPB0qsYxHbmHwtgy8",
    title: "Lumina Banking Platform",
    sub: "SaaS / Fintech / UI Design",
    offset: false,
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7v_iAVS0M1YK1Pw5MioNmBl7ySrF9wEpvf4aWIAq5sTDpEUsHJab0NoC9YnpD9wDqflopgINSi66r-yRyuG9Eo5o7tBWJoQStSJuGezH7c7WomAl53tXK2Zw_K7FFKZbmzAeUJ1WR4m5UQrBwKk11rgsUPtoQO7z8oELvzMw_3kJ84nwidu8Qkq6rMWZzWkPSDYDUgXUaojepMCSmWQ9qSKSGlhfO5SLEf-HNbHswiYkojaNZWuHcgcvZ1ymOXB21c9wYvkK5c3I",
    title: "Neural Analytics Hub",
    sub: "Big Data / AI / Visualisation",
    offset: true,
  },
];

function Portfolio() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 64 }}>Digital Gallery</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="na3-portfolio-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} variants={fadeUp} custom={i} style={{ marginTop: p.offset ? 48 : 0 }}>
              <motion.div whileHover={{ y: -6 }} style={{ cursor: "pointer" }}>
                {/* Browser chrome */}
                <div style={{ background: C.bgAlt, padding: 14, borderRadius: "24px 24px 0 0", border: `1px solid rgba(245,97,27,0.12)`, borderBottom: "none" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                    {["#ef4444","#f59e0b","#22c55e"].map((c, j) => (
                      <div key={j} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.5 }} />
                    ))}
                  </div>
                  <div style={{ overflow: "hidden", borderRadius: 14 }}>
                    <motion.img src={p.img} alt={p.title}
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
                      style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </div>
                {/* Caption */}
                <motion.div whileHover={{ borderColor: "rgba(245,97,27,0.35)" }}
                  style={{ ...glass, background: C.bgCard, padding: "20px 28px", borderRadius: "0 0 24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.3s" }}>
                  <div>
                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.text, marginBottom: 4 }}>{p.title}</h4>
                    <p style={{ fontSize: 12, color: C.muted }}>{p.sub}</p>
                  </div>
                  <motion.span whileHover={{ rotate: 45, scale: 1.2 }} transition={{ duration: 0.3 }}
                    className="material-symbols-outlined" style={{ color: C.orange, fontSize: 28 }}>north_east</motion.span>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. TESTIMONIALS ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "Neural Amber completely transformed our online presence. Their design thinking isn't just aesthetic—it's functional and strategic.", name: "Marcus Chen", role: "CEO, Flux Tech", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8oqiX-Yh_Y4BCiOmMLV0vZPRbiBHWjuaa7DQetccBiNGdGNwGz77Gb3sR6ft6lcAo_XfXi7eoccDRzV9Q1bfZ__TPHgyvxEN2GfdTpxdYzQxqInCv7_7rR9eAoeZTp6AnZtf-qxUg-49kNpNi8GtICo4LX_TtIpDNtmMc6wIjZLoNV0f-veuSLNX_tCvbEZWqQka9PeAgPg4aJzqUOONr0KCvj2qiJ5LPfQU1QHGNr3L3pn9P6lYmu19QUaHNn5NHBqDcC0Myyd0", highlight: false },
  { quote: "The attention to detail in their responsive layouts is unmatched. Our mobile conversion rates shot up by 45% after launch.", name: "Sarah Jenkins", role: "Marketing Director, Solis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTMKhU6DcKbXpmrzLZmTQ-qDU-sBqAgbcRfLaAR7XELVlrWHFj8czH0aP-ElTUZgNeYceBrOWwviWkV9Yl6CoeWomrquf5KggL-8-ZmHhGwo06f_Y2bWb16h0_v_AUQ5oe1JlrnqJlpEIuYyJzPj4YNGhoPNtthJo85dtEajnXP6v-gZw1m8jHPlzyr7IhVhLUhnJTCi7DH4iupP69NWBkAsmMyguZci6bpWkcMYHu4Qy3ac_0tu7sLTEWHseUGVKXylm75F2AulQ", highlight: true },
  { quote: "Working with them was a masterclass in collaboration. They actually listened to our needs and delivered beyond our expectations.", name: "David Miller", role: "Founder, Artisan Co", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyUg5KUaiHhXlbWPe0-HMJYpCYkNTMNeNnosgQghZVThR0yNKLHVWfj_9K_G-WKI1V8Qu0caAAPtCAvC315p5uWkz9Q6_W-O5VW5cNq4cpeypqiaXRMhtXNMzoGd3sl85nrf2DkESuDbRpGtm0dqrP7lMtEmn3-hv5Q-nqsK8ztnmoEwXRTH9J9a377OdjjDQmXO3jloKzNqMnBrYVzZxAtoq-S7r_lbFSdVHft6P4Tc648LAcKQ5SNbBr1539DfvczHH-K2jQ3dM", highlight: false },
];

function Testimonials() {
  return (
    <section style={{ padding: "96px 0", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 64 }}>Words from the Field</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="na3-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} variants={scaleIn} custom={i}>
              <motion.div
                whileHover={{ y: -8, boxShadow: t.highlight ? "0 24px 48px rgba(245,97,27,0.2)" : "0 20px 40px rgba(245,97,27,0.1)" }}
                style={{
                  ...glass,
                  background: t.highlight ? "rgba(245,97,27,0.06)" : C.bgCard,
                  borderRadius: 36, padding: 40, position: "relative", overflow: "hidden",
                  border: t.highlight ? `1.5px solid rgba(245,97,27,0.25)` : `1px solid ${C.border}`,
                  height: "100%", boxSizing: "border-box",
                }}>
                <motion.span animate={{ rotate: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity }}
                  className="material-symbols-outlined"
                  style={{ position: "absolute", top: 24, right: 24, fontSize: 72, color: "rgba(245,97,27,0.07)", lineHeight: 1 }}>
                  format_quote
                </motion.span>
                <p style={{ color: C.muted, fontStyle: "italic", lineHeight: 1.8, fontSize: 14, marginBottom: 28, position: "relative", zIndex: 1 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.img} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", filter: "grayscale(30%)" }} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.orange }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. CONTACT ───────────────────────────────────────────────────────────────
function Contact() {
  const inputStyle:any = {
    width: "100%", background: C.bgAlt, border: `1.5px solid rgba(245,97,27,0.15)`,
    borderRadius: 14, padding: "14px 18px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "'Inter',sans-serif",
  };

  const focus = (e:any) => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur = (e:any) => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; };

  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal variants={scaleIn}>
          <motion.div whileHover={{ boxShadow: "0 32px 80px rgba(245,97,27,0.1)" }}
            style={{ ...glass, background: C.bgCard, borderRadius: 48, padding: "64px 56px", boxShadow: "0 16px 48px rgba(245,97,27,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="na3-contact-grid">

              {/* Info */}
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.4rem)", fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>Let's Build Something Legendary</h2>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 40 }}>Have a vision for a world-class digital product? Reach out and let's discuss how we can bring it to life.</p>
                {[
                  { icon: "mail", label: "Email Us", value: "hello@neuralamber.agency" },
                  { icon: "call", label: "Call Us", value: "+1 (555) 982-3341" },
                ].map((c, i) => (
                  <motion.div key={c.label} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <motion.div whileHover={{ scale: 1.1, background: C.grad }}
                      style={{ width: 50, height: 50, borderRadius: "50%", background: C.orangeFaint, border: `1.5px solid rgba(245,97,27,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                      <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 20 }}>{c.icon}</span>
                    </motion.div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input type="text" placeholder="Your Name" style={inputStyle} onFocus={focus} onBlur={blur} />
                  <input type="email" placeholder="Email Address" style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <input type="tel" placeholder="Phone Number" style={inputStyle} onFocus={focus} onBlur={blur} />
                <textarea rows={4} placeholder="Project Details" style={{ ...inputStyle, resize: "vertical" }} onFocus={focus} onBlur={blur} />
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(245,97,27,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", background: C.grad, color: "#370e00", padding: "18px", borderRadius: 16, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(245,97,27,0.3)" }}>
                  Send Design Inquiry
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Webdesigning() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #fffbf8; }
        @media (max-width: 1024px) {
          .na3-hero-grid { grid-template-columns: 1fr !important; }
          .na3-hero-right { display: none !important; }
          .na3-services-grid { grid-template-columns: repeat(2,1fr) !important; }
          .na3-why-grid { grid-template-columns: 1fr !important; }
          .na3-portfolio-grid { grid-template-columns: 1fr !important; }
          .na3-testi-grid { grid-template-columns: 1fr !important; }
          .na3-contact-grid { grid-template-columns: 1fr !important; }
          .na3-tools-wrap { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .na3-services-grid { grid-template-columns: 1fr !important; }
          .na3-steps { flex-direction: column; align-items: center; }
          .na3-process-line { display: none !important; }
          .na3-tools-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Inter',sans-serif", background: "#fffbf8", color: C.text, overflowX: "hidden" }}>
        <Hero />
        <Services />
        <DesignProcess />
        <Tools />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
=======
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C:any = {
  bg: "#fffbf8",
  bgAlt: "#fff7f3",
  bgCard: "#ffffff",
  orange: "#f5611b",
  orangeLight: "#ffb599",
  orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1",
  text: "#1c0d05",
  muted: "#7a5a48",
  border: "rgba(245,97,27,0.15)",
  grad: "linear-gradient(135deg,#ffb599 0%,#f5611b 100%)",
};

const glass:any = {
  background: "rgba(255,181,153,0.13)",
  backdropFilter: "blur(18px)",
  border: `1px solid ${C.border}`,
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 38 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, style = {}, variants = fadeUp, custom = 0 }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style}>
      {children}
    </motion.div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mockCards = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAt06_Fni46uN3dZVImyiVxCWRkMT9RShZgAh6Xe3yWIz-UL3PosBK0tNRMpJJI5qFQqTKI9MuHWvnbM4s9BN2jhpeutJwmAWNKmd1hdWXfV2wSPCntx9nInD74EiG8p_inUjQtVrZEtVr4X_m9Uaj-CiCMsE7_oPfkO1FGVUiZN9qKiFB2maU8DTZjws91GQ2oU51I67PBYiTNQQ1ohL_y_dhPrs8EFbqqvhAS-MZA3DG_CGOuswwsNNhA4XHyuBXhQfN9kPHIAY",
      delay: 0,
    },
  ];

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 80, background: C.bg, overflow: "hidden" }}>
      {/* Blobs */}
      <motion.div style={{ y: blobY1, position: "absolute", top: "-8%", left: "-12%", width: "44%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,97,27,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <motion.div style={{ y: blobY2, position: "absolute", bottom: "-8%", right: "-12%", width: "38%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,149,241,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 10 }} className="na3-hero-grid">

        {/* LEFT */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.07)", border: `1px solid rgba(245,97,27,0.2)`, marginBottom: 28 }}>
            <motion.span animate={{ scale: [1, 1.6, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: C.grad, display: "block", boxShadow: "0 0 8px #ffb599" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase" }}>Next-Gen Digital Experiences</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.4rem,4.5vw,4.2rem)", fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Creative Web Design{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ background: `linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              That Engages
            </motion.span>{" "}and Converts
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color: C.muted, fontSize: 17, maxWidth: 500, marginBottom: 40, lineHeight: 1.8, fontWeight: 300 }}>
            We engineer high-performance digital interfaces that blend aesthetic sophistication with technical precision. Elevate your brand with neural-centric design.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: C.grad, color: "#370e00", padding: "16px 30px", borderRadius: 16, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(245,97,27,0.3)" }}>
              Start Your Website Design
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, background: "rgba(245,97,27,0.07)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(245,97,27,0.04)", color: C.text, padding: "16px 30px", borderRadius: 16, fontWeight: 600, fontSize: 15, border: `1.5px solid rgba(245,97,27,0.2)`, cursor: "pointer" }}>
              View Our Portfolio
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT – floating mock grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="na3-hero-right">
          {/* Col 1 */}
          <div style={{ paddingTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal variants={scaleIn} custom={2}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAt06_Fni46uN3dZVImyiVxCWRkMT9RShZgAh6Xe3yWIz-UL3PosBK0tNRMpJJI5qFQqTKI9MuHWvnbM4s9BN2jhpeutJwmAWNKmd1hdWXfV2wSPCntx9nInD74EiG8p_inUjQtVrZEtVr4X_m9Uaj-CiCMsE7_oPfkO1FGVUiZN9qKiFB2maU8DTZjws91GQ2oU51I67PBYiTNQQ1ohL_y_dhPrs8EFbqqvhAS-MZA3DG_CGOuswwsNNhA4XHyuBXhQfN9kPHIAY"
                  alt="UI layout" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, opacity: 0.85, marginBottom: 12 }} />
                <div style={{ height: 6, width: "66%", background: "rgba(245,97,27,0.15)", borderRadius: 9999, marginBottom: 6 }} />
                <div style={{ height: 6, width: "45%", background: "rgba(245,97,27,0.1)", borderRadius: 9999 }} />
              </motion.div>
            </Reveal>
            <Reveal variants={scaleIn} custom={3}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245,97,27,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 18 }}>grid_view</span>
                  </div>
                  <div>
                    <div style={{ height: 6, width: 56, background: "rgba(245,97,27,0.15)", borderRadius: 9999, marginBottom: 5 }} />
                    <div style={{ height: 6, width: 36, background: "rgba(245,97,27,0.1)", borderRadius: 9999 }} />
                  </div>
                </div>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ width: "100%", height: 80, background: "rgba(245,97,27,0.06)", borderRadius: 12, border: `1px solid rgba(245,97,27,0.12)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "rgba(245,97,27,0.3)", fontSize: 28 }}>bar_chart</span>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal variants={scaleIn} custom={4}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ ...glass, borderRadius: 20, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex" }}>
                    {["rgba(245,97,27,0.3)", "rgba(245,97,27,0.5)", "rgba(27,149,241,0.4)"].map((bg, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: bg, border: "2px solid #fffbf8", marginLeft: i === 0 ? 0 : -8 }} />
                    ))}
                  </div>
                  <motion.span whileHover={{ scale: 1.2, color: C.orange }}
                    className="material-symbols-outlined" style={{ color: C.orange, fontSize: 18 }}>add_circle</motion.span>
                </div>
                <div style={{ height: 120, background: "rgba(245,97,27,0.05)", borderRadius: 12, border: `1px solid rgba(245,97,27,0.1)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: "rgba(245,97,27,0.3)", fontSize: 40 }}>web</span>
                </div>
              </motion.div>
            </Reveal>
            <Reveal variants={scaleIn} custom={5}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 16px 32px rgba(245,97,27,0.25)" }}
                style={{ background: C.grad, borderRadius: 20, padding: 24, boxShadow: "0 8px 24px rgba(245,97,27,0.3)" }}>
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 32, display: "block", marginBottom: 8 }}>bolt</motion.span>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: "#370e00" }}>Fast Lane Optimization</div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. SERVICES GRID ─────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "brush", title: "Custom Website Design", desc: "Unique layouts and visuals designed from the ground up to reflect your brand's DNA." },
  { icon: "devices", title: "Responsive Web Design", desc: "Fluid experiences that adapt seamlessly to smartphones, tablets, and massive desktops." },
  { icon: "rocket_launch", title: "Landing Page Design", desc: "High-conversion pages optimized for marketing campaigns and product launches." },
  { icon: "corporate_fare", title: "Corporate Website Design", desc: "Professional, authoritative digital presences for established organizations." },
  { icon: "shopping_cart", title: "E-Commerce Design", desc: "User-centric shopping experiences built to drive sales and reduce friction." },
  { icon: "auto_fix_high", title: "Website Redesign", desc: "Breathe new life into aging platforms with modern UX and refreshed aesthetics." },
  { icon: "account_circle", title: "Portfolio Website Design", desc: "Digital galleries that showcase your work with elegance and narrative flow." },
  { icon: "gesture", title: "UI/UX Website Design", desc: "Deep focus on user psychology and behavioral patterns for maximum engagement." },
];

function Services() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, marginBottom: 16 }}>Our Web Design Specialties</h2>
            <p style={{ color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
              High-performance digital products tailored for the specific needs of modern enterprises and visionary startups.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="na3-services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i % 4} style={{ height: "100%" }}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(245,97,27,0.1)" }}
                style={{ background: C.bgCard, borderRadius: 28, padding: 32, height: "100%", border: `1.5px solid rgba(245,97,27,0.1)`, overflow: "hidden", position: "relative", boxSizing: "border-box" }}>
                <motion.span whileHover={{ scale: 1.15, color: C.orange }}
                  className="material-symbols-outlined"
                  style={{ fontSize: 36, color: C.orange, display: "block", marginBottom: 20 }}>
                  {s.icon}
                </motion.span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: C.text, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                {/* Underline reveal */}
                <motion.div initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 2, background: C.grad, borderRadius: 9999 }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. DESIGN PROCESS ────────────────────────────────────────────────────────
const STEPS = [
  { icon: "analytics", label: "Requirement Analysis", desc: "Defining goals and scope." },
  { icon: "search_insights", label: "Research & Planning", desc: "Competitor & user audits." },
  { icon: "account_tree", label: "Wireframing", desc: "Low-fidelity skeletal design." },
  { icon: "palette", label: "UI Design", desc: "Applying brand & aesthetics." },
  { icon: "dynamic_form", label: "Prototype & Feedback", desc: "Iterative testing phase." },
  { icon: "verified", label: "Final Delivery", desc: "Launch and hand-off.", highlight: true },
];

function DesignProcess() {
  return (
    <section style={{ padding: "96px 0", background: C.bg, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 80 }}>Our Design Framework</h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <Reveal>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", top: 40, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(245,97,27,0.25), rgba(245,97,27,0.5), rgba(245,97,27,0.25), transparent)`, transformOrigin: "left", zIndex: 0 }}
              className="na3-process-line" />
          </Reveal>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 1 }} className="na3-steps">
            {STEPS.map((step, i) => (
              <Reveal key={step.label} variants={fadeUp} custom={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.12, background: step.highlight ? C.grad : C.grad, boxShadow: "0 12px 28px rgba(245,97,27,0.3)" }}
                  style={{
                    width: 76, height: 76, borderRadius: 20,
                    background: step.highlight ? C.grad : C.bgCard,
                    border: step.highlight ? "none" : `1.5px solid rgba(245,97,27,0.25)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, transition: "background 0.3s",
                    boxShadow: step.highlight ? "0 8px 24px rgba(245,97,27,0.35)" : "0 4px 12px rgba(245,97,27,0.08)",
                  }}>
                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="material-symbols-outlined"
                    style={{ color: step.highlight ? "#370e00" : C.orange, fontSize: 28 }}>
                    {step.icon}
                  </motion.span>
                </motion.div>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 6 }}>{step.label}</h4>
                <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. TOOLS ─────────────────────────────────────────────────────────────────
const TOOLS = [
  { icon: "design_services", name: "Figma" },
  { icon: "layers", name: "Adobe XD" },
  { icon: "draw", name: "Sketch" },
  { icon: "photo_camera", name: "Photoshop" },
  { icon: "format_shapes", name: "Illustrator" },
  { icon: "web_asset", name: "Framer" },
];

function Tools() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }} className="na3-tools-wrap">
          {/* Text */}
          <Reveal style={{ flex: "0 0 300px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.4rem)", fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>Engineered with Top-Tier Tooling</h2>
            <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 14 }}>We utilize industry-leading design systems and prototyping software to ensure our output is pixel-perfect and dev-ready.</p>
          </Reveal>

          {/* Grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="na3-tools-grid">
            {TOOLS.map((t, i) => (
              <Reveal key={t.name} variants={scaleIn} custom={i}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(245,97,27,0.45)", boxShadow: "0 16px 32px rgba(245,97,27,0.12)" }}
                  style={{ height: 110, ...glass, background: C.bgCard, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, cursor: "default", transition: "border-color 0.3s" }}>
                  <motion.div whileHover={{ scale: 1.15, background: C.grad }}
                    style={{ width: 42, height: 42, background: C.orangeFaint, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                    <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 22 }}>{t.icon}</span>
                  </motion.div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: C.text, fontSize: 14 }}>{t.name}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. WHY CHOOSE US ─────────────────────────────────────────────────────────
const ADVANTAGES = [
  { title: "Modern & Creative Designs", desc: "Pushing boundaries with avant-garde layouts and bespoke visual elements." },
  { title: "Mobile-Responsive Layouts", desc: "Seamless performance on every device screen, from 4K monitors to handhelds." },
  { title: "SEO-Friendly Structure", desc: "Code architected for maximum visibility and high search engine ranking." },
  { title: "Fast Loading Websites", desc: "Performance-tuned assets ensuring sub-second load times and high Core Web Vitals." },
  { title: "User-Centered Design", desc: "Focusing on the human element to create intuitive, friction-free flows." },
  { title: "Conversion-Focused Layouts", desc: "Strategic call-to-action placement designed to turn visitors into loyal customers." },
];

function WhyUs() {
  return (
    <section style={{ padding: "96px 0", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }} className="na3-why-grid">
        {/* Left */}
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.5rem)", fontWeight: 800, color: C.text, marginBottom: 20, lineHeight: 1.2 }}>The Neural Advantage</h2>
          <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 14, marginBottom: 32 }}>We don't just build sites; we craft digital ecosystems designed to accelerate growth and foster deep user connections.</p>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(245,97,27,0.12)" }}
            style={{ ...glass, background: "rgba(245,97,27,0.05)", borderRadius: 24, padding: 32 }}>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "3rem", fontWeight: 800, color: C.orange, marginBottom: 8 }}>
              98%
            </motion.div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Client satisfaction rate across 150+ successful web deployments.</p>
          </motion.div>
        </Reveal>

        {/* Right grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} variants={fadeUp} custom={i % 2}>
              <motion.div
                whileHover={{ borderColor: C.orange, y: -3 }}
                style={{ background: C.bgAlt, borderRadius: 20, padding: "24px 28px", borderLeft: `4px solid rgba(245,97,27,0.25)`, transition: "border-color 0.3s" }}>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 8 }}>{a.title}</h4>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{a.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. PORTFOLIO ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZvgL7FL1f7ikCG8mx2prh8gcWVNjc6C3vHyLOQIVq6khkkp0dgJD8GOxoyNA9yNcKlAs0oavwlyf9e817KcZSJLWaRBBpwLmZoGnGEPVZ0yUVzLl7j0iGNsXKfFKN-xnFBJG3mBpbpXp0gL2EwJ0axFZvjmc2gvYL2olqFITv-yxqSM0HhcULXNQyeEg_kLHy1RQtcGOR_OINTMOwVdb6sC90wKk6ts75ym5uMzNFyvkqA6teYzUBCtaRTcPB0qsYxHbmHwtgy8",
    title: "Lumina Banking Platform",
    sub: "SaaS / Fintech / UI Design",
    offset: false,
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7v_iAVS0M1YK1Pw5MioNmBl7ySrF9wEpvf4aWIAq5sTDpEUsHJab0NoC9YnpD9wDqflopgINSi66r-yRyuG9Eo5o7tBWJoQStSJuGezH7c7WomAl53tXK2Zw_K7FFKZbmzAeUJ1WR4m5UQrBwKk11rgsUPtoQO7z8oELvzMw_3kJ84nwidu8Qkq6rMWZzWkPSDYDUgXUaojepMCSmWQ9qSKSGlhfO5SLEf-HNbHswiYkojaNZWuHcgcvZ1ymOXB21c9wYvkK5c3I",
    title: "Neural Analytics Hub",
    sub: "Big Data / AI / Visualisation",
    offset: true,
  },
];

function Portfolio() {
  return (
    <section style={{ padding: "96px 0", background: C.bgAlt, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 64 }}>Digital Gallery</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="na3-portfolio-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} variants={fadeUp} custom={i} style={{ marginTop: p.offset ? 48 : 0 }}>
              <motion.div whileHover={{ y: -6 }} style={{ cursor: "pointer" }}>
                {/* Browser chrome */}
                <div style={{ background: C.bgAlt, padding: 14, borderRadius: "24px 24px 0 0", border: `1px solid rgba(245,97,27,0.12)`, borderBottom: "none" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                    {["#ef4444","#f59e0b","#22c55e"].map((c, j) => (
                      <div key={j} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.5 }} />
                    ))}
                  </div>
                  <div style={{ overflow: "hidden", borderRadius: 14 }}>
                    <motion.img src={p.img} alt={p.title}
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
                      style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </div>
                {/* Caption */}
                <motion.div whileHover={{ borderColor: "rgba(245,97,27,0.35)" }}
                  style={{ ...glass, background: C.bgCard, padding: "20px 28px", borderRadius: "0 0 24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.3s" }}>
                  <div>
                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.text, marginBottom: 4 }}>{p.title}</h4>
                    <p style={{ fontSize: 12, color: C.muted }}>{p.sub}</p>
                  </div>
                  <motion.span whileHover={{ rotate: 45, scale: 1.2 }} transition={{ duration: 0.3 }}
                    className="material-symbols-outlined" style={{ color: C.orange, fontSize: 28 }}>north_east</motion.span>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. TESTIMONIALS ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "Neural Amber completely transformed our online presence. Their design thinking isn't just aesthetic—it's functional and strategic.", name: "Marcus Chen", role: "CEO, Flux Tech", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8oqiX-Yh_Y4BCiOmMLV0vZPRbiBHWjuaa7DQetccBiNGdGNwGz77Gb3sR6ft6lcAo_XfXi7eoccDRzV9Q1bfZ__TPHgyvxEN2GfdTpxdYzQxqInCv7_7rR9eAoeZTp6AnZtf-qxUg-49kNpNi8GtICo4LX_TtIpDNtmMc6wIjZLoNV0f-veuSLNX_tCvbEZWqQka9PeAgPg4aJzqUOONr0KCvj2qiJ5LPfQU1QHGNr3L3pn9P6lYmu19QUaHNn5NHBqDcC0Myyd0", highlight: false },
  { quote: "The attention to detail in their responsive layouts is unmatched. Our mobile conversion rates shot up by 45% after launch.", name: "Sarah Jenkins", role: "Marketing Director, Solis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTMKhU6DcKbXpmrzLZmTQ-qDU-sBqAgbcRfLaAR7XELVlrWHFj8czH0aP-ElTUZgNeYceBrOWwviWkV9Yl6CoeWomrquf5KggL-8-ZmHhGwo06f_Y2bWb16h0_v_AUQ5oe1JlrnqJlpEIuYyJzPj4YNGhoPNtthJo85dtEajnXP6v-gZw1m8jHPlzyr7IhVhLUhnJTCi7DH4iupP69NWBkAsmMyguZci6bpWkcMYHu4Qy3ac_0tu7sLTEWHseUGVKXylm75F2AulQ", highlight: true },
  { quote: "Working with them was a masterclass in collaboration. They actually listened to our needs and delivered beyond our expectations.", name: "David Miller", role: "Founder, Artisan Co", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyUg5KUaiHhXlbWPe0-HMJYpCYkNTMNeNnosgQghZVThR0yNKLHVWfj_9K_G-WKI1V8Qu0caAAPtCAvC315p5uWkz9Q6_W-O5VW5cNq4cpeypqiaXRMhtXNMzoGd3sl85nrf2DkESuDbRpGtm0dqrP7lMtEmn3-hv5Q-nqsK8ztnmoEwXRTH9J9a377OdjjDQmXO3jloKzNqMnBrYVzZxAtoq-S7r_lbFSdVHft6P4Tc648LAcKQ5SNbBr1539DfvczHH-K2jQ3dM", highlight: false },
];

function Testimonials() {
  return (
    <section style={{ padding: "96px 0", background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 64 }}>Words from the Field</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="na3-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} variants={scaleIn} custom={i}>
              <motion.div
                whileHover={{ y: -8, boxShadow: t.highlight ? "0 24px 48px rgba(245,97,27,0.2)" : "0 20px 40px rgba(245,97,27,0.1)" }}
                style={{
                  ...glass,
                  background: t.highlight ? "rgba(245,97,27,0.06)" : C.bgCard,
                  borderRadius: 36, padding: 40, position: "relative", overflow: "hidden",
                  border: t.highlight ? `1.5px solid rgba(245,97,27,0.25)` : `1px solid ${C.border}`,
                  height: "100%", boxSizing: "border-box",
                }}>
                <motion.span animate={{ rotate: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity }}
                  className="material-symbols-outlined"
                  style={{ position: "absolute", top: 24, right: 24, fontSize: 72, color: "rgba(245,97,27,0.07)", lineHeight: 1 }}>
                  format_quote
                </motion.span>
                <p style={{ color: C.muted, fontStyle: "italic", lineHeight: 1.8, fontSize: 14, marginBottom: 28, position: "relative", zIndex: 1 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.img} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", filter: "grayscale(30%)" }} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.orange }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. CONTACT ───────────────────────────────────────────────────────────────
function Contact() {
  const inputStyle:any = {
    width: "100%", background: C.bgAlt, border: `1.5px solid rgba(245,97,27,0.15)`,
    borderRadius: 14, padding: "14px 18px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "'Inter',sans-serif",
  };

  const focus = (e:any) => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur = (e:any) => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; };

  return (
    <section style={{ padding: "96px 0", background: C.bgAlt }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal variants={scaleIn}>
          <motion.div whileHover={{ boxShadow: "0 32px 80px rgba(245,97,27,0.1)" }}
            style={{ ...glass, background: C.bgCard, borderRadius: 48, padding: "64px 56px", boxShadow: "0 16px 48px rgba(245,97,27,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="na3-contact-grid">

              {/* Info */}
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,2.8vw,2.4rem)", fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.2 }}>Let's Build Something Legendary</h2>
                <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 40 }}>Have a vision for a world-class digital product? Reach out and let's discuss how we can bring it to life.</p>
                {[
                  { icon: "mail", label: "Email Us", value: "hello@neuralamber.agency" },
                  { icon: "call", label: "Call Us", value: "+1 (555) 982-3341" },
                ].map((c, i) => (
                  <motion.div key={c.label} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <motion.div whileHover={{ scale: 1.1, background: C.grad }}
                      style={{ width: 50, height: 50, borderRadius: "50%", background: C.orangeFaint, border: `1.5px solid rgba(245,97,27,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                      <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 20 }}>{c.icon}</span>
                    </motion.div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input type="text" placeholder="Your Name" style={inputStyle} onFocus={focus} onBlur={blur} />
                  <input type="email" placeholder="Email Address" style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <input type="tel" placeholder="Phone Number" style={inputStyle} onFocus={focus} onBlur={blur} />
                <textarea rows={4} placeholder="Project Details" style={{ ...inputStyle, resize: "vertical" }} onFocus={focus} onBlur={blur} />
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(245,97,27,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", background: C.grad, color: "#370e00", padding: "18px", borderRadius: 16, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(245,97,27,0.3)" }}>
                  Send Design Inquiry
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Webdesigning() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #fffbf8; }
        @media (max-width: 1024px) {
          .na3-hero-grid { grid-template-columns: 1fr !important; }
          .na3-hero-right { display: none !important; }
          .na3-services-grid { grid-template-columns: repeat(2,1fr) !important; }
          .na3-why-grid { grid-template-columns: 1fr !important; }
          .na3-portfolio-grid { grid-template-columns: 1fr !important; }
          .na3-testi-grid { grid-template-columns: 1fr !important; }
          .na3-contact-grid { grid-template-columns: 1fr !important; }
          .na3-tools-wrap { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .na3-services-grid { grid-template-columns: 1fr !important; }
          .na3-steps { flex-direction: column; align-items: center; }
          .na3-process-line { display: none !important; }
          .na3-tools-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Inter',sans-serif", background: "#fffbf8", color: C.text, overflowX: "hidden" }}>
        <Hero />
        <Services />
        <DesignProcess />
        <Tools />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
}