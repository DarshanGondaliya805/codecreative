import { useState, useEffect, useRef } from "react";

/* ── HOOKS ── */
function useScrollProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const fn = () => {
            const d = document.documentElement;
            const total = d.scrollHeight - d.clientHeight;
            setP(total > 0 ? (d.scrollTop / total) * 100 : 0);
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return p;
}

function useInView(threshold = 0.14) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return [ref, vis];
}

function useCountUp(target:any, active:any, dur = 1400) {
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start:any = null;
        const tick = (ts:any) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            setV(Math.floor(ease * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [active, target, dur]);
    return v;
}

/* ── CURSOR ── */
function Cursor() {
    const dotRef:any = useRef(null);
    const ringRef:any = useRef(null);
    const [big, setBig] = useState(false);
    const pos:any = useRef({ x: 0, y: 0 });
    const ring:any = useRef({ x: 0, y: 0 });
    const raf:any = useRef(null);
    const lerp = (a:any, b:any, t:any) => a + (b - a) * t;

    useEffect(() => {
        const onMove = (e:any) => { pos.current = { x: e.clientX, y: e.clientY }; };
        const animate = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
            if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
            if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
            raf.current = requestAnimationFrame(animate);
        };
        const onEnter = () => setBig(true);
        const onLeave = () => setBig(false);
        document.addEventListener("mousemove", onMove);
        document.querySelectorAll("button, .img-frame, .foot-link").forEach(el => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });
        raf.current = requestAnimationFrame(animate);
        return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
    }, []);

    return (
        <>
            <div id="cur-dot" ref={dotRef} />
            <div id="cur-ring" ref={ringRef} className={big ? "big" : ""} />
        </>
    );
}

