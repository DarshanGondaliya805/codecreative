import { useState, useEffect, useRef, ReactNode, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════
interface Solution {
  icon: string;
  title: string;
  desc: string;
}
interface Project {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  // Solution-specific detail page data
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  features: FeatureItem[];
  benefits: BenefitItem[];
  marketApps: MarketItem[];
  techStack: TechItem[];
  stats: StatItem[];
  portfolioItems: PortfolioItem[];
  accentColor: "orange" | "blue" | "emerald" | "purple" | "rose" | "teal" | "amber" | "indigo" | "pink";
}
interface FeatureItem { icon: string; title: string; desc: string; accent: "orange" | "blue" }
interface BenefitItem { title: string; desc: string }
interface MarketItem { title: string; desc: string }
interface TechItem { label: string; short: string; accent: "orange" | "blue" }
interface StatItem { val: number; suf: string; label: string }
interface PortfolioItem { label: string; sub: string; icon: string; accentClass: string }

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade"; className?: string;
}) {
  const [ref, visible] = useInView();
  const t: Record<string, string> = { up: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)", fade: "none" };
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

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
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

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const delay = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);
  return (
    <span className="text-orange-500">
      {text}
      <span className="ml-0.5 inline-block w-[3px] h-[0.85em] bg-orange-400 align-middle animate-pulse" />
    </span>
  );
}

