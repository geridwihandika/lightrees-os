"use client";

import { useState } from "react";
import {
  WalletCards,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Users,
  Coins,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function FundingPage() {
  // Loan Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(2000000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [tenorYears, setTenorYears] = useState<number>(15);

  // Computed Loan Values
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = Math.max(0, propertyPrice - downPaymentAmount);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenorYears * 12;

  // Annuity Monthly Installment: P * (r*(1+r)^n) / ((1+r)^n - 1)
  const monthlyInstallment =
    loanPrincipal > 0 && monthlyRate > 0
      ? Math.round(
          (loanPrincipal *
            (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  // Estimated Fees (Indonesian Standard: BPHTB 5%, Notaris ~1%, Provisi ~1%)
  const bphtbEstimate = Math.round(Math.max(0, propertyPrice - 80000000) * 0.05);
  const notarisProvisi = Math.round(loanPrincipal * 0.02);
  const minIncomeRequired = Math.round(monthlyInstallment * 3.0); // 30-33% DTI rule

  // Funding Applications
  const applications = [
    {
      id: "FA-2025-01",
      property: "Cluster Serenity Bintaro",
      applicant: "PT Mega Graha Abadi",
      type: "KPR Komersial",
      amount: "Rp 1.96B",
      bank: "Bank Mandiri",
      status: "APPROVED",
      submittedDate: "12 Feb 2025",
    },
    {
      id: "FA-2025-02",
      property: "Ruko Sentra Niaga BSD",
      applicant: "CV Surya Makmur",
      type: "Kredit Konstruksi",
      amount: "Rp 3.50B",
      bank: "Bank BCA",
      status: "UNDER_REVIEW",
      submittedDate: "18 Feb 2025",
    },
    {
      id: "FA-2025-03",
      property: "Kost Senopati Prime",
      applicant: "Bpk. Hendra Gunawan",
      type: "Joint Venture Syndicate",
      amount: "Rp 5.00B",
      bank: "Private Equity",
      status: "DISBURSED",
      submittedDate: "05 Jan 2025",
    },
  ];

  const formatRp = (val: number) => {
    return `Rp ${Math.round(val || 0).toLocaleString("id-ID")}`;
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-1 border border-emerald-200 shadow-sm w-fit">
            <WalletCards className="w-3.5 h-3.5 text-emerald-600" /> Capital Allocation &amp; Mortgage Simulator
          </div>
          <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
            Funding Portal
          </h1>
          <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
            Simulasi kelayakan KPR/kredit konstruksi, manajemen sindikasi investor, dan pipeline perbankan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => toast.success("Permohonan pengajuan pendanaan baru dimulai!")}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-xs font-bold hover:bg-primary-container transition-all shadow-sm"
        >
          <Coins className="w-4 h-4" /> Ajukan Pembiayaan
        </button>
      </header>

      {/* Interactive KPR & Credit Calculator Section */}
      <div className="bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 border border-outline-variant/30 shadow-sm flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="font-headline-md text-xl font-black text-on-surface flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-primary" /> Kalkulator Simulasi KPR &amp; Pembiayaan Perbankan
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Perhitungan cicilan anuitas bulanan, estimasi pajak BPHTB, dan analisa batas kemampuan bayar (Debt-To-Income).
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Suku Bunga Fixed 6.75%
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Sliders / Inputs */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-on-surface-variant uppercase">Harga Properti / Aset</span>
                <span className="text-primary font-black text-sm">{formatRp(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="500000000"
                max="10000000000"
                step="50000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant uppercase">Uang Muka (DP)</span>
                  <span className="text-primary">{downPaymentPercent}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Nominal DP: {formatRp(downPaymentAmount)}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant uppercase">Tenor Pinjaman</span>
                  <span className="text-primary">{tenorYears} Tahun</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={tenorYears}
                  onChange={(e) => setTenorYears(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Total {totalMonths} Bulan Cicilan
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase">
                Suku Bunga Efektif / Floating (% per Tahun)
              </label>
              <input
                type="number"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="bg-white border-2 border-outline-variant/40 rounded-xl p-2.5 text-sm outline-none focus:border-primary font-bold"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 bg-surface-container/50 rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Estimasi Cicilan KPR Bulanan
              </p>
              <h3 className="font-display-lg text-[36px] font-black text-primary leading-tight mt-1">
                {formatRp(monthlyInstallment)}
                <span className="text-sm font-semibold text-on-surface-variant"> / bulan</span>
              </h3>
            </div>

            <div className="space-y-2 pt-2 border-t border-outline-variant/30 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Pokok Pinjaman (Plafon KPR):</span>
                <strong className="text-on-surface font-bold">{formatRp(loanPrincipal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Estimasi Pajak BPHTB (5%):</span>
                <strong className="text-on-surface font-bold">{formatRp(bphtbEstimate)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Estimasi Notaris &amp; Biaya Bank:</span>
                <strong className="text-on-surface font-bold">{formatRp(notarisProvisi)}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-outline-variant/20">
                <span className="text-on-surface-variant font-semibold">Rekomendasi Penghasilan Minimum:</span>
                <strong className="text-emerald-700 font-black">{formatRp(minIncomeRequired)} / bln</strong>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl text-[11px] text-on-surface-variant flex items-center gap-2 border border-outline-variant/30">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Simulasi menggunakan standar suku bunga KPR tier-1 perbankan Indonesia tahun berjalan.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Pipeline & Investor Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pipeline Table */}
        <div className="lg:col-span-8 bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
            <div>
              <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Tracking Pengajuan Pendanaan Properti
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Monitoring status underwriting dan persetujuan bank
              </p>
            </div>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
              {applications.length} Pengajuan Aktif
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container font-bold text-on-surface-variant uppercase text-[10px]">
                <tr>
                  <th className="p-3">Ref &amp; Properti</th>
                  <th className="p-3">Jenis Kredit</th>
                  <th className="p-3">Plafon Diminta</th>
                  <th className="p-3">Lembaga / Bank</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-on-surface">{app.property}</p>
                      <p className="text-[10px] text-on-surface-variant">{app.id}</p>
                    </td>
                    <td className="p-3 text-on-surface-variant">{app.type}</td>
                    <td className="p-3 font-black text-primary">{app.amount}</td>
                    <td className="p-3 font-semibold text-on-surface">{app.bank}</td>
                    <td className="p-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          app.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "DISBURSED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investor Relations Mini Hub */}
        <div className="lg:col-span-4 bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-5">
          <div className="border-b border-outline-variant/30 pb-3">
            <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Investor Relations
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Distribusi permodalan ekuitas investor aktif
            </p>
          </div>

          <div className="space-y-3">
            {[
              { name: "Alpha Ventura Capital", commitment: "Rp 15.0B", share: "33%" },
              { name: "Nusantara Property Syndicate", commitment: "Rp 12.5B", share: "28%" },
              { name: "Family Office Bintaro", commitment: "Rp 8.0B", share: "18%" },
            ].map((inv, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-xs text-on-surface">{inv.name}</p>
                  <p className="text-[10px] text-on-surface-variant">Porsi Ekuitas: {inv.share}</p>
                </div>
                <strong className="text-primary text-xs font-black">{inv.commitment}</strong>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={() => toast.success("Dashboard investor syndicate dibuka.")}
              className="w-full py-2.5 bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Kelola Sindikasi Investor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

