import { useState, useEffect, useRef, ReactNode } from "react";

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════
type Category = "All" | "Frontend" | "Backend" | "AI" | "Cloud" | "Database" | "Tools";

interface Tech {
    name: string;
    icon: string;
    category: Exclude<Category, "All">;
    tooltip?: string;
    accent?: "orange" | "sky" | "emerald" | "violet" | "rose" | "amber";
}

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

// ═══════════════════════════════════════════════════════
// REVEAL
// ═══════════════════════════════════════════════════════
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
    children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade"; className?: string;
}) {
    const [ref, visible] = useInView();
    const t: Record<string, string> = {
        up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", fade: "none",
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
            background: "radial-gradient(circle, rgba(234,100,30,0.06) 0%, transparent 70%)",
            transition: "left 0.12s ease, top 0.12s ease",
        }} />
    );
}

// ═══════════════════════════════════════════════════════
// MARQUEE STRIP
// ═══════════════════════════════════════════════════════
function MarqueeStrip() {
    const items = ["React", "Node.js", "Python", "AWS", "TensorFlow", "Docker", "PostgreSQL", "Next.js", "Kubernetes", "PyTorch", "MongoDB", "Figma", "TypeScript", "Redis", "Terraform"];
    const doubled = [...items, ...items];
    return (
        <div className="w-full overflow-hidden py-4 border-y border-stone-100 bg-stone-50/80">
            <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
                {doubled.map((t, i) => (
                    <span key={i} className="text-xs font-bold text-stone-300 tracking-widest uppercase flex-shrink-0">{t}</span>
                ))}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const TECHS: Tech[] = [
    // Frontend
    { name: "HTML5", icon: "html", category: "Frontend", tooltip: "Standard Markup", accent: "orange" },
    { name: "CSS3", icon: "css", category: "Frontend", tooltip: "Cascading Styles", accent: "sky" },
    { name: "React.js", icon: "javascript", category: "Frontend", tooltip: "UI Framework", accent: "sky" },
    { name: "Next.js", icon: "bolt", category: "Frontend", tooltip: "Full-Stack React", accent: "orange" },
    { name: "Tailwind", icon: "token", category: "Frontend", tooltip: "Utility CSS", accent: "sky" },
    { name: "Angular", icon: "change_history", category: "Frontend", tooltip: "Enterprise SPA", accent: "rose" },
    { name: "Vue.js", icon: "grid_view", category: "Frontend", tooltip: "Progressive Framework", accent: "emerald" },
    { name: "Bootstrap", icon: "web_asset", category: "Frontend", tooltip: "CSS Framework", accent: "violet" },
    { name: "TypeScript", icon: "code", category: "Frontend", tooltip: "Typed JavaScript", accent: "sky" },
    // Backend
    { name: "Node.js", icon: "javascript", category: "Backend", tooltip: "JS Runtime", accent: "emerald" },
    { name: "Express.js", icon: "api", category: "Backend", tooltip: "Web Framework", accent: "orange" },
    { name: "Django", icon: "code_off", category: "Backend", tooltip: "Python Framework", accent: "emerald" },
    { name: "Flask", icon: "water_drop", category: "Backend", tooltip: "Micro Framework", accent: "sky" },
    { name: "Laravel", icon: "diamond", category: "Backend", tooltip: "PHP Framework", accent: "rose" },
    { name: "Spring Boot", icon: "eco", category: "Backend", tooltip: "Java Framework", accent: "emerald" },
    { name: ".NET", icon: "integration_instructions", category: "Backend", tooltip: "MS Framework", accent: "violet" },
    { name: "FastAPI", icon: "speed", category: "Backend", tooltip: "Python API", accent: "emerald" },
    // AI
    { name: "Python", icon: "psychology", category: "AI", tooltip: "AI Backbone", accent: "sky" },
    { name: "TensorFlow", icon: "hub", category: "AI", tooltip: "ML Platform", accent: "orange" },
    { name: "PyTorch", icon: "neurology", category: "AI", tooltip: "Deep Learning", accent: "orange" },
    { name: "OpenAI API", icon: "auto_awesome", category: "AI", tooltip: "LLM Integration", accent: "violet" },
    { name: "Pandas", icon: "analytics", category: "AI", tooltip: "Data Analysis", accent: "sky" },
    { name: "NumPy", icon: "calculate", category: "AI", tooltip: "Numerical Computing", accent: "sky" },
    { name: "LangChain", icon: "link", category: "AI", tooltip: "LLM Orchestration", accent: "emerald" },
    // Cloud
    { name: "AWS / Azure", icon: "cloud", category: "Cloud", tooltip: "Cloud Platforms", accent: "sky" },
    { name: "Docker", icon: "inventory_2", category: "Cloud", tooltip: "Containerisation", accent: "sky" },
    { name: "Kubernetes", icon: "sailing", category: "Cloud", tooltip: "Container Orchestration", accent: "sky" },
    { name: "Terraform", icon: "settings_input_component", category: "Cloud", tooltip: "IaC", accent: "violet" },
    { name: "Jenkins", icon: "history", category: "Cloud", tooltip: "CI/CD Automation", accent: "orange" },
    { name: "GitHub Actions", icon: "play_circle", category: "Cloud", tooltip: "CI/CD Pipelines", accent: "orange" },
    // Database
    { name: "PostgreSQL", icon: "database", category: "Database", tooltip: "Relational DB", accent: "sky" },
    { name: "MongoDB", icon: "data_array", category: "Database", tooltip: "Document DB", accent: "emerald" },
    { name: "Firebase", icon: "local_fire_department", category: "Database", tooltip: "BaaS", accent: "orange" },
    { name: "Redis", icon: "flash_on", category: "Database", tooltip: "In-Memory Cache", accent: "rose" },
    { name: "Elasticsearch", icon: "search", category: "Database", tooltip: "Search Engine", accent: "amber" },
    { name: "Supabase", icon: "electric_bolt", category: "Database", tooltip: "Open-source Firebase", accent: "emerald" },
    // Tools
    { name: "Figma", icon: "brush", category: "Tools", tooltip: "Design Tool", accent: "violet" },
    { name: "Git / GitHub", icon: "account_tree", category: "Tools", tooltip: "Version Control", accent: "orange" },
    { name: "Stripe API", icon: "payments", category: "Tools", tooltip: "Payment Processing", accent: "violet" },
    { name: "Postman", icon: "send", category: "Tools", tooltip: "API Testing", accent: "orange" },
    { name: "Jira", icon: "task_alt", category: "Tools", tooltip: "Project Management", accent: "sky" },
    { name: "Slack API", icon: "forum", category: "Tools", tooltip: "Team Integration", accent: "violet" },
];

const CATEGORIES: Category[] = ["All", "Frontend", "Backend", "AI", "Cloud", "Database", "Tools"];

const CATEGORY_META: Record<Exclude<Category, "All">, { icon: string; label: string; desc: string; color: string }> = {
    Frontend: { icon: "web", label: "Frontend", desc: "UI / Interfaces", color: "bg-sky-50 text-sky-600 border-sky-100" },
    Backend: { icon: "dns", label: "Backend", desc: "Server / API Layer", color: "bg-orange-50 text-orange-600 border-orange-100" },
    AI: { icon: "psychology", label: "AI / Data", desc: "ML & Intelligence", color: "bg-violet-50 text-violet-600 border-violet-100" },
    Cloud: { icon: "cloud", label: "Cloud", desc: "Infra & DevOps", color: "bg-sky-50 text-sky-600 border-sky-100" },
    Database: { icon: "database", label: "Database", desc: "Data Storage", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    Tools: { icon: "build", label: "Tools", desc: "Dev Toolchain", color: "bg-amber-50 text-amber-600 border-amber-100" },
};

const ACCENT_MAP: Record<string, string> = {
    orange: "group-hover:border-orange-300 group-hover:shadow-orange-100",
    sky: "group-hover:border-sky-300 group-hover:shadow-sky-100",
    emerald: "group-hover:border-emerald-300 group-hover:shadow-emerald-100",
    violet: "group-hover:border-violet-300 group-hover:shadow-violet-100",
    rose: "group-hover:border-rose-300 group-hover:shadow-rose-100",
    amber: "group-hover:border-amber-300 group-hover:shadow-amber-100",
};

const ICON_ACCENT: Record<string, string> = {
    orange: "text-orange-500 group-hover:bg-orange-100",
    sky: "text-sky-500 group-hover:bg-sky-100",
    emerald: "text-emerald-500 group-hover:bg-emerald-100",
    violet: "text-violet-500 group-hover:bg-violet-100",
    rose: "text-rose-500 group-hover:bg-rose-100",
    amber: "text-amber-500 group-hover:bg-amber-100",
};

// ═══════════════════════════════════════════════════════
// TECH CARD
// ═══════════════════════════════════════════════════════
function TechCard({ tech, index }: { tech: Tech; index: number }) {
    const [hovered, setHovered] = useState(false);
    const accent = tech.accent ?? "orange";

    return (
        <Reveal delay={index * 35}>
            <div
                className={`group relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border-2 border-stone-100 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${ACCENT_MAP[accent]}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Hover top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left bg-gradient-to-r ${accent === "orange" ? "from-orange-400 to-amber-400" :
                        accent === "sky" ? "from-sky-400 to-blue-400" :
                            accent === "emerald" ? "from-emerald-400 to-teal-400" :
                                accent === "violet" ? "from-violet-400 to-purple-400" :
                                    accent === "rose" ? "from-rose-400 to-pink-400" :
                                        "from-amber-400 to-yellow-400"
                    }`} />

                <div className={`w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 ${ICON_ACCENT[accent]}`}>
                    <span className={`material-symbols-outlined text-2xl ${ICON_ACCENT[accent]}`}>{tech.icon}</span>
                </div>
                <span className="text-xs font-bold text-stone-600 group-hover:text-stone-900 transition-colors text-center leading-tight">{tech.name}</span>

                {/* Tooltip */}
                {tech.tooltip && hovered && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg z-20"
                        style={{ animation: "tooltipIn .15s ease" }}>
                        {tech.tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900" />
                    </div>
                )}
            </div>
        </Reveal>
    );
}

// ═══════════════════════════════════════════════════════
// CATEGORY SECTION
// ═══════════════════════════════════════════════════════
function CategorySection({ category, techs }: { category: Exclude<Category, "All">; techs: Tech[] }) {
    const meta = CATEGORY_META[category];
    return (
        <div className="space-y-6">
            <Reveal>
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-stone-100" />
                    <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border ${meta.color} text-sm font-bold`}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{meta.icon}</span>
                        {meta.label}
                        <span className="text-[10px] opacity-60 font-medium">— {meta.desc}</span>
                    </div>
                    <div className="h-px flex-1 bg-stone-100" />
                </div>
            </Reveal>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {techs.map((t, i) => <TechCard key={t.name} tech={t} index={i} />)}
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════
// STATS BAR
// ═══════════════════════════════════════════════════════
function StatsBar() {
    const [ref, visible] = useInView(0.4);
    const stats = [
        { val: 40, suf: "+", label: "Technologies" },
        { val: 250, suf: "+", label: "Projects Delivered" },
        { val: 6, suf: "", label: "Tech Categories" },
        { val: 99, suf: "%", label: "Uptime Guaranteed" },
    ];
    return (
        <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {stats.map((s, i) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const count = (() => {
                    const [v, setV] = useState(0);
                    useEffect(() => {
                        if (!visible) return;
                        let start: number | null = null;
                        const step = (ts: number) => {
                            if (!start) start = ts;
                            const p = Math.min((ts - start) / 1600, 1);
                            setV(Math.floor(p * s.val));
                            if (p < 1) requestAnimationFrame(step);
                        };
                        requestAnimationFrame(step);
                    }, [visible]);
                    return v;
                })();
                return (
                    <div key={s.label} className="text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `all 0.6s ease ${i * 100}ms` }}>
                        <p style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-stone-900">
                            {count}<span className="text-orange-500">{s.suf}</span>
                        </p>
                        <p className="text-xs text-stone-400 mt-1 font-semibold tracking-wider uppercase">{s.label}</p>
                    </div>
                );
            })}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function TechStackPage() {
    const [activeFilter, setActiveFilter] = useState<Category>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTechs = TECHS.filter((t) =>
        (activeFilter === "All" || t.category === activeFilter) &&
        (searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const groupedByCategory = CATEGORIES.filter((c) => c !== "All").reduce<Record<string, Tech[]>>((acc, cat) => {
        const items = filteredTechs.filter((t) => t.category === cat);
        if (items.length > 0) acc[cat] = items;
        return acc;
    }, {});

    const showGrouped = activeFilter === "All" && searchQuery === "";

    return (
        <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <style>{`
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes fadeIn     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tooltipIn  { from{opacity:0;transform:translateX(-50%) translateY(4px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes scanLine   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .shimmer-text {
          background: linear-gradient(90deg, #ea640a 0%, #f59e0b 30%, #ea640a 60%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

            <CursorGlow />
            <main>
                {/* ── HERO ── */}
                <section className="relative min-h-[680px] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-[#faf8f5] to-sky-50/30" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

                    {/* Decorative floating icons */}
                    <div className="absolute top-32 left-10 md:left-40 opacity-10 select-none" style={{ animation: "floatY 6s ease-in-out infinite" }}>
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 72 }}>terminal</span>
                    </div>
                    <div className="absolute bottom-24 right-10 md:right-40 opacity-10 select-none" style={{ animation: "floatY 8s ease-in-out infinite 1s" }}>
                        <span className="material-symbols-outlined text-sky-500" style={{ fontSize: 72 }}>cloud_done</span>
                    </div>
                    <div className="absolute top-1/2 left-8 opacity-8 select-none hidden lg:block" style={{ animation: "floatY 7s ease-in-out infinite 2s" }}>
                        <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: 48 }}>psychology</span>
                    </div>
                    <div className="absolute top-1/3 right-8 opacity-8 select-none hidden lg:block" style={{ animation: "floatY 5s ease-in-out infinite .5s" }}>
                        <span className="material-symbols-outlined text-violet-400" style={{ fontSize: 48 }}>hub</span>
                    </div>

                    {/* Spinning ring decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-orange-200/50 pointer-events-none"
                        style={{ animation: "spinSlow 40s linear infinite" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-orange-100/40 pointer-events-none"
                        style={{ animation: "spinSlow 28s linear infinite reverse" }} />

                    <div className="relative z-10 text-center max-w-4xl space-y-8">
                        <Reveal delay={0}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                                </span>
                                Production-Ready Stack
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h1 style={{ fontFamily: "'Fraunces',serif" }} className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
                                Our <span className="shimmer-text">Technology</span><br />Stack
                            </h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
                                We use modern, scalable, and powerful technologies to build high-performance applications that stand the test of time.
                            </p>
                        </Reveal>

                        {/* Search bar */}
                        <Reveal delay={300}>
                            <div className="max-w-md mx-auto relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" style={{ fontSize: 20 }}>search</span>
                                <input
                                    type="text"
                                    placeholder="Search technologies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-white border-2 border-stone-200 text-stone-700 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:border-orange-300 focus:shadow-lg focus:shadow-orange-50 transition-all duration-200"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                                    </button>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Marquee */}
                <MarqueeStrip />

                {/* Stats */}
                <section className="px-6 bg-white border-b border-stone-100">
                    <StatsBar />
                </section>

                {/* ── FILTER TABS ── */}
                <section className="py-10 px-6 bg-[#faf8f5]">
                    <div className="max-w-7xl mx-auto">
                        <Reveal>
                            <div className="flex flex-wrap justify-center gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button key={cat} onClick={() => setActiveFilter(cat)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${activeFilter === cat
                                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200"
                                                : "bg-white border border-stone-200 text-stone-500 hover:border-orange-300 hover:text-orange-600"
                                            }`}>
                                        {cat === "All" ? `All (${TECHS.length})` : `${cat} (${TECHS.filter(t => t.category === cat).length})`}
                                    </button>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── TECH GRID ── */}
                <section className="px-6 pb-32 bg-[#faf8f5]">
                    <div className="max-w-7xl mx-auto space-y-16">

                        {/* Empty state */}
                        {filteredTechs.length === 0 && (
                            <div className="text-center py-20">
                                <span className="material-symbols-outlined block mx-auto mb-4 text-stone-300" style={{ fontSize: 56 }}>search_off</span>
                                <p className="text-stone-400 font-medium">No technologies match "<span className="text-stone-600">{searchQuery}</span>"</p>
                                <button onClick={() => setSearchQuery("")} className="mt-4 text-orange-500 font-semibold text-sm hover:underline">Clear search</button>
                            </div>
                        )}

                        {/* Grouped view (All, no search) */}
                        {showGrouped && Object.entries(groupedByCategory).map(([cat, techs]) => (
                            <CategorySection key={cat} category={cat as Exclude<Category, "All">} techs={techs} />
                        ))}

                        {/* Flat filtered view */}
                        {!showGrouped && filteredTechs.length > 0 && (
                            <div>
                                <Reveal>
                                    <p className="text-sm text-stone-400 mb-6 font-medium">
                                        Showing <span className="text-stone-700 font-bold">{filteredTechs.length}</span> {filteredTechs.length === 1 ? "technology" : "technologies"}
                                        {activeFilter !== "All" && <span> in <span className="text-orange-600">{activeFilter}</span></span>}
                                        {searchQuery && <span> matching "<span className="text-orange-600">{searchQuery}</span>"</span>}
                                    </p>
                                </Reveal>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
                                    {filteredTechs.map((t, i) => <TechCard key={t.name} tech={t} index={i} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── WHY OUR STACK ── */}
                <section className="py-28 px-6 bg-white border-t border-stone-100">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="text-center mb-16">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Philosophy</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 mb-4">Why This Stack?</h2>
                            <p className="text-stone-400 max-w-xl mx-auto">Every technology in our arsenal is chosen with intent — performance, scalability, and developer joy.</p>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: "speed", title: "Performance First", desc: "Every tech is benchmarked. We don't compromise on load times, throughput, or response latency.", accent: "bg-orange-50 text-orange-600 border-orange-100" },
                                { icon: "trending_up", title: "Scales With You", desc: "From MVP to millions of users, our stack choices support every phase of your product's growth.", accent: "bg-sky-50 text-sky-600 border-sky-100" },
                                { icon: "security", title: "Battle-Tested", desc: "We use technologies trusted by the world's largest engineering teams — not the latest shiny thing.", accent: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                            ].map((c, i) => (
                                <Reveal key={c.title} delay={i * 100}>
                                    <div className="group bg-stone-50 border border-stone-100 rounded-3xl p-8 hover:bg-white hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350">
                                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${c.accent}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 26 }}>{c.icon}</span>
                                        </div>
                                        <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-3">{c.title}</h3>
                                        <p className="text-stone-400 text-sm leading-relaxed">{c.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-28 px-6 bg-[#faf8f5] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

                    <Reveal className="relative max-w-4xl mx-auto bg-stone-900 rounded-[2.5rem] p-14 md:p-24 text-center overflow-hidden shadow-2xl shadow-stone-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent" />
                        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

                        {/* Animated scan line */}
                        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-60"
                            style={{ animation: "scanLine 3s linear infinite" }} />

                        <div className="relative z-10">
                            <div className="inline-block px-5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
                                Let's Build Together
                            </div>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Start Your<br />Next Project
                            </h2>
                            <p className="text-stone-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                                Tell us what you're building and we'll recommend the perfect stack for your use case.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-xl shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                                    Start a Project →
                                </button>
                                <button className="px-10 py-5 rounded-2xl border-2 border-stone-700 text-stone-300 font-bold text-lg hover:border-orange-500 hover:text-orange-400 transition-all duration-300">
                                    View Case Studies
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </section>
            </main>
        </div>
    );
}