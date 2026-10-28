import { z } from 'zod';

export const propertySchema = z.object({
  name: z.string().min(3, 'Nama properti minimal 3 karakter'),
  type: z.enum(['RUMAH', 'RUKO', 'TANAH', 'GUDANG', 'KOS_KONTRAKAN', 'KANTOR', 'APARTEMEN']),
  description: z.string().optional(),
  address: z.string().min(3, 'Alamat wajib diisi'),
  city: z.string().min(2, 'Kota wajib diisi'),
  province: z.string().default('Jawa Barat'),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  landArea: z.coerce.number().positive('Luas tanah harus lebih dari 0'),
  buildingArea: z.coerce.number().nonnegative('Luas bangunan tidak boleh negatif').default(0),
  floors: z.coerce.number().int().min(1).default(1),
  bedrooms: z.coerce.number().int().optional(),
  bathrooms: z.coerce.number().int().optional(),
  certificate: z.enum(['SHM', 'HGB', 'AJB', 'GIRIK', 'LAINNYA']).default('SHM'),
  condition: z.enum(['BARU', 'BAIK', 'SEDANG', 'BUTUH_RENOVASI', 'RUSAK']).default('BAIK'),
  marketValue: z.coerce.number().positive('Nilai pasar harus lebih dari 0'),
  rentalPrice: z.coerce.number().optional(),
  rentalYield: z.coerce.number().optional(),
  status: z.enum(['AVAILABLE', 'SOLD', 'RENTED', 'UNDER_MAINTENANCE', 'PENDING']).default('AVAILABLE'),
  isFeatured: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
});

export type PropertyInputData = z.infer<typeof propertySchema>;
