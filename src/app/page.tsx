import Link from "next/link";

export default function LandingPage() {
  return (
    <div 
      className="flex flex-col min-h-screen w-full relative"
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/7e/53/a5/7e53a54ad40c06883f1aff179f900cd0.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-surface-container-lowest/40 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-primary-container">account_balance</span>
              </div>
              <span className="font-headline-md text-headline-md font-bold text-primary">Lightrees OS</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="font-label-md text-on-surface hover:text-primary font-semibold transition-colors">Features</a>
              <a href="#solutions" className="font-label-md text-on-surface hover:text-primary font-semibold transition-colors">Solutions</a>
              <a href="#testimonials" className="font-label-md text-on-surface hover:text-primary font-semibold transition-colors">Testimonials</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="font-label-md text-on-surface hover:text-primary transition-colors font-semibold">
              Login
            </Link>
            <Link href="/dashboard" className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md hover-lift">
              Go to Dashboard
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <span className="px-4 py-1.5 rounded-full bg-primary-container/80 backdrop-blur-md text-black text-xs font-bold tracking-wider uppercase mb-6 border border-primary/20 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Lightrees OS 2.0 is Here
          </span>
          
          <h1 className="font-display-lg text-[56px] md:text-[72px] leading-tight font-black text-on-surface max-w-4xl tracking-tight text-balance drop-shadow-sm">
            Manage your properties with <span className="text-primary">AI-driven</span> precision.
          </h1>
          
          <p className="font-body-lg text-[20px] text-on-surface-variant max-w-2xl mt-6 mb-10 text-balance font-medium">
            The all-in-one operating system for modern real estate developers. From instant feasibility analysis to smart access control.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/dashboard" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-[16px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
              Explore Dashboard <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
            <Link href="/feasibility" className="bg-surface-container-lowest/80 backdrop-blur-md text-on-surface border border-outline-variant px-8 py-4 rounded-xl font-label-md text-[16px] font-bold hover:bg-white transition-all flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">analytics</span> Try Feasibility Tool
            </Link>
          </div>
        </main>

        {/* Stats Section */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto w-full mb-24">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-outline-variant/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-display-lg text-[32px] font-black text-primary mb-1">45+</span>
              <span className="font-label-md text-on-surface-variant font-bold uppercase tracking-wider">Active Projects</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-display-lg text-[32px] font-black text-primary mb-1">$1.2B</span>
              <span className="font-label-md text-on-surface-variant font-bold uppercase tracking-wider">Asset Value</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-display-lg text-[32px] font-black text-primary mb-1">99%</span>
              <span className="font-label-md text-on-surface-variant font-bold uppercase tracking-wider">Accuracy</span>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-display-lg text-[32px] font-black text-primary mb-1">12k</span>
              <span className="font-label-md text-on-surface-variant font-bold uppercase tracking-wider">Daily Visitors</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-[36px] font-black text-on-surface mb-4 tracking-tight">Everything you need to scale</h2>
            <p className="font-body-lg text-[18px] text-on-surface-variant font-medium">Replace scattered spreadsheets and legacy software with one unified, modern platform built specifically for property developers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[24px]">architecture</span>
              </div>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface mb-3">Project Management</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed font-medium">End-to-end tracking of budgets, timelines, and milestones across your entire development portfolio.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[24px]">sensor_door</span>
              </div>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface mb-3">Smart E-Reception</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed font-medium">Automate visitor access with QR-based digital passes and real-time monitoring of all entry points.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[24px]">query_stats</span>
              </div>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface mb-3">Market Intelligence</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed font-medium">Data-driven insights for property valuation and trend analysis to maximize your investment returns.</p>
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section id="solutions" className="py-24 px-6 md:px-12 mt-12 bg-white/40 backdrop-blur-md border-y border-outline-variant/30">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-secondary font-black tracking-wider uppercase text-sm mb-4 block">Core Solution</span>
              <h2 className="font-headline-lg text-[36px] font-black text-on-surface mb-6 tracking-tight leading-tight">Smarter Feasibility Reports in Seconds.</h2>
              <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mb-8 leading-relaxed">
                Stop relying on outdated spreadsheets and manual data entry. Lightrees OS automatically calculates Cap Rates, IRR, and Cash-on-Cash returns based on real-time market inputs.
              </p>
              <ul className="flex flex-col gap-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">check</span></div>
                  <span className="font-label-md text-[16px] text-on-surface font-semibold">Automated ROI & IRR calculations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">check</span></div>
                  <span className="font-label-md text-[16px] text-on-surface font-semibold">One-click PDF & Excel export</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">check</span></div>
                  <span className="font-label-md text-[16px] text-on-surface font-semibold">Dynamic scenario modeling</span>
                </li>
              </ul>
              <Link href="/feasibility" className="inline-flex items-center gap-2 font-label-md font-bold text-primary hover:text-primary-container transition-colors text-[18px]">
                See how it works <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="flex-1 relative w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl transform rotate-3"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border border-outline-variant/30 rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">pie_chart</span>
                    </div>
                    <div>
                      <h4 className="font-label-md font-bold text-on-surface">Financial Overview</h4>
                      <p className="font-label-sm text-on-surface-variant">Project Alpha</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs uppercase tracking-wider">Viable</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <span className="font-label-md text-on-surface-variant font-medium">Estimated ROI</span>
                    <span className="font-headline-sm font-black text-primary">18.4%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <span className="font-label-md text-on-surface-variant font-medium">Internal Rate of Return (IRR)</span>
                    <span className="font-headline-sm font-black text-on-surface">15.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                    <span className="font-label-md text-on-surface-variant font-medium">Net Present Value (NPV)</span>
                    <span className="font-headline-sm font-black text-on-surface">$2.4M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6 md:px-12 text-white text-center overflow-hidden border-y border-outline-variant/30">
          <div className="absolute inset-0 bg-[url('https://i.pinimg.com/originals/c6/11/18/c6111837c40d30c0c2b4343833ec01f8.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-primary/75 backdrop-blur-[2px]"></div>
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="material-symbols-outlined text-[64px] mb-6 opacity-90">rocket_launch</span>
            <h2 className="font-display-lg text-[40px] md:text-[48px] font-black mb-6 tracking-tight leading-tight drop-shadow-md">Ready to transform your property management?</h2>
            <p className="font-body-lg text-[20px] opacity-90 mb-10 max-w-2xl font-medium drop-shadow-sm">Join top real estate developers who use Lightrees OS to analyze, build, and manage smarter.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="bg-white text-primary px-10 py-4 rounded-2xl font-label-md text-[18px] font-bold hover:bg-surface-container-lowest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Start for Free
              </Link>
              <Link href="/contact" className="bg-white/20 backdrop-blur-md text-white border-2 border-white/40 px-10 py-4 rounded-2xl font-label-md text-[18px] font-bold hover:bg-white/30 transition-all shadow-lg hover:-translate-y-1">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-outline-variant/30 pt-20 pb-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">account_balance</span>
                  </div>
                  <span className="font-headline-md text-[24px] font-black text-primary tracking-tight">Lightrees OS</span>
                </Link>
                <p className="font-body-md text-on-surface-variant max-w-sm mb-8 font-medium leading-relaxed">
                  Empowering real estate developers with AI-driven precision, robust project management, and smart access control.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-label-md font-bold text-on-surface mb-6 uppercase tracking-wider">Product</h4>
                <ul className="flex flex-col gap-4">
                  <li><Link href="/feasibility" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Feasibility Tool</Link></li>
                  <li><Link href="/dashboard" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Project Management</Link></li>
                  <li><Link href="/e-reception" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Smart E-Reception</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-label-md font-bold text-on-surface mb-6 uppercase tracking-wider">Company</h4>
                <ul className="flex flex-col gap-4">
                  <li><Link href="/about" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-label-md font-bold text-on-surface mb-6 uppercase tracking-wider">Legal</h4>
                <ul className="flex flex-col gap-4">
                  <li><Link href="/terms" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="font-body-md text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body-md text-on-surface-variant font-medium">
                &copy; {new Date().getFullYear()} Lightrees OS. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-label-sm text-on-surface-variant font-bold">System Status: All systems operational</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
