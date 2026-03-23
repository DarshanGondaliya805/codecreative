import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#fffbf8", bgAlt: "#f8f6f4", bgCard: "#ffffff",
  orange: "#f5611b", orangeLight: "#ffb599", orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1", blueLight: "#9ecaff",
  text: "#1c0d05", muted: "#7a5a48",
  border: "rgba(245,97,27,0.15)",
  grad: "linear-gradient(135deg,#ffb599 0%,#f5611b 100%)",
};
const glass = {
  background: "rgba(255,181,153,0.11)",
  backdropFilter: "blur(20px)",
  border: `1px solid ${C.border}`,
};

const fadeUp:any = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.09, ease: [0.22,1,0.36,1] } }),
};
const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22,1,0.36,1] } }),
};
const fadeLeft:any = {
  hidden: { opacity: 0, x: -28 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] } }),
};

function Reveal({ children, variants = fadeUp, custom = 0, style = {} }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style}>{children}</motion.div>
  );
}

function AnimatedBar({ pct, color, delay = 0 }:any) {
  return (
    <div style={{ width: "100%", height: 4, background: "rgba(245,97,27,0.1)", borderRadius: 9999, overflow: "hidden", marginTop: 8 }}>
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.22,1,0.36,1] }}
        style={{ height: "100%", background: color, borderRadius: 9999 }} />
    </div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const bY = useTransform(scrollYProgress, [0,1], [0,100]);

  const archRows = [
    { icon:"web", label:"Frontend Layer", color:C.blue, pulse:true, border:"rgba(27,149,241,0.2)" },
    { icon:"api", label:"Core API & Logic", color:C.orange, pulse:false, border:"rgba(245,97,27,0.2)" },
    { icon:"database", label:"Database Cluster", color:C.orangeLight, pulse:false, border:"rgba(245,97,27,0.12)" },
  ];

  return (
    <section ref={ref} style={{ position:"relative", paddingTop:136, paddingBottom:96, overflow:"hidden", background:`radial-gradient(circle at 70% 30%,rgba(79,23,0,0.08) 0%,transparent 55%), ${C.bg}` }}>
      <motion.div style={{ y:bY, position:"absolute", top:"-10%", right:"-8%", width:"44%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(245,97,27,0.09) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="fs-hero-grid">
        {/* Left */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display:"inline-block", padding:"6px 16px", borderRadius:9999, background:"rgba(120,49,18,0.12)", color:C.orange, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:24 }}>
            Full Stack Expertise
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2.4rem,4.5vw,4.2rem)", fontWeight:800, color:C.text, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:20 }}>
            Complete{" "}
            <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
              style={{ background:`linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Full Stack
            </motion.span>{" "}Development Solutions
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color:C.muted, fontSize:17, maxWidth:480, marginBottom:36, lineHeight:1.8, fontWeight:300 }}>
            End-to-end web and application development services. We architect, build, and scale digital products from infrastructure to interface.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
              style={{ background:C.grad, color:"#370e00", padding:"15px 30px", borderRadius:14, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", boxShadow:"0 6px 20px rgba(245,97,27,0.3)" }}>
              Launch Project
            </motion.button>
            <motion.button whileHover={{ scale:1.03, background:"rgba(245,97,27,0.06)" }} whileTap={{ scale:0.97 }}
              style={{ ...glass, background:"rgba(245,97,27,0.04)", color:C.text, padding:"15px 30px", borderRadius:14, fontWeight:600, fontSize:15, cursor:"pointer" }}>
              View Architecture
            </motion.button>
          </motion.div>
        </div>

        {/* Right – Architecture Flow Card */}
        <Reveal variants={scaleIn} custom={1}>
          <motion.div whileHover={{ boxShadow:"0 28px 64px rgba(245,97,27,0.1)" }}
            style={{ ...glass, background:C.bgCard, borderRadius:32, padding:28 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {archRows.map((row, i) => (
                <div key={row.label}>
                  <motion.div initial={{ opacity:0, x:-18 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.4 + i * 0.2, duration:0.55, ease:[0.22,1,0.36,1] }}
                    whileHover={{ x:4, borderColor: row.color }}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px", borderRadius:16, background: i===1 ? "rgba(245,97,27,0.04)" : C.bgAlt, border:`1.5px solid ${row.border}`, transition:"border-color 0.3s,transform 0.3s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <span className="material-symbols-outlined" style={{ color:row.color, fontSize:20 }}>{row.icon}</span>
                      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:14, color:C.text }}>{row.label}</span>
                    </div>
                    {row.pulse ? (
                      <div style={{ display:"flex", gap:6 }}>
                        <motion.div animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }} transition={{ duration:1.2, repeat:Infinity }}
                          style={{ width:8, height:8, borderRadius:"50%", background:C.orange }} />
                        <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(245,97,27,0.3)" }} />
                      </div>
                    ) : i===1 ? (
                      <div style={{ height:4, width:48, background:"rgba(245,97,27,0.12)", borderRadius:9999, overflow:"hidden" }}>
                        <motion.div animate={{ x:["-100%","0%"] }} transition={{ duration:2, repeat:Infinity, ease:"linear" }}
                          style={{ height:"100%", width:"50%", background:C.grad, borderRadius:9999 }} />
                      </div>
                    ) : (
                      <span style={{ fontFamily:"monospace", fontSize:10, color:C.muted, fontWeight:600 }}>SYNCING...</span>
                    )}
                  </motion.div>
                  {i < archRows.length - 1 && (
                    <div style={{ display:"flex", justifyContent:"center", padding:"8px 0" }}>
                      <motion.span animate={{ y:[0,3,0] }} transition={{ duration:1.5, repeat:Infinity }}
                        className="material-symbols-outlined" style={{ color:"rgba(245,97,27,0.25)", fontSize:20 }}>south</motion.span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 2. SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"deployed_code", title:"Custom Web Apps", desc:"Tailored solutions built with modern frameworks for performance and scale." },
  { icon:"auto_awesome_motion", title:"Frontend Dev", desc:"Responsive, pixel-perfect interfaces with high-end UX animations." },
  { icon:"terminal", title:"Backend Engine", desc:"Robust server-side logic and optimized data processing systems." },
  { icon:"webhook", title:"API Integration", desc:"Seamless connectivity between internal systems and 3rd party services." },
  { icon:"storage", title:"Database Arch", desc:"Optimized schemas for SQL and NoSQL data structures." },
  { icon:"cloud_done", title:"Cloud Deployment", desc:"Automated CI/CD pipelines and high-availability cloud hosting." },
  { icon:"account_tree", title:"Microservices", desc:"Decoupled architecture for independent scaling and maintenance." },
  { icon:"build_circle", title:"Maintenance", desc:"Continuous updates, security patches, and performance monitoring." },
];

function Services() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:16 }}>Our Core Services</h2>
            <motion.div initial={{ width:0 }} whileInView={{ width:80 }} viewport={{ once:true }}
              transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              style={{ height:4, background:C.grad, borderRadius:9999, margin:"0 auto" }} />
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="fs-svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i % 4}>
              <motion.div
                whileHover={{ y:-6, background:"rgba(245,97,27,0.05)", borderColor:"rgba(245,97,27,0.3)", boxShadow:"0 20px 40px rgba(245,97,27,0.1)" }}
                style={{ ...glass, background:C.bgCard, borderRadius:24, padding:32, height:"100%", boxSizing:"border-box", cursor:"default", transition:"border-color 0.3s,background 0.3s" }}>
                <motion.span whileHover={{ scale:1.15, color:C.orange }}
                  className="material-symbols-outlined"
                  style={{ fontSize:36, color:C.orange, display:"block", marginBottom:20, fontVariationSettings:"'FILL' 1" }}>{s.icon}</motion.span>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1rem", color:C.text, marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. TECH STACK ───────────────────────────────────────────────────────────
const STACKS = [
  {
    icon:"monitor", label:"Frontend Stack", accent:C.blue, accentFaint:"rgba(27,149,241,0.08)",
    items:[{ name:"React / Next", pct:95 },{ name:"Vue / Nuxt", pct:80 },{ name:"Tailwind CSS", pct:98 },{ name:"TypeScript", pct:90 }],
  },
  {
    icon:"data_object", label:"Backend Stack", accent:C.orange, accentFaint:C.orangeFaint,
    items:[{ name:"Node / Express", pct:92 },{ name:"Django / Python", pct:75 },{ name:"Laravel / PHP", pct:85 },{ name:"Spring Boot", pct:70 }],
  },
  {
    icon:"database", label:"Data & Cloud", accent:C.orangeLight, accentFaint:"rgba(255,181,153,0.12)",
    items:[{ name:"PostgreSQL", pct:90 },{ name:"MongoDB", pct:88 },{ name:"Redis", pct:80 },{ name:"Firebase", pct:95 }],
  },
];

function TechStack() {
  return (
    <section style={{ padding:"96px 0", background:C.bg, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:40 }} className="fs-stack-grid">
          {STACKS.map((stack, si) => (
            <Reveal key={stack.label} variants={fadeUp} custom={si}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:32 }}>
                  <motion.div whileHover={{ scale:1.1, background:stack.accent }}
                    style={{ width:48, height:48, borderRadius:14, background:stack.accentFaint, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.3s" }}>
                    <span className="material-symbols-outlined" style={{ color:stack.accent, fontSize:22 }}>{stack.icon}</span>
                  </motion.div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.4rem", fontWeight:700, color:C.text }}>{stack.label}</h3>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {stack.items.map((item, ii) => (
                    <motion.div key={item.name}
                      whileHover={{ y:-3, boxShadow:"0 8px 20px rgba(245,97,27,0.08)" }}
                      style={{ background:C.bgCard, borderRadius:16, padding:"18px 18px 14px", borderLeft: ii===0 ? `3px solid ${stack.accent}` : "3px solid transparent", boxSizing:"border-box" }}>
                      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.muted, marginBottom:4 }}>{item.name}</div>
                      <AnimatedBar pct={item.pct} color={ii===0 ? stack.accent : `${stack.accent}88`} delay={si*0.1 + ii*0.08} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. DEV PROCESS ──────────────────────────────────────────────────────────
const STEPS = [
  { n:"1", label:"Analysis", desc:"Defining requirements & goals" },
  { n:"2", label:"Architecture", desc:"System design & logic flow" },
  { n:"3", label:"UI/UX", desc:"Prototyping visual excellence" },
  { n:"4", label:"Backend", desc:"Engine construction & APIs" },
  { n:"5", label:"QA/Test", desc:"Rigorous bug hunting & perf" },
  { n:"6", label:"Deployment", desc:"Going live to the world" },
];

function DevProcess() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, textAlign:"center", marginBottom:80 }}>The Neural Pathway</h2>
        </Reveal>
        <div style={{ position:"relative" }}>
          <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
            transition={{ duration:1.4, ease:[0.22,1,0.36,1] }}
            style={{ position:"absolute", top:30, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(245,97,27,0.3),rgba(245,97,27,0.5),rgba(245,97,27,0.3),transparent)`, transformOrigin:"left", zIndex:0 }}
            className="fs-proc-line" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:16, position:"relative", zIndex:1 }} className="fs-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} variants={fadeUp} custom={i}>
                <motion.div whileHover={{ y:-6 }}
                  style={{ ...glass, background:C.bgCard, borderRadius:24, padding:"24px 16px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                  <motion.div whileHover={{ scale:1.12, background:C.grad, color:"#370e00" }}
                    style={{ width:56, height:56, borderRadius:"50%", background: i===0 ? C.grad : C.bgCard, color: i===0 ? "#370e00" : C.orange, border: i===0 ? "none" : `2px solid rgba(245,97,27,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:16, marginBottom:16, boxShadow: i===0 ? "0 8px 24px rgba(245,97,27,0.35)" : "none", transition:"background 0.3s,color 0.3s" }}>
                    {s.n}
                  </motion.div>
                  <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:C.text, marginBottom:6 }}>{s.label}</h4>
                  <p style={{ fontSize:11, color:C.muted, lineHeight:1.55 }}>{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. ARCHITECTURE DIAGRAM ─────────────────────────────────────────────────
const ARCH_LAYERS = [
  { side:"left", label:"Layer 01", title:"User Interface", desc:"React/NextJS edge-rendered views.", accent:C.blue },
  { side:"left", label:"Layer 02", title:"State Management", desc:"TanStack Query & Zustand orchestration.", accent:C.blue },
  { side:"right", label:"Layer 03", title:"GraphQL/REST Gateway", desc:"Secure, type-safe data communication.", accent:C.orange },
  { side:"right", label:"Layer 04", title:"Worker Clusters", desc:"Asynchronous job processing engines.", accent:C.orange },
];

function ArchDiagram() {
  return (
    <section style={{ padding:"96px 0", background:C.bg, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ background:C.bgAlt, backgroundImage:`radial-gradient(circle at 2px 2px, rgba(245,97,27,0.08) 1px, transparent 0)`, backgroundSize:"40px 40px", borderRadius:48, padding:"56px 48px", position:"relative", overflow:"hidden" }}>
            <div style={{ maxWidth:560, marginBottom:56 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:12 }}>Systematic Flow Architecture</h2>
              <p style={{ color:C.muted, lineHeight:1.75 }}>We don't just write code; we architect resilient ecosystems where every layer communicates with surgical precision.</p>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:32 }} className="fs-arch-row">
              {/* Left layers */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:16 }}>
                {ARCH_LAYERS.filter(l=>l.side==="left").map((layer, i) => (
                  <Reveal key={layer.title} variants={fadeLeft} custom={i}>
                    <motion.div whileHover={{ x:6, borderColor:layer.accent }}
                      style={{ ...glass, background:C.bgCard, borderRadius:20, padding:"20px 24px", borderLeft:`3px solid rgba(27,149,241,0.25)`, transition:"border-color 0.3s" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:layer.accent, letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:4 }}>{layer.label}</span>
                      <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:C.text, fontSize:14, marginBottom:4 }}>{layer.title}</h4>
                      <p style={{ fontSize:12, color:C.muted }}>{layer.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              {/* Center hub */}
              <Reveal variants={scaleIn} custom={0}>
                <div style={{ position:"relative", padding:"32px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <motion.div animate={{ scale:[1,1.2,1], opacity:[0.2,0.4,0.2] }} transition={{ duration:3, repeat:Infinity }}
                    style={{ position:"absolute", width:140, height:140, borderRadius:"50%", background:C.grad, filter:"blur(50px)", pointerEvents:"none" }} />
                  <motion.div
                    animate={{ rotate:[0,360] }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
                    style={{ position:"absolute", width:120, height:120, borderRadius:"50%", border:`1px dashed rgba(245,97,27,0.2)` }} />
                  <motion.div whileHover={{ scale:1.08, boxShadow:"0 0 60px rgba(245,97,27,0.5)" }}
                    style={{ width:96, height:96, borderRadius:24, background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, boxShadow:"0 0 40px rgba(245,97,27,0.35)" }}>
                    <span className="material-symbols-outlined" style={{ color:"#370e00", fontSize:44 }}>hub</span>
                  </motion.div>
                </div>
              </Reveal>

              {/* Right layers */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:16 }}>
                {ARCH_LAYERS.filter(l=>l.side==="right").map((layer, i) => (
                  <Reveal key={layer.title} variants={fadeUp} custom={i}>
                    <motion.div whileHover={{ x:-6, borderColor:layer.accent }}
                      style={{ ...glass, background:C.bgCard, borderRadius:20, padding:"20px 24px", borderLeft:`3px solid rgba(245,97,27,0.2)`, transition:"border-color 0.3s" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:layer.accent, letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:4 }}>{layer.label}</span>
                      <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:C.text, fontSize:14, marginBottom:4 }}>{layer.title}</h4>
                      <p style={{ fontSize:12, color:C.muted }}>{layer.desc}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 6. WHY US ───────────────────────────────────────────────────────────────
const WHYS = [
  { icon:"speed", title:"Fast Performance", desc:"Lighthouse scores 90+ across all core web vitals and mobile responsiveness metrics." },
  { icon:"security", title:"Secure Apps", desc:"SOC2-ready development with built-in encryption and OWASP security standards." },
  { icon:"groups", title:"Dedicated Team", desc:"Expert developers assigned exclusively to your product lifecycle." },
  { icon:"rocket_launch", title:"Agile Process", desc:"Weekly sprints, transparent demos, and rapid iteration for faster TTM." },
];

function WhyUs() {
  const [imgHov, setImgHov] = useState(false);
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="fs-why-grid">
        <Reveal>
          <div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.5rem)", fontWeight:800, color:C.text, marginBottom:40, lineHeight:1.15 }}>
              Engineered for{" "}
              <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
                style={{ background:`linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Performance
              </motion.span>
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
              {WHYS.map((w, i) => (
                <Reveal key={w.title} variants={fadeUp} custom={i}>
                  <motion.div whileHover={{ y:-4 }}>
                    <motion.div whileHover={{ scale:1.1, background:C.grad }}
                      style={{ width:48, height:48, borderRadius:14, background:"rgba(245,97,27,0.08)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, transition:"background 0.3s" }}>
                      <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:22 }}>{w.icon}</span>
                    </motion.div>
                    <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:C.text, marginBottom:8, fontSize:15 }}>{w.title}</h4>
                    <p style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>{w.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variants={scaleIn} custom={0}>
          <div style={{ position:"relative" }}
            onMouseEnter={() => setImgHov(true)} onMouseLeave={() => setImgHov(false)}>
            <motion.img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7txMXjEgflaNkzxWkoNB70p1Rn2foAHd94jU8Q7dsZYXCvPYbMAXC3J3ua_4ioFSvjijuIKUInTP-MCpgywFQIghtRyTLEQaNHk3qmEWz-qkGlDX4WWHM2wsXkq6dPZjia1n0__qylShmb54sy0T2hYOyI5b-aQ5qTuwceztZl-lfRH-HxvEXl-Ox--WBqNbUCiinFUJas-RG4tnhsGbdmsegnWHDHC9ZDe94draFeJcmFIkM4LDAg9yY1v8iMk0nOSk-z89KvUw"
              alt="Server room"
              animate={{ filter: imgHov ? "grayscale(0%)" : "grayscale(60%)", opacity: imgHov ? 1 : 0.65 }}
              transition={{ duration:0.7 }}
              style={{ width:"100%", height:460, objectFit:"cover", borderRadius:40, display:"block" }} />
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,rgba(255,251,248,0.7),transparent 50%)`, borderRadius:40, pointerEvents:"none" }} />
            <motion.div whileHover={{ y:-4 }}
              style={{ position:"absolute", bottom:36, left:36, ...glass, background:"rgba(255,255,255,0.88)", padding:"20px 28px", borderRadius:20 }}>
              <motion.p animate={{ scale:[1,1.04,1] }} transition={{ duration:2.5, repeat:Infinity }}
                style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"1.6rem", color:C.text, marginBottom:4 }}>99.9%</motion.p>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>Uptime Guaranteed</p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 7. PORTFOLIO ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuAqhKxPtgGiJwHGQiPNoRD5FHVXQSUtnFr7cEAr5D5U9Ff3kql1u5ZPVWEVslU5AqgJn1fUB2kgmfnBK0QZRzpNJ60txqEUUrzCZJG5ezdlBQDrkNJhnpXR3QCtRs7dnwnfyKjNmyjhiEYe-a_ZbhFj7EzvXMXTfnafuV65ATZgOZoDjs-R-Q7As02b5p0GooLlXqG6S9LgmUU4GkBHqVwvS01-o3fstcyjzS5jymOshXm3goMzUNzpgOCPkCshQJIrPsE1rYUZX44",
    tag:"FINTECH PLATFORM", tagColor:C.orange, title:"Nova Ledger v2", desc:"Real-time cross-border payment architecture with 5ms latency processing.",
  },
  {
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDzz0Ou5iBIlAUmF34xfsj4xTEdit3iiVFQQc0cuR976Gdypc0CaNOmBpeYpclN9fqsUbXHlvIn-SOancsJXl5cfTRGooZ0QwhsxwKxIwkj10omQG8n4wfVAh7Ni-JBh4oCjW-faKjNgkX4fYHlDcSuIHsU07fwBw-VeHmTJvrdgFARJ36Lt9-PdHL9EB62TsA-J-QFzc6lsyFSU1q3kOm-NdgHuTBazJEqlxdd3udPQK7K3H_6l77BfCmJkahWtq7RtLaDZmN2IqM",
    tag:"E-HEALTH", tagColor:C.blue, title:"VitalGrid Analytics", desc:"HIPAA-compliant patient data management system with AI predictive diagnostics.",
  },
];

function Portfolio() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:20 }}>
            <div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:8 }}>Recent Benchmarks</h2>
              <p style={{ color:C.muted, maxWidth:480, lineHeight:1.7 }}>A glimpse into the high-performance applications we've built for industry leaders.</p>
            </div>
            <motion.button whileHover={{ x:6 }} style={{ display:"flex", alignItems:"center", gap:6, color:C.orange, fontWeight:700, background:"none", border:"none", cursor:"pointer", fontSize:14 }}>
              View Full Portfolio
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>arrow_forward</span>
            </motion.button>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }} className="fs-portfolio-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} variants={scaleIn} custom={i}>
              <motion.div whileHover={{ y:-6 }} style={{ cursor:"pointer" }}>
                <div style={{ position:"relative", borderRadius:36, overflow:"hidden", height:380, background:C.bgAlt }}>
                  <motion.img src={p.img} alt={p.title}
                    whileHover={{ scale:1.07 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.75, display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(28,13,5,0.75) 0%,transparent 55%)" }} />
                  <div style={{ position:"absolute", bottom:32, left:32, right:32 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:p.tagColor, letterSpacing:"0.1em", display:"block", marginBottom:6 }}>{p.tag}</span>
                    <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"1.6rem", color:"#fff", marginBottom:8 }}>{p.title}</h3>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>{p.desc}</p>
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

// ─── 8. CTA ──────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding:"80px 24px", background:C.bgAlt }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <Reveal variants={scaleIn}>
          <motion.div style={{ background:C.grad, borderRadius:48, padding:"80px 64px", textAlign:"center", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(245,97,27,0.35)" }}>
            <motion.div animate={{ scale:[1,1.3,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:4, repeat:Infinity }}
              style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"70%", aspectRatio:"1", borderRadius:"50%", background:"rgba(255,255,255,0.15)", filter:"blur(60px)", pointerEvents:"none" }} />
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:800, color:"#370e00", marginBottom:16, letterSpacing:"-0.02em", position:"relative" }}>
              Ready to Build Your Full-Stack Application?
            </h2>
            <p style={{ fontSize:17, color:"rgba(55,14,0,0.7)", marginBottom:48, maxWidth:560, margin:"0 auto 48px", lineHeight:1.75, position:"relative" }}>
              Join 50+ partners who have scaled their vision with Neural Amber's architecture.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap", position:"relative" }}>
              <motion.button whileHover={{ scale:1.05, boxShadow:"0 16px 40px rgba(28,13,5,0.25)" }} whileTap={{ scale:0.97 }}
                style={{ background:C.bgCard, color:C.text, padding:"16px 40px", borderRadius:18, fontWeight:700, fontSize:16, border:"none", cursor:"pointer" }}>
                Start My Project
              </motion.button>
              <motion.button whileHover={{ scale:1.04, background:"rgba(55,14,0,0.1)" }} whileTap={{ scale:0.97 }}
                style={{ background:"transparent", color:"#370e00", padding:"16px 40px", borderRadius:18, fontWeight:700, fontSize:16, border:"2px solid rgba(55,14,0,0.25)", cursor:"pointer" }}>
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 9. CONTACT ──────────────────────────────────────────────────────────────
function Contact() {
  const iS:any = { width:"100%", background:C.bgAlt, border:`1.5px solid rgba(245,97,27,0.15)`, borderRadius:12, padding:"13px 16px", color:C.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif" };
  const focus = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur  = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.15)"; e.target.style.boxShadow="none"; };

  return (
    <section style={{ padding:"96px 0 96px", background:C.text }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }} className="fs-contact-grid">
        {/* Info */}
        <Reveal variants={fadeLeft}>
          <div>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:"#f6ded3", marginBottom:20, lineHeight:1.15 }}>Let's Connect the Dots.</h2>
            <p style={{ color:"rgba(246,222,211,0.65)", fontSize:16, lineHeight:1.8, marginBottom:48, maxWidth:400 }}>
              Whether you're a startup looking for an MVP or an enterprise scaling complex architecture, we're here to help.
            </p>
            {[{ icon:"mail", value:"hello@neuralamber.com" },{ icon:"location_on", value:"San Francisco, CA" }].map((c, i) => (
              <motion.div key={c.value} variants={fadeLeft} custom={i} initial="hidden" whileInView="visible" viewport={{ once:true }}
                style={{ display:"flex", alignItems:"center", gap:18, marginBottom:24 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(255,181,153,0.1)", border:"1px solid rgba(255,181,153,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="material-symbols-outlined" style={{ color:C.orangeLight, fontSize:20 }}>{c.icon}</span>
                </div>
                <span style={{ fontSize:15, fontWeight:500, color:"#f6ded3" }}>{c.value}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal variants={scaleIn}>
          <div style={{ background:C.bgCard, borderRadius:36, padding:"44px 40px", boxShadow:"0 24px 64px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[["Full Name","John Doe","text"],["Email Address","john@example.com","email"]].map(([l,p,t]) => (
                  <div key={l}><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{l}</label><input type={t} placeholder={p} style={iS} onFocus={focus} onBlur={blur} /></div>
                ))}
              </div>
              <div><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Project Scope</label>
                <select style={iS} onFocus={focus} onBlur={blur}>{["MVP Development","Enterprise Scaling","API Integration","Code Audit"].map(o=><option key={o}>{o}</option>)}</select>
              </div>
              <div><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your technical vision..." style={{ ...iS, resize:"vertical" }} onFocus={focus} onBlur={blur} /></div>
              <motion.button whileHover={{ scale:1.02, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.98 }}
                style={{ width:"100%", background:C.grad, color:"#370e00", padding:"16px", borderRadius:12, fontWeight:700, fontSize:15, border:"none", cursor:"pointer" }}>
                Send Request
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function FullStack() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;}
        body{background:#fffbf8;}
        @media(max-width:1024px){
          .fs-hero-grid,.fs-why-grid,.fs-contact-grid{grid-template-columns:1fr!important;}
          .fs-svc-grid{grid-template-columns:repeat(2,1fr)!important;}
          .fs-stack-grid{grid-template-columns:1fr!important;}
          .fs-portfolio-grid{grid-template-columns:1fr!important;}
          .fs-steps{grid-template-columns:repeat(3,1fr)!important;}
          .fs-proc-line{display:none!important;}
          .fs-arch-row{flex-direction:column!important;}
        }
        @media(max-width:640px){
          .fs-svc-grid{grid-template-columns:1fr!important;}
          .fs-steps{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
      <div style={{ fontFamily:"'Inter',sans-serif", background:"#fffbf8", color:C.text, overflowX:"hidden" }}>
        <Hero />
        <Services />
        <TechStack />
        <DevProcess />
        <ArchDiagram />
        <WhyUs />
        <Portfolio />
        <CTA />
        <Contact />
      </div>
    </>
  );
}