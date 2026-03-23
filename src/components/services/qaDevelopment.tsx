<<<<<<< HEAD
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#fffbf8", bgAlt: "#f8f6f4", bgCard: "#ffffff",
  orange: "#f5611b", orangeLight: "#ffb599", orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1",
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
  hidden: { opacity: 0, x: -32 },
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

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const blobY = useTransform(scrollYProgress, [0,1], [0,80]);

  return (
    <section ref={ref} style={{ position:"relative", minHeight:"90vh", display:"flex", alignItems:"center", background:`radial-gradient(circle at 70% 30%, rgba(79,23,0,0.12) 0%, transparent 55%), ${C.bg}`, overflow:"hidden", paddingTop:80, paddingBottom:64 }}>
      <motion.div style={{ y:blobY, position:"absolute", top:"10%", right:"5%", width:"42%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(245,97,27,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", position:"relative", zIndex:10 }} className="qa-hero-grid">
        {/* LEFT */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:9999, background:C.orangeFaint, border:`1px solid rgba(245,97,27,0.22)`, marginBottom:24, width:"fit-content" }}>
            <motion.span animate={{ scale:[1,1.6,1] }} transition={{ duration:2, repeat:Infinity }}
              style={{ width:6, height:6, borderRadius:"50%", background:C.orange, display:"block" }} />
            <span style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:"0.12em", textTransform:"uppercase" }}>Next-Gen Quality Engineering</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2.4rem,4.5vw,4rem)", fontWeight:800, color:C.text, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:20 }}>
            Reliable QA & Automation Testing for{" "}
            <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
              style={{ background:`linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              High-Quality Software
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color:C.muted, fontSize:17, maxWidth:500, marginBottom:36, lineHeight:1.8, fontWeight:300 }}>
            Faster releases, improved reliability, and bug-free applications through Neural Amber's intelligent automation frameworks and meticulous testing protocols.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
              style={{ background:C.grad, color:"#370e00", padding:"15px 28px", borderRadius:14, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, boxShadow:"0 6px 20px rgba(245,97,27,0.3)" }}>
              Improve Software Quality
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>arrow_forward</span>
            </motion.button>
            <motion.button whileHover={{ scale:1.03, background:"rgba(245,97,27,0.06)" }} whileTap={{ scale:0.97 }}
              style={{ ...glass, background:"rgba(245,97,27,0.04)", color:C.text, padding:"15px 28px", borderRadius:14, fontWeight:600, fontSize:15, cursor:"pointer" }}>
              View Testing Suites
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <Reveal variants={scaleIn} custom={1}>
          <div style={{ position:"relative" }}>
            <motion.div animate={{ scale:[1,1.15,1], opacity:[0.4,0.7,0.4] }} transition={{ duration:4, repeat:Infinity }}
              style={{ position:"absolute", inset:-16, background:"rgba(245,97,27,0.08)", filter:"blur(80px)", borderRadius:"50%", pointerEvents:"none" }} />
            <motion.div whileHover={{ scale:1.02 }} style={{ ...glass, borderRadius:32, padding:16, border:`1px solid rgba(245,97,27,0.15)`, overflow:"hidden", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXvZ5RJ8tjSnJOpbtmEYRwqEfTSguq6ez98B9K0aGNeQLixF8KGse6MukaqgJKK8Xz6gxAAM-z9mHVh3dg9eTxFI4WFk9q3QFPhjpOKcibJsZY9zOo2cC7yrelZ4qfmC5v0pNHkSi8zi0L3UNADYRoMOY_CpeOQzO9xQMVLFgJs9D0tSXO0YIHDRVMqW3PDQuY8X84fDIaspxu3mPE2URER70aBjLFkN7qPFScgQTy1Q1PMhhAUcRju4x8j24lRI5QSkdqPliwFCg"
                alt="Testing dashboard" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:24, opacity:0.8, mixBlendMode:"multiply" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(255,251,248,0.85),transparent 55%)", borderRadius:24 }} />
              {/* Floating badge */}
              <motion.div
                animate={{ y:[0,-6,0] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
                style={{ position:"absolute", top:24, left:24, ...glass, background:"rgba(255,255,255,0.85)", padding:"10px 16px", borderRadius:16, display:"flex", alignItems:"center", gap:10, border:`1px solid rgba(245,97,27,0.2)` }}>
                <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}
                  className="material-symbols-outlined" style={{ color:"#22c55e", fontSize:20, fontVariationSettings:"'FILL' 1" }}>check_circle</motion.span>
                <div>
                  <p style={{ fontWeight:700, fontSize:12, color:C.text }}>Test Passed</p>
                  <p style={{ fontSize:10, color:C.muted }}>Regression Suite v2.4</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 2. SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"settings_suggest", title:"Automated Testing", desc:"Scripted test cases for maximum speed and coverage." },
  { icon:"touch_app", title:"Manual Testing", desc:"Expert exploratory and usability testing by QA specialists." },
  { icon:"hub", title:"Functional Testing", desc:"Ensuring every feature works exactly as designed." },
  { icon:"speed", title:"Performance Testing", desc:"Load, stress, and scalability testing for high traffic." },
  { icon:"shield_lock", title:"Security Testing", desc:"Vulnerability scanning and penetration testing." },
  { icon:"api", title:"API Testing", desc:"Validation of back-end integrity and communication." },
  { icon:"smartphone", title:"Mobile App Testing", desc:"Cross-device compatibility and native experience audit." },
  { icon:"history", title:"Regression Testing", desc:"Ensuring new updates don't break existing features." },
];

function Services() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:12 }}>Precision Testing Services</h2>
            <p style={{ color:C.muted, maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>Comprehensive quality assurance across the entire development lifecycle, powered by advanced automation.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="qa-svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i % 4}>
              <motion.div
                whileHover={{ y:-6, background:"rgba(245,97,27,0.05)", borderColor:"rgba(245,97,27,0.35)", boxShadow:"0 20px 40px rgba(245,97,27,0.1)" }}
                style={{ background:C.bgCard, borderRadius:24, padding:32, border:`1.5px solid rgba(245,97,27,0.1)`, height:"100%", boxSizing:"border-box", cursor:"default", transition:"border-color 0.3s" }}>
                <motion.div
                  whileHover={{ scale:1.12, background:C.grad }}
                  style={{ width:48, height:48, borderRadius:14, background:C.orangeFaint, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, transition:"background 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:22 }}>{s.icon}</span>
                </motion.div>
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
const TOOLS = ["Selenium","Cypress","Playwright","Appium","JUnit","TestNG","Postman","Jenkins","Docker"];

function TechStack() {
  return (
    <section style={{ padding:"80px 0", background:C.bg, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:800, color:C.text, marginBottom:8 }}>Our Tech Stack</h2>
            <p style={{ color:C.muted }}>Industry-leading tools integrated into our workflow.</p>
          </div>
        </Reveal>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, maxWidth:860, margin:"0 auto" }}>
          {TOOLS.map((tool, i) => (
            <Reveal key={tool} variants={scaleIn} custom={i % 5}>
              <motion.div
                whileHover={{ y:-6, borderColor:"rgba(245,97,27,0.5)", boxShadow:"0 12px 24px rgba(245,97,27,0.12)", background:C.orangeFaint }}
                style={{ ...glass, background:C.bgCard, padding:"12px 24px", borderRadius:9999, cursor:"default", transition:"border-color 0.3s,background 0.3s" }}>
                <span style={{ fontWeight:600, fontSize:14, color:C.text }}>{tool}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. PROCESS LIFECYCLE ────────────────────────────────────────────────────
const LIFECYCLE = [
  { step:"01", name:"Analysis", icon:"search_insights" },
  { step:"02", name:"Planning", icon:"architecture" },
  { step:"03", name:"Design", icon:"draw" },
  { step:"04", name:"Scripting", icon:"code" },
  { step:"05", name:"Execution", icon:"rocket_launch" },
  { step:"06", name:"Reporting", icon:"assignment_turned_in" },
];

function Lifecycle() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ marginBottom:56 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:14 }}>The Lifecycle of Quality</h2>
            <motion.div initial={{ width:0 }} whileInView={{ width:96 }} viewport={{ once:true }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              style={{ height:4, background:C.grad, borderRadius:9999 }} />
          </div>
        </Reveal>
        {/* Grid with dividers */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", border:`1px solid rgba(245,97,27,0.12)`, borderRadius:36, overflow:"hidden" }} className="qa-lifecycle-grid">
          {LIFECYCLE.map((item, i) => (
            <Reveal key={item.name} variants={fadeUp} custom={i}>
              <motion.div
                whileHover={{ background:"rgba(245,97,27,0.05)" }}
                style={{ padding:"32px 16px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", background:C.bgCard, borderRight: i < 5 ? `1px solid rgba(245,97,27,0.1)` : "none", transition:"background 0.3s", height:"100%", boxSizing:"border-box" }}>
                <span style={{ fontSize:11, fontFamily:"monospace", color:"rgba(245,97,27,0.4)", marginBottom:14, fontWeight:600 }}>{item.step}</span>
                <motion.div
                  whileHover={{ borderColor:"rgba(245,97,27,0.5)", background:C.orangeFaint }}
                  style={{ width:52, height:52, borderRadius:"50%", border:`1.5px solid rgba(245,97,27,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, transition:"all 0.3s" }}>
                  <motion.span whileHover={{ color:C.orange }} className="material-symbols-outlined" style={{ color:"rgba(28,13,5,0.3)", fontSize:22, transition:"color 0.3s" }}>{item.icon}</motion.span>
                </motion.div>
                <h4 style={{ fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:C.text }}>{item.name}</h4>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. CI/CD + BENEFITS ─────────────────────────────────────────────────────
const PIPELINE = [
  { dot:true, label:"CODE PUSHED", auto:false, icon:null },
  { dot:false, label:"UNIT & INTEGRATION TESTS", auto:true, icon:"science" },
  { dot:false, label:"DEPLOY TO STAGING", auto:false, icon:"cloud_upload" },
  { dot:false, label:"SMOKE & REGRESSION TESTS", auto:true, icon:"monitoring" },
];

const BENEFITS = [
  { title:"Faster Software Releases", desc:"Reduce release cycles from weeks to days with robust automation." },
  { title:"Scalable Test Infrastructure", desc:"Cloud-native testing environments that grow with your project." },
  { title:"Reduced Development Risk", desc:"Identify critical bottlenecks and bugs before they reach production." },
];

function CICDSection() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="qa-cicd-grid">
        {/* Pipeline visual */}
        <Reveal variants={scaleIn}>
          <motion.div whileHover={{ boxShadow:"0 24px 64px rgba(245,97,27,0.1)" }}
            style={{ ...glass, background:C.bgCard, borderRadius:40, padding:40, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,rgba(245,97,27,0.04),transparent)`, pointerEvents:"none" }} />
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1.4rem", color:C.text, marginBottom:32 }}>CI/CD Pipeline Integration</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:0, position:"relative", zIndex:1 }}>
              {PIPELINE.map((step, i) => (
                <div key={i}>
                  <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.18, duration:0.5, ease:[0.22,1,0.36,1] }}
                    whileHover={{ scale:1.02 }}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderRadius:14, background: step.auto ? "rgba(245,97,27,0.06)" : "rgba(245,97,27,0.03)", border: step.auto ? `1px solid rgba(245,97,27,0.2)` : `1px solid rgba(245,97,27,0.1)` }}>
                    {step.dot ? (
                      <motion.span animate={{ scale:[1,1.6,1] }} transition={{ duration:1.5, repeat:Infinity }}
                        style={{ width:8, height:8, borderRadius:"50%", background:C.orange, display:"block", flexShrink:0 }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: step.auto ? C.orange : "rgba(28,13,5,0.3)", fontSize:18, flexShrink:0 }}>{step.icon}</span>
                    )}
                    <span style={{ fontFamily:"monospace", fontSize:12, fontWeight: step.auto ? 700 : 400, color: step.auto ? C.text : C.muted }}>{step.label}</span>
                    {step.auto && (
                      <span style={{ marginLeft:"auto", fontSize:11, background:C.orangeFaint, color:C.orange, padding:"3px 10px", borderRadius:9999, fontWeight:700 }}>AUTO</span>
                    )}
                  </motion.div>
                  {i < PIPELINE.length - 1 && (
                    <div style={{ width:2, height:24, background:"rgba(245,97,27,0.15)", marginLeft:22, borderRadius:9999, borderLeft:`2px dashed rgba(245,97,27,0.25)` }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Benefits */}
        <div>
          <Reveal>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:40, lineHeight:1.15 }}>Eliminate Risk with Continuous Quality Assurance</h2>
          </Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} variants={fadeLeft} custom={i}>
                <motion.div whileHover={{ x:4 }} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                  <motion.div whileHover={{ scale:1.15, background:C.grad }}
                    style={{ marginTop:2, width:28, height:28, borderRadius:8, background:C.orangeFaint, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                    <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:16 }}>done</span>
                  </motion.div>
                  <div>
                    <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:C.text, marginBottom:6, fontSize:15 }}>{b.title}</h4>
                    <p style={{ color:C.muted, fontSize:13, lineHeight:1.7 }}>{b.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. WHY US ───────────────────────────────────────────────────────────────
const WHY = [
  { icon:"psychology", title:"Domain Expertise", desc:"Deep understanding of Fintech, Healthtech, and E-commerce testing landscapes." },
  { icon:"data_object", title:"Custom Frameworks", desc:"We build tailor-made testing frameworks that integrate seamlessly with your stack." },
  { icon:"groups", title:"Seamless Integration", desc:"Our QA engineers work as an extension of your development team." },
];

function WhyUs() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:24 }}>
            <div style={{ maxWidth:480 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:12 }}>Why Neural Amber?</h2>
              <p style={{ color:C.muted, lineHeight:1.7 }}>We don't just find bugs; we engineer quality into your architecture.</p>
            </div>
            <div style={{ display:"flex", gap:0 }}>
              {[{ val:"99%", label:"Reliability" },{ val:"10x", label:"Speed" }].map((stat, i) => (
                <div key={stat.label} style={{ textAlign:"center", padding:"0 28px", borderRight: i===0 ? `1px solid rgba(245,97,27,0.2)` : "none" }}>
                  <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.15, duration:0.5 }}
                    style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"2.2rem", fontWeight:800, color:C.orange }}>{stat.val}</motion.p>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="qa-why-grid">
          {WHY.map((w, i) => (
            <Reveal key={w.title} variants={fadeUp} custom={i}>
              <motion.div whileHover={{ y:-8, boxShadow:"0 24px 48px rgba(245,97,27,0.1)" }}
                style={{ background:C.bgCard, borderRadius:28, padding:40, border:`1.5px solid rgba(245,97,27,0.1)` }}>
                <motion.span whileHover={{ scale:1.15, color:C.orange }}
                  className="material-symbols-outlined" style={{ fontSize:40, color:C.orange, display:"block", marginBottom:24 }}>{w.icon}</motion.span>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.3rem", fontWeight:700, color:C.text, marginBottom:12 }}>{w.title}</h3>
                <p style={{ color:C.muted, fontSize:14, lineHeight:1.75 }}>{w.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. CONTACT / CTA SPLIT ──────────────────────────────────────────────────
function ContactCTA() {
  const iS:any = {
    width:"100%", background:C.bgAlt, border:`1.5px solid rgba(245,97,27,0.15)`,
    borderRadius:12, padding:"13px 16px", color:C.text, fontSize:14, outline:"none",
    boxSizing:"border-box", fontFamily:"'Inter',sans-serif",
  };
  const focus = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur  = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.15)"; e.target.style.boxShadow="none"; };

  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:`1px solid rgba(245,97,27,0.12)`, borderRadius:48, overflow:"hidden" }} className="qa-split-grid">
          {/* CTA */}
          <Reveal variants={fadeLeft}>
            <div style={{ padding:"64px 56px", background:C.bgAlt, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", height:"100%" }}>
              <motion.div animate={{ scale:[1,1.3,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:5, repeat:Infinity }}
                style={{ position:"absolute", top:0, right:0, width:220, height:220, background:"rgba(245,97,27,0.12)", borderRadius:"50%", filter:"blur(60px)", transform:"translate(30%,-30%)", pointerEvents:"none" }} />
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:800, color:C.text, marginBottom:16, lineHeight:1.15, position:"relative" }}>
                Ensure<br />Software Quality
              </h2>
              <p style={{ color:C.muted, fontSize:16, lineHeight:1.8, marginBottom:36, maxWidth:380, position:"relative" }}>
                Ready to automate your workflows and ship faster? Let's build a robust QA strategy together.
              </p>
              <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
                style={{ background:C.grad, color:"#370e00", padding:"16px 32px", borderRadius:14, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", width:"fit-content", position:"relative" }}>
                Improve Software Quality
              </motion.button>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variants={fadeUp} custom={1}>
            <div style={{ padding:"64px 56px", background:C.bg, height:"100%" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["Full Name","John Doe","text"],["Email","john@company.com","email"]].map(([l,p,t]) => (
                    <div key={l}>
                      <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{l}</label>
                      <input type={t} placeholder={p} style={iS} onFocus={focus} onBlur={blur} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Service Interest</label>
                  <select style={iS} onFocus={focus} onBlur={blur}>
                    {["Automation Framework Design","Full Cycle QA","Performance Audit","Security Testing"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Project Details</label>
                  <textarea rows={4} placeholder="Tell us about your testing needs..." style={{ ...iS, resize:"vertical" }} onFocus={focus} onBlur={blur} />
                </div>
                <motion.button whileHover={{ scale:1.02, background:C.grad, color:"#370e00", boxShadow:"0 14px 36px rgba(245,97,27,0.35)" }} whileTap={{ scale:0.98 }}
                  style={{ width:"100%", background:C.text, color:"#fff", padding:"16px", borderRadius:12, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", transition:"background 0.3s,color 0.3s,box-shadow 0.3s" }}>
                  Send Inquiry
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Qadevelopment() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;}
        body{background:#fffbf8;}
        @media(max-width:1024px){
          .qa-hero-grid,.qa-cicd-grid,.qa-split-grid{grid-template-columns:1fr!important;}
          .qa-svc-grid{grid-template-columns:repeat(2,1fr)!important;}
          .qa-why-grid{grid-template-columns:1fr!important;}
          .qa-lifecycle-grid{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:640px){
          .qa-svc-grid{grid-template-columns:1fr!important;}
          .qa-lifecycle-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
      <div style={{ fontFamily:"'Inter',sans-serif", background:"#fffbf8", color:C.text, overflowX:"hidden" }}>
        <Hero />
        <Services />
        <TechStack />
        <Lifecycle />
        <CICDSection />
        <WhyUs />
        <ContactCTA />
      </div>
    </>
  );
=======
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#fffbf8", bgAlt: "#f8f6f4", bgCard: "#ffffff",
  orange: "#f5611b", orangeLight: "#ffb599", orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1",
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
  hidden: { opacity: 0, x: -32 },
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

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const blobY = useTransform(scrollYProgress, [0,1], [0,80]);

  return (
    <section ref={ref} style={{ position:"relative", minHeight:"90vh", display:"flex", alignItems:"center", background:`radial-gradient(circle at 70% 30%, rgba(79,23,0,0.12) 0%, transparent 55%), ${C.bg}`, overflow:"hidden", paddingTop:80, paddingBottom:64 }}>
      <motion.div style={{ y:blobY, position:"absolute", top:"10%", right:"5%", width:"42%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(245,97,27,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", position:"relative", zIndex:10 }} className="qa-hero-grid">
        {/* LEFT */}
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:9999, background:C.orangeFaint, border:`1px solid rgba(245,97,27,0.22)`, marginBottom:24, width:"fit-content" }}>
            <motion.span animate={{ scale:[1,1.6,1] }} transition={{ duration:2, repeat:Infinity }}
              style={{ width:6, height:6, borderRadius:"50%", background:C.orange, display:"block" }} />
            <span style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:"0.12em", textTransform:"uppercase" }}>Next-Gen Quality Engineering</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2.4rem,4.5vw,4rem)", fontWeight:800, color:C.text, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:20 }}>
            Reliable QA & Automation Testing for{" "}
            <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
              style={{ background:`linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              High-Quality Software
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color:C.muted, fontSize:17, maxWidth:500, marginBottom:36, lineHeight:1.8, fontWeight:300 }}>
            Faster releases, improved reliability, and bug-free applications through Neural Amber's intelligent automation frameworks and meticulous testing protocols.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
              style={{ background:C.grad, color:"#370e00", padding:"15px 28px", borderRadius:14, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, boxShadow:"0 6px 20px rgba(245,97,27,0.3)" }}>
              Improve Software Quality
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>arrow_forward</span>
            </motion.button>
            <motion.button whileHover={{ scale:1.03, background:"rgba(245,97,27,0.06)" }} whileTap={{ scale:0.97 }}
              style={{ ...glass, background:"rgba(245,97,27,0.04)", color:C.text, padding:"15px 28px", borderRadius:14, fontWeight:600, fontSize:15, cursor:"pointer" }}>
              View Testing Suites
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <Reveal variants={scaleIn} custom={1}>
          <div style={{ position:"relative" }}>
            <motion.div animate={{ scale:[1,1.15,1], opacity:[0.4,0.7,0.4] }} transition={{ duration:4, repeat:Infinity }}
              style={{ position:"absolute", inset:-16, background:"rgba(245,97,27,0.08)", filter:"blur(80px)", borderRadius:"50%", pointerEvents:"none" }} />
            <motion.div whileHover={{ scale:1.02 }} style={{ ...glass, borderRadius:32, padding:16, border:`1px solid rgba(245,97,27,0.15)`, overflow:"hidden", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXvZ5RJ8tjSnJOpbtmEYRwqEfTSguq6ez98B9K0aGNeQLixF8KGse6MukaqgJKK8Xz6gxAAM-z9mHVh3dg9eTxFI4WFk9q3QFPhjpOKcibJsZY9zOo2cC7yrelZ4qfmC5v0pNHkSi8zi0L3UNADYRoMOY_CpeOQzO9xQMVLFgJs9D0tSXO0YIHDRVMqW3PDQuY8X84fDIaspxu3mPE2URER70aBjLFkN7qPFScgQTy1Q1PMhhAUcRju4x8j24lRI5QSkdqPliwFCg"
                alt="Testing dashboard" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:24, opacity:0.8, mixBlendMode:"multiply" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(255,251,248,0.85),transparent 55%)", borderRadius:24 }} />
              {/* Floating badge */}
              <motion.div
                animate={{ y:[0,-6,0] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
                style={{ position:"absolute", top:24, left:24, ...glass, background:"rgba(255,255,255,0.85)", padding:"10px 16px", borderRadius:16, display:"flex", alignItems:"center", gap:10, border:`1px solid rgba(245,97,27,0.2)` }}>
                <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}
                  className="material-symbols-outlined" style={{ color:"#22c55e", fontSize:20, fontVariationSettings:"'FILL' 1" }}>check_circle</motion.span>
                <div>
                  <p style={{ fontWeight:700, fontSize:12, color:C.text }}>Test Passed</p>
                  <p style={{ fontSize:10, color:C.muted }}>Regression Suite v2.4</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 2. SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"settings_suggest", title:"Automated Testing", desc:"Scripted test cases for maximum speed and coverage." },
  { icon:"touch_app", title:"Manual Testing", desc:"Expert exploratory and usability testing by QA specialists." },
  { icon:"hub", title:"Functional Testing", desc:"Ensuring every feature works exactly as designed." },
  { icon:"speed", title:"Performance Testing", desc:"Load, stress, and scalability testing for high traffic." },
  { icon:"shield_lock", title:"Security Testing", desc:"Vulnerability scanning and penetration testing." },
  { icon:"api", title:"API Testing", desc:"Validation of back-end integrity and communication." },
  { icon:"smartphone", title:"Mobile App Testing", desc:"Cross-device compatibility and native experience audit." },
  { icon:"history", title:"Regression Testing", desc:"Ensuring new updates don't break existing features." },
];

