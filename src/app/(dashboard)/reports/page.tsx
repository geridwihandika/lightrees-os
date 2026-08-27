export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-wider uppercase mb-2 border border-violet-200 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">query_stats</span> Analytics
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Financial Reports
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Monitor revenue, expenses, and cash flow across all operations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-colors"></div>
          <p className="font-label-sm text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 relative z-10">Total Revenue (YTD)</p>
          <h2 className="font-display-md text-[36px] text-on-surface font-black relative z-10 tracking-tight">Rp 12.4B</h2>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 shadow-sm relative z-10">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>+18.2%</span>
            <span className="text-emerald-600/70 font-medium ml-1">vs last year</span>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-red-500/20 transition-colors"></div>
          <p className="font-label-sm text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 relative z-10">Total Expenses (YTD)</p>
          <h2 className="font-display-md text-[36px] text-on-surface font-black relative z-10 tracking-tight">Rp 4.1B</h2>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-sm font-bold border border-red-100 shadow-sm relative z-10">
            <span className="material-symbols-outlined text-[18px]">trending_down</span>
            <span>+5.4%</span>
            <span className="text-red-600/70 font-medium ml-1">vs last year</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-500/20 transition-colors"></div>
          <p className="font-label-sm text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 relative z-10">Net Profit Margin</p>
          <h2 className="font-display-md text-[36px] text-on-surface font-black relative z-10 tracking-tight">66.9%</h2>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 shadow-sm relative z-10">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>+2.1%</span>
            <span className="text-emerald-600/70 font-medium ml-1">vs last year</span>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-outline-variant/30 shadow-sm p-12 flex flex-col items-center justify-center min-h-[500px] text-on-surface-variant text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="w-24 h-24 bg-surface-container rounded-3xl flex items-center justify-center shadow-sm mb-6 border border-outline-variant/20 relative z-10">
          <span className="material-symbols-outlined text-[48px] text-primary/40">bar_chart</span>
        </div>
        <h3 className="font-headline-sm text-[24px] font-black text-on-surface relative z-10">Financial Charts Placeholder</h3>
        <p className="font-body-md text-[16px] font-medium max-w-md mt-3 relative z-10">Interactive charts will be rendered here. You can use libraries like Chart.js or Recharts to visualize the financial data.</p>
      </div>
    </div>
  );
}
