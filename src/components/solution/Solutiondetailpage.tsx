import { useState, useEffect, useRef, ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, Project, FeatureItem, BenefitItem, MarketItem, TechItem, PortfolioItem, StatItem } from "./projectdata";

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// SHARED UI ATOMS
// ─────────────────────────────────────────────────────────────
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
            transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms,
                   transform  0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

function CursorGlow() {
    const [pos, setPos] = useState({ x: -300, y: -300 });
    useEffect(() => {
        const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", m);
        return () => window.removeEventListener("mousemove", m);
    }, []);
    return (
        <div className="pointer-events-none fixed z-0 rounded-full" style={{
            width: 500, height: 500, left: pos.x - 250, top: pos.y - 250,
            background: "radial-gradient(circle, rgba(234,100,30,0.07) 0%, transparent 70%)",
            transition: "left 0.1s ease, top 0.1s ease",
        }} />
    );
}

function ProgressBar({ pct, label }: { pct: number; label: string }) {
    const [ref, visible] = useInView(0.3);
    return (
        <div ref={ref} className="mb-5">
            <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1.5">
                <span>{label}</span><span className="text-orange-500">{pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
                    style={{ width: visible ? `${pct}%` : "0%", transition: "width 1.2s cubic-bezier(.22,1,.36,1) 300ms" }} />
            </div>
        </div>
    );
}

function StatCounter({ val, suf, label }: StatItem) {
    const [ref, visible] = useInView(0.5);
    const count = useCountUp(val, 1800, visible);
    return (
        <div ref={ref}>
            <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-bold text-stone-900">
                {count}<span className="text-orange-500">{suf}</span>
            </p>
            <p className="text-xs text-stone-400 mt-0.5 font-medium">{label}</p>
        </div>
    );
}


// ─────────────────────────────────────────────────────────────
// 404 STATE
// ─────────────────────────────────────────────────────────────
function NotFound({ slug }: { slug: string }) {
    return (
        <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 32 }}>search_off</span>
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900 mb-3">
                Solution not found
            </h1>
            <p className="text-stone-400 mb-8 max-w-sm">
                No solution matched the slug <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 text-sm">{slug}</code>. Check the URL or go back to browse all projects.
            </p>
            <Link to="/solutions"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all duration-300">
                Browse All Solutions
            </Link>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// DETAIL PAGE CONTENT
// ─────────────────────────────────────────────────────────────
function DetailContent({ project }: { project: Project }) {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
    const [hoveredMarket, setHoveredMarket] = useState<number | null>(null);

    return (
        <main>
            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-[#faf8f5] to-sky-50/30" />
                <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-orange-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: "radial-gradient(circle, #ea640a 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }} />

                <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-24">
                    {/* Left */}
                    <div className="space-y-8">
                        <Reveal delay={0}>
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70"
                                        style={{ animation: "pulseRing 1.6s infinite" }} />
                                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                                </span>
                                {project.badge}
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h1 style={{ fontFamily: "'Fraunces', serif" }}
                                className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tight text-stone-900">
                                {project.heroTitle.split(" ").slice(0, -1).join(" ")}<br />
                                <span className="text-orange-500">{project.heroTitle.split(" ").slice(-1)}</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-lg text-stone-500 max-w-lg leading-relaxed">{project.heroSubtitle}</p>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                                    Start Your Project →
                                </button>
                                <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-base hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                                    View Demo
                                </button>
                            </div>
                        </Reveal>

                        <Reveal delay={400}>
                            <div className="flex gap-8 pt-4">
                                {project.stats.map((s: any) => <StatCounter key={s.label} {...s} />)}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — floating card visual */}
                    <Reveal delay={150} direction="right" className="hidden lg:flex justify-center items-center">
                        <div className="relative" style={{ width: 380, height: 520 }}>
                            <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-orange-200"
                                style={{ margin: -40, animation: "spinSlow 22s linear infinite" }} />
                            <div className="absolute inset-0 rounded-full border border-orange-100/60"
                                style={{ margin: -80, animation: "spinSlow 16s linear infinite reverse" }} />

                            <div className="relative z-10 w-full h-full bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50 overflow-hidden flex flex-col"
                                style={{ animation: "floatY 5s ease-in-out infinite" }}>
                                {/* Visual header */}
                                <div className="flex-1 bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-10"
                                        style={{ backgroundImage: "linear-gradient(45deg,#ea640a 25%,transparent 25%),linear-gradient(-45deg,#ea640a 25%,transparent 25%)", backgroundSize: "32px 32px" }} />
                                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-70"
                                        style={{ animation: "scanLine 2.5s linear infinite" }} />
                                    <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/80 backdrop-blur flex items-center justify-center shadow-xl">
                                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 48 }}>
                                            {project.features[0]?.icon || "rocket_launch"}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                        <span className="text-[10px] font-bold text-stone-700">{project.tag}</span>
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="p-5 space-y-3">
                                    <h3 style={{ fontFamily: "'Fraunces', serif" }} className="font-bold text-stone-900">{project.title}</h3>
                                    <p className="text-xs text-stone-400 leading-relaxed">{project.desc}</p>
                                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                                            style={{ animation: "shimBar 2s ease-in-out infinite" }} />
                                    </div>
                                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200">
                                        Explore Features
                                    </button>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 bg-white shadow-xl shadow-stone-200 rounded-2xl p-3.5 flex items-center gap-2.5 border border-stone-50 z-20"
                                style={{ animation: "badgePop .6s cubic-bezier(.34,1.56,.64,1) 600ms both" }}>
                                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sky-500" style={{ fontSize: 20 }}>
                                        {project.features[1]?.icon || "star"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-stone-800">{project.features[1]?.title}</p>
                                    <p className="text-[9px] text-stone-400">Core module</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-white shadow-xl shadow-stone-200 rounded-2xl p-3.5 flex items-center gap-2.5 border border-stone-50 z-20"
                                style={{ animation: "badgePop .6s cubic-bezier(.34,1.56,.64,1) 800ms both" }}>
                                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>
                                        {project.features[2]?.icon || "settings"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-stone-800">{project.features[2]?.title}</p>
                                    <p className="text-[9px] text-stone-400">Enterprise ready</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="py-24 px-6 bg-white border-y border-stone-100">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <Reveal className="lg:col-span-4" direction="left">
                        <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Overview</p>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900 leading-tight mb-6">
                            About This<br />Solution
                        </h2>
                        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                    </Reveal>

                    <Reveal className="lg:col-span-8" delay={150} direction="right">
                        <p className="text-xl text-stone-500 leading-relaxed mb-8">
                            Our Neural Amber <strong className="text-stone-700">{project.title}</strong> solution is a scalable ecosystem
                            built for enterprise demands. We prioritize performance, security, and developer experience — so your team
                            ships faster and your users stay engaged.
                        </p>
                        <div className="space-y-4">
                            {project.features.slice(0, 4).map((f: any, i: any) => (
                                <ProgressBar key={f.title} pct={[98, 94, 99, 88][i]} label={f.title} />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-28 px-6 bg-[#faf8f5]">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="text-center mb-16">
                        <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Capabilities</p>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900 mb-4">
                            Core Ecosystem Features
                        </h2>
                        <p className="text-stone-400 max-w-xl mx-auto">Engineered for reliability, designed for human connection.</p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.features.map((f: FeatureItem, i: number) => (
                            <Reveal key={f.title} delay={i * 80}>
                                <div
                                    className="group relative bg-white rounded-3xl p-8 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-50 transition-all duration-350 cursor-default overflow-hidden"
                                    onMouseEnter={() => setHoveredFeature(i)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                                    <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${f.accent === "orange" ? "bg-gradient-to-r from-orange-400 to-orange-600" : "bg-gradient-to-r from-sky-400 to-sky-600"
                                        }`} />
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${f.accent === "orange" ? "bg-orange-50 group-hover:bg-orange-100" : "bg-sky-50 group-hover:bg-sky-100"
                                            }`}>
                                            <span className={`material-symbols-outlined text-2xl ${f.accent === "orange" ? "text-orange-500" : "text-sky-500"}`}>
                                                {f.icon}
                                            </span>
                                        </div>
                                        <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                                        <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                    {hoveredFeature === i && (
                                        <div className={`absolute bottom-4 right-4 ${f.accent === "orange" ? "text-orange-400" : "text-sky-400"}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_outward</span>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="py-20 px-6 bg-white border-y border-stone-100">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <p className="text-center text-orange-500 font-bold tracking-[0.3em] text-xs uppercase mb-12">
                            Powered By Neural Stack
                        </p>
                    </Reveal>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                        {project.techStack.map((t: TechItem, i: number) => (
                            <Reveal key={t.label} delay={i * 60}>
                                <div className="group flex items-center gap-3 cursor-default">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${t.accent === "orange"
                                            ? "bg-orange-50 text-orange-600 group-hover:bg-orange-100 group-hover:shadow-orange-200"
                                            : "bg-sky-50 text-sky-600 group-hover:bg-sky-100 group-hover:shadow-sky-200"
                                        }`}>
                                        {t.short}
                                    </div>
                                    <span className="text-sm font-semibold text-stone-500 group-hover:text-stone-800 transition-colors">{t.label}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BENEFITS + MARKET ── */}
            <section className="py-28 px-6 bg-[#faf8f5]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <Reveal direction="left">
                        <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900 mb-10 leading-tight">
                            Why Enterprise<br />Choose Our Framework
                        </h2>
                        <div className="space-y-8">
                            {project.benefits.map((b: BenefitItem) => (
                                <div key={b.title} className="flex gap-5 group">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300 mt-0.5">
                                        <span className="material-symbols-outlined text-orange-500 group-hover:text-white transition-colors duration-300"
                                            style={{ fontSize: 16, fontVariationSettings: "'wght' 700" }}>check</span>
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-stone-900 mb-2">{b.title}</h4>
                                        <p className="text-stone-400 text-sm leading-relaxed">{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={150} direction="right">
                        <div className="bg-white rounded-3xl p-10 border border-stone-100 shadow-lg shadow-stone-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2">Verticals</p>
                                <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-bold text-stone-900 mb-7">Market Applications</h3>
                                <ul className="space-y-4">
                                    {project.marketApps.map((m: MarketItem, i: number) => (
                                        <li key={m.title}
                                            className={`p-5 rounded-2xl border-2 cursor-default transition-all duration-300 ${hoveredMarket === i
                                                    ? "border-orange-300 bg-orange-50 shadow-md shadow-orange-50"
                                                    : "border-stone-100 hover:border-orange-200"
                                                }`}
                                            onMouseEnter={() => setHoveredMarket(i)}
                                            onMouseLeave={() => setHoveredMarket(null)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-stone-900 mb-1">{m.title}</p>
                                                    <p className="text-sm text-stone-400">{m.desc}</p>
                                                </div>
                                                <span className={`material-symbols-outlined transition-all duration-300 flex-shrink-0 ml-3 mt-0.5 ${hoveredMarket === i ? "text-orange-500 rotate-45" : "text-stone-300"
                                                    }`} style={{ fontSize: 18 }}>arrow_outward</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── PORTFOLIO ── */}
            <section className="py-28 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
                        <div>
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Gallery</p>
                            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900 mb-3">Solution in Action</h2>
                            <p className="text-stone-400 max-w-xl">A closer look at the precision-engineered interface of our deployment-ready solution.</p>
                        </div>
                        <button className="flex items-center gap-2 group text-orange-600 font-bold text-sm flex-shrink-0">
                            <span>View Full Portfolio</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform" style={{ fontSize: 20 }}>arrow_right_alt</span>
                        </button>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.portfolioItems.map((p: PortfolioItem, i: number) => (
                            <Reveal key={p.sub} delay={i * 80}>
                                <div className={`group relative overflow-hidden rounded-3xl bg-stone-100 cursor-pointer ${i === 1 ? "md:mt-10" : ""}`}
                                    style={{ aspectRatio: "4/5" }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100" />
                                    <div className="absolute inset-0 opacity-15"
                                        style={{ backgroundImage: "linear-gradient(45deg,#ea640a 25%,transparent 25%),linear-gradient(-45deg,#ea640a 25%,transparent 25%)", backgroundSize: "40px 40px" }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <span className="material-symbols-outlined text-stone-600 group-hover:text-white transition-colors" style={{ fontSize: 32 }}>
                                                {p.icon}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                                        <p className={`bg-gradient-to-r ${p.accentClass} bg-clip-text text-transparent font-bold text-[10px] uppercase tracking-widest mb-1.5`}>
                                            {p.label}
                                        </p>
                                        <h4 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-white drop-shadow-lg">{p.sub}</h4>
                                    </div>
                                    <div className={`absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r ${p.accentClass}`} />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-28 px-6 bg-[#faf8f5] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: "radial-gradient(circle, #ea640a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

                <Reveal className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-200 p-14 md:p-20 text-center overflow-hidden">
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-100 rounded-full blur-3xl" />
                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-sky-50 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <div className="inline-block px-5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-8">
                            Ready to Build?
                        </div>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                            Want to build this<br /><span className="text-orange-500">custom solution?</span>
                        </h2>
                        <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                            Our architects are ready to help you blueprint, build, and scale your next high-impact digital venture.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                                Contact Our Architects →
                            </button>
                            <button className="px-10 py-5 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-lg hover:border-orange-300 hover:text-orange-600 transition-all duration-300">
                                Schedule a Demo
                            </button>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}

// ─────────────────────────────────────────────────────────────
// PAGE EXPORT  —  used in your router as:
//   <Route path="/solution/:type" element={<SolutionDetailPage />} />
// ─────────────────────────────────────────────────────────────
export default function SolutionDetailPage() {
    const { type } = useParams<{ type: string }>();       // /solution/:type
    const project = getProjectBySlug(type ?? "");

    // Scroll to top whenever slug changes
    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [type]);

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <style>{`
        @keyframes spinSlow  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2);opacity:0} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes shimBar   { 0%,100%{opacity:.6;transform:scaleX(.95)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes badgePop  { 0%{transform:scale(.8) translateY(8px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
      `}</style>

            <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <CursorGlow />
                {project ? <DetailContent project={project} /> : <NotFound slug={type ?? ""} />}
            </div>
        </>
    );
}