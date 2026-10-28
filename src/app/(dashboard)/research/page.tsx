"use client";

import { useState } from "react";
import {
  Search,
  Building2,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface MarketTrendData {
  month: string;
  landPrice: number;
  buildingCost: number;
}

const MARKET_DATA: Record<string, { avgPrice: string; growthYoY: string; demand: number; trends: MarketTrendData[] }> = {
  "jakarta selatan": {
    avgPrice: "Rp 15.8Jt/m²",
    growthYoY: "+7.8%",
    demand: 92,
    trends: [
      { month: "Jan", landPrice: 14.5, buildingCost: 5.2 },
      { month: "Mar", landPrice: 14.8, buildingCost: 5.3 },
      { month: "Mei", landPrice: 15.0, buildingCost: 5.3 },
      { month: "Jul", landPrice: 15.3, buildingCost: 5.4 },
      { month: "Sep", landPrice: 15.5, buildingCost: 5.5 },
      { month: "Nov", landPrice: 15.8, buildingCost: 5.6 },
    ],
  },
  "tangerang selatan": {
    avgPrice: "Rp 10.5Jt/m²",
    growthYoY: "+9.2%",
    demand: 88,
    trends: [
      { month: "Jan", landPrice: 9.6, buildingCost: 4.8 },
      { month: "Mar", landPrice: 9.8, buildingCost: 4.9 },
      { month: "Mei", landPrice: 10.0, buildingCost: 5.0 },
      { month: "Jul", landPrice: 10.2, buildingCost: 5.0 },
      { month: "Sep", landPrice: 10.4, buildingCost: 5.1 },
      { month: "Nov", landPrice: 10.5, buildingCost: 5.2 },
    ],
  },
  "bali": {
    avgPrice: "Rp 13.2Jt/m²",
    growthYoY: "+12.4%",
    demand: 95,
    trends: [
      { month: "Jan", landPrice: 11.5, buildingCost: 5.5 },
      { month: "Mar", landPrice: 11.9, buildingCost: 5.6 },
      { month: "Mei", landPrice: 12.3, buildingCost: 5.7 },
      { month: "Jul", landPrice: 12.7, buildingCost: 5.8 },
      { month: "Sep", landPrice: 13.0, buildingCost: 5.9 },
      { month: "Nov", landPrice: 13.2, buildingCost: 6.0 },
    ],
  },
};

export default function ResearchPage() {
  const [selectedCity, setSelectedCity] = useState("jakarta selatan");
  const [selectedType, setSelectedType] = useState("rumah");
  const [period, setPeriod] = useState<"1Y" | "3Y" | "5Y">("1Y");

  const currentData = MARKET_DATA[selectedCity] || MARKET_DATA["jakarta selatan"];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Data riset pasar untuk ${selectedCity.toUpperCase()} berhasil dimuat!`);
  };

  const compsData = [
    { name: "Cluster Serenity Bintaro", distance: "0.8 km", priceM2: "Rp 16.2 Jt", yield: "6.2%", status: "Terjual" },
    { name: "Townhouse Emerald Park", distance: "1.2 km", priceM2: "Rp 15.5 Jt", yield: "5.8%", status: "Active" },
    { name: "Kavling Boulevard Hook", distance: "1.5 km", priceM2: "Rp 14.9 Jt", yield: "3.5%", status: "Pending" },
    { name: "Ruko Sentra Niaga", distance: "2.1 km", priceM2: "Rp 21.0 Jt", yield: "8.9%", status: "Tersewa" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      <header className="flex flex-col gap-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase mb-1 border border-blue-200 shadow-sm w-fit">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Market Intelligence &amp; Spatial Comps
        </div>
        <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
          Market Research
        </h1>
        <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
          Analisis tren historis harga tanah per m², biaya konstruksi, indeks permintaan, dan perbandingan transaksi wajar.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Search Parameter Card */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-5">
            <h2 className="font-headline-md text-lg font-black text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-3">
              <Search className="w-4 h-4 text-primary" /> Parameter Analisis Pasar
            </h2>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Wilayah / Kota Target
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium shadow-sm"
                >
                  <option value="jakarta selatan">Jakarta Selatan (Prime Residential)</option>
                  <option value="tangerang selatan">Tangerang Selatan / BSD (High Growth)</option>
                  <option value="bali">Bali (Tourism &amp; High Yield Villas)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Tipe Properti
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium shadow-sm"
                >
                  <option value="rumah">Residensial / Rumah Tapak</option>
                  <option value="ruko">Komersial / Ruko</option>
                  <option value="kos_kontrakan">Kos-Kosan Mahasiswa &amp; Karyawan</option>
                  <option value="tanah">Tanah Kavling / Land Bank</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-primary hover:bg-primary-container text-white font-label-md text-sm font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Filter Data Pasar
              </button>
            </form>

            <div className="pt-2 border-t border-outline-variant/30 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Rata-rata Harga Pasar:</span>
                <strong className="text-primary font-bold text-sm">{currentData.avgPrice}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Pertumbuhan YoY:</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {currentData.growthYoY}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Skor Permintaan Pasar:</span>
                <strong className="text-on-surface font-black text-sm">{currentData.demand} / 100</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Analysis Chart */}
        <div className="xl:col-span-8 bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-outline-variant/30 pb-3">
            <div>
              <h2 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Tren Harga per m² — {selectedCity.toUpperCase()}
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Historis Nilai Tanah vs Biaya Konstruksi Bangunan (Juta Rupiah / m²)
              </p>
            </div>

            <div className="flex gap-1.5 bg-surface-container p-1 rounded-xl">
              {(["1Y", "3Y", "5Y"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    period === p ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.trends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13423C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#13423C" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBuild" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCA830" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#CCA830" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" opacity={0.6} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#707976" }} />
                <YAxis
                  tickFormatter={(val) => `Rp ${val}Jt`}
                  tick={{ fontSize: 10, fill: "#707976" }}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(val: any) => [`Rp ${Number(val).toFixed(1)} Juta / m²`, ""]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    borderColor: "#c0c8c5",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Area
                  type="monotone"
                  dataKey="landPrice"
                  name="Harga Tanah / m²"
                  stroke="#13423C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorLand)"
                />
                <Area
                  type="monotone"
                  dataKey="buildingCost"
                  name="Biaya Bangun / m²"
                  stroke="#CCA830"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBuild)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
            <span>Sumber Data: Agregator Listing Properti &amp; Transaksi BPN Terverifikasi</span>
            <span className="font-semibold text-primary">Akurasi ~94%</span>
          </div>
        </div>
      </div>

      {/* Comps (Comparable Transactions) Table */}
      <div className="bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
          <div>
            <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" /> Data Pembanding Pasar Terdekat (Market Comps Radius 2 KM)
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Benchmark harga transaksi dan yield sewa riil properti sejenis di sekitar lokasi
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            4 Comps Ditemukan
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container font-bold text-on-surface-variant uppercase text-[10px]">
              <tr>
                <th className="p-3">Nama Properti Comps</th>
                <th className="p-3">Jarak</th>
                <th className="p-3">Harga Transaksi / m²</th>
                <th className="p-3">Rental Yield</th>
                <th className="p-3 text-right">Status Transaksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {compsData.map((item, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-colors">
                  <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {item.name}
                  </td>
                  <td className="p-3 text-on-surface-variant">{item.distance}</td>
                  <td className="p-3 font-semibold text-primary">{item.priceM2}</td>
                  <td className="p-3 font-bold text-emerald-700">{item.yield}</td>
                  <td className="p-3 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-variant text-on-surface-variant border border-outline-variant/40">
                      {item.status}
                    </span>
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
