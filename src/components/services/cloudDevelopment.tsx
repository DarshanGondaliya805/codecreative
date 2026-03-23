import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useSpring,
    useMotionValue,
} from "framer-motion";
import Contact from "../Contact";

/* ══════════════════════════════════════════
   LIGHT-MODE DESIGN TOKENS
══════════════════════════════════════════ */
const C = {
    surface: "#F8FAFC",
    surfaceBright: "#FFFFFF",
    primary: "#00677E",
    primaryFixed: "#B4EBFF",
    primaryContainer: "#CCF0FF",
    onPrimaryContainer: "#00364A",
    secondary: "#4A6267",
    secondaryFixedDim: "#5E4B8B",
    tertiary: "#00695B",
    onTertiary: "#FFFFFF",
    surfaceTint: "#00677E",
    surfaceContainerLow: "#F1F4F8",
    surfaceContainer: "#E9EDF2",
    surfaceContainerHigh: "#DDE3EA",
    surfaceContainerHighest: "#D0D9E2",
    surfaceContainerLowest: "#FFFFFF",
    surfaceDim: "#D8DDE4",
    surfaceVariant: "#DCE4E9",
    background: "#F8FAFC",
    onSurface: "#181C20",
    onSurfaceVariant: "#40484C",
    outlineVariant: "#BFC8CE",
    outline: "#70787D",
    error: "#BA1A1A",
    surfaceLow: "#F7F2FA",
    surfaceHigh: "#ECE6F0",
    surfaceHighest: "#E6E0E9",
    onSurfaceVar: "#49454F",
};

/* ══════════════════════════════════════════
   ANIMATION HELPERS
══════════════════════════════════════════ */
const FadeUp = ({ children, delay = 0, className = "", amount = 0.2 }: any) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
};


const Stagger = ({ children, className = "", stagger = 0.09, delay = 0, amount = 0.1 }: any) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount });
    return (
        <motion.div ref={ref} className={className}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } }, hidden: {} }}>
            {children}
        </motion.div>
    );
};
const Item = ({ children, className = "" }: any) => (
    <motion.div className={className}
        variants={{
            hidden: { opacity: 0, y: 36, scale: 0.96 },
            visible: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            },
        }}>
        {children}
    </motion.div>
);

/* Magnetic button */
const Magnetic = ({ children, className, style, onClick }: any) => {
    const ref: any = useRef(null);
    const x = useMotionValue(0); const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 260, damping: 18 });
    const sy = useSpring(y, { stiffness: 260, damping: 18 });
    const move = (e: any) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
    };
    return (
        <motion.button ref={ref} className={className} style={{ ...style, x: sx, y: sy }}
            onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}
            whileTap={{ scale: 0.96 }} onClick={onClick}>
            {children}
        </motion.button>
    );
};


