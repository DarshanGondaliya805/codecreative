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
            background: "radial-gradient(circle, rgba(234,100,30,0.07) 0%, transparent 70%)",
            transition: "left 0.1s ease, top 0.1s ease",
        }} />
    );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const DEV_CATEGORIES = [
    { icon: "web", title: "Frontend Developers", desc: "Mastering React, Next.js, and Vue to build high-performance user interfaces.", tags: ["REACT", "NEXT.JS", "TYPESCRIPT"], accent: "sky", wide: true },
    { icon: "database", title: "Backend Engineers", desc: "Node, Python, and Java experts for scalable logic.", tags: [], accent: "emerald", wide: false },
    { icon: "smartphone", title: "Mobile Apps", desc: "Cross-platform excellence with Flutter and React Native.", tags: [], accent: "violet", wide: false },
    { icon: "memory", title: "AI / ML", desc: "LLM integration and neural network architecture.", tags: [], accent: "rose", wide: false },
    { icon: "cloud_done", title: "DevOps & Cloud", desc: "AWS, Azure, and Google Cloud specialists focusing on CI/CD and IaC.", tags: ["AWS", "KUBERNETES", "TERRAFORM"], accent: "orange", wide: true },
    { icon: "currency_exchange", title: "Blockchain", desc: "Solidity and smart contract development.", tags: [], accent: "amber", wide: false },
];

const WHY_US = [
    { icon: "verified_user", title: "Pre-vetted Developers", desc: "Only the top 1% pass our rigorous technical and soft-skill assessments.", accent: "orange" },
    { icon: "bolt", title: "Fast Onboarding", desc: "Scale from zero to a full squad in less than 7 days.", accent: "sky" },
    { icon: "support_agent", title: "24/7 Dedicated Support", desc: "A project manager is assigned to every team for seamless communication.", accent: "emerald" },
];

const PLANS = [
    {
        name: "Hourly Model", price: "$35", unit: "/hr", popular: false,
        perks: ["Pay only for hours worked", "Daily time tracking", "Ideal for small tasks"],
        cta: "Select Model",
    },
    {
        name: "Dedicated Developer", price: "$4,500", unit: "/mo", popular: true,
        perks: ["160 hours per month", "Direct communication", "Scalable resources", "Dedicated Project Manager"],
        cta: "Select Model",
    },
    {
        name: "Project-Based", price: "Custom", unit: "", popular: false,
        perks: ["Fixed scope & budget", "Milestone-based payments", "End-to-end delivery"],
        cta: "Get Quote",
    },
];

const STEPS = [
    { num: "01", title: "Requirement Analysis", desc: "We dive deep into your tech stack and vision." },
    { num: "02", title: "Developer Matching", desc: "We hand-pick the perfect match for your culture." },
    { num: "03", title: "Selection", desc: "Technical interviews and vetting by your team." },
    { num: "04", title: "Onboarding", desc: "Seamless integration into your Slack/Jira." },
];

const PROJECTS = [
    { label: "Mobility", tag: "orange", title: "LuxeDrive App", icon: "directions_car" },
    { label: "Fintech", tag: "sky", title: "YieldMax AI", icon: "trending_up" },
    { label: "E-Commerce", tag: "violet", title: "StoreFront 2.0", icon: "storefront" },
    { label: "Healthcare", tag: "rose", title: "MediSync Core", icon: "monitor_heart" },
];

const TESTIMONIALS = [
    { name: "Marcus Chen", role: "CTO @ NexaGrid", initials: "MC", bg: "bg-orange-100 text-orange-600", quote: "Code Creative didn't just provide developers; they provided partners. Our React Native app was delivered 2 weeks early." },
    { name: "Sarah Jenkins", role: "VPE @ HealthFlow", initials: "SJ", bg: "bg-sky-100 text-sky-600", quote: "The quality of code is exceptional. Their Node.js experts optimized our backend resulting in a 40% speed boost." },
    { name: "David Miller", role: "Founder @ EcoShop", initials: "DM", bg: "bg-emerald-100 text-emerald-600", quote: "Extremely flexible models. We started with one developer and grew to a squad of six in under a month." },
];

