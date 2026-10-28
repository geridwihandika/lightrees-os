// src/lib/feasibility-engine.ts
// Standardized Indonesian Property Appraisal & Feasibility Engine (SPI / KJPP standard inspired)

export type PropertyTypeKey =
  | 'rumah'
  | 'ruko'
  | 'tanah'
  | 'gudang'
  | 'kos_kontrakan'
  | 'kantor'
  | 'apartemen';

export type ConditionKey =
  | 'baru'
  | 'baik'
  | 'sedang'
  | 'butuh_renovasi'
  | 'rusak';

export type CertificateKey =
  | 'shm'
  | 'hgb'
  | 'ajb'
  | 'girik'
  | 'lainnya';

// Base Land Price per m2 (Baseline land value before location multiplier)
export const BASE_LAND_PRICES: Record<PropertyTypeKey, number> = {
  rumah: 6000000,
  ruko: 11000000,
  tanah: 4500000,
  gudang: 5000000,
  kos_kontrakan: 7000000,
  kantor: 12000000,
  apartemen: 10000000,
};

// Building Construction Cost New (RCN - Replacement Cost New) per m2
export const CONSTRUCTION_COSTS: Record<PropertyTypeKey, number> = {
  rumah: 5000000,
  ruko: 6000000,
  tanah: 0,
  gudang: 4000000,
  kos_kontrakan: 5500000,
  kantor: 8500000,
  apartemen: 9000000,
};

// Typical Gross Rental Yields in Indonesian Market
export const RENTAL_YIELDS: Record<PropertyTypeKey, number> = {
  rumah: 0.055,         // 5.5% gross
  ruko: 0.085,          // 8.5% gross
  tanah: 0.030,         // 3.0% gross (land lease)
  gudang: 0.105,        // 10.5% gross
  kos_kontrakan: 0.145, // 14.5% gross
  kantor: 0.080,        // 8.0% gross
  apartemen: 0.075,     // 7.5% gross
};

export const ROI_THRESHOLDS: Record<PropertyTypeKey, number> = {
  rumah: 5.0,
  ruko: 7.5,
  tanah: 4.0,
  gudang: 9.0,
  kos_kontrakan: 12.0,
  kantor: 7.0,
  apartemen: 6.5,
};

export const LOCATION_MULTIPLIERS: Record<string, number> = {
  'jakarta pusat': 2.8,
  'jakarta selatan': 2.5,
  'jakarta barat': 1.9,
  'jakarta utara': 1.6,
  'jakarta timur': 1.5,
  'tangerang selatan': 1.6,
  tangerang: 1.35,
  bekasi: 1.25,
  depok: 1.3,
  bogor: 1.15,
  bandung: 1.5,
  surabaya: 1.65,
  bali: 2.1,
  yogyakarta: 1.35,
  semarang: 1.2,
  medan: 1.25,
  makassar: 1.15,
};

// Physical Depreciation based on property condition
export const CONDITION_DEPRECIATION: Record<ConditionKey, number> = {
  baru: 0.02,           // 2%
  baik: 0.12,           // 12%
  sedang: 0.30,         // 30%
  butuh_renovasi: 0.55, // 55%
  rusak: 0.80,          // 80%
};

// Certificate Legal Certainty Multipliers
export const CERT_MULTIPLIERS: Record<CertificateKey, number> = {
  shm: 1.0,      // Sertifikat Hak Milik - Prime
  hgb: 0.92,     // Hak Guna Bangunan
  ajb: 0.78,     // Akta Jual Beli
  girik: 0.65,   // Letter C / Girik (High legal verification cost)
  lainnya: 0.75,
};

// Backward-compatible alias
export const BASE_PRICES = BASE_LAND_PRICES;
export const CONDITION_MULTIPLIERS: Record<string, number> = {
  baru: 1.15,
  baik: 1.05,
  sedang: 0.95,
  butuh_renovasi: 0.75,
  rusak: 0.55,
};

