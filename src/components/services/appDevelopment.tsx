<<<<<<< HEAD
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

/* ══════════════════════════════════════════
   DESIGN TOKENS  (light-mode palette)
══════════════════════════════════════════ */
const T = {
  primary:       "#6750A4",   // indigo-violet
  primaryCont:   "#EADDFF",
  onPrimary:     "#FFFFFF",
  secondary:     "#625B71",
  tertiary:      "#7D5260",
  surface:       "#FFFBFE",
  surfaceLow:    "#F7F2FA",
  surfaceHigh:   "#ECE6F0",
  surfaceHighest:"#E6E0E9",
  outline:       "#CAC4D0",
  onSurface:     "#1C1B1F",
  onSurfaceVar:  "#49454F",
  background:    "#FFFBFE",
};

/* ══════════════════════════════════════════
   REUSABLE ANIMATION HELPERS
══════════════════════════════════════════ */

/** Fade + slide up on scroll into view */
const FadeUp = ({ children, delay = 0, className = "", amount = 0.25 }:any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Staggered children wrapper */
const Stagger = ({ children, className = "", stagger = 0.1, delay = 0, amount = 0.15 }:any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } }, hidden: {} }}
    >
      {children}
    </motion.div>
  );
};
const Item = ({ children, className = "" }:any) => (
  <motion.div
    className={className}
    variants={{
      hidden:  { opacity: 0, y: 40, scale: 0.95 },
      visible: { opacity: 1, y: 0,  scale: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

/** Magnetic hover button */
const Magnetic = ({ children, className, style }:any) => {
  const ref:any = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const move = (e:any) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top  - r.height/ 2) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref} className={className} style={{ ...style, x: sx, y: sy }}
      onMouseMove={move} onMouseLeave={leave} whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
};

/** Kinetic floating blob */
const Blob = ({ className }:any) => (
  <motion.div
    className={className}
    animate={{ x: [0, 20, -12, 0], y: [0, -16, 12, 0], scale: [1, 1.06, 0.97, 1] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function MobileServicePage() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <div style={{ background: T.background, color: T.onSurface, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .mat { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; display:inline-block; }
        .glass-light {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .font-headline { font-family: 'Playfair Display', serif; }
        .font-label    { font-family: 'DM Sans', sans-serif; letter-spacing: 0.05em; }
        .shimmer-btn::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.4) 50%,transparent 60%);
          transform: translateX(-100%); transition: transform 0.5s ease;
        }
        .shimmer-btn:hover::after { transform: translateX(100%); }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${T.surfaceLow} 0%, ${T.surface} 60%, #EAE4F5 100%)` }}>

        {/* Kinetic blobs */}
        <Blob className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${T.primary}22 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <Blob className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${T.secondary}1A 0%, transparent 70%)`, filter: "blur(60px)" }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div style={{ y: heroParallax, opacity: heroOpacity }}>
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "backOut" }}
            >
              <motion.span
                className="flex h-2 w-2 rounded-full"
                style={{ background: T.tertiary }}
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-label text-xs tracking-[0.2em] uppercase" style={{ color: T.tertiary }}>
                Divine Innovation in Mobility
              </span>
            </motion.div>

            {/* Headline — word pop-in */}
            <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {["Build", "Powerful", "Mobile", "Apps", "for", "the", "Future"].map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  style={{ background: `linear-gradient(135deg, ${T.onSurface}, ${T.primary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  initial={{ opacity: 0, y: 50, rotateX: -35 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: T.onSurfaceVar }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Morphos IT crafts heavenly digital experiences. We transmute complex ideas into fluid, high-performance mobile applications that redefine user expectations.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
            >
              <Magnetic
                className="shimmer-btn relative overflow-hidden px-8 py-4 font-label text-sm font-bold rounded-md flex items-center gap-2 cursor-pointer"
                style={{ background: T.primaryCont, color: T.primary }}
              >
                Get Started <span className="mat">arrow_forward</span>
              </Magnetic>
              <Magnetic
                className="px-8 py-4 font-label text-sm font-bold rounded-md glass-light border cursor-pointer"
                style={{ borderColor: `${T.outline}55`, color: T.onSurface }}
              >
                View Portfolio
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right image stack */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: `radial-gradient(circle, ${T.surfaceHigh} 0%, transparent 70%)`, filter: "blur(60px)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="grid grid-cols-2 gap-6 relative">
              <motion.div
                className="translate-y-12"
                initial={{ opacity: 0, x: -40, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: -1 }}
              >
                <img className="rounded-xl shadow-2xl w-full" alt="Futuristic mobile app UI"
                  style={{ border: `1px solid ${T.outline}33` }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpBMuo6KkmOKkUWY5bBvSzyFgtGajL5CxVx7epP6VvJd659DGJTo-6F3259CkcHq1oIRNbZB8C7_XKT9ELSi3V8vGZgodfKv4gnqr5XcjT1Ob_PeRztcebpk_brcgt2pHQ1832qw08TNpVBssleZtnHjrdDYVlgNEey2hg8pmhZjF0WyDIdEzTdyArIQw3IxxNr8eb2IloF4RV08ozcvgLLtuupBLyKMttHisjYY1HdrDolTlA-UwkKXgKhm0Kzt_Dr6D6-X9OzvU" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: 1 }}
              >
                <img className="rounded-xl shadow-2xl w-full" alt="iOS interface with glowing accents"
                  style={{ border: `1px solid ${T.outline}33` }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8PI7whnSX71ii-rUdi-1BKWTZlOsj_H_Xj1SPxluRjhGdm8Gb10Cz1ZdTyzfNVldzV4ytGrWT3_sseB251r2fKz-5wb9pl7EPzWat98HRpafgVV_cnxGP7hS0fodC2A9y6m39-xBemGW16NNk2Uex-qAj6yS0ekJgOQgzSLKsxCK1iKY0_ZoBC2FfH46pbEMRLsv5z0KuAtLjCpDyQr1pYbHLZq_lO6XERu4OPluvUwDkD3muxDQGJf-gxvQrDTTN51Sambf1Wxw" />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ SERVICES BENTO GRID ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-16">
            <span className="font-label text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: T.primary }}>
              Our Expertise
            </span>
            <h2 className="font-headline text-4xl font-bold">App Development Categories</h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {[
              { icon: "phone_iphone", color: T.primary,    hover: `${T.primary}44`,    title: "iOS Development",    desc: "Native Swift applications built for the elite Apple ecosystem, focusing on premium performance and elegance." },
              { icon: "robot",        color: T.secondary,  hover: `${T.secondary}44`,  title: "Android Solutions",  desc: "Scalable Kotlin-based apps designed for global reach across the diverse Android hardware landscape." },
              { icon: "layers",       color: T.tertiary,   hover: `${T.tertiary}44`,   title: "Cross-Platform",     desc: "Single codebase brilliance using Flutter and React Native to reach all users simultaneously with high fidelity." },
              { icon: "terminal",     color: T.primary,    hover: `${T.primary}44`,    title: "Custom SDKs",        desc: "Modular tools built for developers to extend your platform's capabilities across any third-party app." },
              { icon: "cloud",        color: T.secondary,  hover: `${T.secondary}44`,  title: "Cloud Integration",  desc: "Backend synchronization that keeps your mobile experience alive and persistent across all devices." },
              { icon: "monitoring",   color: T.tertiary,   hover: `${T.tertiary}44`,   title: "Analytics & Growth", desc: "Data-driven insights baked into the core of your app to monitor performance and user retention." },
            ].map(({ icon, color, hover, title, desc }) => (
              <Item key={title}>
                <motion.div
                  className="glass-light p-8 rounded-xl cursor-pointer h-full"
                  style={{ border: `1px solid ${T.outline}22` }}
                  whileHover={{ borderColor: hover, y: -6, boxShadow: `0 20px 48px ${color}18` }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.span
                    className="mat block mb-6 text-3xl"
                    style={{ color, fontSize: 32 }}
                    whileHover={{ rotateY: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {icon}
                  </motion.span>
                  <h3 className="font-headline text-xl font-bold mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.onSurfaceVar }}>{desc}</p>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ TECH STACK ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: T.surface }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-headline text-3xl font-bold mb-16">The Engine of Innovation</h2>
          </FadeUp>

          <Stagger
            className="flex flex-wrap justify-center gap-12"
            stagger={0.12}
          >
            {[
              { icon: "flutter_dash",             color: T.primary,   label: "Flutter"       },
              { icon: "code_blocks",              color: T.secondary, label: "React Native"  },
              { icon: "terminal",                 color: T.primary,   label: "Swift"         },
              { icon: "integration_instructions", color: T.tertiary,  label: "Kotlin"        },
            ].map(({ icon, color, label }) => (
              <Item key={label}>
                <motion.div
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.15, filter: "grayscale(0)" }}
                  initial={{ filter: "grayscale(0.6)" }}
                  style={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: T.surfaceHigh }}
                    whileHover={{ background: `${color}18`, boxShadow: `0 8px 32px ${color}33` }}
                  >
                    <span className="mat" style={{ color, fontSize: 28 }}>{icon}</span>
                  </motion.div>
                  <span className="font-label text-xs" style={{ color: T.onSurfaceVar }}>{label}</span>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ PROCESS TIMELINE ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: T.secondary }}>
              Our Method
            </span>
            <h2 className="font-headline text-4xl font-bold">Divine Workflow</h2>
          </FadeUp>

          <div className="relative">
            {/* Animated progress line */}
            <div className="hidden lg:block absolute top-6 left-0 w-full h-0.5"
              style={{ background: `linear-gradient(to right, ${T.primary}22, ${T.secondary}22, ${T.tertiary}22)` }}>
              <motion.div
                className="h-full"
                style={{ background: `linear-gradient(to right, ${T.primary}, ${T.secondary}, ${T.tertiary})` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            <Stagger className="grid lg:grid-cols-6 gap-8 relative z-10" stagger={0.14} delay={0.2}>
              {[
                { n: "01", c: T.primary,   title: "Idea",    desc: "Conceptualization and strategic visioning." },
                { n: "02", c: T.secondary, title: "UI/UX",   desc: "Architecture of ethereal user journeys." },
                { n: "03", c: T.tertiary,  title: "Dev",     desc: "Kinetic coding and system engineering." },
                { n: "04", c: T.primary,   title: "Test",    desc: "Rigorous quality assurance audits." },
                { n: "05", c: T.secondary, title: "Deploy",  desc: "Seamless launch to global markets." },
                { n: "06", c: T.tertiary,  title: "Support", desc: "Continuous evolutionary maintenance." },
              ].map(({ n, c, title, desc }) => (
                <Item key={n}>
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: T.surface, border: `2px solid ${c}`, boxShadow: `0 0 0 0px ${c}33` }}
                      whileInView={{ scale: [0.5, 1.12, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, ease: "backOut" }}
                      whileHover={{ boxShadow: `0 0 0 6px ${c}22`, scale: 1.12 }}
                    >
                      <span className="font-headline font-bold text-sm" style={{ color: c }}>{n}</span>
                    </motion.div>
                    <h4 className="font-headline font-bold mb-2">{title}</h4>
                    <p className="text-xs" style={{ color: T.onSurfaceVar }}>{desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ═══════════ MORPHOS EDGE + PORTFOLIO ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surface }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          {/* Left — Why us */}
          <div>
            <FadeUp>
              <h2 className="font-headline text-4xl font-bold mb-12">The Morphos Edge</h2>
            </FadeUp>
            <Stagger className="space-y-6" stagger={0.13} delay={0.1}>
              {[
                { icon: "shield", color: T.primary,   bg: `${T.primary}12`,   title: "Ironclad Security",     desc: "Military-grade encryption and secure data handling protocols for every enterprise application." },
                { icon: "bolt",   color: T.secondary, bg: `${T.secondary}12`, title: "Peak Performance",      desc: "Optimized codebases that deliver lightning-fast response times and smooth frame rates." },
                { icon: "hub",    color: T.tertiary,  bg: `${T.tertiary}12`,  title: "Scalable Architecture", desc: "Future-proof designs built to handle 100 to 100 million users without friction." },
              ].map(({ icon, color, bg, title, desc }) => (
                <Item key={title}>
                  <motion.div
                    className="flex gap-6 p-6 rounded-lg"
                    style={{ background: `${T.surfaceHigh}60`, border: `1px solid ${T.outline}18` }}
                    whileHover={{ x: 6, background: `${T.surfaceLow}`, borderColor: `${color}44`, boxShadow: `0 8px 32px ${color}12` }}
                    transition={{ type: "spring", stiffness: 280 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center"
                      style={{ background: bg }}
                      whileHover={{ rotate: -8, scale: 1.15 }}
                    >
                      <span className="mat" style={{ color, fontSize: 22 }}>{icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-headline font-bold mb-2">{title}</h4>
                      <p className="text-sm" style={{ color: T.onSurfaceVar }}>{desc}</p>
                    </div>
                  </motion.div>
                </Item>
              ))}
            </Stagger>
          </div>

          {/* Right — portfolio grid */}
          <Stagger className="grid grid-cols-2 gap-4" stagger={0.12}>
            <div className="pt-12 space-y-4">
              {[
                { alt: "Healthcare app", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaB_-zI0rTM63loP2bf2tQ-lBcOtr1LYh7jp_HGC_1mZh0spr66dP4cj-c-os43MX6ALgRv4IpXxHL3O0LrOraCZEdru_sz7YQH2QVpD3JlzoAUGkMQ-HOGNhWbrSsS_t-rB1ihUPuIHziAJLXzuZMzcUlY1EfdICM_oltMiAs8WHE-tkfKAToT7tXsKcemG8DJuV2Eg6yaA4EGIFcxTcN4hXUGKoF-2XsgOEKWomxSKlHRvq44KZ2nssvKxnRRv93jrd5Zh-KO6k" },
                { alt: "Finance dashboard", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMta-77gL9wUwabV4PhQCSYx44AGHsnBCuwOrIEQit4YeHZHu09ZR8RcUtx8P8nvUNdFh8_CJr7U68rvHDr8PERE_rxkoKEOVuP9b1Pz8yfjxfrGwo1XKGcVlMEmyok2bDOaRLbUG_SMRIVXt7PuJSVjcfQY8bmlvnol8NLLEYeNekAJAHF-_u9rxFBJ7SLbcS9qlEA4ARzL4WaeJ6xlF9yqrGiG4eIZglYSqp-W-lYoXXWv6u9ru7zyLVe0ShlOctYgtKTBtqn-4" },
              ].map(({ alt, src }) => (
                <Item key={alt}>
                  <motion.img
                    className="rounded-xl shadow-xl w-full"
                    style={{ border: `1px solid ${T.outline}22` }}
                    alt={alt} src={src}
                    whileHover={{ scale: 1.04, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                </Item>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { alt: "E-commerce UI", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXVaSMU51DCiw0d5vRcc7O21CeujPrXqLLlEGHrgLb0aU1BJSMyBpCGBkVudeD1IzxOIzvqd-ywnJcPxvYtgj2WaEavLJ-V-H9PyeJ7Dy9KvuFKKfXvdtnMT3_CA_nSkS2yQ10IasAswiGO_U-ERh_hUOFTMixXmZ33xR8fcy7-skOHAjRxaN2gdp_7cMxbwLRJDqMvDZSsVULvrNu3kKscjTLGASWh2jEJcp8kRbOKi56RW42gHZJ6MqaXpE4RgmQOKJPPoHYj74" },
                { alt: "Analytics mobile UI", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr5hyT8LOJE7upY7PVD58r81rPXwmjNN1Hi8UjicqFz3rp0NVx7rET1fl7zliE7EbUeqolOLfZl_jn9em2gTeyBahvV0BV2b5IoOhyhO5y0--QUGxPfGcm81yKe42geyj2Tlnt6KUnrb2I3OOaduh-js_dfQ3GKFAR7AQedIJuT3-sPZpL3v-8t9WEjp5mrct95lPFN2PSeFvCL8cXEGsFaKt1sm-MEw360_FjtD31J4orzUKuqvBZBzAG5KYMBUgvGYSI9qiEftc" },
              ].map(({ alt, src }) => (
                <Item key={alt}>
                  <motion.img
                    className="rounded-xl shadow-xl w-full"
                    style={{ border: `1px solid ${T.outline}22` }}
                    alt={alt} src={src}
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                </Item>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* ═══════════ INDUSTRIES ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-headline text-3xl font-bold mb-16">Global Impact Across Industries</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" stagger={0.08}>
            {[
              { icon: "medical_services", color: T.primary,   label: "Healthcare" },
              { icon: "account_balance",  color: T.secondary, label: "Finance"    },
              { icon: "shopping_bag",     color: T.tertiary,  label: "E-commerce" },
              { icon: "sports_esports",   color: T.primary,   label: "Gaming"     },
              { icon: "school",           color: T.secondary, label: "Education"  },
              { icon: "local_shipping",   color: T.tertiary,  label: "Logistics"  },
            ].map(({ icon, color, label }) => (
              <Item key={label}>
                <motion.div
                  className="p-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer"
                  style={{ background: T.surface }}
                  whileHover={{ background: T.surfaceHigh, y: -6, boxShadow: `0 12px 32px ${color}18` }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.span
                    className="mat"
                    style={{ color: T.onSurfaceVar, fontSize: 36 }}
                    whileHover={{ color, scale: 1.2, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {icon}
                  </motion.span>
                  <span className="font-label text-xs" style={{ color: T.onSurfaceVar }}>{label}</span>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ CONTACT FORM ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surface }}>
        <motion.div
          className="max-w-3xl mx-auto glass-light p-12 rounded-2xl relative overflow-hidden"
          style={{ border: `1px solid ${T.outline}22`, boxShadow: "0 32px 80px rgba(103,80,164,0.08)" }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${T.primary}08 0%, transparent 70%)`, filter: "blur(60px)" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <FadeUp className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold mb-4">Start Your Ascension</h2>
            <p style={{ color: T.onSurfaceVar }}>Tell us about your project and let's manifest your vision.</p>
          </FadeUp>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { id: "name",  label: "Full Name",      type: "text"  },
                { id: "email", label: "Email Address",  type: "email" },
              ].map(({ id, label, type }) => (
                <motion.div
                  key={id} className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: T.onSurfaceVar }}>
                    {label}
                  </label>
                  <motion.input
                    id={id} type={type}
                    className="w-full px-4 py-3 outline-none transition-all rounded-none"
                    style={{ background: `${T.surfaceLow}`, borderBottom: `2px solid ${T.outline}`, color: T.onSurface }}
                    whileFocus={{ borderBottomColor: T.primary, boxShadow: `0 2px 0 0 ${T.primary}` }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: T.onSurfaceVar }}>
                Project Details
              </label>
              <motion.textarea
                rows={4}
                className="w-full px-4 py-3 outline-none transition-all rounded-none resize-none"
                style={{ background: `${T.surfaceLow}`, borderBottom: `2px solid ${T.outline}`, color: T.onSurface }}
                whileFocus={{ borderBottomColor: T.primary }}
              />
            </motion.div>

            <motion.button
              className="shimmer-btn relative overflow-hidden w-full font-label font-bold py-5 rounded-md uppercase tracking-widest text-sm cursor-pointer"
              style={{ background: T.primary, color: T.onPrimary, boxShadow: `0 8px 32px ${T.primary}33` }}
              whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${T.primary}44` }}
              whileTap={{ scale: 0.97 }}
            >
              Initiate Development
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
=======
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

/* ══════════════════════════════════════════
   DESIGN TOKENS  (light-mode palette)
══════════════════════════════════════════ */
const T = {
  primary:       "#6750A4",   // indigo-violet
  primaryCont:   "#EADDFF",
  onPrimary:     "#FFFFFF",
  secondary:     "#625B71",
  tertiary:      "#7D5260",
  surface:       "#FFFBFE",
  surfaceLow:    "#F7F2FA",
  surfaceHigh:   "#ECE6F0",
  surfaceHighest:"#E6E0E9",
  outline:       "#CAC4D0",
  onSurface:     "#1C1B1F",
  onSurfaceVar:  "#49454F",
  background:    "#FFFBFE",
};

/* ══════════════════════════════════════════
   REUSABLE ANIMATION HELPERS
══════════════════════════════════════════ */

/** Fade + slide up on scroll into view */
const FadeUp = ({ children, delay = 0, className = "", amount = 0.25 }:any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Staggered children wrapper */
const Stagger = ({ children, className = "", stagger = 0.1, delay = 0, amount = 0.15 }:any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } }, hidden: {} }}
    >
      {children}
    </motion.div>
  );
};
const Item = ({ children, className = "" }:any) => (
  <motion.div
    className={className}
    variants={{
      hidden:  { opacity: 0, y: 40, scale: 0.95 },
      visible: { opacity: 1, y: 0,  scale: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

/** Magnetic hover button */
const Magnetic = ({ children, className, style }:any) => {
  const ref:any = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const move = (e:any) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top  - r.height/ 2) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref} className={className} style={{ ...style, x: sx, y: sy }}
      onMouseMove={move} onMouseLeave={leave} whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
};

/** Kinetic floating blob */
const Blob = ({ className }:any) => (
  <motion.div
    className={className}
    animate={{ x: [0, 20, -12, 0], y: [0, -16, 12, 0], scale: [1, 1.06, 0.97, 1] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function MobileServicePage() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <div style={{ background: T.background, color: T.onSurface, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .mat { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; display:inline-block; }
        .glass-light {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .font-headline { font-family: 'Playfair Display', serif; }
        .font-label    { font-family: 'DM Sans', sans-serif; letter-spacing: 0.05em; }
        .shimmer-btn::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.4) 50%,transparent 60%);
          transform: translateX(-100%); transition: transform 0.5s ease;
        }
        .shimmer-btn:hover::after { transform: translateX(100%); }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${T.surfaceLow} 0%, ${T.surface} 60%, #EAE4F5 100%)` }}>

        {/* Kinetic blobs */}
        <Blob className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${T.primary}22 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <Blob className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${T.secondary}1A 0%, transparent 70%)`, filter: "blur(60px)" }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div style={{ y: heroParallax, opacity: heroOpacity }}>
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "backOut" }}
            >
              <motion.span
                className="flex h-2 w-2 rounded-full"
                style={{ background: T.tertiary }}
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-label text-xs tracking-[0.2em] uppercase" style={{ color: T.tertiary }}>
                Divine Innovation in Mobility
              </span>
            </motion.div>

            {/* Headline — word pop-in */}
            <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
              {["Build", "Powerful", "Mobile", "Apps", "for", "the", "Future"].map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  style={{ background: `linear-gradient(135deg, ${T.onSurface}, ${T.primary})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  initial={{ opacity: 0, y: 50, rotateX: -35 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: T.onSurfaceVar }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Morphos IT crafts heavenly digital experiences. We transmute complex ideas into fluid, high-performance mobile applications that redefine user expectations.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
            >
              <Magnetic
                className="shimmer-btn relative overflow-hidden px-8 py-4 font-label text-sm font-bold rounded-md flex items-center gap-2 cursor-pointer"
                style={{ background: T.primaryCont, color: T.primary }}
              >
                Get Started <span className="mat">arrow_forward</span>
              </Magnetic>
              <Magnetic
                className="px-8 py-4 font-label text-sm font-bold rounded-md glass-light border cursor-pointer"
                style={{ borderColor: `${T.outline}55`, color: T.onSurface }}
              >
                View Portfolio
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right image stack */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: `radial-gradient(circle, ${T.surfaceHigh} 0%, transparent 70%)`, filter: "blur(60px)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="grid grid-cols-2 gap-6 relative">
              <motion.div
                className="translate-y-12"
                initial={{ opacity: 0, x: -40, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: -1 }}
              >
                <img className="rounded-xl shadow-2xl w-full" alt="Futuristic mobile app UI"
                  style={{ border: `1px solid ${T.outline}33` }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpBMuo6KkmOKkUWY5bBvSzyFgtGajL5CxVx7epP6VvJd659DGJTo-6F3259CkcHq1oIRNbZB8C7_XKT9ELSi3V8vGZgodfKv4gnqr5XcjT1Ob_PeRztcebpk_brcgt2pHQ1832qw08TNpVBssleZtnHjrdDYVlgNEey2hg8pmhZjF0WyDIdEzTdyArIQw3IxxNr8eb2IloF4RV08ozcvgLLtuupBLyKMttHisjYY1HdrDolTlA-UwkKXgKhm0Kzt_Dr6D6-X9OzvU" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: 1 }}
              >
                <img className="rounded-xl shadow-2xl w-full" alt="iOS interface with glowing accents"
                  style={{ border: `1px solid ${T.outline}33` }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8PI7whnSX71ii-rUdi-1BKWTZlOsj_H_Xj1SPxluRjhGdm8Gb10Cz1ZdTyzfNVldzV4ytGrWT3_sseB251r2fKz-5wb9pl7EPzWat98HRpafgVV_cnxGP7hS0fodC2A9y6m39-xBemGW16NNk2Uex-qAj6yS0ekJgOQgzSLKsxCK1iKY0_ZoBC2FfH46pbEMRLsv5z0KuAtLjCpDyQr1pYbHLZq_lO6XERu4OPluvUwDkD3muxDQGJf-gxvQrDTTN51Sambf1Wxw" />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ SERVICES BENTO GRID ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-16">
            <span className="font-label text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: T.primary }}>
              Our Expertise
            </span>
            <h2 className="font-headline text-4xl font-bold">App Development Categories</h2>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {[
              { icon: "phone_iphone", color: T.primary,    hover: `${T.primary}44`,    title: "iOS Development",    desc: "Native Swift applications built for the elite Apple ecosystem, focusing on premium performance and elegance." },
              { icon: "robot",        color: T.secondary,  hover: `${T.secondary}44`,  title: "Android Solutions",  desc: "Scalable Kotlin-based apps designed for global reach across the diverse Android hardware landscape." },
              { icon: "layers",       color: T.tertiary,   hover: `${T.tertiary}44`,   title: "Cross-Platform",     desc: "Single codebase brilliance using Flutter and React Native to reach all users simultaneously with high fidelity." },
              { icon: "terminal",     color: T.primary,    hover: `${T.primary}44`,    title: "Custom SDKs",        desc: "Modular tools built for developers to extend your platform's capabilities across any third-party app." },
              { icon: "cloud",        color: T.secondary,  hover: `${T.secondary}44`,  title: "Cloud Integration",  desc: "Backend synchronization that keeps your mobile experience alive and persistent across all devices." },
              { icon: "monitoring",   color: T.tertiary,   hover: `${T.tertiary}44`,   title: "Analytics & Growth", desc: "Data-driven insights baked into the core of your app to monitor performance and user retention." },
            ].map(({ icon, color, hover, title, desc }) => (
              <Item key={title}>
                <motion.div
                  className="glass-light p-8 rounded-xl cursor-pointer h-full"
                  style={{ border: `1px solid ${T.outline}22` }}
                  whileHover={{ borderColor: hover, y: -6, boxShadow: `0 20px 48px ${color}18` }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.span
                    className="mat block mb-6 text-3xl"
                    style={{ color, fontSize: 32 }}
                    whileHover={{ rotateY: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {icon}
                  </motion.span>
                  <h3 className="font-headline text-xl font-bold mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.onSurfaceVar }}>{desc}</p>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ TECH STACK ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: T.surface }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-headline text-3xl font-bold mb-16">The Engine of Innovation</h2>
          </FadeUp>

          <Stagger
            className="flex flex-wrap justify-center gap-12"
            stagger={0.12}
          >
            {[
              { icon: "flutter_dash",             color: T.primary,   label: "Flutter"       },
              { icon: "code_blocks",              color: T.secondary, label: "React Native"  },
              { icon: "terminal",                 color: T.primary,   label: "Swift"         },
              { icon: "integration_instructions", color: T.tertiary,  label: "Kotlin"        },
            ].map(({ icon, color, label }) => (
              <Item key={label}>
                <motion.div
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.15, filter: "grayscale(0)" }}
                  initial={{ filter: "grayscale(0.6)" }}
                  style={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: T.surfaceHigh }}
                    whileHover={{ background: `${color}18`, boxShadow: `0 8px 32px ${color}33` }}
                  >
                    <span className="mat" style={{ color, fontSize: 28 }}>{icon}</span>
                  </motion.div>
                  <span className="font-label text-xs" style={{ color: T.onSurfaceVar }}>{label}</span>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ PROCESS TIMELINE ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] uppercase block mb-4" style={{ color: T.secondary }}>
              Our Method
            </span>
            <h2 className="font-headline text-4xl font-bold">Divine Workflow</h2>
          </FadeUp>

          <div className="relative">
            {/* Animated progress line */}
            <div className="hidden lg:block absolute top-6 left-0 w-full h-0.5"
              style={{ background: `linear-gradient(to right, ${T.primary}22, ${T.secondary}22, ${T.tertiary}22)` }}>
              <motion.div
                className="h-full"
                style={{ background: `linear-gradient(to right, ${T.primary}, ${T.secondary}, ${T.tertiary})` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            <Stagger className="grid lg:grid-cols-6 gap-8 relative z-10" stagger={0.14} delay={0.2}>
              {[
                { n: "01", c: T.primary,   title: "Idea",    desc: "Conceptualization and strategic visioning." },
                { n: "02", c: T.secondary, title: "UI/UX",   desc: "Architecture of ethereal user journeys." },
                { n: "03", c: T.tertiary,  title: "Dev",     desc: "Kinetic coding and system engineering." },
                { n: "04", c: T.primary,   title: "Test",    desc: "Rigorous quality assurance audits." },
                { n: "05", c: T.secondary, title: "Deploy",  desc: "Seamless launch to global markets." },
                { n: "06", c: T.tertiary,  title: "Support", desc: "Continuous evolutionary maintenance." },
              ].map(({ n, c, title, desc }) => (
                <Item key={n}>
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: T.surface, border: `2px solid ${c}`, boxShadow: `0 0 0 0px ${c}33` }}
                      whileInView={{ scale: [0.5, 1.12, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, ease: "backOut" }}
                      whileHover={{ boxShadow: `0 0 0 6px ${c}22`, scale: 1.12 }}
                    >
                      <span className="font-headline font-bold text-sm" style={{ color: c }}>{n}</span>
                    </motion.div>
                    <h4 className="font-headline font-bold mb-2">{title}</h4>
                    <p className="text-xs" style={{ color: T.onSurfaceVar }}>{desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ═══════════ MORPHOS EDGE + PORTFOLIO ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surface }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          {/* Left — Why us */}
          <div>
            <FadeUp>
              <h2 className="font-headline text-4xl font-bold mb-12">The Morphos Edge</h2>
            </FadeUp>
            <Stagger className="space-y-6" stagger={0.13} delay={0.1}>
              {[
                { icon: "shield", color: T.primary,   bg: `${T.primary}12`,   title: "Ironclad Security",     desc: "Military-grade encryption and secure data handling protocols for every enterprise application." },
                { icon: "bolt",   color: T.secondary, bg: `${T.secondary}12`, title: "Peak Performance",      desc: "Optimized codebases that deliver lightning-fast response times and smooth frame rates." },
                { icon: "hub",    color: T.tertiary,  bg: `${T.tertiary}12`,  title: "Scalable Architecture", desc: "Future-proof designs built to handle 100 to 100 million users without friction." },
              ].map(({ icon, color, bg, title, desc }) => (
                <Item key={title}>
                  <motion.div
                    className="flex gap-6 p-6 rounded-lg"
                    style={{ background: `${T.surfaceHigh}60`, border: `1px solid ${T.outline}18` }}
                    whileHover={{ x: 6, background: `${T.surfaceLow}`, borderColor: `${color}44`, boxShadow: `0 8px 32px ${color}12` }}
                    transition={{ type: "spring", stiffness: 280 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center"
                      style={{ background: bg }}
                      whileHover={{ rotate: -8, scale: 1.15 }}
                    >
                      <span className="mat" style={{ color, fontSize: 22 }}>{icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-headline font-bold mb-2">{title}</h4>
                      <p className="text-sm" style={{ color: T.onSurfaceVar }}>{desc}</p>
                    </div>
                  </motion.div>
                </Item>
              ))}
            </Stagger>
          </div>

          {/* Right — portfolio grid */}
          <Stagger className="grid grid-cols-2 gap-4" stagger={0.12}>
            <div className="pt-12 space-y-4">
              {[
                { alt: "Healthcare app", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaB_-zI0rTM63loP2bf2tQ-lBcOtr1LYh7jp_HGC_1mZh0spr66dP4cj-c-os43MX6ALgRv4IpXxHL3O0LrOraCZEdru_sz7YQH2QVpD3JlzoAUGkMQ-HOGNhWbrSsS_t-rB1ihUPuIHziAJLXzuZMzcUlY1EfdICM_oltMiAs8WHE-tkfKAToT7tXsKcemG8DJuV2Eg6yaA4EGIFcxTcN4hXUGKoF-2XsgOEKWomxSKlHRvq44KZ2nssvKxnRRv93jrd5Zh-KO6k" },
                { alt: "Finance dashboard", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMta-77gL9wUwabV4PhQCSYx44AGHsnBCuwOrIEQit4YeHZHu09ZR8RcUtx8P8nvUNdFh8_CJr7U68rvHDr8PERE_rxkoKEOVuP9b1Pz8yfjxfrGwo1XKGcVlMEmyok2bDOaRLbUG_SMRIVXt7PuJSVjcfQY8bmlvnol8NLLEYeNekAJAHF-_u9rxFBJ7SLbcS9qlEA4ARzL4WaeJ6xlF9yqrGiG4eIZglYSqp-W-lYoXXWv6u9ru7zyLVe0ShlOctYgtKTBtqn-4" },
              ].map(({ alt, src }) => (
                <Item key={alt}>
                  <motion.img
                    className="rounded-xl shadow-xl w-full"
                    style={{ border: `1px solid ${T.outline}22` }}
                    alt={alt} src={src}
                    whileHover={{ scale: 1.04, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                </Item>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { alt: "E-commerce UI", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXVaSMU51DCiw0d5vRcc7O21CeujPrXqLLlEGHrgLb0aU1BJSMyBpCGBkVudeD1IzxOIzvqd-ywnJcPxvYtgj2WaEavLJ-V-H9PyeJ7Dy9KvuFKKfXvdtnMT3_CA_nSkS2yQ10IasAswiGO_U-ERh_hUOFTMixXmZ33xR8fcy7-skOHAjRxaN2gdp_7cMxbwLRJDqMvDZSsVULvrNu3kKscjTLGASWh2jEJcp8kRbOKi56RW42gHZJ6MqaXpE4RgmQOKJPPoHYj74" },
                { alt: "Analytics mobile UI", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr5hyT8LOJE7upY7PVD58r81rPXwmjNN1Hi8UjicqFz3rp0NVx7rET1fl7zliE7EbUeqolOLfZl_jn9em2gTeyBahvV0BV2b5IoOhyhO5y0--QUGxPfGcm81yKe42geyj2Tlnt6KUnrb2I3OOaduh-js_dfQ3GKFAR7AQedIJuT3-sPZpL3v-8t9WEjp5mrct95lPFN2PSeFvCL8cXEGsFaKt1sm-MEw360_FjtD31J4orzUKuqvBZBzAG5KYMBUgvGYSI9qiEftc" },
              ].map(({ alt, src }) => (
                <Item key={alt}>
                  <motion.img
                    className="rounded-xl shadow-xl w-full"
                    style={{ border: `1px solid ${T.outline}22` }}
                    alt={alt} src={src}
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                </Item>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* ═══════════ INDUSTRIES ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surfaceLow }}>
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-headline text-3xl font-bold mb-16">Global Impact Across Industries</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" stagger={0.08}>
            {[
              { icon: "medical_services", color: T.primary,   label: "Healthcare" },
              { icon: "account_balance",  color: T.secondary, label: "Finance"    },
              { icon: "shopping_bag",     color: T.tertiary,  label: "E-commerce" },
              { icon: "sports_esports",   color: T.primary,   label: "Gaming"     },
              { icon: "school",           color: T.secondary, label: "Education"  },
              { icon: "local_shipping",   color: T.tertiary,  label: "Logistics"  },
            ].map(({ icon, color, label }) => (
              <Item key={label}>
                <motion.div
                  className="p-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer"
                  style={{ background: T.surface }}
                  whileHover={{ background: T.surfaceHigh, y: -6, boxShadow: `0 12px 32px ${color}18` }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.span
                    className="mat"
                    style={{ color: T.onSurfaceVar, fontSize: 36 }}
                    whileHover={{ color, scale: 1.2, rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {icon}
                  </motion.span>
                  <span className="font-label text-xs" style={{ color: T.onSurfaceVar }}>{label}</span>
                </motion.div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ CONTACT FORM ═══════════ */}
      <section className="py-24 px-6" style={{ background: T.surface }}>
        <motion.div
          className="max-w-3xl mx-auto glass-light p-12 rounded-2xl relative overflow-hidden"
          style={{ border: `1px solid ${T.outline}22`, boxShadow: "0 32px 80px rgba(103,80,164,0.08)" }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${T.primary}08 0%, transparent 70%)`, filter: "blur(60px)" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <FadeUp className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold mb-4">Start Your Ascension</h2>
            <p style={{ color: T.onSurfaceVar }}>Tell us about your project and let's manifest your vision.</p>
          </FadeUp>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { id: "name",  label: "Full Name",      type: "text"  },
                { id: "email", label: "Email Address",  type: "email" },
              ].map(({ id, label, type }) => (
                <motion.div
                  key={id} className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: T.onSurfaceVar }}>
                    {label}
                  </label>
                  <motion.input
                    id={id} type={type}
                    className="w-full px-4 py-3 outline-none transition-all rounded-none"
                    style={{ background: `${T.surfaceLow}`, borderBottom: `2px solid ${T.outline}`, color: T.onSurface }}
                    whileFocus={{ borderBottomColor: T.primary, boxShadow: `0 2px 0 0 ${T.primary}` }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: T.onSurfaceVar }}>
                Project Details
              </label>
              <motion.textarea
                rows={4}
                className="w-full px-4 py-3 outline-none transition-all rounded-none resize-none"
                style={{ background: `${T.surfaceLow}`, borderBottom: `2px solid ${T.outline}`, color: T.onSurface }}
                whileFocus={{ borderBottomColor: T.primary }}
              />
            </motion.div>

            <motion.button
              className="shimmer-btn relative overflow-hidden w-full font-label font-bold py-5 rounded-md uppercase tracking-widest text-sm cursor-pointer"
              style={{ background: T.primary, color: T.onPrimary, boxShadow: `0 8px 32px ${T.primary}33` }}
              whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${T.primary}44` }}
              whileTap={{ scale: 0.97 }}
            >
              Initiate Development
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
}