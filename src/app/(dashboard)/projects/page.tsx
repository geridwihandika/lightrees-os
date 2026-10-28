"use client";

import { useState } from "react";
import {
  FolderKanban,
  Plus,
  MoreVertical,
  Sparkles,
  X,
  CheckSquare,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  status: "In Progress" | "Planning" | "Completed" | "Delayed";
  progress: number;
  budget: string;
  spent: string;
  timeline: string;
}

interface KanbanTask {
  id: string;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  assignee: string;
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"kurvaS" | "kanban">("kurvaS");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Projects list
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "p1",
      name: "Bintaro Cluster Sektor 9 (Tahap 1)",
      type: "DEVELOPMENT",
      status: "In Progress",
      progress: 68,
      budget: "Rp 5.2B",
      spent: "Rp 3.4B",
      timeline: "Jan 2025 - Agu 2025",
    },
    {
      id: "p2",
      name: "Serpong Townhouse Modern",
      type: "PLANNING",
      status: "Planning",
      progress: 18,
      budget: "Rp 12.5B",
      spent: "Rp 1.8B",
      timeline: "Mar 2025 - Des 2025",
    },
    {
      id: "p3",
      name: "Renovasi Ruko Senopati Prime",
      type: "RENOVATION",
      status: "Completed",
      progress: 100,
      budget: "Rp 2.4B",
      spent: "Rp 2.35B",
      timeline: "Okt 2024 - Feb 2025",
    },
    {
      id: "p4",
      name: "Kemang Villas & Resort",
      type: "DEVELOPMENT",
      status: "Delayed",
      progress: 42,
      budget: "Rp 25.0B",
      spent: "Rp 14.1B",
      timeline: "Agu 2024 - Jul 2025",
    },
  ]);

  // Tasks list for Kanban
  const [tasks, setTasks] = useState<KanbanTask[]>([
    { id: "t1", title: "Pengecoran Pondasi Bore Pile Cluster B", project: "Bintaro Cluster", priority: "High", status: "DONE", assignee: "Ir. Bambang" },
    { id: "t2", title: "Instalasi ME & Plumbing Lantai 2", project: "Bintaro Cluster", priority: "High", status: "IN_PROGRESS", assignee: "Agus Santoso" },
    { id: "t3", title: "Review Gambar DED Arsitektur", project: "Serpong Townhouse", priority: "Medium", status: "REVIEW", assignee: "Diana Putri" },
    { id: "t4", title: "Pengurusan PBG & Izin Lingkungan", project: "Serpong Townhouse", priority: "High", status: "TODO", assignee: "Hendra Wijaya" },
    { id: "t5", title: "Pemasangan Rangka Atap Baja Ringan", project: "Kemang Villas", priority: "High", status: "IN_PROGRESS", assignee: "Siti Rahma" },
    { id: "t6", title: "Handover Unit ke Pemilik", project: "Ruko Senopati", priority: "Low", status: "DONE", assignee: "Tim Legal" },
  ]);

  // S-Curve Construction Tracking Data
  const sCurveData = [
    { week: "M1", rencana: 5, realisasi: 6 },
    { week: "M4", rencana: 14, realisasi: 15 },
    { week: "M8", rencana: 28, realisasi: 30 },
    { week: "M12", rencana: 45, realisasi: 42 },
    { week: "M16", rencana: 62, realisasi: 68 },
    { week: "M20", rencana: 78, realisasi: 74 },
    { week: "M24", rencana: 90, realisasi: 86 },
    { week: "M28", rencana: 100, realisasi: null },
  ];

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: "",
    type: "DEVELOPMENT",
    budget: "",
    timeline: "6 Bulan",
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ProjectItem = {
      id: `p-${Date.now()}`,
      name: newProject.name,
      type: newProject.type,
      status: "Planning",
      progress: 5,
      budget: `Rp ${Number(newProject.budget || 0).toLocaleString("id-ID")}`,
      spent: "Rp 0",
      timeline: newProject.timeline,
    };
    setProjects([created, ...projects]);
    setIsModalOpen(false);
    toast.success(`Proyek "${created.name}" berhasil dibuat!`);
  };

  const handleMoveTask = (taskId: string, newStatus: KanbanTask["status"]) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    toast.success("Status task berhasil diperbarui!");
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase mb-1 border border-orange-200 shadow-sm w-fit">
            <FolderKanban className="w-3.5 h-3.5 text-orange-600" /> Project ERP &amp; Construction Engineering
          </div>
          <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
            Projects Management Hub
          </h1>
          <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
            Monitoring kurva S konstruksi, deviasi jadwal riil vs rencana, anggaran proyek, dan eksekusi task lapangan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-white border border-outline-variant/40 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("kurvaS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "kurvaS"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Kurva S &amp; Portofolio
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kanban")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "kanban"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Kanban Tasks ({tasks.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-xs font-bold hover:bg-primary-container transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </header>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Anggaran Proyek</p>
          <h3 className="font-display-md text-[28px] font-black text-on-surface">Rp 45.1B</h3>
          <p className="text-xs text-primary font-bold mt-1">4 Proyek Aktif</p>
        </div>
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Realisasi Anggaran</p>
          <h3 className="font-display-md text-[28px] font-black text-on-surface">Rp 21.65B</h3>
          <p className="text-xs text-emerald-700 font-bold mt-1">48% Serapan Anggaran</p>
        </div>
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Deviasi Jadwal Kurva S</p>
          <h3 className="font-display-md text-[28px] font-black text-emerald-600">+6.0%</h3>
          <p className="text-xs text-emerald-700 font-bold mt-1">Ahead of Schedule</p>
        </div>
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Task Lapangan Selesai</p>
          <h3 className="font-display-md text-[28px] font-black text-on-surface">67%</h3>
          <p className="text-xs text-on-surface-variant font-medium mt-1">2 Selesai • 4 On-Track</p>
        </div>
      </div>

      {activeTab === "kurvaS" ? (
        <>
          {/* Kurva S Construction Progress Chart */}
          <div className="bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Kurva S Konstruksi Lapangan: Rencana vs Realisasi (%)
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Proyek Benchmark: Bintaro Cluster Sektor 9 (Tahap 1 Konstruksi Struktur &amp; Arsitektur)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Status: On Track
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sCurveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" opacity={0.6} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#707976" }} />
                  <YAxis
                    tickFormatter={(val) => `${val}%`}
                    tick={{ fontSize: 10, fill: "#707976" }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(val: any) => [`${val}%`, ""]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      borderColor: "#c0c8c5",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Line
                    type="monotone"
                    dataKey="rencana"
                    name="Target Baseline Rencana (%)"
                    stroke="#707976"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="realisasi"
                    name="Realisasi Fisik Riil (%)"
                    stroke="#13423C"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#13423C" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Projects Table */}
          <div className="bg-white/85 backdrop-blur-xl rounded-[2rem] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-headline-md text-lg font-black text-on-surface flex items-center gap-2.5">
                <FolderKanban className="w-5 h-5 text-primary" /> Daftar Proyek Konstruksi &amp; Pengembangan
              </h3>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                {projects.length} Proyek
              </span>
            </div>

            <div className="overflow-x-auto p-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-on-surface-variant font-bold uppercase tracking-wider border-b border-outline-variant/30 text-[10px]">
                    <th className="p-4">Nama Proyek</th>
                    <th className="p-4">Tipe &amp; Timeline</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progres Fisik</th>
                    <th className="p-4">Budget / Realisasi</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {projects.map((p) => {
                    const statusClass =
                      p.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : p.status === "Delayed"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : p.status === "Planning"
                        ? "bg-surface-variant text-on-surface-variant border-outline-variant"
                        : "bg-amber-100 text-amber-800 border-amber-300";

                    return (
                      <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-sm text-on-surface">{p.name}</p>
                          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{p.id}</p>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-[10px] text-primary uppercase block">{p.type}</span>
                          <span className="text-[11px] text-on-surface-variant">{p.timeline}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border inline-block ${statusClass}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 w-1/4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2.5 bg-surface-container rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  p.status === "Completed"
                                    ? "bg-emerald-500"
                                    : p.status === "Delayed"
                                    ? "bg-red-500"
                                    : "bg-primary"
                                }`}
                                style={{ width: `${p.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-black text-on-surface w-9">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-on-surface">{p.budget}</p>
                          <p className="text-[11px] text-on-surface-variant">Terpakai: {p.spent}</p>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => toast.info(`Detail proyek ${p.name}`)}
                            className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Kanban Task Board View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const).map((colStatus) => {
            const colTitle =
              colStatus === "TODO"
                ? "Menunggu Dikerjakan"
                : colStatus === "IN_PROGRESS"
                ? "Sedang Berjalan"
                : colStatus === "REVIEW"
                ? "Tahap Verifikasi"
                : "Selesai (Done)";

            const colTasks = tasks.filter((t) => t.status === colStatus);

            return (
              <div key={colStatus} className="bg-surface-container/60 rounded-2xl p-4 flex flex-col gap-3 border border-outline-variant/30">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                  <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">{colTitle}</h4>
                  <span className="text-[11px] font-black bg-white px-2 py-0.5 rounded-full text-primary shadow-sm">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 flex-1 min-h-[300px]">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/40 space-y-2 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                          {t.project}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            t.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>
                      <p className="font-bold text-xs text-on-surface">{t.title}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20 text-[10px] text-on-surface-variant">
                        <span>PIC: {t.assignee}</span>
                        {colStatus !== "DONE" ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleMoveTask(
                                t.id,
                                colStatus === "TODO"
                                  ? "IN_PROGRESS"
                                  : colStatus === "IN_PROGRESS"
                                  ? "REVIEW"
                                  : "DONE"
                              )
                            }
                            className="text-primary font-bold hover:underline"
                          >
                            Lanjut →
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                            <CheckSquare className="w-3 h-3" /> Approved
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-7 max-w-md w-full shadow-2xl border border-outline-variant/40 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container text-on-surface-variant"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-headline-md text-lg font-black text-on-surface mb-4">
              Buat Proyek Konstruksi Baru
            </h3>
            <form onSubmit={handleCreateProject} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase">Nama Proyek</label>
                <input
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Contoh: Depok Townhouse Cluster B"
                  className="w-full mt-1 border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase">Total Anggaran (Rp)</label>
                <input
                  type="number"
                  required
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                  placeholder="e.g. 5000000000"
                  className="w-full mt-1 border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase">Target Durasi Timeline</label>
                <input
                  value={newProject.timeline}
                  onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
                  placeholder="e.g. 8 Bulan"
                  className="w-full mt-1 border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-on-surface-variant"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-container"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

