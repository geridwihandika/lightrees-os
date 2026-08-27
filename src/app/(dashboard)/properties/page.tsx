export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/50 backdrop-blur-md text-secondary text-xs font-bold tracking-wider uppercase mb-2 border border-secondary/20 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">domain</span> Portfolio
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Properties
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Manage your portfolio of 80+ properties across multiple locations.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-[1.5rem] border border-outline-variant/30 shadow-sm gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-white border border-outline-variant/50 rounded-xl px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all w-full sm:w-72 shadow-sm">
            <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
            <input type="text" placeholder="Search properties..." className="bg-transparent border-none outline-none font-body-md text-[15px] font-medium text-on-surface w-full placeholder:text-outline p-0 focus:ring-0" />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-outline-variant/50 text-on-surface bg-white hover:bg-surface-container-lowest transition-all font-label-md font-bold shadow-sm w-full sm:w-auto">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-label-md font-bold hover:bg-primary-container hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto">
          <span className="material-symbols-outlined text-[18px]">add</span> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white/80 backdrop-blur-lg rounded-[2rem] border border-outline-variant/40 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="h-56 bg-surface-variant relative overflow-hidden">
              <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt="Property" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg text-xs font-black text-emerald-600 shadow-sm border border-white">
                ACTIVE
              </div>
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1 relative bg-white/50">
              <div>
                <h3 className="font-headline-sm text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors">Modern Cluster House {item}</h3>
                <p className="font-body-md text-[14px] text-on-surface-variant font-medium flex items-center gap-1.5 mt-2">
                  <span className="material-symbols-outlined text-[18px] text-primary/70">location_on</span> Bintaro, South Tangerang
                </p>
              </div>
              <div className="flex justify-between items-end mt-auto pt-5 border-t border-outline-variant/40">
                <div>
                  <p className="font-label-sm text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Market Value</p>
                  <p className="font-display-sm text-[24px] font-black text-on-surface mt-0.5">Rp 1.2B</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
