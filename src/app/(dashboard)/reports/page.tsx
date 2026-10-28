"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileSpreadsheet,
  Download,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<"12M" | "6M" | "QTD">("12M");

  const monthlyFinancials = [
    { month: "Jan", revenue: 950, expenses: 320, netProfit: 630 },
    { month: "Feb", revenue: 1020, expenses: 340, netProfit: 680 },
    { month: "Mar", revenue: 1100, expenses: 350, netProfit: 750 },
    { month: "Apr", revenue: 980, expenses: 310, netProfit: 670 },
    { month: "Mei", revenue: 1050, expenses: 330, netProfit: 720 },
    { month: "Jun", revenue: 1150, expenses: 380, netProfit: 770 },
    { month: "Jul", revenue: 1200, expenses: 390, netProfit: 810 },
    { month: "Agu", revenue: 1180, expenses: 370, netProfit: 810 },
    { month: "Sep", revenue: 1250, expenses: 400, netProfit: 850 },
    { month: "Okt", revenue: 1300, expenses: 420, netProfit: 880 },
    { month: "Nov", revenue: 1280, expenses: 410, netProfit: 870 },
    { month: "Des", revenue: 1350, expenses: 430, netProfit: 920 },
  ];

  const assetYieldData = [
    { type: "Kos-Kosan", yieldRate: 14.5, totalValue: 4.8 },
    { type: "Gudang Logistik", yieldRate: 10.5, totalValue: 8.5 },
    { type: "Ruko Komersial", yieldRate: 8.5, totalValue: 12.0 },
    { type: "Apartemen", yieldRate: 7.5, totalValue: 6.2 },
    { type: "Rumah Residensial", yieldRate: 5.5, totalValue: 15.4 },
  ];

  const handleExportSpreadsheet = () => {
    toast.success("Laporan performa finansial berhasil diekspor ke Excel / CSV!");
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-bold tracking-wider uppercase mb-1 border border-violet-200 shadow-sm w-fit">
            <FileSpreadsheet className="w-3.5 h-3.5 text-violet-600" /> Financial Reporting &amp; Performance
          </div>
          <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
            Financial Reports
          </h1>
          <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
            Monitoring performa pendapatan, efisiensi operasional, dan yield portofolio secara berkala.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-white border border-outline-variant/40 rounded-xl p-1 shadow-sm">
            {(["12M", "6M", "QTD"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === r
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExportSpreadsheet}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-label-md text-xs font-bold hover:bg-primary-container transition-all shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <p className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 relative z-10">
            Total Revenue (YTD)
          </p>
          <h2 className="font-display-md text-[32px] text-on-surface font-black relative z-10 tracking-tight">
            Rp 14.04B
          </h2>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm relative z-10">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.2%</span>
            <span className="text-emerald-600/70 font-medium ml-1">vs target 2025</span>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <p className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 relative z-10">
            Total OPEX &amp; Perawatan
          </p>
          <h2 className="font-display-md text-[32px] text-on-surface font-black relative z-10 tracking-tight">
            Rp 4.45B
          </h2>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold border border-red-100 shadow-sm relative z-10">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>+4.8%</span>
            <span className="text-red-600/70 font-medium ml-1">inflasi beban operasional</span>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <p className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 relative z-10">
            Net Profit Margin (NOI)
          </p>
          <h2 className="font-display-md text-[32px] text-on-surface font-black relative z-10 tracking-tight">
            68.3%
          </h2>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm relative z-10">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.4%</span>
            <span className="text-emerald-600/70 font-medium ml-1">efisiensi portofolio</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-8 bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
            <div>
              <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Tren Arus Kas Bulanan (Juta Rupiah)
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Perbandingan Pendapatan Sewa Kotor vs Biaya Operasional vs Laba Bersih
              </p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              TA 2025/2026
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFinancials} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13423C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#13423C" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
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
                  formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")} Juta`, ""]}
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
                  dataKey="revenue"
                  name="Pendapatan Sewa"
                  stroke="#13423C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
                <Area
                  type="monotone"
                  dataKey="netProfit"
                  name="Net Operating Income"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNet)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Biaya Operasional"
                  stroke="#EF4444"
                  strokeWidth={1.5}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Yield Performance Bar Chart */}
        <div className="lg:col-span-4 bg-white/85 backdrop-blur-xl p-7 rounded-[2rem] border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="border-b border-outline-variant/30 pb-3">
            <h3 className="font-headline-sm text-base font-black text-on-surface flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Rental Yield per Kelas Aset
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Rata-rata Yield Tahunan (%)
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={assetYieldData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" opacity={0.6} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 10, fill: "#707976" }}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  tick={{ fontSize: 10, fill: "#191c1e", fontWeight: "600" }}
                  width={95}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(val: any) => [`${val}% per tahun`, "Gross Yield"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    borderColor: "#c0c8c5",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="yieldRate"
                  name="Rental Yield"
                  fill="#13423C"
                  radius={[0, 8, 8, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-surface-container/50 rounded-xl text-xs text-on-surface-variant flex items-center justify-between border border-outline-variant/30 mt-auto">
            <span>Aset Yield Tertinggi:</span>
            <strong className="text-primary font-bold">Kos-Kosan (14.5%)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
