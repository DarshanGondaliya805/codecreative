import { useState, useEffect, useRef, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Solution {
  icon: string;
  title: string;
  desc: string;
}
interface Project {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
}
interface Reason {
  icon: string;
  title: string;
  desc: string;
}

// ── Hooks ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
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

// ── Animation wrapper ──────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}) {
  const [ref, visible] = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(48px)",
    left: "translateX(-48px)",
    right: "translateX(48px)",
    fade: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const SOLUTIONS: Solution[] = [
  { icon: "cloud", title: "Cloud Computing", desc: "Scalable infrastructure designed for high availability." },
  { icon: "psychology", title: "AI & ML", desc: "Deep learning models for predictive intelligence." },
  { icon: "shield", title: "Cyber Security", desc: "Military-grade protection for digital assets." },
  { icon: "code", title: "Web Development", desc: "Performant web experiences with modern stacks." },
  { icon: "smartphone", title: "Mobile Apps", desc: "Native and cross-platform mobile excellence." },
  { icon: "analytics", title: "Data Analytics", desc: "Turn raw data into actionable business insight." },
  { icon: "terminal", title: "DevOps", desc: "Automated CI/CD pipelines for rapid delivery." },
  { icon: "hub", title: "Blockchain", desc: "Decentralized protocols for transparent trust." },
  { icon: "layers", title: "SaaS Dev", desc: "Building multi-tenant cloud-native platforms." },
  { icon: "api", title: "API Integration", desc: "Seamless connectivity across the ecosystem." },
];

const PROJECTS: Project[] = [
  { tag: "Mobile App", tagColor: "bg-blue-100 text-blue-700", title: "Taxi Booking App", desc: "A full-scale mobility platform with real-time routing and driver logistics." },
  { tag: "SaaS", tagColor: "bg-orange-100 text-orange-600", title: "Restaurant MS", desc: "End-to-end POS and inventory management for hospitality chains." },
  { tag: "Fintech", tagColor: "bg-emerald-100 text-emerald-700", title: "FinTech Wallet", desc: "Secure digital banking and peer-to-peer payment architecture." },
  { tag: "E-Commerce", tagColor: "bg-purple-100 text-purple-700", title: "E-commerce", desc: "Headless commerce solution for global retail scaling." },
  { tag: "Logistics", tagColor: "bg-rose-100 text-rose-700", title: "Food Delivery", desc: "Hyper-local delivery logistics and vendor marketplace." },
  { tag: "HealthTech", tagColor: "bg-teal-100 text-teal-700", title: "Healthcare Portal", desc: "HIPAA compliant patient care and telemedicine engine." },
  { tag: "EdTech", tagColor: "bg-amber-100 text-amber-700", title: "LMS Platform", desc: "Advanced e-learning ecosystem with AI progress tracking." },
  { tag: "PropTech", tagColor: "bg-indigo-100 text-indigo-700", title: "Real Estate", desc: "Property matching engine with virtual tour integration." },
  { tag: "Social", tagColor: "bg-pink-100 text-pink-700", title: "Social Media", desc: "High-concurrency community platform for creators." },
];

const REASONS: Reason[] = [
  { icon: "groups", title: "Expert Team", desc: "Vetted engineers from top global tech ecosystems." },
  { icon: "trending_up", title: "Scalable Solutions", desc: "Architectures that grow seamlessly with your demand." },
  { icon: "lock_open", title: "Secure Systems", desc: "Security-first mindset in every line of code." },
  { icon: "support_agent", title: "24/7 Support", desc: "Global monitoring and concierge engineering support." },
];

const STATS = [
  { value: 250, suffix: "+", label: "Projects Shipped" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Countries Served" },
  { value: 12, suffix: "yrs", label: "Industry Experience" },
];

// ── Cursor glow ────────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-0 rounded-full"
      style={{
        width: 600,
        height: 600,
        left: pos.x - 300,
        top: pos.y - 300,
        background: "radial-gradient(circle, rgba(234,100,30,0.08) 0%, transparent 70%)",
        transition: "left 0.12s ease, top 0.12s ease",
      }}
    />
  );
}

// ── Floating particles ─────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    dur: 6 + Math.random() * 8,
    opacity: 0.12 + Math.random() * 0.2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden ">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-orange-400"
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

