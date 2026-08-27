export default function FundingPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-200 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">payments</span> Finance Hub
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Funding Portal
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Review funding applications, investor relations, and capital allocation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex justify-between items-center border-b border-outline-variant/40 pb-5 relative z-10">
            <h2 className="font-headline-md text-[22px] font-black text-on-surface flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              Current Capital
            </h2>
            <button className="text-primary font-label-md font-bold hover:text-primary-container transition-colors bg-primary/10 px-4 py-2 rounded-lg">Deposit</button>
          </div>
          <div className="relative z-10">
            <p className="font-label-sm text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Available for allocation</p>
            <h3 className="font-display-lg text-[48px] font-black text-on-surface tracking-tight">Rp 45.2B</h3>
          </div>
          <div className="mt-4 relative z-10">
            <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden shadow-inner">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-4 rounded-full relative" style={{ width: '65%' }}>
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold text-on-surface-variant mt-3">
              <span className="text-emerald-600">Allocated: 65%</span>
              <span>Target: Rp 100B</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex justify-between items-center border-b border-outline-variant/40 pb-5 relative z-10">
            <h2 className="font-headline-md text-[22px] font-black text-on-surface flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
              Investor Relations
            </h2>
            <button className="text-secondary font-label-md font-bold hover:text-secondary-container transition-colors bg-secondary/10 px-4 py-2 rounded-lg">Manage</button>
          </div>
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto relative z-10">
            {[1, 2, 3].map((investor) => (
              <div key={investor} className="flex justify-between items-center p-4 rounded-xl bg-white/50 border border-outline-variant/40 hover:bg-white hover:shadow-md hover:border-outline-variant transition-all cursor-pointer group/item">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shadow-sm border border-outline-variant/50 group-hover/item:text-secondary group-hover/item:scale-110 transition-transform">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="font-label-md text-[16px] font-bold text-on-surface group-hover/item:text-primary transition-colors">Investor {investor}</p>
                    <p className="font-label-sm text-[13px] font-medium text-on-surface-variant mt-0.5">Venture Capital</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-[16px] font-black text-on-surface">Rp 15.0B</p>
                  <p className="font-label-sm text-[12px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-1">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
