import { useState, useEffect, useRef, ReactNode } from "react";

// ═══════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ═══════════════════════════════════════════════════════
// REVEAL
// ═══════════════════════════════════════════════════════
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade"; className?: string;
}) {
  const [ref, visible] = useInView();
  const t: Record<string, string> = {
    up: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)", fade: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t[direction],
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// READ PROGRESS
// ═══════════════════════════════════════════════════════
function ReadProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-stone-100">
      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-75 ease-linear"
        style={{ width: `${pct}%` }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CURSOR GLOW
// ═══════════════════════════════════════════════════════
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <div className="pointer-events-none fixed z-0 rounded-full" style={{
      width: 500, height: 500, left: pos.x - 250, top: pos.y - 250,
      background: "radial-gradient(circle, rgba(234,100,30,0.06) 0%, transparent 70%)",
      transition: "left 0.1s ease, top 0.1s ease",
    }} />
  );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const TIMELINE_STEPS = [
  {
    num: "01", icon: "search",   title: "Discovery",
    desc: "Deep immersion into your business ecosystem, identifying bottlenecks and surfacing latent opportunities for AI integration.",
    tags: ["Stakeholder Interviews", "Tech Audit", "Opportunity Mapping"],
  },
  {
    num: "02", icon: "insights", title: "Strategy",
    desc: "Architecting a custom roadmap that balances rapid delivery with long-term technological scalability and ROI.",
    tags: ["Roadmap Planning", "Risk Analysis", "KPI Definition"],
  },
  {
    num: "03", icon: "draw",     title: "Design",
    desc: "Crafting intuitive, editorial-grade interfaces that make complex neural computations accessible and actionable.",
    tags: ["Wireframing", "Prototyping", "Design System"],
  },
  {
    num: "04", icon: "code",     title: "Development",
    desc: "Clean code, robust architecture, and seamless neural model integration into your existing stack — with zero friction.",
    tags: ["Agile Sprints", "LLM Integration", "CI/CD Pipeline"],
  },
  {
    num: "05", icon: "biotech",  title: "Testing & Validation",
    desc: "We validate intelligence. Model bias audits, stress testing, and edge-case simulation ensure production-grade reliability.",
    tags: ["E2E Testing", "AI Bias Audit", "Load Testing"],
  },
  {
    num: "06", icon: "rocket_launch", title: "Deployment",
    desc: "Zero-downtime rollouts with full observability. We monitor every signal to ensure your system performs at scale.",
    tags: ["Blue-Green Deploy", "Monitoring", "Runbook"],
  },
];

const DETAIL_STEPS = [
  {
    step: "Step 04", title: "Agile Development & Neural Core Integration",
    desc: "Our engineering phase focuses on clean code and robust architecture. We integrate custom neural models into your existing stack without friction.",
    perks: ["Custom LLM fine-tuning and deployment", "Micro-frontend architecture implementation", "Real-time data streaming pipelines"],
    icon: "code", accent: "orange", flip: false,
  },
  {
    step: "Step 05", title: "Rigorous Testing & AI Validation",
    desc: "We don't just test for bugs; we validate intelligence. Our QA process includes model bias audits, stress testing, and edge-case simulation.",
    perks: ["Automated end-to-end testing suites", "Human-in-the-loop accuracy verification", "Edge-case & adversarial simulation"],
    icon: "biotech", accent: "sky", flip: true,
  },
  {
    step: "Step 06", title: "Launch, Monitor & Continuously Improve",
    desc: "Deployment is just the beginning. We set up observability pipelines, alert systems, and continuous retraining schedules for your AI models.",
    perks: ["Zero-downtime deployment strategies", "Real-time performance dashboards", "Automated model retraining pipelines"],
    icon: "rocket_launch", accent: "emerald", flip: false,
  },
];

const STATS = [
  { val: 100, suf: "+",  label: "Projects Delivered" },
  { val: 5,   suf: "×",  label: "Faster Delivery"    },
  { val: 99,  suf: "%",  label: "Client Satisfaction" },
];

const ACCENT_COLORS: Record<string, string> = {
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  sky:    "bg-sky-50 text-sky-600 border-sky-100",
  emerald:"bg-emerald-50 text-emerald-600 border-emerald-100",
};


// ═══════════════════════════════════════════════════════
// STAT ITEM
// ═══════════════════════════════════════════════════════
function StatItem({ val, suf, label }: { val: number; suf: string; label: string }) {
  const [ref, visible] = useInView(0.4);
  const count = useCountUp(val, 2000, visible);
  return (
    <div ref={ref} className="text-center space-y-2">
      <div style={{ fontFamily: "'Fraunces',serif" }}
        className="text-6xl md:text-7xl font-bold text-stone-900">
        <span style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
          {count}<span className="text-orange-500">{suf}</span>
        </span>
      </div>
      <p className="text-stone-400 uppercase tracking-widest text-xs font-bold">{label}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TIMELINE STEP NODE
// ═══════════════════════════════════════════════════════
function TimelineStep({ step, index, isLast }: { step: typeof TIMELINE_STEPS[0]; index: number; isLast: boolean }) {
  const [ref, visible] = useInView(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-8 md:mb-0">
      {/* Left content */}
      <div className={`md:pr-10 flex flex-col justify-center ${isLeft ? "" : "md:invisible"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(-32px)",
          transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${index * 80}ms`,
        }}>
        {isLeft && (
          <div className="bg-white rounded-3xl p-7 border-2 border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 hover:-translate-y-1 transition-all duration-350 cursor-default group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>{step.icon}</span>
              </div>
              <div>
                <p className="text-orange-500 text-[10px] font-bold tracking-widest uppercase mb-0.5">Step {step.num}</p>
                <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900">{step.title}</h3>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">{step.desc}</p>
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[10px] font-bold tracking-wider text-stone-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center node + line */}
      <div className="flex flex-col items-center relative" style={{ minHeight: 180 }}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg flex-shrink-0 transition-all duration-500 ${
          visible
            ? "bg-white border-2 border-orange-400 shadow-orange-100"
            : "bg-stone-100 border-2 border-stone-200"
        }`}
          style={{
            transform: visible ? "scale(1)" : "scale(0.7)",
            transition: `transform 0.6s cubic-bezier(.34,1.56,.64,1) ${index * 80 + 200}ms`,
          }}>
          <span style={{ fontFamily: "'Fraunces',serif" }}
            className={`text-base font-bold transition-colors duration-500 ${visible ? "text-orange-600" : "text-stone-400"}`}>
            {step.num}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 w-0.5 mt-2" style={{
            background: "linear-gradient(to bottom, #f97316, #fed7aa, transparent)",
          }} />
        )}
      </div>

      {/* Right content */}
      <div className={`md:pl-10 flex flex-col justify-center ${!isLeft ? "" : "md:invisible"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(32px)",
          transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${index * 80}ms`,
        }}>
        {!isLeft && (
          <div className="bg-white rounded-3xl p-7 border-2 border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 hover:-translate-y-1 transition-all duration-350 cursor-default group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>{step.icon}</span>
              </div>
              <div>
                <p className="text-orange-500 text-[10px] font-bold tracking-widest uppercase mb-0.5">Step {step.num}</p>
                <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900">{step.title}</h3>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">{step.desc}</p>
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[10px] font-bold tracking-wider text-stone-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DETAIL STEP
// ═══════════════════════════════════════════════════════
function DetailStep({ s, i }: { s: typeof DETAIL_STEPS[0]; i: number }) {
  console.log(i)
  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Visual */}
      <Reveal direction={s.flip ? "right" : "left"} delay={0}
        className={s.flip ? "order-2 md:order-2" : "order-2 md:order-1"}>
        <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 aspect-[4/3] flex items-center justify-center">
          {/* Pattern bg */}
          <div className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: "linear-gradient(45deg,#333 25%,transparent 25%),linear-gradient(-45deg,#333 25%,transparent 25%)", backgroundSize: "28px 28px" }} />
          {/* Scan line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent pointer-events-none"
            style={{ animation: "scanLine 2.8s linear infinite" }} />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
          {/* Center icon */}
          <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 44 }}>{s.icon}</span>
          </div>
          {/* Step label on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
            <p className="text-orange-500 text-[10px] font-bold tracking-widest uppercase">{s.step}</p>
            <p style={{ fontFamily: "'Fraunces',serif" }} className="text-white font-bold text-lg drop-shadow-lg">{s.title}</p>
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <Reveal direction={s.flip ? "left" : "right"} delay={100}
        className={s.flip ? "order-1 md:order-1" : "order-1 md:order-2"}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase ${ACCENT_COLORS[s.accent]}`}>
              {s.step}
            </div>
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            {s.title}
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">{s.desc}</p>
          <ul className="space-y-4 pt-2">
            {s.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-4 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                  <span className="material-symbols-outlined text-orange-500 group-hover:text-white transition-colors" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-stone-600 font-medium">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════
export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
      style={{ fontFamily: "'DM Sans',sans-serif" }}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

      <style>{`
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes scanLine   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes drawLine   { from{stroke-dashoffset:1} to{stroke-dashoffset:0} }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .shimmer-text {
          background: linear-gradient(90deg,#ea640a 0%,#f59e0b 30%,#ea640a 60%,#f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <ReadProgress />
      <CursorGlow />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] bg-orange-100/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-[10%] -right-[5%] w-[30vw] h-[30vw] bg-sky-100/40 rounded-full blur-3xl" />
          {/* Dot texture */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle,#ea640a 1.5px,transparent 1.5px)", backgroundSize: "32px 32px" }} />

          {/* Rotating rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-orange-200/40 pointer-events-none"
            style={{ animation: "spinSlow 40s linear infinite" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-orange-100/30 pointer-events-none"
            style={{ animation: "spinSlow 28s linear infinite reverse" }} />

          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                </span>
                Our Methodology
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 style={{ fontFamily: "'Fraunces',serif" }}
                className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.9]">
                Our <span className="shimmer-text">Process</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl md:text-2xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                From Idea to Intelligent Execution. We transform complex challenges into scalable digital systems through a rigorous, human-centric architectural framework.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#timeline"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                  Explore Steps →
                </a>
                <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                  View Case Studies
                </button>
              </div>
            </Reveal>

            {/* Quick stats strip */}
            <Reveal delay={400}>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {[
                  { icon: "check_circle", text: "6 Defined Phases" },
                  { icon: "bolt",         text: "5× Faster Delivery" },
                  { icon: "groups",       text: "100+ Projects Done" },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-2 text-sm text-stone-500 font-medium">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 18 }}>{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Floating down arrow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ animation: "floatY 2s ease-in-out infinite" }}>
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>keyboard_arrow_down</span>
            </div>
          </div>
        </section>

        {/* ── VERTICAL TIMELINE ── */}
        <section id="timeline" className="py-28 px-6 bg-white border-y border-stone-100">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Framework</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                Six Phases of<br />Intelligent Delivery
              </h2>
            </Reveal>

            <div className="relative">
              {TIMELINE_STEPS.map((step, i) => (
                <TimelineStep key={step.num} step={step} index={i} isLast={i === TIMELINE_STEPS.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── DETAIL ZIGZAG ── */}
        <section className="py-28 bg-[#faf8f5] space-y-28">
          {DETAIL_STEPS.map((s, i) => (
            <DetailStep key={s.step} s={s} i={i} />
          ))}
        </section>

        {/* ── STATS ── */}
        <section className="py-28 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">By the Numbers</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">Results We're Proud Of</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <StatItem {...s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS OVERVIEW STRIP ── */}
        <section className="py-20 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12 text-center">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Overview</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-stone-900">The Full Journey</h2>
            </Reveal>
            <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
              {/* Connecting line */}
              <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 hidden md:block" />
              {TIMELINE_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 70} className="relative z-10 flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-stone-200 flex items-center justify-center mb-4 hover:border-orange-400 hover:bg-orange-50 hover:scale-110 transition-all duration-300 shadow-sm cursor-default">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>{s.icon}</span>
                  </div>
                  <p style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900 text-sm mb-1">{s.title}</p>
                  <p className="text-[10px] text-stone-400 font-bold tracking-wider uppercase">Phase {s.num}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-28 px-6 bg-white border-t border-stone-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

          <Reveal className="relative max-w-5xl mx-auto bg-stone-900 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-stone-300">
            {/* Orange glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl" />
            {/* Scan line */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
              style={{ animation: "scanLine 3s linear infinite" }} />

            <div className="relative z-10 space-y-8">
              <div className="inline-block px-5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase">
                Let's Build Together
              </div>
              <h2 style={{ fontFamily: "'Fraunces',serif" }}
                className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                Ready to Build Something <em className="text-orange-400 not-italic">Intelligent?</em>
              </h2>
              <p className="text-stone-400 text-lg max-w-xl mx-auto">
                Start a conversation with our architects and transform your boldest vision into a production-grade system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                  Start a Project →
                </button>
                <button className="px-10 py-5 rounded-2xl border-2 border-stone-700 text-stone-300 font-bold text-lg hover:border-orange-500 hover:text-orange-400 transition-all duration-300">
                  Book a Discovery Call
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}