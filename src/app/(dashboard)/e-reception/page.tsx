"use client";

import { useState } from "react";
import {
  DoorClosed,
  QrCode,
  UserCheck,
  ShieldCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface VisitorLog {
  id: string;
  name: string;
  phone: string;
  dest: string;
  host: string;
  timeIn: string;
  validUntil: string;
  status: "Active" | "Checked Out" | "Expired";
  passCode: string;
}

export default function EReceptionPage() {
  const [visitorForm, setVisitorForm] = useState({
    name: "",
    phone: "",
    destination: "Unit 204 (Tower Alpha)",
    host: "Ibu Amanda (Marketing)",
    purpose: "Survey Unit & Negosiasi",
    durationHours: "4",
  });

  const [activePass, setActivePass] = useState<{
    token: string;
    name: string;
    dest: string;
    validUntil: string;
    phone: string;
  } | null>(null);

  const [logs, setLogs] = useState<VisitorLog[]>([
    {
      id: "VIS-101",
      name: "Bpk. Rahmat Hidayat",
      phone: "081299887766",
      dest: "Unit 102 - Cluster Bintaro",
      host: "Admin Properti",
      timeIn: "09:42 WIB",
      validUntil: "13:42 WIB",
      status: "Active",
      passCode: "LT-PASS-9821",
    },
    {
      id: "VIS-102",
      name: "Sarah Novita, S.T.",
      phone: "085711223344",
      dest: "Unit 405 - Ruko BSD",
      host: "Tim Konstruksi",
      timeIn: "11:15 WIB",
      validUntil: "15:15 WIB",
      status: "Active",
      passCode: "LT-PASS-4412",
    },
    {
      id: "VIS-103",
      name: "Teknisi Maintenance Indihome",
      phone: "081300998811",
      dest: "Ruang Server & Panel",
      host: "Building Management",
      timeIn: "08:00 WIB",
      validUntil: "12:00 WIB",
      status: "Checked Out",
      passCode: "LT-PASS-1092",
    },
  ]);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorForm.name) {
      toast.error("Nama tamu wajib diisi.");
      return;
    }

    const token = `LT-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const expiry = new Date(now.getTime() + Number(visitorForm.durationHours) * 3600 * 1000);
    const validUntilStr = expiry.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";

    const newLog: VisitorLog = {
      id: `VIS-${Date.now().toString().slice(-3)}`,
      name: visitorForm.name,
      phone: visitorForm.phone,
      dest: visitorForm.destination,
      host: visitorForm.host,
      timeIn: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      validUntil: validUntilStr,
      status: "Active",
      passCode: token,
    };

    setLogs([newLog, ...logs]);
    setActivePass({
      token,
      name: visitorForm.name,
      dest: visitorForm.destination,
      validUntil: validUntilStr,
      phone: visitorForm.phone,
    });

    toast.success(`Digital Pass QR berhasil di-generate untuk ${visitorForm.name}!`);
  };

  const handleCheckOut = (logId: string) => {
    setLogs((prev) =>
      prev.map((l) => (l.id === logId ? { ...l, status: "Checked Out" } : l))
    );
    toast.success("Tamu berhasil di-check out.");
  };

  const handleSendWhatsapp = (phone: string, passCode: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone;
    const text = encodeURIComponent(
      `Halo ${name}, ini adalah E-Reception Pass digital Anda untuk akses Lightrees Properties.\n\nKode Pass: *${passCode}*\nStatus: Valid\n\nTunjukkan pesan ini kepada petugas gerbang/turnstile. Terima kasih!`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <header className="flex flex-col gap-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase mb-1 border border-blue-200 shadow-sm w-fit">
          <DoorClosed className="w-3.5 h-3.5 text-blue-600" /> Smart IoT Access &amp; Digital Reception
        </div>
        <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
          Smart E-Reception
        </h1>
        <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
          Manajemen akses tamu otomatis, pembuatan digital pass QR dinamis, dan verifikasi gerbang IoT.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Visitor Pass Form & Pass Preview */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
            <h2 className="font-headline-md text-lg font-black text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-3">
              <QrCode className="w-5 h-5 text-primary" /> Generate Digital Visitor Pass
            </h2>

            <form onSubmit={handleGeneratePass} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                  Nama Lengkap Tamu
                </label>
                <input
                  required
                  value={visitorForm.name}
                  onChange={(e) => setVisitorForm({ ...visitorForm, name: e.target.value })}
                  placeholder="Contoh: Bpk. Kurniawan Pratama"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Nomor WhatsApp Tamu
                  </label>
                  <input
                    value={visitorForm.phone}
                    onChange={(e) => setVisitorForm({ ...visitorForm, phone: e.target.value })}
                    placeholder="081234567890"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Durasi Validitas
                  </label>
                  <select
                    value={visitorForm.durationHours}
                    onChange={(e) => setVisitorForm({ ...visitorForm, durationHours: e.target.value })}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary font-medium"
                  >
                    <option value="2">2 Jam Akses</option>
                    <option value="4">4 Jam Akses (Standar)</option>
                    <option value="8">8 Jam (Full-day)</option>
                    <option value="24">24 Jam (Kontraktor)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                  Tujuan Unit / Ruangan
                </label>
                <input
                  value={visitorForm.destination}
                  onChange={(e) => setVisitorForm({ ...visitorForm, destination: e.target.value })}
                  placeholder="e.g. Unit 204 / Show Unit Cluster A"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                  Tujuan Kunjungan
                </label>
                <input
                  value={visitorForm.purpose}
                  onChange={(e) => setVisitorForm({ ...visitorForm, purpose: e.target.value })}
                  placeholder="e.g. Survey Unit & Negosiasi"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-xs outline-none focus:border-primary font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-label-md text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" /> Terbitkan QR Pass Tamu
              </button>
            </form>
          </div>

          {/* Active Pass Card Preview */}
          {activePass && (
            <div className="bg-primary/5 rounded-[2rem] p-6 border-2 border-primary/20 shadow-sm flex flex-col gap-4 relative overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xs">
                    LT
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-on-surface">Digital Gate Pass</h3>
                    <p className="text-[10px] text-on-surface-variant">Lightrees Access Control</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  VALID ACTIVE
                </span>
              </div>

              {/* QR Mock Visual */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/40 flex-shrink-0">
                  <QrCode className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <p className="font-bold text-on-surface text-sm">{activePass.name}</p>
                  <p className="text-on-surface-variant text-[11px]">{activePass.dest}</p>
                  <p className="text-[10px] text-primary font-mono font-bold">{activePass.token}</p>
                  <p className="text-[10px] text-amber-700 font-semibold">Valid s/d {activePass.validUntil}</p>
                </div>
              </div>

              {activePass.phone && (
                <button
                  type="button"
                  onClick={() =>
                    handleSendWhatsapp(activePass.phone, activePass.token, activePass.name)
                  }
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Pass via WhatsApp
                </button>
              )}
            </div>
          )}

          {/* IoT Gate Status */}
          <div className="bg-white/85 backdrop-blur-xl p-5 rounded-[2rem] border border-outline-variant/30 shadow-sm space-y-3">
            <h3 className="font-bold text-xs text-on-surface uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Status Perangkat Akses IoT Gerbang
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-surface rounded-xl border border-outline-variant/20">
                <span className="font-semibold text-on-surface">Main Gate Turnstile</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Online
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface rounded-xl border border-outline-variant/20">
                <span className="font-semibold text-on-surface">Lobby RFID &amp; QR Scanner</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visitor Logs Table */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
            <div>
              <h2 className="font-headline-md text-lg font-black text-on-surface flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" /> Log Riwayat Akses Tamu Hari Ini
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Real-time check-in, validitas pass, dan konfirmasi check-out
              </p>
            </div>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
              {logs.length} Log Kunjungan
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container font-bold text-on-surface-variant uppercase text-[10px]">
                <tr>
                  <th className="p-3">Tamu &amp; ID</th>
                  <th className="p-3">Destinasi</th>
                  <th className="p-3">Jam Masuk / Exp</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-on-surface">{log.name}</p>
                      <p className="text-[10px] text-primary font-mono">{log.passCode}</p>
                    </td>
                    <td className="p-3 text-on-surface-variant">{log.dest}</td>
                    <td className="p-3 text-on-surface-variant">
                      <p className="font-semibold text-on-surface">{log.timeIn}</p>
                      <p className="text-[10px] text-gray-500">Exp: {log.validUntil}</p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          log.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-surface-variant text-on-surface-variant"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {log.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() => handleCheckOut(log.id)}
                          className="px-2.5 py-1 rounded-lg bg-surface-variant hover:bg-red-50 hover:text-red-700 text-on-surface-variant text-[10px] font-bold transition-colors"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-400 font-semibold">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