/* ── STAT CELL ── */
function StatCell({ num, suffix, label, delay = 0 }:any) {
    const [ref, vis]:any = useInView(0.4);
    const count = useCountUp(num, vis);
    return (
        <div ref={ref} className={`stat-cell${vis ? " vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
            <div className="stat-num">{count}{suffix}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

/* ── MARQUEE ── */
const WORDS = ["Interface Design", "Motion Systems", "Visual Engineering", "Creative Strategy", "Brand Systems", "Digital Products", "UX Research", "Front-End Dev"];
function Marquee() {
    const all = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
    return (
        <div className="marquee-wrap">
            <div className="marquee-track">
                {all.map((w, i) => <span className="marquee-item" key={i}>{w}</span>)}
            </div>
        </div>
    );
}

/* ── CASE CARD ── */
function CaseCard({ tag, meta, title, desc, stack, timeline, imgMain, imgFloat, reverse }:any) {
    const [ref, vis]:any = useInView(0.1);
    return (
        <div ref={ref} className={`case${reverse ? " rev" : ""}${vis ? " vis" : ""}`}>
            <div className="case-vis">
                <div className="img-frame">
                    <img src={imgMain} alt={title} />
                    <div className="img-tint" />
                </div>
                {imgFloat && (
                    <div className={`float-card ${reverse ? "float-bl" : "float-tr"}`}>
                        <img src={imgFloat} alt="" />
                    </div>
                )}
            </div>
            <div className="case-copy">
                <div className="tag-row">
                    <span className="tag">{tag}</span>
                    <span className="tag-meta">{meta}</span>
                </div>
                <h2 className="case-title">{title}</h2>
                <p className="case-desc">{desc}</p>
                <div className="case-specs">
                    <div><div className="spec-label">Tech Stack</div><div className="spec-val">{stack}</div></div>
                    <div><div className="spec-label">Timeline</div><div className="spec-val">{timeline}</div></div>
                </div>
                <button className="view-btn">
                    <span>View Case Study</span>
                    <span className="arr">→</span>
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════ */
export default function App() {
    const progress = useScrollProgress();

    return (
        <>
            <Cursor />
            <div id="progress-bar" style={{ width: `${progress}%` }} />
            <main>
                {/* HERO */}
                <section className="hero">
                    <div className="orb orb1" />
                    <div className="orb orb2" />
                    <div className="orb orb3" />
                    <div className="hero-badge">Portfolio Archive</div>
                    <h1 className="hero-h1">Selected<br />Works <span className="ghost">2026</span></h1>
                    <p className="hero-sub">Architecting high-fidelity digital experiences through the lens of emerging 2026 aesthetics and structural precision.</p>
                    <div className="scroll-hint">
                        <div className="scroll-hint-line" />
                        Scroll to explore
                    </div>
                </section>

                {/* STATS */}
                <div className="stats-band">
                    <div className="stats-inner">
                        <StatCell num={48} suffix="+" label="Projects Delivered" delay={0} />
                        <StatCell num={96} suffix="%" label="Client Satisfaction" delay={120} />
                        <StatCell num={3} suffix="yrs" label="Industry Expertise" delay={240} />
                    </div>
                </div>

                {/* MARQUEE */}
                <Marquee />

                {/* CASES */}
                <section className="cases">
                    <CaseCard
                        tag="FinTech" meta="2026 Milestone"
                        title="The Quantum Ledger"
                        desc="Revolutionizing digital banking with 2026 glass-ui technology. We built a high-pressure ecosystem for asset visualization and rapid-response trading."
                        stack="React, Three.js, Framer" timeline="3 Weeks"
                        imgMain="https://lh3.googleusercontent.com/aida-public/AB6AXuAHgbASBQt76gd2DoRkbyg6Uuna0c8_X1zst2AwYA4KyKrGF-O7X-W1AWxAoTPNEOY8yJni0sWOLZa1NxRrUZPpMlChcC9k827x2xES9mcivyvM72wiLmLew9KmL7ttmkXEk9IgKdCb6QcYCZCA1TaIA1xf5gKl5Q3j3sC5mOjpcz9ZOMdJG7A5zNi2emoXcX1J3mSZSv8XJ17rNQ9JA2WhD9Ctuuv97PkdtBepXdhe9J4pnFg4ONZ6-f--lqa87994EJOL5wjsBnaV"
                        imgFloat="https://lh3.googleusercontent.com/aida-public/AB6AXuB3uMREMFDuX9snAAlq8muSEEj0pVC3aPb6abnPASRuUmNWG1ArliMrtrtCVQXahKCwH3WORCRP275ZIvics-WI0SuWXQUsTuiX_mGyEkOzfwSzxGlnkL4X8ZgTjldphjgarXTWWE_qxlIt5nfmCJd5WPPoXbZj_wmZginvsVBvztKesbi7vLaT_2m7TCI5pybhMCjigzQq848tsqEQvis47G2dOz27bJ17MTkFPrQb9HPlIFajb0vUW-oi6Y6QXfUVQnfVKgnAv7vV"
                    />
                    <CaseCard
                        tag="AI Insights" meta="Core Engine"
                        title="Neural Flow Engine"
                        desc="Visualizing complex data through interactive 3D structures. A seamless integration of WebGL and real-time neural processing streams."
                        stack="Next.js, WebGL, D3" timeline="6 Weeks"
                        imgMain="https://lh3.googleusercontent.com/aida-public/AB6AXuBMqwisFyeVedyULFlV4k9cVArHvdYScL-9sUhUEzytlTVJ9-csTnTvGG1MVc5pHoeMhzpBXogqWKy5UdjGEZ4ETgMTG4j3b9M1QP0RprrUpivj-B01syDjO3eDFaIS9NZVi-_hxEgwN-Fh6LYMloElpoIGLZ6IFMntot3lpp5xKDtoveYIj908iOu3Gc_Rvj2NeAds1o8v3y6RTBrNbwutSl1N4cvG1V09ReEtz52lw9iS0XNL1pmjvxR9hwC5kaB8soiRLchtCPCV"
                        imgFloat="https://lh3.googleusercontent.com/aida-public/AB6AXuAL7r6pHYqMocBmKUfyaWxDh8DJMhI3WKlYlMNWtX9SwvjBm3REJRb6q2mxFGOvqN01ji1ATD8uAoe1aydER3UptJWiuVStsIFFDdKhpKnq_GDRUhYZUxIbv4SJof35w9YBlYAxPkuQeQA9QA-18chQ-96NuPr2hyL7TEqd5ZfapM8Pyfle0qHI--OW-75-RtfylJDbrNIzNF-2S07atx6Oh6v7-DHIDCXctiwtcgSFl-ouoAh0rVDLF9voCQKvU8MiaXacyaJVDGH-"
                        reverse
                    />
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <div className="cta-card">
                        <div className="cta-glow" />
                        <div className="cta-copy">
                            <h3 className="cta-h">Ready to observe<br />the future?</h3>
                            <p className="cta-p">Our 2026 design sprints are now open for new partnerships.</p>
                        </div>
                        <div className="cta-action">
                            <button className="launch-btn">Launch Project →</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}