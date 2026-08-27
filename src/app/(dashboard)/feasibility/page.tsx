"use client";

import { useState } from "react";

export default function FeasibilityPage() {
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'rumah',
    luas: '',
    lokasi: '',
    kondisi: 'baik',
    nama_pemilik: '',
    wa_pemilik: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [errorWa, setErrorWa] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'wa_pemilik') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (numericValue.length >= 10 && errorWa) {
        setErrorWa('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, tipe: type }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.wa_pemilik.length < 10) {
      setErrorWa('Nomor WhatsApp minimal 10 digit');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const dataToSubmit = {
        ...formData,
        luas: Number(formData.luas)
      };

      const response = await fetch("https://hook.eu1.make.com/vnqjmoefpvofhgad5ubj0e7j501zxbyy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseText = await response.text();
      
      let parsedContent;
      try {
        parsedContent = JSON.parse(responseText);
      } catch {
        parsedContent = responseText;
      }

      setResult({
        type: 'success',
        content: parsedContent,
        originalData: dataToSubmit
      });

      // Reset form on success
      setFormData({
        nama: '',
        tipe: 'rumah',
        luas: '',
        lokasi: '',
        kondisi: 'baik',
        nama_pemilik: '',
        wa_pemilik: ''
      });

    } catch {
      setResult({
        type: 'error',
        message: 'Terjadi kesalahan saat menghubungi server. Silakan coba beberapa saat lagi.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <header className="flex flex-col gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-2 border border-indigo-200 shadow-sm w-fit">
          <span className="material-symbols-outlined text-[14px]">analytics</span> Analysis Tool
        </div>
        <h1 className="font-display-lg text-[40px] md:text-[56px] font-black text-on-surface tracking-tight leading-tight drop-shadow-sm">
          Feasibility Analyzer
        </h1>
        <p className="font-body-lg text-[18px] text-on-surface-variant font-medium mt-1">
          Evaluate property potential with AI-driven insights.
        </p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-4">
        {/* Form Section */}
        <section className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <h2 className="font-headline-md text-[22px] font-black text-on-surface flex items-center gap-3 mb-6 relative z-10 border-b border-outline-variant/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </div>
              Parameters
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Nama Properti</label>
                <input 
                  name="nama" 
                  value={formData.nama} 
                  onChange={handleChange} 
                  type="text" 
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" 
                  placeholder="Contoh: Rumah Minimalis Bintaro" 
                  required 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Tipe Properti</label>
                <div className="grid grid-cols-3 gap-2">
                  {['rumah', 'ruko', 'tanah', 'gudang', 'kos_kontrakan', 'apartemen'].map(type => (
                    <button 
                      key={type}
                      type="button" 
                      onClick={() => handleTypeSelect(type)}
                      className={`py-2 px-2 rounded-xl font-label-md text-[13px] font-bold transition-all shadow-sm border-2 ${
                        formData.tipe === type 
                          ? 'bg-primary text-white border-primary shadow-md hover:-translate-y-0.5' 
                          : 'bg-white border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-lowest hover:border-primary/30'
                      }`}
                    >
                      {type.replace('_', '/').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Luas (m²)</label>
                  <input 
                    name="luas" 
                    value={formData.luas} 
                    onChange={handleChange} 
                    type="number" 
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" 
                    placeholder="e.g. 150" 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Lokasi</label>
                  <input 
                    name="lokasi" 
                    value={formData.lokasi} 
                    onChange={handleChange} 
                    type="text" 
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" 
                    placeholder="Kota / Daerah" 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Kondisi</label>
                  <div className="relative">
                    <select 
                      name="kondisi" 
                      value={formData.kondisi} 
                      onChange={handleChange} 
                      className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm w-full appearance-none pr-10"
                      required
                    >
                      <option value="baru">Baru</option>
                      <option value="baik">Baik</option>
                      <option value="sedang">Sedang</option>
                      <option value="butuh_renovasi">Butuh Renovasi</option>
                      <option value="rusak">Rusak</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">Nama Pemilik</label>
                  <input 
                    name="nama_pemilik" 
                    value={formData.nama_pemilik} 
                    onChange={handleChange} 
                    type="text" 
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">WhatsApp Pemilik</label>
                <input 
                  name="wa_pemilik" 
                  value={formData.wa_pemilik} 
                  onChange={handleChange} 
                  type="text" 
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3.5 text-[15px] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium shadow-sm" 
                  placeholder="081234567890" 
                  required 
                />
                {errorWa && <p className="text-xs font-bold text-red-500 mt-1">{errorWa}</p>}
              </div>

              <button 
                disabled={isLoading} 
                type="submit" 
                className="w-full mt-4 bg-primary hover:bg-primary-container disabled:bg-surface-variant disabled:text-on-surface-variant text-white font-label-md font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 text-[16px]"
              >
                <span className="material-symbols-outlined">{isLoading ? 'hourglass_empty' : 'magic_button'}</span>
                {isLoading ? 'Memproses Data...' : 'Kirim & Analisis'}
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="xl:col-span-7 h-full">
          {result ? (
            <div className="bg-white/80 backdrop-blur-xl h-full rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 relative overflow-hidden flex flex-col gap-6">
              {/* Decorative accent top */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-emerald-400"></div>
              
              {result.type === 'success' ? (
                <>
                  <div className="flex items-center gap-4 mb-2 pb-6 border-b border-outline-variant/40">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-[28px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-[28px] text-on-surface font-black tracking-tight">Data Berhasil Diproses</h2>
                      <p className="font-label-md text-[15px] font-medium text-emerald-600 mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">task_alt</span> Make.com Webhook terpicu dengan sukses.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <p className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-3">Output dari Webhook:</p>
                    
                    {typeof result.content === 'object' ? (
                      <div className="bg-surface-container-lowest/50 rounded-2xl p-6 font-mono text-sm text-on-surface overflow-x-auto border-2 border-outline-variant/30 shadow-inner flex-1">
                        <pre>{JSON.stringify(result.content, null, 2)}</pre>
                      </div>
                    ) : result.content && result.content !== "Accepted" ? (
                      <div className="bg-surface-container-lowest/50 rounded-2xl p-6 text-[15px] font-medium text-on-surface border-2 border-outline-variant/30 shadow-inner whitespace-pre-wrap flex-1 leading-relaxed">
                        {result.content}
                      </div>
                    ) : (
                      <div className="bg-surface-container-lowest/50 rounded-2xl p-6 text-sm border-2 border-outline-variant/30 shadow-inner space-y-3">
                        <strong className="text-on-surface block mb-3 font-headline-sm text-[18px] font-black">Ringkasan Data yang Dikirim:</strong>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Properti</p>
                            <p className="font-label-md text-on-surface font-bold">{result.originalData.nama}</p>
                            <p className="text-xs text-primary font-bold mt-1 uppercase">{result.originalData.tipe}</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Luas</p>
                            <p className="font-label-md text-on-surface font-bold">{result.originalData.luas} m²</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Lokasi</p>
                            <p className="font-label-md text-on-surface font-bold">{result.originalData.lokasi}</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Kondisi</p>
                            <p className="font-label-md text-on-surface font-bold capitalize">{result.originalData.kondisi.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[40px] text-red-600">error</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-[24px] text-on-surface font-black">Pengiriman Gagal</h2>
                    <p className="font-body-md text-[16px] font-medium text-red-600 mt-2 bg-red-50 px-4 py-2 rounded-lg inline-block border border-red-200">{result.message}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/20 rounded-[2rem] bg-primary/5 text-on-surface-variant min-h-[400px]">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-primary/10">
                <span className="material-symbols-outlined text-[48px] text-primary/40">analytics</span>
              </div>
              <p className="font-headline-sm text-[24px] font-black text-center mb-2 text-on-surface">Siap Menerima Data</p>
              <p className="font-body-md text-[16px] text-center max-w-sm font-medium">Isi form di samping untuk mengirim data properti langsung ke workflow make.com untuk analisis mendalam.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
