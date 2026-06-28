import Link from "next/link";

export default function LoginPage() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center relative w-full"
      style={{
        backgroundImage: "url('https://i.pinimg.com/originals/4b/f7/76/4bf776fbe5d45f4bc0e602771fddde5b.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      
      <div className="w-full max-w-[480px] z-10 px-4">
        <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-2xl flex flex-col w-full relative overflow-hidden border border-white/60">
          
          <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </div>
          </Link>

          <div className="mb-10 mt-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-white text-[24px]">account_balance</span>
              </div>
            </div>
            <h1 className="font-headline-lg text-[32px] font-black text-on-surface tracking-tight leading-tight">Welcome Back</h1>
            <p className="font-body-md text-on-surface-variant mt-2 font-medium">Log in to Lightrees OS admin panel.</p>
          </div>

          <form className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-on-surface font-bold">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  type="email" 
                  placeholder="admin@lightrees.com" 
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface rounded-xl pl-12 pr-4 py-3.5 font-body-md focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-on-surface font-bold">Password</label>
                <a href="#" className="font-label-sm text-primary hover:text-primary-container transition-colors font-bold">Forgot?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface rounded-xl pl-12 pr-12 py-3.5 font-body-md focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer" />
              <label htmlFor="remember" className="font-label-md text-on-surface-variant cursor-pointer">Remember me</label>
            </div>

            <Link href="/dashboard" className="w-full bg-primary text-white py-4 rounded-xl font-label-md font-bold hover:bg-primary-container hover:text-white hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-primary/40 mt-4 flex justify-center items-center gap-2 text-[16px]">
              Sign In <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
            
            <div className="relative flex items-center justify-center mt-6 mb-2">
              <div className="absolute border-t border-outline-variant/50 w-full"></div>
              <span className="bg-white px-4 font-label-sm text-on-surface-variant relative font-bold tracking-wider">OR</span>
            </div>
            
            <button type="button" className="w-full bg-white border-2 border-outline-variant/30 text-on-surface py-3.5 rounded-xl font-label-md font-bold hover:bg-surface-container-lowest hover:-translate-y-0.5 transition-all flex justify-center items-center gap-3 text-[16px] shadow-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