export interface FeasibilityInput {
  name?: string;
  type: string;
  landArea: number;
  buildingArea?: number;
  city: string;
  condition?: string;
  certificate?: string;
  acquisitionPrice?: number;
  customRentalMonthly?: number;
  floors?: number;
}

export interface CashFlowYear {
  year: number;
  grossRental: number;
  opex: number;
  noi: number;
  propertyValue: number;
  cumulativeCashFlow: number;
}

export interface FeasibilityResult {
  marketValue: number;
  landValue: number;
  buildingValue: number;
  pricePerM2: number;
  rangeLow: number;
  rangeHigh: number;
  annualRental: number;
  monthlyRental: number;
  operationalCost: number;
  opexBreakdown: {
    maintenance: number;
    pbb: number;
    management: number;
    insurance: number;
  };
  netPerYear: number;
  capRate: number;
  roi: number;
  paybackPeriod: number;
  revitalization: number;
  score: number;
  status: 'LAYAK' | 'PERLU_DIPERTIMBANGKAN' | 'TIDAK_LAYAK';
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  businessModel: string;
  targetMarket: string;
  exitStrategy: string;
  cashFlowProjection: CashFlowYear[];
  insights: string[];
}

export function analyzeFeasibility(input: {
  type: string;
  landArea: number;
  buildingArea?: number;
  city: string;
  condition?: string;
  certificate?: string;
  acquisitionPrice?: number;
  customRentalMonthly?: number;
  floors?: number;
}): FeasibilityResult {
  const normType = (input.type?.toLowerCase() || 'rumah') as PropertyTypeKey;
  const normCity = input.city?.trim().toLowerCase() || 'jakarta selatan';
  const normCondition = (input.condition?.toLowerCase() || 'baik') as ConditionKey;
  const normCert = (input.certificate?.toLowerCase() || 'shm') as CertificateKey;

  const landArea = Math.max(Number(input.landArea) || 0, 1);
  const buildingArea = normType === 'tanah' ? 0 : Math.max(Number(input.buildingArea) || (landArea * 0.75), 0);

  // 1. Land Appraisal
  const baseLandPrice = BASE_LAND_PRICES[normType] || 6000000;
  const locMult = LOCATION_MULTIPLIERS[normCity] || 1.1;
  const certMult = CERT_MULTIPLIERS[normCert] || 0.85;
  const landValue = Math.round(landArea * baseLandPrice * locMult * certMult);

  // 2. Building Appraisal (RCN minus physical depreciation)
  let buildingValue = 0;
  let revitalizationEstimate = 0;

  if (normType !== 'tanah' && buildingArea > 0) {
    const rcnPerM2 = CONSTRUCTION_COSTS[normType] || 5000000;
    const grossBuildingCost = buildingArea * rcnPerM2;
    const depRate = CONDITION_DEPRECIATION[normCondition] ?? 0.15;
    
    buildingValue = Math.round(grossBuildingCost * (1 - depRate));
    
    // Revitalization cost based on condition severity
    const capexRate =
      normCondition === 'baru' ? 0.01 :
      normCondition === 'baik' ? 0.04 :
      normCondition === 'sedang' ? 0.15 :
      normCondition === 'butuh_renovasi' ? 0.35 : 0.60;
    revitalizationEstimate = Math.round(grossBuildingCost * capexRate);
  }

  // 3. Total Fair Market Value
  const totalArea = Math.max(landArea + (buildingArea > 0 ? buildingArea * 0.5 : 0), 1);
  const marketValue = landValue + buildingValue;
  const effectivePrice = input.acquisitionPrice && input.acquisitionPrice > 0 ? input.acquisitionPrice : marketValue;
  const pricePerM2 = Math.round(marketValue / totalArea);

  // 4. Rental & Income Analysis
  const rentalYieldRate = RENTAL_YIELDS[normType] || 0.06;
  let annualRental: number;
  let monthlyRental: number;

  if (input.customRentalMonthly && input.customRentalMonthly > 0) {
    monthlyRental = Math.round(input.customRentalMonthly);
    annualRental = monthlyRental * 12;
  } else {
    annualRental = Math.round(marketValue * rentalYieldRate);
    monthlyRental = Math.round(annualRental / 12);
  }

  // 5. Operating Expenses (OPEX Breakdown)
  const opexBreakdown = {
    maintenance: Math.round(annualRental * 0.08),  // 8% maintenance reserve
    pbb: Math.round(marketValue * 0.0015),          // 0.15% PBB estimate
    management: Math.round(annualRental * 0.07),   // 7% management & collection fee
    insurance: Math.round(marketValue * 0.001),     // 0.1% insurance
  };
  const totalOpex = Math.round(
    opexBreakdown.maintenance +
    opexBreakdown.pbb +
    opexBreakdown.management +
    opexBreakdown.insurance
  );

  // 6. NOI & Yield Metrics
  const netPerYear = Math.max(0, annualRental - totalOpex);
  const capRate = Math.round((netPerYear / effectivePrice) * 1000) / 10; // e.g. 7.2%
  const roi = Math.round(((netPerYear + (landValue * 0.05)) / effectivePrice) * 1000) / 10; // including 5% land appreciation
  const paybackPeriod = netPerYear > 0 ? Math.round((effectivePrice / netPerYear) * 10) / 10 : 99;

  // 7. 5-Year Cash Flow Projection
  const cashFlowProjection: CashFlowYear[] = [];
  let cumCashFlow = -revitalizationEstimate;
  let projectedVal = marketValue;
  const annualRentGrowth = 0.05; // 5% rent inflation
  const annualLandAppreciation = 0.06; // 6% land growth

  for (let yr = 1; yr <= 5; yr++) {
    const yrGross = Math.round(annualRental * Math.pow(1 + annualRentGrowth, yr - 1));
    const yrOpex = Math.round(totalOpex * Math.pow(1 + 0.035, yr - 1)); // 3.5% inflation on expenses
    const yrNoi = yrGross - yrOpex;
    cumCashFlow += yrNoi;
    projectedVal = Math.round(projectedVal * (1 + (normType === 'tanah' ? 0.08 : annualLandAppreciation * 0.7)));

    cashFlowProjection.push({
      year: yr,
      grossRental: yrGross,
      opex: yrOpex,
      noi: yrNoi,
      propertyValue: projectedVal,
      cumulativeCashFlow: cumCashFlow,
    });
  }

  // 8. Multi-Dimensional Score (0 - 100)
  const targetThreshold = ROI_THRESHOLDS[normType] || 7.0;
  
  // A. Cap Rate Score (Max 35)
  const capRateScore = Math.min(35, (capRate / targetThreshold) * 25);
  // B. Legal Cert Score (Max 20)
  const legalScore = normCert === 'shm' ? 20 : normCert === 'hgb' ? 16 : normCert === 'ajb' ? 10 : 5;
  // C. Location & Growth (Max 20)
  const locationScore = locMult >= 2.0 ? 20 : locMult >= 1.5 ? 16 : locMult >= 1.2 ? 12 : 8;
  // D. Physical Asset Condition (Max 15)
  const physicalScore = normCondition === 'baru' ? 15 : normCondition === 'baik' ? 13 : normCondition === 'sedang' ? 9 : 4;
  // E. Payback Velocity (Max 10)
  const paybackScore = paybackPeriod <= 8 ? 10 : paybackPeriod <= 12 ? 7 : paybackPeriod <= 16 ? 4 : 1;

  const score = Math.min(100, Math.max(10, Math.round(capRateScore + legalScore + locationScore + physicalScore + paybackScore)));

  // 9. Status & Risk Categorization
  let status: 'LAYAK' | 'PERLU_DIPERTIMBANGKAN' | 'TIDAK_LAYAK';
  if (score >= 72) status = 'LAYAK';
  else if (score >= 52) status = 'PERLU_DIPERTIMBANGKAN';
  else status = 'TIDAK_LAYAK';

  let riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  if (score >= 75 && normCert === 'shm' && ['baru', 'baik'].includes(normCondition)) riskLevel = 'Rendah';
  else if (score >= 50 && ['shm', 'hgb'].includes(normCert)) riskLevel = 'Sedang';
  else riskLevel = 'Tinggi';

  // 10. Business Model, Target Market & Exit Strategy
  let businessModel = 'Sewa Tahunan & Capital Growth';
  let targetMarket = 'End-User Keluarga & Investor Properti';
  let exitStrategy = 'Refinancing KPR atau Jual Pasca Kenaikan NJOP 3-5 Tahun';

  if (normType === 'kos_kontrakan') {
    businessModel = 'Cash Flow Yield Tinggi (Sewa Kamar Bulanan/Tahunan)';
    targetMarket = 'Karyawan Swasta, Mahasiswa, & Profesional Muda';
    exitStrategy = 'Hold untuk Dividen Arus Kas Pasif atau Takeover Bisnis Kos-Kosan';
  } else if (normType === 'ruko') {
    businessModel = 'Triple Net Lease (NNN) Komersial / Retail Franchise';
    targetMarket = 'Bank, Retailer (Indomaret/Alfamart), Klinik, Kantor F&B';
    exitStrategy = 'Jual ke Investor Institusional dengan Existing Long-Term Tenant';
  } else if (normType === 'tanah') {
    businessModel = 'Land Banking / Land Development (Kavling Siap Bangun)';
    targetMarket = 'Developer Perumahan & Investor Skala Menengah';
    exitStrategy = 'Pecah Sertifikat Jadi Mini Cluster atau Jual Utuh ke Developer';
  } else if (normType === 'gudang') {
    businessModel = 'Hub Logistik & Fulfillment E-Commerce';
    targetMarket = 'Perusahaan Ekspedisi, FMCG, & Distributor';
    exitStrategy = 'Sewa Jangka Panjang 5-10 Tahun dengan Klausul Kenaikan Sewa Berkala';
  }

  return {
    marketValue,
    landValue,
    buildingValue,
    pricePerM2,
    rangeLow: Math.round(marketValue * 0.90),
    rangeHigh: Math.round(marketValue * 1.12),
    annualRental,
    monthlyRental,
    operationalCost: totalOpex,
    opexBreakdown,
    netPerYear,
    capRate,
    roi,
    paybackPeriod,
    revitalization: revitalizationEstimate,
    score,
    status,
    riskLevel,
    businessModel,
    targetMarket,
    exitStrategy,
    cashFlowProjection,
    insights: [
      `Valuasi Pasar Wajar: Rp ${marketValue.toLocaleString('id-ID')} (Tanah: Rp ${landValue.toLocaleString('id-ID')} | Bangunan: Rp ${buildingValue.toLocaleString('id-ID')})`,
      `Cap Rate Operasional: ${capRate}% per tahun (NOI Bersih: Rp ${netPerYear.toLocaleString('id-ID')}/thn)`,
      `Estimasi Pendapatan Sewa: Rp ${monthlyRental.toLocaleString('id-ID')}/bulan (Gross Yield: ${(rentalYieldRate * 100).toFixed(1)}%)`,
      `Biaya Operasional (PBB, Maintenance, Manajemen): Rp ${totalOpex.toLocaleString('id-ID')}/tahun`,
      `Payback Period: ~${paybackPeriod} tahun | Estimasi Capex/Renovasi: Rp ${revitalizationEstimate.toLocaleString('id-ID')}`,
      `Legalitas: ${normCert.toUpperCase()} — Risiko Penilaian: ${riskLevel} (Skor Kelayakan: ${score}/100)`,
    ],
  };
}
