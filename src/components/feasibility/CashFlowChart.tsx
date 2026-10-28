"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import type { CashFlowYear } from "@/lib/feasibility-engine";
import { TrendingUp, Layers } from "lucide-react";

interface CashFlowChartProps {
  cashFlowData: CashFlowYear[];
  landValue: number;
  buildingValue: number;
}

export function CashFlowChart({ cashFlowData, landValue, buildingValue }: CashFlowChartProps) {
  const [chartType, setChartType] = useState<"cashflow" | "asset">("cashflow");

  const formatJuta = (value: number) => {
    if (Math.abs(value) >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(0)}Jt`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  const formattedCashFlow = cashFlowData.map((d) => ({
    name: `Tahun ${d.year}`,
    "Sewa Kotor": d.grossRental,
    "Beban OPEX": d.opex,
    "NOI Bersih": d.noi,
    "Kumulatif Cash Flow": d.cumulativeCashFlow,
  }));

  const assetCompositionData = [
    {
      category: "Komposisi Aset",
      "Nilai Tanah": landValue,
      "Nilai Bangunan": buildingValue,
    },
  ];

  return (
    <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/40 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-outline-variant/30 pb-3">
        <div>
          <h4 className="font-headline-sm text-sm font-black text-on-surface flex items-center gap-2 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-primary" /> Visualisasi Finansial Interaktif
          </h4>
          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Proyeksi pertumbuhan arus kas kumulatif dan komposisi struktur nilai aset.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setChartType("cashflow")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              chartType === "cashflow"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Arus Kas 5 Tahun
          </button>
          <button
            type="button"
            onClick={() => setChartType("asset")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              chartType === "asset"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Struktur Aset
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartType === "cashflow" ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedCashFlow} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCashFlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#13423C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#13423C" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" opacity={0.6} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#707976" }} />
              <YAxis tickFormatter={formatJuta} tick={{ fontSize: 10, fill: "#707976" }} />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")}`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  borderColor: "#c0c8c5",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Area
                type="monotone"
                dataKey="Kumulatif Cash Flow"
                stroke="#13423C"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCashFlow)"
              />
              <Area
                type="monotone"
                dataKey="NOI Bersih"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNoi)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetCompositionData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" opacity={0.6} />
              <XAxis type="number" tickFormatter={formatJuta} tick={{ fontSize: 11, fill: "#707976" }} />
              <YAxis type="category" dataKey="category" hide />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")}`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  borderColor: "#c0c8c5",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="Nilai Tanah" fill="#13423C" radius={[8, 0, 0, 8]} barSize={40} />
              <Bar dataKey="Nilai Bangunan" fill="#cca830" radius={[0, 8, 8, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/30">
        <span className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-primary" /> Asumsi: Eskalasi sewa 5% / thn, inflasi OPEX 3.5% / thn
        </span>
        <span className="font-semibold text-primary">Interaktif &amp; Real-time</span>
      </div>
    </div>
  );
}
