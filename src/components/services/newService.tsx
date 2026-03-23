import { useState, useEffect, useRef } from "react";

// ── Service Data ──────────────────────────────────────────────────────────────
const SERVICE_DATA:any = {
  webdevelopment: {
    badge: "Web Development",
    headline: "Websites That",
    accent: "Outperform",
    sub: "We engineer blazing-fast, conversion-optimised web applications that become your most powerful sales asset.",
    heroStat: [{ v: "99.9%", l: "Uptime SLA" }, { v: "<200ms", l: "Load Time" }, { v: "Top 1%", l: "Core Vitals" }],
    icon: "🌐",
    color: "#ec5b13",
    features: [
      { icon: "⚡", title: "Lightning Performance", desc: "Server-side rendering, ISR, and edge caching for sub-200ms globally." },
      { icon: "📱", title: "Responsive Mastery", desc: "Pixel-perfect on every device, from 320px to 4K ultra-wide displays." },
      { icon: "🔍", title: "SEO Architecture", desc: "Technical SEO baked into the codebase — structured data, sitemaps, Core Web Vitals." },
      { icon: "🔐", title: "Enterprise Security", desc: "OWASP-compliant, automated threat detection, and zero-trust architecture." },
      { icon: "🧩", title: "CMS Integration", desc: "Headless CMS with Sanity, Contentful, or Strapi for effortless content control." },
      { icon: "📊", title: "Analytics & Heatmaps", desc: "Privacy-first tracking with Plausible, GA4, and Hotjar integration." },
    ],
    process: ["Discovery & Audit", "UX Wireframing", "Frontend Build", "QA & Performance", "Launch & Monitor"],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel Edge", "PostgreSQL", "Prisma ORM"],
    cta: "Start Your Web Project",
  },
  appdevelopment: {
    badge: "Mobile App Development",
    headline: "Apps Users",
    accent: "Love Daily",
    sub: "Cross-platform mobile applications with native performance, seamless UX, and app store optimisation built-in.",
    heroStat: [{ v: "iOS+Android", l: "Single Codebase" }, { v: "4.8★", l: "Avg Store Rating" }, { v: "60fps", l: "Smooth UI" }],
    icon: "📱",
    color: "#ec5b13",
    features: [
      { icon: "🚀", title: "React Native / Flutter", desc: "Write once, deploy everywhere — iOS and Android with truly native feel." },
      { icon: "🔔", title: "Push Notifications", desc: "Smart re-engagement flows powered by Firebase and OneSignal." },
      { icon: "💳", title: "In-App Payments", desc: "Stripe, Apple Pay, and Google Pay integrated and PCI-compliant." },
      { icon: "🗺️", title: "Maps & Geolocation", desc: "Real-time location services, routing, and proximity features." },
      { icon: "📷", title: "Camera & AR", desc: "Augmented reality experiences, barcode scanning, and media capture." },
      { icon: "🔄", title: "Offline-First Sync", desc: "WatermelonDB / SQLite sync so your app works without signal." },
    ],
    process: ["App Strategy", "UI/UX Design", "Development Sprints", "Beta Testing", "App Store Launch"],
    stack: ["React Native", "Expo", "Flutter", "Firebase", "Supabase", "RevenueCat"],
    cta: "Build Your App",
  },
  clouddevelopment: {
    badge: "Cloud Solutions",
    headline: "Infrastructure That",
    accent: "Scales Infinitely",
    sub: "From startup to enterprise scale — cloud-native architectures designed for resilience, cost-efficiency, and zero downtime.",
    heroStat: [{ v: "99.99%", l: "Availability" }, { v: "Auto", l: "Scaling" }, { v: "40%", l: "Cost Savings" }],
    icon: "☁️",
    color: "#ec5b13",
    features: [
      { icon: "⚙️", title: "DevOps & CI/CD", desc: "GitHub Actions, GitLab CI, ArgoCD — automated deploy pipelines end to end." },
      { icon: "🐳", title: "Containerisation", desc: "Docker + Kubernetes orchestration for reproducible, scalable deployments." },
      { icon: "🌍", title: "Multi-Cloud Strategy", desc: "AWS, GCP, and Azure — no vendor lock-in, maximum resilience." },
      { icon: "🛡️", title: "Cloud Security", desc: "IAM, VPC, WAF, secrets management and SOC2-ready configurations." },
      { icon: "📉", title: "Cost Optimisation", desc: "Reserved instances, spot fleets, and right-sizing reduce bills by 40%+." },
      { icon: "📡", title: "Monitoring & Alerting", desc: "Datadog, Prometheus, Grafana — full observability from day one." },
    ],
    process: ["Cloud Audit", "Architecture Design", "Migration Plan", "Deployment", "Ongoing Optimisation"],
    stack: ["AWS / GCP / Azure", "Kubernetes", "Terraform", "Docker", "Datadog", "Vault"],
    cta: "Plan Your Cloud Migration",
  },
  seo: {
    badge: "SEO Services",
    headline: "Rank #1,",
    accent: "Stay #1",
    sub: "Data-driven SEO strategies that compound over time — technical audits, content authority, and link ecosystems that dominate SERPs.",
    heroStat: [{ v: "3x", l: "Organic Traffic" }, { v: "Top 3", l: "SERP Rankings" }, { v: "6mo", l: "Avg. to Results" }],
    icon: "🔍",
    color: "#ec5b13",
    features: [
      { icon: "🔬", title: "Technical SEO Audit", desc: "Crawl budget, Core Web Vitals, structured data, and indexation deep-dive." },
      { icon: "📝", title: "Content Strategy", desc: "Topical authority mapping, pillar pages, and semantic cluster planning." },
      { icon: "🔗", title: "Link Building", desc: "White-hat digital PR, HARO, and niche editorial outreach campaigns." },
      { icon: "🗝️", title: "Keyword Research", desc: "Search intent modelling across 10,000+ terms per campaign." },
      { icon: "📍", title: "Local SEO", desc: "Google Business optimisation, citations, and geo-targeted landing pages." },
      { icon: "📈", title: "Rank Tracking", desc: "Live dashboards with keyword movement, traffic, and conversion data." },
    ],
    process: ["SEO Audit", "Competitor Analysis", "On-Page Fixes", "Content Creation", "Link Acquisition"],
    stack: ["Ahrefs", "Semrush", "Screaming Frog", "Google Search Console", "DataStudio", "Surfer SEO"],
    cta: "Get Your SEO Audit",
  },
  ecommercedevelopment: {
    badge: "E-Commerce Development",
    headline: "Stores That",
    accent: "Convert & Scale",
    sub: "High-performance e-commerce ecosystems engineered for conversion, trust, and peak-load resilience during sale events.",
    heroStat: [{ v: "+38%", l: "Avg. CVR Lift" }, { v: "0.8s", l: "Product Page Load" }, { v: "PCI", l: "DSS Compliant" }],
    icon: "🛒",
    color: "#ec5b13",
    features: [
      { icon: "🏪", title: "Shopify / Custom Builds", desc: "Headless Shopify, WooCommerce, or fully bespoke e-commerce platforms." },
      { icon: "💳", title: "Payment Gateway Suite", desc: "Stripe, Razorpay, PayPal, BNPL — every payment method your customer wants." },
      { icon: "📦", title: "Inventory & ERP Sync", desc: "Real-time stock sync with SAP, Zoho, and custom ERP systems." },
      { icon: "🧠", title: "AI Recommendations", desc: "Personalised upsell and cross-sell powered by collaborative filtering." },
      { icon: "🚚", title: "Logistics Integration", desc: "ShipRocket, Delhivery, FedEx, and custom courier API integrations." },
      { icon: "📊", title: "Conversion Analytics", desc: "Funnel analysis, abandoned cart recovery, and A/B test pipelines." },
    ],
    process: ["Store Strategy", "UX & CRO Design", "Development", "Payment Setup", "Launch & Scale"],
    stack: ["Next.js Commerce", "Shopify", "Stripe", "Elastic Search", "Redis Cache", "Klaviyo"],
    cta: "Build Your Store",
  },
  fullstachdevelopment: {
    badge: "Full-Stack Development",
    headline: "End-to-End",
    accent: "Engineering",
    sub: "From pixel to database — cohesive full-stack products built by specialists who own every layer of the technical stack.",
    heroStat: [{ v: "100%", l: "In-House Team" }, { v: "API+UI", l: "Single Partner" }, { v: "2wk", l: "Sprint Cadence" }],
    icon: "⚡",
    color: "#ec5b13",
    features: [
      { icon: "🎨", title: "Frontend Excellence", desc: "React, Next.js, and Svelte with design-system driven component libraries." },
      { icon: "🔧", title: "Backend Engineering", desc: "Node.js, Go, and Python APIs — RESTful and GraphQL, production-hardened." },
      { icon: "🗄️", title: "Database Architecture", desc: "PostgreSQL, MongoDB, Redis — optimised schema design and query performance." },
      { icon: "🔑", title: "Auth & Identity", desc: "Auth0, NextAuth, Clerk — multi-tenant, RBAC, and SSO configurations." },
      { icon: "📬", title: "Real-Time Features", desc: "WebSockets, SSE, and Pusher for live dashboards and chat features." },
      { icon: "🧪", title: "Testing Culture", desc: "Vitest, Playwright, and k6 load testing — >90% coverage standard." },
    ],
    process: ["Requirements", "System Design", "Parallel Build", "Integration Testing", "Release"],
    stack: ["React / Next.js", "Node.js / Go", "PostgreSQL", "Redis", "AWS", "Docker"],
    cta: "Start Full-Stack Project",
  },
  uiuxdevelopment: {
    badge: "UI/UX Design",
    headline: "Design That",
    accent: "Drives Action",
    sub: "Research-led, conversion-focused design systems that look stunning and reduce cognitive load at every touchpoint.",
    heroStat: [{ v: "+52%", l: "Task Completion" }, { v: "4.9★", l: "User Satisfaction" }, { v: "48hr", l: "First Prototype" }],
    icon: "🎨",
    color: "#ec5b13",
    features: [
      { icon: "🔬", title: "UX Research", desc: "User interviews, heuristic audits, and usability testing before a pixel is placed." },
      { icon: "🖼️", title: "Design System", desc: "Atomic design principles — scalable, token-based component libraries in Figma." },
      { icon: "✨", title: "Motion Design", desc: "Principle-driven micro-interactions and page transitions that delight." },
      { icon: "📐", title: "Information Architecture", desc: "Card sorting, tree testing, and sitemap restructuring for clarity." },
      { icon: "♿", title: "Accessibility", desc: "WCAG 2.1 AA compliance — inclusive design for every user." },
      { icon: "📊", title: "A/B Testing", desc: "Hypothesis-driven experiments with statistical significance tracking." },
    ],
    process: ["Research & Audit", "Wireframing", "Visual Design", "Prototyping", "Dev Handoff"],
    stack: ["Figma", "FigJam", "Principle", "Maze", "Hotjar", "Lottie"],
    cta: "Start Design Sprint",
  },
  "qa&automation": {
    badge: "QA & Automation",
    headline: "Ship With",
    accent: "Confidence",
    sub: "Comprehensive quality engineering that catches bugs before your users do — automated, continuous, and ruthlessly thorough.",
    heroStat: [{ v: "95%", l: "Bug Detection Rate" }, { v: "10x", l: "Faster Release" }, { v: "24/7", l: "CI Monitoring" }],
    icon: "🧪",
    color: "#ec5b13",
    features: [
      { icon: "🤖", title: "Test Automation", desc: "Playwright, Cypress, and Selenium — end-to-end suites that run on every PR." },
      { icon: "⚡", title: "Performance Testing", desc: "k6 and Gatling load tests simulating 100k concurrent users." },
      { icon: "🔐", title: "Security Testing", desc: "OWASP ZAP, Burp Suite — automated vulnerability scanning in CI." },
      { icon: "📱", title: "Cross-Device Testing", desc: "Real device farms on BrowserStack covering 3000+ device/OS combos." },
      { icon: "🔄", title: "Regression Suites", desc: "Visual regression with Percy — zero unintended UI changes ship." },
      { icon: "📊", title: "Test Reporting", desc: "Allure dashboards with trend analysis, flakiness scores, and coverage maps." },
    ],
    process: ["Test Planning", "Environment Setup", "Script Development", "CI Integration", "Reporting"],
    stack: ["Playwright", "Cypress", "k6", "BrowserStack", "Percy", "Allure"],
    cta: "Audit Your QA Process",
  },
  webdesigning: {
    badge: "Web Designing",
    headline: "Visuals That",
    accent: "Stop Scrolls",
    sub: "Bespoke visual identities and web aesthetics engineered to capture attention, communicate value, and inspire action instantly.",
    heroStat: [{ v: "3s", l: "First Impression" }, { v: "+200%", l: "Engagement Lift" }, { v: "Brand", l: "Consistency" }],
    icon: "✏️",
    color: "#ec5b13",
    features: [
      { icon: "🎭", title: "Brand Identity", desc: "Logo, colour palettes, typography — a complete visual language for your brand." },
      { icon: "🖼️", title: "Landing Page Design", desc: "Conversion-optimised landing pages with storytelling hierarchy." },
      { icon: "🌈", title: "Illustration & Iconography", desc: "Custom illustration sets and icon libraries that are uniquely yours." },
      { icon: "🎬", title: "Motion Graphics", desc: "Lottie animations and SVG motion for premium interactive experiences." },
      { icon: "📸", title: "Art Direction", desc: "Photography guidelines, creative direction, and visual content strategy." },
      { icon: "📋", title: "Style Guide Delivery", desc: "Comprehensive brand guidelines PDF and Figma component handoff." },
    ],
    process: ["Brand Discovery", "Mood Boarding", "Concept Design", "Iteration", "Final Delivery"],
    stack: ["Figma", "Adobe Illustrator", "After Effects", "Lottie", "Spline", "Webflow"],
    cta: "Start Design Project",
  },
  digitalmarketing: {
    badge: "Digital Marketing",
    headline: "Growth That",
    accent: "Compounds",
    sub: "Full-funnel digital marketing strategies combining paid, organic, and social channels to acquire, retain, and re-engage customers.",
    heroStat: [{ v: "4.2x", l: "Avg. ROAS" }, { v: "-35%", l: "CAC Reduction" }, { v: "Omni", l: "Channel Reach" }],
    icon: "📣",
    color: "#ec5b13",
    features: [
      { icon: "📢", title: "Paid Advertising", desc: "Google Ads, Meta, and LinkedIn campaigns with ML-powered bid strategies." },
      { icon: "📧", title: "Email Marketing", desc: "Klaviyo/Mailchimp automation flows — welcome, retention, and win-back sequences." },
      { icon: "📱", title: "Social Media Management", desc: "Content calendars, community management, and viral content strategy." },
      { icon: "🎯", title: "Retargeting & CRO", desc: "Pixel-perfect retargeting funnels with landing page optimisation." },
      { icon: "🤝", title: "Influencer Marketing", desc: "Micro and macro influencer campaigns with authentic audience fit." },
      { icon: "📊", title: "Performance Dashboard", desc: "Unified attribution dashboard — every rupee tracked to revenue." },
    ],
    process: ["Audit & Strategy", "Channel Setup", "Campaign Launch", "Optimisation", "Scale & Report"],
    stack: ["Google Ads", "Meta Ads", "Klaviyo", "HubSpot", "Hotjar", "Triple Whale"],
    cta: "Grow My Business",
  },
  backenddevelopment: {
    badge: "Backend Development",
    headline: "APIs Built for",
    accent: "Millions of Requests",
    sub: "Bulletproof backend systems — high-throughput APIs, event-driven architectures, and data pipelines that power your product at scale.",
    heroStat: [{ v: "10M+", l: "Req/day Handled" }, { v: "<50ms", l: "API Latency" }, { v: "99.99%", l: "Uptime" }],
    icon: "🔧",
    color: "#ec5b13",
    features: [
      { icon: "🚀", title: "API Design", desc: "RESTful and GraphQL APIs with OpenAPI specs, versioning, and rate limiting." },
      { icon: "🗄️", title: "Database Engineering", desc: "Schema design, query optimisation, sharding, and replication strategies." },
      { icon: "📬", title: "Message Queues", desc: "RabbitMQ, Kafka, and SQS for async, event-driven microservice communication." },
      { icon: "🔑", title: "Auth Systems", desc: "JWT, OAuth2, API keys — multi-tenant authentication built to spec." },
      { icon: "⚡", title: "Caching Layers", desc: "Redis and Memcached strategies that slash database load by 80%." },
      { icon: "🔍", title: "Search Engineering", desc: "Elasticsearch and Typesense for sub-50ms full-text and faceted search." },
    ],
    process: ["Requirements", "API Design", "Development", "Load Testing", "Deployment"],
    stack: ["Node.js", "Go / Python", "PostgreSQL", "Redis", "Kafka", "Elasticsearch"],
    cta: "Build My Backend",
  },
  aimldevelopment: {
    badge: "AI / ML Development",
    headline: "Intelligence",
    accent: "Built-In",
    sub: "Custom AI models, LLM integrations, and machine learning pipelines that automate decisions and surface insights from your data.",
    heroStat: [{ v: "GPT-4o", l: "LLM Ready" }, { v: "Custom", l: "Model Training" }, { v: "Real-time", l: "Inference" }],
    icon: "🤖",
    color: "#ec5b13",
    features: [
      { icon: "🧠", title: "LLM Integration", desc: "GPT-4o, Claude, Gemini — fine-tuned and RAG-augmented for your domain." },
      { icon: "👁️", title: "Computer Vision", desc: "Object detection, OCR, and image classification pipelines for production." },
      { icon: "📊", title: "Predictive Analytics", desc: "Churn prediction, demand forecasting, and anomaly detection models." },
      { icon: "💬", title: "NLP & Chatbots", desc: "Intent classification, sentiment analysis, and multi-turn dialogue systems." },
      { icon: "🔄", title: "MLOps Pipeline", desc: "MLflow, Kubeflow — model versioning, monitoring, and automated retraining." },
      { icon: "⚡", title: "Real-time Inference", desc: "GPU-backed model serving with <100ms inference via ONNX and TensorRT." },
    ],
    process: ["Data Audit", "Model Design", "Training & Eval", "API Deployment", "Monitoring"],
    stack: ["Python", "PyTorch", "OpenAI API", "LangChain", "Pinecone", "Hugging Face"],
    cta: "Add AI to My Product",
  },
  microservice: {
    badge: "Microservices",
    headline: "Architecture That",
    accent: "Never Breaks",
    sub: "Decompose your monolith into resilient, independently deployable microservices — ship faster, scale smarter, fail safely.",
    heroStat: [{ v: "10x", l: "Deploy Frequency" }, { v: "Zero", l: "Downtime Deploys" }, { v: "Independent", l: "Service Scaling" }],
    icon: "🧩",
    color: "#ec5b13",
    features: [
      { icon: "🔀", title: "Service Decomposition", desc: "Domain-driven design to identify bounded contexts and service boundaries." },
      { icon: "🌐", title: "API Gateway", desc: "Kong, AWS API Gateway — single entry point with auth, rate limiting, routing." },
      { icon: "📡", title: "Service Mesh", desc: "Istio and Linkerd for mTLS, circuit breaking, and observability between services." },
      { icon: "📬", title: "Event-Driven Comms", desc: "Kafka and NATS for async messaging patterns that decouple services." },
      { icon: "🐳", title: "Container Orchestration", desc: "Kubernetes with Helm charts — declarative, reproducible service deployments." },
      { icon: "🔍", title: "Distributed Tracing", desc: "Jaeger and Zipkin — trace requests across every service hop with ease." },
    ],
    process: ["Monolith Analysis", "Domain Mapping", "Service Extraction", "Integration", "Hardening"],
    stack: ["Kubernetes", "Docker", "Kafka", "Istio", "Kong", "Jaeger"],
    cta: "Modernise My Architecture",
  },
};