// ── Typewriter ─────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const delay = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);

  return (
    <span className="text-orange-500 relative">
      {text}
      <span className="ml-0.5 inline-block w-[3px] h-[0.85em] bg-orange-400 align-middle animate-pulse" />
    </span>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function Solution() {
  const [filter, setFilter] = useState("All");
  const [statsRef, statsVisible] = useInView();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const statVals = STATS.map((s) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    val: useCountUp(s.value, 2200, statsVisible),
    ...s,
  }));

  const filteredProjects = filter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) =>
        filter === "Web"
          ? ["E-commerce", "Healthcare Portal", "LMS Platform", "Real Estate", "Social Media"].includes(p.title)
          : filter === "Mobile"
          ? ["Taxi Booking App", "Food Delivery"].includes(p.title)
          : ["Restaurant MS", "FinTech Wallet"].includes(p.title)
      );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-['DM_Sans',sans-serif] overflow-x-hidden selection:bg-orange-200">
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <CursorGlow />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-20">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-[#faf8f5] to-amber-50/40" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100 to-transparent rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100 to-transparent rounded-full opacity-40 blur-3xl" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <Particles />

          <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
            {/* Left */}
            <div className="space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" style={{ animation: "pulse-ring 1.5s infinite" }} />
                    <span className="relative h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  Next-Gen Infrastructure
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-6xl md:text-[80px] font-bold tracking-tight leading-[0.95] font-['Fraunces',serif]">
                  <span className="text-stone-900">Our IT</span>
                  <br />
                  <Typewriter words={["Solutions.", "Services.", "Innovation.", "Expertise."]} />
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg text-stone-500 max-w-lg leading-relaxed font-light">
                  Innovative technology solutions engineered to scale your enterprise and accelerate intelligence across every vertical.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10">Contact Us →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-semibold text-base hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                    Explore Labs
                  </button>
                </div>
              </Reveal>

              {/* Trust badges */}
              <Reveal delay={400}>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2">
                    {["🧑‍💻", "👩‍💼", "👨‍🔬", "👩‍🎨"].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 border-2 border-white flex items-center justify-center text-sm">
                        {e}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-stone-500">
                    Trusted by <span className="text-stone-800 font-semibold">500+</span> enterprises worldwide
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right — floating card stack */}
            <Reveal delay={200} direction="right">
              <div className="relative hidden lg:flex justify-center items-center" style={{ height: 500 }}>
                {/* Spinning ring */}
                <div
                  className="absolute w-[420px] h-[420px] rounded-full border-[1.5px] border-orange-200 border-dashed"
                  style={{ animation: "spinSlow 20s linear infinite" }}
                />
                <div
                  className="absolute w-[340px] h-[340px] rounded-full border border-orange-100"
                  style={{ animation: "spinSlow 14s linear infinite reverse" }}
                />

                {/* Central card */}
                <div
                  className="relative w-72 rounded-3xl bg-white shadow-2xl shadow-orange-100 border border-orange-50 p-8 z-10"
                  style={{ animation: "wiggle 6s ease-in-out infinite" }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-5 shadow-lg shadow-orange-200">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>psychology</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-xl font-['Fraunces',serif] mb-2">AI & ML</h3>
                  <p className="text-stone-500 text-sm">Deep learning models for predictive intelligence at scale.</p>
                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-orange-100 overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: "78%", animation: "shimmer 2s ease-in-out infinite" }} />
                    </div>
                    <span className="text-xs font-bold text-orange-500">78%</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">Model Accuracy</p>
                </div>

                {/* Orbiting badge 1 */}
                <div className="absolute top-8 right-4 bg-white shadow-lg shadow-stone-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-stone-50 z-20">
                  <span className="text-lg">🚀</span>
                  <div>
                    <p className="text-xs font-bold text-stone-800">250+ Projects</p>
                    <p className="text-[10px] text-stone-400">Delivered</p>
                  </div>
                </div>

                {/* Orbiting badge 2 */}
                <div className="absolute bottom-12 left-0 bg-white shadow-lg shadow-stone-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-stone-50 z-20">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-stone-800">4.9 / 5.0</p>
                    <p className="text-[10px] text-stone-400">Client Rating</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16 px-6 bg-white border-y border-stone-100">
          <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {statVals.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="text-center">
                <p className="text-4xl font-bold font-['Fraunces',serif] text-stone-900">
                  {s.val}
                  <span className="text-orange-500">{s.suffix}</span>
                </p>
                <p className="text-sm text-stone-400 mt-1 font-medium">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SOLUTIONS GRID ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-16">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">What We Do</p>
                  <h2 className="text-5xl font-bold font-['Fraunces',serif] text-stone-900 leading-tight">
                    Trending<br />Solutions
                  </h2>
                </div>
                <p className="hidden md:block text-stone-400 max-w-xs text-sm leading-relaxed">
                  Powering the next generation of digital transformation with specialized architectural expertise.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SOLUTIONS.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div
                    className="group relative bg-white rounded-2xl p-6 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default overflow-hidden"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-4 transition-colors duration-300">
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>
                          {s.icon}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-800 mb-1.5 leading-tight">{s.title}</h3>
                      <p className="text-xs text-stone-400 leading-relaxed">{s.desc}</p>
                    </div>
                    {hoveredCard === i && (
                      <div className="absolute bottom-3 right-3">
                        <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 16 }}>arrow_outward</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Portfolio</p>
                  <h2 className="text-5xl font-bold font-['Fraunces',serif] text-stone-900">
                    Project Ideas<br />&amp; Use Cases
                  </h2>
                </div>
                <div className="flex gap-1.5 bg-stone-50 p-1.5 rounded-2xl border border-stone-100">
                  {["All", "Web", "Mobile", "SaaS"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-250 ${
                        filter === f
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="group relative overflow-hidden rounded-3xl bg-stone-50 border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 hover:-translate-y-1.5 transition-all duration-350 cursor-pointer">
                    {/* Hover gradient bar */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${p.tagColor}`}>
                          {p.tag}
                        </span>
                        <span className="material-symbols-outlined text-stone-300 group-hover:text-orange-400 group-hover:rotate-45 transition-all duration-300" style={{ fontSize: 20 }}>
                          arrow_outward
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold font-['Fraunces',serif] text-stone-900 mb-3">{p.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{p.desc}</p>

                      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-orange-500 text-sm font-semibold">Learn more</span>
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 16 }}>east</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED HIGHLIGHT ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-stone-900 to-stone-800 shadow-2xl shadow-stone-300">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="relative grid lg:grid-cols-2 gap-0">
                  {/* Left */}
                  <div className="p-12 md:p-20 flex flex-col justify-center">
                    <span className="text-orange-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">Featured Highlight</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-['Fraunces',serif] text-white mb-8 leading-tight">
                      Uber-Style<br />Mobility Platform
                    </h2>
                    <ul className="space-y-4 mb-10">
                      {[
                        "Real-time GPS tracking & route optimization",
                        "Integrated Driver/User ecosystem",
                        "Seamless multi-currency payment gateways",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check</span>
                          </div>
                          <span className="text-stone-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-fit px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-900/30 hover:scale-105 hover:shadow-orange-800/40 active:scale-95 transition-all duration-300">
                      View Details →
                    </button>
                  </div>

                  {/* Right — mock phone UI */}
                  <div className="hidden lg:flex items-center justify-center p-12">
                    <div className="relative w-56 bg-white rounded-[2rem] p-4 shadow-2xl" style={{ animation: "wiggle 7s ease-in-out infinite" }}>
                      <div className="bg-stone-900 rounded-[1.5rem] p-3 overflow-hidden">
                        <div className="bg-gradient-to-b from-orange-500 to-orange-700 rounded-xl h-32 mb-3 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white" style={{ fontSize: 40 }}>map</span>
                        </div>
                        <div className="space-y-2 px-1">
                          <div className="h-2 w-3/4 rounded bg-stone-700" />
                          <div className="h-2 w-1/2 rounded bg-stone-700" />
                          <div className="mt-3 bg-orange-500 rounded-xl p-2 text-center">
                            <span className="text-white text-xs font-bold">Book Ride</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
              <h2 className="text-5xl font-bold font-['Fraunces',serif] text-stone-900">Why Choose Us</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REASONS.map((r, i) => (
                <Reveal key={r.title} delay={i * 100}>
                  <div className="group text-center bg-stone-50 border border-stone-100 rounded-3xl p-8 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-stone-100 group-hover:border-orange-200 group-hover:shadow-md flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 28 }}>{r.icon}</span>
                    </div>
                    <h4 className="font-bold font-['Fraunces',serif] text-xl text-stone-900 mb-3">{r.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 px-6 bg-[#faf8f5] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-amber-50" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <Reveal className="relative max-w-4xl mx-auto text-center">
            <div className="inline-block px-5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-8">
              Ready to Scale?
            </div>
            <h2 className="text-6xl md:text-8xl font-bold font-['Fraunces',serif] text-stone-900 leading-[0.92] tracking-tight mb-8">
              Start your<br />
              <span className="text-orange-500">project today</span>
            </h2>
            <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto font-light">
              Join the ranks of high-growth enterprises leveraging Neural Amber to define the future of their industries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-12 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                Contact Us →
              </button>
              <button className="px-10 py-5 rounded-2xl border-2 border-stone-200 text-stone-600 font-bold text-lg hover:border-orange-300 hover:text-orange-600 transition-all duration-300">
                See our work
              </button>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}