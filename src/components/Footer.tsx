export default function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-white -translate-y-1/2 rounded-[100%]"></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined font-bold text-sm">polymer</span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">Morphos<span className="text-primary">IT</span></h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">Building the next generation of digital products with precision and soul.</p>
            <div className="flex gap-4">
              {['public', 'share', 'campaign'].map((icon) => (
                <a key={icon} className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Services</h5>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Engineering', 'SaaS Architecture', 'Cloud Consulting'].map((item) => (
                <li key={item}><a className="text-slate-400 hover:text-white transition-colors" href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Company</h5>
            <ul className="space-y-4">
              {['About Us', 'Our Process', 'Case Studies', 'Careers'].map((item) => (
                <li key={item}><a className="text-slate-400 hover:text-white transition-colors" href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-8 text-primary">Newsletter</h5>
            <p className="text-slate-400 text-sm mb-6">Stay updated with the latest in tech and design.</p>
            <div className="flex gap-2">
              <input
                className="bg-slate-800 border-none rounded-lg px-4 py-3 flex-1 text-sm focus:ring-primary"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-primary px-4 py-3 rounded-lg hover:bg-primary/90 transition-all">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 Morphos IT. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="text-slate-500 text-sm hover:text-white" href="#">Privacy Policy</a>
            <a className="text-slate-500 text-sm hover:text-white" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
