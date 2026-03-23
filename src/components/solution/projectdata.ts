// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
  accent: "orange" | "blue";
}
export interface BenefitItem {
  title: string;
  desc: string;
}
export interface MarketItem {
  title: string;
  desc: string;
}
export interface TechItem {
  label: string;
  short: string;
  accent: "orange" | "blue";
}
export interface StatItem {
  val: number;
  suf: string;
  label: string;
}
export interface PortfolioItem {
  label: string;
  sub: string;
  icon: string;
  accentClass: string;
}

export interface Project {
  slug: string; // used in URL:  /solution/:slug
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  stats: StatItem[];
  features: FeatureItem[];
  benefits: BenefitItem[];
  marketApps: MarketItem[];
  techStack: TechItem[];
  portfolioItems: PortfolioItem[];
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    slug: "taxi-booking-app",
    tag: "Mobile App",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Taxi Booking App",
    desc: "A full-scale mobility platform with real-time routing and driver logistics.",
    heroTitle: "Taxi Booking App",
    heroSubtitle:
      "Engineer seamless mobility experiences with enterprise-grade orchestration, secure payments, and intuitive driver-rider matching.",
    badge: "High-Performance Solution",
    stats: [
      { val: 98, suf: "%", label: "Uptime SLA" },
      { val: 40, suf: "+", label: "Markets" },
      { val: 2, suf: "M+", label: "Rides/Day" },
    ],
    features: [
      {
        icon: "map",
        title: "Live Tracking",
        desc: "Real-time GPS sync using advanced WebSocket protocols for zero-lag location updates.",
        accent: "orange",
      },
      {
        icon: "shield_with_heart",
        title: "Secure Payments",
        desc: "Multi-gateway integration with end-to-end encryption for PCI-compliant transactions.",
        accent: "blue",
      },
      {
        icon: "dashboard_customize",
        title: "Admin Dashboard",
        desc: "Central command to monitor fleet metrics, revenue, and user analytics in real-time.",
        accent: "orange",
      },
      {
        icon: "smart_toy",
        title: "Smart Dispatch",
        desc: "AI-driven algorithms to minimize wait times by matching the closest optimal driver.",
        accent: "blue",
      },
      {
        icon: "notifications_active",
        title: "Instant Alerts",
        desc: "Smart push notifications for ride updates, promotions, and driver communications.",
        accent: "orange",
      },
      {
        icon: "history",
        title: "Ride History",
        desc: "Detailed logging of past journeys with downloadable invoices and rating capabilities.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "99.9% System Uptime",
        desc: "Cloud-native infrastructure ensures your mobility business never sleeps during peak demand.",
      },
      {
        title: "Reduced Time-to-Market",
        desc: "Pre-built core components allow you to launch your solution in weeks, not months.",
      },
      {
        title: "Omni-Channel Experience",
        desc: "Unified experience across iOS, Android, and Web with shared business logic.",
      },
    ],
    marketApps: [
      {
        title: "Corporate Shuttles",
        desc: "Efficient route management for enterprise employee transportation.",
      },
      {
        title: "Private Chauffeur Services",
        desc: "High-end booking luxury with specialized driver requirements.",
      },
      {
        title: "Regional Taxi Fleets",
        desc: "Digital transformation for traditional meter-based taxi companies.",
      },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" },
      { label: "Node.js", short: "JS", accent: "orange" },
      { label: "MongoDB", short: "DB", accent: "blue" },
      { label: "Firebase", short: "FB", accent: "orange" },
      { label: "Mapbox", short: "MB", accent: "blue" },
      { label: "AWS Lambda", short: "λ", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Passenger Interface",
        sub: "Dynamic Pricing Engine",
        icon: "smartphone",
        accentClass: "from-orange-400 to-orange-600",
      },
      {
        label: "Operations Hub",
        sub: "Real-time Analytics",
        icon: "dashboard",
        accentClass: "from-sky-400 to-sky-600",
      },
      {
        label: "Driver Portal",
        sub: "Earning Projections",
        icon: "directions_car",
        accentClass: "from-orange-400 to-orange-600",
      },
    ],
  },
  {
    slug: "job-portal",
    tag: "HRTech",
    tagColor: "bg-cyan-100 text-cyan-700",
    title: "Job Portal",
    desc: "Advanced recruitment platform with AI-powered job matching.",
    heroTitle: "Smart Job Portal Platform",
    heroSubtitle:
      "End-to-end hiring ecosystem connecting employers and job seekers with AI-driven matching, resume parsing, and applicant tracking.",
    badge: "AI Recruitment Engine",

    stats: [
      { val: 1, suf: "M+", label: "Candidates" },
      { val: 50, suf: "K+", label: "Jobs Listed" },
      { val: 85, suf: "%", label: "Match Accuracy" },
    ],

    features: [
      {
        icon: "search",
        title: "Smart Job Search",
        desc: "AI-powered search with filters, recommendations, and skill-based matching.",
        accent: "orange",
      },
      {
        icon: "description",
        title: "Resume Parser",
        desc: "Automatically extract skills, experience, and education from resumes.",
        accent: "blue",
      },
      {
        icon: "business_center",
        title: "Employer Dashboard",
        desc: "Manage job posts, applicants, and hiring pipeline efficiently.",
        accent: "orange",
      },
      {
        icon: "groups",
        title: "Applicant Tracking",
        desc: "Track candidate progress with interview stages and feedback.",
        accent: "blue",
      },
      {
        icon: "notifications",
        title: "Job Alerts",
        desc: "Real-time notifications for new job matches and application updates.",
        accent: "orange",
      },
      {
        icon: "insights",
        title: "Analytics",
        desc: "Hiring insights, candidate trends, and performance metrics.",
        accent: "blue",
      },
    ],

    benefits: [
      {
        title: "Faster Hiring",
        desc: "Reduce hiring time with AI-based candidate shortlisting.",
      },
      {
        title: "Better Matches",
        desc: "Skill-based matching ensures higher job relevance.",
      },
      {
        title: "Scalable Hiring",
        desc: "Handle thousands of applicants with ease.",
      },
    ],

    marketApps: [
      {
        title: "Corporate Hiring",
        desc: "Enterprise recruitment with ATS integration.",
      },
      {
        title: "Freelance Platforms",
        desc: "Gig-based hiring for remote professionals.",
      },
      {
        title: "Startup Hiring",
        desc: "Fast hiring tools for growing startups.",
      },
    ],

    techStack: [
      { label: "React", short: "Re", accent: "blue" },
      { label: "Node.js", short: "JS", accent: "orange" },
      { label: "MongoDB", short: "DB", accent: "blue" },
      { label: "ElasticSearch", short: "ES", accent: "orange" },
      { label: "Firebase", short: "FB", accent: "blue" },
      { label: "AWS", short: "AWS", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Candidate Dashboard",
        sub: "Profile & Applications",
        icon: "person",
        accentClass: "from-cyan-400 to-cyan-600",
      },
      {
        label: "Recruiter Panel",
        sub: "Job & Applicant Management",
        icon: "business_center",
        accentClass: "from-blue-400 to-blue-600",
      },
      {
        label: "Analytics Dashboard",
        sub: "Hiring Insights",
        icon: "bar_chart",
        accentClass: "from-cyan-400 to-cyan-600",
      },
    ],
  },

  {
    slug: "restaurant-management",
    tag: "SaaS",
    tagColor: "bg-orange-100 text-orange-600",
    title: "Restaurant MS",
    desc: "End-to-end POS and inventory management for hospitality chains.",
    heroTitle: "Restaurant Management System",
    heroSubtitle:
      "A complete hospitality technology stack — from table reservations and POS to kitchen display systems and loyalty programs.",
    badge: "Enterprise SaaS Platform",
    stats: [
      { val: 500, suf: "+", label: "Restaurants" },
      { val: 99, suf: "%", label: "Order Accuracy" },
      { val: 3, suf: "s", label: "Avg. Order Time" },
    ],
    features: [
      {
        icon: "point_of_sale",
        title: "Smart POS",
        desc: "Lightning-fast point-of-sale with offline mode, split bills, and multi-currency support.",
        accent: "orange",
      },
      {
        icon: "inventory_2",
        title: "Inventory Control",
        desc: "Automated stock alerts, supplier ordering, and waste tracking to cut food costs.",
        accent: "blue",
      },
      {
        icon: "table_restaurant",
        title: "Table Management",
        desc: "Visual floor plan with real-time occupancy, reservation slots, and wait-list management.",
        accent: "orange",
      },
      {
        icon: "restaurant_menu",
        title: "Menu Builder",
        desc: "Drag-and-drop menu configurator with seasonal pricing and allergen tagging.",
        accent: "blue",
      },
      {
        icon: "analytics",
        title: "Revenue Analytics",
        desc: "Daily P&L reports, best-seller tracking, and peak-hour forecasting built in.",
        accent: "orange",
      },
      {
        icon: "loyalty",
        title: "Loyalty Engine",
        desc: "Points-based rewards, digital punch cards, and targeted promotional campaigns.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "30% Cost Reduction",
        desc: "Intelligent inventory reduces waste and optimizes supplier negotiations automatically.",
      },
      {
        title: "Faster Table Turnover",
        desc: "Streamlined ordering and payment flows increase covers-per-hour by up to 25%.",
      },
      {
        title: "Multi-Branch Ready",
        desc: "Centralized dashboard manages unlimited branches with role-based access controls.",
      },
    ],
    marketApps: [
      {
        title: "Fine Dining Chains",
        desc: "Elegant reservation flows and sommelier-level menu detail management.",
      },
      {
        title: "QSR & Fast Food",
        desc: "High-throughput counter ordering with kitchen display and drive-through mode.",
      },
      {
        title: "Cloud Kitchens",
        desc: "Multi-brand virtual restaurant management from a single operational hub.",
      },
    ],
    techStack: [
      { label: "React", short: "Re", accent: "blue" },
      { label: "Django", short: "Py", accent: "orange" },
      { label: "PostgreSQL", short: "PG", accent: "blue" },
      { label: "Redis", short: "Rd", accent: "orange" },
      { label: "Stripe", short: "St", accent: "blue" },
      { label: "Docker", short: "Dk", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "POS Interface",
        sub: "Smart Order Management",
        icon: "point_of_sale",
        accentClass: "from-orange-400 to-orange-600",
      },
      {
        label: "Kitchen Display",
        sub: "Real-time Queue System",
        icon: "restaurant",
        accentClass: "from-amber-400 to-amber-600",
      },
      {
        label: "Owner Dashboard",
        sub: "Revenue & Inventory",
        icon: "bar_chart",
        accentClass: "from-orange-400 to-orange-600",
      },
    ],
  },

  {
    slug: "fintech-wallet",
    tag: "Fintech",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "FinTech Wallet",
    desc: "Secure digital banking and peer-to-peer payment architecture.",
    heroTitle: "FinTech Wallet Platform",
    heroSubtitle:
      "Bank-grade digital wallet infrastructure powering P2P transfers, bill payments, investment portfolios, and multi-currency accounts.",
    badge: "Bank-Grade Security",
    stats: [
      { val: 256, suf: "-bit", label: "Encryption" },
      { val: 50, suf: "ms", label: "Settlement Time" },
      { val: 99, suf: "%", label: "Fraud Detection" },
    ],
    features: [
      {
        icon: "account_balance_wallet",
        title: "Digital Wallet",
        desc: "Instant fund loading via bank transfer, card, or UPI with real-time balance updates.",
        accent: "orange",
      },
      {
        icon: "swap_horiz",
        title: "P2P Transfers",
        desc: "Send money to anyone instantly using phone number, QR code, or wallet ID.",
        accent: "blue",
      },
      {
        icon: "currency_exchange",
        title: "Multi-Currency",
        desc: "Hold and convert 50+ currencies at live mid-market rates with minimal spread.",
        accent: "orange",
      },
      {
        icon: "security",
        title: "Fraud Shield",
        desc: "AI-powered transaction monitoring with real-time anomaly detection and 2FA.",
        accent: "blue",
      },
      {
        icon: "trending_up",
        title: "Micro-Investing",
        desc: "Round-up savings and automated portfolio investing starting from ₹1.",
        accent: "orange",
      },
      {
        icon: "receipt_long",
        title: "Bill Payments",
        desc: "One-tap utility bills, subscriptions, and merchant payments via BBPS.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "RBI-Compliant Architecture",
        desc: "Built to meet all regulatory requirements including KYC, AML, and data localisation.",
      },
      {
        title: "Sub-Second Settlements",
        desc: "Proprietary settlement engine processes millions of transactions with zero downtime.",
      },
      {
        title: "Open Banking APIs",
        desc: "Connect to 500+ banks and fintechs via pre-certified API connectors.",
      },
    ],
    marketApps: [
      {
        title: "Neobanks & Challengers",
        desc: "White-label wallet core for launching a digital bank in 30 days.",
      },
      {
        title: "BNPL Providers",
        desc: "Embedded buy-now-pay-later with dynamic credit scoring integration.",
      },
      {
        title: "Remittance Services",
        desc: "Cross-border money transfer with competitive FX rates and compliance.",
      },
    ],
    techStack: [
      { label: "Kotlin", short: "Kt", accent: "blue" },
      { label: "Go", short: "Go", accent: "orange" },
      { label: "Kafka", short: "KF", accent: "blue" },
      { label: "Vault", short: "Vt", accent: "orange" },
      { label: "CockroachDB", short: "DB", accent: "blue" },
      { label: "k8s", short: "K8", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Wallet Dashboard",
        sub: "Balance & Transactions",
        icon: "account_balance_wallet",
        accentClass: "from-emerald-400 to-emerald-600",
      },
      {
        label: "Send Money",
        sub: "P2P Transfer Flow",
        icon: "swap_horiz",
        accentClass: "from-teal-400 to-teal-600",
      },
      {
        label: "Analytics",
        sub: "Spend Intelligence",
        icon: "pie_chart",
        accentClass: "from-emerald-400 to-emerald-600",
      },
    ],
  },

  {
    slug: "ecommerce-platform",
    tag: "E-Commerce",
    tagColor: "bg-purple-100 text-purple-700",
    title: "E-commerce",
    desc: "Headless commerce solution for global retail scaling.",
    heroTitle: "Headless E-Commerce Platform",
    heroSubtitle:
      "API-first commerce engine powering omnichannel retail — from storefront PWAs and mobile apps to voice commerce and IoT devices.",
    badge: "API-First Commerce",
    stats: [
      { val: 10, suf: "M+", label: "SKUs Handled" },
      { val: 99, suf: "%", label: "Cart Success" },
      { val: 120, suf: "+", label: "Integrations" },
    ],
    features: [
      {
        icon: "storefront",
        title: "Headless Storefront",
        desc: "Decoupled frontend delivers blazing-fast PWA shopping experiences on any device.",
        accent: "orange",
      },
      {
        icon: "category",
        title: "Product Catalog",
        desc: "Flexible PIM with unlimited variants, bundles, digital goods, and subscription products.",
        accent: "blue",
      },
      {
        icon: "local_shipping",
        title: "Smart Logistics",
        desc: "Multi-carrier shipping with live rates, auto label generation, and returns portal.",
        accent: "orange",
      },
      {
        icon: "discount",
        title: "Promotions Engine",
        desc: "Complex discount rules, flash sales, coupon stacking, and loyalty point redemption.",
        accent: "blue",
      },
      {
        icon: "manage_search",
        title: "AI Search",
        desc: "Semantic search with personalised ranking, facets, and merchandising rules.",
        accent: "orange",
      },
      {
        icon: "payments",
        title: "Global Payments",
        desc: "60+ payment methods including BNPL, crypto, and local wallets across 100+ countries.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "3× Faster Page Loads",
        desc: "Headless JAMstack architecture scores 95+ on Core Web Vitals out of the box.",
      },
      {
        title: "Composable Architecture",
        desc: "Pick best-of-breed tools and connect via pre-built MACH-certified connectors.",
      },
      {
        title: "Global CDN Delivery",
        desc: "Edge-cached storefronts serve buyers from 200+ PoPs with <50ms TTFB worldwide.",
      },
    ],
    marketApps: [
      {
        title: "D2C Brands",
        desc: "Owned-channel commerce with rich storytelling and subscription models.",
      },
      {
        title: "B2B Wholesale",
        desc: "Custom pricing tiers, bulk ordering, and ERP-integrated procurement portals.",
      },
      {
        title: "Marketplace Operators",
        desc: "Multi-vendor marketplace with seller onboarding, commissions, and payouts.",
      },
    ],
    techStack: [
      { label: "Next.js", short: "Nx", accent: "blue" },
      { label: "Medusa", short: "Md", accent: "orange" },
      { label: "Elastic", short: "ES", accent: "blue" },
      { label: "Cloudflare", short: "CF", accent: "orange" },
      { label: "Algolia", short: "Al", accent: "blue" },
      { label: "Sanity", short: "CMS", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Product Listing",
        sub: "Personalised Discovery",
        icon: "grid_view",
        accentClass: "from-purple-400 to-purple-600",
      },
      {
        label: "Checkout Flow",
        sub: "1-Click Conversion",
        icon: "shopping_cart_checkout",
        accentClass: "from-violet-400 to-violet-600",
      },
      {
        label: "Seller Portal",
        sub: "Inventory & Analytics",
        icon: "store",
        accentClass: "from-purple-400 to-purple-600",
      },
    ],
  },

  {
    slug: "food-delivery",
    tag: "Logistics",
    tagColor: "bg-rose-100 text-rose-700",
    title: "Food Delivery",
    desc: "Hyper-local delivery logistics and vendor marketplace.",
    heroTitle: "Food Delivery Platform",
    heroSubtitle:
      "Complete hyper-local delivery ecosystem — restaurant marketplace, intelligent dispatch, real-time tracking, and dark kitchen management.",
    badge: "Hyper-Local Delivery OS",
    stats: [
      { val: 8, suf: "min", label: "Avg. Delivery" },
      { val: 1, suf: "M+", label: "Orders/Day" },
      { val: 97, suf: "%", label: "On-Time Rate" },
    ],
    features: [
      {
        icon: "restaurant",
        title: "Restaurant Marketplace",
        desc: "Discoverable vendor listings with live menus, ratings, dietary filters, and ETA badges.",
        accent: "orange",
      },
      {
        icon: "delivery_dining",
        title: "Live Order Tracking",
        desc: "Rider GPS broadcast with animated map, push notifications, and contactless drop.",
        accent: "blue",
      },
      {
        icon: "route",
        title: "Smart Routing",
        desc: "AI dispatch assigns riders considering distance, traffic, and batch-delivery optimisation.",
        accent: "orange",
      },
      {
        icon: "dark_mode",
        title: "Dark Kitchen Suite",
        desc: "Multi-brand virtual kitchen management with shared inventory and aggregated analytics.",
        accent: "blue",
      },
      {
        icon: "loyalty",
        title: "Super-App Wallet",
        desc: "In-app credits, cashback on orders, and subscription pass for free deliveries.",
        accent: "orange",
      },
      {
        icon: "support_agent",
        title: "Live Support",
        desc: "In-app order disputes, rider SOS, and AI-assisted customer support chat.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "8-Minute Average Delivery",
        desc: "Predictive pre-positioning of riders near demand hotspots using ML heatmaps.",
      },
      {
        title: "Zero Commission Model",
        desc: "SaaS subscription pricing — restaurants keep 100% of their revenue.",
      },
      {
        title: "White-Label Ready",
        desc: "Launch a fully branded delivery app for your city in under 4 weeks.",
      },
    ],
    marketApps: [
      {
        title: "Restaurant Chains",
        desc: "Owned delivery channel bypassing third-party aggregator commissions.",
      },
      {
        title: "Grocery & Q-Commerce",
        desc: "10-minute grocery delivery with warehouse management and dark stores.",
      },
      {
        title: "Pharmacy Delivery",
        desc: "Prescription verification, cold-chain handling, and scheduled deliveries.",
      },
    ],
    techStack: [
      { label: "Flutter", short: "Fl", accent: "blue" },
      { label: "FastAPI", short: "Py", accent: "orange" },
      { label: "Redis", short: "Rd", accent: "blue" },
      { label: "PostGIS", short: "GIS", accent: "orange" },
      { label: "OSRM", short: "OS", accent: "blue" },
      { label: "RabbitMQ", short: "MQ", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Customer App",
        sub: "Order & Track Experience",
        icon: "delivery_dining",
        accentClass: "from-rose-400 to-rose-600",
      },
      {
        label: "Rider App",
        sub: "Smart Navigation Suite",
        icon: "two_wheeler",
        accentClass: "from-orange-400 to-orange-600",
      },
      {
        label: "Partner Dashboard",
        sub: "Restaurant Operations",
        icon: "restaurant",
        accentClass: "from-rose-400 to-rose-600",
      },
    ],
  },

  {
    slug: "healthcare-portal",
    tag: "HealthTech",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Healthcare Portal",
    desc: "HIPAA compliant patient care and telemedicine engine.",
    heroTitle: "Healthcare Patient Portal",
    heroSubtitle:
      "HIPAA-compliant digital health platform connecting patients with providers via telemedicine, EHR, appointment scheduling, and AI symptom triage.",
    badge: "HIPAA Compliant Platform",
    stats: [
      { val: 99, suf: "%", label: "HIPAA Score" },
      { val: 5, suf: "min", label: "Consultation" },
      { val: 200, suf: "+", label: "Specialties" },
    ],
    features: [
      {
        icon: "video_call",
        title: "Telemedicine",
        desc: "HD video consultations with e-prescriptions, screen-share, and session recordings.",
        accent: "orange",
      },
      {
        icon: "folder_shared",
        title: "EHR Management",
        desc: "Unified patient records with lab results, imaging, and medication history in one place.",
        accent: "blue",
      },
      {
        icon: "calendar_month",
        title: "Smart Scheduling",
        desc: "AI-powered appointment matching with specialty routing and wait-time prediction.",
        accent: "orange",
      },
      {
        icon: "medication",
        title: "e-Prescriptions",
        desc: "Digital prescriptions with pharmacy integration, refill reminders, and drug interaction checks.",
        accent: "blue",
      },
      {
        icon: "monitor_heart",
        title: "Health Monitoring",
        desc: "Wearable data ingestion for continuous vitals monitoring and chronic disease management.",
        accent: "orange",
      },
      {
        icon: "privacy_tip",
        title: "Consent & Compliance",
        desc: "Granular data consent management, audit trails, and automated HIPAA/GDPR reporting.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "HIPAA & HL7 Certified",
        desc: "End-to-end encrypted data pipelines certified under HL7 FHIR R4 standards.",
      },
      {
        title: "AI-Assisted Triage",
        desc: "Symptom checker reduces unnecessary ER visits by routing to appropriate care level.",
      },
      {
        title: "Insurance Integration",
        desc: "Real-time eligibility verification and automated claims submission to major payers.",
      },
    ],
    marketApps: [
      {
        title: "Hospital Networks",
        desc: "Enterprise EHR integration with existing legacy systems via HL7 FHIR APIs.",
      },
      {
        title: "Telehealth Startups",
        desc: "White-label telemedicine platform with custom branding and specialty workflows.",
      },
      {
        title: "Chronic Care Programs",
        desc: "Remote patient monitoring with IoT device integration and care team alerts.",
      },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" },
      { label: "Node.js", short: "JS", accent: "orange" },
      { label: "FHIR API", short: "HL7", accent: "blue" },
      { label: "Twilio", short: "Tw", accent: "orange" },
      { label: "AWS HIPAA", short: "AWS", accent: "blue" },
      { label: "PostgreSQL", short: "PG", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Patient Portal",
        sub: "Appointments & Records",
        icon: "person_4",
        accentClass: "from-teal-400 to-teal-600",
      },
      {
        label: "Telehealth Room",
        sub: "Video Consultation Suite",
        icon: "video_call",
        accentClass: "from-cyan-400 to-cyan-600",
      },
      {
        label: "Doctor Dashboard",
        sub: "Patient Queue & EHR",
        icon: "medical_information",
        accentClass: "from-teal-400 to-teal-600",
      },
    ],
  },

  {
    slug: "lms-platform",
    tag: "EdTech",
    tagColor: "bg-amber-100 text-amber-700",
    title: "LMS Platform",
    desc: "Advanced e-learning ecosystem with AI progress tracking.",
    heroTitle: "Learning Management System",
    heroSubtitle:
      "Adaptive e-learning platform with AI-powered progress tracking, live cohort classes, certification engine, and marketplace for course creators.",
    badge: "AI-Powered Learning OS",
    stats: [
      { val: 1, suf: "M+", label: "Learners" },
      { val: 92, suf: "%", label: "Completion Rate" },
      { val: 500, suf: "+", label: "Course Types" },
    ],
    features: [
      {
        icon: "play_lesson",
        title: "Interactive Courses",
        desc: "Video lessons, quizzes, coding sandboxes, and SCORM-compliant content in one canvas.",
        accent: "orange",
      },
      {
        icon: "groups",
        title: "Live Cohort Classes",
        desc: "Scheduled live sessions with breakout rooms, whiteboard, and recording playback.",
        accent: "blue",
      },
      {
        icon: "psychology",
        title: "AI Tutor",
        desc: "Personalised learning paths that adapt to each learner's pace, gaps, and goals.",
        accent: "orange",
      },
      {
        icon: "workspace_premium",
        title: "Certifications",
        desc: "Blockchain-verified certificates with LinkedIn sharing and employer verification portal.",
        accent: "blue",
      },
      {
        icon: "storefront",
        title: "Course Marketplace",
        desc: "Creator tools for educators to publish, price, and market courses to global learners.",
        accent: "orange",
      },
      {
        icon: "leaderboard",
        title: "Gamification",
        desc: "Points, badges, streaks, and leaderboards that boost daily active learning habits.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "92% Completion Rate",
        desc: "AI-adaptive nudges and social accountability features dramatically improve course finishing.",
      },
      {
        title: "Creator Economy Ready",
        desc: "Revenue sharing, course bundles, and subscription tiers for independent educators.",
      },
      {
        title: "Enterprise LMS",
        desc: "SSO, custom branding, advanced reporting, and compliance training workflows for corporates.",
      },
    ],
    marketApps: [
      {
        title: "Higher Education",
        desc: "University LMS replacement with existing SIS and library system integrations.",
      },
      {
        title: "Corporate Training",
        desc: "Employee onboarding, compliance, and upskilling with HR system sync.",
      },
      {
        title: "EdTech Startups",
        desc: "Complete marketplace infrastructure to monetize expert knowledge at scale.",
      },
    ],
    techStack: [
      { label: "Next.js", short: "Nx", accent: "blue" },
      { label: "Python AI", short: "Py", accent: "orange" },
      { label: "HLS Video", short: "HLS", accent: "blue" },
      { label: "WebRTC", short: "RTC", accent: "orange" },
      { label: "Elasticsearch", short: "ES", accent: "blue" },
      { label: "AWS S3", short: "S3", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Student Dashboard",
        sub: "Progress & Courses",
        icon: "school",
        accentClass: "from-amber-400 to-amber-600",
      },
      {
        label: "Live Classroom",
        sub: "Cohort Learning Suite",
        icon: "cast_for_education",
        accentClass: "from-orange-400 to-orange-600",
      },
      {
        label: "Creator Studio",
        sub: "Course Builder & Analytics",
        icon: "edit_note",
        accentClass: "from-amber-400 to-amber-600",
      },
    ],
  },

  {
    slug: "real-estate",
    tag: "PropTech",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "Real Estate",
    desc: "Property matching engine with virtual tour integration.",
    heroTitle: "Real Estate Marketplace",
    heroSubtitle:
      "AI-powered property discovery platform with virtual tours, mortgage calculators, smart matching, and end-to-end transaction management.",
    badge: "PropTech AI Engine",
    stats: [
      { val: 1, suf: "M+", label: "Listings" },
      { val: 85, suf: "%", label: "Match Accuracy" },
      { val: 48, suf: "hr", label: "Avg. Closure" },
    ],
    features: [
      {
        icon: "search",
        title: "AI Property Match",
        desc: "Semantic property search with lifestyle-based matching beyond bedrooms and budget.",
        accent: "orange",
      },
      {
        icon: "view_in_ar",
        title: "Virtual Tours",
        desc: "Immersive 3D walkthroughs and AR furniture placement for remote property viewing.",
        accent: "blue",
      },
      {
        icon: "calculate",
        title: "Mortgage Calculator",
        desc: "Real-time EMI calculations with bank integration for instant pre-approval offers.",
        accent: "orange",
      },
      {
        icon: "gavel",
        title: "Legal Workflow",
        desc: "Integrated title checks, e-stamp duty, and digital document signing workflows.",
        accent: "blue",
      },
      {
        icon: "price_check",
        title: "Valuation Engine",
        desc: "Automated property valuation using comparable sales, location scores, and market trends.",
        accent: "orange",
      },
      {
        icon: "handshake",
        title: "Agent CRM",
        desc: "Pipeline management, lead scoring, and automated follow-up for property agents.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "AI-Powered Discovery",
        desc: "Lifestyle matching reduces irrelevant listings by 70%, speeding up the search journey.",
      },
      {
        title: "Virtual-First Viewings",
        desc: "3D tours reduce physical viewings needed before offer by an average of 60%.",
      },
      {
        title: "End-to-End Transactions",
        desc: "From search to registry — handle the entire property journey on one platform.",
      },
    ],
    marketApps: [
      {
        title: "Residential Portals",
        desc: "Consumer-facing marketplace for buying, selling, and renting residential property.",
      },
      {
        title: "Commercial Real Estate",
        desc: "Office, retail, and industrial space leasing with floor-plan management.",
      },
      {
        title: "Developer Sales Offices",
        desc: "New project launches with virtual site visits and CRM for pre-sales teams.",
      },
    ],
    techStack: [
      { label: "React", short: "Re", accent: "blue" },
      { label: "Python ML", short: "ML", accent: "orange" },
      { label: "Three.js", short: "3D", accent: "blue" },
      { label: "Mapbox GL", short: "MB", accent: "orange" },
      { label: "Elasticsearch", short: "ES", accent: "blue" },
      { label: "AWS S3", short: "S3", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Search & Discovery",
        sub: "AI Property Matching",
        icon: "search",
        accentClass: "from-indigo-400 to-indigo-600",
      },
      {
        label: "Virtual Tour",
        sub: "3D Property Viewer",
        icon: "view_in_ar",
        accentClass: "from-violet-400 to-violet-600",
      },
      {
        label: "Agent CRM",
        sub: "Deal Pipeline & Leads",
        icon: "contacts",
        accentClass: "from-indigo-400 to-indigo-600",
      },
    ],
  },

  {
    slug: "social-media-platform",
    tag: "Social",
    tagColor: "bg-pink-100 text-pink-700",
    title: "Social Media",
    desc: "High-concurrency community platform for creators.",
    heroTitle: "Social Media Platform",
    heroSubtitle:
      "High-concurrency creator community platform with short-form video, live streaming, monetisation tools, and federated social graph.",
    badge: "Creator-First Social OS",
    stats: [
      { val: 10, suf: "M+", label: "Concurrent Users" },
      { val: 99, suf: "%", label: "Feed Accuracy" },
      { val: 500, suf: "ms", label: "Feed Load" },
    ],
    features: [
      {
        icon: "smart_display",
        title: "Short-Form Video",
        desc: "TikTok-style vertical feed with AI-curated FYP, duets, and stitching tools.",
        accent: "orange",
      },
      {
        icon: "live_tv",
        title: "Live Streaming",
        desc: "Low-latency HLS live streaming with real-time gifting, polls, and Q&A.",
        accent: "blue",
      },
      {
        icon: "paid",
        title: "Creator Monetisation",
        desc: "Tips, subscriptions, paid DMs, brand deal marketplace, and affiliate links.",
        accent: "orange",
      },
      {
        icon: "group",
        title: "Communities",
        desc: "Interest-based spaces with moderation tools, events, and member tiers.",
        accent: "blue",
      },
      {
        icon: "auto_awesome",
        title: "AI Content Tools",
        desc: "In-app video editing, caption generation, hashtag AI, and content scheduling.",
        accent: "orange",
      },
      {
        icon: "verified",
        title: "Trust & Safety",
        desc: "Real-time CSAM detection, copyright protection, and transparent moderation appeals.",
        accent: "blue",
      },
    ],
    benefits: [
      {
        title: "10M+ Concurrent Scale",
        desc: "Distributed architecture handles viral moments without degradation or throttling.",
      },
      {
        title: "Creator-First Economics",
        desc: "Industry-leading revenue share with direct fan monetisation across all content types.",
      },
      {
        title: "Federated Identity",
        desc: "ActivityPub support lets users carry their social graph across platforms.",
      },
    ],
    marketApps: [
      {
        title: "Niche Creator Platforms",
        desc: "Vertical communities for fitness, music, gaming, or professional networks.",
      },
      {
        title: "Brand Communities",
        desc: "Owned social spaces that build first-party data and reduce platform dependency.",
      },
      {
        title: "Fan Club Platforms",
        desc: "Exclusive content, merch drops, and direct access for artists and athletes.",
      },
    ],
    techStack: [
      { label: "React Native", short: "RN", accent: "blue" },
      { label: "Go", short: "Go", accent: "orange" },
      { label: "Cassandra", short: "DB", accent: "blue" },
      { label: "FFmpeg", short: "FF", accent: "orange" },
      { label: "Kafka", short: "KF", accent: "blue" },
      { label: "Cloudflare", short: "CF", accent: "orange" },
    ],
    portfolioItems: [
      {
        label: "Social Feed",
        sub: "Personalised Discovery",
        icon: "smart_display",
        accentClass: "from-pink-400 to-pink-600",
      },
      {
        label: "Creator Studio",
        sub: "Monetisation & Analytics",
        icon: "video_camera_front",
        accentClass: "from-rose-400 to-rose-600",
      },
      {
        label: "Live Stage",
        sub: "Streaming & Gifting",
        icon: "live_tv",
        accentClass: "from-pink-400 to-pink-600",
      },
    ],
  },
  {
    slug: "portfolio-platform",
    tag: "Creative",
    tagColor: "bg-fuchsia-100 text-fuchsia-700",
    title: "Portfolio Platform",
    desc: "Personal and agency portfolio builder with modern UI and animations.",
    heroTitle: "Portfolio & Showcase Platform",
    heroSubtitle:
      "Build stunning digital portfolios to showcase projects, skills, and achievements with modern UI, animations, and SEO optimization.",
    badge: "Creative Showcase System",

    stats: [
      { val: 100, suf: "+", label: "Templates" },
      { val: 95, suf: "%", label: "Performance Score" },
      { val: 2, suf: "s", label: "Load Time" },
    ],

    features: [
      {
        icon: "brush",
        title: "Custom Design",
        desc: "Fully customizable UI with themes and layouts.",
        accent: "orange",
      },
      {
        icon: "animation",
        title: "Smooth Animations",
        desc: "Modern animations using Framer Motion and CSS.",
        accent: "blue",
      },
      {
        icon: "photo_library",
        title: "Project Showcase",
        desc: "Display projects with images, videos, and case studies.",
        accent: "orange",
      },
      {
        icon: "person",
        title: "Personal Branding",
        desc: "Highlight skills, experience, and achievements.",
        accent: "blue",
      },
      {
        icon: "seo",
        title: "SEO Optimized",
        desc: "Optimized for search engines and fast loading.",
        accent: "orange",
      },
      {
        icon: "devices",
        title: "Responsive Design",
        desc: "Perfectly works on mobile, tablet, and desktop.",
        accent: "blue",
      },
    ],

    benefits: [
      {
        title: "Stronger Personal Brand",
        desc: "Stand out with a professional online presence.",
      },
      {
        title: "Client Attraction",
        desc: "Showcase work to attract new clients and opportunities.",
      },
      { title: "Fast Deployment", desc: "Launch your portfolio in minutes." },
    ],

    marketApps: [
      { title: "Freelancers", desc: "Showcase projects and attract clients." },
      { title: "Agencies", desc: "Display case studies and team expertise." },
      {
        title: "Developers & Designers",
        desc: "Highlight skills and achievements.",
      },
    ],

    techStack: [
      { label: "Next.js", short: "Nx", accent: "blue" },
      { label: "Tailwind", short: "TW", accent: "orange" },
      { label: "Framer Motion", short: "FM", accent: "blue" },
      { label: "Sanity CMS", short: "CMS", accent: "orange" },
      { label: "Vercel", short: "Vc", accent: "blue" },
      { label: "Cloudinary", short: "CDN", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Home Showcase",
        sub: "Hero & Projects",
        icon: "home",
        accentClass: "from-fuchsia-400 to-fuchsia-600",
      },
      {
        label: "Project Detail",
        sub: "Case Study Pages",
        icon: "folder",
        accentClass: "from-pink-400 to-pink-600",
      },
      {
        label: "Contact Section",
        sub: "Lead Generation",
        icon: "mail",
        accentClass: "from-fuchsia-400 to-fuchsia-600",
      },
    ],
  },
  {
    slug: "ai",
    tag: "AI",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "AI / Machine Learning",
    desc: "Build intelligent systems powered by data and automation.",
    heroTitle: "AI & Machine Learning Solutions",
    heroSubtitle:
      "Leverage artificial intelligence to automate processes, gain insights, and build predictive systems for smarter decision-making.",
    badge: "Next-Gen Intelligence",

    stats: [
      { val: 95, suf: "%", label: "Accuracy" },
      { val: 10, suf: "x", label: "Efficiency Boost" },
      { val: 1, suf: "M+", label: "Data Points" },
    ],

    features: [
      {
        icon: "smart_toy",
        title: "AI Models",
        desc: "Custom ML models for prediction and automation.",
        accent: "orange",
      },
      {
        icon: "insights",
        title: "Data Analytics",
        desc: "Advanced analytics for actionable insights.",
        accent: "blue",
      },
      {
        icon: "chat",
        title: "AI Chatbots",
        desc: "Conversational AI for customer support.",
        accent: "orange",
      },
      {
        icon: "psychology",
        title: "Deep Learning",
        desc: "Neural networks for complex problem solving.",
        accent: "blue",
      },
      {
        icon: "visibility",
        title: "Computer Vision",
        desc: "Image & video recognition systems.",
        accent: "orange",
      },
      {
        icon: "record_voice_over",
        title: "NLP",
        desc: "Text and speech processing solutions.",
        accent: "blue",
      },
    ],

    benefits: [
      {
        title: "Automation",
        desc: "Reduce manual work with AI-driven systems.",
      },
      { title: "Better Decisions", desc: "Data-backed decision making." },
      {
        title: "Scalable Intelligence",
        desc: "AI that grows with your business.",
      },
    ],

    marketApps: [
      { title: "Chatbots", desc: "Customer support automation." },
      { title: "Fraud Detection", desc: "AI for financial security." },
      {
        title: "Recommendation Systems",
        desc: "Personalized user experiences.",
      },
    ],

    techStack: [
      { label: "Python", short: "Py", accent: "blue" },
      { label: "TensorFlow", short: "TF", accent: "orange" },
      { label: "PyTorch", short: "PT", accent: "blue" },
      { label: "OpenAI", short: "AI", accent: "orange" },
      { label: "FastAPI", short: "API", accent: "blue" },
      { label: "AWS", short: "AWS", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "AI Dashboard",
        sub: "Insights & Predictions",
        icon: "dashboard",
        accentClass: "from-indigo-400 to-indigo-600",
      },
      {
        label: "Chatbot UI",
        sub: "Conversational Interface",
        icon: "chat",
        accentClass: "from-purple-400 to-purple-600",
      },
      {
        label: "Analytics Panel",
        sub: "Data Visualization",
        icon: "bar_chart",
        accentClass: "from-indigo-400 to-indigo-600",
      },
    ],
  },
  {
    slug: "cloud",
    tag: "Cloud",
    tagColor: "bg-sky-100 text-sky-700",
    title: "Cloud Computing",
    desc: "Scalable cloud infrastructure and deployment solutions.",
    heroTitle: "Cloud Infrastructure Solutions",
    heroSubtitle:
      "Build scalable, secure, and high-performance applications using modern cloud platforms like AWS, Azure, and Google Cloud.",
    badge: "Scalable Infrastructure",

    stats: [
      { val: 99, suf: "%", label: "Uptime" },
      { val: 50, suf: "%", label: "Cost Reduction" },
      { val: 10, suf: "x", label: "Scalability" },
    ],

    features: [
      {
        icon: "cloud",
        title: "Cloud Hosting",
        desc: "Deploy apps globally with high availability.",
        accent: "orange",
      },
      {
        icon: "dns",
        title: "Serverless",
        desc: "Event-driven scalable architecture.",
        accent: "blue",
      },
      {
        icon: "security",
        title: "Cloud Security",
        desc: "Secure data and infrastructure.",
        accent: "orange",
      },
      {
        icon: "backup",
        title: "Data Backup",
        desc: "Automated backups and recovery.",
        accent: "blue",
      },
      {
        icon: "public",
        title: "Global CDN",
        desc: "Fast content delivery worldwide.",
        accent: "orange",
      },
      {
        icon: "settings",
        title: "Cloud Automation",
        desc: "Infrastructure as code.",
        accent: "blue",
      },
    ],

    benefits: [
      { title: "High Availability", desc: "Always-on systems." },
      { title: "Cost Efficient", desc: "Pay only for what you use." },
      { title: "Scalable Systems", desc: "Handle millions of users." },
    ],

    marketApps: [
      { title: "SaaS Platforms", desc: "Cloud-based apps." },
      { title: "Enterprise Systems", desc: "Large-scale infrastructure." },
      { title: "Startups", desc: "Flexible cloud solutions." },
    ],

    techStack: [
      { label: "AWS", short: "AWS", accent: "blue" },
      { label: "Azure", short: "Az", accent: "orange" },
      { label: "GCP", short: "GCP", accent: "blue" },
      { label: "Docker", short: "Dk", accent: "orange" },
      { label: "Kubernetes", short: "K8", accent: "blue" },
      { label: "Terraform", short: "Tf", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Cloud Dashboard",
        sub: "Infra Monitoring",
        icon: "cloud",
        accentClass: "from-sky-400 to-sky-600",
      },
      {
        label: "Deployment Panel",
        sub: "CI/CD Pipelines",
        icon: "settings",
        accentClass: "from-blue-400 to-blue-600",
      },
      {
        label: "Security Center",
        sub: "Access & Logs",
        icon: "security",
        accentClass: "from-sky-400 to-sky-600",
      },
    ],
  },
  {
    slug: "devops",
    tag: "DevOps",
    tagColor: "bg-gray-100 text-gray-700",
    title: "DevOps",
    desc: "Automation and CI/CD pipelines for faster deployment.",
    heroTitle: "DevOps & Automation",
    heroSubtitle:
      "Accelerate development cycles with CI/CD pipelines, automation, and infrastructure management.",
    badge: "Automation Engine",

    stats: [
      { val: 70, suf: "%", label: "Faster Deployments" },
      { val: 90, suf: "%", label: "Automation" },
      { val: 0, suf: " Downtime", label: "Releases" },
    ],

    features: [
      {
        icon: "build",
        title: "CI/CD",
        desc: "Automated pipelines.",
        accent: "orange",
      },
      {
        icon: "sync",
        title: "Automation",
        desc: "Reduce manual tasks.",
        accent: "blue",
      },
      {
        icon: "storage",
        title: "Infra Management",
        desc: "Manage servers easily.",
        accent: "orange",
      },
      {
        icon: "bug_report",
        title: "Monitoring",
        desc: "Error tracking & logs.",
        accent: "blue",
      },
    ],

    benefits: [
      { title: "Faster Releases", desc: "Deploy quickly." },
      { title: "Reliability", desc: "Stable systems." },
      { title: "Efficiency", desc: "Reduce workload." },
    ],

    marketApps: [
      { title: "Startups", desc: "Fast deployment." },
      { title: "Enterprises", desc: "Scalable infra." },
      { title: "SaaS", desc: "Continuous updates." },
    ],

    techStack: [
      { label: "Docker", short: "Dk", accent: "blue" },
      { label: "Kubernetes", short: "K8", accent: "orange" },
      { label: "Jenkins", short: "Jn", accent: "blue" },
      { label: "GitHub Actions", short: "GH", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Pipeline",
        sub: "CI/CD Flow",
        icon: "sync",
        accentClass: "from-gray-400 to-gray-600",
      },
      {
        label: "Monitoring",
        sub: "Logs & Alerts",
        icon: "bug_report",
        accentClass: "from-slate-400 to-slate-600",
      },
    ],
  },
  {
    slug: "blockchain",
    tag: "Web3",
    tagColor: "bg-violet-100 text-violet-700",
    title: "Blockchain",
    desc: "Decentralized applications and smart contract development.",
    heroTitle: "Blockchain & Web3 Solutions",
    heroSubtitle:
      "Build secure, transparent, and decentralized applications using blockchain technology, smart contracts, and Web3 ecosystems.",
    badge: "Decentralized Infrastructure",

    stats: [
      { val: 100, suf: "%", label: "Transparency" },
      { val: 0, suf: "%", label: "Downtime" },
      { val: 50, suf: "+", label: "Chains Supported" },
    ],

    features: [
      {
        icon: "hub",
        title: "Smart Contracts",
        desc: "Automated agreements on blockchain.",
        accent: "orange",
      },
      {
        icon: "account_balance",
        title: "DeFi Apps",
        desc: "Decentralized finance platforms.",
        accent: "blue",
      },
      {
        icon: "token",
        title: "Token Development",
        desc: "Create ERC20, NFTs, and tokens.",
        accent: "orange",
      },
      {
        icon: "security",
        title: "Secure Transactions",
        desc: "Tamper-proof data systems.",
        accent: "blue",
      },
      {
        icon: "public",
        title: "Multi-chain Support",
        desc: "Ethereum, Polygon, Solana.",
        accent: "orange",
      },
      {
        icon: "dns",
        title: "Web3 Integration",
        desc: "Wallet & dApp connectivity.",
        accent: "blue",
      },
    ],

    benefits: [
      { title: "Transparency", desc: "Open and verifiable systems." },
      { title: "Security", desc: "Highly secure decentralized architecture." },
      { title: "Trustless Systems", desc: "No intermediaries required." },
    ],

    marketApps: [
      { title: "DeFi Platforms", desc: "Crypto trading & finance apps." },
      { title: "NFT Marketplaces", desc: "Digital asset platforms." },
      { title: "Supply Chain", desc: "Track goods transparently." },
    ],

    techStack: [
      { label: "Solidity", short: "Sol", accent: "blue" },
      { label: "Ethereum", short: "Eth", accent: "orange" },
      { label: "Polygon", short: "Matic", accent: "blue" },
      { label: "Web3.js", short: "W3", accent: "orange" },
      { label: "Hardhat", short: "HH", accent: "blue" },
      { label: "IPFS", short: "IPFS", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Wallet UI",
        sub: "Crypto Transactions",
        icon: "account_balance_wallet",
        accentClass: "from-violet-400 to-violet-600",
      },
      {
        label: "NFT Marketplace",
        sub: "Buy & Sell NFTs",
        icon: "image",
        accentClass: "from-purple-400 to-purple-600",
      },
      {
        label: "Smart Contract Panel",
        sub: "Contract Execution",
        icon: "code",
        accentClass: "from-violet-400 to-violet-600",
      },
    ],
  },
  {
    slug: "iot",
    tag: "IoT",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "IoT Solutions",
    desc: "Connected devices and real-time data ecosystems.",
    heroTitle: "Internet of Things (IoT) Solutions",
    heroSubtitle:
      "Build smart systems with connected devices, real-time monitoring, and automation powered by IoT technology.",
    badge: "Smart Connectivity",

    stats: [
      { val: 1, suf: "B+", label: "Devices Connected" },
      { val: 24, suf: "/7", label: "Monitoring" },
      { val: 99, suf: "%", label: "Reliability" },
    ],

    features: [
      {
        icon: "devices",
        title: "Device Integration",
        desc: "Connect sensors and smart devices.",
        accent: "orange",
      },
      {
        icon: "sync",
        title: "Real-time Data",
        desc: "Live data streaming and processing.",
        accent: "blue",
      },
      {
        icon: "dashboard",
        title: "Monitoring Dashboard",
        desc: "Visualize IoT data easily.",
        accent: "orange",
      },
      {
        icon: "bolt",
        title: "Automation",
        desc: "Trigger actions automatically.",
        accent: "blue",
      },
      {
        icon: "security",
        title: "Device Security",
        desc: "Secure communication channels.",
        accent: "orange",
      },
      {
        icon: "cloud",
        title: "Cloud Integration",
        desc: "IoT with cloud infrastructure.",
        accent: "blue",
      },
    ],

    benefits: [
      { title: "Real-time Insights", desc: "Monitor systems instantly." },
      { title: "Automation", desc: "Reduce manual processes." },
      { title: "Efficiency", desc: "Improve operational performance." },
    ],

    marketApps: [
      { title: "Smart Homes", desc: "Connected home automation." },
      { title: "Industrial IoT", desc: "Factory monitoring systems." },
      { title: "Healthcare IoT", desc: "Remote patient monitoring." },
    ],

    techStack: [
      { label: "Arduino", short: "Ar", accent: "blue" },
      { label: "Raspberry Pi", short: "Pi", accent: "orange" },
      { label: "MQTT", short: "MQ", accent: "blue" },
      { label: "AWS IoT", short: "AWS", accent: "orange" },
      { label: "Node.js", short: "JS", accent: "blue" },
      { label: "Firebase", short: "FB", accent: "orange" },
    ],

    portfolioItems: [
      {
        label: "Device Dashboard",
        sub: "Live Monitoring",
        icon: "devices",
        accentClass: "from-emerald-400 to-emerald-600",
      },
      {
        label: "Automation Panel",
        sub: "Smart Controls",
        icon: "settings",
        accentClass: "from-green-400 to-green-600",
      },
      {
        label: "Analytics View",
        sub: "Sensor Data",
        icon: "analytics",
        accentClass: "from-emerald-400 to-emerald-600",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/** Find a project by its URL slug. Returns undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Build the URL for a solution detail page. */
export function solutionPath(slug: string): string {
  return `/solution/${slug}`;
}
