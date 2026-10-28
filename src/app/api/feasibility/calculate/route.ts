import { NextRequest, NextResponse } from 'next/server';
import { analyzeFeasibility } from '@/lib/feasibility-engine';
import { feasibilitySchema } from '@/lib/validations/feasibility';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    
    // Normalize field names if submitted with legacy keys
    const normalizedData = {
      nama: rawBody.nama || rawBody.name,
      tipe: rawBody.tipe || rawBody.type || 'rumah',
      luasTanah: rawBody.luasTanah ?? rawBody.luas ?? 0,
      luasBangunan: rawBody.luasBangunan ?? (rawBody.tipe === 'tanah' ? 0 : rawBody.luas ?? 0),
      lokasi: rawBody.lokasi || rawBody.city || 'Jakarta',
      kondisi: rawBody.kondisi || rawBody.condition || 'baik',
      sertifikat: rawBody.sertifikat || rawBody.certificate || 'shm',
      namaPemilik: rawBody.namaPemilik || rawBody.nama_pemilik || 'Pemilik',
      waPemilik: rawBody.waPemilik || rawBody.wa_pemilik || '08123456789',
      hargaPerolehan: rawBody.hargaPerolehan ? Number(rawBody.hargaPerolehan) : undefined,
      estimasiSewaBulanan: rawBody.estimasiSewaBulanan ? Number(rawBody.estimasiSewaBulanan) : undefined,
    };

    const parseResult = feasibilitySchema.safeParse(normalizedData);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validasi gagal',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // Run core appraisal & feasibility calculations
    const analysis = analyzeFeasibility({
      type: validData.tipe,
      landArea: validData.luasTanah,
      buildingArea: validData.luasBangunan,
      city: validData.lokasi,
      condition: validData.kondisi,
      certificate: validData.sertifikat,
      acquisitionPrice: validData.hargaPerolehan,
      customRentalMonthly: validData.estimasiSewaBulanan,
    });

    // Fire and forget server-side webhook to Make.com if configured
    const makeWebhookUrl =
      process.env.MAKE_WEBHOOK_URL ||
      'https://hook.eu1.make.com/vnqjmoefpvofhgad5ubj0e7j501zxbyy';

    let webhookDispatched = false;
    try {
      const webhookPayload = {
        timestamp: new Date().toISOString(),
        property: {
          name: validData.nama,
          type: validData.tipe,
          landArea: validData.luasTanah,
          buildingArea: validData.luasBangunan,
          city: validData.lokasi,
          condition: validData.kondisi,
          certificate: validData.sertifikat,
          ownerName: validData.namaPemilik,
          ownerPhone: validData.waPemilik,
        },
        financials: {
          marketValue: analysis.marketValue,
          landValue: analysis.landValue,
          buildingValue: analysis.buildingValue,
          pricePerM2: analysis.pricePerM2,
          monthlyRental: analysis.monthlyRental,
          annualRental: analysis.annualRental,
          netPerYear: analysis.netPerYear,
          capRate: analysis.capRate,
          roi: analysis.roi,
          paybackPeriod: analysis.paybackPeriod,
          feasibilityScore: analysis.score,
          status: analysis.status,
          riskLevel: analysis.riskLevel,
          businessModel: analysis.businessModel,
        },
      };

      // Non-blocking fetch with short timeout
      fetch(makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(5000),
      })
        .then(() => {
          webhookDispatched = true;
        })
        .catch((err) => {
          console.warn('[Feasibility API] Webhook dispatch notice:', err.message);
        });
    } catch (e) {
      console.warn('[Feasibility API] Webhook init error:', e);
    }

    // Attempt database persistence if DB connection is active
    let savedRecordId: string | null = null;
    try {
      if (process.env.DATABASE_URL) {
        // Find or create default user for tracking
        let defaultUser = await prisma.user.findFirst();
        if (!defaultUser) {
          defaultUser = await prisma.user.create({
            data: {
              email: 'admin@lightrees.com',
              name: 'Admin Lightrees',
              role: 'ADMIN',
            },
          });
        }

        const mapTypeToEnum: Record<string, 'RUMAH' | 'RUKO' | 'TANAH' | 'GUDANG' | 'KOS_KONTRAKAN' | 'KANTOR' | 'APARTEMEN'> = {
          rumah: 'RUMAH',
          ruko: 'RUKO',
          tanah: 'TANAH',
          gudang: 'GUDANG',
          kos_kontrakan: 'KOS_KONTRAKAN',
          kantor: 'KANTOR',
          apartemen: 'APARTEMEN',
        };

        const mapCertToEnum: Record<string, 'SHM' | 'HGB' | 'AJB' | 'GIRIK' | 'LAINNYA'> = {
          shm: 'SHM',
          hgb: 'HGB',
          ajb: 'AJB',
          girik: 'GIRIK',
          lainnya: 'LAINNYA',
        };

        const mapCondToEnum: Record<string, 'BARU' | 'BAIK' | 'SEDANG' | 'BUTUH_RENOVASI' | 'RUSAK'> = {
          baru: 'BARU',
          baik: 'BAIK',
          sedang: 'SEDANG',
          butuh_renovasi: 'BUTUH_RENOVASI',
          rusak: 'RUSAK',
        };

        const mapStatusToEnum: Record<string, 'LAYAK' | 'PERLU_DIPERTIMBANGKAN' | 'TIDAK_LAYAK'> = {
          LAYAK: 'LAYAK',
          PERLU_DIPERTIMBANGKAN: 'PERLU_DIPERTIMBANGKAN',
          TIDAK_LAYAK: 'TIDAK_LAYAK',
        };

        const mapRiskToEnum: Record<string, 'RENDAH' | 'SEDANG' | 'TINGGI'> = {
          Rendah: 'RENDAH',
          Sedang: 'SEDANG',
          Tinggi: 'TINGGI',
        };

        const property = await prisma.property.create({
          data: {
            name: validData.nama,
            type: mapTypeToEnum[validData.tipe] || 'RUMAH',
            address: validData.lokasi,
            city: validData.lokasi,
            province: 'Indonesia',
            landArea: validData.luasTanah,
            buildingArea: validData.luasBangunan ?? 0,
            certificate: mapCertToEnum[validData.sertifikat] || 'SHM',
            condition: mapCondToEnum[validData.kondisi] || 'BAIK',
            marketValue: analysis.marketValue,
            pricePerM2: analysis.pricePerM2,
            rentalPrice: analysis.monthlyRental,
            rentalYield: analysis.capRate,
            userId: defaultUser.id,
          },
        });

        const savedAnalysis = await prisma.feasibilityAnalysis.create({
          data: {
            propertyId: property.id,
            basePricePerM2: analysis.pricePerM2,
            locationMultiplier: 1.0,
            conditionMultiplier: 1.0,
            certMultiplier: 1.0,
            marketValue: analysis.marketValue,
            pricePerM2: analysis.pricePerM2,
            rangeLow: analysis.rangeLow,
            rangeHigh: analysis.rangeHigh,
            annualRental: analysis.annualRental,
            monthlyRental: analysis.monthlyRental,
            operationalCost: analysis.operationalCost,
            netPerYear: analysis.netPerYear,
            roi: analysis.roi,
            paybackPeriod: analysis.paybackPeriod,
            revitalization: analysis.revitalization,
            score: analysis.score,
            status: mapStatusToEnum[analysis.status] || 'LAYAK',
            riskLevel: mapRiskToEnum[analysis.riskLevel] || 'SEDANG',
            businessModel: analysis.businessModel,
            targetMarket: analysis.targetMarket,
            aiInsights: JSON.stringify(analysis.insights),
            userId: defaultUser.id,
          },
        });

        savedRecordId = savedAnalysis.id;
      }
    } catch (dbErr: unknown) {
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.warn('[Feasibility API] Database persistence skipped/failed:', msg);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...analysis,
        propertyInput: validData,
        recordId: savedRecordId,
        webhookDispatched,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Feasibility API Error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan internal server saat menghitung kelayakan.',
        message: msg,
      },
      { status: 500 }
    );
  }
}
