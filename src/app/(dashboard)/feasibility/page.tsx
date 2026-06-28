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
      } catch (e) {
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

    } catch (error) {
      setResult({
        type: 'error',
        message: 'Terjadi kesalahan saat menghubungi server. Silakan coba beberapa saat lagi.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-margin-page">
      <header className="flex flex-col gap-unit">
        <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[1.1] md:font-bold text-on-surface tracking-tight">Feasibility Analyzer</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Evaluate property potential with AI-driven insights.</p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-margin-page">
        {/* Form Section */}
        <section className="xl:col-span-5 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl p-card-padding flex flex-col gap-gutter shadow-sm border border-outline-variant">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined">tune</span> Parameters
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-gutter">
              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface-variant">Nama Properti</label>
                <input 
                  name="nama" 
                  value={formData.nama} 
                  onChange={handleChange} 
                  type="text" 
                  className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-2 font-label-md text-label-md w-full focus:ring-primary focus:border-primary" 
                  placeholder="Contoh: Rumah Minimalis Bintaro" 
                  required 
                />
              </div>

              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface-variant">Tipe Properti</label>
                <div className="grid grid-cols-3 gap-2">
                  {['rumah', 'ruko', 'tanah', 'gudang', 'kos_kontrakan', 'apartemen'].map(type => (
                    <button 
                      key={type}
                      type="button" 
                      onClick={() => handleTypeSelect(type)}
                      className={`py-2 px-3 rounded-lg font-label-md text-label-md transition-all border ${
                        formData.tipe === type 
                          ? 'bg-primary-container text-on-primary-container border-primary-container' 
                          : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {type.replace('_', '/').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-gutter">
                <div className="flex flex-col gap-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant">Luas (m²)</label>
                  <input 
                    name="luas" 
                    value={formData.luas} 
                    onChange={handleChange} 
                    type="number" 
                    className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-2 font-label-md text-label-md w-full focus:ring-primary focus:border-primary" 
                    placeholder="e.g. 150" 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant">Lokasi</label>
                  <input 
                    name="lokasi" 
                    value={formData.lokasi} 
                    onChange={handleChange} 
                    type="text" 
                    className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-2 font-label-md text-label-md w-full focus:ring-primary focus:border-primary" 
                    placeholder="Kota / Daerah" 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-gutter">
                <div className="flex flex-col gap-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant">Kondisi</label>
                  <div className="relative">
                    <select 
                      name="kondisi" 
                      value={formData.kondisi} 
                      onChange={handleChange} 
                      className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-3 font-label-md text-label-md w-full appearance-none focus:ring-primary focus:border-primary"
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
                <div className="flex flex-col gap-unit">
                  <label className="font-label-md text-label-md text-on-surface-variant">Nama Pemilik</label>
                  <input 
                    name="nama_pemilik" 
                    value={formData.nama_pemilik} 
                    onChange={handleChange} 
                    type="text" 
                    className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-2 font-label-md text-label-md w-full focus:ring-primary focus:border-primary" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-unit">
                <label className="font-label-md text-label-md text-on-surface-variant">WhatsApp Pemilik</label>
                <input 
                  name="wa_pemilik" 
                  value={formData.wa_pemilik} 
                  onChange={handleChange} 
                  type="text" 
                  className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-2 font-label-md text-label-md w-full focus:ring-primary focus:border-primary" 
                  placeholder="081234567890" 
                  required 
                />
                {errorWa && <p className="text-xs text-error mt-1">{errorWa}</p>}
              </div>

              <button 
                disabled={isLoading} 
                type="submit" 
                className="w-full mt-4 bg-primary hover:bg-primary-container disabled:bg-surface-variant disabled:text-on-surface-variant text-on-primary font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
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
            <div className="bg-surface-container-lowest h-full rounded-xl p-card-padding flex flex-col gap-gutter shadow-sm border border-outline-variant relative overflow-hidden">
              {/* Decorative accent top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary-container"></div>
              
              {result.type === 'success' ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-on-surface font-bold tracking-tight">Data Berhasil Diproses</h2>
                      <p className="font-label-md text-label-md text-primary mt-1">Make.com Webhook terpicu dengan sukses.</p>
                    </div>
                  </div>

                  <div className="mt-4 flex-1">
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">Output dari Webhook:</p>
                    
                    {typeof result.content === 'object' ? (
                      <div className="bg-surface-container rounded-xl p-6 font-mono text-sm text-on-surface overflow-x-auto border border-outline-variant">
                        <pre>{JSON.stringify(result.content, null, 2)}</pre>
                      </div>
                    ) : result.content && result.content !== "Accepted" ? (
                      <div className="bg-surface-container rounded-xl p-6 text-sm text-on-surface border border-outline-variant whitespace-pre-wrap">
                        {result.content}
                      </div>
                    ) : (
                      <div className="bg-surface-container rounded-xl p-6 text-sm border border-outline-variant space-y-2">
                        <strong className="text-on-surface block mb-2 font-headline-sm text-headline-sm">Ringkasan Data yang Dikirim:</strong>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Properti:</span> {result.originalData.nama} ({result.originalData.tipe})</p>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Luas:</span> {result.originalData.luas} m²</p>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Lokasi:</span> {result.originalData.lokasi}</p>
                        <p className="text-on-surface-variant"><span className="font-bold text-on-surface">Kondisi:</span> {result.originalData.kondisi}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[32px] text-on-error-container">error</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Pengiriman Gagal</h2>
                    <p className="font-body-md text-body-md text-error mt-2">{result.message}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest/50 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">analytics</span>
              <p className="font-headline-sm text-headline-sm text-center mb-2">Siap Menerima Data</p>
              <p className="font-body-md text-body-md text-center max-w-sm">Isi form di samping untuk mengirim data properti langsung ke workflow make.com.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
