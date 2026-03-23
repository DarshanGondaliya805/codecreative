import { useState, useEffect, useRef, ReactNode } from "react";

// ═══════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════
function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement>, boolean] {
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

function useCountUp(target: number, duration = 1800, active = false) {
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
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
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
      background: "radial-gradient(circle, rgba(234,100,30,0.065) 0%, transparent 70%)",
      transition: "left 0.1s ease, top 0.1s ease",
    }} />
  );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const CATEGORIES = ["All", "Web Development", "Mobile Apps", "UI/UX", "AI/ML"];

const FEATURED = [
  {
    title: "EcoConnect App",
    tags: [{ label: "E-Commerce", color: "bg-emerald-100 text-emerald-700 border-emerald-100" }, { label: "AI Driven", color: "bg-sky-100 text-sky-700 border-sky-100" }],
    desc: "Revolutionizing sustainable supply chain tracking through neural network optimization.",
    metrics: [{ val: "200%", label: "Traffic Increase" }, { val: "500k+", label: "Active Users" }],
    bg: "from-emerald-100 to-teal-200",
    icon: "eco",
  },
  {
    title: "Nexus SaaS Dashboard",
    tags: [{ label: "Fintech", color: "bg-violet-100 text-violet-700 border-violet-100" }, { label: "Bento UI", color: "bg-sky-100 text-sky-700 border-sky-100" }],
    desc: "Centralized neural hub for enterprise resource planning and predictive analytics.",
    metrics: [{ val: "40%", label: "Cost Reduction" }, { val: "12ms", label: "Avg Latency" }],
    bg: "from-violet-100 to-purple-200",
    icon: "dashboard",
  },
];

interface Project {
  title: string;
  desc: string;
  tags: string[];
  tech: string[];
  category: string;
  icon: string;
  accentClass: string;
  tagColor: string;
}

