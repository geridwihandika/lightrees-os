export default function EReceptionPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2 border border-blue-200 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">sensor_door</span> Smart Access
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          E-Reception
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Automated visitor management and smart access control.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col relative group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="p-6 border-b border-outline-variant/40 flex justify-between items-center relative z-10">
            <h2 className="font-headline-md text-[22px] font-black text-on-surface flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">sensor_door</span>
              </div>
              Smart Access Logs
            </h2>
            <button className="text-primary font-label-md font-bold hover:text-primary-container transition-colors">Export</button>
          </div>
          <div className="overflow-x-auto flex-1 relative z-10 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant font-label-sm uppercase tracking-wider border-b border-outline-variant/40">
                  <th className="p-4 font-bold">Visitor Name</th>
                  <th className="p-4 font-bold">Destination</th>
                  <th className="p-4 font-bold">Time In</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-on-surface">
                {[
                  { name: "John Doe", dest: "Unit 102", time: "09:42 AM", status: "Active" },
                  { name: "Sarah Smith", dest: "Unit 405", time: "11:15 AM", status: "Active" },
                  { name: "Mike Johnson", dest: "Maintenance", time: "08:00 AM", status: "Checked Out" },
                ].map((log, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-colors group/row">
                    <td className="p-4 font-label-md flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-sm font-bold shadow-sm border border-outline-variant/50 group-hover/row:border-primary/30 group-hover/row:text-primary transition-colors">
                        {log.name.charAt(0)}
                      </div>
                      <span className="font-bold">{log.name}</span>
                    </td>
                    <td className="p-4 font-body-md text-[15px] font-medium text-on-surface-variant">{log.dest}</td>
                    <td className="p-4 font-body-md text-[15px] font-medium text-on-surface-variant">{log.time}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold border inline-block ${
                        log.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-surface-variant text-on-surface-variant border-outline-variant'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <h2 className="font-headline-md text-[22px] font-black text-on-surface mb-6 relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">qr_code_scanner</span> Generate Pass
            </h2>
            <form className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Visitor Name</label>
                <input type="text" className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" placeholder="e.g. Jane Doe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Unit / Room</label>
                <input type="text" className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" placeholder="e.g. Unit 204" />
              </div>
              <button type="button" className="bg-primary text-white py-3.5 mt-2 rounded-xl font-label-md font-bold hover:bg-primary-container transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full flex justify-center items-center gap-2 text-[15px]">
                <span className="material-symbols-outlined text-[20px]">qr_code</span> Generate QR Pass
              </button>
            </form>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <h2 className="font-headline-sm text-[18px] font-black text-on-surface mb-4">Device Status</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/50 border border-outline-variant/40 hover:bg-white hover:border-primary/30 transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">meeting_room</span>
                  <span className="font-label-md font-bold text-on-surface">Main Gate</span>
                </div>
                <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md font-bold text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/50 border border-outline-variant/40 hover:bg-white hover:border-primary/30 transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">door_front</span>
                  <span className="font-label-md font-bold text-on-surface">Lobby Door</span>
                </div>
                <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md font-bold text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
