import { z } from 'zod';

export const feasibilitySchema = z.object({
  nama: z.string().min(2, 'Nama properti minimal 2 karakter'),
  tipe: z.enum(['rumah', 'ruko', 'tanah', 'gudang', 'kos_kontrakan', 'kantor', 'apartemen']),
  luasTanah: z.coerce.number().positive('Luas tanah harus lebih dari 0'),
  luasBangunan: z.coerce.number().nonnegative('Luas bangunan tidak boleh negatif').optional().default(0),
  lokasi: z.string().min(2, 'Lokasi / kota wajib diisi'),
  kondisi: z.enum(['baru', 'baik', 'sedang', 'butuh_renovasi', 'rusak']).default('baik'),
  sertifikat: z.enum(['shm', 'hgb', 'ajb', 'girik', 'lainnya']).default('shm'),
  namaPemilik: z.string().min(2, 'Nama pemilik minimal 2 karakter'),
  waPemilik: z
    .string()
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .regex(/^[0-9+]+$/, 'Nomor WhatsApp hanya boleh angka'),
  hargaPerolehan: z.coerce.number().optional(),
  estimasiSewaBulanan: z.coerce.number().optional(),
});

export type FeasibilityFormData = z.infer<typeof feasibilitySchema>;
