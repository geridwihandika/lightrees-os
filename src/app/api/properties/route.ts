import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { propertySchema } from '@/lib/validations/property';

const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    name: 'Cluster Serenity Bintaro Sektor 9',
    type: 'RUMAH',
    description: 'Rumah modern minimalis 2 lantai dengan taman belakang asri dan akses 5 menit ke pintu tol Bintaro.',
    address: 'Jl. Maleo Raya No. 14, Sektor 9',
    city: 'Tangerang Selatan',
    province: 'Banten',
    latitude: -6.2842,
    longitude: 106.7118,
    landArea: 140,
    buildingArea: 120,
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    certificate: 'SHM',
    condition: 'BARU',
    marketValue: 2450000000,
    pricePerM2: 17500000,
    rentalPrice: 12500000,
    rentalYield: 6.1,
    status: 'AVAILABLE',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    name: 'Ruko Commercial Hub BSD City',
    type: 'RUKO',
    description: 'Ruko strategis 3 lantai hadap jalan boulevard utama, cocok untuk F&B, kantor perbankan, atau franchise.',
    address: 'Jl. BSD Grand Boulevard Blok C',
    city: 'Tangerang Selatan',
    province: 'Banten',
    latitude: -6.3021,
    longitude: 106.6524,
    landArea: 90,
    buildingArea: 240,
    floors: 3,
    bedrooms: 0,
    bathrooms: 3,
    certificate: 'HGB',
    condition: 'BAIK',
    marketValue: 4200000000,
    pricePerM2: 17500000,
    rentalPrice: 28000000,
    rentalYield: 8.0,
    status: 'AVAILABLE',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    name: 'Kost Eksklusif Senopati Prime',
    type: 'KOS_KONTRAKAN',
    description: 'Kostan 18 kamar fully furnished dengan okupansi 95%, fasilitas smart lock, kamar mandi dalam, dan rooftop.',
    address: 'Jl. Senopati Dalam No. 8',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    latitude: -6.2345,
    longitude: 106.8123,
    landArea: 250,
    buildingArea: 400,
    floors: 3,
    bedrooms: 18,
    bathrooms: 18,
    certificate: 'SHM',
    condition: 'BAIK',
    marketValue: 8500000000,
    pricePerM2: 21250000,
    rentalPrice: 95000000,
    rentalYield: 13.4,
    status: 'RENTED',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-4',
    name: 'Kavling Land Bank Cilandak Marinir',
    type: 'TANAH',
    description: 'Tanah kavling siap bangun zona pemukiman (R.4) bebas banjir dengan lebar muka jalan 18 meter.',
    address: 'Jl. Cilandak KKO Raya',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    latitude: -6.3012,
    longitude: 106.8189,
    landArea: 600,
    buildingArea: 0,
    floors: 1,
    bedrooms: 0,
    bathrooms: 0,
    certificate: 'SHM',
    condition: 'BARU',
    marketValue: 7200000000,
    pricePerM2: 12000000,
    rentalPrice: 0,
    rentalYield: 0,
    status: 'AVAILABLE',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-5',
    name: 'Hub Logistik Modern Marunda',
    type: 'GUDANG',
    description: 'Gudang distribusi tinggi ceiling 9 meter dengan loading dock kontainer 40ft dan sertifikat PBG industri.',
    address: 'Kawasan Industri Marunda Center',
    city: 'Jakarta Utara',
    province: 'DKI Jakarta',
    latitude: -6.1124,
    longitude: 106.9642,
    landArea: 1200,
    buildingArea: 900,
    floors: 1,
    bedrooms: 0,
    bathrooms: 4,
    certificate: 'HGB',
    condition: 'BAIK',
    marketValue: 11500000000,
    pricePerM2: 9580000,
    rentalPrice: 110000000,
    rentalYield: 11.5,
    status: 'AVAILABLE',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-6',
    name: 'Luxury Villa Canggu Sunset',
    type: 'RUMAH',
    description: 'Modern tropical villa dengan private infinity pool, solar panels, dan izin operasional pondok wisata.',
    address: 'Jl. Batu Bolong, Canggu',
    city: 'Badung',
    province: 'Bali',
    latitude: -8.6508,
    longitude: 115.1328,
    landArea: 320,
    buildingArea: 250,
    floors: 2,
    bedrooms: 3,
    bathrooms: 4,
    certificate: 'SHM',
    condition: 'BARU',
    marketValue: 6800000000,
    pricePerM2: 21250000,
    rentalPrice: 65000000,
    rentalYield: 11.4,
    status: 'AVAILABLE',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';

    type PropertyWithImages = {
      id: string;
      name: string;
      type: string;
      description?: string | null;
      address: string;
      city: string;
      province: string;
      latitude?: number | null;
      longitude?: number | null;
      landArea: number;
      buildingArea: number;
      floors: number;
      bedrooms?: number | null;
      bathrooms?: number | null;
      certificate: string;
      condition: string;
      marketValue: number;
      pricePerM2: number;
      rentalPrice?: number | null;
      rentalYield?: number | null;
      status: string;
      isFeatured: boolean;
      imageUrl?: string;
      images?: { id: string; url: string }[];
      createdAt: Date | string;
    };

    let dbProperties: PropertyWithImages[] = [];
    if (process.env.DATABASE_URL) {
      try {
        dbProperties = await prisma.property.findMany({
          include: {
            images: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } catch (dbErr: unknown) {
        console.warn('[Properties API] DB fetch notice:', dbErr instanceof Error ? dbErr.message : dbErr);
      }
    }

    // Merge DB properties or fallback to curated list
    let allProperties =
      dbProperties.length > 0
        ? dbProperties.map((p) => ({
            ...p,
            imageUrl: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
          }))
        : INITIAL_PROPERTIES;

    // Apply Filters
    if (search) {
      allProperties = allProperties.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.city.toLowerCase().includes(search) ||
          p.address.toLowerCase().includes(search)
      );
    }

    if (type && type !== 'ALL') {
      allProperties = allProperties.filter((p) => p.type === type);
    }

    if (status && status !== 'ALL') {
      allProperties = allProperties.filter((p) => p.status === status);
    }

    return NextResponse.json({
      success: true,
      total: allProperties.length,
      data: allProperties,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data properti', details: msg },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = propertySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validasi form properti gagal',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;
    const pricePerM2 = Math.round(validData.marketValue / Math.max(validData.landArea, 1));

    let createdProperty: unknown = null;

    if (process.env.DATABASE_URL) {
      try {
        let user = await prisma.user.findFirst();
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: 'admin@lightrees.com',
              name: 'Admin Lightrees',
              role: 'ADMIN',
            },
          });
        }

        createdProperty = await prisma.property.create({
          data: {
            name: validData.name,
            type: validData.type,
            description: validData.description,
            address: validData.address,
            city: validData.city,
            province: validData.province,
            latitude: validData.latitude || -6.2088,
            longitude: validData.longitude || 106.8456,
            landArea: validData.landArea,
            buildingArea: validData.buildingArea,
            floors: validData.floors,
            bedrooms: validData.bedrooms,
            bathrooms: validData.bathrooms,
            certificate: validData.certificate,
            condition: validData.condition,
            marketValue: validData.marketValue,
            pricePerM2,
            rentalPrice: validData.rentalPrice,
            rentalYield: validData.rentalYield,
            status: validData.status,
            isFeatured: validData.isFeatured,
            userId: user.id,
            images: validData.imageUrl
              ? {
                  create: [
                    {
                      url: validData.imageUrl,
                      isPrimary: true,
                    },
                  ],
                }
              : undefined,
          },
          include: {
            images: true,
          },
        });
      } catch (dbErr: unknown) {
        console.warn('[Properties API] DB create notice:', dbErr instanceof Error ? dbErr.message : dbErr);
      }
    }

    // In case DB is not yet migrated, create an in-memory representation
    if (!createdProperty) {
      createdProperty = {
        id: `prop-${Date.now()}`,
        ...validData,
        pricePerM2,
        imageUrl: validData.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      data: createdProperty,
      message: 'Properti berhasil ditambahkan ke portofolio!',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat properti baru', details: msg },
      { status: 500 }
    );
  }
}
