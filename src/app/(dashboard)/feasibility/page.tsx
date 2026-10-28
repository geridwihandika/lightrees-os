"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
  MapPin,
  Calendar,
  FileDown,
} from "lucide-react";
import type { FeasibilityResult } from "@/lib/feasibility-engine";
import { generateFeasibilityPdf } from "@/lib/pdf-generator";
import { CashFlowChart } from "@/components/feasibility/CashFlowChart";
import { toast } from "sonner";

interface CalculationData {
  success: boolean;
  data: FeasibilityResult & {
    propertyInput: {
      nama: string;
      tipe: string;
      luasTanah: number;
      luasBangunan: number;
      lokasi: string;
      kondisi: string;
      sertifikat: string;
      namaPemilik: string;
      waPemilik: string;
    };
    recordId?: string | null;
    webhookDispatched?: boolean;
  };
}

export default function FeasibilityPage() {
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'rumah',
    luasTanah: '120',
    luasBangunan: '90',
    lokasi: 'Jakarta Selatan',
    kondisi: 'baik',
    sertifikat: 'shm',
    namaPemilik: '',
    waPemilik: '',
    hargaPerolehan: '',
    estimasiSewaBulanan: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'waPemilik') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({
      ...prev,
      tipe: type,
      luasBangunan: type === 'tanah' ? '0' : prev.luasBangunan || '80',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.waPemilik.length < 10) {
      setErrorMessage('Nomor WhatsApp minimal 10 digit angka');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        nama: formData.nama,
        tipe: formData.tipe,
        luasTanah: Number(formData.luasTanah) || 1,
        luasBangunan: formData.tipe === 'tanah' ? 0 : Number(formData.luasBangunan) || 0,
        lokasi: formData.lokasi,
        kondisi: formData.kondisi,
        sertifikat: formData.sertifikat,
        namaPemilik: formData.namaPemilik || 'Pemilik Properti',
        waPemilik: formData.waPemilik,
        hargaPerolehan: formData.hargaPerolehan ? Number(formData.hargaPerolehan) : undefined,
        estimasiSewaBulanan: formData.estimasiSewaBulanan ? Number(formData.estimasiSewaBulanan) : undefined,
      };

      const response = await fetch('/api/feasibility/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resJson = await response.json();

      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || 'Gagal memproses perhitungan kelayakan.');
      }

      setResult(resJson);
      toast.success('Analisis kelayakan properti berhasil dihitung!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat analisis.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPdf = () => {
    if (!result?.data) return;
    try {
      generateFeasibilityPdf({
        property: result.data.propertyInput,
        result: result.data,
      });
      toast.success('Dossier Feasibility PDF berhasil di-generate & diunduh!');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Gagal men-generate PDF';
      toast.error(msg);
    }
  };

  const formatRupiah = (val: number) => {
    return `Rp ${Math.round(val || 0).toLocaleString('id-ID')}`;
  };

  const data = result?.data;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      <header className="flex flex-col gap-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-1 border border-emerald-200 shadow-sm w-fit">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Standar SPI / KJPP Feasibility Engine
        </div>
        <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
          Feasibility & Appraisal Analyzer
        </h1>
        <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
          Penilaian wajar tanah &amp; bangunan, proyeksi Cap Rate, NOI, payback period, dan mitigasi risiko investasi properti.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        {/* Form Parameters */}
        <section className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/40 relative z-10">
              <h2 className="font-headline-md text-[20px] font-black text-on-surface flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                Parameter Penilaian
              </h2>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                Step 1 of 2
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
              {/* Nama Properti */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                  Nama Properti / Judul
                </label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  type="text"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                  placeholder="Contoh: Cluster Grand Bintaro Hook"
                  required
                />
              </div>

              {/* Tipe Properti */}
              <div className="flex flex-col gap-2">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                  Tipe Properti
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rumah', label: 'Rumah' },
                    { id: 'ruko', label: 'Ruko' },
                    { id: 'tanah', label: 'Tanah' },
                    { id: 'kos_kontrakan', label: 'Kos-kosan' },
                    { id: 'gudang', label: 'Gudang' },
                    { id: 'apartemen', label: 'Apartemen' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeSelect(item.id)}
                      className={`py-2 px-2 rounded-xl font-label-md text-[13px] font-bold transition-all shadow-sm border-2 ${
                        formData.tipe === item.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-lowest hover:border-primary/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensi: Tanah & Bangunan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Luas Tanah (m²)
                  </label>
                  <input
                    name="luasTanah"
                    value={formData.luasTanah}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                    placeholder="Contoh: 120"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Luas Bangunan (m²)
                  </label>
                  <input
                    name="luasBangunan"
                    value={formData.luasBangunan}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    disabled={formData.tipe === 'tanah'}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder="Contoh: 90"
                    required={formData.tipe !== 'tanah'}
                  />
                </div>
              </div>

              {/* Lokasi & Sertifikat */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Lokasi / Kota
                  </label>
                  <input
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    type="text"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                    placeholder="misal: Jakarta Selatan"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Sertifikat Legal
                  </label>
                  <select
                    name="sertifikat"
                    value={formData.sertifikat}
                    onChange={handleChange}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                  >
                    <option value="shm">SHM (Hak Milik)</option>
                    <option value="hgb">HGB (Guna Bangunan)</option>
                    <option value="ajb">AJB (Akta Jual Beli)</option>
                    <option value="girik">Girik / Adat</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Kondisi Fisik */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                  Kondisi Bangunan
                </label>
                <select
                  name="kondisi"
                  value={formData.kondisi}
                  onChange={handleChange}
                  disabled={formData.tipe === 'tanah'}
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="baru">Baru / Brand New (Depresiasi 2%)</option>
                  <option value="baik">Baik / Terawat (Depresiasi 12%)</option>
                  <option value="sedang">Sedang (Depresiasi 30%)</option>
                  <option value="butuh_renovasi">Butuh Renovasi (Depresiasi 55%)</option>
                  <option value="rusak">Rusak Berat (Depresiasi 80%)</option>
                </select>
              </div>

              {/* Pemilik & WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    Nama Pemilik / Klien
                  </label>
                  <input
                    name="namaPemilik"
                    value={formData.namaPemilik}
                    onChange={handleChange}
                    type="text"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                    placeholder="Bpk. Hendra"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
                    WhatsApp Pemilik
                  </label>
                  <input
                    name="waPemilik"
                    value={formData.waPemilik}
                    onChange={handleChange}
                    type="text"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-[14px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm"
                    placeholder="08123456789"
                    required
                  />
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start mt-1"
              >
                {showAdvanced ? '− Sembunyikan Input Finansial Lanjutan' : '+ Tampilkan Input Finansial Kustom (Harga & Sewa)'}
              </button>

              {showAdvanced && (
                <div className="p-3.5 bg-surface-container/60 rounded-xl border border-outline-variant/40 space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase">
                      Harga Perolehan / Tawaran Beli (Opsional)
                    </label>
                    <input
                      name="hargaPerolehan"
                      value={formData.hargaPerolehan}
                      onChange={handleChange}
                      type="number"
                      placeholder="e.g. 1200000000"
                      className="bg-white border border-outline-variant/50 rounded-lg p-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase">
                      Target Sewa Bulanan (Opsional)
                    </label>
                    <input
                      name="estimasiSewaBulanan"
                      value={formData.estimasiSewaBulanan}
                      onChange={handleChange}
                      type="number"
                      placeholder="e.g. 7500000"
                      className="bg-white border border-outline-variant/50 rounded-lg p-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}

              <button
                disabled={isLoading}
                type="submit"
                className="w-full mt-2 bg-primary hover:bg-primary-container disabled:bg-surface-variant disabled:text-on-surface-variant text-white font-label-md font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Menghitung Kelayakan...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Jalankan Analisis Lengkap
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Results Showcase Section */}
        <section className="xl:col-span-7 h-full">
          {data ? (
            <div className="bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 shadow-sm border border-outline-variant/30 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-secondary"></div>

              {/* Status & Feasibility Score Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-outline-variant/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border inline-flex items-center gap-1.5 ${
                        data.status === 'LAYAK'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : data.status === 'PERLU_DIPERTIMBANGKAN'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {data.status === 'LAYAK' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      STATUS: {data.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                      Risiko: {data.riskLevel}
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-[24px] font-black text-on-surface">
                    {data.propertyInput.nama}
                  </h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {data.propertyInput.lokasi} • {data.propertyInput.luasTanah} m² Tanah / {data.propertyInput.luasBangunan} m² Bangunan
                  </p>
                </div>

                {/* Score Gauge & Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-label-md text-xs font-bold hover:bg-primary-container hover:shadow-md transition-all shadow-sm"
                    title="Download Official Dossier PDF"
                  >
                    <FileDown className="w-4 h-4" /> Export PDF Dossier
                  </button>

                  <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-2xl border border-outline-variant/40 shadow-sm">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">Skor Kelayakan</p>
                      <p className="font-display-sm text-[28px] font-black text-primary leading-tight">{data.score}<span className="text-sm font-semibold text-on-surface-variant">/100</span></p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-base border border-primary/20">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Valuation Summary Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-between">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nilai Pasar Wajar</p>
                  <p className="font-headline-lg text-[22px] font-black text-primary mt-1">{formatRupiah(data.marketValue)}</p>
                  <p className="text-[11px] font-medium text-on-surface-variant mt-2">
                    {formatRupiah(data.pricePerM2)} / m² efektif
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col justify-between">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Breakdown Aset</p>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Tanah:</span>
                      <span className="font-bold text-on-surface">{formatRupiah(data.landValue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Bangunan:</span>
                      <span className="font-bold text-on-surface">{formatRupiah(data.buildingValue)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1.5">
                    Range: {formatRupiah(data.rangeLow)} – {formatRupiah(data.rangeHigh)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col justify-between">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Cap Rate &amp; NOI</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-lg text-[24px] font-black text-emerald-600">{data.capRate}%</span>
                    <span className="text-xs font-semibold text-on-surface-variant">Cap Rate</span>
                  </div>
                  <p className="text-[11px] font-medium text-on-surface-variant mt-2">
                    NOI: <strong className="text-on-surface">{formatRupiah(data.netPerYear)}</strong> / thn
                  </p>
                </div>
              </div>

              {/* Financial & Yield Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container/40 p-4 rounded-2xl border border-outline-variant/30">
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Est. Sewa Bulanan</span>
                  <span className="font-headline-sm text-sm font-black text-on-surface">{formatRupiah(data.monthlyRental)}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Payback Period</span>
                  <span className="font-headline-sm text-sm font-black text-on-surface">~{data.paybackPeriod} Tahun</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Estimasi OPEX/Thn</span>
                  <span className="font-headline-sm text-sm font-black text-on-surface">{formatRupiah(data.operationalCost)}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Capex Renovasi</span>
                  <span className="font-headline-sm text-sm font-black text-on-surface">{formatRupiah(data.revitalization)}</span>
                </div>
              </div>

              {/* Strategic Insights & Recommendation */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 space-y-3">
                <h4 className="font-headline-sm text-sm font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Rekomendasi Strategis &amp; Pasar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
                    <span className="font-bold text-on-surface-variant block mb-1 text-[10px] uppercase">Model Bisnis</span>
                    <p className="font-semibold text-on-surface">{data.businessModel}</p>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
                    <span className="font-bold text-on-surface-variant block mb-1 text-[10px] uppercase">Target Market</span>
                    <p className="font-semibold text-on-surface">{data.targetMarket}</p>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-outline-variant/30">
                    <span className="font-bold text-on-surface-variant block mb-1 text-[10px] uppercase">Exit Strategy</span>
                    <p className="font-semibold text-on-surface">{data.exitStrategy}</p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-outline-variant/30 space-y-1.5">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Highlight Analisis:</span>
                  <ul className="space-y-1">
                    {data.insights.map((ins, i) => (
                      <li key={i} className="text-xs text-on-surface font-medium flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        {ins}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Financial Visualization Chart */}
              <CashFlowChart
                cashFlowData={data.cashFlowProjection}
                landValue={data.landValue}
                buildingValue={data.buildingValue}
              />

              {/* 5-Year Cash Flow Projection Mini Table */}
              <div className="space-y-2">
                <h4 className="font-headline-sm text-xs font-black text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Proyeksi Arus Kas 5 Tahun (Inflasi Sewa 5%/thn)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-container font-bold text-on-surface-variant uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Tahun</th>
                        <th className="p-2.5">Pendapatan Kotor</th>
                        <th className="p-2.5">OPEX</th>
                        <th className="p-2.5">NOI Bersih</th>
                        <th className="p-2.5 text-right">Kumulatif Cash Flow</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/30">
                      {data.cashFlowProjection.map((item) => (
                        <tr key={item.year} className="hover:bg-primary/5">
                          <td className="p-2.5 font-bold">Thn {item.year}</td>
                          <td className="p-2.5">{formatRupiah(item.grossRental)}</td>
                          <td className="p-2.5 text-on-surface-variant">{formatRupiah(item.opex)}</td>
                          <td className="p-2.5 font-bold text-emerald-700">{formatRupiah(item.noi)}</td>
                          <td className={`p-2.5 text-right font-black ${item.cumulativeCashFlow >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {formatRupiah(item.cumulativeCashFlow)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/20 rounded-[2rem] bg-primary/5 text-on-surface-variant min-h-[500px]">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-5 border border-primary/10">
                <Calculator className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="font-headline-sm text-[22px] font-black text-center text-on-surface mb-2">
                Menunggu Input Parameter
              </h3>
              <p className="font-body-md text-sm text-center max-w-sm font-medium leading-relaxed">
                Isi form penilaian di sebelah kiri untuk menghitung valuasi pasar tanah &amp; bangunan, proyeksi NOI, Cap Rate, dan kelayakan finansial real estate.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

