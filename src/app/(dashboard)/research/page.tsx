export default function ResearchPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Market Research</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Analyze market trends, property values, and competitor pricing.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        <div className="xl:col-span-1 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">Search Query</h2>
            <div className="flex flex-col gap-unit">
              <label className="font-label-md text-on-surface-variant">Region / City</label>
              <input type="text" className="bg-surface border border-outline-variant rounded-lg p-2 font-body-md focus:ring-primary focus:border-primary" placeholder="e.g., South Jakarta" />
            </div>
            <div className="flex flex-col gap-unit">
              <label className="font-label-md text-on-surface-variant">Property Type</label>
              <select className="bg-surface border border-outline-variant rounded-lg p-2 font-body-md focus:ring-primary focus:border-primary">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            <button className="bg-primary text-on-primary py-2 rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm w-full mt-2 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">search</span> Analyze Market
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Trend Analysis</h2>
              <p className="font-body-md text-on-surface-variant">Price per square meter over the last 12 months</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md bg-surface-variant text-on-surface-variant text-xs font-medium">1M</button>
              <button className="px-3 py-1 rounded-md bg-primary-container text-on-primary-container text-xs font-medium">1Y</button>
              <button className="px-3 py-1 rounded-md bg-surface-variant text-on-surface-variant text-xs font-medium">5Y</button>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-center justify-center text-on-surface-variant bg-surface rounded-xl border border-outline-variant border-dashed">
            <div className="text-center">
              <span className="material-symbols-outlined text-[48px] opacity-30 mb-2">monitoring</span>
              <p className="font-body-md">Chart Data Visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
