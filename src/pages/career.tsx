import { useState, useEffect, useRef, ReactNode } from "react";

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════
interface Job {
  title: string;
  type: string;
  location: string;
  dept: string;
  deptIcon: string;
  desc: string;
  tag: "Engineering" | "Design" | "Product";
  locationTag: "Remote" | "Hybrid" | "On-site";
}

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
    up: "translateY(48px)", left: "translateX(-48px)", right: "translateX(48px)", fade: "none",
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
      width: 560, height: 560, left: pos.x - 280, top: pos.y - 280,
      background: "radial-gradient(circle, rgba(234,100,30,0.06) 0%, transparent 70%)",
      transition: "left 0.12s ease, top 0.12s ease",
    }} />
  );
}

// ═══════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════════════════
function Particles() {
  const pts = Array.from({ length: 14 }, (_, i) => ({
    id: i, size: 3 + Math.random() * 4,
    x: Math.random() * 100, delay: Math.random() * 10,
    dur: 7 + Math.random() * 8, opacity: 0.08 + Math.random() * 0.14,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-orange-400"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, opacity: p.opacity,
            animation: `floatUp ${p.dur}s ${p.delay}s infinite linear` }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const JOBS: Job[] = [
  {
    title: "Senior AI Engineer", type: "Full-time", location: "Remote",
    dept: "Engineering", deptIcon: "terminal",
    desc: "Lead the development of next-gen neural interfaces and scale our proprietary LLM frameworks.",
    tag: "Engineering", locationTag: "Remote",
  },
  {
    title: "Product Designer (UX)", type: "Full-time", location: "Hybrid",
    dept: "Design", deptIcon: "palette",
    desc: "Craft intuitive, high-fidelity experiences for complex data visualization and AI management tools.",
    tag: "Design", locationTag: "Hybrid",
  },
  {
    title: "Technical Project Manager", type: "Full-time", location: "Remote",
    dept: "Product", deptIcon: "assignment",
    desc: "Bridge the gap between business requirements and technical execution for global enterprise clients.",
    tag: "Product", locationTag: "Remote",
  },
  {
    title: "ML Research Scientist", type: "Full-time", location: "On-site",
    dept: "Engineering", deptIcon: "biotech",
    desc: "Push the boundaries of transformer architectures and real-time inference optimization.",
    tag: "Engineering", locationTag: "On-site",
  },
  {
    title: "DevOps Engineer", type: "Full-time", location: "Remote",
    dept: "Engineering", deptIcon: "cloud",
    desc: "Build and maintain robust CI/CD pipelines and infrastructure for planet-scale AI deployments.",
    tag: "Engineering", locationTag: "Remote",
  },
  {
    title: "Growth Product Manager", type: "Full-time", location: "Hybrid",
    dept: "Product", deptIcon: "trending_up",
    desc: "Drive product-led growth experiments and own key activation and retention metrics.",
    tag: "Product", locationTag: "Hybrid",
  },
];

const CULTURE_PILLARS = [
  { icon: "rocket_launch", title: "Innovation", desc: "We push the boundaries of what's possible with AI every single day.", color: "bg-orange-50 text-orange-600" },
  { icon: "groups", title: "Collaboration", desc: "Cross-functional teams that speak the same language of excellence.", color: "bg-sky-50 text-sky-600" },
  { icon: "trending_up", title: "Growth Mindset", desc: "Continuous learning is baked into our sprints and our souls.", color: "bg-emerald-50 text-emerald-600" },
  { icon: "balance", title: "Work-Life Balance", desc: "Sustainable pace for long-term intellectual endurance.", color: "bg-violet-50 text-violet-600" },
];

const PERKS = [
  { icon: "payments",                  title: "Competitive Salary",        desc: "Industry-leading compensation packages that recognize your true value." },
  { icon: "schedule",                  title: "Flexible Work Hours",       desc: "We measure impact, not the hours you spend at your desk." },
  { icon: "public",                    title: "Remote Opportunities",      desc: "Work from anywhere in the world. Our office is the internet." },
  { icon: "school",                    title: "Learning & Development",    desc: "Annual budget for courses, conferences, and books. Stay sharp." },
  { icon: "sentiment_very_satisfied",  title: "Friendly Environment",      desc: "No egos, just great people building cool things together." },
  { icon: "auto_graph",                title: "Career Growth",             desc: "Structured career paths and mentorship to reach your next level." },
];

const STEPS = [
  { num: "01", title: "Application Review",    desc: "We dive deep into your portfolio and experience to see if there's a neural match." },
  { num: "02", title: "Initial Interview",     desc: "A casual conversation with a peer to discuss your passion and our culture." },
  { num: "03", title: "Technical Assessment",  desc: "Show off your skills with a practical, real-world challenge related to the role." },
  { num: "04", title: "Final Interview",       desc: "Meet the leadership team and talk about the long-term vision and your role in it." },
  { num: "05", title: "Offer & Onboarding",   desc: "Welcome to the team! We'll get you set up with everything you need to succeed.", highlight: true },
];

const TESTIMONIALS = [
  { name: "Sarah Chen",      role: "Lead ML Architect",  quote: "NeuralAgency is the first place where I've felt my technical curiosity is actually encouraged. We're solving problems I didn't think were possible.", initials: "SC", bg: "bg-orange-100 text-orange-600" },
  { name: "Marcus Thorne",   role: "Principal Designer", quote: "The level of design maturity here is incredible. We don't just 'make things pretty'—we're designing complex systems for a new era.", initials: "MT", bg: "bg-sky-100 text-sky-600" },
  { name: "Elena Rodriguez", role: "Head of Operations", quote: "The radical transparency here is refreshing. Everyone knows the mission, and everyone is empowered to make decisions that drive us forward.", initials: "ER", bg: "bg-emerald-100 text-emerald-600" },
];

const GALLERY_ITEMS = [
  { label: "Strategy Sprints",         span: "col-span-2 row-span-2", height: "h-full min-h-[400px]" },
  { label: "Team Moments",             span: "col-span-1",            height: "h-56" },
  { label: "Our Space",                span: "col-span-1",            height: "h-56" },
  { label: "Weekly Knowledge Sharing", span: "col-span-2",            height: "h-64" },
];

const GALLERY_COLORS = [
  "from-orange-100 to-amber-200",
  "from-sky-100 to-blue-200",
  "from-stone-100 to-stone-200",
  "from-emerald-100 to-teal-200",
];

const GALLERY_ICONS = ["groups", "celebration", "weekend", "cast_for_education"];

// ═══════════════════════════════════════════════════════
// STAT COUNTER
// ═══════════════════════════════════════════════════════
function StatItem({ val, suffix, label }: { val: number; suffix: string; label: string }) {
  const [ref, visible] = useInView(0.5);
  const count = useCountUp(val, 2000, visible);
  return (
    <div ref={ref} className="text-center">
      <p style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900">
        {count}<span className="text-orange-500">{suffix}</span>
      </p>
      <p className="text-xs text-stone-400 mt-1 font-semibold tracking-wider uppercase">{label}</p>
    </div>
  );
}


// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function CareersPage() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [locFilter,  setLocFilter]  = useState("All");
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);

  const filtered = JOBS.filter((j) =>
    (deptFilter === "All" || j.tag === deptFilter) &&
    (locFilter  === "All" || j.locationTag === locFilter)
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
      style={{ fontFamily: "'DM Sans',sans-serif" }}>

      {/* Fonts + icons */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

      <style>{`
        @keyframes floatUp    { 0%{transform:translateY(110vh) scale(1)} 100%{transform:translateY(-10vh) scale(.4)} }
        @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes shimBar    { 0%,100%{opacity:.6;transform:scaleX(.95)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes slideRight { from{transform:translateX(-100%)} to{transform:translateX(200%)} }
        @keyframes fadeIn     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .step-line::before { content:''; position:absolute; left:28px; top:64px; bottom:-48px; width:1px; background:linear-gradient(to bottom,#f97316,transparent); }
      `}</style>

      <CursorGlow />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-[#faf8f5] to-amber-50/30" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-100/60 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <Particles />

          <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-24">
            {/* Left */}
            <div className="space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </span>
                  Hiring Innovators
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 style={{ fontFamily: "'Fraunces',serif" }}
                  className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.92] text-stone-900">
                  Join Our<br /><span className="text-orange-500">Team</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-stone-500 max-w-xl leading-relaxed font-light">
                  Build your career with a team that values innovation, growth, and creativity. We're engineering the future of intelligence, one architect at a time.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <a href="#open-positions"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                    View Open Positions →
                  </a>
                  <a href="#culture"
                    className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-base hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                    Learn Our Culture
                  </a>
                </div>
              </Reveal>

              {/* Stats */}
              <Reveal delay={400}>
                <div className="flex gap-10 pt-4">
                  <StatItem val={80} suffix="+" label="Team Members" />
                  <StatItem val={23} suffix="" label="Countries" />
                  <StatItem val={96} suffix="%" label="Retention Rate" />
                </div>
              </Reveal>
            </div>

            {/* Right — animated card */}
            <Reveal delay={200} direction="right" className="hidden lg:flex justify-center items-center">
              <div className="relative" style={{ width: 380, height: 480 }}>
                <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-orange-200"
                  style={{ margin: -40, animation: "spinSlow 25s linear infinite" }} />
                <div className="absolute inset-0 rounded-full border border-orange-100/50"
                  style={{ margin: -80, animation: "spinSlow 18s linear infinite reverse" }} />

                <div className="relative z-10 w-full h-full bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50 overflow-hidden flex flex-col"
                  style={{ animation: "floatY 5s ease-in-out infinite" }}>
                  <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"
                      style={{ animation: "slideRight 2.5s linear infinite" }} />
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 40 }}>rocket_launch</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-[10px] font-bold text-stone-700">6 Open Roles</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900">Join Our Mission</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">Work on problems that matter with people who care deeply.</p>
                    <div className="space-y-1.5">
                      {["Engineering", "Design", "Product"].map((dept, i) => (
                        <div key={dept} className="flex items-center justify-between">
                          <span className="text-xs text-stone-500">{dept}</span>
                          <div className="w-32 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                              style={{ width: ["65%","35%","45%"][i], animation: "shimBar 2s ease-in-out infinite" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200">
                      Explore Roles
                    </button>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-3 flex items-center gap-2 border border-stone-50 z-20"
                  style={{ animation: "floatY 4s ease-in-out infinite .5s" }}>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sky-500" style={{ fontSize: 18 }}>public</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">100% Remote</p>
                    <p className="text-[9px] text-stone-400">Available</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-2xl p-3 flex items-center gap-2 border border-stone-50 z-20"
                  style={{ animation: "floatY 6s ease-in-out infinite 1s" }}>
                  <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 18 }}>payments</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">Top 10%</p>
                    <p className="text-[9px] text-stone-400">Compensation</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CULTURE ── */}
        <section id="culture" className="py-28 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <Reveal direction="left">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Who We Are</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                Our Culture<br />is our Code.
              </h2>
              <p className="text-stone-500 text-lg leading-relaxed mb-10">
                At NeuralAgency, we believe that brilliant results come from a culture of extreme ownership and radical transparency. We don't just write code; we cultivate environments where intelligence flourishes.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {CULTURE_PILLARS.map((p, i) => (
                  <Reveal key={p.title} delay={i * 80}>
                    <div className="group p-5 rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 hover:-translate-y-1 transition-all duration-300">
                      <div className={`w-11 h-11 rounded-xl ${p.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{p.icon}</span>
                      </div>
                      <h4 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900 mb-1">{p.title}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Culture visual */}
            <Reveal delay={150} direction="right">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "radial-gradient(circle,#ea640a 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
                  <div className="relative z-10 text-center p-12">
                    <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 48 }}>groups</span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-3xl font-bold text-stone-900 mb-3">80+ Builders</h3>
                    <p className="text-stone-500">across 23 countries</p>
                    <div className="flex justify-center gap-2 mt-6">
                      {["🇮🇳","🇺🇸","🇬🇧","🇩🇪","🇯🇵","🇧🇷"].map((flag, i) => (
                        <span key={i} className="text-2xl">{flag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Fast-paced badge */}
                <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-stone-50">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 24 }}>bolt</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">Fast-Paced</p>
                    <p className="text-xs text-stone-400">Engineered for speed</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PERKS ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Benefits</p>
              <div className="flex items-end justify-between">
                <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">Why Work With Us</h2>
                <p className="hidden md:block text-stone-400 max-w-xs text-sm">The perks of being a Neural Architect.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PERKS.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="group bg-white rounded-3xl p-8 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 overflow-hidden relative">
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 24 }}>{p.icon}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-2">{p.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="py-28 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Inside Look</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">Life at NeuralAgency</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_ITEMS.map((g, i) => (
                <Reveal key={g.label} delay={i * 80} className={g.span}>
                  <div className={`group relative overflow-hidden rounded-3xl ${g.height} cursor-default`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${GALLERY_COLORS[i]} group-hover:scale-105 transition-transform duration-700`} />
                    <div className="absolute inset-0 opacity-[0.06]"
                      style={{ backgroundImage: "linear-gradient(45deg,#ea640a 25%,transparent 25%),linear-gradient(-45deg,#ea640a 25%,transparent 25%)", backgroundSize: "32px 32px" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-stone-700 group-hover:text-white transition-colors" style={{ fontSize: 28 }}>
                          {GALLERY_ICONS[i]}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-white font-bold drop-shadow-lg text-sm">{g.label}</p>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section id="open-positions" className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Join Us</p>
                  <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 mb-2">Open Positions</h2>
                  <p className="text-stone-400">Find your spot in the future. We're looking for architects of all backgrounds.</p>
                </div>
                {/* Filters */}
                <div className="flex gap-2 flex-wrap">
                  <div className="flex gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-100">
                    {["All", "Engineering", "Design", "Product"].map((f) => (
                      <button key={f} onClick={() => setDeptFilter(f)}
                        className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
                          deptFilter === f ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200" : "text-stone-500 hover:text-stone-800"
                        }`}>{f}</button>
                    ))}
                  </div>
                  <div className="flex gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-100">
                    {["All", "Remote", "Hybrid", "On-site"].map((f) => (
                      <button key={f} onClick={() => setLocFilter(f)}
                        className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
                          locFilter === f ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200" : "text-stone-500 hover:text-stone-800"
                        }`}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-4">
              {filtered.length === 0 && (
                <div className="text-center py-16 text-stone-400">
                  <span className="material-symbols-outlined block mx-auto mb-3 text-stone-300" style={{ fontSize: 48 }}>search_off</span>
                  No positions match your filters — try a different combination.
                </div>
              )}
              {filtered.map((job, i) => (
                <Reveal key={job.title} delay={i * 60}>
                  <div
                    className={`group bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                      hoveredJob === i ? "border-orange-200 shadow-xl shadow-orange-50 -translate-y-1" : "border-stone-100 hover:border-orange-200"
                    }`}
                    onMouseEnter={() => setHoveredJob(i)}
                    onMouseLeave={() => setHoveredJob(null)}
                  >
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400 pointer-events-none" />
                    <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center flex-wrap gap-3">
                          <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-2xl font-bold text-stone-900">{job.title}</h3>
                          <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-orange-100">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-stone-400">
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{job.deptIcon}</span>
                            {job.dept}
                          </span>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-xl">{job.desc}</p>
                        <div className={`flex items-center gap-2 transition-opacity duration-300 ${hoveredJob === i ? "opacity-100" : "opacity-0"}`}>
                          <span className="text-orange-500 text-sm font-semibold">View Details</span>
                          <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 16 }}>east</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIRING PROCESS ── */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Process</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">How We Hire</h2>
            </Reveal>
            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 90} className={`relative ${i < STEPS.length - 1 ? "step-line" : ""}`}>
                  <div className={`group flex items-center gap-8 p-7 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default ${
                    s.highlight
                      ? "border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 hover:shadow-orange-100"
                      : "border-stone-100 bg-white hover:border-orange-200 hover:shadow-orange-50"
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110 ${
                      s.highlight
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200"
                        : "bg-stone-50 text-orange-500 border-2 border-stone-100 group-hover:border-orange-200 group-hover:bg-orange-50"
                    }`} style={{ fontFamily: "'Fraunces',serif" }}>
                      {s.num}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-1">{s.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                    {s.highlight && (
                      <div className="ml-auto hidden md:block">
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 32 }}>celebration</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Voices</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">Voices from the Inside</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 100}>
                  <div className="group bg-white rounded-3xl p-8 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    {/* Big quote mark */}
                    <span style={{ fontFamily: "'Fraunces',serif" }} className="absolute top-4 right-6 text-7xl font-bold text-stone-100 leading-none select-none">"</span>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className={`w-14 h-14 rounded-full ${t.bg} flex items-center justify-center font-bold text-lg flex-shrink-0`}
                        style={{ fontFamily: "'Fraunces',serif" }}>
                        {t.initials}
                      </div>
                      <div>
                        <h5 className="font-bold text-stone-900">{t.name}</h5>
                        <p className="text-xs text-stone-400">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed relative z-10 italic">"{t.quote}"</p>

                    {/* Star rating */}
                    <div className="flex gap-1 mt-5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className="material-symbols-outlined text-amber-400"
                          style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── BIG CTA ── */}
        <section className="py-28 px-6 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-amber-50/40" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
          <Reveal className="relative max-w-4xl mx-auto bg-stone-900 rounded-[2.5rem] p-14 md:p-24 text-center overflow-hidden shadow-2xl shadow-stone-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block px-5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-8">
                We're Growing
              </div>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                Ready to<br />Join Us?
              </h2>
              <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                If you're passionate about the intersection of AI and human experience, we want to hear from you.
              </p>
              <a href="#open-positions"
                className="inline-block px-12 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                Apply Now →
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── HR CONTACT ── */}
        <section className="py-16 px-6 border-t border-stone-100 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <Reveal direction="left">
              <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-1">Have questions about a role?</h3>
              <p className="text-stone-400 text-sm">Our talent team is here to help you find your path.</p>
            </Reveal>
            <Reveal direction="right">
              <div className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-stone-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors duration-300">
                  <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>mail</span>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-0.5">Talent Acquisition</p>
                  <a href="mailto:careers@neuralagency.ai"
                    style={{ fontFamily: "'Fraunces',serif" }}
                    className="text-lg font-bold text-stone-900 hover:text-orange-600 transition-colors">
                    careers@neuralagency.ai
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}