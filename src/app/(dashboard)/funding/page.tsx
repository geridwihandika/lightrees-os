export default function FundingPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Funding Portal</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Review funding applications, investor relations, and capital allocation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary">account_balance_wallet</span> Current Capital</h2>
            <button className="text-primary hover:text-primary-container font-label-md">Deposit/Withdraw</button>
          </div>
          <div>
            <h3 className="font-stat-lg text-[40px] font-bold text-on-surface">Rp 45.2B</h3>
            <p className="font-body-md text-on-surface-variant mt-1">Available for allocation</p>
          </div>
          <div className="w-full bg-surface-variant rounded-full h-3 mt-4">
            <div className="bg-primary h-3 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>Allocated: 65%</span>
            <span>Target: Rp 100B</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-secondary">groups</span> Investor Relations</h2>
            <button className="text-primary hover:text-primary-container font-label-md">Manage</button>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {[1, 2, 3].map((investor) => (
              <div key={investor} className="flex justify-between items-center p-3 rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-outline-variant">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface">Investor {investor}</p>
                    <p className="font-label-sm text-on-surface-variant">Venture Capital</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface font-bold">Rp 15.0B</p>
                  <p className="font-label-sm text-primary">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
