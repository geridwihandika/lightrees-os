export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Properties</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your portfolio of 80+ properties across multiple locations.</p>
      </header>

      <div className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container border border-outline-variant rounded-full px-4 py-2 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
            <input type="text" placeholder="Search properties..." className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface w-64 placeholder:text-outline p-0 focus:ring-0" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
          </button>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm hover-lift">
          <span className="material-symbols-outlined text-[18px]">add</span> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover-lift flex flex-col group">
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-md text-xs font-bold text-primary">Active</div>
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Modern Cluster House {item}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span> Bintaro, South Tangerang
                </p>
              </div>
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-outline-variant">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Market Value</p>
                  <p className="font-label-md text-label-md font-bold text-on-surface mt-0.5">Rp 1.2B</p>
                </div>
                <button className="text-primary hover:text-primary-container font-label-md">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
