export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-margin-page animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Projects</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Track project timelines, budgets, and milestones.</p>
      </header>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-headline-md text-headline-md text-on-surface">Active Projects</h2>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span> New Project
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant text-on-surface-variant font-label-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Project Name</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Progress</th>
                <th className="p-4 font-medium">Budget</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-on-surface">
              {[
                { name: "Bintaro Cluster A", status: "In Progress", progress: 65, budget: "Rp 5.2B" },
                { name: "Serpong Townhouse", status: "Planning", progress: 15, budget: "Rp 12.5B" },
                { name: "Depok Residence", status: "Completed", progress: 100, budget: "Rp 3.8B" },
                { name: "Kemang Villas", status: "Delayed", progress: 45, budget: "Rp 25.0B" },
              ].map((project, idx) => (
                <tr key={idx} className="hover:bg-surface transition-colors group">
                  <td className="p-4 font-label-md">{project.name}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                      ${project.status === 'Completed' ? 'bg-primary-container text-on-primary-container border-primary-container' : 
                        project.status === 'Delayed' ? 'bg-error-container text-on-error-container border-error-container' : 
                        project.status === 'Planning' ? 'bg-surface-variant text-on-surface-variant border-outline-variant' :
                        'bg-[#e9c349]/20 text-[#735c00] border-[#e9c349]/30'
                      }
                    `}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                        <div className={`h-full ${project.status === 'Completed' ? 'bg-primary' : project.status === 'Delayed' ? 'bg-error' : 'bg-tertiary-container'}`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="font-label-sm text-on-surface-variant w-8">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-body-md text-on-surface-variant">{project.budget}</td>
                  <td className="p-4 text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-variant">
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
