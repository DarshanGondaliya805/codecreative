import { useRef, useState, useEffect, FC, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  primary:        "#ec5b13",
  primaryLight:   "#ff8c5a",
  primaryLighter: "#ffb599",
  primaryFaint:   "rgba(236,91,19,0.07)",
  primaryFaint2:  "rgba(236,91,19,0.12)",
  bgLight:        "#f8f6f6",
  bg:             "#ffffff",
  bgWarm:         "#fffbf8",
  text:           "#1a0e08",
  textSoft:       "#3d2518",
  muted:          "#7a5040",
  mutedLight:     "#b08070",
  border:         "rgba(236,91,19,0.13)",
  grad:           "linear-gradient(135deg,#ffb599 0%,#ec5b13 100%)",
  shadowMd:       "0 12px 40px rgba(236,91,19,0.11)",
  shadowLg:       "0 24px 64px rgba(236,91,19,0.13)",
} as const;

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 38 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (i: number = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const wordReveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const wordItem: Variants = {
  hidden: { opacity: 0, y: 46 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
interface RevealProps { children: ReactNode; variants?: Variants; custom?: number; style?: React.CSSProperties; className?: string; }
const Reveal: FC<RevealProps> = ({ children, variants = fadeUp, custom = 0, style = {}, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style} className={className}>{children}</motion.div>
  );
};

// ─── Counter ──────────────────────────────────────────────────────────────────
const Counter: FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      let cur = 0;
      const step = to / 60;
      const t = setInterval(() => {
        cur += step;
        if (cur >= to) { setVal(to); clearInterval(t); }
        else setVal(Math.floor(cur));
      }, 16);
      return () => clearInterval(t);
    }
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── Dot grid ─────────────────────────────────────────────────────────────────
const DotGrid: FC<{ opacity?: number }> = ({ opacity = 0.045 }) => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236,91,19,${opacity}) 1.2px, transparent 0)`,
    backgroundSize: "36px 36px",
  }} />
);

// ─── Animated gradient text ───────────────────────────────────────────────────
const GradText: FC<{ children: ReactNode; animate?: boolean }> = ({ children, animate: anim }) => (
  <motion.span
    {...(anim ? {
      animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
      transition: { duration: 5, repeat: Infinity, ease: "linear" as const },
    } : {})}
    style={{
      background: `linear-gradient(90deg,${T.primary},${T.primaryLight},${T.primary})`,
      backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>
    {children}
  </motion.span>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO — fully light
// ═══════════════════════════════════════════════════════════════════════════════
const Hero: FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const imgY  = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <header ref={ref} style={{
      position: "relative", minHeight: "92vh", display: "flex", alignItems: "center",
      background: T.bgLight, overflow: "hidden",
    }}>
      <DotGrid opacity={0.05} />
      <motion.div style={{ y: blobY, position: "absolute", top: "-10%", right: "-6%", width: "52%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(236,91,19,0.09) 0%,transparent 68%)", pointerEvents: "none" }} />
      <motion.div style={{ y: blobY, position: "absolute", bottom: "-12%", left: "-8%", width: "38%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,181,153,0.13) 0%,transparent 68%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 28px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", position: "relative", zIndex: 2 }} className="av-hero-grid">

        {/* Left */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, marginBottom: 28, width: "fit-content", background: T.primaryFaint2, border: `1px solid rgba(236,91,19,0.22)` }}>
            <motion.span animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: T.primary, display: "block", boxShadow: `0 0 8px ${T.primary}` }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.primary, letterSpacing: "0.13em", textTransform: "uppercase" }}>Intelligence Redefined</span>
          </motion.div>

          {/* Word-by-word headline */}
          <motion.div variants={wordReveal} initial="hidden" animate="visible" style={{ marginBottom: 24 }}>
            {[{ word: "Architecting", orange: false }, { word: "Neural", orange: true }, { word: "Futures.", orange: false }].map(({ word, orange }) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <motion.span variants={wordItem} style={{
                  display: "block", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
                  fontSize: "clamp(2.8rem,5.5vw,5rem)", lineHeight: 0.94, letterSpacing: "-0.036em",
                  ...(orange
                    ? { background: T.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                    : { color: T.text }),
                }}>
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} custom={4} initial="hidden" animate="visible"
            style={{ color: T.muted, fontSize: 17, maxWidth: 480, marginBottom: 40, lineHeight: 1.82, fontWeight: 300 }}>
            We engineer bespoke AI ecosystems that transform raw data into predictive kinetic energy. Secure, scalable, and human-centric intelligence.
          </motion.p>

          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: `0 16px 40px rgba(236,91,19,0.38)` }} whileTap={{ scale: 0.97 }}
              style={{ background: T.grad, color: "#370e00", padding: "16px 32px", borderRadius: 14, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: `0 8px 24px rgba(236,91,19,0.26)` }}>
              Start Your Evolution
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, borderColor: T.primary, color: T.primary }} whileTap={{ scale: 0.97 }}
              style={{ background: "transparent", color: T.muted, padding: "16px 32px", borderRadius: 14, fontWeight: 600, fontSize: 15, border: `1.5px solid rgba(236,91,19,0.22)`, cursor: "pointer", transition: "border-color 0.25s,color 0.25s" }}>
              View Core Stack
            </motion.button>
          </motion.div>
        </div>

        {/* Right image */}
        <Reveal variants={scaleIn} custom={0} className="av-hero-right">
          <div style={{ position: "relative" }}>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }}
              style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `radial-gradient(circle,rgba(236,91,19,0.1) 0%,transparent 70%)`, filter: "blur(28px)", pointerEvents: "none" }} />
            <motion.div style={{ y: imgY, borderRadius: 32, overflow: "hidden", border: `1.5px solid rgba(236,91,19,0.14)`, boxShadow: "0 28px 72px rgba(236,91,19,0.1),0 4px 20px rgba(0,0,0,0.05)", aspectRatio: "1/1", position: "relative" }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa3yHrfihBoSpNy62UFjdCZbhkYmKhOwyFtuGaFtcD1e0IPLf7FHCys5ONn-YXb7eUYr0uy17LuIfQcWaHUju1mQN8BxsPNqgUTwIk2qd9y-DFl4yUPEE4h745v6mA2AjRnIHIQxMhzmRigbopnizFyrlt-WrwT5C6LzJgksxgROM2R2kElvPJmXNZARLbCMpZ4vhY6c_h9FX4AE56ZrWKELUkPGJBcHZy0g3DV-AhSW8eyFNxtIE4b4BA_a2oaoCxIPVARNTcCI4"
                alt="Neural Network" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, mixBlendMode: "multiply" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(248,246,246,0.85) 0%,transparent 55%)" }} />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", bottom: 28, left: 24, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: `1px solid rgba(236,91,19,0.2)`, borderRadius: 16, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "block", flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 12, color: T.text }}>AI Model Active</p>
                  <p style={{ fontSize: 10, color: T.muted }}>Neural engine running</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </header>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SERVICES BENTO
// ═══════════════════════════════════════════════════════════════════════════════
const Services: FC = () => {
  const [mlHov, setMlHov] = useState(false);
  return (
    <section style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: T.text, marginBottom: 14, letterSpacing: "-0.02em" }}>Enterprise AI Services</h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 5, background: T.grad, borderRadius: 9999 }} />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }} className="av-bento-grid">
          {/* ML large */}
          <Reveal variants={scaleIn} custom={0}>
            <motion.div onHoverStart={() => setMlHov(true)} onHoverEnd={() => setMlHov(false)}
              whileHover={{ y: -6, boxShadow: T.shadowLg }}
              style={{ background: T.bgLight, borderRadius: 32, padding: 44, minHeight: 360, border: `1.5px solid rgba(236,91,19,0.1)`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", right: 0, bottom: 0, width: "46%", height: "100%" }}>
                <motion.img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMra_WL_zgZzD3HbjNKmorea0hjl0Igyv0cIJdoGjzdbPr9JIH-jNsfotWD1SFJ231PWNhD068gZY8SaGr1RbH2pPcfPeAw6dfZc5cbiIiWto1otgO0s3z5_y0tDl6hpdNyUO0E9uta0CEOwVvQ9v8evuz_CZXvnD8Xm1CaE90QkSDt9y404F4CCHpEMpsJKcyHK4XeBWi5SBnIzbLFQY_BGrZhV9aW1mvCG-xXWWo8DyoMLEObclbeCdRCLTt4l6ul8VnPB9elbI"
                  alt="ML" animate={{ opacity: mlHov ? 0.18 : 0.06, filter: mlHov ? "grayscale(0%)" : "grayscale(100%)" }} transition={{ duration: 0.55 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: T.primary, display: "block", marginBottom: 18, fontVariationSettings: "'FILL' 1" }}>neurology</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "2rem", color: T.text, marginBottom: 12 }}>Machine Learning</h3>
                <p style={{ color: T.muted, maxWidth: 380, lineHeight: 1.78, fontSize: 14 }}>Proprietary algorithms that evolve with your business — from predictive maintenance to complex consumer behavior forecasting.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1, marginTop: 28 }}>
                {["Predictive Analytics", "Deep Neural Networks"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Reveal variants={fadeUp} custom={1}>
              <motion.div whileHover={{ y: -5, borderColor: "rgba(236,91,19,0.3)", boxShadow: T.shadowMd }}
                style={{ background: T.bg, borderRadius: 24, padding: 28, border: `1.5px solid rgba(236,91,19,0.1)`, flex: 1, transition: "border-color 0.3s" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 34, color: T.primary, display: "block", marginBottom: 14, fontVariationSettings: "'FILL' 1" }}>forum</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: T.text, marginBottom: 8 }}>Conversational AI</h3>
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.72, marginBottom: 14 }}>Cognitive chatbots that understand context, sentiment, and intent across 60+ languages.</p>
                <motion.a href="#" whileHover={{ x: 5 }} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 700, color: T.primary, fontSize: 13, textDecoration: "none" }}>
                  Explore Agents <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
                </motion.a>
              </motion.div>
            </Reveal>
            <Reveal variants={fadeUp} custom={2}>
              <motion.div whileHover={{ y: -5, boxShadow: T.shadowMd }}
                style={{ background: T.bgLight, borderRadius: 24, padding: 28, border: `1.5px solid rgba(236,91,19,0.1)`, flex: 1, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -12, bottom: -12, opacity: 0.08 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 100, color: T.primary }}>data_object</span>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 34, color: T.primary, display: "block", marginBottom: 14 }}>translate</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: T.text, marginBottom: 8 }}>NLP Systems</h3>
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.72 }}>Extracting meaning from unstructured text data with human-level precision.</p>
              </motion.div>
            </Reveal>
          </div>

          {/* CV full width */}
          <Reveal variants={fadeUp} custom={3} style={{ gridColumn: "1 / -1" }}>
            <motion.div whileHover={{ y: -5, boxShadow: T.shadowMd }}
              style={{ background: T.bgLight, borderRadius: 28, padding: 36, border: `1.5px solid rgba(236,91,19,0.1)`, display: "flex", alignItems: "center", gap: 40 }}
              className="av-cv-card">
              <div style={{ flex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 34, color: T.primary, display: "block", marginBottom: 14, fontVariationSettings: "'FILL' 1" }}>visibility</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.4rem", color: T.text, marginBottom: 10 }}>Computer Vision</h3>
                <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 18 }}>Empower machines to see, identify, and process visual information like humans—only faster.</p>
                <motion.button whileHover={{ borderColor: T.primary, color: T.primary, background: T.primaryFaint }}
                  style={{ padding: "9px 22px", borderRadius: 12, border: `1.5px solid rgba(236,91,19,0.2)`, background: "transparent", fontWeight: 700, fontSize: 13, cursor: "pointer", color: T.muted, transition: "all 0.25s" }}>
                  Case Studies
                </motion.button>
              </div>
              <div style={{ flex: 1, borderRadius: 20, overflow: "hidden", boxShadow: T.shadowMd }}>
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKx9FgQ9ve1dibrlZPFqWllmgR-Hids0hthe1Qii5w0QzMd7ekgKzKNSVkeW0X-l9yQjDD5VR61HIXKVl55-DSuEfpzVNHCEmZ5epX_R9WLvVGXQSGQ-PJ3IX7p79f6pk9Ho2Fl9OWfJLfTZjGzu2Pt_6G9TRZNNoLPQHnFhIwcyKqCUmammQKaGVP3hYXikOZA9u4Stmjn69Znl8GNZ5hNcqWZqZ6bpYwPOu1ixkvl00SJI6G7-M_VVaLHBf84ugbWs4kJdp6eJA"
                  alt="Computer Vision" style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. TECH STACK
// ═══════════════════════════════════════════════════════════════════════════════
interface StackItem { icon: string; name: string; }
const STACK: StackItem[] = [
  { icon: "flowsheet", name: "TensorFlow" }, { icon: "hub", name: "PyTorch" },
  { icon: "auto_awesome", name: "OpenAI" },  { icon: "cloud", name: "Azure AI" },
];

const TechStack: FC = () => (
  <section style={{ padding: "72px 0", background: T.bgLight }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
      <Reveal>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", color: T.mutedLight, textTransform: "uppercase", marginBottom: 52 }}>The Engine Room</p>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px 64px" }}>
        {STACK.map((item, i) => (
          <Reveal key={item.name} variants={scaleIn} custom={i}>
            <motion.div whileHover={{ scale: 1.12, opacity: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 12, cursor: "default", opacity: 0.5 }}>
              <motion.span whileHover={{ color: T.primary, rotate: 10 }}
                className="material-symbols-outlined" style={{ fontSize: 38, color: T.muted, transition: "color 0.3s" }}>{item.icon}</motion.span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.25rem", color: T.text }}>{item.name}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 4. PROCESS  (light sticky sidebar)
// ═══════════════════════════════════════════════════════════════════════════════
interface ProcessStep { n: number; title: string; desc: string; accent?: boolean; }
const STEPS: ProcessStep[] = [
  { n: 1, title: "Deep Analysis", desc: "We audit your current data architecture and identify latent AI opportunities that align with your KPIs.", accent: true },
  { n: 2, title: "Data Synthesis", desc: "Cleaning and structuring disparate data points into a high-fidelity training set." },
  { n: 3, title: "Architectural Design", desc: "Selecting the optimal neural framework and designing the model topology." },
  { n: 4, title: "Model Training", desc: "Iterative computation cycles to refine accuracy, speed, and cognitive depth." },
  { n: 5, title: "Deployment", desc: "Seamless integration into your existing tech stack with zero downtime." },
  { n: 6, title: "Continuous Improvement", desc: "Active monitoring and reinforcement learning to keep models sharp as environments shift.", accent: true },
];

const ProcessSection: FC = () => (
  <section style={{ padding: "96px 0", background: T.bg }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 72 }} className="av-process-grid">
        <Reveal variants={fadeLeft}>
          <div style={{ position: "sticky", top: 112 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", color: T.text, marginBottom: 18, lineHeight: 1.1 }}>
              Our Neural<br /><GradText animate>Process</GradText>
            </h2>
            <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.82, maxWidth: 280, marginBottom: 40 }}>
              A rigorous 6-step framework designed to take you from conceptual void to optimized intelligence.
            </p>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px dashed rgba(236,91,19,0.25)` }} />
              <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: T.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 26 }}>neurology</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          {STEPS.map((step, i) => (
            <Reveal key={step.n} variants={fadeUp} custom={i}>
              <motion.div whileHover={{ x: 5 }} style={{ display: "flex", gap: 24, paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <motion.div whileHover={{ scale: 1.1, background: T.grad, color: "#370e00" }}
                    style={{ width: 52, height: 52, borderRadius: "50%", background: step.accent ? T.grad : T.bgLight, color: step.accent ? "#370e00" : T.primary, border: step.accent ? "none" : `2px solid rgba(236,91,19,0.22)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15, flexShrink: 0, transition: "background 0.3s,color 0.3s", boxShadow: step.accent ? "0 8px 24px rgba(236,91,19,0.28)" : "none" }}>
                    {step.n}
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }}
                      style={{ width: 2, flex: 1, minHeight: 40, marginTop: 8, borderRadius: 9999, background: `linear-gradient(to bottom,rgba(236,91,19,0.3),rgba(236,91,19,0.04))` }} />
                  )}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8, color: step.accent ? T.primary : T.text }}>{step.title}</h3>
                  <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.78 }}>{step.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 5. INDUSTRIES
// ═══════════════════════════════════════════════════════════════════════════════
interface Industry { icon: string; label: string; offset: boolean; }
const INDUSTRIES: Industry[] = [
  { icon: "medical_services", label: "Healthcare", offset: false },
  { icon: "payments", label: "Finance", offset: true },
  { icon: "shopping_cart", label: "E-commerce", offset: false },
  { icon: "factory", label: "Manufacturing", offset: true },
];

const Industries: FC = () => (
  <section style={{ padding: "96px 0", background: T.bgLight, position: "relative", overflow: "hidden" }}>
    <DotGrid opacity={0.045} />
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", color: T.text }}>Domain Expertise</h2>
          <p style={{ color: T.muted, maxWidth: 300, fontSize: 14, lineHeight: 1.72 }}>Specialized AI solutions tailored for high-stakes industries.</p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="av-industries-grid">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.label} variants={fadeUp} custom={i} style={{ marginTop: ind.offset ? 48 : 0 }}>
            <motion.div whileHover={{ y: -8, background: T.primaryFaint2, borderColor: "rgba(236,91,19,0.3)", boxShadow: T.shadowMd }}
              style={{ background: T.bg, borderRadius: 28, padding: 36, border: `1.5px solid rgba(236,91,19,0.1)`, transition: "background 0.3s,border-color 0.3s,box-shadow 0.3s" }}>
              <motion.span whileHover={{ scale: 1.18, rotate: 6 }}
                className="material-symbols-outlined" style={{ fontSize: 44, color: T.primary, display: "block", marginBottom: 16 }}>
                {ind.icon}
              </motion.span>
              <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: T.text }}>{ind.label}</h4>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 6. WHY US
// ═══════════════════════════════════════════════════════════════════════════════
const WhyUs: FC = () => {
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  return (
    <section style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="av-why-grid">
        <div>
          <Reveal>
            <div style={{ position: "relative", marginBottom: 44 }}>
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.22, 0.1] }} transition={{ duration: 5, repeat: Infinity }}
                style={{ position: "absolute", top: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(27,149,241,0.09)", filter: "blur(60px)", pointerEvents: "none" }} />
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3.2rem)", color: T.text, lineHeight: 1.12, position: "relative" }}>Why Organizations<br />Trust AIVision</h2>
            </div>
          </Reveal>
          {[
            { icon: "bolt", title: "Scalable AI Infrastructure", desc: "Built to handle billions of parameters without performance degradation." },
            { icon: "insights", title: "Real-time Insights", desc: "Edge computing capabilities for instantaneous decision making." },
          ].map((w, i) => (
            <Reveal key={w.title} variants={fadeLeft} custom={i}>
              <motion.div whileHover={{ x: 5 }} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 28 }}>
                <motion.div whileHover={{ scale: 1.1, background: T.grad }}
                  style={{ width: 46, height: 46, borderRadius: 14, background: T.primaryFaint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ color: T.primary, fontSize: 22 }}>{w.icon}</span>
                </motion.div>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: T.text, marginBottom: 6, fontSize: 15 }}>{w.title}</h4>
                  <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.75 }}>{w.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Image mosaic */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Reveal variants={scaleIn} custom={0}>
              <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: T.shadowLg, aspectRatio: "4/5" }}
                onMouseEnter={() => setH1(true)} onMouseLeave={() => setH1(false)}>
                <motion.img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHwdUsfFOg71gwEtmIpVt52_UIjNNV30WvB2ldLH20VdVb5lA1R5LPZDYcaFkoREEfb1YRRDsqVc-1NnmawCU-94XPtUHCnTZ3-QkbAQaFfhXCM9DyfYW6UdT5_iytwp3uK3WUr84erHTqFsNRlBnlNrV9HRGd0CJEj6meS3-WIpa1Xt3rZxLNpdXG55SEdEUzED59D1e0EUpYpXaFGaFHTyOcABRiHcS_Stc8wP55CsU569E0d521UCZDZ51lNy1snqKhPr3dzuY"
                  alt="AI" animate={{ scale: h1 ? 1.06 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
            <Reveal variants={scaleIn} custom={1}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(236,91,19,0.14)" }}
                style={{ background: T.primaryFaint2, border: `1.5px solid rgba(236,91,19,0.17)`, borderRadius: 24, padding: "22px 26px" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "2rem", color: T.primary, marginBottom: 4 }}><Counter to={99} suffix=".9%" /></div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>Model Uptime</div>
              </motion.div>
            </Reveal>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 48 }}>
            <Reveal variants={scaleIn} custom={2}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(236,91,19,0.28)" }}
                style={{ background: T.grad, borderRadius: 24, padding: "22px 26px", boxShadow: "0 8px 24px rgba(236,91,19,0.2)" }}>
                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#370e00", marginBottom: 4 }}>
                  <Counter to={150} suffix="+" />
                </motion.div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(55,14,0,0.6)" }}>Deployments</div>
              </motion.div>
            </Reveal>
            <Reveal variants={scaleIn} custom={3}>
              <div style={{ borderRadius: 28, overflow: "hidden", boxShadow: T.shadowLg, aspectRatio: "4/5" }}
                onMouseEnter={() => setH2(true)} onMouseLeave={() => setH2(false)}>
                <motion.img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpieTuM-cRzlA0kU9IZGWny-lyE2smMIFs2GNInPQHLSzDbdbL0fFhd1LB5zWCHj6LRK34BjuKu6u893JEobsOSgUuA_IJx9oUzLvbH6QfGUjRFOBZWL4FVcs1Qsrrd0rIWUQef-AXoGozFBKVY1rngdhssMHcXBCfnHzDIfT80yHQ5V8-Di8mz3BtPWpUvr6WbwBTUwKUbzQhfKXg7-qem9W_C48-WerEC_RK5ty43d1dMdBc9MXg_OG181o0dmVOl9LFlBgqRac"
                  alt="Global" animate={{ scale: h2 ? 1.06 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 7. CTA — warm light card, no dark backgrounds
// ═══════════════════════════════════════════════════════════════════════════════
const CTA: FC = () => (
  <section style={{ padding: "80px 24px", background: T.bgLight }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Reveal variants={scaleIn}>
        <motion.div whileHover={{ boxShadow: "0 40px 100px rgba(236,91,19,0.18)" }}
          style={{ borderRadius: 48, padding: "80px 64px", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(145deg,#fff8f4 0%,#fff3ed 50%,#fff8f4 100%)", border: `1.5px solid rgba(236,91,19,0.16)`, boxShadow: "0 24px 64px rgba(236,91,19,0.09)" }}>
          <DotGrid opacity={0.05} />
          <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.14, 0.28, 0.14] }} transition={{ duration: 5, repeat: Infinity }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", aspectRatio: "1", borderRadius: "50%", background: "rgba(236,91,19,0.09)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: "inline-block", padding: "5px 14px", borderRadius: 9999, background: T.primaryFaint2, border: `1px solid rgba(236,91,19,0.22)`, fontSize: 11, fontWeight: 700, color: T.primary, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
              Ready to Evolve
            </motion.div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3.8rem)", color: T.text, marginBottom: 18, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Ready to activate your<br /><GradText animate>latent intelligence?</GradText>
            </h2>
            <p style={{ color: T.muted, fontSize: 16, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 44px" }}>
              Join forward-thinking organizations building the next generation of AI-powered products.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(236,91,19,0.4)" }} whileTap={{ scale: 0.97 }}
                style={{ background: T.grad, color: "#370e00", padding: "17px 40px", borderRadius: 16, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(236,91,19,0.25)" }}>
                Book Strategy Session
              </motion.button>
              <motion.button whileHover={{ scale: 1.04, borderColor: T.primary, color: T.primary }} whileTap={{ scale: 0.97 }}
                style={{ background: "transparent", color: T.muted, padding: "17px 40px", borderRadius: 16, fontWeight: 600, fontSize: 16, border: `1.5px solid rgba(236,91,19,0.22)`, cursor: "pointer", transition: "border-color 0.25s,color 0.25s" }}>
                Download Whitepaper
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
const AIVision: FC = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <style>{`
      * { box-sizing: border-box; margin: 0; padding: 0; }
      .material-symbols-outlined { font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
      body { background: #f8f6f6; }
      @media (max-width: 1024px) {
        .av-hero-grid, .av-process-grid, .av-why-grid { grid-template-columns: 1fr !important; }
        .av-hero-right { display: none !important; }
        .av-bento-grid { grid-template-columns: 1fr !important; }
        .av-cv-card { flex-direction: column !important; }
        .av-industries-grid { grid-template-columns: repeat(2,1fr) !important; }
      }
      @media (max-width: 640px) {
        .av-industries-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    <div style={{ fontFamily: "'Inter',sans-serif", background: T.bgLight, overflowX: "hidden" }}>
      <Hero />
      <Services />
      <TechStack />
      <ProcessSection />
      <Industries />
      <WhyUs />
      <CTA />
    </div>
  </>
);

export default AIVision;