export default function EReceptionPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">E-Reception</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Automated visitor management and smart access control.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sensor_door</span> Smart Access Logs
            </h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant text-on-surface-variant font-label-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Visitor Name</th>
                  <th className="p-4 font-medium">Destination</th>
                  <th className="p-4 font-medium">Time In</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-on-surface">
                {[
                  { name: "John Doe", dest: "Unit 102", time: "09:42 AM", status: "Active" },
                  { name: "Sarah Smith", dest: "Unit 405", time: "11:15 AM", status: "Active" },
                  { name: "Mike Johnson", dest: "Maintenance", time: "08:00 AM", status: "Checked Out" },
                ].map((log, idx) => (
                  <tr key={idx} className="hover:bg-surface transition-colors">
                    <td className="p-4 font-label-md flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                        {log.name.charAt(0)}
                      </div>
                      {log.name}
                    </td>
                    <td className="p-4 font-body-md text-on-surface-variant">{log.dest}</td>
                    <td className="p-4 font-body-md text-on-surface-variant">{log.time}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                        log.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-variant text-on-surface-variant border-outline-variant'
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

        <div className="flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Generate Pass</h2>
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface-variant">Visitor Name</label>
                <input type="text" className="bg-surface border border-outline-variant rounded-lg p-2 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface-variant">Unit / Room</label>
                <input type="text" className="bg-surface border border-outline-variant rounded-lg p-2 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <button type="button" className="bg-primary text-on-primary py-2 mt-2 rounded-lg font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm w-full flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">qr_code</span> Generate QR Pass
              </button>
            </form>
          </div>

          <div className="bg-surface-container-lowest p-card-padding rounded-xl border border-outline-variant shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Device Status</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center p-2 rounded-md bg-surface border border-outline-variant">
                <span className="font-body-md text-on-surface">Main Gate</span>
                <span className="text-primary font-bold text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Online</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-surface border border-outline-variant">
                <span className="font-body-md text-on-surface">Lobby Door</span>
                <span className="text-primary font-bold text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