const TECH_ECOSYSTEM = [
    { icon: "terminal", label: "FRONTEND" },
    { icon: "storage", label: "BACKEND" },
    { icon: "cloud", label: "CLOUD" },
    { icon: "hub", label: "DEVOPS" },
    { icon: "settings_input_component", label: "DATABASES" },
];

const ACCENT_CARD: Record<string, string> = {
    sky: "group-hover:border-sky-200 group-hover:shadow-sky-50",
    emerald: "group-hover:border-emerald-200 group-hover:shadow-emerald-50",
    violet: "group-hover:border-violet-200 group-hover:shadow-violet-50",
    rose: "group-hover:border-rose-200 group-hover:shadow-rose-50",
    orange: "group-hover:border-orange-200 group-hover:shadow-orange-50",
    amber: "group-hover:border-amber-200 group-hover:shadow-amber-50",
};

const ACCENT_ICON: Record<string, string> = {
    sky: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
};

const PROJECT_TAG: Record<string, string> = {
    orange: "text-orange-400", sky: "text-sky-400", violet: "text-violet-400", rose: "text-rose-400",
};

// ═══════════════════════════════════════════════════════
// STAT COUNTER
// ═══════════════════════════════════════════════════════
function StatCounter({ val, suf, label }: { val: number; suf: string; label: string }) {
    const [ref, visible] = useInView(0.5);
    const count = useCountUp(val, 1800, visible);
    return (
        <div ref={ref} className="text-center">
            <p style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900">
                {count}<span className="text-orange-500">{suf}</span>
            </p>
            <p className="text-xs text-stone-400 mt-1 font-semibold tracking-wider uppercase">{label}</p>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════
export default function HireDevelopersPage() {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
            style={{ fontFamily: "'DM Sans',sans-serif" }}>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <style>{`
        @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinRev    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes shimBar    { 0%,100%{opacity:.6;transform:scaleX(.95)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes badgePop   { 0%{transform:scale(.8) translateY(8px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes scanLine   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
      `}</style>

            <CursorGlow />
            <main>
                {/* ── HERO ── */}
                <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-[#faf8f5] to-sky-50/30" />
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10 py-24">
                        {/* Left */}
                        <div className="space-y-8">
                            <Reveal delay={0}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                                        <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                                    </span>
                                    Global Engineering Network
                                </div>
                            </Reveal>

                            <Reveal delay={100}>
                                <h1 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tight text-stone-900">
                                    Hire Expert<br /><span className="text-orange-500">Developers</span>
                                </h1>
                            </Reveal>

                            <Reveal delay={200}>
                                <p className="text-lg text-stone-500 max-w-md leading-relaxed font-light">
                                    Scale your team with top-tier developers across web, mobile, AI, and cloud infrastructure. We engineer the future.
                                </p>
                            </Reveal>

                            <Reveal delay={300}>
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                                        Hire Now →
                                    </button>
                                    <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                                        View Technologies
                                    </button>
                                </div>
                            </Reveal>

                            {/* Quick stats */}
                            <Reveal delay={400}>
                                <div className="flex gap-8 pt-2">
                                    <StatCounter val={500} suf="+" label="Developers" />
                                    <StatCounter val={48} suf="hr" label="Onboarding" />
                                    <StatCounter val={98} suf="%" label="Retention" />
                                </div>
                            </Reveal>
                        </div>

                        {/* Right — animated orb */}
                        <Reveal delay={150} direction="right" className="hidden md:flex justify-center items-center">
                            <div className="relative" style={{ width: 440, height: 480 }}>
                                {/* Outer spinning ring */}
                                <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-orange-200"
                                    style={{ margin: -20, animation: "spinSlow 22s linear infinite" }} />
                                {/* Inner ring reverse */}
                                <div className="absolute inset-0 rounded-full border border-stone-200"
                                    style={{ margin: 20, animation: "spinRev 16s linear infinite" }} />

                                {/* Central orb */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-2xl shadow-orange-100 border border-orange-50 flex items-center justify-center z-10"
                                    style={{ animation: "floatY 5s ease-in-out infinite" }}>
                                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-orange-100" style={{ animation: "spinSlow 10s linear infinite" }} />
                                    <span style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-orange-500 relative z-10">CC</span>
                                </div>

                                {/* Floating tech badges */}
                                {[
                                    { icon: "terminal", label: "NODE.JS", pos: "top-[40px] left-[30px]", color: "text-sky-500", delay: "0s" },
                                    { icon: "deployed_code", label: "DOCKER", pos: "bottom-[40px] right-[30px]", color: "text-orange-500", delay: "1.5s" },
                                    { icon: "psychology", label: "AI/ML", pos: "top-[80px] right-[10px]", color: "text-violet-500", delay: "0.8s" },
                                    { icon: "javascript", label: "REACT", pos: "bottom-[80px] left-[10px]", color: "text-emerald-500", delay: "2s" },
                                ].map((b) => (
                                    <div key={b.label}
                                        className={`absolute ${b.pos} bg-white rounded-2xl p-4 shadow-lg border border-stone-100 flex flex-col items-center gap-1.5 z-20`}
                                        style={{ animation: `floatY 5s ease-in-out infinite ${b.delay}` }}>
                                        <span className={`material-symbols-outlined ${b.color}`} style={{ fontSize: 24 }}>{b.icon}</span>
                                        <span className="text-[9px] font-bold text-stone-500 tracking-widest">{b.label}</span>
                                    </div>
                                ))}

                                {/* Scan line across orb */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden z-[5] pointer-events-none">
                                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
                                        style={{ animation: "scanLine 2.5s linear infinite" }} />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── DEVELOPER CATEGORIES ── */}
                <section className="py-28 px-6 bg-white border-y border-stone-100">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="mb-14">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Expertise</p>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                                    On-Demand Engineering <span className="text-orange-500">Talent</span>
                                </h2>
                                <p className="text-stone-400 max-w-xs text-sm">Curated experts ready to integrate with your existing workflow within 48 hours.</p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            {DEV_CATEGORIES.map((cat, i) => (
                                <Reveal key={cat.title} delay={i * 60} className={cat.wide ? "md:col-span-2" : ""}>
                                    <div className={`group bg-stone-50 border-2 border-stone-100 rounded-3xl p-8 h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-350 cursor-default overflow-hidden relative ${ACCENT_CARD[cat.accent]}`}>
                                        <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${ACCENT_ICON[cat.accent]}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{cat.icon}</span>
                                        </div>
                                        <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-2">{cat.title}</h3>
                                        <p className="text-stone-400 text-sm leading-relaxed mb-5">{cat.desc}</p>
                                        {cat.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {cat.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 rounded-full bg-white border border-stone-200 text-[10px] font-bold tracking-wider text-stone-600">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TECH ECOSYSTEM ── */}
                <section className="py-20 px-6 bg-[#faf8f5] overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="text-center mb-14">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Stack</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                                The <span className="text-orange-500">Tech Ecosystem</span> We Command
                            </h2>
                        </Reveal>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {TECH_ECOSYSTEM.map((t, i) => (
                                <Reveal key={t.label} delay={i * 70}>
                                    <div className="group flex flex-col items-center gap-3 cursor-default">
                                        <div className="p-6 bg-white rounded-2xl border border-stone-100 group-hover:border-orange-200 group-hover:shadow-xl group-hover:shadow-orange-50 group-hover:-translate-y-2 transition-all duration-300">
                                            <span className="material-symbols-outlined text-stone-400 group-hover:text-orange-500 transition-colors" style={{ fontSize: 36 }}>{t.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-stone-400 group-hover:text-orange-500 transition-colors">{t.label}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY US ── */}
                <section className="py-28 px-6 bg-white border-y border-stone-100">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <Reveal direction="left">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900 mb-10 leading-tight">
                                Engineering Integrity &<br /><span className="text-orange-500">Speed</span>
                            </h2>
                            <div className="space-y-4">
                                {WHY_US.map((w, i) => (
                                    <Reveal key={w.title} delay={i * 80}>
                                        <div className="group flex gap-5 p-6 bg-stone-50 rounded-2xl border-2 border-stone-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 hover:-translate-y-1 transition-all duration-300">
                                            <div className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300 ${ACCENT_ICON[w.accent]}`}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{w.icon}</span>
                                            </div>
                                            <div>
                                                <h4 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900 mb-1">{w.title}</h4>
                                                <p className="text-sm text-stone-400 leading-relaxed">{w.desc}</p>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </Reveal>

                        {/* Visual card */}
                        <Reveal delay={150} direction="right">
                            <div className="relative">
                                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center relative">
                                    <div className="absolute inset-0 opacity-[0.06]"
                                        style={{ backgroundImage: "radial-gradient(circle,#ea640a 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
                                    <div className="relative z-10 text-center p-12">
                                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                                            <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 48 }}>groups</span>
                                        </div>
                                        <p style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 mb-2">500<span className="text-orange-500">+</span></p>
                                        <p className="text-stone-500 font-semibold">Vetted Engineers</p>
                                        <div className="flex justify-center gap-1.5 mt-6">
                                            {["🇺🇸", "🇮🇳", "🇬🇧", "🇩🇪", "🇧🇷", "🇵🇱"].map((f, i) => (
                                                <span key={i} className="text-xl">{f}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-5 flex items-center gap-3 border border-stone-50 z-10"
                                    style={{ animation: "floatY 5s ease-in-out infinite" }}>
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 26 }}>workspace_premium</span>
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: "'Fraunces',serif" }} className="text-2xl font-bold text-stone-900">98%</p>
                                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Client Retention</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── HIRING MODELS ── */}
                <section className="py-28 px-6 bg-[#faf8f5]">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="text-center mb-16">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Pricing</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 mb-4">
                                Flexible Hiring <span className="text-orange-500">Models</span>
                            </h2>
                            <p className="text-stone-400">Choose the path that fits your project velocity.</p>
                        </Reveal>

                        <div className="grid md:grid-cols-3 gap-6 items-center">
                            {PLANS.map((plan, i) => (
                                <Reveal key={plan.name} delay={i * 80}>
                                    <div
                                        className={`group relative rounded-3xl p-8 flex flex-col border-2 transition-all duration-350 cursor-default ${plan.popular
                                                ? "bg-stone-900 border-orange-500 scale-105 shadow-2xl shadow-stone-300"
                                                : hoveredPlan === i
                                                    ? "bg-white border-orange-200 shadow-xl shadow-orange-50 -translate-y-2"
                                                    : "bg-white border-stone-100 hover:border-orange-200 hover:-translate-y-1 hover:shadow-lg"
                                            }`}
                                        onMouseEnter={() => setHoveredPlan(i)}
                                        onMouseLeave={() => setHoveredPlan(null)}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold py-1.5 px-4 rounded-full tracking-widest uppercase shadow-lg shadow-orange-200">
                                                Most Popular
                                            </div>
                                        )}

                                        <h3 style={{ fontFamily: "'Fraunces',serif" }}
                                            className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-stone-900"}`}>
                                            {plan.name}
                                        </h3>

                                        <div className={`text-4xl font-bold mb-6 ${plan.popular ? "text-orange-400" : "text-orange-500"}`}
                                            style={{ fontFamily: "'Fraunces',serif" }}>
                                            {plan.price}<span className={`text-base font-normal ${plan.popular ? "text-stone-400" : "text-stone-400"}`}>{plan.unit}</span>
                                        </div>

                                        <ul className="space-y-4 mb-8 flex-grow">
                                            {plan.perks.map((perk) => (
                                                <li key={perk} className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-orange-500/20" : "bg-orange-50 border border-orange-100"}`}>
                                                        <span className={`material-symbols-outlined ${plan.popular ? "text-orange-400" : "text-orange-500"}`}
                                                            style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check</span>
                                                    </div>
                                                    <span className={`text-sm ${plan.popular ? "text-stone-300" : "text-stone-500"}`}>{perk}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${plan.popular
                                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 shadow-lg shadow-orange-900/30"
                                                : "bg-stone-50 border-2 border-stone-200 text-stone-700 hover:border-orange-300 hover:text-orange-600"
                                            }`}>
                                            {plan.cta}
                                        </button>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROCESS TIMELINE ── */}
                <section className="py-28 px-6 bg-white border-y border-stone-100">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="text-center mb-16">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Process</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                                The Journey to <span className="text-orange-500">Deployment</span>
                            </h2>
                        </Reveal>

                        <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
                            {/* Timeline connecting line */}
                            <div className="absolute top-[28px] left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 hidden md:block" />

                            {STEPS.map((s, i) => (
                                <Reveal key={s.num} delay={i * 100} className="relative z-10 flex-1">
                                    <div className="group flex flex-col items-center text-center cursor-default">
                                        <div className={`w-14 h-14 rounded-full bg-white border-2 border-stone-200 flex items-center justify-center mb-5 group-hover:border-orange-400 group-hover:bg-orange-50 group-hover:scale-110 transition-all duration-300 shadow-md ${i === STEPS.length - 1 ? "border-orange-400 bg-orange-50" : ""}`}
                                            style={{ fontFamily: "'Fraunces',serif" }}>
                                            <span className={`font-bold text-base ${i === STEPS.length - 1 ? "text-orange-600" : "text-stone-500 group-hover:text-orange-600"} transition-colors`}>
                                                {s.num}
                                            </span>
                                        </div>
                                        <h4 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900 mb-2">{s.title}</h4>
                                        <p className="text-xs text-stone-400 leading-relaxed max-w-[140px]">{s.desc}</p>
                                        {i === STEPS.length - 1 && (
                                            <div className="mt-3 flex items-center gap-1 text-orange-500">
                                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>celebration</span>
                                                <span className="text-xs font-bold">You're live!</span>
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROJECT SHOWCASE ── */}
                <section className="py-28 px-6 bg-[#faf8f5]">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="mb-12">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Portfolio</p>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                                Building the <span className="text-orange-500">Next Gen</span> Apps
                            </h2>
                        </Reveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {PROJECTS.map((p, i) => (
                                <Reveal key={p.title} delay={i * 80}>
                                    <div className="group relative overflow-hidden rounded-3xl cursor-default" style={{ aspectRatio: "3/4" }}>
                                        {/* Gradient background */}
                                        <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 bg-gradient-to-br ${i === 0 ? "from-orange-100 to-amber-200" :
                                                i === 1 ? "from-sky-100 to-blue-200" :
                                                    i === 2 ? "from-violet-100 to-purple-200" :
                                                        "from-rose-100 to-pink-200"
                                            }`} />
                                        {/* Pattern */}
                                        <div className="absolute inset-0 opacity-10"
                                            style={{ backgroundImage: "linear-gradient(45deg,#333 25%,transparent 25%),linear-gradient(-45deg,#333 25%,transparent 25%)", backgroundSize: "30px 30px" }} />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-500" />

                                        {/* Center icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <span className="material-symbols-outlined text-stone-700 group-hover:text-white transition-colors" style={{ fontSize: 30 }}>{p.icon}</span>
                                            </div>
                                        </div>

                                        {/* Caption */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                                            <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${PROJECT_TAG[p.tag]}`}>{p.label}</p>
                                            <h4 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-white drop-shadow-lg">{p.title}</h4>
                                        </div>

                                        {/* Top accent */}
                                        <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <section className="py-28 px-6 bg-white border-y border-stone-100">
                    <div className="max-w-7xl mx-auto">
                        <Reveal className="flex items-end justify-between mb-14 gap-8">
                            <div>
                                <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Reviews</p>
                                <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 max-w-lg">
                                    Engineers Who <span className="text-orange-500">Deliver</span> Impact.
                                </h2>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button className="p-3 bg-stone-50 border border-stone-200 rounded-full hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                                    <span className="material-symbols-outlined text-stone-500" style={{ fontSize: 20 }}>chevron_left</span>
                                </button>
                                <button className="p-3 bg-orange-50 border border-orange-200 rounded-full hover:bg-orange-100 transition-all duration-200">
                                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>chevron_right</span>
                                </button>
                            </div>
                        </Reveal>

                        <div className="grid md:grid-cols-3 gap-6">
                            {TESTIMONIALS.map((t, i) => (
                                <Reveal key={t.name} delay={i * 90}>
                                    <div className="group bg-stone-50 border-2 border-stone-100 rounded-3xl p-8 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 relative overflow-hidden cursor-default">
                                        <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                                        {/* Big quote */}
                                        <span style={{ fontFamily: "'Fraunces',serif" }} className="absolute top-3 right-6 text-7xl font-bold text-stone-100 leading-none select-none">"</span>

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-5">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <span key={j} className="material-symbols-outlined text-amber-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                                            ))}
                                        </div>

                                        <p className="text-stone-500 text-sm leading-relaxed mb-7 italic relative z-10">"{t.quote}"</p>

                                        <div className="flex items-center gap-3">
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
                    </div>
                </section>

                {/* ── FINAL CTA ── */}
                <section className="py-28 px-6 bg-[#faf8f5] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

                    <Reveal className="relative max-w-4xl mx-auto bg-stone-900 rounded-[2.5rem] p-14 md:p-24 text-center overflow-hidden shadow-2xl shadow-stone-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
                            style={{ animation: "scanLine 3s linear infinite" }} />

                        <div className="relative z-10">
                            <div className="inline-block px-5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
                                Ready to Scale?
                            </div>
                            <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                                Start Building Your<br /><span className="text-orange-400">Dream Team</span>
                            </h2>
                            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                                Don't let talent shortages slow your growth. Connect with engineers who move at the speed of light.
                            </p>
                            <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl shadow-2xl shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                                Hire Developer Now →
                            </button>
                        </div>
                    </Reveal>
                </section>

                {/* ── CONTACT FORM ── */}
                <section className="py-24 px-6 bg-white border-t border-stone-100">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <Reveal direction="left">
                            <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Contact</p>
                            <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-stone-900 mb-4">Let's Talk Engineering</h3>
                            <p className="text-stone-400 text-sm mb-10 leading-relaxed">Fill out the form and a talent specialist will reach out within 2 hours.</p>
                            <div className="space-y-5">
                                {[
                                    { icon: "mail", text: "hello@codecreative.ai" },
                                    { icon: "call", text: "+1 (555) 902-8832" },
                                ].map((c) => (
                                    <div key={c.icon} className="group flex items-center gap-4 p-4 bg-stone-50 border border-stone-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 cursor-default">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>{c.icon}</span>
                                        </div>
                                        <span className="text-stone-600 text-sm font-medium">{c.text}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={120} direction="right">
                            <div className="bg-stone-50 border-2 border-stone-100 rounded-3xl p-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            className="bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors"
                                            placeholder="Full Name" type="text" />
                                        <input
                                            className="bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors"
                                            placeholder="Email Address" type="email" />
                                    </div>
                                    <select className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-500 focus:outline-none focus:border-orange-400 transition-colors">
                                        <option value="">Select Hiring Model</option>
                                        <option>Hourly Model</option>
                                        <option>Dedicated Developer</option>
                                        <option>Project-Based</option>
                                    </select>
                                    <textarea
                                        className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                                        placeholder="Tell us about your project requirements" rows={4} />
                                    <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-200 hover:-translate-y-1 hover:shadow-orange-300 active:scale-95 transition-all duration-300">
                                        Send Inquiry →
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
        </div>
    );
}