/* Floating blob */
const Blob = ({ style, className }: any) => (
    <motion.div className={className} style={style}
        animate={{ x: [0, 22, -14, 0], y: [0, -18, 12, 0], scale: [1, 1.07, 0.96, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function CloudSolutionsPage() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, -80]);
    const heroOp = useTransform(scrollY, [0, 450], [1, 0.15]);


    return (
        <div style={{ background: C.background, color: C.onSurface, fontFamily: "'Inter', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .mat { font-family:'Material Symbols Outlined'; font-style:normal; font-weight:normal;
               display:inline-block; line-height:1; text-transform:none; }
        .mat-fill { font-variation-settings:'FILL' 1; }
        .font-headline { font-family:'Space Grotesk',sans-serif; }
        .font-label    { font-family:'Inter',sans-serif; letter-spacing:.05em; }
        .text-gradient {
          background: linear-gradient(135deg, ${C.primary}, ${C.secondaryFixedDim});
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(191,200,206,0.3);
        }
        .neon-glow { box-shadow: 0 0 40px -10px rgba(0,103,126,0.18); }
        .shimmer::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.5) 50%,transparent 60%);
          transform: translateX(-100%); transition: transform .55s ease;
        }
        .shimmer:hover::after { transform: translateX(100%); }
        .scroll-mask {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        ::selection { background: ${C.primaryContainer}; color: ${C.onPrimaryContainer}; }
      `}</style>

            {/* ═══ HERO ═══ */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <Blob className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${C.primaryContainer}40, transparent 70%)` }} />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div style={{ y: heroY, opacity: heroOp }}>
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border"
                            style={{ background: C.surfaceContainerHigh, borderColor: `${C.outlineVariant}33` }}
                            initial={{ opacity: 0, scale: 0.8, y: -16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.65, ease: "backOut" }}
                        >
                            <motion.span className="w-2 h-2 rounded-full"
                                style={{ background: C.tertiary }}
                                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }} />
                            <span className="text-xs font-label tracking-widest uppercase" style={{ color: C.tertiary }}>
                                Cloud Native Solutions
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                            {[
                                { text: "Power Your Business with ", gradient: false },
                                { text: "Scalable Cloud Solutions", gradient: true },
                            ].map(({ text, gradient }, i) => (
                                text.split(" ").map((word, j) => (
                                    <motion.span key={`${i}-${j}`}
                                        className={`inline-block mr-[0.22em] ${gradient ? "text-gradient" : ""}`}
                                        initial={{ opacity: 0, y: 56, rotateX: -30 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ duration: 0.65, delay: 0.08 + (i === 0 ? j : j + 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                                        {word}
                                    </motion.span>
                                ))
                            ))}
                        </h1>

                        <motion.p className="text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
                            style={{ color: C.onSurfaceVariant }}
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.75 }}>
                            Unleash the full potential of digital transformation with our high-performance cloud infrastructure. Secure, reliable, and built for the future.
                        </motion.p>

                        <motion.div className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}>
                            <Magnetic className="shimmer relative overflow-hidden px-8 py-4 rounded-lg font-bold flex items-center gap-2 cursor-pointer"
                                style={{ background: C.primaryContainer, color: C.onPrimaryContainer, boxShadow: `0 4px 24px ${C.primary}22` }}>
                                Get Cloud Consultation
                                <span className="mat">arrow_forward</span>
                            </Magnetic>
                            <Magnetic className="glass-card px-8 py-4 rounded-lg font-bold cursor-pointer"
                                style={{ color: C.onSurface, border: `1px solid ${C.outlineVariant}55` }}>
                                Contact Experts
                            </Magnetic>
                        </motion.div>
                    </motion.div>

                    {/* Hero card */}
                    <motion.div className="relative"
                        initial={{ opacity: 0, x: 60, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        <motion.div className="absolute -inset-4 rounded-full pointer-events-none"
                            style={{ background: `${C.primary}14`, filter: "blur(60px)" }}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                        <div className="relative glass-card aspect-square rounded-3xl p-8 flex items-center justify-center overflow-hidden neon-glow"
                            style={{ border: `1px solid ${C.outlineVariant}33` }}>
                            <img alt="Cloud Infrastructure" className="w-full h-full object-cover rounded-2xl"
                                style={{ opacity: 0.7 }}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSKFAZJsyHrJHzSobrBNdrQn4JWZwoeyDa06is63h9PGCqXX3nxuft10l3KJk1bdJzoq0xk80CpgyccEFleaLCRaxwJf6TqH-r_IZsq0_JjtH4jC6AyEH6tpaqs0kdzOnzeYAw0JBiPKEIYUEz1o6h0D96V1UiYXoSIODjvFQe8L7ywIekdHIQsmC-0lyIvWDxoc4FtFz95zO1Vi2xmJyEmEMI6RBsu2jmQ5mpKjb1w3AMRHAS3ZtdU_TwT1gIlUcQBPK1fI6-Y1g" />
                            <div className="absolute inset-0"
                                style={{ background: `linear-gradient(to top, ${C.surface}cc, transparent)` }} />
                            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4 z-10">
                                {[
                                    { icon: "speed", color: C.primary, border: `${C.primary}33`, label: "Uptime", value: "99.99%" },
                                    { icon: "security", color: C.tertiary, border: `${C.tertiary}33`, label: "Security", value: "L-7 WAF" },
                                ].map(({ icon, color, border, label, value }) => (
                                    <motion.div key={label} className="glass-card p-4 rounded-xl"
                                        style={{ border: `1px solid ${border}` }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.1 }}
                                        whileHover={{ scale: 1.05 }}>
                                        <span className="mat block mb-2" style={{ color, fontSize: 22 }}>{icon}</span>
                                        <div className="text-xs font-label" style={{ color: C.onSurfaceVariant }}>{label}</div>
                                        <div className="text-xl font-headline font-bold">{value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ CLOUD SERVICES GRID ═══ */}
            <section className="py-24" style={{ background: C.surfaceContainerLow }}>
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp className="text-center mb-20">
                        <span className="font-label tracking-widest uppercase text-sm" style={{ color: C.primary }}>Capabilities</span>
                        <h2 className="font-headline text-4xl lg:text-5xl font-bold mt-4">Enterprise Cloud Services</h2>
                    </FadeUp>

                    <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
                        {[
                            { icon: "cloud_sync", title: "Cloud Migration", desc: "Seamlessly transition your legacy systems to robust cloud environments with zero downtime." },
                            { icon: "dns", title: "Infrastructure Setup", desc: "Architecting scalable, high-availability server layouts tailored to your traffic demands." },
                            { icon: "terminal", title: "DevOps & CI/CD", desc: "Automate your delivery pipeline to deploy faster and with higher confidence." },
                            { icon: "shield_lock", title: "Cloud Security", desc: "Advanced threat detection and encryption to safeguard your most critical data assets." },
                            { icon: "settings_backup_restore", title: "Disaster Recovery", desc: "Ensure business continuity with automated backups and instant failover protocols." },
                            { icon: "support_agent", title: "Managed Services", desc: "24/7 monitoring and optimization by our certified cloud engineers." },
                            { icon: "layers", title: "Hybrid Cloud", desc: "The best of both worlds: combining private security with public scalability." },
                            { icon: "bolt", title: "Serverless", desc: "Run code without provisioning servers. Pay only for the compute time you use." },
                        ].map(({ icon, title, desc }) => (
                            <Item key={title}>
                                <motion.div className="glass-card p-8 rounded-2xl h-full cursor-pointer"
                                    style={{ border: `1px solid ${C.outlineVariant}22` }}
                                    whileHover={{ y: -8, borderColor: `${C.primary}55`, boxShadow: `0 20px 48px ${C.primary}14` }}
                                    transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                                    <motion.div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                                        style={{ background: `${C.primary}14` }}
                                        whileHover={{ background: `${C.primary}26`, rotate: [0, -8, 8, 0], scale: 1.12 }}
                                        transition={{ duration: 0.4 }}>
                                        <span className="mat" style={{ color: C.primary, fontSize: 24 }}>{icon}</span>
                                    </motion.div>
                                    <h3 className="font-headline text-xl font-bold mb-4">{title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: C.onSurfaceVariant }}>{desc}</p>
                                </motion.div>
                            </Item>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ═══ CLOUD PLATFORMS ═══ */}
            <section className="py-24 overflow-hidden" style={{ background: C.surface }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <FadeUp>
                            <span className="font-label tracking-widest uppercase text-sm block mb-4"
                                style={{ color: C.secondary }}>Ecosystem</span>
                            <h2 className="font-headline text-4xl font-bold">Supported Platforms</h2>
                        </FadeUp>
                        <FadeUp delay={0.15} className="max-w-md mt-6 md:mt-0">
                            <p style={{ color: C.onSurfaceVariant }}>
                                We partner with the world's leading cloud providers to deliver optimized infrastructure performance.
                            </p>
                        </FadeUp>
                    </div>

                    <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" stagger={0.09}>
                        {[
                            { icon: "cloud_queue", color: C.primaryFixed, label: "AWS" },
                            { icon: "window", color: C.secondary, label: "Azure" },
                            { icon: "google", color: C.tertiary, label: "GCP" },
                            { icon: "waves", color: C.primary, label: "DigitalOcean" },
                            { icon: "hub", color: C.secondaryFixedDim, label: "Kubernetes" },
                            { icon: "deployed_code", color: C.primaryFixed, label: "Docker" },
                        ].map(({ icon, color, label }) => (
                            <Item key={label}>
                                <motion.div className="glass-card aspect-square rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer"
                                    style={{ border: `1px solid ${C.outlineVariant}22` }}
                                    whileHover={{ y: -6, background: `${C.surfaceContainerHigh}`, borderColor: `${color}44`, boxShadow: `0 12px 32px ${color}18` }}
                                    transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                                    <motion.span className="mat" style={{ color, fontSize: 36 }}
                                        whileHover={{ rotateY: 360, scale: 1.15 }}
                                        transition={{ duration: 0.55 }}>
                                        {icon}
                                    </motion.span>
                                    <span className="font-headline font-semibold text-sm">{label}</span>
                                </motion.div>
                            </Item>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ═══ PROCESS TIMELINE ═══ */}
            <section className="py-24 relative" style={{ background: C.surfaceContainerLowest }}>
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp className="text-center mb-20">
                        <h2 className="font-headline text-4xl font-bold">Our Strategic Roadmap</h2>
                    </FadeUp>

                    <div className="relative">
                        {/* Animated line */}
                        <div className="hidden lg:block absolute top-6 left-0 w-full h-px pointer-events-none"
                            style={{ background: `linear-gradient(to right, transparent, ${C.primary}33, transparent)` }}>
                            <motion.div className="h-full"
                                style={{ background: `linear-gradient(to right, transparent, ${C.primary}, ${C.secondary}, transparent)` }}
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 2.0, ease: "easeInOut", delay: 0.2 }} />
                        </div>

                        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 relative z-10" stagger={0.14} delay={0.25}>
                            {[
                                { n: "01", title: "Assessment", desc: "Analyze current systems" },
                                { n: "02", title: "Planning", desc: "Define cloud objectives" },
                                { n: "03", title: "Strategy", desc: "Design architecture" },
                                { n: "04", title: "Implementation", desc: "Execution and deployment" },
                                { n: "05", title: "Monitoring", desc: "Performance optimization" },
                                { n: "06", title: "Support", desc: "Ongoing management" },
                            ].map(({ n, title, desc }) => (
                                <Item key={n}>
                                    <div className="text-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                                            style={{ background: C.surface, border: `2px solid ${C.primary}` }}
                                            whileInView={{ scale: [0.4, 1.14, 1] }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, ease: "backOut" }}
                                            whileHover={{ scale: 1.15, boxShadow: `0 0 0 6px ${C.primary}18` }}>
                                            <span className="font-headline font-bold text-sm" style={{ color: C.primary }}>{n}</span>
                                        </motion.div>
                                        <h4 className="font-headline font-bold mb-2">{title}</h4>
                                        <p className="text-xs" style={{ color: C.onSurfaceVariant }}>{desc}</p>
                                    </div>
                                </Item>
                            ))}
                        </Stagger>
                    </div>
                </div>
            </section>

            {/* ═══ ARCHITECTURE VISUALIZATION ═══ */}
            <section className="py-24" style={{ background: C.surface }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Diagram */}
                        <FadeUp className="relative rounded-3xl overflow-hidden glass-card p-1">
                            <div className="rounded-[calc(1.5rem-4px)] p-8 aspect-video flex items-center justify-center"
                                style={{ background: C.surfaceContainerLow }}>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Central cloud node */}
                                    <motion.div
                                        className="w-24 h-24 rounded-xl flex items-center justify-center z-20"
                                        style={{ background: `${C.primary}18`, border: `1px solid ${C.primary}55` }}
                                        animate={{ boxShadow: [`0 0 0 0 ${C.primary}33`, `0 0 0 16px ${C.primary}00`] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}>
                                        <span className="mat" style={{ color: C.primary, fontSize: 40 }}>cloud</span>
                                    </motion.div>

                                    {/* Orbiting nodes */}
                                    {[
                                        { icon: "database", color: C.tertiary, pos: "top-1/4 left-1/4", delay: 0 },
                                        { icon: "api", color: C.secondary, pos: "bottom-1/4 right-1/4", delay: 0.2 },
                                        { icon: "dns", color: C.primaryFixed, pos: "top-1/2 right-10", delay: 0.4 },
                                    ].map(({ icon, color, pos, delay }) => (
                                        <motion.div key={icon}
                                            className={`absolute ${pos} w-12 h-12 glass-card rounded-lg flex items-center justify-center`}
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 3 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
                                            whileHover={{ scale: 1.2 }}>
                                            <span className="mat" style={{ color, fontSize: 22 }}>{icon}</span>
                                        </motion.div>
                                    ))}

                                    {/* SVG connection lines */}
                                    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none"
                                        viewBox="0 0 400 300"
                                        initial={{ opacity: 0 }} whileInView={{ opacity: 0.35 }}
                                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}>
                                        <motion.path d="M100 75 L200 150 M300 225 L200 150 M340 150 L200 150"
                                            fill="none" stroke={C.primary} strokeWidth="1.5" strokeDasharray="6 4"
                                            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }} />
                                    </motion.svg>
                                </div>
                            </div>
                            {/* Window dots */}
                            <div className="absolute top-6 left-6 flex gap-2">
                                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                                ))}
                            </div>
                        </FadeUp>

                        {/* Copy */}
                        <div>
                            <FadeUp delay={0.1}>
                                <h2 className="font-headline text-4xl font-bold mb-6">Visualizing Complex Infrastructures</h2>
                                <p className="mb-8 leading-relaxed" style={{ color: C.onSurfaceVariant }}>
                                    Our architecture design focuses on redundancy and performance. We map out every interaction to ensure your data travels the fastest, most secure route possible.
                                </p>
                            </FadeUp>
                            <Stagger className="space-y-4" stagger={0.13} delay={0.2}>
                                {[
                                    "Multi-region data distribution",
                                    "Auto-scaling compute clusters",
                                    "Real-time traffic orchestration",
                                ].map((text) => (
                                    <Item key={text}>
                                        <motion.div className="flex items-center gap-3"
                                            whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 280 }}>
                                            <motion.span className="mat" style={{ color: C.tertiary, fontSize: 22 }}
                                                whileHover={{ scale: 1.3, rotate: 15 }}>
                                                check_circle
                                            </motion.span>
                                            <span>{text}</span>
                                        </motion.div>
                                    </Item>
                                ))}
                            </Stagger>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════════ INDUSTRIES ═══════════ */}
            <section className="py-24 px-6" style={{ background: C.surfaceLow }}>
                <div className="max-w-7xl mx-auto text-center">
                    <FadeUp>
                        <h2 className="font-headline text-3xl font-bold mb-16">Global Impact Across Industries</h2>
                    </FadeUp>
                    <Stagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" stagger={0.08}>
                        {[
                            { icon: "medical_services", color: C.primary, label: "Healthcare" },
                            { icon: "account_balance", color: C.secondary, label: "Finance" },
                            { icon: "shopping_bag", color: C.tertiary, label: "E-commerce" },
                            { icon: "sports_esports", color: C.primary, label: "Gaming" },
                            { icon: "school", color: C.secondary, label: "Education" },
                            { icon: "local_shipping", color: C.tertiary, label: "Logistics" },
                        ].map(({ icon, color, label }) => (
                            <Item key={label}>
                                <motion.div
                                    className="p-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer"
                                    style={{ background: C.surface }}
                                    whileHover={{ background: C.surfaceHigh, y: -6, boxShadow: `0 12px 32px ${color}18` }}
                                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                                >
                                    <motion.span
                                        className="mat"
                                        style={{ color: C.onSurfaceVar, fontSize: 36 }}
                                        whileHover={{ color, scale: 1.2, rotate: [0, -8, 8, 0] }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {icon}
                                    </motion.span>
                                    <span className="font-label text-xs" style={{ color: C.onSurfaceVar }}>{label}</span>
                                </motion.div>
                            </Item>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ═══ TESTIMONIALS ═══ */}
            <section className="py-24 overflow-hidden" style={{ background: C.surface }}>
                <div className="max-w-7xl mx-auto px-6">
                    <FadeUp>
                        <h2 className="font-headline text-4xl font-bold mb-16">Client Voices</h2>
                    </FadeUp>
                    <motion.div
                        className="flex gap-6 overflow-x-auto pb-12 scroll-mask"
                        style={{ scrollbarWidth: "none" }}
                        initial={{ x: 60, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                        {[
                            { quote: "Morphos IT migrated our entire infrastructure to AWS within weeks. Their expertise in DevOps transformed our release cycle completely.", name: "Sarah Chen", role: "CTO, Nexus Digital" },
                            { quote: "Security was our main concern. Morphos implemented a zero-trust architecture that exceeded all our compliance requirements.", name: "James Miller", role: "Security Lead, FinVantage" },
                            { quote: "The scalability we achieved is phenomenal. Black Friday used to be a nightmare, but now our cloud handles it effortlessly.", name: "Elena Rodriguez", role: "Operations Director, SwiftCart" },
                        ].map(({ quote, name, role }, i) => (
                            <motion.div key={name}
                                className="min-w-[400px] glass-card p-10 rounded-2xl"
                                style={{ border: `1px solid ${C.outlineVariant}33` }}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -6, boxShadow: `0 24px 56px ${C.primary}12` }}>
                                <div className="flex gap-1 mb-6" style={{ color: C.tertiary }}>
                                    {[...Array(5)].map((_, k) => (
                                        <motion.span key={k} className="mat mat-fill"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.3 + k * 0.07 }}>
                                            star
                                        </motion.span>
                                    ))}
                                </div>
                                <p className="text-lg italic mb-8 leading-relaxed">&ldquo;{quote}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full"
                                        style={{ background: C.surfaceContainerHigh, border: `1px solid ${C.outlineVariant}` }} />
                                    <div>
                                        <div className="font-headline font-bold">{name}</div>
                                        <div className="text-xs" style={{ color: C.onSurfaceVariant }}>{role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Contact />
        </div>
    );
}