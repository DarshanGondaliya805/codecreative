<<<<<<< HEAD
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn:any = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedSection({ children, className = "" }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} style={{ position: "relative", paddingTop: 140, paddingBottom: 120, background: "#fffbf8", overflow: "hidden" }}>
      {/* BG glow */}
      <motion.div style={{ y, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -80, right: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,97,27,0.13) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,181,153,0.15) 0%,transparent 70%)" }} />
      </motion.div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
        {/* Left */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.08)", border: "1px solid rgba(245,97,27,0.2)", marginBottom: 24 }}>
            <motion.span animate={{ scale: [1,1.4,1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5611b", display: "block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#f5611b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Architecture Reinvented</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", fontWeight: 800, color: "#1c0d05", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Robust Backend Development for{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ background: "linear-gradient(90deg,#f5611b,#ff8c5a,#f5611b)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
              Scalable
            </motion.span>{" "}Applications
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ fontSize: 17, color: "#7a5a48", maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
            We engineer high-performance server-side architectures that handle millions of requests with zero latency. Future-proof your infrastructure with Neural Amber.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(245,97,27,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "16px 32px", borderRadius: 16, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(245,97,27,0.3)" }}>
              Consult Our Architects
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, background: "rgba(245,97,27,0.06)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(245,97,27,0.04)", color: "#2d1a0e", padding: "16px 32px", borderRadius: 16, fontWeight: 600, fontSize: 15, border: "1.5px solid rgba(245,97,27,0.2)", cursor: "pointer" }}>
              View Case Studies
            </motion.button>
          </motion.div>
        </div>

        {/* Right image card */}
        <motion.div variants={scaleIn} custom={2} initial="hidden" animate="visible">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: 32, background: "rgba(255,181,153,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.18)", padding: 28, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmlAn0LjsRlRVqx2hLcAovNJ4_F-tu77Odg9I_bl-2EH1B2OtkABEXNct7QdPuQXA4t8kp7r6EHwuvJxLtxeWS9RenF89oSWQL8-pmPxGo5IrgC0y2tRZPVhsC9BZdMK33Zcv6G9MYfnJymmmi21RtxEHTV8xGuTQhzf0CfaSOtzWI8T-vJCtbQxbSQa6pFcuB2wdEiypiov5UmZCCM1arkDRO3KUCUCJw0XiNMJliBZKl4Wi7iTeJ0afmwT4tRCyh3HkMWQpLkfg"
              alt="Server Architecture"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20, opacity: 0.75, mixBlendMode: "multiply" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #fffbf8 5%, transparent)" }} />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: "absolute", top: "20%", left: "20%", width: 100, height: 100, borderRadius: "50%", background: "rgba(245,97,27,0.25)", filter: "blur(30px)" }} />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              style={{ position: "absolute", bottom: "25%", right: "20%", width: 128, height: 128, borderRadius: "50%", background: "rgba(158,202,255,0.3)", filter: "blur(30px)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const cards = [
    { icon: "api", title: "REST & GraphQL", desc: "Efficient, documented, and type-safe API layers for modern frontends.", color: "#1b95f1" },
    { icon: "database", title: "DB Optimization", desc: "Indexing, query optimization, and sharding strategies for high throughput.", color: "#f5611b" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Core Infrastructure Services</h2>
            <motion.div animate={{ width: ["0%","100%"] }} transition={{ duration: 1, delay: 0.3 }}
              style={{ height: 4, width: 80, background: "linear-gradient(90deg,#ffb599,#f5611b)", borderRadius: 9999, marginBottom: 56 }} />
          </motion.div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }} className="services-grid">
          {/* Large card */}
          <AnimatedSection>
            <motion.div variants={fadeUp} custom={0} whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(245,97,27,0.12)" }}
              style={{ background: "rgba(255,181,153,0.18)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.2)", borderRadius: 32, padding: 40, display: "flex", flexDirection: "column", height: "100%", transition: "box-shadow 0.3s" }}>
              <motion.span initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="material-symbols-outlined" style={{ fontSize: 40, color: "#f5611b", marginBottom: 20 }}>hub</motion.span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#1c0d05", marginBottom: 16 }}>Microservices Architecture</h3>
              <p style={{ color: "#7a5a48", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Decouple your monolith and scale specific components independently with our orchestrated microservices approach.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: "auto", flexWrap: "wrap" }}>
                {["Docker","Kubernetes","gRPC"].map((tag, i) => (
                  <motion.span key={tag} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.08)", fontSize: 12, fontWeight: 600, color: "#c04a0e", border: "1px solid rgba(245,97,27,0.15)" }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Small cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {cards.map((c, i) => (
              <AnimatedSection key={c.title}>
                <motion.div variants={fadeUp} custom={i + 1} whileHover={{ y: -5, borderColor: "rgba(245,97,27,0.4)" }}
                  style={{ background: "#fff", borderRadius: 28, padding: 32, border: "1.5px solid rgba(245,97,27,0.1)", flex: 1, transition: "border-color 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 30, color: c.color, display: "block", marginBottom: 16 }}>{c.icon}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#1c0d05", marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: "#7a5a48", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Security card */}
          <AnimatedSection className="col-span-2">
            <motion.div variants={fadeUp} custom={3} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(245,97,27,0.1)" }}
              style={{ gridColumn: "1/-1", background: "#fff8f5", borderRadius: 28, padding: 40, display: "flex", alignItems: "center", gap: 40, border: "1.5px solid rgba(245,97,27,0.1)" }}>
              <div style={{ flex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#f5611b", display: "block", marginBottom: 16 }}>security</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1c0d05", marginBottom: 12 }}>Encryption & Security</h3>
                <p style={{ color: "#7a5a48", lineHeight: 1.7 }}>Enterprise-grade authentication, JWT handling, and end-to-end data encryption protocols.</p>
              </div>
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "28%", aspectRatio: "16/9", borderRadius: 16, background: "rgba(245,97,27,0.06)", border: "1.5px solid rgba(245,97,27,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 52, color: "rgba(245,97,27,0.3)" }}>lock</span>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
function TechStack() {
  const techs = [
    { name: "Node.js", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHSjJf7mdwUpH9RXM7UwUNVBnbMDRf7a-3XJoF0SgFERvTIrqEsWqezIALY-s0C1qKeaknUFmbchoARr59XqW9beSFJK-8wUwJDfD9QlZbuzY4zr4vMTVep6B134VkHhe9TB0aBMoV0zbeG4018mT2MnV5i5ImtheJB8RSCVKrb2IizEHRRtuiqFYhamshOQ5wLeUQf4JZCmC9N9I6iB36msnEQELsh0JDwaKrltxYhtYq2LKeHdfpHsb3_FrMJLGPjTmpNgaWXVM" },
    { name: "Python", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkctDA9vFHdoJ6FR0F4BGJ9VxHS8W05GsPpmaCPzHOHJ0hJt9vtp-BoNFLej82nHcKIS7623xI6r2gqVw_ngAvAGI_SqKlqdNQ1CgLRIUyaD_tQ5o9cuUqfepFpMk6KYMDxkmPwzrVHJL-JknJ1d3WLQWEON6BBRUgcPJ0PSoLOkwvKCXOLCXerlvc9_RBfzcUO24pLkDKOzJtEaLyIDAcZZ_ext2bTVBaj3xQegjfheMLPdRvf5BST3z9gua2vt1ojs4JcPZYbrc" },
    { name: "Golang", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQsRuyETYXRdcVBjN2r4XhHqK2-jpoVka7_eeI_qWzeM37AOPP77tmnP0MODdxOAudnDbwoh3sB4S2nmz7VUieykod0-KYUprtDH1uRh0q9J7y_bSCOefajvohh3SPhjawTI1NI2Vco4PYN7Zm_HiPhketblvDJIm4wYPTmDVFUnFH4yoh0BW022RE4XM8cO6y__A0a6zfpaqaae-VAFUxu-u4V2D0J-MSic-F58rj-nHPOFvGLXNXplm9jOSTWP_oBtXUS6kSiaw" },
    { name: "Laravel", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3CIl9ULAz6xpnvHC35BGS6xGqwdURx7dDrjkBn5yCdckJmKfBEThLU8uJSE0k0f1wFFvKxhaNvx30iopSRAFpxSNYy2IXfiO0uu8Esx4rZ3pIGkvbZ-TsHDuUgS1K91oGtFbjxmdly_Oi-SvoKnvAeyX7IU6358JsyuWBlDHe-y5FMpFV4gzuTgcqAj9NGlOBGRzn3TtwvvRDdP7ocDDhtVS79x2zOKsOZ_s6tpYOSnZifkDOTfEY2YnzBH9V5ee0yuJnKYvnZps" },
    { name: "Rust", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZU35hvhA4B-MNyAK_spLiJBMqDhNMLZ2WdeEwHyQAVdFzQJL75SacYix0ooTsYr0Pi95TpGOk1dPN9E_R3llMJNPl7WF0PL9Sv3jeZLA7iudxiWdsV3rSCouz-YTatNFpjTZc4MXUnfBYaEPeUqPUtDxpigwBVAD5NpZGgLZ7c_9Ym1_t0UNpQDtniosDRbASGeEAgcG82f40x0DSqdh1E9kH98i-CNGwjLf_KPdmtYiKTqsn2c7WuHTjpmsJsxtJH0eyN_CVUc" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Engineered with Precision</h2>
            <p style={{ color: "#7a5a48", fontSize: 16, marginBottom: 60 }}>Our polyglot stack ensures the right tool for every challenge.</p>
          </motion.div>
        </AnimatedSection>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, maxWidth: 860, margin: "0 auto" }}>
          {techs.map((t, i) => (
            <AnimatedSection key={t.name}>
              <motion.div variants={scaleIn} custom={i}
                whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(245,97,27,0.15)", borderColor: "rgba(245,97,27,0.35)" }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, background: "rgba(255,181,153,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.15)", padding: "24px 20px", borderRadius: 20, width: 112, cursor: "pointer", transition: "border-color 0.3s" }}>
                <motion.img src={t.src} alt={t.name} style={{ width: 48, height: 48 }} whileHover={{ rotate: 10 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#7a5a48" }}>{t.name}</span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture ─────────────────────────────────────────────────────────────
function Architecture() {
  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="arch-grid">
        {/* Diagram */}
        <AnimatedSection>
          <motion.div variants={fadeIn} style={{ position: "relative", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Client */}
            <motion.div
              initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(255,181,153,0.2)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.25)", borderRadius: 16, padding: "18px 28px", textAlign: "center", zIndex: 20 }}>
              <span className="material-symbols-outlined" style={{ color: "#f5611b", display: "block", marginBottom: 4 }}>devices</span>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d1a0e" }}>Client Tier</div>
            </motion.div>

            {/* Center node */}
            <motion.div
              animate={{ boxShadow: ["0 0 30px rgba(245,97,27,0.3)","0 0 60px rgba(245,97,27,0.6)","0 0 30px rgba(245,97,27,0.3)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "linear-gradient(135deg,#ffb599,#f5611b)", borderRadius: "50%", padding: 28, zIndex: 30 }}>
              <span className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 40 }}>dns</span>
            </motion.div>

            {/* Data Store */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(158,202,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(27,149,241,0.3)", borderRadius: 16, padding: "18px 28px", textAlign: "center", zIndex: 20 }}>
              <span className="material-symbols-outlined" style={{ color: "#1b95f1", display: "block", marginBottom: 4 }}>storage</span>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d1a0e" }}>Data Store</div>
            </motion.div>

            {/* Lines */}
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ position: "absolute", top: "25%", left: "50%", width: 2, height: "25%", background: "linear-gradient(to bottom, #f5611b, transparent)", transform: "translateX(-50%)" }} />
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              style={{ position: "absolute", bottom: "25%", left: "50%", width: 2, height: "25%", background: "linear-gradient(to top, #1b95f1, transparent)", transform: "translateX(-50%)" }} />
          </motion.div>
        </AnimatedSection>

        {/* Text */}
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: "#1c0d05", marginBottom: 24, lineHeight: 1.15 }}>Flow-Driven Connectivity</h2>
            <p style={{ color: "#7a5a48", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>We design data flows that prioritize integrity and speed. From the edge to the database, every hop is audited and optimized for maximum reliability.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { title: "Automated Load Balancing", desc: "Elastic scaling based on real-time traffic demand." },
                { title: "Redundant Data Clusters", desc: "Zero downtime through master-replica synchronization." },
              ].map((item, i) => (
                <motion.li key={item.title} variants={fadeUp} custom={i + 2} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <motion.span whileHover={{ scale: 1.2, rotate: 10 }}
                    style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,97,27,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f5611b" }}>check_circle</span>
                  </motion.span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1c0d05", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#7a5a48" }}>{item.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Process Timeline ─────────────────────────────────────────────────────────
function ProcessTimeline() {
  const steps = ["Analysis","Architecture","API Dev","Database","Testing","Deployment"];
  const descriptions = [
    "Deep dive into requirements and logic.",
    "Schema design and system mapping.",
    "Constructing robust endpoints.",
    "Data modeling and persistence logic.",
    "Unit, integration, and stress tests.",
    "CI/CD pipeline and go-live.",
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05" }}>The Lifecycle of a Neural Backend</h2>
          </motion.div>
        </AnimatedSection>

        <div style={{ position: "relative" }}>
          {/* Line */}
          <AnimatedSection>
            <motion.div variants={fadeIn} style={{ position: "absolute", top: 28, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, rgba(245,97,27,0.1), rgba(245,97,27,0.3), rgba(245,97,27,0.1))" }} className="timeline-line" />
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 24, position: "relative" }} className="timeline-grid">
            {steps.map((step, i) => (
              <AnimatedSection key={step}>
                <motion.div variants={fadeUp} custom={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <motion.div
                    whileHover={{ scale: 1.15, background: "linear-gradient(135deg,#ffb599,#f5611b)", borderColor: "#f5611b" }}
                    style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#ffb599,#f5611b)" : "#fff", border: `2px solid ${i === 0 ? "#f5611b" : "rgba(245,97,27,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative", zIndex: 10, transition: "all 0.3s", boxShadow: i === 0 ? "0 8px 24px rgba(245,97,27,0.3)" : "none" }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color: i === 0 ? "#370e00" : "#a0705a" }}>
                      {String(i + 1).padStart(2,"0")}
                    </span>
                  </motion.div>
                  <h4 style={{ fontWeight: 700, fontSize: 14, color: "#1c0d05", marginBottom: 6 }}>{step}</h4>
                  <p style={{ fontSize: 11, color: "#a0705a", lineHeight: 1.5 }}>{descriptions[i]}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUs() {
  const cards = [
    { icon: "bolt", title: "Elite Performance", desc: "We don't just write code; we optimize execution cycles. Expect sub-50ms response times globally.", accent: "#f5611b" },
    { icon: "verified_user", title: "Security First", desc: "SOC2-ready backend implementations with rigorous penetration testing and audit logs.", accent: "#1b95f1" },
    { icon: "dynamic_feed", title: "Infinite Scalability", desc: "Cloud-native designs that breathe with your user base, from startup to enterprise scale.", accent: "#ffb599" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="why-grid">
          {cards.map((c, i) => (
            <AnimatedSection key={c.title}>
              <motion.div variants={fadeUp} custom={i}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${c.accent}22` }}
                style={{ background: "#fff", padding: 40, borderRadius: 40, borderTop: `4px solid ${c.accent}`, transition: "box-shadow 0.3s" }}>
                <motion.span whileHover={{ scale: 1.2, rotate: 5 }}
                  className="material-symbols-outlined" style={{ fontSize: 40, color: c.accent, display: "block", marginBottom: 20 }}>
                  {c.icon}
                </motion.span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#1c0d05", marginBottom: 12 }}>{c.title}</h3>
                <p style={{ color: "#7a5a48", lineHeight: 1.7, fontSize: 14 }}>{c.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const inputStyle:any = {
    width: "100%", background: "#fff7f3", border: "1.5px solid rgba(245,97,27,0.15)", borderRadius: 14,
    padding: "14px 16px", color: "#1c0d05", fontSize: 14, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <AnimatedSection>
        <motion.div variants={scaleIn}
          style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", padding: "60px 56px", borderRadius: 48, border: "1.5px solid rgba(245,97,27,0.12)", boxShadow: "0 24px 64px rgba(245,97,27,0.07)" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.3rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Launch Your Infrastructure</h2>
              <p style={{ color: "#7a5a48" }}>Tell us about your technical challenges.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-grid">
                {[["Full Name","John Doe","text"],["Work Email","john@company.com","email"]].map(([label, ph, type]) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>{label}</label>
                    <input type={type} placeholder={ph} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>Technical Requirement</label>
                <select style={inputStyle}>
                  {["Microservices Migration","API Design & Development","Database Optimization","Security Audit","Other Services"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>Project Details</label>
                <textarea rows={4} placeholder="Describe your current bottleneck..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(245,97,27,0.4)" }}
                whileTap={{ scale: 0.98 }}
                style={{ width: "100%", background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "18px", borderRadius: 16, fontWeight: 700, fontSize: 17, border: "none", cursor: "pointer" }}>
                Initialize Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={scaleIn}
            style={{ position: "relative", background: "rgba(255,181,153,0.2)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.2)", borderRadius: 48, padding: "80px 48px", textAlign: "center", overflow: "hidden" }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#ffb599,#f5611b)", filter: "blur(80px)", pointerEvents: "none" }} />
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#1c0d05", marginBottom: 20, position: "relative" }}>
              Ready to build the future?
            </h2>
            <p style={{ fontSize: 18, color: "#7a5a48", marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7, position: "relative" }}>
              Stop worrying about infrastructure and focus on your business. Let our architects handle the engine.
            </p>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 20px 48px rgba(245,97,27,0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{ background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "20px 48px", borderRadius: 20, fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer", position: "relative", boxShadow: "0 8px 32px rgba(245,97,27,0.35)" }}>
              Build My Backend
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function BackendDevelopment() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #fffbf8; }
        .col-span-2 { grid-column: 1 / -1 !important; }
        @media (max-width: 768px) {
          .hero-grid, .arch-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: repeat(2,1fr) !important; }
          .timeline-line { display: none !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .hidden-mobile { display: none !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Inter',sans-serif", background: "#fffbf8", color: "#1c0d05", overflowX: "hidden" }}>
        <Hero />
        <Services />
        <TechStack />
        <Architecture />
        <ProcessTimeline />
        <WhyUs />
        <ContactForm />
        <CTA />
      </div>
    </>
  );
=======
import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp:any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn:any = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const scaleIn:any = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedSection({ children, className = "" }:any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,251,248,0.85)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(245,97,27,0.12)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            style={{
              width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#ffb599,#f5611b)",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 18, fontVariationSettings: "'FILL' 1" }}>dataset</span>
          </motion.div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: "#2d1a0e", letterSpacing: "-0.02em" }}>Neural Amber</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden-mobile">
          {["Services","Technologies","Process","Contact"].map(l => (
            <motion.a key={l} href="#" whileHover={{ color: "#f5611b" }}
              style={{ fontSize: 14, fontWeight: 500, color: "#7a5a48", textDecoration: "none", transition: "color 0.2s" }}>
              {l}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(245,97,27,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00",
              padding: "10px 24px", borderRadius: 14, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
            }}>
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} style={{ position: "relative", paddingTop: 140, paddingBottom: 120, background: "#fffbf8", overflow: "hidden" }}>
      {/* BG glow */}
      <motion.div style={{ y, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -80, right: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,97,27,0.13) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,181,153,0.15) 0%,transparent 70%)" }} />
      </motion.div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
        {/* Left */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.08)", border: "1px solid rgba(245,97,27,0.2)", marginBottom: 24 }}>
            <motion.span animate={{ scale: [1,1.4,1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5611b", display: "block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#f5611b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Architecture Reinvented</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", fontWeight: 800, color: "#1c0d05", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Robust Backend Development for{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ background: "linear-gradient(90deg,#f5611b,#ff8c5a,#f5611b)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
              Scalable
            </motion.span>{" "}Applications
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ fontSize: 17, color: "#7a5a48", maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
            We engineer high-performance server-side architectures that handle millions of requests with zero latency. Future-proof your infrastructure with Neural Amber.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(245,97,27,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "16px 32px", borderRadius: 16, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(245,97,27,0.3)" }}>
              Consult Our Architects
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, background: "rgba(245,97,27,0.06)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(245,97,27,0.04)", color: "#2d1a0e", padding: "16px 32px", borderRadius: 16, fontWeight: 600, fontSize: 15, border: "1.5px solid rgba(245,97,27,0.2)", cursor: "pointer" }}>
              View Case Studies
            </motion.button>
          </motion.div>
        </div>

        {/* Right image card */}
        <motion.div variants={scaleIn} custom={2} initial="hidden" animate="visible">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: 32, background: "rgba(255,181,153,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.18)", padding: 28, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmlAn0LjsRlRVqx2hLcAovNJ4_F-tu77Odg9I_bl-2EH1B2OtkABEXNct7QdPuQXA4t8kp7r6EHwuvJxLtxeWS9RenF89oSWQL8-pmPxGo5IrgC0y2tRZPVhsC9BZdMK33Zcv6G9MYfnJymmmi21RtxEHTV8xGuTQhzf0CfaSOtzWI8T-vJCtbQxbSQa6pFcuB2wdEiypiov5UmZCCM1arkDRO3KUCUCJw0XiNMJliBZKl4Wi7iTeJ0afmwT4tRCyh3HkMWQpLkfg"
              alt="Server Architecture"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20, opacity: 0.75, mixBlendMode: "multiply" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #fffbf8 5%, transparent)" }} />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: "absolute", top: "20%", left: "20%", width: 100, height: 100, borderRadius: "50%", background: "rgba(245,97,27,0.25)", filter: "blur(30px)" }} />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              style={{ position: "absolute", bottom: "25%", right: "20%", width: 128, height: 128, borderRadius: "50%", background: "rgba(158,202,255,0.3)", filter: "blur(30px)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const cards = [
    { icon: "api", title: "REST & GraphQL", desc: "Efficient, documented, and type-safe API layers for modern frontends.", color: "#1b95f1" },
    { icon: "database", title: "DB Optimization", desc: "Indexing, query optimization, and sharding strategies for high throughput.", color: "#f5611b" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Core Infrastructure Services</h2>
            <motion.div animate={{ width: ["0%","100%"] }} transition={{ duration: 1, delay: 0.3 }}
              style={{ height: 4, width: 80, background: "linear-gradient(90deg,#ffb599,#f5611b)", borderRadius: 9999, marginBottom: 56 }} />
          </motion.div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }} className="services-grid">
          {/* Large card */}
          <AnimatedSection>
            <motion.div variants={fadeUp} custom={0} whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(245,97,27,0.12)" }}
              style={{ background: "rgba(255,181,153,0.18)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.2)", borderRadius: 32, padding: 40, display: "flex", flexDirection: "column", height: "100%", transition: "box-shadow 0.3s" }}>
              <motion.span initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="material-symbols-outlined" style={{ fontSize: 40, color: "#f5611b", marginBottom: 20 }}>hub</motion.span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#1c0d05", marginBottom: 16 }}>Microservices Architecture</h3>
              <p style={{ color: "#7a5a48", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                Decouple your monolith and scale specific components independently with our orchestrated microservices approach.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: "auto", flexWrap: "wrap" }}>
                {["Docker","Kubernetes","gRPC"].map((tag, i) => (
                  <motion.span key={tag} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ padding: "6px 16px", borderRadius: 9999, background: "rgba(245,97,27,0.08)", fontSize: 12, fontWeight: 600, color: "#c04a0e", border: "1px solid rgba(245,97,27,0.15)" }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Small cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {cards.map((c, i) => (
              <AnimatedSection key={c.title}>
                <motion.div variants={fadeUp} custom={i + 1} whileHover={{ y: -5, borderColor: "rgba(245,97,27,0.4)" }}
                  style={{ background: "#fff", borderRadius: 28, padding: 32, border: "1.5px solid rgba(245,97,27,0.1)", flex: 1, transition: "border-color 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 30, color: c.color, display: "block", marginBottom: 16 }}>{c.icon}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#1c0d05", marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: "#7a5a48", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Security card */}
          <AnimatedSection className="col-span-2">
            <motion.div variants={fadeUp} custom={3} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(245,97,27,0.1)" }}
              style={{ gridColumn: "1/-1", background: "#fff8f5", borderRadius: 28, padding: 40, display: "flex", alignItems: "center", gap: 40, border: "1.5px solid rgba(245,97,27,0.1)" }}>
              <div style={{ flex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#f5611b", display: "block", marginBottom: 16 }}>security</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1c0d05", marginBottom: 12 }}>Encryption & Security</h3>
                <p style={{ color: "#7a5a48", lineHeight: 1.7 }}>Enterprise-grade authentication, JWT handling, and end-to-end data encryption protocols.</p>
              </div>
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "28%", aspectRatio: "16/9", borderRadius: 16, background: "rgba(245,97,27,0.06)", border: "1.5px solid rgba(245,97,27,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 52, color: "rgba(245,97,27,0.3)" }}>lock</span>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
function TechStack() {
  const techs = [
    { name: "Node.js", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHSjJf7mdwUpH9RXM7UwUNVBnbMDRf7a-3XJoF0SgFERvTIrqEsWqezIALY-s0C1qKeaknUFmbchoARr59XqW9beSFJK-8wUwJDfD9QlZbuzY4zr4vMTVep6B134VkHhe9TB0aBMoV0zbeG4018mT2MnV5i5ImtheJB8RSCVKrb2IizEHRRtuiqFYhamshOQ5wLeUQf4JZCmC9N9I6iB36msnEQELsh0JDwaKrltxYhtYq2LKeHdfpHsb3_FrMJLGPjTmpNgaWXVM" },
    { name: "Python", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkctDA9vFHdoJ6FR0F4BGJ9VxHS8W05GsPpmaCPzHOHJ0hJt9vtp-BoNFLej82nHcKIS7623xI6r2gqVw_ngAvAGI_SqKlqdNQ1CgLRIUyaD_tQ5o9cuUqfepFpMk6KYMDxkmPwzrVHJL-JknJ1d3WLQWEON6BBRUgcPJ0PSoLOkwvKCXOLCXerlvc9_RBfzcUO24pLkDKOzJtEaLyIDAcZZ_ext2bTVBaj3xQegjfheMLPdRvf5BST3z9gua2vt1ojs4JcPZYbrc" },
    { name: "Golang", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQsRuyETYXRdcVBjN2r4XhHqK2-jpoVka7_eeI_qWzeM37AOPP77tmnP0MODdxOAudnDbwoh3sB4S2nmz7VUieykod0-KYUprtDH1uRh0q9J7y_bSCOefajvohh3SPhjawTI1NI2Vco4PYN7Zm_HiPhketblvDJIm4wYPTmDVFUnFH4yoh0BW022RE4XM8cO6y__A0a6zfpaqaae-VAFUxu-u4V2D0J-MSic-F58rj-nHPOFvGLXNXplm9jOSTWP_oBtXUS6kSiaw" },
    { name: "Laravel", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3CIl9ULAz6xpnvHC35BGS6xGqwdURx7dDrjkBn5yCdckJmKfBEThLU8uJSE0k0f1wFFvKxhaNvx30iopSRAFpxSNYy2IXfiO0uu8Esx4rZ3pIGkvbZ-TsHDuUgS1K91oGtFbjxmdly_Oi-SvoKnvAeyX7IU6358JsyuWBlDHe-y5FMpFV4gzuTgcqAj9NGlOBGRzn3TtwvvRDdP7ocDDhtVS79x2zOKsOZ_s6tpYOSnZifkDOTfEY2YnzBH9V5ee0yuJnKYvnZps" },
    { name: "Rust", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZU35hvhA4B-MNyAK_spLiJBMqDhNMLZ2WdeEwHyQAVdFzQJL75SacYix0ooTsYr0Pi95TpGOk1dPN9E_R3llMJNPl7WF0PL9Sv3jeZLA7iudxiWdsV3rSCouz-YTatNFpjTZc4MXUnfBYaEPeUqPUtDxpigwBVAD5NpZGgLZ7c_9Ym1_t0UNpQDtniosDRbASGeEAgcG82f40x0DSqdh1E9kH98i-CNGwjLf_KPdmtYiKTqsn2c7WuHTjpmsJsxtJH0eyN_CVUc" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Engineered with Precision</h2>
            <p style={{ color: "#7a5a48", fontSize: 16, marginBottom: 60 }}>Our polyglot stack ensures the right tool for every challenge.</p>
          </motion.div>
        </AnimatedSection>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, maxWidth: 860, margin: "0 auto" }}>
          {techs.map((t, i) => (
            <AnimatedSection key={t.name}>
              <motion.div variants={scaleIn} custom={i}
                whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(245,97,27,0.15)", borderColor: "rgba(245,97,27,0.35)" }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, background: "rgba(255,181,153,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.15)", padding: "24px 20px", borderRadius: 20, width: 112, cursor: "pointer", transition: "border-color 0.3s" }}>
                <motion.img src={t.src} alt={t.name} style={{ width: 48, height: 48 }} whileHover={{ rotate: 10 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#7a5a48" }}>{t.name}</span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture ─────────────────────────────────────────────────────────────
function Architecture() {
  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="arch-grid">
        {/* Diagram */}
        <AnimatedSection>
          <motion.div variants={fadeIn} style={{ position: "relative", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Client */}
            <motion.div
              initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(255,181,153,0.2)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.25)", borderRadius: 16, padding: "18px 28px", textAlign: "center", zIndex: 20 }}>
              <span className="material-symbols-outlined" style={{ color: "#f5611b", display: "block", marginBottom: 4 }}>devices</span>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d1a0e" }}>Client Tier</div>
            </motion.div>

            {/* Center node */}
            <motion.div
              animate={{ boxShadow: ["0 0 30px rgba(245,97,27,0.3)","0 0 60px rgba(245,97,27,0.6)","0 0 30px rgba(245,97,27,0.3)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "linear-gradient(135deg,#ffb599,#f5611b)", borderRadius: "50%", padding: 28, zIndex: 30 }}>
              <span className="material-symbols-outlined" style={{ color: "#370e00", fontSize: 40 }}>dns</span>
            </motion.div>

            {/* Data Store */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(158,202,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(27,149,241,0.3)", borderRadius: 16, padding: "18px 28px", textAlign: "center", zIndex: 20 }}>
              <span className="material-symbols-outlined" style={{ color: "#1b95f1", display: "block", marginBottom: 4 }}>storage</span>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2d1a0e" }}>Data Store</div>
            </motion.div>

            {/* Lines */}
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ position: "absolute", top: "25%", left: "50%", width: 2, height: "25%", background: "linear-gradient(to bottom, #f5611b, transparent)", transform: "translateX(-50%)" }} />
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              style={{ position: "absolute", bottom: "25%", left: "50%", width: 2, height: "25%", background: "linear-gradient(to top, #1b95f1, transparent)", transform: "translateX(-50%)" }} />
          </motion.div>
        </AnimatedSection>

        {/* Text */}
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: "#1c0d05", marginBottom: 24, lineHeight: 1.15 }}>Flow-Driven Connectivity</h2>
            <p style={{ color: "#7a5a48", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>We design data flows that prioritize integrity and speed. From the edge to the database, every hop is audited and optimized for maximum reliability.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { title: "Automated Load Balancing", desc: "Elastic scaling based on real-time traffic demand." },
                { title: "Redundant Data Clusters", desc: "Zero downtime through master-replica synchronization." },
              ].map((item, i) => (
                <motion.li key={item.title} variants={fadeUp} custom={i + 2} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <motion.span whileHover={{ scale: 1.2, rotate: 10 }}
                    style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,97,27,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f5611b" }}>check_circle</span>
                  </motion.span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1c0d05", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#7a5a48" }}>{item.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Process Timeline ─────────────────────────────────────────────────────────
function ProcessTimeline() {
  const steps = ["Analysis","Architecture","API Dev","Database","Testing","Deployment"];
  const descriptions = [
    "Deep dive into requirements and logic.",
    "Schema design and system mapping.",
    "Constructing robust endpoints.",
    "Data modeling and persistence logic.",
    "Unit, integration, and stress tests.",
    "CI/CD pipeline and go-live.",
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#1c0d05" }}>The Lifecycle of a Neural Backend</h2>
          </motion.div>
        </AnimatedSection>

        <div style={{ position: "relative" }}>
          {/* Line */}
          <AnimatedSection>
            <motion.div variants={fadeIn} style={{ position: "absolute", top: 28, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, rgba(245,97,27,0.1), rgba(245,97,27,0.3), rgba(245,97,27,0.1))" }} className="timeline-line" />
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 24, position: "relative" }} className="timeline-grid">
            {steps.map((step, i) => (
              <AnimatedSection key={step}>
                <motion.div variants={fadeUp} custom={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <motion.div
                    whileHover={{ scale: 1.15, background: "linear-gradient(135deg,#ffb599,#f5611b)", borderColor: "#f5611b" }}
                    style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#ffb599,#f5611b)" : "#fff", border: `2px solid ${i === 0 ? "#f5611b" : "rgba(245,97,27,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative", zIndex: 10, transition: "all 0.3s", boxShadow: i === 0 ? "0 8px 24px rgba(245,97,27,0.3)" : "none" }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color: i === 0 ? "#370e00" : "#a0705a" }}>
                      {String(i + 1).padStart(2,"0")}
                    </span>
                  </motion.div>
                  <h4 style={{ fontWeight: 700, fontSize: 14, color: "#1c0d05", marginBottom: 6 }}>{step}</h4>
                  <p style={{ fontSize: 11, color: "#a0705a", lineHeight: 1.5 }}>{descriptions[i]}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUs() {
  const cards = [
    { icon: "bolt", title: "Elite Performance", desc: "We don't just write code; we optimize execution cycles. Expect sub-50ms response times globally.", accent: "#f5611b" },
    { icon: "verified_user", title: "Security First", desc: "SOC2-ready backend implementations with rigorous penetration testing and audit logs.", accent: "#1b95f1" },
    { icon: "dynamic_feed", title: "Infinite Scalability", desc: "Cloud-native designs that breathe with your user base, from startup to enterprise scale.", accent: "#ffb599" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="why-grid">
          {cards.map((c, i) => (
            <AnimatedSection key={c.title}>
              <motion.div variants={fadeUp} custom={i}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${c.accent}22` }}
                style={{ background: "#fff", padding: 40, borderRadius: 40, borderTop: `4px solid ${c.accent}`, transition: "box-shadow 0.3s" }}>
                <motion.span whileHover={{ scale: 1.2, rotate: 5 }}
                  className="material-symbols-outlined" style={{ fontSize: 40, color: c.accent, display: "block", marginBottom: 20 }}>
                  {c.icon}
                </motion.span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#1c0d05", marginBottom: 12 }}>{c.title}</h3>
                <p style={{ color: "#7a5a48", lineHeight: 1.7, fontSize: 14 }}>{c.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const inputStyle:any = {
    width: "100%", background: "#fff7f3", border: "1.5px solid rgba(245,97,27,0.15)", borderRadius: 14,
    padding: "14px 16px", color: "#1c0d05", fontSize: 14, outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section style={{ padding: "96px 0", background: "#fffbf8" }}>
      <AnimatedSection>
        <motion.div variants={scaleIn}
          style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", padding: "60px 56px", borderRadius: 48, border: "1.5px solid rgba(245,97,27,0.12)", boxShadow: "0 24px 64px rgba(245,97,27,0.07)" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.3rem", fontWeight: 800, color: "#1c0d05", marginBottom: 12 }}>Launch Your Infrastructure</h2>
              <p style={{ color: "#7a5a48" }}>Tell us about your technical challenges.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-grid">
                {[["Full Name","John Doe","text"],["Work Email","john@company.com","email"]].map(([label, ph, type]) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>{label}</label>
                    <input type={type} placeholder={ph} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>Technical Requirement</label>
                <select style={inputStyle}>
                  {["Microservices Migration","API Design & Development","Database Optimization","Security Audit","Other Services"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7a5a48", marginBottom: 8 }}>Project Details</label>
                <textarea rows={4} placeholder="Describe your current bottleneck..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(245,97,27,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,97,27,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(245,97,27,0.15)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 16px 40px rgba(245,97,27,0.4)" }}
                whileTap={{ scale: 0.98 }}
                style={{ width: "100%", background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "18px", borderRadius: 16, fontWeight: 700, fontSize: 17, border: "none", cursor: "pointer" }}>
                Initialize Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: "96px 0", background: "#fff7f3" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <AnimatedSection>
          <motion.div variants={scaleIn}
            style={{ position: "relative", background: "rgba(255,181,153,0.2)", backdropFilter: "blur(20px)", border: "1px solid rgba(245,97,27,0.2)", borderRadius: 48, padding: "80px 48px", textAlign: "center", overflow: "hidden" }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#ffb599,#f5611b)", filter: "blur(80px)", pointerEvents: "none" }} />
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#1c0d05", marginBottom: 20, position: "relative" }}>
              Ready to build the future?
            </h2>
            <p style={{ fontSize: 18, color: "#7a5a48", marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7, position: "relative" }}>
              Stop worrying about infrastructure and focus on your business. Let our architects handle the engine.
            </p>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 20px 48px rgba(245,97,27,0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{ background: "linear-gradient(135deg,#ffb599,#f5611b)", color: "#370e00", padding: "20px 48px", borderRadius: 20, fontWeight: 700, fontSize: 18, border: "none", cursor: "pointer", position: "relative", boxShadow: "0 8px 32px rgba(245,97,27,0.35)" }}>
              Build My Backend
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#fffbf8", borderTop: "1px solid rgba(245,97,27,0.1)", paddingTop: 64, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#ffb599,#f5611b)" }} />
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#1c0d05" }}>Neural Amber</span>
            </div>
            <p style={{ color: "#7a5a48", maxWidth: 320, lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>
              Architecting high-performance backend systems for the next generation of digital leaders. Performance. Security. Scale.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["link","share"].map(icon => (
                <motion.a key={icon} href="#" whileHover={{ scale: 1.1, color: "#f5611b" }}
                  style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245,97,27,0.08)", border: "1px solid rgba(245,97,27,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a5a48", textDecoration: "none" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
          {[
            { title: "Company", links: ["About Us","Case Studies","Terms of Service","Privacy Policy"] },
            { title: "Services", links: ["Microservices","Cloud Migration","API Architecture","DB Performance"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontWeight: 700, color: "#1c0d05", marginBottom: 20, fontSize: 15 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {col.links.map(l => (
                  <li key={l}><motion.a href="#" whileHover={{ color: "#f5611b", x: 4 }} style={{ fontSize: 13, color: "#7a5a48", textDecoration: "none", display: "block", transition: "color 0.2s" }}>{l}</motion.a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(245,97,27,0.1)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#a0705a" }}>© 2024 Neural Amber Backend Services. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["GitHub","LinkedIn","X.com"].map(s => (
              <motion.span key={s} whileHover={{ color: "#f5611b" }} style={{ fontSize: 12, color: "#a0705a", cursor: "pointer", transition: "color 0.2s" }}>{s}</motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function BackendDevelopment() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; vertical-align: middle; }
        body { background: #fffbf8; }
        .col-span-2 { grid-column: 1 / -1 !important; }
        @media (max-width: 768px) {
          .hero-grid, .arch-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: repeat(2,1fr) !important; }
          .timeline-line { display: none !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .hidden-mobile { display: none !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Inter',sans-serif", background: "#fffbf8", color: "#1c0d05", overflowX: "hidden" }}>
        <Hero />
        <Services />
        <TechStack />
        <Architecture />
        <ProcessTimeline />
        <WhyUs />
        <ContactForm />
        <CTA />
      </div>
    </>
  );
>>>>>>> 1d95bc403ae8fdc4202ee5762638c3b30e53e32b
}