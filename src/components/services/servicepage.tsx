import { useEffect, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useMotionValue,
} from "framer-motion";

/* ─── Reusable helpers ─── */

// Fade + slide up when element enters viewport
const FadeUp = ({ children, delay = 0, className = "", amount = 0.3 }: any) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

// Staggered children container
const StaggerContainer = ({ children, className = "", stagger = 0.1, delay = 0 }: any) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
                hidden: {},
            }}
        >
            {children}
        </motion.div>
    );
};

const StaggerItem = ({ children, className = "" }: any) => (
    <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 40, scale: 0.96 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
        }}
    >
        {children}
    </motion.div>
);

// Animated number counter
const Counter = ({ target, suffix = "" }: any) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: any) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target]);
    return <span ref={ref}>{count}{suffix}</span>;
};

// Floating blob with subtle infinite drift
const FloatingBlob = ({ className }: any) => (
    <motion.div
        className={className}
        animate={{ x: [0, 18, -10, 0], y: [0, -14, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
);

// Magnetic button effect
const MagneticButton = ({ children, className, onClick }: any) => {
    const ref: any = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const handleMove = (e: any) => {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.35);
        y.set((e.clientY - cy) * 0.35);
    };
    const handleLeave = () => { x.set(0); y.set(0); };
    return (
        <motion.button
            ref={ref}
            className={className}
            style={{ x, y }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

/* ─── Main Component ─── */

const Servicepage = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, -80]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const blobScale = useTransform(scrollY, [0, 800], [1, 1.3]);

    const [activeFilter, setActiveFilter] = useState("All");
    const filters = ["All", "Web Apps", "E-commerce", "SaaS"];

    return (
        <main className="relative pt-20 overflow-x-hidden">

            {/* ── Hero blobs with parallax ── */}
            <motion.div
                style={{ scale: blobScale }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/20 rounded-full blob -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />
            <FloatingBlob className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-brand-violet/20 rounded-full blob -translate-x-1/2 pointer-events-none" />

            {/* ══════════ HERO ══════════ */}
            <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto text-center">
                <motion.div style={{ y: heroY, opacity: heroOpacity }}>

                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 text-brand-indigo text-xs font-bold uppercase tracking-wider mb-8"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "backOut" }}
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-brand-indigo"
                            animate={{ scale: [1, 1.6, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        Web Development Experts
                    </motion.div>

                    {/* Headline — word-by-word reveal */}
                    <div className="text-5xl md:text-7xl font-headline font-black text-slate-900 tracking-tight leading-tight mb-8">
                        {["Professional"].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-4"
                                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        {["Web", "Development"].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        {["Services"].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-4"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                    >
                        Crafting high-performance, scalable digital solutions for the modern web. We build tools that drive growth.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                    >
                        <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl">
                            Start Your Project
                        </MagneticButton>
                        <MagneticButton className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
                            View Our Work
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </section>

            {/* ══════════ ABOUT / ENGINEERING ══════════ */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image stack */}
                    <FadeUp className="relative flex items-center justify-center min-h-[500px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-indigo/20 rounded-full blur-[80px] -z-10" />
                        <motion.div
                            className="relative z-10 w-4/5 ml-auto aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                            initial={{ opacity: 0, x: 60, rotate: 3 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.02, rotate: -1 }}
                        >
                            <img alt="Team collaboration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5S8M7sYIVWdq3f2wQtrum65njpjJlKE0hOONEvu5OMcvPxe6818so1TbIohrdi9i2grfUrquINFOoKReFjX-BZq-gmWkGI2s8FmIOsQP1dtC7UWYmQ3h4U074XXZlPGpd8vItJxhYB-8whaoJTT4GCT7D93zShWrxxa2bqAM99EHxaTS1n8pJFtYyv_-XLSNTjHOEfERQ8370DwxxOI7R0Ae7suyerCoW4_Edi5SsWZrkoYM6M4OTlqZKNywAo0Zywdi6yJeI7aY" />
                        </motion.div>

                        <motion.div
                            className="absolute bottom-0 left-0 z-20 w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white translate-y-8"
                            initial={{ opacity: 0, x: -40, y: 60 }}
                            whileInView={{ opacity: 1, x: 0, y: 32 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.04 }}
                        >
                            <img alt="High quality code" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9" />
                        </motion.div>

                        <motion.div
                            className="absolute top-12 left-0 z-30 glass p-6 rounded-2xl shadow-xl max-w-[200px] -translate-x-4"
                            initial={{ opacity: 0, scale: 0.7, x: -20 }}
                            whileInView={{ opacity: 1, scale: 1, x: -16 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4, ease: "backOut" }}
                            animate={{ y: [0, -6, 0] }}
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-3 mb-2 text-brand-indigo">
                                    <span className="material-symbols-outlined font-bold">code</span>
                                    <span className="text-xs font-black uppercase tracking-tighter">Clean Code</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Architected for 99.9% Uptime</p>
                            </motion.div>
                        </motion.div>
                    </FadeUp>

                    {/* Text side */}
                    <div>
                        <FadeUp delay={0.05}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 text-brand-indigo text-[10px] font-black uppercase tracking-widest mb-4">
                                Engineering Excellence
                            </div>
                            <h2 className="text-4xl md:text-5xl font-headline font-black text-slate-900 mb-6 leading-tight">
                                We don't just build websites; we <span className="text-brand-indigo">engineer experiences.</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10">
                                Our multidisciplinary team of senior architects and designers collaborates to transform complex requirements into seamless digital products. We focus on scalability, security, and exceptional user engagement.
                            </p>
                        </FadeUp>

                        <StaggerContainer className="grid sm:grid-cols-2 gap-8" stagger={0.13} delay={0.1}>
                            {[
                                { icon: "terminal", color: "brand-indigo", bg: "brand-indigo/10", title: "Full-Stack Mastery", desc: "From robust backend systems to fluid frontend interfaces, we handle the entire spectrum of modern development." },
                                { icon: "design_services", color: "brand-cyan", bg: "brand-cyan/10", title: "User-Centric Architecture", desc: "Every line of code is written with the end-user in mind, ensuring intuitive navigation and lightning-fast responses." },
                                { icon: "bolt", color: "brand-violet", bg: "brand-violet/10", title: "Performance Optimization", desc: "We optimize for Core Web Vitals, ensuring your platform remains performant under high traffic loads." },
                                { icon: "security", color: "emerald-600", bg: "emerald-100", title: "Scalable Security", desc: "Enterprise-grade security protocols are baked into our architecture from day one to protect your data." },
                            ].map(({ icon, color, bg, title, desc }) => (
                                <StaggerItem key={title}>
                                    <motion.div className="flex flex-col gap-3" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <motion.div
                                            className={`w-10 h-10 rounded-lg bg-${bg} flex items-center justify-center text-${color}`}
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <span className="material-symbols-outlined text-xl">{icon}</span>
                                        </motion.div>
                                        <h4 className="font-black text-slate-900">{title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ══════════ TECHNOLOGIES ══════════ */}
            <section className="px-6 py-24 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <FadeUp>
                        <h2 className="text-4xl font-headline font-black mb-16">Technologies We Use</h2>
                    </FadeUp>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" stagger={0.08}>
                        {[
                            { icon: "html", color: "text-brand-cyan", label: "HTML5" },
                            { icon: "css", color: "text-brand-indigo", label: "CSS3" },
                            { icon: "javascript", color: "text-brand-violet", label: "JavaScript" },
                            { icon: "rebase_edit", color: "text-brand-cyan", label: "React" },
                            { icon: "terminal", color: "text-green-400", label: "Node.js" },
                            { icon: "php", color: "text-brand-indigo", label: "PHP" },
                            { icon: "diamond", color: "text-red-500", label: "Laravel" },
                            { icon: "database", color: "text-orange-400", label: "MySQL" },
                            { icon: "storage", color: "text-green-500", label: "MongoDB" },
                        ].map(({ icon, color, label }) => (
                            <StaggerItem key={label}>
                                <motion.div
                                    className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 cursor-pointer"
                                    whileHover={{ backgroundColor: "rgba(255,255,255,0.12)", y: -8, borderColor: "rgba(255,255,255,0.25)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <motion.span
                                        className={`material-symbols-outlined text-4xl ${color}`}
                                        whileHover={{ rotateY: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {icon}
                                    </motion.span>
                                    <span className="font-bold text-sm tracking-widest uppercase">{label}</span>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ══════════ WHY CHOOSE US ══════════ */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <FadeUp>
                    <h2 className="text-4xl font-headline font-black text-center text-slate-900 mb-16">Why Choose Us</h2>
                </FadeUp>
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12}>
                    {[
                        { icon: "groups", bg: "bg-brand-indigo/10", color: "text-brand-indigo", title: "Expert Developers", desc: "Top-tier talent with years of experience across multiple tech stacks." },
                        { icon: "layers", bg: "bg-brand-cyan/10", color: "text-brand-cyan", title: "Scalable Architecture", desc: "Systems designed to handle millions of users and high traffic loads." },
                        { icon: "speed", bg: "bg-brand-violet/10", color: "text-brand-violet", title: "Agile Methodology", desc: "Iterative delivery ensuring transparency and rapid time-to-market." },
                        { icon: "support_agent", bg: "bg-emerald-100", color: "text-emerald-600", title: "Post-Launch Support", desc: "24/7 monitoring and maintenance to keep your digital asset optimized." },
                    ].map(({ icon, bg, color, title, desc }) => (
                        <StaggerItem key={title}>
                            <motion.div
                                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 cursor-pointer h-full"
                                whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <motion.div
                                    className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-6`}
                                    whileHover={{ scale: 1.2, rotate: 8 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="material-symbols-outlined">{icon}</span>
                                </motion.div>
                                <h3 className="text-xl font-bold mb-3">{title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            {/* ══════════ PROCESS ══════════ */}
            <section className="px-6 py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <FadeUp>
                        <h2 className="text-4xl font-headline font-black text-center mb-20">Our Development Process</h2>
                    </FadeUp>
                    <div className="relative">
                        {/* animated progress line */}
                        <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-slate-200">
                            <motion.div
                                className="h-full bg-brand-indigo"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                            />
                        </div>

                        <StaggerContainer className="grid lg:grid-cols-6 gap-8 relative" stagger={0.15} delay={0.2}>
                            {[
                                { n: "01", title: "Discovery", desc: "Understanding your business goals and user needs.", filled: false },
                                { n: "02", title: "Planning", desc: "Defining requirements and project roadmap.", filled: false },
                                { n: "03", title: "Design", desc: "Creating high-fidelity UI/UX prototypes.", filled: false },
                                { n: "04", title: "Development", desc: "Coding with the latest industry standards.", filled: false },
                                { n: "05", title: "Testing", desc: "Quality assurance and performance optimization.", filled: false },
                                { n: "06", title: "Launch", desc: "Deployment and post-launch monitoring.", filled: true },
                            ].map(({ n, title, desc, filled }) => (
                                <StaggerItem key={n}>
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div
                                            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10 shadow-lg border-4 ${filled ? "bg-brand-indigo border-brand-indigo" : "bg-white border-brand-indigo"}`}
                                            whileHover={{ scale: 1.15, rotate: 6 }}
                                            whileInView={{ scale: [0.5, 1.1, 1] }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, ease: "backOut" }}
                                        >
                                            <span className={`font-black ${filled ? "text-white" : "text-brand-indigo"}`}>{n}</span>
                                        </motion.div>
                                        <h4 className="font-bold mb-2">{title}</h4>
                                        <p className="text-xs text-slate-500">{desc}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ══════════ RECENT WORK ══════════ */}
            <section className="px-6 py-24 max-w-7xl mx-auto relative">
                <FloatingBlob className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blob pointer-events-none" />
                <div className="relative z-10">
                    <FadeUp className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-headline font-black text-slate-900 mb-6">Our Recent Work</h2>
                        <div className="flex flex-wrap justify-center gap-2 mt-8">
                            {filters.map((f) => (
                                <motion.button
                                    key={f}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === f ? "bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20" : "bg-white text-slate-600 border border-slate-200 hover:border-brand-indigo hover:text-brand-indigo"}`}
                                    onClick={() => setActiveFilter(f)}
                                    whileTap={{ scale: 0.95 }}
                                    layout
                                >
                                    {f}
                                </motion.button>
                            ))}
                        </div>
                    </FadeUp>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.14}>
                        {[
                            { tags: [{ label: "React", bg: "bg-brand-indigo/10", color: "text-brand-indigo" }, { label: "Node.js", bg: "bg-brand-cyan/10", color: "text-brand-cyan" }], title: "NexGen Fintech Dashboard", desc: "A high-performance financial management platform with real-time data visualization and secure API integrations.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6vB7iY8WkG6S1V7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9" },
                            { tags: [{ label: "E-commerce", bg: "bg-brand-violet/10", color: "text-brand-violet" }, { label: "Next.js", bg: "bg-emerald-100", color: "text-emerald-600" }], title: "Luxe Aura Marketplace", desc: "Custom-built premium retail experience with headless commerce architecture and lightning-fast page loads.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9E8F7G6H5I4J3K2L1M0N9O8P7Q6R5S4T3U2V1W0X9Y8Z7A6B5C4D3E2F1G0H9I8J7K6L5M4N3O2P1" },
                            { tags: [{ label: "SaaS", bg: "bg-brand-cyan/10", color: "text-brand-cyan" }, { label: "Laravel", bg: "bg-red-100", color: "text-red-600" }], title: "StreamLine HR Tool", desc: "Cloud-based human resources platform automating payroll, recruitment, and employee lifecycle management.", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9" },
                        ].map(({ tags, title, desc, src }) => (
                            <StaggerItem key={title}>
                                <motion.div
                                    className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 h-full"
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                >
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        <motion.img
                                            alt={title}
                                            className="w-full h-full object-cover"
                                            src={src}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.button
                                                className="px-6 py-3 glass text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:bg-white transition-colors"
                                                initial={{ y: 20, opacity: 0 }}
                                                whileHover={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                View Case Study
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {tags.map(({ label, bg, color }) => (
                                                <span key={label} className={`px-3 py-1 ${bg} ${color} text-[10px] font-black uppercase tracking-widest rounded-full`}>{label}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">{desc}</p>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ══════════ GLOBAL PRESENCE ══════════ */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <FadeUp>
                    <h2 className="text-4xl font-headline font-black text-center mb-16">Our Global Presence</h2>
                </FadeUp>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.13}>
                    {[
                        { country: "USA", city: "San Francisco", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2U0pHmyk_ikLmd0TrLkB5oRKU8gmDgwRUtxOZYW0y7rpuiLPVTOlI7CwzK4LA2B--WrBl60g8d0M_M7081EIdcWBTtsCoiOJzb8Iw4id9C25CPff-xqmCHwVligRnKG4qdEN8F-2lIa6DnNVesM_tonjsQ2LkSSUmSAD6B2chMrui_hyJdfaTCJQnjYEnMpjejsFv0P1HmmtiDDuMggkV_usqFftLOY8NMjvFWtrCe4Q_tcWRNFRuicKnEMmV4kSD6srD1mU2vjE" },
                        { country: "UK", city: "London", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB73l8yp7sbMp-J9f-Qvuyp3TvfM9TKg_uVeX9Sh2SqT7kWA9aGnYQmddFk_uZCB15Si5tDgedb7XGGmr6XYyANuzCCRWec944jP_ghLvMin7byOKgsBRHTeDtaP_ZFhRsq83Bt7KzebYKj19l4LK9kIZPJ5qWf6JX_vm9a9lEn3D7DV3sMD6Be8HFYPhmNK43ZD1h3tKiIAFnBolAFCCrlT0afwbf3udIyUohmRSgK7wM4g7sMypYyx2J5atkMIstxmUfstXyIQ34" },
                        { country: "Japan", city: "Tokyo", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-PJbc0gQrw3AFY_k0bPW72UwkU9BZwz9A3gTXCNRzeD5k8XG60bD5mCt8D-0g1A16MSOPtcUNGilDRv1S6IyZDnQ9XyLN_y8qUrmOBSCcul-I6CefSw-HVMjwV_47j2d1G6XcE_ilaUvfqIfQ4dq5YSK_Y1KIZhJeG_Hk4FAfa0jYgMFtI5abh3OPy1zM-mzdWhs39rJr2Oq6Dd2AHfRZEBdmJWnpOd7atrGgbTuMRpG_UhiYxu2nFpidcOhMb6DVATM2WZig1U" },
                        { country: "UAE", city: "Dubai", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfnYtsm0WsEEhAcWDIwz_XkI7HVnq11YUZsy3nvgDdK_N7lqWPUlh8DZpA_cAPeTMa-8F3ORsBojPCFErujSRgh2NbZqjhZFkp0sLajfB_wpIbmGdhjtEOGJFvfV7fy9rYiFx1otq4AXhmYjVJF8w1LLRznXCZDsfbt6Zg6-kohfRo-a3OSDhLJy1WcWeK0bthIpc58JYAMl_gdrlE--bYzScGIiCjZn6h_vyJvYv41ev31jnkWP1N5zvy0S1xeSoaB6gjNX7lpg4" },
                    ].map(({ country, city, src }) => (
                        <StaggerItem key={city}>
                            <motion.div
                                className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <motion.img
                                    alt={city}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src={src}
                                    whileHover={{ scale: 1.12 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                                    <motion.div
                                        className="text-white"
                                        initial={{ y: 10, opacity: 0.7 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-1">{country}</p>
                                        <h5 className="text-xl font-bold">{city}</h5>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            {/* ══════════ CONTACT ══════════ */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <motion.div
                    className="bg-gradient-to-br from-brand-indigo/10 via-brand-violet/5 to-brand-cyan/10 rounded-[3rem] p-8 lg:p-20 relative overflow-hidden"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="absolute -top-24 -right-24 w-64 h-64 bg-brand-indigo/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative grid lg:grid-cols-2 gap-16 items-start">
                        <FadeUp delay={0.1}>
                            <h2 className="text-5xl font-headline font-black mb-8 text-slate-900">Let's Connect</h2>
                            <p className="text-xl text-slate-600 mb-12">Ready to bring your digital vision to life? Our team is standing by to help you engineer the next big thing.</p>
                            <div className="space-y-6">
                                {[
                                    { icon: "mail", text: "hello@morphos-it.com" },
                                    { icon: "phone", text: "+1 (555) 123-4567" },
                                ].map(({ icon, text }) => (
                                    <motion.div
                                        key={text}
                                        className="flex items-center gap-6"
                                        whileHover={{ x: 6 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.div
                                            className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                        >
                                            <span className="material-symbols-outlined text-brand-indigo">{icon}</span>
                                        </motion.div>
                                        <span className="text-lg font-bold text-slate-700">{text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeUp>

                        <motion.div
                            className="glass p-8 lg:p-10 rounded-3xl shadow-2xl"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {["First Name", "Last Name"].map((label) => (
                                        <motion.div key={label} whileFocus={{ scale: 1.02 }}>
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">{label}</label>
                                            <motion.input
                                                className="w-full bg-white/50 border-slate-200 rounded-xl px-4 py-3 focus:ring-brand-indigo focus:border-brand-indigo outline-none border"
                                                type="text"
                                                whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">Email Address</label>
                                    <motion.input
                                        className="w-full bg-white/50 border-slate-200 rounded-xl px-4 py-3 focus:ring-brand-indigo focus:border-brand-indigo outline-none border"
                                        type="email"
                                        whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">Message</label>
                                    <motion.textarea
                                        className="w-full bg-white/50 border-slate-200 rounded-xl px-4 py-3 focus:ring-brand-indigo focus:border-brand-indigo outline-none border"
                                        rows={4}
                                        whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                                <motion.button
                                    className="w-full bg-brand-indigo text-white font-black py-4 rounded-xl shadow-lg shadow-brand-indigo/20 relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="button"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                    Send Message
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default Servicepage;