function Services() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:12 }}>Precision Testing Services</h2>
            <p style={{ color:C.muted, maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>Comprehensive quality assurance across the entire development lifecycle, powered by advanced automation.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="qa-svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i % 4}>
              <motion.div
                whileHover={{ y:-6, background:"rgba(245,97,27,0.05)", borderColor:"rgba(245,97,27,0.35)", boxShadow:"0 20px 40px rgba(245,97,27,0.1)" }}
                style={{ background:C.bgCard, borderRadius:24, padding:32, border:`1.5px solid rgba(245,97,27,0.1)`, height:"100%", boxSizing:"border-box", cursor:"default", transition:"border-color 0.3s" }}>
                <motion.div
                  whileHover={{ scale:1.12, background:C.grad }}
                  style={{ width:48, height:48, borderRadius:14, background:C.orangeFaint, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, transition:"background 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:22 }}>{s.icon}</span>
                </motion.div>
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
const TOOLS = ["Selenium","Cypress","Playwright","Appium","JUnit","TestNG","Postman","Jenkins","Docker"];

function TechStack() {
  return (
    <section style={{ padding:"80px 0", background:C.bg, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:800, color:C.text, marginBottom:8 }}>Our Tech Stack</h2>
            <p style={{ color:C.muted }}>Industry-leading tools integrated into our workflow.</p>
          </div>
        </Reveal>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, maxWidth:860, margin:"0 auto" }}>
          {TOOLS.map((tool, i) => (
            <Reveal key={tool} variants={scaleIn} custom={i % 5}>
              <motion.div
                whileHover={{ y:-6, borderColor:"rgba(245,97,27,0.5)", boxShadow:"0 12px 24px rgba(245,97,27,0.12)", background:C.orangeFaint }}
                style={{ ...glass, background:C.bgCard, padding:"12px 24px", borderRadius:9999, cursor:"default", transition:"border-color 0.3s,background 0.3s" }}>
                <span style={{ fontWeight:600, fontSize:14, color:C.text }}>{tool}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. PROCESS LIFECYCLE ────────────────────────────────────────────────────
const LIFECYCLE = [
  { step:"01", name:"Analysis", icon:"search_insights" },
  { step:"02", name:"Planning", icon:"architecture" },
  { step:"03", name:"Design", icon:"draw" },
  { step:"04", name:"Scripting", icon:"code" },
  { step:"05", name:"Execution", icon:"rocket_launch" },
  { step:"06", name:"Reporting", icon:"assignment_turned_in" },
];

function Lifecycle() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ marginBottom:56 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:14 }}>The Lifecycle of Quality</h2>
            <motion.div initial={{ width:0 }} whileInView={{ width:96 }} viewport={{ once:true }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
              style={{ height:4, background:C.grad, borderRadius:9999 }} />
          </div>
        </Reveal>
        {/* Grid with dividers */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", border:`1px solid rgba(245,97,27,0.12)`, borderRadius:36, overflow:"hidden" }} className="qa-lifecycle-grid">
          {LIFECYCLE.map((item, i) => (
            <Reveal key={item.name} variants={fadeUp} custom={i}>
              <motion.div
                whileHover={{ background:"rgba(245,97,27,0.05)" }}
                style={{ padding:"32px 16px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", background:C.bgCard, borderRight: i < 5 ? `1px solid rgba(245,97,27,0.1)` : "none", transition:"background 0.3s", height:"100%", boxSizing:"border-box" }}>
                <span style={{ fontSize:11, fontFamily:"monospace", color:"rgba(245,97,27,0.4)", marginBottom:14, fontWeight:600 }}>{item.step}</span>
                <motion.div
                  whileHover={{ borderColor:"rgba(245,97,27,0.5)", background:C.orangeFaint }}
                  style={{ width:52, height:52, borderRadius:"50%", border:`1.5px solid rgba(245,97,27,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, transition:"all 0.3s" }}>
                  <motion.span whileHover={{ color:C.orange }} className="material-symbols-outlined" style={{ color:"rgba(28,13,5,0.3)", fontSize:22, transition:"color 0.3s" }}>{item.icon}</motion.span>
                </motion.div>
                <h4 style={{ fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:C.text }}>{item.name}</h4>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. CI/CD + BENEFITS ─────────────────────────────────────────────────────
const PIPELINE = [
  { dot:true, label:"CODE PUSHED", auto:false, icon:null },
  { dot:false, label:"UNIT & INTEGRATION TESTS", auto:true, icon:"science" },
  { dot:false, label:"DEPLOY TO STAGING", auto:false, icon:"cloud_upload" },
  { dot:false, label:"SMOKE & REGRESSION TESTS", auto:true, icon:"monitoring" },
];

const BENEFITS = [
  { title:"Faster Software Releases", desc:"Reduce release cycles from weeks to days with robust automation." },
  { title:"Scalable Test Infrastructure", desc:"Cloud-native testing environments that grow with your project." },
  { title:"Reduced Development Risk", desc:"Identify critical bottlenecks and bugs before they reach production." },
];

function CICDSection() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="qa-cicd-grid">
        {/* Pipeline visual */}
        <Reveal variants={scaleIn}>
          <motion.div whileHover={{ boxShadow:"0 24px 64px rgba(245,97,27,0.1)" }}
            style={{ ...glass, background:C.bgCard, borderRadius:40, padding:40, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,rgba(245,97,27,0.04),transparent)`, pointerEvents:"none" }} />
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1.4rem", color:C.text, marginBottom:32 }}>CI/CD Pipeline Integration</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:0, position:"relative", zIndex:1 }}>
              {PIPELINE.map((step, i) => (
                <div key={i}>
                  <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.18, duration:0.5, ease:[0.22,1,0.36,1] }}
                    whileHover={{ scale:1.02 }}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderRadius:14, background: step.auto ? "rgba(245,97,27,0.06)" : "rgba(245,97,27,0.03)", border: step.auto ? `1px solid rgba(245,97,27,0.2)` : `1px solid rgba(245,97,27,0.1)` }}>
                    {step.dot ? (
                      <motion.span animate={{ scale:[1,1.6,1] }} transition={{ duration:1.5, repeat:Infinity }}
                        style={{ width:8, height:8, borderRadius:"50%", background:C.orange, display:"block", flexShrink:0 }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: step.auto ? C.orange : "rgba(28,13,5,0.3)", fontSize:18, flexShrink:0 }}>{step.icon}</span>
                    )}
                    <span style={{ fontFamily:"monospace", fontSize:12, fontWeight: step.auto ? 700 : 400, color: step.auto ? C.text : C.muted }}>{step.label}</span>
                    {step.auto && (
                      <span style={{ marginLeft:"auto", fontSize:11, background:C.orangeFaint, color:C.orange, padding:"3px 10px", borderRadius:9999, fontWeight:700 }}>AUTO</span>
                    )}
                  </motion.div>
                  {i < PIPELINE.length - 1 && (
                    <div style={{ width:2, height:24, background:"rgba(245,97,27,0.15)", marginLeft:22, borderRadius:9999, borderLeft:`2px dashed rgba(245,97,27,0.25)` }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Benefits */}
        <div>
          <Reveal>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:40, lineHeight:1.15 }}>Eliminate Risk with Continuous Quality Assurance</h2>
          </Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} variants={fadeLeft} custom={i}>
                <motion.div whileHover={{ x:4 }} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                  <motion.div whileHover={{ scale:1.15, background:C.grad }}
                    style={{ marginTop:2, width:28, height:28, borderRadius:8, background:C.orangeFaint, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                    <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:16 }}>done</span>
                  </motion.div>
                  <div>
                    <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:C.text, marginBottom:6, fontSize:15 }}>{b.title}</h4>
                    <p style={{ color:C.muted, fontSize:13, lineHeight:1.7 }}>{b.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. WHY US ───────────────────────────────────────────────────────────────
const WHY = [
  { icon:"psychology", title:"Domain Expertise", desc:"Deep understanding of Fintech, Healthtech, and E-commerce testing landscapes." },
  { icon:"data_object", title:"Custom Frameworks", desc:"We build tailor-made testing frameworks that integrate seamlessly with your stack." },
  { icon:"groups", title:"Seamless Integration", desc:"Our QA engineers work as an extension of your development team." },
];

function WhyUs() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:24 }}>
            <div style={{ maxWidth:480 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:800, color:C.text, marginBottom:12 }}>Why Neural Amber?</h2>
              <p style={{ color:C.muted, lineHeight:1.7 }}>We don't just find bugs; we engineer quality into your architecture.</p>
            </div>
            <div style={{ display:"flex", gap:0 }}>
              {[{ val:"99%", label:"Reliability" },{ val:"10x", label:"Speed" }].map((stat, i) => (
                <div key={stat.label} style={{ textAlign:"center", padding:"0 28px", borderRight: i===0 ? `1px solid rgba(245,97,27,0.2)` : "none" }}>
                  <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.15, duration:0.5 }}
                    style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"2.2rem", fontWeight:800, color:C.orange }}>{stat.val}</motion.p>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="qa-why-grid">
          {WHY.map((w, i) => (
            <Reveal key={w.title} variants={fadeUp} custom={i}>
              <motion.div whileHover={{ y:-8, boxShadow:"0 24px 48px rgba(245,97,27,0.1)" }}
                style={{ background:C.bgCard, borderRadius:28, padding:40, border:`1.5px solid rgba(245,97,27,0.1)` }}>
                <motion.span whileHover={{ scale:1.15, color:C.orange }}
                  className="material-symbols-outlined" style={{ fontSize:40, color:C.orange, display:"block", marginBottom:24 }}>{w.icon}</motion.span>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.3rem", fontWeight:700, color:C.text, marginBottom:12 }}>{w.title}</h3>
                <p style={{ color:C.muted, fontSize:14, lineHeight:1.75 }}>{w.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. CONTACT / CTA SPLIT ──────────────────────────────────────────────────
function ContactCTA() {
  const iS:any = {
    width:"100%", background:C.bgAlt, border:`1.5px solid rgba(245,97,27,0.15)`,
    borderRadius:12, padding:"13px 16px", color:C.text, fontSize:14, outline:"none",
    boxSizing:"border-box", fontFamily:"'Inter',sans-serif",
  };
  const focus = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur  = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.15)"; e.target.style.boxShadow="none"; };

  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:`1px solid rgba(245,97,27,0.12)`, borderRadius:48, overflow:"hidden" }} className="qa-split-grid">
          {/* CTA */}
          <Reveal variants={fadeLeft}>
            <div style={{ padding:"64px 56px", background:C.bgAlt, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", height:"100%" }}>
              <motion.div animate={{ scale:[1,1.3,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:5, repeat:Infinity }}
                style={{ position:"absolute", top:0, right:0, width:220, height:220, background:"rgba(245,97,27,0.12)", borderRadius:"50%", filter:"blur(60px)", transform:"translate(30%,-30%)", pointerEvents:"none" }} />
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:800, color:C.text, marginBottom:16, lineHeight:1.15, position:"relative" }}>
                Ensure<br />Software Quality
              </h2>
              <p style={{ color:C.muted, fontSize:16, lineHeight:1.8, marginBottom:36, maxWidth:380, position:"relative" }}>
                Ready to automate your workflows and ship faster? Let's build a robust QA strategy together.
              </p>
              <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
                style={{ background:C.grad, color:"#370e00", padding:"16px 32px", borderRadius:14, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", width:"fit-content", position:"relative" }}>
                Improve Software Quality
              </motion.button>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variants={fadeUp} custom={1}>
            <div style={{ padding:"64px 56px", background:C.bg, height:"100%" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["Full Name","John Doe","text"],["Email","john@company.com","email"]].map(([l,p,t]) => (
                    <div key={l}>
                      <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{l}</label>
                      <input type={t} placeholder={p} style={iS} onFocus={focus} onBlur={blur} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Service Interest</label>
                  <select style={iS} onFocus={focus} onBlur={blur}>
                    {["Automation Framework Design","Full Cycle QA","Performance Audit","Security Testing"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Project Details</label>
                  <textarea rows={4} placeholder="Tell us about your testing needs..." style={{ ...iS, resize:"vertical" }} onFocus={focus} onBlur={blur} />
                </div>
                <motion.button whileHover={{ scale:1.02, background:C.grad, color:"#370e00", boxShadow:"0 14px 36px rgba(245,97,27,0.35)" }} whileTap={{ scale:0.98 }}
                  style={{ width:"100%", background:C.text, color:"#fff", padding:"16px", borderRadius:12, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", transition:"background 0.3s,color 0.3s,box-shadow 0.3s" }}>
                  Send Inquiry
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Qadevelopment() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;}
        body{background:#fffbf8;}
        @media(max-width:1024px){
          .qa-hero-grid,.qa-cicd-grid,.qa-split-grid{grid-template-columns:1fr!important;}
          .qa-svc-grid{grid-template-columns:repeat(2,1fr)!important;}
          .qa-why-grid{grid-template-columns:1fr!important;}
          .qa-lifecycle-grid{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:640px){
          .qa-svc-grid{grid-template-columns:1fr!important;}
          .qa-lifecycle-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
      <div style={{ fontFamily:"'Inter',sans-serif", background:"#fffbf8", color:C.text, overflowX:"hidden" }}>
        <Hero />
        <Services />
        <TechStack />
        <Lifecycle />
        <CICDSection />
        <WhyUs />
        <ContactCTA />
      </div>
    </>
  );
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
}