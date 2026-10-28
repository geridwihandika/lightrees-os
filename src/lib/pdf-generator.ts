import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { FeasibilityResult } from './feasibility-engine';

export interface GeneratePdfOptions {
  property: {
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
  result: FeasibilityResult;
}

export function generateFeasibilityPdf({ property, result }: GeneratePdfOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const formatRp = (num: number) => {
    return `Rp ${Math.round(num || 0).toLocaleString('id-ID')}`;
  };

  const primaryColor: [number, number, number] = [19, 66, 60]; // #13423C Dark Emerald
  const secondaryColor: [number, number, number] = [172, 51, 28]; // #AC331C Coral
  const darkTextColor: [number, number, number] = [25, 28, 30];
  const mutedTextColor: [number, number, number] = [100, 110, 115];

  // ── 1. HEADER & BRANDING ──────────────────────────────────
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('LIGHTREES OS', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Property Intelligence & Feasibility Dossier', 14, 18);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.setFontSize(8);
  doc.text(`Tanggal Laporan: ${today}`, 196, 12, { align: 'right' });
  doc.text('Metodologi: Standar Penilaian Indonesia (SPI)', 196, 18, { align: 'right' });

  // ── 2. EXECUTIVE TITLE & STATUS BADGE ─────────────────────
  let yPos = 34;

  doc.setTextColor(...darkTextColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(property.nama || 'Analisis Kelayakan Properti', 14, yPos);

  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...mutedTextColor);
  doc.text(`${property.lokasi} • Tipe: ${property.tipe.toUpperCase()} • Legalitas: ${property.sertifikat.toUpperCase()}`, 14, yPos);

  // Status Badge box on top right
  const statusColor: [number, number, number] =
    result.status === 'LAYAK'
      ? [22, 101, 52] // Green
      : result.status === 'PERLU_DIPERTIMBANGKAN'
      ? [180, 83, 9] // Amber
      : [185, 28, 28]; // Red

  doc.setFillColor(245, 247, 248);
  doc.roundedRect(135, 27, 61, 15, 2, 2, 'F');
  doc.setDrawColor(...statusColor);
  doc.setLineWidth(0.5);
  doc.roundedRect(135, 27, 61, 15, 2, 2, 'D');

  doc.setTextColor(...statusColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`STATUS: ${result.status.replace('_', ' ')}`, 165.5, 33, { align: 'center' });
  doc.setFontSize(9);
  doc.text(`SKOR: ${result.score} / 100 • Risiko ${result.riskLevel}`, 165.5, 38, { align: 'center' });

  // ── 3. SECTION: PROPERTY ATTRIBUTES ───────────────────────
  yPos += 6;
  const runAutoTable = (autoTable as unknown as { default?: typeof autoTable }).default || autoTable;

  runAutoTable(doc, {
    startY: yPos,
    head: [['Parameter Properti', 'Detail Nilai', 'Parameter Finansial', 'Nilai Taksiran']],
    body: [
      ['Nama Properti', property.nama, 'Nilai Pasar Wajar', formatRp(result.marketValue)],
      ['Tipe Properti', property.tipe.toUpperCase(), 'Nilai Tanah', formatRp(result.landValue)],
      ['Luas Tanah', `${property.luasTanah} m²`, 'Nilai Bangunan', formatRp(result.buildingValue)],
      ['Luas Bangunan', `${property.luasBangunan} m²`, 'Harga Efektif / m²', `${formatRp(result.pricePerM2)}/m²`],
      ['Status Sertifikat', property.sertifikat.toUpperCase(), 'Range Pasar Wajar', `${formatRp(result.rangeLow)} - ${formatRp(result.rangeHigh)}`],
      ['Kondisi Fisik', property.kondisi.replace('_', ' ').toUpperCase(), 'Estimasi Capex Renovasi', formatRp(result.revitalization)],
      ['Pemilik & Kontak', `${property.namaPemilik} (${property.waPemilik})`, 'Target Sewa Tahunan', formatRp(result.annualRental)],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: darkTextColor,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 35 },
      1: { cellWidth: 55 },
      2: { fontStyle: 'bold', cellWidth: 45 },
      3: { cellWidth: 55 },
    },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastTableY = (doc as any).lastAutoTable?.finalY || yPos + 40;
  yPos = lastTableY + 8;

  // ── 4. SECTION: KEY INVESTMENT & YIELD METRICS ─────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('Indikator Finansial & Kelayakan Investasi', 14, yPos);

  yPos += 3;
  runAutoTable(doc, {
    startY: yPos,
    head: [['Metrik Investasi', 'Nilai / Rasio', 'Keterangan Metodologi']],
    body: [
      ['Cap Rate (Net Capitalization Rate)', `${result.capRate}% per tahun`, 'Rasio NOI Bersih terhadap total nilai valuasi wajar aset'],
      ['Net Operating Income (NOI)', `${formatRp(result.netPerYear)} / tahun`, 'Pendapatan sewa kotor dikurangi cadangan OPEX'],
      ['Estimasi Pendapatan Sewa', `${formatRp(result.monthlyRental)} / bulan`, `${formatRp(result.annualRental)} kotor per tahun`],
      ['Total Biaya Operasional (OPEX)', `${formatRp(result.operationalCost)} / tahun`, 'PBB (0.15%), Perawatan (8%), Manajemen (7%), Asuransi (0.1%)'],
      ['Payback Period (Balik Modal)', `~${result.paybackPeriod} Tahun`, 'Waktu pengembalian investasi dari arus kas bersih tahunan'],
      ['Rasio ROI Komprehensif', `${result.roi}% per tahun`, 'Termasuk proyeksi apresiasi nilai modal tanah tahunan (5%)'],
    ],
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: darkTextColor,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { fontStyle: 'bold', cellWidth: 45, textColor: primaryColor },
      2: { cellWidth: 85 },
    },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastMetricsY = (doc as any).lastAutoTable?.finalY || yPos + 40;
  yPos = lastMetricsY + 8;

  // ── 5. SECTION: 5-YEAR CASH FLOW PROJECTION ────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('Proyeksi Arus Kas Multi-Tahun (5-Year Cash Flow Projection)', 14, yPos);

  yPos += 3;
  const cashFlowRows = result.cashFlowProjection.map((yr) => [
    `Tahun ${yr.year}`,
    formatRp(yr.grossRental),
    formatRp(yr.opex),
    formatRp(yr.noi),
    formatRp(yr.propertyValue),
    formatRp(yr.cumulativeCashFlow),
  ]);

  runAutoTable(doc, {
    startY: yPos,
    head: [['Periode', 'Sewa Kotor (+5%/thn)', 'OPEX (+3.5%/thn)', 'NOI Bersih', 'Nilai Aset Terproyeksi', 'Kumulatif Cash Flow']],
    body: cashFlowRows,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: darkTextColor,
      halign: 'right',
    },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'center', cellWidth: 22 },
      1: { cellWidth: 32 },
      2: { cellWidth: 30 },
      3: { fontStyle: 'bold', cellWidth: 30, textColor: primaryColor },
      4: { cellWidth: 38 },
      5: { fontStyle: 'bold', cellWidth: 38, textColor: secondaryColor },
    },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastCashflowY = (doc as any).lastAutoTable?.finalY || yPos + 40;
  yPos = lastCashflowY + 8;

  // ── 6. STRATEGIC ADVISORY & INSIGHTS ───────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('Rekomendasi Bisnis & Strategi Exit', 14, yPos);

  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkTextColor);

  const advisoryText = [
    `• Model Bisnis: ${result.businessModel}`,
    `• Target Pasar: ${result.targetMarket}`,
    `• Rencana Exit: ${result.exitStrategy}`,
  ];
  advisoryText.forEach((item) => {
    doc.text(item, 16, yPos);
    yPos += 4.5;
  });

  yPos += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryColor);
  doc.text('Catatan Penilaian Penting:', 14, yPos);

  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkTextColor);
  result.insights.forEach((ins) => {
    doc.text(`• ${ins}`, 16, yPos);
    yPos += 4.2;
  });

  // ── 7. FOOTER & DISCLAIMER ─────────────────────────────────
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(242, 244, 246);
  doc.rect(0, pageHeight - 14, 210, 14, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(...mutedTextColor);
  doc.text(
    'Disclaimer: Laporan ini di-generate secara otomatis oleh Lightrees OS berdasarkan data input pengguna dan metodologi Standar Penilaian Indonesia (SPI). Dokumen ini berfungsi sebagai indikasi kelayakan awal sebelum inspeksi fisik dan legal due diligence resmi.',
    14,
    pageHeight - 7,
    { maxWidth: 182 }
  );

  // Save the PDF
  const cleanName = (property.nama || 'Property')
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .substring(0, 30);
  const fileName = `Lightrees_Dossier_${cleanName}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