function ProgressBar({ pct, label }: { pct: number; label: string }) {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1.5">
        <span>{label}</span><span className="text-orange-500">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600" style={{
          width: visible ? `${pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(.22,1,.36,1) 300ms",
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const SOLUTIONS: Solution[] = [
  { icon: "cloud", title: "Cloud Computing", desc: "Scalable infrastructure designed for high availability." },
  { icon: "psychology", title: "AI & ML", desc: "Deep learning models for predictive intelligence." },
  { icon: "shield", title: "Cyber Security", desc: "Military-grade protection for digital assets." },
  { icon: "code", title: "Web Development", desc: "Performant web experiences with modern stacks." },
  { icon: "smartphone", title: "Mobile Apps", desc: "Native and cross-platform mobile excellence." },
  { icon: "analytics", title: "Data Analytics", desc: "Turn raw data into actionable business insight." },
  { icon: "terminal", title: "DevOps", desc: "Automated CI/CD pipelines for rapid delivery." },
  { icon: "hub", title: "Blockchain", desc: "Decentralized protocols for transparent trust." },
  { icon: "layers", title: "SaaS Dev", desc: "Building multi-tenant cloud-native platforms." },
  { icon: "api", title: "API Integration", desc: "Seamless connectivity across the ecosystem." },
];

const PROJECTS: Project[] = [
  {
    tag: "Mobile App", tagColor: "bg-blue-100 text-blue-700",
    title: "Taxi Booking App", desc: "A full-scale mobility platform with real-time routing and driver logistics.",
    heroTitle: "Taxi Booking App", heroSubtitle: "Engineer seamless mobility experiences with enterprise-grade orchestration, secure payments, and intuitive driver-rider matching.",
    badge: "High-Performance Solution", accentColor: "orange",
    stats: [{ val: 98, suf: "%", label: "Uptime SLA" }, { val: 40, suf: "+", label: "Markets" }, { val: 2, suf: "M+", label: "Rides/Day" }],
    features: [
      { icon: "map", title: "Live Tracking", desc: "Real-time GPS sync using advanced WebSocket protocols for zero-lag location updates.", accent: "orange" },
      { icon: "shield_with_heart", title: "Secure Payments", desc: "Multi-gateway integration with end-to-end encryption for PCI-compliant transactions.", accent: "blue" },
      { icon: "dashboard_customize", title: "Admin Dashboard", desc: "Central command to monitor fleet metrics, revenue, and user analytics in real-time.", accent: "orange" },
      { icon: "smart_toy", title: "Smart Dispatch", desc: "AI-driven algorithms to minimize wait times by matching the closest optimal driver.", accent: "blue" },
      { icon: "notifications_active", title: "Instant Alerts", desc: "Smart push notifications for ride updates, promotions, and driver communications.", accent: "orange" },
      { icon: "history", title: "Ride History", desc: "Detailed logging of past journeys with downloadable invoices and rating capabilities.", accent: "blue" },
    ],
    benefits: [
      { title: "99.9% System Uptime", desc: "Cloud-native infrastructure ensures your mobility business never sleeps during peak demand." },
      { title: "Reduced Time-to-Market", desc: "Pre-built core components allow you to launch your solution in weeks, not months." },
      { title: "Omni-Channel Experience", desc: "Unified experience across iOS, Android, and Web with shared business logic." },
    ],
    marketApps: [
      { title: "Corporate Shuttles", desc: "Efficient route management for enterprise employee transportation." },
      { title: "Private Chauffeur Services", desc: "High-end booking luxury with specialized driver requirements." },
      { title: "Regional Taxi Fleets", desc: "Digital transformation for traditional meter-based taxi companies." },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" }, { label: "Node.js", short: "JS", accent: "orange" },
      { label: "MongoDB", short: "DB", accent: "blue" }, { label: "Firebase", short: "FB", accent: "orange" },
      { label: "Mapbox", short: "MB", accent: "blue" }, { label: "AWS Lambda", short: "λ", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Passenger Interface", sub: "Dynamic Pricing Engine", icon: "smartphone", accentClass: "from-orange-400 to-orange-600" },
      { label: "Operations Hub", sub: "Real-time Analytics", icon: "dashboard", accentClass: "from-sky-400 to-sky-600" },
      { label: "Driver Portal", sub: "Earning Projections", icon: "directions_car", accentClass: "from-orange-400 to-orange-600" },
    ],
  },
  {
    tag: "SaaS", tagColor: "bg-orange-100 text-orange-600",
    title: "Restaurant MS", desc: "End-to-end POS and inventory management for hospitality chains.",
    heroTitle: "Restaurant Management System", heroSubtitle: "A complete hospitality technology stack — from table reservations and POS to kitchen display systems and loyalty programs.",
    badge: "Enterprise SaaS Platform", accentColor: "orange",
    stats: [{ val: 500, suf: "+", label: "Restaurants" }, { val: 99, suf: "%", label: "Order Accuracy" }, { val: 3, suf: "s", label: "Avg. Order Time" }],
    features: [
      { icon: "point_of_sale", title: "Smart POS", desc: "Lightning-fast point-of-sale with offline mode, split bills, and multi-currency support.", accent: "orange" },
      { icon: "inventory_2", title: "Inventory Control", desc: "Automated stock alerts, supplier ordering, and waste tracking to cut food costs.", accent: "blue" },
      { icon: "table_restaurant", title: "Table Management", desc: "Visual floor plan with real-time occupancy, reservation slots, and wait-list management.", accent: "orange" },
      { icon: "restaurant_menu", title: "Menu Builder", desc: "Drag-and-drop menu configurator with seasonal pricing and allergen tagging.", accent: "blue" },
      { icon: "analytics", title: "Revenue Analytics", desc: "Daily P&L reports, best-seller tracking, and peak-hour forecasting built in.", accent: "orange" },
      { icon: "loyalty", title: "Loyalty Engine", desc: "Points-based rewards, digital punch cards, and targeted promotional campaigns.", accent: "blue" },
    ],
    benefits: [
      { title: "30% Cost Reduction", desc: "Intelligent inventory reduces waste and optimizes supplier negotiations automatically." },
      { title: "Faster Table Turnover", desc: "Streamlined ordering and payment flows increase covers-per-hour by up to 25%." },
      { title: "Multi-Branch Ready", desc: "Centralized dashboard manages unlimited branches with role-based access controls." },
    ],
    marketApps: [
      { title: "Fine Dining Chains", desc: "Elegant reservation flows and sommelier-level menu detail management." },
      { title: "QSR & Fast Food", desc: "High-throughput counter ordering with kitchen display and drive-through mode." },
      { title: "Cloud Kitchens", desc: "Multi-brand virtual restaurant management from a single operational hub." },
    ],
    techStack: [
      { label: "React", short: "Re", accent: "blue" }, { label: "Django", short: "Py", accent: "orange" },
      { label: "PostgreSQL", short: "PG", accent: "blue" }, { label: "Redis", short: "Rd", accent: "orange" },
      { label: "Stripe", short: "St", accent: "blue" }, { label: "Docker", short: "Dk", accent: "orange" },
    ],
    portfolioItems: [
      { label: "POS Interface", sub: "Smart Order Management", icon: "point_of_sale", accentClass: "from-orange-400 to-orange-600" },
      { label: "Kitchen Display", sub: "Real-time Queue System", icon: "restaurant", accentClass: "from-amber-400 to-amber-600" },
      { label: "Owner Dashboard", sub: "Revenue & Inventory", icon: "bar_chart", accentClass: "from-orange-400 to-orange-600" },
    ],
  },
  {
    tag: "Fintech", tagColor: "bg-emerald-100 text-emerald-700",
    title: "FinTech Wallet", desc: "Secure digital banking and peer-to-peer payment architecture.",
    heroTitle: "FinTech Wallet Platform", heroSubtitle: "Bank-grade digital wallet infrastructure powering P2P transfers, bill payments, investment portfolios, and multi-currency accounts.",
    badge: "Bank-Grade Security", accentColor: "emerald",
    stats: [{ val: 256, suf: "-bit", label: "Encryption" }, { val: 50, suf: "ms", label: "Settlement Time" }, { val: 99, suf: "%", label: "Fraud Detection" }],
    features: [
      { icon: "account_balance_wallet", title: "Digital Wallet", desc: "Instant fund loading via bank transfer, card, or UPI with real-time balance updates.", accent: "orange" },
      { icon: "swap_horiz", title: "P2P Transfers", desc: "Send money to anyone instantly using phone number, QR code, or wallet ID.", accent: "blue" },
      { icon: "currency_exchange", title: "Multi-Currency", desc: "Hold and convert 50+ currencies at live mid-market rates with minimal spread.", accent: "orange" },
      { icon: "security", title: "Fraud Shield", desc: "AI-powered transaction monitoring with real-time anomaly detection and 2FA.", accent: "blue" },
      { icon: "trending_up", title: "Micro-Investing", desc: "Round-up savings and automated portfolio investing starting from ₹1.", accent: "orange" },
      { icon: "receipt_long", title: "Bill Payments", desc: "One-tap utility bills, subscriptions, and merchant payments via BBPS.", accent: "blue" },
    ],
    benefits: [
      { title: "RBI-Compliant Architecture", desc: "Built to meet all regulatory requirements including KYC, AML, and data localisation." },
      { title: "Sub-Second Settlements", desc: "Proprietary settlement engine processes millions of transactions with zero downtime." },
      { title: "Open Banking APIs", desc: "Connect to 500+ banks and fintechs via pre-certified API connectors." },
    ],
    marketApps: [
      { title: "Neobanks & Challengers", desc: "White-label wallet core for launching a digital bank in 30 days." },
      { title: "BNPL Providers", desc: "Embedded buy-now-pay-later with dynamic credit scoring integration." },
      { title: "Remittance Services", desc: "Cross-border money transfer with competitive FX rates and compliance." },
    ],
    techStack: [
      { label: "Kotlin", short: "Kt", accent: "blue" }, { label: "Go", short: "Go", accent: "orange" },
      { label: "Kafka", short: "KF", accent: "blue" }, { label: "Vault", short: "Vt", accent: "orange" },
      { label: "CockroachDB", short: "DB", accent: "blue" }, { label: "k8s", short: "K8", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Wallet Dashboard", sub: "Balance & Transactions", icon: "account_balance_wallet", accentClass: "from-emerald-400 to-emerald-600" },
      { label: "Send Money", sub: "P2P Transfer Flow", icon: "swap_horiz", accentClass: "from-teal-400 to-teal-600" },
      { label: "Analytics", sub: "Spend Intelligence", icon: "pie_chart", accentClass: "from-emerald-400 to-emerald-600" },
    ],
  },
  {
    tag: "E-Commerce", tagColor: "bg-purple-100 text-purple-700",
    title: "E-commerce", desc: "Headless commerce solution for global retail scaling.",
    heroTitle: "Headless E-Commerce Platform", heroSubtitle: "API-first commerce engine powering omnichannel retail — from storefront PWAs and mobile apps to voice commerce and IoT devices.",
    badge: "API-First Commerce", accentColor: "purple",
    stats: [{ val: 10, suf: "M+", label: "SKUs Handled" }, { val: 99, suf: "%", label: "Cart Success" }, { val: 120, suf: "+", label: "Integrations" }],
    features: [
      { icon: "storefront", title: "Headless Storefront", desc: "Decoupled frontend deliver blazing-fast PWA shopping experiences on any device.", accent: "orange" },
      { icon: "category", title: "Product Catalog", desc: "Flexible PIM with unlimited variants, bundles, digital goods, and subscription products.", accent: "blue" },
      { icon: "local_shipping", title: "Smart Logistics", desc: "Multi-carrier shipping with live rates, auto label generation, and returns portal.", accent: "orange" },
      { icon: "discount", title: "Promotions Engine", desc: "Complex discount rules, flash sales, coupon stacking, and loyalty point redemption.", accent: "blue" },
      { icon: "manage_search", title: "AI Search", desc: "Semantic search with personalised ranking, facets, and merchandising rules.", accent: "orange" },
      { icon: "payments", title: "Global Payments", desc: "60+ payment methods including BNPL, crypto, and local wallets across 100+ countries.", accent: "blue" },
    ],
    benefits: [
      { title: "3× Faster Page Loads", desc: "Headless JAMstack architecture scores 95+ on Core Web Vitals out of the box." },
      { title: "Composable Architecture", desc: "Pick best-of-breed tools and connect via pre-built MACH-certified connectors." },
      { title: "Global CDN Delivery", desc: "Edge-cached storefronts serve buyers from 200+ PoPs with <50ms TTFB worldwide." },
    ],
    marketApps: [
      { title: "D2C Brands", desc: "Owned-channel commerce with rich storytelling and subscription models." },
      { title: "B2B Wholesale", desc: "Custom pricing tiers, bulk ordering, and ERP-integrated procurement portals." },
      { title: "Marketplace Operators", desc: "Multi-vendor marketplace with seller onboarding, commissions, and payouts." },
    ],
    techStack: [
      { label: "Next.js", short: "Nx", accent: "blue" }, { label: "Medusa", short: "Md", accent: "orange" },
      { label: "Elastic", short: "ES", accent: "blue" }, { label: "Cloudflare", short: "CF", accent: "orange" },
      { label: "Algolia", short: "Al", accent: "blue" }, { label: "Sanity", short: "CMS", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Product Listing", sub: "Personalised Discovery", icon: "grid_view", accentClass: "from-purple-400 to-purple-600" },
      { label: "Checkout Flow", sub: "1-Click Conversion", icon: "shopping_cart_checkout", accentClass: "from-violet-400 to-violet-600" },
      { label: "Seller Portal", sub: "Inventory & Analytics", icon: "store", accentClass: "from-purple-400 to-purple-600" },
    ],
  },
  {
    tag: "Logistics", tagColor: "bg-rose-100 text-rose-700",
    title: "Food Delivery", desc: "Hyper-local delivery logistics and vendor marketplace.",
    heroTitle: "Food Delivery Platform", heroSubtitle: "Complete hyper-local delivery ecosystem — restaurant marketplace, intelligent dispatch, real-time tracking, and dark kitchen management.",
    badge: "Hyper-Local Delivery OS", accentColor: "rose",
    stats: [{ val: 8, suf: "min", label: "Avg. Delivery" }, { val: 1, suf: "M+", label: "Orders/Day" }, { val: 97, suf: "%", label: "On-Time Rate" }],
    features: [
      { icon: "restaurant", title: "Restaurant Marketplace", desc: "Discoverable vendor listings with live menus, ratings, dietary filters, and ETA badges.", accent: "orange" },
      { icon: "delivery_dining", title: "Live Order Tracking", desc: "Rider GPS broadcast with animated map, push notifications, and contactless drop.", accent: "blue" },
      { icon: "route", title: "Smart Routing", desc: "AI dispatch assigns riders considering distance, traffic, and batch-delivery optimisation.", accent: "orange" },
      { icon: "dark_mode", title: "Dark Kitchen Suite", desc: "Multi-brand virtual kitchen management with shared inventory and aggregated analytics.", accent: "blue" },
      { icon: "loyalty", title: "Super-App Wallet", desc: "In-app credits, cashback on orders, and subscription pass for free deliveries.", accent: "orange" },
      { icon: "support_agent", title: "Live Support", desc: "In-app order disputes, rider SOS, and AI-assisted customer support chat.", accent: "blue" },
    ],
    benefits: [
      { title: "8-Minute Average Delivery", desc: "Predictive pre-positioning of riders near demand hotspots using ML heatmaps." },
      { title: "Zero Commission Model", desc: "SaaS subscription pricing — restaurants keep 100% of their revenue." },
      { title: "White-Label Ready", desc: "Launch a fully branded delivery app for your city in under 4 weeks." },
    ],
    marketApps: [
      { title: "Restaurant Chains", desc: "Owned delivery channel bypassing third-party aggregator commissions." },
      { title: "Grocery & Q-Commerce", desc: "10-minute grocery delivery with warehouse management and dark stores." },
      { title: "Pharmacy Delivery", desc: "Prescription verification, cold-chain handling, and scheduled deliveries." },
    ],
    techStack: [
      { label: "Flutter", short: "Fl", accent: "blue" }, { label: "FastAPI", short: "Py", accent: "orange" },
      { label: "Redis", short: "Rd", accent: "blue" }, { label: "PostGIS", short: "GIS", accent: "orange" },
      { label: "OSRM", short: "OS", accent: "blue" }, { label: "RabbitMQ", short: "MQ", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Customer App", sub: "Order & Track Experience", icon: "delivery_dining", accentClass: "from-rose-400 to-rose-600" },
      { label: "Rider App", sub: "Smart Navigation Suite", icon: "two_wheeler", accentClass: "from-orange-400 to-orange-600" },
      { label: "Partner Dashboard", sub: "Restaurant Operations", icon: "restaurant", accentClass: "from-rose-400 to-rose-600" },
    ],
  },
  {
    tag: "HealthTech", tagColor: "bg-teal-100 text-teal-700",
    title: "Healthcare Portal", desc: "HIPAA compliant patient care and telemedicine engine.",
    heroTitle: "Healthcare Patient Portal", heroSubtitle: "HIPAA-compliant digital health platform connecting patients with providers via telemedicine, EHR, appointment scheduling, and AI symptom triage.",
    badge: "HIPAA Compliant Platform", accentColor: "teal",
    stats: [{ val: 99, suf: "%", label: "HIPAA Score" }, { val: 5, suf: "min", label: "Consultation" }, { val: 200, suf: "+", label: "Specialties" }],
    features: [
      { icon: "video_call", title: "Telemedicine", desc: "HD video consultations with e-prescriptions, screen-share, and session recordings.", accent: "orange" },
      { icon: "folder_shared", title: "EHR Management", desc: "Unified patient records with lab results, imaging, and medication history in one place.", accent: "blue" },
      { icon: "calendar_month", title: "Smart Scheduling", desc: "AI-powered appointment matching with specialty routing and wait-time prediction.", accent: "orange" },
      { icon: "medication", title: "e-Prescriptions", desc: "Digital prescriptions with pharmacy integration, refill reminders, and drug interaction checks.", accent: "blue" },
      { icon: "monitor_heart", title: "Health Monitoring", desc: "Wearable data ingestion for continuous vitals monitoring and chronic disease management.", accent: "orange" },
      { icon: "privacy_tip", title: "Consent & Compliance", desc: "Granular data consent management, audit trails, and automated HIPAA/GDPR reporting.", accent: "blue" },
    ],
    benefits: [
      { title: "HIPAA & HL7 Certified", desc: "End-to-end encrypted data pipelines certified under HL7 FHIR R4 standards." },
      { title: "AI-Assisted Triage", desc: "Symptom checker reduces unnecessary ER visits by routing to appropriate care level." },
      { title: "Insurance Integration", desc: "Real-time eligibility verification and automated claims submission to major payers." },
    ],
    marketApps: [
      { title: "Hospital Networks", desc: "Enterprise EHR integration with existing legacy systems via HL7 FHIR APIs." },
      { title: "Telehealth Startups", desc: "White-label telemedicine platform with custom branding and specialty workflows." },
      { title: "Chronic Care Programs", desc: "Remote patient monitoring with IoT device integration and care team alerts." },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" }, { label: "Node.js", short: "JS", accent: "orange" },
      { label: "FHIR API", short: "HL7", accent: "blue" }, { label: "Twilio", short: "Tw", accent: "orange" },
      { label: "AWS HIPAA", short: "AWS", accent: "blue" }, { label: "PostgreSQL", short: "PG", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Patient Portal", sub: "Appointments & Records", icon: "person_4", accentClass: "from-teal-400 to-teal-600" },
      { label: "Telehealth Room", sub: "Video Consultation Suite", icon: "video_call", accentClass: "from-cyan-400 to-cyan-600" },
      { label: "Doctor Dashboard", sub: "Patient Queue & EHR", icon: "medical_information", accentClass: "from-teal-400 to-teal-600" },
    ],
  },
  {
    tag: "EdTech", tagColor: "bg-amber-100 text-amber-700",
    title: "LMS Platform", desc: "Advanced e-learning ecosystem with AI progress tracking.",
    heroTitle: "Learning Management System", heroSubtitle: "Adaptive e-learning platform with AI-powered progress tracking, live cohort classes, certification engine, and marketplace for course creators.",
    badge: "AI-Powered Learning OS", accentColor: "amber",
    stats: [{ val: 1, suf: "M+", label: "Learners" }, { val: 92, suf: "%", label: "Completion Rate" }, { val: 500, suf: "+", label: "Course Types" }],
    features: [
      { icon: "play_lesson", title: "Interactive Courses", desc: "Video lessons, quizzes, coding sandboxes, and SCORM-compliant content in one canvas.", accent: "orange" },
      { icon: "groups", title: "Live Cohort Classes", desc: "Scheduled live sessions with breakout rooms, whiteboard, and recording playback.", accent: "blue" },
      { icon: "psychology", title: "AI Tutor", desc: "Personalised learning paths that adapt to each learner's pace, gaps, and goals.", accent: "orange" },
      { icon: "workspace_premium", title: "Certifications", desc: "Blockchain-verified certificates with LinkedIn sharing and employer verification portal.", accent: "blue" },
      { icon: "storefront", title: "Course Marketplace", desc: "Creator tools for educators to publish, price, and market courses to global learners.", accent: "orange" },
      { icon: "leaderboard", title: "Gamification", desc: "Points, badges, streaks, and leaderboards that boost daily active learning habits.", accent: "blue" },
    ],
    benefits: [
      { title: "92% Completion Rate", desc: "AI-adaptive nudges and social accountability features dramatically improve course finishing." },
      { title: "Creator Economy Ready", desc: "Revenue sharing, course bundles, and subscription tiers for independent educators." },
      { title: "Enterprise LMS", desc: "SSO, custom branding, advanced reporting, and compliance training workflows for corporates." },
    ],
    marketApps: [
      { title: "Higher Education", desc: "University LMS replacement with existing SIS and library system integrations." },
      { title: "Corporate Training", desc: "Employee onboarding, compliance, and upskilling with HR system sync." },
      { title: "EdTech Startups", desc: "Complete marketplace infrastructure to monetize expert knowledge at scale." },
    ],
    techStack: [
      { label: "Next.js", short: "Nx", accent: "blue" }, { label: "Python AI", short: "Py", accent: "orange" },
      { label: "HLS Video", short: "HLS", accent: "blue" }, { label: "WebRTC", short: "RTC", accent: "orange" },
      { label: "Elasticsearch", short: "ES", accent: "blue" }, { label: "AWS S3", short: "S3", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Student Dashboard", sub: "Progress & Courses", icon: "school", accentClass: "from-amber-400 to-amber-600" },
      { label: "Live Classroom", sub: "Cohort Learning Suite", icon: "cast_for_education", accentClass: "from-orange-400 to-orange-600" },
      { label: "Creator Studio", sub: "Course Builder & Analytics", icon: "edit_note", accentClass: "from-amber-400 to-amber-600" },
    ],
  },
  {
    tag: "PropTech", tagColor: "bg-indigo-100 text-indigo-700",
    title: "Real Estate", desc: "Property matching engine with virtual tour integration.",
    heroTitle: "Real Estate Marketplace", heroSubtitle: "AI-powered property discovery platform with virtual tours, mortgage calculators, smart matching, and end-to-end transaction management.",
    badge: "PropTech AI Engine", accentColor: "indigo",
    stats: [{ val: 1, suf: "M+", label: "Listings" }, { val: 85, suf: "%", label: "Match Accuracy" }, { val: 48, suf: "hr", label: "Avg. Closure" }],
    features: [
      { icon: "search", title: "AI Property Match", desc: "Semantic property search with lifestyle-based matching beyond bedrooms and budget.", accent: "orange" },
      { icon: "view_in_ar", title: "Virtual Tours", desc: "Immersive 3D walkthroughs and AR furniture placement for remote property viewing.", accent: "blue" },
      { icon: "calculate", title: "Mortgage Calculator", desc: "Real-time EMI calculations with bank integration for instant pre-approval offers.", accent: "orange" },
      { icon: "gavel", title: "Legal Workflow", desc: "Integrated title checks, e-stamp duty, and digital document signing workflows.", accent: "blue" },
      { icon: "price_check", title: "Valuation Engine", desc: "Automated property valuation using comparable sales, location scores, and market trends.", accent: "orange" },
      { icon: "handshake", title: "Agent CRM", desc: "Pipeline management, lead scoring, and automated follow-up for property agents.", accent: "blue" },
    ],
    benefits: [
      { title: "AI-Powered Discovery", desc: "Lifestyle matching reduces irrelevant listings by 70%, speeding up the search journey." },
      { title: "Virtual-First Viewings", desc: "3D tours reduce physical viewings needed before offer by an average of 60%." },
      { title: "End-to-End Transactions", desc: "From search to registry — handle the entire property journey on one platform." },
    ],
    marketApps: [
      { title: "Residential Portals", desc: "Consumer-facing marketplace for buying, selling, and renting residential property." },
      { title: "Commercial Real Estate", desc: "Office, retail, and industrial space leasing with floor-plan management." },
      { title: "Developer Sales Offices", desc: "New project launches with virtual site visits and CRM for pre-sales teams." },
    ],
    techStack: [
      { label: "React", short: "Re", accent: "blue" }, { label: "Python ML", short: "ML", accent: "orange" },
      { label: "Three.js", short: "3D", accent: "blue" }, { label: "Mapbox GL", short: "MB", accent: "orange" },
      { label: "Elasticsearch", short: "ES", accent: "blue" }, { label: "AWS S3", short: "S3", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Search & Discovery", sub: "AI Property Matching", icon: "search", accentClass: "from-indigo-400 to-indigo-600" },
      { label: "Virtual Tour", sub: "3D Property Viewer", icon: "view_in_ar", accentClass: "from-violet-400 to-violet-600" },
      { label: "Agent CRM", sub: "Deal Pipeline & Leads", icon: "contacts", accentClass: "from-indigo-400 to-indigo-600" },
    ],
  },
  {
    tag: "Social", tagColor: "bg-pink-100 text-pink-700",
    title: "Social Media", desc: "High-concurrency community platform for creators.",
    heroTitle: "Social Media Platform", heroSubtitle: "High-concurrency creator community platform with short-form video, live streaming, monetisation tools, and federated social graph.",
    badge: "Creator-First Social OS", accentColor: "pink",
    stats: [{ val: 10, suf: "M+", label: "Concurrent Users" }, { val: 99, suf: "%", label: "Feed Accuracy" }, { val: 500, suf: "ms", label: "Feed Load" }],
    features: [
      { icon: "smart_display", title: "Short-Form Video", desc: "TikTok-style vertical feed with AI-curated FYP, duets, and stitching tools.", accent: "orange" },
      { icon: "live_tv", title: "Live Streaming", desc: "Low-latency HLS live streaming with real-time gifting, polls, and Q&A.", accent: "blue" },
      { icon: "paid", title: "Creator Monetisation", desc: "Tips, subscriptions, paid DMs, brand deal marketplace, and affiliate links.", accent: "orange" },
      { icon: "group", title: "Communities", desc: "Interest-based spaces with moderation tools, events, and member tiers.", accent: "blue" },
      { icon: "auto_awesome", title: "AI Content Tools", desc: "In-app video editing, caption generation, hashtag AI, and content scheduling.", accent: "orange" },
      { icon: "verified", title: "Trust & Safety", desc: "Real-time CSAM detection, copyright protection, and transparent moderation appeals.", accent: "blue" },
    ],
    benefits: [
      { title: "10M+ Concurrent Scale", desc: "Distributed architecture handles viral moments without degradation or throttling." },
      { title: "Creator-First Economics", desc: "Industry-leading revenue share with direct fan monetisation across all content types." },
      { title: "Federated Identity", desc: "ActivityPub support lets users carry their social graph across platforms." },
    ],
    marketApps: [
      { title: "Niche Creator Platforms", desc: "Vertical communities for fitness, music, gaming, or professional networks." },
      { title: "Brand Communities", desc: "Owned social spaces that build first-party data and reduce platform dependency." },
      { title: "Fan Club Platforms", desc: "Exclusive content, merch drops, and direct access for artists and athletes." },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" }, { label: "Go", short: "Go", accent: "orange" },
      { label: "Cassandra", short: "DB", accent: "blue" }, { label: "FFmpeg", short: "FF", accent: "orange" },
      { label: "Kafka", short: "KF", accent: "blue" }, { label: "Cloudflare", short: "CF", accent: "orange" },
    ],
    portfolioItems: [
      { label: "Social Feed", sub: "Personalised Discovery", icon: "smart_display", accentClass: "from-pink-400 to-pink-600" },
      { label: "Creator Studio", sub: "Monetisation & Analytics", icon: "video_camera_front", accentClass: "from-rose-400 to-rose-600" },
      { label: "Live Stage", sub: "Streaming & Gifting", icon: "live_tv", accentClass: "from-pink-400 to-pink-600" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// STAT COUNTER COMPONENT
// ═══════════════════════════════════════════════════════════════
function StatCounter({ val, suf, label }: StatItem) {
  const [ref, visible] = useInView(0.5);
  const count = useCountUp(val, 1800, visible);
  return (
    <div ref={ref}>
      <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-bold text-stone-900">
        {count}<span className="text-orange-500">{suf}</span>
      </p>
      <p className="text-xs text-stone-400 mt-0.5 font-medium">{label}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NAV COMPONENT
// ═══════════════════════════════════════════════════════════════
function Nav({ onLogoClick, onBack }: { onLogoClick: () => void; onBack?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/85 backdrop-blur-2xl shadow-sm border-b border-stone-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200">
            <span className="text-white text-xs font-bold">NA</span>
          </div>
          <span style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-stone-900 tracking-tight">Neural Amber</span>
        </button>
        <div className="hidden md:flex items-center gap-7">
          {["Home", "Solutions", "Services", "Case Studies", "Contact"].map((item, i) => (
            <button key={item} onClick={i === 0 || i === 1 ? onLogoClick : undefined}
              className={`text-sm font-medium transition-all duration-200 relative group ${i === 1 ? "text-orange-600" : "text-stone-500 hover:text-stone-900"}`}>
              {item}
              <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-orange-500 transition-all duration-300 ${i === 1 ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="hidden md:flex items-center gap-1.5 text-stone-500 hover:text-orange-600 text-sm font-medium transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> Back
            </button>
          )}
          <button className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-lg shadow-orange-200 hover:scale-105 hover:shadow-orange-300 active:scale-95 transition-all duration-200">
            {onBack ? "Hire Developers" : "Get Started"}
          </button>
          <button className="md:hidden p-2 rounded-lg text-stone-600" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
      <div className={`md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-100 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-60" : "max-h-0"}`}>
        {["Home", "Solutions", "Services", "Case Studies", "Contact"].map((item) => (
          <a key={item} href="#" className="block px-6 py-3 text-sm font-medium text-stone-600 hover:text-orange-600">{item}</a>
        ))}
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// FOOTER COMPONENT
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-14">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">NA</span>
            </div>
            <span style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-white">Neural Amber</span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed mb-6 max-w-xs">Architecting the next generation of intelligent digital solutions for world-class enterprises.</p>
          <div className="flex gap-3">
            {["public", "share"].map((icon) => (
              <div key={icon} className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group">
                <span className="material-symbols-outlined text-stone-400 group-hover:text-white transition-colors" style={{ fontSize: 16 }}>{icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-white font-bold mb-5 text-sm">Solutions</h5>
          <ul className="space-y-3">
            {["Taxi App", "FinTech", "E-commerce", "Healthcare"].map((l) => (
              <li key={l} className="text-stone-500 hover:text-orange-400 hover:translate-x-1 transition-all cursor-pointer text-sm">{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-5 text-sm">Company</h5>
          <ul className="space-y-3">
            {["About Us", "Team", "Careers", "Press"].map((l) => (
              <li key={l} className="text-stone-500 hover:text-orange-400 hover:translate-x-1 transition-all cursor-pointer text-sm">{l}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h5 className="text-white font-bold mb-3 text-sm">Newsletter</h5>
          <p className="text-xs text-stone-500 mb-4">Get the latest insights on AI and digital transformation.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-orange-500 transition-colors" />
            <button className="w-11 h-11 rounded-xl bg-orange-500 hover:bg-orange-400 transition-colors flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-stone-500 text-sm">© 2024 Neural Amber. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((l) => (
            <span key={l} className="text-stone-500 hover:text-orange-400 cursor-pointer text-sm transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
// SOLUTION DETAIL PAGE
// ═══════════════════════════════════════════════════════════════
function SolutionDetailPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredMarket, setHoveredMarket] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [project]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <CursorGlow />
      <Nav onLogoClick={onBack} onBack={onBack} />

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-[#faf8f5] to-sky-50/30" />
          <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-orange-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #ea640a 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }} />

          <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-24">
            <div className="space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-70" style={{ animation: "pulseRing 1.6s infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </span>
                  {project.badge}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-7xl font-bold leading-[0.92] tracking-tight text-stone-900">
                  {project.heroTitle.split(" ").slice(0, -1).join(" ")}<br />
                  <span className="text-orange-500">{project.heroTitle.split(" ").slice(-1)}</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg text-stone-500 max-w-lg leading-relaxed">{project.heroSubtitle}</p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                    Start Your Project →
                  </button>
                  <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-base hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                    View Demo
                  </button>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="flex gap-8 pt-4">
                  {project.stats.map((s) => <StatCounter key={s.label} {...s} />)}
                </div>
              </Reveal>
            </div>

            {/* Hero visual card */}
            <Reveal delay={150} direction="right" className="hidden lg:flex justify-center items-center">
              <div className="relative" style={{ width: 380, height: 520 }}>
                <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-orange-200" style={{ margin: -40, animation: "spinSlow 22s linear infinite" }} />
                <div className="absolute inset-0 rounded-full border border-orange-100/60" style={{ margin: -80, animation: "spinSlow 16s linear infinite reverse" }} />
                <div className="relative z-10 w-full h-full bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50 overflow-hidden flex flex-col" style={{ animation: "floatY 5s ease-in-out infinite" }}>
                  {/* Visual header */}
                  <div className="flex-1 bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(45deg, #ea640a 25%, transparent 25%), linear-gradient(-45deg, #ea640a 25%, transparent 25%)", backgroundSize: "32px 32px" }} />
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-70" style={{ animation: "scanLine 2.5s linear infinite" }} />
                    <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/80 backdrop-blur flex items-center justify-center shadow-xl">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 48 }}>{project.features[0]?.icon || "rocket_launch"}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-[10px] font-bold text-stone-700">{project.tag}</span>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="p-5 space-y-3">
                    <h3 style={{ fontFamily: "'Fraunces', serif" }} className="font-bold text-stone-900">{project.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{project.desc}</p>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ animation: "shimBar 2s ease-in-out infinite" }} />
                    </div>
                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200">
                      Explore Features
                    </button>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white shadow-xl shadow-stone-200 rounded-2xl p-3.5 flex items-center gap-2.5 border border-stone-50 z-20" style={{ animation: "badgePop .6s cubic-bezier(.34,1.56,.64,1) 600ms both" }}>
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sky-500" style={{ fontSize: 20 }}>{project.features[1]?.icon || "star"}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">{project.features[1]?.title || "Feature"}</p>
                    <p className="text-[9px] text-stone-400">Core module</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white shadow-xl shadow-stone-200 rounded-2xl p-3.5 flex items-center gap-2.5 border border-stone-50 z-20" style={{ animation: "badgePop .6s cubic-bezier(.34,1.56,.64,1) 800ms both" }}>
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 20 }}>{project.features[2]?.icon || "settings"}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-800">{project.features[2]?.title || "Module"}</p>
                    <p className="text-[9px] text-stone-400">Enterprise ready</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section className="py-24 px-6 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-4" direction="left">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Overview</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900 leading-tight mb-6">About This<br />Solution</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={150} direction="right">
              <p className="text-xl text-stone-500 leading-relaxed mb-8">
                Our Neural Amber <strong className="text-stone-700">{project.title}</strong> solution is a scalable ecosystem built for enterprise demands. We prioritize performance, security, and developer experience — so your team ships faster and your users stay engaged.
              </p>
              <div className="space-y-4">
                {project.features.slice(0, 4).map((f, i) => (
                  <ProgressBar key={f.title} pct={[98, 94, 99, 88][i]} label={f.title} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Capabilities</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900 mb-4">Core Ecosystem Features</h2>
              <p className="text-stone-400 max-w-xl mx-auto">Engineered for reliability, designed for human connection.</p>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <div
                    className="group relative bg-white rounded-3xl p-8 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-50 transition-all duration-350 cursor-default overflow-hidden"
                    onMouseEnter={() => setHoveredFeature(i)} onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                    <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${f.accent === "orange" ? "bg-gradient-to-r from-orange-400 to-orange-600" : "bg-gradient-to-r from-sky-400 to-sky-600"}`} />
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${f.accent === "orange" ? "bg-orange-50 group-hover:bg-orange-100" : "bg-sky-50 group-hover:bg-sky-100"}`}>
                        <span className={`material-symbols-outlined text-2xl ${f.accent === "orange" ? "text-orange-500" : "text-sky-500"}`}>{f.icon}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                    {hoveredFeature === i && (
                      <div className={`absolute bottom-4 right-4 ${f.accent === "orange" ? "text-orange-400" : "text-sky-400"}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_outward</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="py-20 px-6 bg-white border-y border-stone-100 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <Reveal><p className="text-center text-orange-500 font-bold tracking-[0.3em] text-xs uppercase mb-12">Powered By Neural Stack</p></Reveal>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {project.techStack.map((t, i) => (
                <Reveal key={t.label} delay={i * 60}>
                  <div className="group flex items-center gap-3 cursor-default">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${t.accent === "orange" ? "bg-orange-50 text-orange-600 group-hover:bg-orange-100 group-hover:shadow-orange-200" : "bg-sky-50 text-sky-600 group-hover:bg-sky-100 group-hover:shadow-sky-200"}`}>
                      {t.short}
                    </div>
                    <span className="text-sm font-semibold text-stone-500 group-hover:text-stone-800 transition-colors">{t.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS + MARKET */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
            <Reveal direction="left">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900 mb-10 leading-tight">Why Enterprise<br />Choose Our Framework</h2>
              <div className="space-y-8">
                {project.benefits.map((b) => (
                  <div key={b.title} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300 mt-0.5">
                      <span className="material-symbols-outlined text-orange-500 group-hover:text-white transition-colors duration-300" style={{ fontSize: 16, fontVariationSettings: "'wght' 700" }}>check</span>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-stone-900 mb-2">{b.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150} direction="right">
              <div className="bg-white rounded-3xl p-10 border border-stone-100 shadow-lg shadow-stone-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2">Verticals</p>
                  <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-bold text-stone-900 mb-7">Market Applications</h3>
                  <ul className="space-y-4">
                    {project.marketApps.map((m, i) => (
                      <li key={m.title} className={`p-5 rounded-2xl border-2 cursor-default transition-all duration-300 ${hoveredMarket === i ? "border-orange-300 bg-orange-50 shadow-md shadow-orange-50" : "border-stone-100 hover:border-orange-200"}`}
                        onMouseEnter={() => setHoveredMarket(i)} onMouseLeave={() => setHoveredMarket(null)}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-stone-900 mb-1">{m.title}</p>
                            <p className="text-sm text-stone-400">{m.desc}</p>
                          </div>
                          <span className={`material-symbols-outlined transition-all duration-300 flex-shrink-0 ml-3 mt-0.5 ${hoveredMarket === i ? "text-orange-500 rotate-45" : "text-stone-300"}`} style={{ fontSize: 18 }}>arrow_outward</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="py-28 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
              <div>
                <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Gallery</p>
                <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900 mb-3">Solution in Action</h2>
                <p className="text-stone-400 max-w-xl">A closer look at the precision-engineered interface of our deployment-ready solution.</p>
              </div>
              <button className="flex items-center gap-2 group text-orange-600 font-bold text-sm flex-shrink-0">
                <span>View Full Portfolio</span>
                <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform" style={{ fontSize: 20 }}>arrow_right_alt</span>
              </button>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.portfolioItems.map((p, i) => (
                <Reveal key={p.sub} delay={i * 80}>
                  <div className={`group relative overflow-hidden rounded-3xl bg-stone-100 cursor-pointer ${i === 1 ? "md:mt-10" : ""}`} style={{ aspectRatio: "4/5" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100" />
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(45deg, #ea640a 25%, transparent 25%), linear-gradient(-45deg, #ea640a 25%, transparent 25%)", backgroundSize: "40px 40px" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-stone-600 group-hover:text-white transition-colors" style={{ fontSize: 32 }}>{p.icon}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <p className={`bg-gradient-to-r ${p.accentClass} bg-clip-text text-transparent font-bold text-[10px] uppercase tracking-widest mb-1.5`}>{p.label}</p>
                      <h4 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-bold text-white drop-shadow-lg">{p.sub}</h4>
                    </div>
                    <div className={`absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r ${p.accentClass}`} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6 bg-[#faf8f5] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-sky-50/30" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #ea640a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <Reveal className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-200 p-14 md:p-20 text-center overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-100 rounded-full blur-3xl" />
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-sky-50 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block px-5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-8">Ready to Build?</div>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                Want to build this<br /><span className="text-orange-500">custom solution?</span>
              </h2>
              <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Our architects are ready to help you blueprint, build, and scale your next high-impact digital venture.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">Contact Our Architects →</button>
                <button className="px-10 py-5 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-lg hover:border-orange-300 hover:text-orange-600 transition-all duration-300">Schedule a Demo</button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════
function HomePage({ onProjectClick }: { onProjectClick: (project: Project) => void }) {
  const [filter, setFilter] = useState("All");
  const [statsRef, statsVisible] = useInView();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const STATS_DATA = [
    { value: 250, suffix: "+", label: "Projects Shipped" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 40, suffix: "+", label: "Countries Served" },
    { value: 12, suffix: "yrs", label: "Industry Experience" },
  ];

  const statVals = STATS_DATA.map((s) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    val: useCountUp(s.value, 2200, statsVisible),
    ...s,
  }));

  const FILTER_MAP: Record<string, string[]> = {
    Web: ["E-commerce", "Healthcare Portal", "LMS Platform", "Real Estate", "Social Media"],
    Mobile: ["Taxi Booking App", "Food Delivery"],
    SaaS: ["Restaurant MS", "FinTech Wallet"],
  };

  const filteredProjects = filter === "All" ? PROJECTS : PROJECTS.filter((p) => FILTER_MAP[filter]?.includes(p.title));

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 overflow-x-hidden selection:bg-orange-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <CursorGlow />
      <Nav onLogoClick={() => {}} />

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-[#faf8f5] to-amber-50/40" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100 to-transparent rounded-full opacity-60 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100 to-transparent rounded-full opacity-40 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
            <div className="space-y-8">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" style={{ animation: "pulseRing 1.5s infinite" }} />
                    <span className="relative h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  Next-Gen Infrastructure
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-6xl md:text-[80px] font-bold tracking-tight leading-[0.95]">
                  <span className="text-stone-900">Our IT</span><br />
                  <Typewriter words={["Solutions.", "Services.", "Innovation.", "Expertise."]} />
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg text-stone-500 max-w-lg leading-relaxed font-light">Innovative technology solutions engineered to scale your enterprise and accelerate intelligence across every vertical.</p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                    Contact Us →
                  </button>
                  <button className="px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold text-base hover:border-orange-300 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                    Explore Labs
                  </button>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2">
                    {["🧑‍💻", "👩‍💼", "👨‍🔬", "👩‍🎨"].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 border-2 border-white flex items-center justify-center text-sm">{e}</div>
                    ))}
                  </div>
                  <p className="text-sm text-stone-500">Trusted by <span className="text-stone-800 font-semibold">500+</span> enterprises worldwide</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} direction="right">
              <div className="relative hidden lg:flex justify-center items-center" style={{ height: 500 }}>
                <div className="absolute w-[420px] h-[420px] rounded-full border-[1.5px] border-orange-200 border-dashed" style={{ animation: "spinSlow 20s linear infinite" }} />
                <div className="absolute w-[340px] h-[340px] rounded-full border border-orange-100" style={{ animation: "spinSlow 14s linear infinite reverse" }} />
                <div className="relative w-72 rounded-3xl bg-white shadow-2xl shadow-orange-100 border border-orange-50 p-8 z-10" style={{ animation: "floatY 6s ease-in-out infinite" }}>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-5 shadow-lg shadow-orange-200">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>psychology</span>
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif" }} className="font-bold text-stone-900 text-xl mb-2">AI & ML</h3>
                  <p className="text-stone-500 text-sm">Deep learning models for predictive intelligence at scale.</p>
                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-orange-100 overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: "78%", animation: "shimBar 2s ease-in-out infinite" }} />
                    </div>
                    <span className="text-xs font-bold text-orange-500">78%</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">Model Accuracy</p>
                </div>
                <div className="absolute top-8 right-4 bg-white shadow-lg shadow-stone-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-stone-50 z-20">
                  <span className="text-lg">🚀</span>
                  <div><p className="text-xs font-bold text-stone-800">250+ Projects</p><p className="text-[10px] text-stone-400">Delivered</p></div>
                </div>
                <div className="absolute bottom-12 left-0 bg-white shadow-lg shadow-stone-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-stone-50 z-20">
                  <span className="text-lg">⭐</span>
                  <div><p className="text-xs font-bold text-stone-800">4.9 / 5.0</p><p className="text-[10px] text-stone-400">Client Rating</p></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 bg-white border-y border-stone-100">
          <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {statVals.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="text-center">
                <p style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-bold text-stone-900">
                  {s.val}<span className="text-orange-500">{s.suffix}</span>
                </p>
                <p className="text-sm text-stone-400 mt-1 font-medium">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SOLUTIONS GRID */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-16">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">What We Do</p>
                  <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900 leading-tight">Trending<br />Solutions</h2>
                </div>
                <p className="hidden md:block text-stone-400 max-w-xs text-sm leading-relaxed">Powering the next generation of digital transformation with specialized expertise.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SOLUTIONS.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div
                    className="group relative bg-white rounded-2xl p-6 border border-stone-100 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350 cursor-default overflow-hidden"
                    onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-4 transition-colors duration-300">
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>{s.icon}</span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-800 mb-1.5 leading-tight">{s.title}</h3>
                      <p className="text-xs text-stone-400 leading-relaxed">{s.desc}</p>
                    </div>
                    {hoveredCard === i && (
                      <div className="absolute bottom-3 right-3">
                        <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 16 }}>arrow_outward</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                  <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Portfolio</p>
                  <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900">Project Ideas<br />&amp; Use Cases</h2>
                </div>
                <div className="flex gap-1.5 bg-stone-50 p-1.5 rounded-2xl border border-stone-100">
                  {["All", "Web", "Mobile", "SaaS"].map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-250 ${filter === f ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200" : "text-stone-500 hover:text-stone-800"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div
                    onClick={() => onProjectClick(p)}
                    className="group relative overflow-hidden rounded-3xl bg-stone-50 border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 hover:-translate-y-1.5 transition-all duration-350 cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${p.tagColor}`}>{p.tag}</span>
                        <span className="material-symbols-outlined text-stone-300 group-hover:text-orange-400 group-hover:rotate-45 transition-all duration-300" style={{ fontSize: 20 }}>arrow_outward</span>
                      </div>
                      <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-bold text-stone-900 mb-3">{p.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{p.desc}</p>
                      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-orange-500 text-sm font-semibold">View Solution</span>
                        <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 16 }}>east</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="py-28 px-6 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-stone-900 to-stone-800 shadow-2xl shadow-stone-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="relative grid lg:grid-cols-2 gap-0">
                  <div className="p-12 md:p-20 flex flex-col justify-center">
                    <span className="text-orange-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">Featured Highlight</span>
                    <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Uber-Style<br />Mobility Platform</h2>
                    <ul className="space-y-4 mb-10">
                      {["Real-time GPS tracking & route optimization", "Integrated Driver/User ecosystem", "Seamless multi-currency payment gateways"].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check</span>
                          </div>
                          <span className="text-stone-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onProjectClick(PROJECTS[0])}
                      className="w-fit px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-900/30 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      View Details →
                    </button>
                  </div>
                  <div className="hidden lg:flex items-center justify-center p-12">
                    <div className="relative w-56 bg-white rounded-[2rem] p-4 shadow-2xl" style={{ animation: "floatY 7s ease-in-out infinite" }}>
                      <div className="bg-stone-900 rounded-[1.5rem] p-3 overflow-hidden">
                        <div className="bg-gradient-to-b from-orange-500 to-orange-700 rounded-xl h-32 mb-3 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white" style={{ fontSize: 40 }}>map</span>
                        </div>
                        <div className="space-y-2 px-1">
                          <div className="h-2 w-3/4 rounded bg-stone-700" />
                          <div className="h-2 w-1/2 rounded bg-stone-700" />
                          <div className="mt-3 bg-orange-500 rounded-xl p-2 text-center"><span className="text-white text-xs font-bold">Book Ride</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3">Why Us</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl font-bold text-stone-900">Why Choose Us</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "groups", title: "Expert Team", desc: "Vetted engineers from top global tech ecosystems." },
                { icon: "trending_up", title: "Scalable Solutions", desc: "Architectures that grow seamlessly with your demand." },
                { icon: "lock_open", title: "Secure Systems", desc: "Security-first mindset in every line of code." },
                { icon: "support_agent", title: "24/7 Support", desc: "Global monitoring and concierge engineering support." },
              ].map((r, i) => (
                <Reveal key={r.title} delay={i * 100}>
                  <div className="group text-center bg-stone-50 border border-stone-100 rounded-3xl p-8 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-50 transition-all duration-350">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-stone-100 group-hover:border-orange-200 group-hover:shadow-md flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                      <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 28 }}>{r.icon}</span>
                    </div>
                    <h4 style={{ fontFamily: "'Fraunces', serif" }} className="font-bold text-xl text-stone-900 mb-3">{r.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 bg-[#faf8f5] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-amber-50" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <Reveal className="relative max-w-4xl mx-auto text-center">
            <div className="inline-block px-5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-8">Ready to Scale?</div>
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-6xl md:text-8xl font-bold text-stone-900 leading-[0.92] tracking-tight mb-8">
              Start your<br /><span className="text-orange-500">project today</span>
            </h2>
            <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto font-light">Join the ranks of high-growth enterprises leveraging Neural Amber to define the future of their industries.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-12 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300">Contact Us →</button>
              <button className="px-10 py-5 rounded-2xl border-2 border-stone-200 text-stone-600 font-bold text-lg hover:border-orange-300 hover:text-orange-600 transition-all duration-300">See our work</button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default function SolutionDetail() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setCurrentProject(project);
    window.scrollTo({ top: 0 });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentProject(null);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {/* Global fonts, icons & keyframes */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <style>{`
        @keyframes spinSlow  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2);opacity:0} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes shimBar   { 0%,100%{opacity:.6;transform:scaleX(.95)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes badgePop  { 0%{transform:scale(.8) translateY(8px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        * { box-sizing: border-box; margin: 0; }
      `}</style>

      {currentProject ? (
        <SolutionDetailPage project={currentProject} onBack={handleBack} />
      ) : (
        <HomePage onProjectClick={handleProjectClick} />
      )}
    </>
  );
}