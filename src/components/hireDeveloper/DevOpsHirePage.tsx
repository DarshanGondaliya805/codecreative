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
// MARQUEE
// ═══════════════════════════════════════════════════════
function Marquee() {
  const tools = ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Grafana", "Prometheus", "ArgoCD", "Vault", "Ansible", "GitHub Actions", "Datadog"];
  const doubled = [...tools, ...tools];
  return (
    <div className="w-full overflow-hidden py-4 border-y border-stone-100 bg-stone-50/80">
      <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marquee 26s linear infinite" }}>
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
const WHY_ITEMS = [
  { icon: "cloud",          title: "Scalable Cloud",       desc: "Multi-cloud architectures on AWS, GCP & Azure designed to scale from startup to enterprise without re-engineering.", accent: "sky"     },
  { icon: "sync_alt",       title: "CI/CD Automation",     desc: "End-to-end delivery pipelines that ship code faster, safer, and with zero manual intervention.", accent: "orange"  },
  { icon: "verified_user",  title: "High Availability",    desc: "99.99% uptime guarantees backed by multi-region redundancy, auto-healing, and chaos engineering.", accent: "emerald" },
  { icon: "security",       title: "SecOps Compliance",    desc: "Security-first infrastructure hardened against OWASP, SOC 2, and CIS benchmarks from day one.", accent: "violet"  },
];

const SERVICES = [
  { icon: "cloud_upload",   title: "Cloud Architecture",         desc: "Design and implement resilient multi-cloud environments using best-practice patterns for cost, performance, and security.", tags: ["AWS", "GCP", "Azure"] },
  { icon: "code_blocks",    title: "Infrastructure as Code",     desc: "Version-controlled infrastructure via Terraform, Pulumi, and Ansible — reproducible, auditable, and git-native.", tags: ["Terraform", "Ansible", "Pulumi"] },
  { icon: "sailing",        title: "Kubernetes & Containers",    desc: "Production Kubernetes clusters with auto-scaling, service mesh, and GitOps-based continuous delivery.", tags: ["K8s", "Helm", "ArgoCD"] },
  { icon: "monitoring",     title: "Observability & Monitoring", desc: "Full-stack monitoring with Prometheus, Grafana, and Datadog. Alerts that wake the right person, not everyone.", tags: ["Grafana", "Datadog", "OpenTelemetry"] },
  { icon: "shield_lock",    title: "DevSecOps",                  desc: "Shift security left. Automated SAST/DAST, secrets management with Vault, and policy-as-code with OPA.", tags: ["Vault", "OPA", "Trivy"] },
];

const TOOLS = [
  { name: "AWS",            icon: "cloud",             accent: "orange" },
  { name: "Docker",         icon: "inventory_2",       accent: "sky"    },
  { name: "Kubernetes",     icon: "sailing",           accent: "sky"    },
  { name: "Terraform",      icon: "settings_input_component", accent: "violet" },
  { name: "Jenkins",        icon: "history",           accent: "orange" },
  { name: "Grafana",        icon: "monitoring",        accent: "orange" },
  { name: "Prometheus",     icon: "analytics",         accent: "orange" },
  { name: "ArgoCD",         icon: "play_circle",       accent: "emerald"},
  { name: "GitHub Actions", icon: "code",              accent: "stone"  },
  { name: "Vault",          icon: "lock",              accent: "sky"    },
  { name: "Datadog",        icon: "area_chart",        accent: "violet" },
  { name: "Ansible",        icon: "terminal",          accent: "emerald"},
];

const CASES = [
  {
    tag: "FinTech",    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    title: "Zero-Downtime Migration to AWS EKS",
    desc: "Migrated a 5M-user trading platform from bare-metal to managed Kubernetes with zero customer impact and 60% cost reduction.",
    metrics: [{ label: "Cost Saved", val: "60%"}, { label: "Uptime", val: "99.99%"}, { label: "Deploy Freq", val: "10×" }],
    icon: "trending_up",
  },
  {
    tag: "HealthTech", tagColor: "text-sky-600 bg-sky-50 border-sky-100",
    title: "HIPAA-Compliant CI/CD Pipeline",
    desc: "Built a fully automated, audit-ready delivery pipeline for a patient-facing healthcare app with end-to-end security scanning.",
    metrics: [{ label: "Deploy Time", val: "2hr→8min"}, { label: "Incidents", val: "−80%"}, { label: "Audit Score", val: "A+" }],
    icon: "verified_user",
  },
  {
    tag: "E-Commerce", tagColor: "text-violet-600 bg-violet-50 border-violet-100",
    title: "Auto-Scaling for Black Friday Traffic",
    desc: "Infrastructure that handled 15× peak load surge during the biggest shopping event with sub-200ms latency throughout.",
    metrics: [{ label: "Peak Load", val: "15×"}, { label: "Latency", val: "<200ms"}, { label: "Failed Req", val: "0" }],
    icon: "bolt",
  },
];

const TESTIMONIALS = [
  { quote: "They transformed our infrastructure completely. Deploy frequency went from weekly to 20× per day.", name: "Alex R.", role: "CTO, SeriesB Startup", initials: "AR", bg: "bg-orange-100 text-orange-600" },
  { quote: "Our cloud bill dropped 55% in three months. The Terraform work alone paid for itself in the first sprint.", name: "Priya M.", role: "VP Eng, HealthFlow", initials: "PM", bg: "bg-sky-100 text-sky-600" },
  { quote: "HIPAA compliance used to terrify us. Now our security audits are a formality — everything is automated.", name: "Daniel K.", role: "Head of Infra, MediSync", initials: "DK", bg: "bg-emerald-100 text-emerald-600" },
];

const ACCENT_ICON: Record<string, string> = {
  sky:     "bg-sky-50 text-sky-600",
  orange:  "bg-orange-50 text-orange-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet:  "bg-violet-50 text-violet-600",
  stone:   "bg-stone-100 text-stone-500",
};

const ACCENT_HOVER: Record<string, string> = {
  sky:     "group-hover:border-sky-200 group-hover:shadow-sky-50",
  orange:  "group-hover:border-orange-200 group-hover:shadow-orange-50",
  emerald: "group-hover:border-emerald-200 group-hover:shadow-emerald-50",
  violet:  "group-hover:border-violet-200 group-hover:shadow-violet-50",
  stone:   "group-hover:border-stone-200 group-hover:shadow-stone-50",
};

// ═══════════════════════════════════════════════════════
// STAT COUNTER
// ═══════════════════════════════════════════════════════
function StatCount({ val, suf, label }: { val: number; suf: string; label: string }) {
  const [ref, visible] = useInView(0.4);
  const count = useCountUp(val, 1600, visible);
  return (
    <div ref={ref} className="text-center">
      <p style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl md:text-5xl font-bold text-stone-900">
        {count}<span className="text-orange-500">{suf}</span>
      </p>
      <p className="text-xs text-stone-400 mt-1 font-bold tracking-wider uppercase">{label}</p>
    </div>
  );
}


// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════
export default function DevOpsHirePage() {
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100"
      style={{ fontFamily: "'DM Sans',sans-serif" }}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

      <style>{`
        @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinRev   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes shimBar   { 0%,100%{opacity:.6;transform:scaleX(.95)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes badgePop  { 0%{transform:scale(.8) translateY(8px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes dash      { to{stroke-dashoffset:0} }
      `}</style>

      <CursorGlow />
     
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center pt-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-[#faf8f5] to-sky-50/30" />
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-24">
            {/* Left */}
            <div className="space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold tracking-widest uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Available for New Infrastructure Projects
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tight text-stone-900">
                  Hire Expert<br />
                  <span className="text-orange-500">DevOps</span> Architects
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-stone-500 leading-relaxed max-w-lg font-light">
                  Build scalable, automated, and reliable infrastructure with battle-tested DevOps practices. From CI/CD to Kubernetes — we own the full stack.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                    Hire DevOps Experts →
                  </button>
                  <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                    Book Consultation
                  </button>
                </div>
              </Reveal>

              {/* Trust strip */}
              <Reveal delay={400}>
                <div className="flex flex-wrap gap-6 pt-2">
                  {[
                    { icon: "verified",       text: "Top 1% Engineers"  },
                    { icon: "bolt",           text: "48hr Onboarding"   },
                    { icon: "shield",         text: "SOC 2 Certified"   },
                  ].map((c) => (
                    <div key={c.text} className="flex items-center gap-2 text-sm text-stone-500 font-medium">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 18 }}>{c.icon}</span>
                      {c.text}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — infrastructure visual */}
            <Reveal delay={180} direction="right" className="hidden lg:block">
              <div className="relative" style={{ height: 520 }}>
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-orange-200"
                  style={{ margin: -30, animation: "spinSlow 28s linear infinite" }} />
                <div className="absolute inset-0 rounded-full border border-stone-200/60"
                  style={{ margin: 30, animation: "spinRev 18s linear infinite" }} />

                {/* Main card */}
                <div className="relative h-full bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50 overflow-hidden"
                  style={{ animation: "floatY 5s ease-in-out infinite" }}>
                  {/* Header area — pipeline visual */}
                  <div className="h-64 bg-gradient-to-br from-stone-900 to-stone-800 relative overflow-hidden flex items-center justify-center p-6">
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: "radial-gradient(circle,#ea640a 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
                      style={{ animation: "scanLine 2.5s linear infinite" }} />

                    {/* Mini pipeline */}
                    <div className="w-full flex items-center justify-between gap-2 relative z-10">
                      {["Code", "Build", "Test", "Deploy", "Monitor"].map((stage, i) => (
                        <div key={stage} className="flex flex-col items-center gap-1.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold ${i <= 3 ? "bg-orange-500 text-white" : "bg-stone-700 text-stone-400"}`}>
                            {i <= 3 ? "✓" : "●"}
                          </div>
                          <span className="text-[8px] font-bold text-stone-400 tracking-wider uppercase">{stage}</span>
                          {i < 4 && <div className="absolute" style={{ width: 2, height: 2 }} />}
                        </div>
                      ))}
                      {/* Progress bar under */}
                    </div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: "80%", animation: "shimBar 2s ease-in-out infinite" }} />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[9px] text-stone-500 font-bold">CI/CD Pipeline</span>
                        <span className="text-[9px] text-orange-400 font-bold">80% complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="p-5 space-y-3">
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900">Infrastructure at Scale</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">Production-grade Kubernetes clusters with auto-scaling and zero-downtime deployments.</p>

                    <div className="space-y-1.5">
                      {[{ label: "Availability", w: "99%" }, { label: "Auto-scaling", w: "Active" }, { label: "Security", w: "Hardened" }].map((row) => (
                        <div key={row.label} className="flex items-center justify-between text-xs">
                          <span className="text-stone-400">{row.label}</span>
                          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold text-[10px]">{row.w}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200">
                      View Architecture →
                    </button>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-3 flex items-center gap-2 border border-stone-50 z-20"
                  style={{ animation: "floatY 4s ease-in-out infinite 0.5s" }}>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: 18 }}>verified</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">99.99% Uptime</p>
                    <p className="text-[9px] text-stone-400">SLA guaranteed</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-2xl p-3 flex items-center gap-2 border border-stone-50 z-20"
                  style={{ animation: "floatY 6s ease-in-out infinite 1s" }}>
                  <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 18 }}>bolt</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">20× Deploy Freq</p>
                    <p className="text-[9px] text-stone-400">vs industry avg</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Marquee */}
        <Marquee />

        {/* Stats */}
        <section className="py-14 px-6 bg-white border-b border-stone-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCount val={150}  suf="+" label="Infra Projects"    />
            <StatCount val={99}   suf="%" label="Client Retention"  />
            <StatCount val={60}   suf="%" label="Avg Cost Reduction" />
            <StatCount val={20}   suf="×" label="Deploy Frequency"  />
          </div>
        </section>

        {/* ── WHY SECTION ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-14">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                  Engineering Reliability<br />at Every Layer
                </h2>
                <p className="text-stone-400 max-w-xs text-sm">Enterprise-grade infrastructure solutions designed to outlast and outperform.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_ITEMS.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <div className={`group bg-white rounded-3xl p-8 border-2 border-stone-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-350 cursor-default overflow-hidden relative ${ACCENT_HOVER[item.accent]}`}>
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${ACCENT_ICON[item.accent]}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{item.icon}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-28 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-14 text-center">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Services</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900 mb-3">
                Full-Spectrum DevOps<br />Capabilities
              </h2>
              <p className="text-stone-400 max-w-xl mx-auto">Everything from IaC to SecOps — owned end-to-end by dedicated architects.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} className={i === SERVICES.length - 1 && SERVICES.length % 3 !== 0 ? "md:col-span-1 lg:col-span-1" : ""}>
                  <div className="group bg-stone-50 border-2 border-stone-100 rounded-3xl p-8 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default h-full relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 24 }}>{s.icon}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-3">{s.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white border border-stone-200 text-[10px] font-bold tracking-wider text-stone-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOL STACK ── */}
        <section className="py-20 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-12">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Arsenal</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-stone-900">Our Tool Stack</h2>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-4">
              {TOOLS.map((t, i) => (
                <Reveal key={t.name} delay={i * 40}>
                  <div className={`group flex items-center gap-2.5 px-5 py-3 bg-white rounded-2xl border-2 border-stone-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default ${ACCENT_HOVER[t.accent]}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${ACCENT_ICON[t.accent]}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{t.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors">{t.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section className="py-28 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-14">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Case Studies</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">
                Infrastructure<br /><span className="text-orange-500">Transformations</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {CASES.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="group bg-stone-50 border-2 border-stone-100 rounded-3xl overflow-hidden hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default h-full flex flex-col">
                    {/* Visual header */}
                    <div className={`h-48 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${
                      i === 0 ? "from-emerald-50 to-teal-100" :
                      i === 1 ? "from-sky-50 to-blue-100" :
                                "from-violet-50 to-purple-100"
                    }`}>
                      <div className="absolute inset-0 opacity-[0.08]"
                        style={{ backgroundImage: "linear-gradient(45deg,#333 25%,transparent 25%),linear-gradient(-45deg,#333 25%,transparent 25%)", backgroundSize: "28px 28px" }} />
                      <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                        style={{ animation: "scanLine 3s linear infinite" }} />
                      <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 32 }}>{c.icon}</span>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      <div className={`self-start mb-4 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${c.tagColor}`}>
                        {c.tag}
                      </div>
                      <h4 style={{ fontFamily: "'Fraunces',serif" }} className="text-xl font-bold text-stone-900 mb-3 leading-tight">{c.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed mb-6 flex-1">{c.desc}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100">
                        {c.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <p style={{ fontFamily: "'Fraunces',serif" }} className="text-lg font-bold text-orange-500">{m.val}</p>
                            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">What Clients Say</p>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl font-bold text-stone-900">Engineers Who Deliver</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 90}>
                  <div className="group bg-white rounded-3xl border-2 border-stone-100 p-8 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 relative overflow-hidden cursor-default">
                    <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-400 to-amber-400" />
                    <span style={{ fontFamily: "'Fraunces',serif" }} className="absolute top-3 right-6 text-7xl font-bold text-stone-100 leading-none select-none">"</span>

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

        {/* ── CONTACT FORM ── */}
        <section className="py-28 px-6 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Get Started</p>
              <h3 style={{ fontFamily: "'Fraunces',serif" }} className="text-4xl font-bold text-stone-900 mb-4 leading-tight">
                Let's Build Your<br />Infrastructure
              </h3>
              <p className="text-stone-400 text-sm mb-10 leading-relaxed">
                Fill out the form and a DevOps architect will reach out within 2 hours to discuss your infrastructure needs.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  { icon: "mail",          text: "devops@codecreative.ai" },
                  { icon: "call",          text: "+1 (555) 902-8832"       },
                  { icon: "schedule",      text: "Response within 2 hours" },
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
              {submitted ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-12 text-center"
                  style={{ animation: "badgePop .5s cubic-bezier(.34,1.56,.64,1) both" }}>
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <span className="material-symbols-outlined text-emerald-600" style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces',serif" }} className="text-2xl font-bold text-stone-900 mb-2">Message Received!</h4>
                  <p className="text-stone-400 text-sm">An architect will reach out within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-stone-50 border-2 border-stone-100 rounded-3xl p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Full Name" type="text" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <input
                      className="bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Email Address" type="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <select className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-500 focus:outline-none focus:border-orange-400 transition-colors">
                    <option value="">Select Service Needed</option>
                    {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                  </select>
                  <textarea
                    className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Describe your infrastructure challenge or project goals..."
                    rows={4} value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
                  <button type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-200 hover:-translate-y-1 hover:shadow-orange-300 active:scale-95 transition-all duration-300">
                    Hire DevOps Architects →
                  </button>
                  <p className="text-center text-[10px] text-stone-400">No commitment. 2-hour response guarantee.</p>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 px-6 bg-[#faf8f5] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle,#f97316 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
          <Reveal className="relative max-w-4xl mx-auto bg-stone-900 rounded-[2.5rem] p-14 md:p-24 text-center overflow-hidden shadow-2xl shadow-stone-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
              style={{ animation: "scanLine 3s linear infinite" }} />

            <div className="relative z-10 space-y-8">
              <div className="inline-block px-5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase">
                Ready to Scale?
              </div>
              <h2 style={{ fontFamily: "'Fraunces',serif" }} className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Build Infrastructure<br /><span className="text-orange-400">That Never Sleeps</span>
              </h2>
              <p className="text-stone-400 text-lg max-w-xl mx-auto">
                From zero to production-ready Kubernetes cluster in under 7 days. Let's make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">
                  Hire DevOps Experts →
                </button>
                <button className="px-10 py-5 rounded-2xl border-2 border-stone-700 text-stone-300 font-bold text-lg hover:border-orange-500 hover:text-orange-400 transition-all duration-300">
                  Book a Free Audit
                </button>
              </div>
            </div>
          </Reveal>
        </section>
    </div>
  );
}