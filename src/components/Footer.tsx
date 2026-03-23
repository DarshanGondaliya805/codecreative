import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const YearD = new Date()

  const socialLinks = [{ icon: <FaInstagram />, url: "https://instagram.com" }, { icon: <FaLinkedin />, url: "https://linkedin.com" }, { icon: <FaFacebook />, url: "https://facebook.com" }, { icon: <FaTwitter />, url: "https://twitter.com" },];

  const services = [
    {
      label: "Web Designing",
      link: "/service/webdesigning"
    },
    {
      label: "Web Development",
      link: "/service/webdevelopment"
    },
    {
      label: "Backend Development",
      link: "/service/backenddevelopment"
    },
    {
      label: "Fullstack Development",
      link: "/service/fullstachdevelopment"
    },
    {
      label: "App Development",
      link: "/service/appdevelopment"
    },
    {
      label: "Ui Ux Design",
      link: "/service/uiuxdevelopment"
    },
    {
      label: "AiMl Development",
      link: "/service/aimldevelopment"
    },
    {
      label: "Qa & Automation",
      link: "/service/qa&automation"
    },
    {
      label: "SEO Expert",
      link: "/service/seo"
    },
    {
      label: "Digital Marketing",
      link: "/service/digitalmarketing"
    }
  ]

  const aboutCompony = [
    {
      label: "About Us",
      link: "/aboutus"
    },
    {
      label: "Our Process",
      link: "/ourprocess"
    },
    {
      label: "Enagement Modal",
      link: "/engagementmodel"
    },
    {
      label: "Technology Stack",
      link: "/techstack"
    },
    {
      label: "Case Studies",
      link: "/casestudy"
    },
    {
      label: "Hire Developer",
      link: "/hiredeveloper"
    },
    {
      label: "Careers",
      link: "/careers"
    },
    {
      label: "Life @ Code Creative",
      link: "/moment"
    },
    {
      label: "Testimonial",
      link: "/testimonial"
    },
    {
      label: "Blog",
      link: "/blog"
    },
  ]

  const solutions = [
    {
      label: "Ecommerce",
      link: "/solution/ecommerce-platform"
    },
    {
      label: "Real Estate",
      link: "/solution/real-estate"
    },
    {
      label: "Job Portal",
      link: "/solution/job-portal"
    },
    {
      label: "LMS Platform",
      link: "/solution/lms-platform"
    },
    {
      label: "Portfolio Platform",
      link: "/solution/portfolio-platform"
    },
    {
      label: "Taxi Booking App",
      link: "/solution/taxi-booking-app"
    },
    {
      label: "Food Delivery",
      link: "/solution/food-delivery"
    },
    {
      label: "Fintach",
      link: "/solution/fintech-wallet"
    },
    {
      label: "Healthcare",
      link: "/solution/solution/healthcare-portal"
    },
    {
      label: "Social Media",
      link: "/solution/social-media-platform"
    },
  ]
  return (
    <footer className="pt-24 pb-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32  -translate-y-1/2 rounded-[100%]" style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(70,72,212,0.07), transparent)",
        
      }}></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined font-bold text-sm">code</span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">Code<span className="text-primary">Creative</span></h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">Building the next generation of digital products with precision and soul.</p>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (<a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all text-white" > {item.icon} </a>))}            </div>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Services</h5>
            <ul className="space-y-4">
              {services.map((item: any, index: number) => (
                <li key={index}><Link className="text-slate-400 hover:text-white transition-colors" to={item.link}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Company</h5>
            <ul className="space-y-4">
              {aboutCompony.map((item: any) => (
                <li key={item}><Link className="text-slate-400 hover:text-white transition-colors" to={item.link}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Solution</h5>
            <ul className="space-y-4">
              {solutions.map((item: any) => (
                <li key={item}><Link className="text-slate-400 hover:text-white transition-colors" to={item.link}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© {YearD.getFullYear()} Code Creative. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="text-slate-500 text-sm hover:text-white" to="/privacypolicy">Privacy Policy</Link>
            <Link className="text-slate-500 text-sm hover:text-white" to="/termsofuse">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
