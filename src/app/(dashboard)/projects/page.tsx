export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wider uppercase mb-2 border border-orange-200 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">architecture</span> Development
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Projects
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Track project timelines, budgets, and milestones.
        </p>
      </header>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col group relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="p-6 border-b border-outline-variant/40 flex justify-between items-center relative z-10">
          <h2 className="font-headline-md text-[22px] font-black text-on-surface flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
            Active Projects
          </h2>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-[18px]">add</span> New Project
          </button>
        </div>
        <div className="overflow-x-auto relative z-10 p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant font-label-sm uppercase tracking-wider border-b border-outline-variant/40">
                <th className="p-4 font-bold">Project Name</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Progress</th>
                <th className="p-4 font-bold">Budget</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-on-surface">
              {[
                { name: "Bintaro Cluster A", status: "In Progress", progress: 65, budget: "Rp 5.2B" },
                { name: "Serpong Townhouse", status: "Planning", progress: 15, budget: "Rp 12.5B" },
                { name: "Depok Residence", status: "Completed", progress: 100, budget: "Rp 3.8B" },
                { name: "Kemang Villas", status: "Delayed", progress: 45, budget: "Rp 25.0B" },
              ].map((project, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors group/row">
                  <td className="p-4 font-label-md font-bold">{project.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold border inline-block
                      ${project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                        project.status === 'Delayed' ? 'bg-red-100 text-red-700 border-red-200' : 
                        project.status === 'Planning' ? 'bg-surface-variant text-on-surface-variant border-outline-variant' :
                        'bg-[#fff8e1] text-[#b08d00] border-[#ffe082]'
                      }
                    `}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 w-1/4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden shadow-inner border border-outline-variant/20">
                        <div className={`h-full relative ${project.status === 'Completed' ? 'bg-emerald-500' : project.status === 'Delayed' ? 'bg-red-500' : project.status === 'Planning' ? 'bg-outline' : 'bg-primary'}`} style={{ width: `${project.progress}%` }}>
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                      </div>
                      <span className="font-label-sm font-bold text-on-surface-variant w-9">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-body-md text-[15px] font-medium text-on-surface-variant">{project.budget}</td>
                  <td className="p-4 text-right">
                    <button className="text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors p-2 rounded-xl">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
