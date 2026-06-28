export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Financial Reports</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Monitor revenue, expenses, and cash flow across all operations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm hover-lift">
          <p className="font-label-md text-on-surface-variant mb-1">Total Revenue (YTD)</p>
          <h2 className="font-stat-lg text-[32px] text-on-surface font-bold">Rp 12.4B</h2>
          <p className="text-sm text-primary mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> +18.2% vs last year</p>
        </div>
        <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm hover-lift">
          <p className="font-label-md text-on-surface-variant mb-1">Total Expenses (YTD)</p>
          <h2 className="font-stat-lg text-[32px] text-on-surface font-bold">Rp 4.1B</h2>
          <p className="text-sm text-error mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_down</span> +5.4% vs last year</p>
        </div>
        <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm hover-lift">
          <p className="font-label-md text-on-surface-variant mb-1">Net Profit Margin</p>
          <h2 className="font-stat-lg text-[32px] text-on-surface font-bold">66.9%</h2>
          <p className="text-sm text-primary mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span> +2.1% vs last year</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-card-padding flex flex-col items-center justify-center min-h-[400px] text-on-surface-variant text-center">
        <span className="material-symbols-outlined text-[64px] mb-4 opacity-50">bar_chart</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Financial Charts</h3>
        <p className="font-body-md text-body-md max-w-md mt-2">Interactive charts will be rendered here. You can use libraries like Chart.js or Recharts to visualize the financial data.</p>
      </div>
    </div>
  );
}