const ALL_PROJECTS: Project[] = [
  {
    title: "Lumina Health Portal",
    desc: "Advanced telemedicine platform with real-time biometric tracking and AI diagnostics.",
    tags: ["HealthTech"],
    tech: ["React", "Next.js"],
    category: "Web Development",
    icon: "monitor_heart",
    accentClass: "from-teal-100 to-cyan-200",
    tagColor: "bg-teal-50 text-teal-700 border-teal-100",
  },
  {
    title: "Artify NFT Hub",
    desc: "A high-fidelity immersive marketplace for curated digital architectural assets.",
    tags: ["Web3"],
    tech: ["Three.js", "Vite"],
    category: "UI/UX",
    icon: "auto_awesome",
    accentClass: "from-violet-100 to-purple-200",
    tagColor: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    title: "Velocity Trade App",
    desc: "Ultra-low latency mobile trading engine for cross-border digital assets.",
    tags: ["Fintech"],
    tech: ["Flutter", "Rust"],
    category: "Mobile Apps",
    icon: "trending_up",
    accentClass: "from-sky-100 to-blue-200",
    tagColor: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    title: "NeuralOps Platform",
    desc: "AI-orchestrated operations platform with real-time anomaly detection and auto-remediation.",
    tags: ["AI/ML"],
    tech: ["Python", "TensorFlow"],
    category: "AI/ML",
    icon: "psychology",
    accentClass: "from-orange-100 to-amber-200",
    tagColor: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    title: "FlowCommerce Engine",
    desc: "Headless e-commerce platform with edge-cached storefronts and AI-powered recommendations.",
    tags: ["E-Commerce"],
    tech: ["Next.js", "Medusa"],
    category: "Web Development",
    icon: "storefront",
    accentClass: "from-rose-100 to-pink-200",
    tagColor: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    title: "PulseRide Mobile",
    desc: "Real-time ride-sharing app with ML-based demand prediction and dynamic pricing.",
    tags: ["Mobility"],
    tech: ["React Native", "Node.js"],
    category: "Mobile Apps",
    icon: "directions_car",
    accentClass: "from-amber-100 to-yellow-200",
    tagColor: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

const STATS_DATA = [
  { val: 250, suf: "+", label: "Projects Completed" },
  { val: 120, suf: "+", label: "Clients Served"     },
  { val: 15,  suf: "+", label: "Industries"         },
  { val: 7,   suf: "+", label: "Years Experience"   },
];

const TESTIMONIALS = [
  {
    quote: "NeuralAgency didn't just build an app; they engineered a digital experience that transformed our business model. Their precision is unmatched.",
    name: "Marcus Chen", role: "CTO, EcoConnect",
    initials: "MC", bg: "bg-emerald-100 text-emerald-700",
    stars: 5,
  },
  {
    quote: "The editorial feel of the Nexus Dashboard has made our complex data analytics accessible to all levels of management.",
    name: "Sarah Jenkins", role: "Product Lead, Nexus SaaS",
    initials: "SJ", bg: "bg-sky-100 text-sky-700",
    stars: 5,
  },
  {
    quote: "Exceptional speed and attention to detail. The UI/UX transition was seamless, and the technical support has been world-class.",
    name: "David Miller", role: "CEO, Artify Hub",
    initials: "DM", bg: "bg-violet-100 text-violet-700",
    stars: 5,
  },
];

// ═══════════════════════════════════════════════════════
// STAT COUNTER
// ═══════════════════════════════════════════════════════
function StatCount({ val, suf, label }: { val: number; suf: string; label: string }) {
  const [ref, visible] = useInView(0.4);
  const count = useCountUp(val, 1800, visible);
  return (
    <div ref={ref} className="text-center space-y-2">
      <div style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-6xl font-bold text-stone-900">
        {count}<span className="text-orange-500">{suf}</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</p>
    </div>
  );
}


// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [visibleCount, setVisibleCount] = useState(6);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
console.log(hoveredCard)
  const filteredProjects = ALL_PROJECTS
    .filter((p) =>
      (activeFilter === "All" || p.category === activeFilter) &&
      (searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .slice(0, visibleCount);

  const totalFiltered = ALL_PROJECTS.filter((p) =>
    (activeFilter === "All" || p.category === activeFilter) &&
    (searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  ).length;

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
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeIn     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn    { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .shimmer-text {
          background: linear-gradient(90deg,#ea640a 0%,#f59e0b 30%,#ea640a 60%,#f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <CursorGlow />

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[640px] flex items-center overflow-hidden px-6 pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-[#faf8f5] to-sky-50/30" />
          <div className="absolute -top-10 -right-10 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

          {/* Spinning ring */}
          <div className="absolute top-1/2 right-20 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-orange-200/40 pointer-events-none hidden lg:block"
            style={{ animation: "spinSlow 35s linear infinite" }} />

          <div className="max-w-7xl mx-auto relative z-10 w-full py-20">
            <div className="max-w-3xl space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </span>
                  Selected Works 2024
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 style={{ fontFamily: "'Fraunces',serif" }} className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.9]">
                  Our <span className="shimmer-text italic">Portfolio</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="text-xl md:text-2xl text-stone-500 font-light leading-relaxed max-w-2xl">
                  Explore our latest projects and success stories across multiple industries, where intelligence meets architectural precision.
                </p>
              </Reveal>

              <Reveal delay={260}>
                <div className="flex items-center gap-4">
                  <div className="h-px w-20 bg-stone-200" />
                  <span className="font-bold tracking-widest uppercase text-sm text-orange-500">
                    {ALL_PROJECTS.length} Case Studies
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <Reveal>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => { setActiveFilter(cat); setVisibleCount(6); }}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${
                      activeFilter === cat
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200"
                        : "bg-stone-50 border border-stone-200 text-stone-500 hover:border-orange-300 hover:text-orange-600"
                    }`}>
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-1.5 text-[10px] opacity-60">
                        ({ALL_PROJECTS.filter(p => p.category === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search + Sort */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-60">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" style={{ fontSize: 18 }}>search</span>
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                    </button>
                  )}
                </div>
                <div className="relative">
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none bg-stone-50 border-2 border-stone-200 rounded-2xl py-2.5 pl-4 pr-9 text-sm font-medium text-stone-600 focus:outline-none focus:border-orange-400 transition-colors cursor-pointer">
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Popularity</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" style={{ fontSize: 18 }}>expand_more</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FEATURED PROJECTS ── */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <Reveal className="mb-10">
            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-3xl font-bold text-stone-900 flex items-center gap-4">
              <span className="w-8 h-0.5 bg-orange-500 inline-block" />
              Featured Impact
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className={`group relative overflow-hidden rounded-[2rem] cursor-default transition-all duration-350 hover:-translate-y-2 hover:shadow-2xl ${i === 0 ? "hover:shadow-emerald-100" : "hover:shadow-violet-100"}`}
                  style={{ aspectRatio: "16/10" }}>
                  {/* Gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.bg} group-hover:scale-[1.02] transition-transform duration-700`} />

                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "linear-gradient(45deg,#333 25%,transparent 25%),linear-gradient(-45deg,#333 25%,transparent 25%)", backgroundSize: "30px 30px" }} />

                  {/* Scan line */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent pointer-events-none"
                    style={{ animation: "scanLine 3s linear infinite" }} />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-stone-700 group-hover:text-stone-900 transition-colors" style={{ fontSize: 40 }}>{f.icon}</span>
                    </div>
                  </div>

                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {f.tags.map((tag) => (
                        <div key={tag.label} className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm ${tag.color}`}>{tag.label}</div>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-3xl font-bold text-white mb-3 drop-shadow-lg">{f.title}</h3>
                    <p className="text-stone-300 text-sm mb-6 max-w-md">{f.desc}</p>
                    <div className="flex gap-10">
                      {f.metrics.map((m) => (
                        <div key={m.label}>
                          <div style={{ fontFamily: "'Fraunces',serif" }} className="text-2xl font-bold text-orange-400">{m.val}</div>
                          <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO GRID ── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          {/* Result count */}
          {(searchQuery || activeFilter !== "All") && (
            <Reveal className="mb-6">
              <p className="text-sm text-stone-400 font-medium">
                Showing <span className="text-stone-700 font-bold">{totalFiltered}</span> projects
                {activeFilter !== "All" && <span> in <span className="text-orange-600">{activeFilter}</span></span>}
                {searchQuery && <span> matching "<span className="text-orange-600">{searchQuery}</span>"</span>}
              </p>
            </Reveal>
          )}

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined block mx-auto mb-4 text-stone-300" style={{ fontSize: 56 }}>search_off</span>
              <p className="text-stone-400 font-medium text-lg">No projects match your search.</p>
              <button onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="mt-4 text-orange-500 font-semibold hover:underline text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default h-full"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Visual header */}
                    <div className={`relative overflow-hidden bg-gradient-to-br ${p.accentClass}`} style={{ aspectRatio: "4/3" }}>
                      <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "linear-gradient(45deg,#333 25%,transparent 25%),linear-gradient(-45deg,#333 25%,transparent 25%)", backgroundSize: "26px 26px" }} />
                      <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                        style={{ animation: "scanLine 3.5s linear infinite" }} />
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <span className="material-symbols-outlined text-stone-700" style={{ fontSize: 28 }}>{p.icon}</span>
                        </div>
                      </div>
                      {/* Top bar */}
                      <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((tag) => (
                            <span key={tag} className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${p.tagColor}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="material-symbols-outlined text-stone-300 group-hover:text-orange-400 group-hover:rotate-45 transition-all duration-300 flex-shrink-0 ml-2" style={{ fontSize: 18 }}>
                          arrow_outward
                        </span>
                      </div>

                      <h4 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-2">{p.title}</h4>
                      <p className="text-sm text-stone-400 leading-relaxed mb-5 flex-1">{p.desc}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 text-[10px] font-bold tracking-wider text-stone-500">
                            {t}
                          </span>
                        ))}
                      </div>

                      <button className="flex items-center gap-2 text-orange-500 font-bold text-sm group/btn w-fit mt-auto">
                        View Case Study
                        <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform" style={{ fontSize: 18 }}>arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Load more */}
          {visibleCount < totalFiltered && (
            <Reveal className="mt-14 flex justify-center">
              <button
                onClick={() => setVisibleCount((v) => v + 3)}
                className="px-12 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                Load More Projects
              </button>
            </Reveal>
          )}
        </section>

        {/* ── STATS ── */}
        <section className="py-24 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS_DATA.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <StatCount {...s} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="max-w-7xl mx-auto px-6 py-28">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
            <div>
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Client Voices</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 max-w-lg">
                Voices of <span className="text-sky-500 italic">Excellence</span>
              </h2>
              <p className="text-stone-400 mt-3">Don't just take our word for it. Our partners define our legacy through their success.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group">
                <span className="material-symbols-outlined text-stone-500 group-hover:text-orange-500" style={{ fontSize: 20 }}>chevron_left</span>
              </button>
              <button onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group">
                <span className="material-symbols-outlined text-stone-500 group-hover:text-orange-500" style={{ fontSize: 20 }}>chevron_right</span>
              </button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}
                className={`transition-all duration-500 ${i === testimonialIdx ? "ring-2 ring-orange-200 rounded-3xl" : ""}`}>
                <div className="group bg-stone-50 border-2 border-stone-100 rounded-3xl p-8 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default relative overflow-hidden h-full flex flex-col">
                  <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                  <span style={{ fontFamily: "'Fraunces',serif" }} className="absolute top-3 right-6 text-7xl font-bold text-stone-100 leading-none select-none">"</span>

                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="material-symbols-outlined text-amber-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>

                  <p className="text-stone-500 text-sm leading-relaxed mb-7 italic flex-1 relative z-10">"{t.quote}"</p>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center font-bold flex-shrink-0`}
                      style={{ fontFamily: "'Fraunces',serif" }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-6 h-2 bg-orange-500" : "w-2 h-2 bg-stone-300 hover:bg-orange-300"}`} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-600 p-12 md:p-24 text-center shadow-2xl shadow-orange-200">
              {/* Decorative dots */}
              <div className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
              {/* Animated scan line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: "scanLine 3s linear infinite" }} />

              <div className="relative z-10 space-y-8">
                <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                  Have a Project<br />in Mind?
                </h2>
                <p className="text-orange-100 text-xl max-w-2xl mx-auto">
                  Let's craft your vision with neural intelligence and luminescent design. Our team is ready to scale your next big idea.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-5 bg-white text-orange-600 font-bold text-lg rounded-2xl hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-orange-700/20">
                    Start Your Project
                  </button>
                  <button className="px-10 py-5 border-2 border-white/40 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300">
                    Hire Experts
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}