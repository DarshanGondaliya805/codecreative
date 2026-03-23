import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const C = {
  bg: "#fffbf8", bgAlt: "#f8f6f4", bgCard: "#ffffff",
  orange: "#f5611b", orangeLight: "#ffb599", orangeFaint: "rgba(245,97,27,0.07)",
  blue: "#1b95f1", blueLight: "#9ecaff",
  text: "#1c0d05", muted: "#7a5a48", mutedLight: "#a98a7f",
  border: "rgba(245,97,27,0.15)",
  grad: "linear-gradient(135deg,#ffb599 0%,#f5611b 100%)",
};
const glass = { background: "rgba(255,181,153,0.12)", backdropFilter: "blur(16px)", border: `1px solid ${C.border}` };

const fadeUp:any = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.09, ease: [0.22,1,0.36,1] } }),
};
const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.55, delay: i * 0.09, ease: [0.22,1,0.36,1] } }),
};

function Reveal({ children, variants = fadeUp, custom = 0, style = {} }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} style={style}>{children}</motion.div>
  );
}

function Counter({ to, suffix = "", prefix = "" }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (inView && !started.current) {
    started.current = true;
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(cur));
    }, 16);
  }
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const bY = useTransform(scrollYProgress, [0,1], [0,100]);
  const bars = [40,60,30,85,50];
  const barsH = [80,95,70,50,90];
  const [hov, setHov] = useState(false);

  return (
    <section ref={ref} style={{ position:"relative", minHeight:"90vh", display:"flex", alignItems:"center", background:`radial-gradient(circle at 50% 50%,#fff2eb 0%,${C.bg} 100%)`, overflow:"hidden", padding:"96px 0 80px" }}>
      <motion.div style={{ y:bY, position:"absolute", top:"-8%", left:"-12%", width:"44%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(245,97,27,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
      <motion.div style={{ y:bY, position:"absolute", bottom:"-8%", right:"-12%", width:"38%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(27,149,241,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", position:"relative", zIndex:10 }} className="tm-hero-grid">
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:9999, background:C.orangeFaint, border:`1px solid rgba(245,97,27,0.22)`, marginBottom:28 }}>
            <motion.span animate={{ scale:[1,1.6,1], opacity:[1,0.6,1] }} transition={{ duration:2, repeat:Infinity }}
              style={{ width:8, height:8, borderRadius:"50%", background:C.orange, display:"block", boxShadow:"0 0 8px #ffb599" }} />
            <span style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:"0.12em", textTransform:"uppercase" }}>Intelligence-Driven Marketing</span>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2.4rem,4.5vw,4.2rem)", fontWeight:800, color:C.text, lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:24 }}>
            Grow Your Business with{" "}
            <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:4, repeat:Infinity, ease:"linear" }}
              style={{ background:`linear-gradient(90deg,${C.orange},#ff8c5a,${C.orange})`, backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Powerful
            </motion.span>{" "}Digital Marketing
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ color:C.muted, fontSize:17, maxWidth:500, marginBottom:40, lineHeight:1.8, fontWeight:300 }}>
            We combine neural analytics with creative kinetic energy to amplify your brand's voice across the digital void.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale:1.04, boxShadow:"0 14px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.97 }}
              style={{ background:C.grad, color:"#370e00", padding:"16px 32px", borderRadius:16, fontWeight:700, fontSize:15, border:"none", cursor:"pointer", boxShadow:"0 6px 20px rgba(245,97,27,0.3)" }}>
              Audit My Strategy
            </motion.button>
            <motion.button whileHover={{ scale:1.03, background:"rgba(245,97,27,0.07)" }} whileTap={{ scale:0.97 }}
              style={{ background:"rgba(245,97,27,0.04)", color:C.text, padding:"16px 32px", borderRadius:16, fontWeight:600, fontSize:15, border:`1.5px solid rgba(245,97,27,0.2)`, cursor:"pointer" }}>
              View Success Stories
            </motion.button>
          </motion.div>
        </div>
        <Reveal variants={scaleIn} custom={1}>
          <motion.div onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
            style={{ ...glass, background:C.bgCard, borderRadius:28, padding:28, position:"relative", overflow:"hidden", boxShadow:"0 24px 64px rgba(245,97,27,0.1)" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaqLf6-rowQCcSZ0cQF6G-gEFIz9YFkNRDlbQpTMo93iQN-htFsI9bd93ikv6BOwnVfsuxyY8vdrrDb_rxi_MM4UYDT1pE9LIaIe_8wtxT5bryK9Vxcve9kqCQwS0eIY_9j5YjJrceAIbGRHQ5LgcSIrAosqcQ2aumV5emVsNA1wfdW_6VgLFEF3dKPgknckqK09tb65dKuGv-NMt18YTd4Thm4aJquHgo1dMoCWH6g0WYlHZqX86sKfA7E6FJfthU3bGKfyJRNfg"
              alt="Analytics" style={{ width:"100%", borderRadius:16, opacity:0.8, display:"block" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"45%", background:"linear-gradient(to top,rgba(255,251,248,0.95),transparent)" }} />
            <div style={{ position:"absolute", bottom:28, left:28, right:28, height:100, display:"flex", alignItems:"flex-end", gap:8 }}>
              {bars.map((h, i) => (
                <motion.div key={i} animate={{ height:`${hov ? barsH[i] : h}%` }}
                  transition={{ duration:0.7, delay:i*0.06, ease:[0.22,1,0.36,1] }}
                  style={{ flex:1, borderRadius:"6px 6px 0 0", background: i%2===0 ? "rgba(245,97,27,0.3)" : C.grad }} />
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SVCS = [
  { icon:"search", title:"SEO Strategy", desc:"Climb the ranks with semantic optimization and technical excellence." },
  { icon:"share", title:"Social Media", desc:"Build kinetic communities that resonate with your brand voice." },
  { icon:"ads_click", title:"PPC Management", desc:"Laser-targeted advertising that maximizes every dollar spent." },
  { icon:"edit_note", title:"Content Hub", desc:"Narratives that convert prospects into lifelong brand advocates." },
  { icon:"alternate_email", title:"Email Marketing", desc:"Automated workflows that deliver the right message at the right time." },
  { icon:"query_stats", title:"Conversion (CRO)", desc:"A/B testing and behavioral analysis to refine your sales funnel." },
  { icon:"verified_user", title:"Brand Integrity", desc:"Proactive reputation management and sentiment monitoring." },
  { icon:"group_work", title:"Affiliate Networks", desc:"Scalable partnership programs that extend your market reach." },
];

function Services() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <div style={{ marginBottom:64 }}>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, marginBottom:12, letterSpacing:"-0.02em" }}>Full-Spectrum Growth</h2>
            <p style={{ color:C.muted, fontSize:16, maxWidth:520, lineHeight:1.75 }}>Precision-engineered services designed to dominate every digital frontier.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="tm-svc-grid">
          {SVCS.map((s, i) => (
            <Reveal key={s.title} variants={fadeUp} custom={i%4}>
              <motion.div whileHover={{ y:-6, background:C.grad, boxShadow:"0 20px 40px rgba(245,97,27,0.25)" }}
                style={{ background:C.bgCard, borderRadius:28, padding:32, border:`1.5px solid rgba(245,97,27,0.1)`, height:"100%", boxSizing:"border-box", cursor:"default" }}
                className="tm-svc-card">
                <span className="material-symbols-outlined" style={{ fontSize:36, color:C.orange, display:"block", marginBottom:20 }} data-icon={s.icon}>{s.icon}</span>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1rem", marginBottom:10 }} className="tm-svc-title">{s.title}</h3>
                <p style={{ fontSize:13, lineHeight:1.7 }} className="tm-svc-desc">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHANNELS ────────────────────────────────────────────────────────────────
const CHANNELS = [
  { icon:"ads_click", name:"Google Ads", color:C.blue },
  { icon:"social_leaderboard", name:"Facebook", color:C.orange },
  { icon:"photo_camera", name:"Instagram", color:"#f5611b" },
  { icon:"work", name:"LinkedIn", color:C.blueLight },
  { icon:"smart_display", name:"YouTube", color:"#ef4444" },
  { icon:"chat", name:"Twitter / X", color:C.blue },
];

function Channels() {
  return (
    <section style={{ padding:"80px 0", background:C.bg, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:800, color:C.text, textAlign:"center", marginBottom:56 }}>Omnichannel Dominance</h2>
        </Reveal>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:20 }}>
          {CHANNELS.map((ch, i) => (
            <Reveal key={ch.name} variants={scaleIn} custom={i}>
              <motion.div whileHover={{ y:-8, borderColor:"rgba(245,97,27,0.4)", boxShadow:"0 16px 32px rgba(245,97,27,0.12)" }}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"18px 28px", ...glass, background:C.bgCard, borderRadius:20, cursor:"default" }}>
                <motion.span whileHover={{ scale:1.2, rotate:8 }} className="material-symbols-outlined" style={{ fontSize:22, color:ch.color }}>{ch.icon}</motion.span>
                <span style={{ fontWeight:600, fontSize:14, color:C.text }}>{ch.name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
const STEPS = [
  { n:"01", label:"Research", desc:"Deep-dive into market voids and competitor DNA.", hi:true },
  { n:"02", label:"Strategy", desc:"Blueprint for high-velocity growth.", hi:false },
  { n:"03", label:"Execution", desc:"Precision launch of tactical assets.", hi:false },
  { n:"04", label:"Optimization", desc:"Iterative tuning for peak performance.", hi:false },
  { n:"05", label:"Analysis", desc:"Extracting neural insights from data.", hi:false },
  { n:"06", label:"Reporting", desc:"Crystal clear results and future forecasting.", hi:true },
];

function Process() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, textAlign:"center", marginBottom:80 }}>The Kinetic Workflow</h2>
        </Reveal>
        <div style={{ position:"relative" }}>
          <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
            transition={{ duration:1.4, ease:[0.22,1,0.36,1] }}
            style={{ position:"absolute", top:38, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(245,97,27,0.3),rgba(245,97,27,0.5),rgba(245,97,27,0.3),transparent)`, transformOrigin:"left", zIndex:0 }}
            className="tm-proc-line" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:24, position:"relative", zIndex:1 }} className="tm-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} variants={fadeUp} custom={i}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                  <motion.div whileHover={{ scale:1.12, background:C.grad, boxShadow:"0 12px 28px rgba(245,97,27,0.35)", color:"#370e00" }}
                    style={{ width:64, height:64, borderRadius:"50%", background:s.hi?C.grad:C.bgCard, color:s.hi?"#370e00":C.orange, border:s.hi?"none":`2px solid rgba(245,97,27,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:14, marginBottom:20, boxShadow:s.hi?"0 8px 24px rgba(245,97,27,0.35)":"0 4px 12px rgba(245,97,27,0.08)" }}>
                    {s.n}
                  </motion.div>
                  <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:C.text, marginBottom:6 }}>{s.label}</h4>
                  <p style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
function Bar({ pct, color, delay=0 }:any) {
  return (
    <div style={{ width:"100%", background:"rgba(245,97,27,0.1)", height:8, borderRadius:9999, overflow:"hidden" }}>
      <motion.div initial={{ width:0 }} whileInView={{ width:`${pct}%` }} viewport={{ once:true }}
        transition={{ duration:1.2, delay, ease:[0.22,1,0.36,1] }}
        style={{ height:"100%", background:color, borderRadius:9999 }} />
    </div>
  );
}

function Analytics() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="tm-analytics-grid">
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, marginBottom:20 }}>Data That Breathes</h2>
          <p style={{ color:C.muted, fontSize:16, lineHeight:1.8, marginBottom:40 }}>We don't just show numbers; we tell stories. Our proprietary dashboarding tools provide real-time kinetic visualisations of your marketing ecosystem.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[{ label:"Traffic Growth", val:"+124%", pct:85, color:C.orange, delay:0.2 },{ label:"Lead Gen Efficiency", val:"+68%", pct:68, color:C.blue, delay:0.4 }].map(m => (
              <Reveal key={m.label}>
                <motion.div whileHover={{ y:-3, boxShadow:"0 16px 32px rgba(245,97,27,0.1)" }}
                  style={{ ...glass, background:C.bgCard, borderRadius:20, padding:"24px 28px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                    <span style={{ fontWeight:700, color:C.text, fontSize:14 }}>{m.label}</span>
                    <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                      style={{ fontWeight:800, color:m.color, fontSize:16 }}>{m.val}</motion.span>
                  </div>
                  <Bar pct={m.pct} color={m.color} delay={m.delay} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          <Reveal variants={scaleIn} custom={0}>
            <motion.div whileHover={{ y:-8, boxShadow:"0 24px 48px rgba(245,97,27,0.18)" }}
              style={{ background:"rgba(245,97,27,0.06)", border:`1.5px solid rgba(245,97,27,0.2)`, borderRadius:40, padding:40, textAlign:"center" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"3rem", fontWeight:800, color:C.text, marginBottom:8 }}><Counter to={98} suffix="%" /></div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>Client Retention</div>
            </motion.div>
          </Reveal>
          <Reveal variants={scaleIn} custom={1} style={{ marginTop:48 }}>
            <motion.div whileHover={{ y:-8, boxShadow:"0 24px 48px rgba(27,149,241,0.18)" }}
              style={{ background:"rgba(27,149,241,0.06)", border:`1.5px solid rgba(27,149,241,0.2)`, borderRadius:40, padding:40, textAlign:"center" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"3rem", fontWeight:800, color:C.text, marginBottom:8 }}><Counter to={15} suffix="x" /></div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>Avg ROI</div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ──────────────────────────────────────────────────────────────────
const WHY = [
  { icon:"precision_manufacturing", title:"Data Driven", desc:"We move beyond gut feelings, using algorithmic intelligence to guide every pivot.", accent:C.orange },
  { icon:"target", title:"Targeted Reach", desc:"Hyper-local or global expansion with surgically precise audience segments.", accent:C.blue },
  { icon:"insights", title:"Higher Conversions", desc:"Focusing on the metrics that matter: revenue, profit, and sustainable growth.", accent:C.orange },
];

function WhyUs() {
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, textAlign:"center", marginBottom:64, letterSpacing:"-0.02em" }}>Engineered for Excellence</h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="tm-why-grid">
          {WHY.map((w, i) => (
            <Reveal key={w.title} variants={fadeUp} custom={i}>
              <motion.div whileHover={{ y:-8, boxShadow:"0 24px 48px rgba(245,97,27,0.1)" }}
                style={{ background:C.bgCard, borderRadius:32, padding:40 }}>
                <motion.div whileHover={{ scale:1.1, background:C.grad }}
                  style={{ width:52, height:52, borderRadius:16, background:`rgba(${w.accent===C.blue?"27,149,241":"245,97,27"},0.1)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, transition:"background 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ color:w.accent, fontSize:24 }}>{w.icon}</span>
                </motion.div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.4rem", fontWeight:700, color:C.text, marginBottom:12 }}>{w.title}</h3>
                <p style={{ color:C.muted, fontSize:14, lineHeight:1.75 }}>{w.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ──────────────────────────────────────────────────────────────
const INDS = [
  { icon:"shopping_cart", name:"E-commerce" },{ icon:"medical_services", name:"Healthcare" },
  { icon:"real_estate_agent", name:"Real Estate" },{ icon:"account_balance", name:"Finance" },
  { icon:"school", name:"Education" },{ icon:"flight_takeoff", name:"Travel" },{ icon:"cloud", name:"SaaS" },
];

function Industries() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
        <Reveal>
          <p style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:12 }}>Specialized Sectors</p>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:800, color:C.text, marginBottom:60 }}>Industries We Accelerate</h2>
        </Reveal>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:36 }}>
          {INDS.map((ind, i) => (
            <Reveal key={ind.name} variants={scaleIn} custom={i}>
              <motion.div whileHover={{ scale:1.15, opacity:1 }} initial={{ opacity:0.6 }} animate={{ opacity:0.6 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, cursor:"default" }}>
                <motion.span whileHover={{ color:C.orange, rotate:8 }} className="material-symbols-outlined" style={{ fontSize:36, color:C.muted }}>{ind.icon}</motion.span>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>{ind.name}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ────────────────────────────────────────────────────────────
function CaseBars({ bars, color, hov }:any) {
  return (
    <div style={{ height:160, display:"flex", alignItems:"flex-end", gap:6 }}>
      {bars.map(([idle, active]:any, i:any) => (
        <motion.div key={i} animate={{ height:`${hov?active:idle}%` }}
          transition={{ duration:0.6, delay:i*0.06, ease:[0.22,1,0.36,1] }}
          style={{ flex:1, borderRadius:"6px 6px 0 0", background:i<2?"rgba(245,97,27,0.15)":color }} />
      ))}
    </div>
  );
}

function CaseStudies() {
  const [h1,setH1] = useState(false), [h2,setH2] = useState(false);
  return (
    <section style={{ padding:"96px 0", background:C.bgAlt, overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, marginBottom:64 }}>Impact Evidence</h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }} className="tm-cases-grid">
          {[
            { title:"FinTech Disruptor", sub:"SEO & Content Marketing", stat:"+340%", statLabel:"Organic Traffic", statColor:C.orange, bars:[[10,20],[15,35],[25,60],[40,80],[60,100]], hov:h1, setH:setH1 },
            { title:"Global SaaS Lead", sub:"PPC & Paid Social", stat:"2.5x", statLabel:"Lead Volume", statColor:C.blue, bars:[[30,30],[45,45],[70,70],[85,85],[95,95]], hov:h2, setH:setH2 },
          ].map((c, i) => (
            <Reveal key={c.title} variants={scaleIn} custom={i}>
              <motion.div onHoverStart={()=>c.setH(true)} onHoverEnd={()=>c.setH(false)}
                whileHover={{ y:-6, boxShadow:"0 24px 48px rgba(245,97,27,0.1)" }}
                style={{ ...glass, background:C.bgCard, borderRadius:36, overflow:"hidden" }}>
                <div style={{ padding:36 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
                    <div>
                      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1.3rem", color:C.text, marginBottom:6 }}>{c.title}</h3>
                      <p style={{ fontSize:13, color:c.statColor, fontWeight:600 }}>{c.sub}</p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <motion.div animate={{ scale:c.hov?1.1:1 }}
                        style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"2rem", color:c.statColor }}>{c.stat}</motion.div>
                      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, marginTop:2 }}>{c.statLabel}</div>
                    </div>
                  </div>
                  <CaseBars bars={c.bars} color={c.statColor} hov={c.hov} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding:"96px 0", background:C.bg }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 24px" }}>
        <Reveal variants={scaleIn}>
          <motion.div style={{ background:C.grad, borderRadius:56, padding:"80px 64px", textAlign:"center", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(245,97,27,0.35)" }}>
            <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.25,0.15] }} transition={{ duration:4, repeat:Infinity }}
              style={{ position:"absolute", top:"-20%", right:"-10%", width:"50%", aspectRatio:"1", borderRadius:"50%", background:"rgba(255,255,255,0.15)", filter:"blur(40px)", pointerEvents:"none" }} />
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:800, color:"#370e00", marginBottom:16, letterSpacing:"-0.02em", position:"relative" }}>Scale Your Marketing</h2>
            <p style={{ fontSize:18, color:"rgba(55,14,0,0.75)", marginBottom:48, maxWidth:520, margin:"0 auto 48px", lineHeight:1.7, position:"relative" }}>
              Ready to transcend the digital noise? Let's engineer your growth trajectory together.
            </p>
            <motion.button whileHover={{ scale:1.06, boxShadow:"0 16px 40px rgba(28,13,5,0.3)" }} whileTap={{ scale:0.97 }}
              style={{ background:C.bgCard, color:C.text, padding:"18px 48px", borderRadius:20, fontWeight:700, fontSize:17, border:"none", cursor:"pointer", position:"relative" }}>
              Start Your Expedition
            </motion.button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const iS:any = { width:"100%", background:C.bgAlt, border:`1.5px solid rgba(245,97,27,0.15)`, borderRadius:14, padding:"14px 18px", color:C.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif" };
  const focus = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(245,97,27,0.08)"; };
  const blur  = (e:any) => { e.target.style.borderColor="rgba(245,97,27,0.15)"; e.target.style.boxShadow="none"; };

  return (
    <section style={{ padding:"96px 0", background:C.bgAlt }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }} className="tm-contact-grid">
        <Reveal>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, color:C.text, marginBottom:20, letterSpacing:"-0.02em" }}>Initiate Transmission</h2>
          <p style={{ color:C.muted, fontSize:16, lineHeight:1.8, marginBottom:48 }}>Tell us about your objectives. Our architects will analyze your presence and propose a tactical roadmap.</p>
          {[{ icon:"mail", label:"Email", value:"hello@techmark.agency" },{ icon:"call", label:"Phone", value:"+1 (555) 800-GROW" }].map((c, i) => (
            <motion.div key={c.label} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ display:"flex", alignItems:"center", gap:20, marginBottom:28 }}>
              <motion.div whileHover={{ scale:1.1, background:C.grad }}
                style={{ width:56, height:56, borderRadius:18, background:C.bgCard, boxShadow:"0 4px 16px rgba(245,97,27,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.3s" }}>
                <span className="material-symbols-outlined" style={{ color:C.orange, fontSize:22 }}>{c.icon}</span>
              </motion.div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted, marginBottom:2 }}>{c.label}</div>
                <div style={{ fontWeight:700, color:C.text, fontSize:15 }}>{c.value}</div>
              </div>
            </motion.div>
          ))}
        </Reveal>
        <Reveal variants={scaleIn}>
          <div style={{ background:C.bgCard, borderRadius:40, padding:"48px 44px", boxShadow:"0 16px 48px rgba(245,97,27,0.07)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[["Name","John Doe","text"],["Email","john@company.com","email"]].map(([l,p,t]) => (
                  <div key={l}><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{l}</label><input type={t} placeholder={p} style={iS} onFocus={focus} onBlur={blur} /></div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[["Phone","+1 234 567","tel"],["Website","https://yourbrand.com","url"]].map(([l,p,t]) => (
                  <div key={l}><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{l}</label><input type={t} placeholder={p} style={iS} onFocus={focus} onBlur={blur} /></div>
                ))}
              </div>
              <div><label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Marketing Goals</label>
                <textarea rows={4} placeholder="How can we help you grow?" style={{ ...iS, resize:"vertical" }} onFocus={focus} onBlur={blur} /></div>
              <motion.button whileHover={{ scale:1.02, boxShadow:"0 16px 36px rgba(245,97,27,0.4)" }} whileTap={{ scale:0.98 }}
                style={{ width:"100%", background:C.grad, color:"#370e00", padding:"17px", borderRadius:14, fontWeight:700, fontSize:16, border:"none", cursor:"pointer" }}>
                Send Brief
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Digitalmarketing() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:middle;}
        body{background:#fffbf8;}
        .tm-svc-card:hover .tm-svc-title{color:#fff!important;}
        .tm-svc-card:hover .tm-svc-desc{color:rgba(255,255,255,0.8)!important;}
        .tm-svc-card:hover .material-symbols-outlined{color:#fff!important;}
        @media(max-width:1024px){
          .tm-hero-grid,.tm-analytics-grid,.tm-contact-grid{grid-template-columns:1fr!important;}
          .tm-svc-grid{grid-template-columns:repeat(2,1fr)!important;}
          .tm-why-grid,.tm-cases-grid{grid-template-columns:1fr!important;}
          .tm-steps{grid-template-columns:repeat(3,1fr)!important;}
          .tm-proc-line{display:none!important;}
        }
        @media(max-width:640px){
          .tm-svc-grid{grid-template-columns:1fr!important;}
          .tm-steps{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
      <div style={{ fontFamily:"'Inter',sans-serif", background:"#fffbf8", color:C.text, overflowX:"hidden" }}>
        <Hero />
        <Services />
        <Channels />
        <Process />
        <Analytics />
        <WhyUs />
        <Industries />
        <CaseStudies />
        <CTA />
        <Contact />
      </div>
    </>
  );
}