// ── Animation Hook ────────────────────────────────────────────────────────────
function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Sub-components ────────────────────────────────────────────────────────────
function AnimatedCounter({ value }:any) {
  const [display, setDisplay] = useState("0");
  const [ref, visible]:any = useIntersection();
  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    const prefix = value.match(/^[^0-9]*/)?.[0] || "";
    const suffix = value.match(/[^0-9.]+$/)?.[0] || "";
    let start = 0;
    const duration = 1500;
    const step = (timestamp:any) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(prefix + (num < 10 ? (ease * num).toFixed(1) : Math.floor(ease * num)) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return <span ref={ref}>{display}</span>;
}

function HeroSection({ data, serviceKey }:any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, [serviceKey]);

  return (
    <section style={{ background: "linear-gradient(135deg, #fff8f5 0%, #fff 60%, #fff3ed 100%)", minHeight: "88vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,91,19,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,91,19,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(236,91,19,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 32px 60px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", alignItems: "center" }}>
          {/* Left */}
          <div style={{ flex: "1 1 480px" }}>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(236,91,19,0.1)", border: "1px solid rgba(236,91,19,0.25)", borderRadius: "999px", padding: "6px 16px", fontSize: "12px", fontWeight: 700, color: "#ec5b13", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
                <span style={{ fontSize: "16px" }}>{data.icon}</span>
                {data.badge}
              </span>
            </div>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s 0.1s cubic-bezier(.22,1,.36,1)" }}>
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#111", marginBottom: "0" }}>
                {data.headline}<br />
                <span style={{ background: "linear-gradient(135deg, #ec5b13, #ff8c42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.accent}</span>
              </h1>
            </div>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s 0.2s cubic-bezier(.22,1,.36,1)" }}>
              <p style={{ color: "#555", fontSize: "18px", lineHeight: 1.7, margin: "24px 0 36px", maxWidth: "500px" }}>{data.sub}</p>
            </div>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s 0.3s cubic-bezier(.22,1,.36,1)", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                style={{ background: "linear-gradient(135deg, #ec5b13, #ff7534)", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 32px", fontSize: "16px", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(236,91,19,0.35)", transition: "all 0.25s", fontFamily: "'Manrope', sans-serif" }}
                onMouseOver={(e:any) => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 12px 40px rgba(236,91,19,0.45)"; }}
                onMouseOut={(e:any) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 32px rgba(236,91,19,0.35)"; }}
              >
                {data.cta} →
              </button>
              <button
                style={{ background: "transparent", color: "#111", border: "2px solid rgba(0,0,0,0.15)", borderRadius: "999px", padding: "16px 32px", fontSize: "16px", fontWeight: 700, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Manrope', sans-serif" }}
                onMouseOver={(e:any) => { e.target.style.borderColor = "#ec5b13"; e.target.style.color = "#ec5b13"; }}
                onMouseOut={(e:any) => { e.target.style.borderColor = "rgba(0,0,0,0.15)"; e.target.style.color = "#111"; }}
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right — Stats */}
          <div style={{ flex: "0 1 340px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.heroStat.map((s:any, i:any) => (
              <div key={i} style={{ background: "#fff", borderRadius: "20px", padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(236,91,19,0.1)", opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(40px)", transition: `all 0.7s ${0.15 + i * 0.1}s cubic-bezier(.22,1,.36,1)`, display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "4px", height: "40px", borderRadius: "4px", background: "linear-gradient(180deg, #ec5b13, #ff8c42)", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "32px", fontWeight: 900, color: "#111", lineHeight: 1 }}>
                    <AnimatedCounter value={s.v} />
                  </div>
                  <div style={{ color: "#888", fontSize: "13px", fontWeight: 600, marginTop: "4px", letterSpacing: "0.04em" }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ data }:any) {
  const [ref, visible]:any = useIntersection();
  return (
    <section ref={ref} style={{ background: "#f8f6f6", padding: "100px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
          <span style={{ display: "inline-block", background: "rgba(236,91,19,0.1)", color: "#ec5b13", borderRadius: "999px", padding: "6px 18px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>What We Deliver</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Capabilities That Set You Apart</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {data.features.map((f:any, i:any) => (
            <FeatureCard key={i} f={f} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ f, i, visible }:any) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: "20px", padding: "36px", border: `1px solid ${hov ? "rgba(236,91,19,0.3)" : "rgba(0,0,0,0.06)"}`, boxShadow: hov ? "0 20px 48px rgba(236,91,19,0.12)" : "0 4px 16px rgba(0,0,0,0.05)", opacity: visible ? 1 : 0, transform: visible ? (hov ? "translateY(-6px)" : "translateY(0)") : "translateY(40px)", transition: `all 0.5s ${i * 0.07}s cubic-bezier(.22,1,.36,1)`, cursor: "default" }}
    >
      <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: hov ? "rgba(236,91,19,0.12)" : "rgba(236,91,19,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px", transition: "background 0.3s" }}>{f.icon}</div>
      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>{f.title}</h3>
      <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.65 }}>{f.desc}</p>
      {hov && <div style={{ marginTop: "16px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, #ec5b13, #ff8c42)", animation: "expandLine 0.4s ease forwards" }} />}
    </div>
  );
}

function ProcessSection({ data }:any) {
  const [ref, visible]:any = useIntersection();
  return (
    <section ref={ref} style={{ background: "#fff", padding: "100px 32px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
          <span style={{ display: "inline-block", background: "rgba(236,91,19,0.1)", color: "#ec5b13", borderRadius: "999px", padding: "6px 18px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>How We Work</span>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em" }}>Our Proven Process</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0", position: "relative" }}>
          {data.process.map((step:any, i:any) => (
            <div key={i} style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.6s ${i * 0.1}s cubic-bezier(.22,1,.36,1)` }}>
              {i < data.process.length - 1 && (
                <div style={{ position: "absolute", top: "25px", left: "calc(50% + 20px)", right: "calc(-50% + 20px)", height: "2px", background: "linear-gradient(90deg, #ec5b13 0%, rgba(236,91,19,0.15) 100%)", zIndex: 0 }} />
              )}
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: i === 0 ? "#ec5b13" : "#fff", border: "2px solid #ec5b13", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "18px", color: i === 0 ? "#fff" : "#ec5b13", position: "relative", zIndex: 1, boxShadow: "0 4px 16px rgba(236,91,19,0.2)" }}>{i + 1}</div>
              <div style={{ marginTop: "16px", textAlign: "center", padding: "0 8px" }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "14px", color: "#111", lineHeight: 1.3 }}>{step}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection({ data }:any) {
  const [ref, visible]:any = useIntersection();
  return (
    <section ref={ref} style={{ background: "#f8f6f6", padding: "80px 32px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "32px", opacity: visible ? 1 : 0, transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>Technologies We Master</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          {data.stack.map((tech:any, i:any) => (
            <StackChip key={i} tech={tech} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackChip({ tech, i, visible }:any) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#ec5b13" : "#fff", color: hov ? "#fff" : "#111", border: `1px solid ${hov ? "#ec5b13" : "rgba(0,0,0,0.1)"}`, borderRadius: "999px", padding: "10px 22px", fontSize: "14px", fontWeight: 700, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.4s ${i * 0.06}s cubic-bezier(.22,1,.36,1)`, cursor: "default", fontFamily: "'Manrope', sans-serif", letterSpacing: "0.02em", boxShadow: hov ? "0 6px 20px rgba(236,91,19,0.3)" : "none" }}
    >
      {tech}
    </div>
  );
}

function CTASection({ data }:any) {
  const [ref, visible]:any = useIntersection();
  const [hov, setHov] = useState(false);
  return (
    <section ref={ref} style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ display: "inline-block", fontSize: "56px", marginBottom: "24px", animation: "float 3s ease-in-out infinite" }}>{data.icon}</div>
        <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
          Ready to Build Something<br />
          <span style={{ background: "linear-gradient(135deg, #ec5b13, #ff8c42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Extraordinary?</span>
        </h2>
        <p style={{ color: "#666", fontSize: "18px", lineHeight: 1.7, marginBottom: "40px" }}>Let's talk about your project. Our team is ready to help you scale.</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{ background: "linear-gradient(135deg, #ec5b13, #ff7534)", color: "#fff", border: "none", borderRadius: "999px", padding: "18px 44px", fontSize: "17px", fontWeight: 800, cursor: "pointer", boxShadow: hov ? "0 16px 48px rgba(236,91,19,0.45)" : "0 8px 32px rgba(236,91,19,0.3)", transform: hov ? "scale(1.05) translateY(-2px)" : "scale(1)", transition: "all 0.3s cubic-bezier(.22,1,.36,1)", fontFamily: "'Manrope', sans-serif" }}
          >
            {data.cta} →
          </button>
          <button
            style={{ background: "transparent", color: "#111", border: "2px solid rgba(0,0,0,0.15)", borderRadius: "999px", padding: "18px 44px", fontSize: "17px", fontWeight: 800, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Manrope', sans-serif" }}
            onMouseOver={(e:any) => { e.target.style.borderColor = "#ec5b13"; e.target.style.color = "#ec5b13"; }}
            onMouseOut={(e:any) => { e.target.style.borderColor = "rgba(0,0,0,0.15)"; e.target.style.color = "#111"; }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Main ServicePage Component ────────────────────────────────────────────────
export default function ServicePage({ serviceKey = "webdevelopment" }) {
  const data = SERVICE_DATA[serviceKey as any] || SERVICE_DATA["webdevelopment"];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [serviceKey]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Manrope', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes expandLine {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(236,91,19,0.35); }
          70% { box-shadow: 0 0 0 14px rgba(236,91,19,0); }
          100% { box-shadow: 0 0 0 0 rgba(236,91,19,0); }
        }
      `}</style>

      <div style={{ background: "#f8f6f6", minHeight: "100vh" }}>
        <HeroSection data={data} serviceKey={serviceKey} />
        <FeaturesSection data={data} />
        <ProcessSection data={data} />
        <StackSection data={data} />
        <CTASection data={data} />
      </div>
    </>
  );
}

// ── Demo wrapper (remove in production) ──────────────────────────────────────
export function ServicePageDemo() {
  const services = [
    { key: "webdevelopment", label: "Web Dev" },
    { key: "appdevelopment", label: "App Dev" },
    { key: "clouddevelopment", label: "Cloud" },
    { key: "seo", label: "SEO" },
    { key: "ecommercedevelopment", label: "E-Commerce" },
    { key: "fullstachdevelopment", label: "Full-Stack" },
    { key: "uiuxdevelopment", label: "UI/UX" },
    { key: "qa&automation", label: "QA" },
    { key: "webdesigning", label: "Web Design" },
    { key: "digitalmarketing", label: "Digital Mktg" },
    { key: "backenddevelopment", label: "Backend" },
    { key: "aimldevelopment", label: "AI/ML" },
    { key: "microservice", label: "Microservices" },
  ];
  const [active, setActive] = useState("webdevelopment");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #ec5b13; border-radius: 4px; }
      `}</style>

      {/* Nav pill bar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(236,91,19,0.1)", padding: "14px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: "18px", color: "#111", marginRight: "16px", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#ec5b13" }}>●</span> ETHERIC
          </span>
          {services.map(s => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              style={{ background: active === s.key ? "#ec5b13" : "transparent", color: active === s.key ? "#fff" : "#555", border: active === s.key ? "none" : "1px solid rgba(0,0,0,0.12)", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "'Manrope', sans-serif", boxShadow: active === s.key ? "0 4px 16px rgba(236,91,19,0.3)" : "none" }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <ServicePage serviceKey={active} />
    </>
  );
}