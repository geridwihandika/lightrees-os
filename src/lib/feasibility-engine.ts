// src/lib/feasibility-engine.ts

export const BASE_PRICES: Record<string, number> = {
  rumah: 8000000, ruko: 15000000, tanah: 5000000,
  gudang: 6000000, kos_kontrakan: 10000000, kantor: 14000000,
  apartemen: 12000000,
};

export const RENTAL_YIELDS: Record<string, number> = {
  rumah: 0.10, ruko: 0.12, tanah: 0.08,
  gudang: 0.12, kos_kontrakan: 0.18, kantor: 0.10,
  apartemen: 0.08,
};

export const ROI_THRESHOLDS: Record<string, number> = {
  rumah: 6, ruko: 8, tanah: 12,
  gudang: 10, kos_kontrakan: 15, kantor: 8,
  apartemen: 6,
};

export const LOCATION_MULTIPLIERS: Record<string, number> = {
  'jakarta pusat': 2.5, 'jakarta selatan': 2.3, 'jakarta barat': 1.8,
  'jakarta timur': 1.5, 'jakarta utara': 1.4, tangerang: 1.3,
  bandung: 1.5, surabaya: 1.6, bali: 1.8, yogyakarta: 1.3,
  medan: 1.2, bekasi: 1.2, depok: 1.2, makassar: 1.1,
  semarang: 1.1, bogor: 1.0,
};

export const CONDITION_MULTIPLIERS: Record<string, number> = {
  baru: 1.2, baik: 1.1, sedang: 1.0, butuh_renovasi: 0.7, rusak: 0.5,
};

export const CERT_MULTIPLIERS: Record<string, number> = {
  shm: 1.0, hgb: 0.9, ajb: 0.8, girik: 0.6, lainnya: 0.8,
};

export function analyzeFeasibility(input: {
  type: string;
  landArea: number;
  buildingArea: number;
  city: string;
  condition: string;
  certificate: string;
}) {
  const basePrice = BASE_PRICES[input.type] || 8000000;
  const locMult = LOCATION_MULTIPLIERS[input.city.toLowerCase()] || 1.0;
  const condMult = CONDITION_MULTIPLIERS[input.condition] || 1.0;
  const certMult = CERT_MULTIPLIERS[input.certificate] || 0.8;
  const rentalYield = RENTAL_YIELDS[input.type] || 0.10;
  const thresholdROI = ROI_THRESHOLDS[input.type] || 8;

  const area = Math.max(input.landArea, input.buildingArea, 1);
  const marketValue = basePrice * area * locMult * condMult * certMult;
  const pricePerM2 = marketValue / area;
  const annualRental = marketValue * rentalYield;
  const monthlyRental = annualRental / 12;
  const operationalCost = annualRental * 0.2;
  const netPerYear = annualRental - operationalCost;
  const roi = (netPerYear / marketValue) * 100;
  const payback = roi > 0 ? marketValue / netPerYear : Infinity;
  const revitalization = marketValue * 0.1;

  // Score calculation (0-100)
  const roiScore = Math.min((roi / thresholdROI) * 50, 50);
  const paybackScore = Math.max(0, (1 - Math.min(payback, 20) / 20) * 25);
  const conditionScore = ['baru', 'baik'].includes(input.condition) ? 15 : 0;
  const locationScore = locMult > 1.5 ? 10 : 0;
  const score = Math.min(roiScore + paybackScore + conditionScore + locationScore, 100);

  // Status determination
  let status: string;
  if (roi >= thresholdROI * 1.5) status = 'LAYAK';
  else if (roi >= thresholdROI * 0.7) status = 'PERLU_DIPERTIMBANGKAN';
  else status = 'TIDAK_LAYAK';

  // Risk level
  let risk: string;
  if (roi > 15) risk = 'Rendah';
  else if (roi > 8) risk = 'Sedang';
  else risk = 'Tinggi';

  // Business model
  let businessModel = 'Sewa dan Jual';
  if (['kos_kontrakan', 'ruko', 'gudang'].includes(input.type)) businessModel = 'Sewa Bulanan';
  else if (input.type === 'tanah') businessModel = 'Jual';

  return {
    marketValue: Math.round(marketValue),
    pricePerM2: Math.round(pricePerM2),
    rangeLow: Math.round(marketValue * 0.85),
    rangeHigh: Math.round(marketValue * 1.15),
    annualRental: Math.round(annualRental),
    monthlyRental: Math.round(monthlyRental),
    operationalCost: Math.round(operationalCost),
    netPerYear: Math.round(netPerYear),
    roi: Math.round(roi * 100) / 100,
    paybackPeriod: Math.round(payback * 10) / 10,
    revitalization: Math.round(revitalization),
    score: Math.round(score),
    status,
    riskLevel: risk,
    businessModel,
    targetMarket: input.type === 'tanah' ? 'Developer / Investor' : 'Tenant Akhir & Investor',
    insights: [
      `Nilai properti: Rp ${Math.round(marketValue).toLocaleString('id-ID')} (Rp ${Math.round(pricePerM2).toLocaleString('id-ID')}/m²)`,
      `ROI ${Math.round(roi * 100) / 100}% — ${status}`,
      `Estimasi sewa: Rp ${Math.round(monthlyRental).toLocaleString('id-ID')}/bulan`,
      `Biaya operasional ~20% dari pendapatan sewa: Rp ${Math.round(operationalCost).toLocaleString('id-ID')}/tahun`,
      `Balik modal dalam ${Math.round(payback * 10) / 10} tahun`,
      `Skor Kelayakan: ${Math.round(score)}/100`,
    ],
  };
}
