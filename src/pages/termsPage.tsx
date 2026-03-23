import { useState, useEffect, useRef, ReactNode } from "react";

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════
interface Section {
  id: string;
  num: string;
  title: string;
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
    up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", fade: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t[direction],
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const SECTIONS: Section[] = [
  { id: "introduction",         num: "01", title: "Introduction" },
  { id: "acceptance",           num: "02", title: "Acceptance of Terms" },
  { id: "services",             num: "03", title: "Services Description" },
  { id: "responsibilities",     num: "04", title: "User Responsibilities" },
  { id: "intellectual-property",num: "05", title: "Intellectual Property" },
  { id: "liability",            num: "06", title: "Limitation of Liability" },
  { id: "termination",          num: "07", title: "Termination" },
  { id: "governing-law",        num: "08", title: "Governing Law" },
];

const SERVICES_LIST = [
  { icon: "code",         title: "Web Development",      desc: "Custom architecture using modern stacks and performance-first methodologies." },
  { icon: "auto_awesome", title: "AI/ML Integration",    desc: "Sophisticated neural network implementation for predictive analytics and automation." },
  { icon: "brush",        title: "UI/UX Design",         desc: "Editorial-level interface design with focus on tonal depth and visual hierarchy." },
  { icon: "query_stats",  title: "Strategic Consulting", desc: "Market analysis and technology roadmap planning for enterprise scale." },
];

const RESPONSIBILITIES = [
  { title: "Information Accuracy",  body: "You agree to provide accurate, current, and complete information during all discovery and engagement phases." },
  { title: "Lawful Use",            body: "You may not use our technology for any purpose that is unlawful or prohibited by these terms." },
  { title: "System Integrity",      body: "You shall not attempt to gain unauthorized access to our internal neural systems or proprietary source code." },
];

// ═══════════════════════════════════════════════════════
// READ PROGRESS BAR
// ═══════════════════════════════════════════════════════
function ReadProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-stone-100">
      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-75"
        style={{ width: `${pct}%` }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SECTION HEADING
// ═══════════════════════════════════════════════════════
function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <Reveal>
      <h2 style={{ fontFamily: "'Fraunces',serif" }}
        className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-4">
        <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ fontFamily: "'Fraunces',serif" }}>
          {num}
        </span>
        {title}
      </h2>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState(false);

  // Active section tracker
  useEffect(() => {
    const handleScroll = () => {
      for (const sec of [...SECTIONS].reverse()) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top < 160) {
          setActiveSection(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSidebarClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-stone-800 overflow-x-hidden selection:bg-orange-100"
      style={{ fontFamily: "'DM Sans',sans-serif" }}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

      <style>{`
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sectionIn  { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        html { scroll-behavior: smooth; }
      `}</style>

      <ReadProgress />
      {/* ── HERO ── */}
      <header className="pt-32 pb-20 bg-white border-b border-stone-100 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#333 1px,transparent 1px),linear-gradient(90deg,#333 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </span>
                  Legal Documentation
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 style={{ fontFamily: "'Fraunces',serif" }}
                  className="text-6xl md:text-8xl font-bold text-stone-900 tracking-tight leading-none">
                  Terms of <span className="text-orange-500">Use</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-lg text-stone-500 font-light leading-relaxed max-w-xl">
                  Please read these terms carefully. They govern your relationship with Neural Kinetic Agency and outline the legal framework of our digital partnership.
                </p>
              </Reveal>

              {/* Meta chips */}
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: "event", label: "Last Updated: Oct 24, 2023" },
                    { icon: "gavel", label: "8 Sections" },
                    { icon: "schedule", label: "~5 min read" },
                  ].map((chip) => (
                    <div key={chip.label} className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-4 py-2 rounded-full text-xs font-semibold text-stone-500">
                      <span className="material-symbols-outlined text-stone-400" style={{ fontSize: 15 }}>{chip.icon}</span>
                      {chip.label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Share / copy actions */}
            <Reveal delay={200} direction="right">
              <div className="flex flex-col gap-3 md:items-end">
                <button onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-stone-200 bg-white hover:border-orange-300 hover:text-orange-600 text-stone-500 text-sm font-semibold transition-all duration-200 group">
                  <span className="material-symbols-outlined group-hover:text-orange-500 transition-colors" style={{ fontSize: 18 }}>
                    {copied ? "check_circle" : "link"}
                  </span>
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 hover:-translate-y-0.5 transition-all duration-200 group">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
                  Download PDF
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <main className="bg-[#f8f7f4] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">

          {/* ── SIDEBAR ── */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              {/* TOC */}
              <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden mb-5">
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-stone-400" style={{ fontSize: 18 }}>format_list_bulleted</span>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Contents</p>
                </div>
                <nav className="p-3">
                  {SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button key={sec.id} onClick={() => handleSidebarClick(sec.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-orange-50 text-orange-600"
                            : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                        }`}>
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-200 ${
                          isActive ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-400 group-hover:bg-stone-200"
                        }`}>
                          {sec.num}
                        </span>
                        <span className="leading-tight">{sec.title}</span>
                        {isActive && (
                          <span className="ml-auto">
                            <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 16 }}>arrow_forward_ios</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Help card */}
              <div className="bg-stone-900 rounded-3xl p-6 text-white">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 22 }}>support_agent</span>
                </div>
                <h4 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-base mb-2">Need Clarification?</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-5">Our legal team is available to discuss any specific clauses or custom agreements required for enterprise solutions.</p>
                <a href="#" className="flex items-center gap-2 text-orange-400 font-bold text-sm group hover:text-orange-300 transition-colors">
                  Contact Legal Support
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: 16 }}>arrow_forward</span>
                </a>
              </div>
            </div>
          </aside>

          {/* ── ARTICLE CONTENT ── */}
          <article className="flex-1 min-w-0 space-y-20">

            {/* 01 — Introduction */}
            <section id="introduction">
              <SectionHeading num="01" title="Introduction" />
              <Reveal delay={60}>
                <div className="space-y-5 text-stone-500 leading-relaxed text-lg">
                  <p>Welcome to Neural Kinetic Agency. These Terms of Use ("Terms") constitute a legally binding agreement between you and Neural Kinetic Agency. We specialize in high-performance digital architecture, AI integration, and editorial design solutions.</p>
                  <p>By accessing our website or utilizing our professional services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please cease use of our services immediately.</p>
                </div>
              </Reveal>
            </section>

            {/* 02 — Acceptance */}
            <section id="acceptance">
              <SectionHeading num="02" title="Acceptance of Terms" />
              <Reveal delay={60}>
                <div className="relative bg-white rounded-3xl border border-stone-100 p-8 shadow-sm overflow-hidden">
                  <div className="absolute left-0 inset-y-0 w-1 rounded-l-3xl bg-gradient-to-b from-orange-400 to-amber-400" />
                  <span style={{ fontFamily: "'Fraunces',serif" }} className="absolute top-4 right-6 text-7xl font-bold text-stone-100 leading-none select-none">"</span>
                  <p className="text-stone-600 leading-relaxed text-lg italic pl-2">
                    Your use of the site or services signifies your acceptance of these Terms of Use and our Privacy Policy. We reserve the right to modify these terms at any time without prior notice. Continued use following changes constitutes acceptance.
                  </p>
                </div>
              </Reveal>
            </section>

            {/* 03 — Services */}
            <section id="services">
              <SectionHeading num="03" title="Services Description" />
              <Reveal delay={60}>
                <p className="text-stone-500 leading-relaxed text-lg mb-8">Neural Kinetic Agency provides high-tier digital engineering services including, but not limited to:</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES_LIST.map((s, i) => (
                  <Reveal key={s.title} delay={i * 70}>
                    <div className="group p-6 rounded-2xl bg-white border-2 border-stone-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 hover:-translate-y-1 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:scale-110">
                          <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>{s.icon}</span>
                        </div>
                        <div>
                          <h4 style={{ fontFamily: "'Fraunces',serif" }} className="font-bold text-stone-900 mb-1">{s.title}</h4>
                          <p className="text-sm text-stone-400 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 04 — Responsibilities */}
            <section id="responsibilities">
              <SectionHeading num="04" title="User Responsibilities" />
              <div className="space-y-4">
                {RESPONSIBILITIES.map((r, i) => (
                  <Reveal key={r.title} delay={i * 80}>
                    <div className="group flex gap-5 p-6 bg-white rounded-2xl border-2 border-stone-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-300">
                      <div className="w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                        <span className="material-symbols-outlined text-orange-500 group-hover:text-white transition-colors" style={{ fontSize: 17, fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">{r.title}: </span>
                        <span className="text-stone-500 leading-relaxed">{r.body}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* 05 — IP */}
            <section id="intellectual-property">
              <SectionHeading num="05" title="Intellectual Property" />
              <Reveal delay={60}>
                <div className="space-y-5 text-stone-500 leading-relaxed text-lg">
                  <p>Unless otherwise stated in a specific Master Services Agreement (MSA), all proprietary frameworks, internal AI models, and design systems used by Neural Kinetic Agency remain the exclusive property of the agency.</p>
                  <p>Final deliverables specifically crafted for the Client become Client property upon full payment of all associated fees, subject to a perpetual, royalty-free license granted back to the Agency for portfolio representation.</p>
                </div>
              </Reveal>

              {/* Two-column summary cards */}
              <Reveal delay={120}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>shield</span>
                      <h5 className="font-bold text-stone-900 text-sm">Agency Retains</h5>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">Proprietary frameworks, internal AI models, design systems, tooling and intellectual methodologies.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-emerald-600" style={{ fontSize: 20 }}>handshake</span>
                      <h5 className="font-bold text-stone-900 text-sm">Client Receives</h5>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">Full ownership of final deliverables upon payment, subject to portfolio license for Agency use.</p>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* 06 — Liability */}
            <section id="liability">
              <SectionHeading num="06" title="Limitation of Liability" />
              <Reveal delay={60}>
                <div className="bg-stone-100 border border-stone-200 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-stone-200/50 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-xl bg-stone-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-stone-500" style={{ fontSize: 18 }}>gavel</span>
                      </div>
                      <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Statutory Notice</p>
                    </div>
                    <p className="text-stone-600 font-semibold leading-relaxed text-sm uppercase">
                      Neural Kinetic Agency shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the services.
                    </p>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* 07 — Termination */}
            <section id="termination">
              <SectionHeading num="07" title="Termination" />
              <Reveal delay={60}>
                <p className="text-stone-500 leading-relaxed text-lg">
                  We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination.
                </p>
              </Reveal>
            </section>

            {/* 08 — Governing Law */}
            <section id="governing-law">
              <SectionHeading num="08" title="Governing Law" />
              <Reveal delay={60}>
                <p className="text-stone-500 leading-relaxed text-lg mb-8">
                  These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Neural Kinetic Agency is headquartered, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </Reveal>

              {/* Signature block */}
              <Reveal delay={100}>
                <div className="bg-stone-900 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                  <div className="relative z-10">
                    <p style={{ fontFamily: "'Fraunces',serif" }} className="text-white font-bold text-xl mb-1">Agree to these terms?</p>
                    <p className="text-stone-400 text-sm">Start a conversation with our team to begin your engagement.</p>
                  </div>
                  <div className="relative z-10 flex gap-3 flex-shrink-0">
                    <button className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-orange-900/30">
                      Get in Touch →
                    </button>
                    <button className="px-6 py-3 rounded-2xl border border-stone-700 text-stone-300 font-bold text-sm hover:border-stone-500 transition-all duration-200">
                      Download PDF
                    </button>
                  </div>
                </div>
              </Reveal>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}