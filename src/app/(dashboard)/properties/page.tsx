"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Building2,
  Search,
  Filter,
  Plus,
  MapPin,
  ArrowRight,
  Map as MapIcon,
  LayoutGrid,
  Bed,
  Maximize2,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import type { PropertyMapItem } from "@/components/maps/PropertyMap";

const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] rounded-[2rem] bg-surface-container flex flex-col items-center justify-center border border-outline-variant/30 text-on-surface-variant animate-pulse">
      <MapPin className="w-8 h-8 text-primary/40 mb-2 animate-bounce" />
      <p className="font-label-md font-bold">Memuat Peta GIS...</p>
    </div>
  ),
});

export default function PropertiesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for Add Property Modal
  const [formData, setFormData] = useState({
    name: "",
    type: "RUMAH",
    description: "",
    address: "",
    city: "Tangerang Selatan",
    landArea: "120",
    buildingArea: "90",
    floors: "2",
    bedrooms: "3",
    bathrooms: "2",
    certificate: "SHM",
    condition: "BAIK",
    marketValue: "1800000000",
    rentalPrice: "8500000",
    rentalYield: "6.5",
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  });

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (typeFilter !== "ALL") params.set("type", typeFilter);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProperties(data.data);
      }
    } catch {
      toast.error("Gagal memuat daftar properti.");
    } finally {
      setLoading(false);
    }
  }, [typeFilter, search]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        province: "Indonesia",
        landArea: Number(formData.landArea) || 1,
        buildingArea: Number(formData.buildingArea) || 0,
        floors: Number(formData.floors) || 1,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        certificate: formData.certificate,
        condition: formData.condition,
        marketValue: Number(formData.marketValue) || 100000000,
        rentalPrice: Number(formData.rentalPrice) || 0,
        rentalYield: Number(formData.rentalYield) || 0,
        status: formData.status,
        imageUrl: formData.imageUrl,
        latitude: -6.28 + (Math.random() - 0.5) * 0.1,
        longitude: 106.72 + (Math.random() - 0.5) * 0.1,
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      if (!res.ok || !resJson.success) {
        throw new Error(resJson.error || "Gagal menyimpan properti baru.");
      }

      toast.success("Properti baru berhasil ditambahkan ke portofolio!");
      setIsModalOpen(false);
      setProperties((prev) => [resJson.data, ...prev]);

      // Reset form
      setFormData({
        name: "",
        type: "RUMAH",
        description: "",
        address: "",
        city: "Tangerang Selatan",
        landArea: "120",
        buildingArea: "90",
        floors: "2",
        bedrooms: "3",
        bathrooms: "2",
        certificate: "SHM",
        condition: "BAIK",
        marketValue: "1800000000",
        rentalPrice: "8500000",
        rentalYield: "6.5",
        status: "AVAILABLE",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan sistem";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRp = (val: number) => {
    if (val >= 1_000_000_000) {
      return `Rp ${(val / 1_000_000_000).toFixed(2)}B`;
    }
    return `Rp ${(val / 1_000_000).toFixed(0)}Jt`;
  };

  const mapItems: PropertyMapItem[] = properties.map((p) => ({
    id: p.id,
    name: p.name,
    type: p.type,
    address: p.address,
    city: p.city,
    latitude: p.latitude,
    longitude: p.longitude,
    marketValue: p.marketValue,
    rentalYield: p.rentalYield,
    status: p.status,
    imageUrl: p.imageUrl,
  }));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/50 backdrop-blur-md text-secondary text-xs font-bold tracking-wider uppercase mb-1 border border-secondary/20 shadow-sm w-fit">
            <Building2 className="w-3.5 h-3.5 text-secondary" /> Portfolio Hub &amp; Spatial Assets
          </div>
          <h1 className="font-display-lg text-[36px] md:text-[48px] font-black text-on-surface tracking-tight leading-tight">
            Property Portfolio
          </h1>
          <p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant font-medium">
            Kelola inventaris listing, analisis spasial peta GIS, dan status valuasi seluruh aset.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-white border border-outline-variant/40 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Grid List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "map"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Peta Spasial (GIS)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-xs font-bold hover:bg-primary-container transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </header>

      {/* Search & Type Filter Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-[1.5rem] border border-outline-variant/30 shadow-sm gap-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all w-full sm:w-80 shadow-sm">
            <Search className="w-4 h-4 text-on-surface-variant mr-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, kota, alamat..."
              className="bg-transparent border-none outline-none font-body-md text-sm font-medium text-on-surface w-full placeholder:text-outline p-0 focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-surface-container text-on-surface rounded-xl text-xs font-bold hover:bg-surface-variant transition-colors"
          >
            Cari
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1 pl-1">
            <Filter className="w-3 h-3 text-primary" /> Filter:
          </span>
          {[
            { id: "ALL", label: "Semua" },
            { id: "RUMAH", label: "Rumah" },
            { id: "RUKO", label: "Ruko" },
            { id: "TANAH", label: "Tanah" },
            { id: "KOS_KONTRAKAN", label: "Kos-Kosan" },
            { id: "GUDANG", label: "Gudang" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTypeFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                typeFilter === item.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container/60 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View: Grid vs Interactive Map */}
      {viewMode === "map" ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline-sm text-sm font-black text-on-surface flex items-center gap-2 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-primary" /> Sebaran Geografis Aset Properti
            </h3>
            <span className="text-xs font-bold text-on-surface-variant">
              {properties.length} Titik Aset Terpetakan
            </span>
          </div>
          <PropertyMap properties={mapItems} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-on-surface-variant">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
              <p className="font-bold text-sm">Memuat portofolio aset...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-on-surface-variant bg-white/50 rounded-[2rem] border border-dashed border-outline-variant">
              <Building2 className="w-12 h-12 text-primary/30 mb-2" />
              <p className="font-bold text-base text-on-surface">Tidak ada properti ditemukan</p>
              <p className="text-xs text-on-surface-variant mt-1">Coba ubah kata kunci pencarian atau filter tipe aset.</p>
            </div>
          ) : (
            properties.map((prop) => {
              const isAvailable = prop.status === "AVAILABLE";
              return (
                <div
                  key={prop.id}
                  className="bg-white/85 backdrop-blur-lg rounded-[2rem] border border-outline-variant/40 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-52 bg-surface-variant relative overflow-hidden">
                    <img
                      src={prop.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>

                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-black text-primary uppercase shadow-sm">
                        {prop.type}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${
                          isAvailable
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>

                    {prop.rentalYield ? (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-white/20">
                        <Sparkles className="w-3 h-3 text-emerald-400" /> Yield {prop.rentalYield}%
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="font-headline-sm text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {prop.name}
                      </h3>
                      <p className="font-body-md text-xs text-on-surface-variant font-medium flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {prop.city} • {prop.certificate}
                      </p>
                    </div>

                    {/* Dimensions & Specs */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-outline-variant/30 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-primary" /> {prop.landArea} m² Lahan
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-primary" /> {prop.buildingArea} m² Bgn
                      </span>
                      {prop.bedrooms ? (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3 text-primary" /> {prop.bedrooms} KT
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>

                    <div className="flex justify-between items-end mt-auto pt-2">
                      <div>
                        <p className="font-label-sm text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                          Market Value
                        </p>
                        <p className="font-display-sm text-[20px] font-black text-on-surface">
                          {formatRp(prop.marketValue)}
                        </p>
                      </div>

                      <Link
                        href={`/feasibility?name=${encodeURIComponent(prop.name)}&city=${encodeURIComponent(prop.city)}`}
                        className="px-3 py-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Uji Kelayakan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal Add Property */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/40 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-4 border-b border-outline-variant/30">
              <h2 className="font-headline-md text-xl font-black text-on-surface flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Tambah Aset Properti Baru
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Data akan tersimpan langsung ke sistem portofolio dan terpetakan di peta spasial GIS.
              </p>
            </div>

            <form onSubmit={handleAddPropertySubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                  Nama Properti
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleModalChange}
                  required
                  placeholder="e.g. Cluster Bintaro Residence"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Tipe Properti
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleModalChange}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  >
                    <option value="RUMAH">Rumah</option>
                    <option value="RUKO">Ruko</option>
                    <option value="TANAH">Tanah</option>
                    <option value="KOS_KONTRAKAN">Kos-Kosan</option>
                    <option value="GUDANG">Gudang</option>
                    <option value="APARTEMEN">Apartemen</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Kota / Wilayah
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleModalChange}
                    required
                    placeholder="e.g. Tangerang Selatan"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                  Alamat Lengkap
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleModalChange}
                  required
                  placeholder="e.g. Jl. Maleo Raya No. 12"
                  className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Luas Tanah (m²)
                  </label>
                  <input
                    name="landArea"
                    type="number"
                    value={formData.landArea}
                    onChange={handleModalChange}
                    required
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Luas Bangunan (m²)
                  </label>
                  <input
                    name="buildingArea"
                    type="number"
                    value={formData.buildingArea}
                    onChange={handleModalChange}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Sertifikat
                  </label>
                  <select
                    name="certificate"
                    value={formData.certificate}
                    onChange={handleModalChange}
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  >
                    <option value="SHM">SHM</option>
                    <option value="HGB">HGB</option>
                    <option value="AJB">AJB</option>
                    <option value="GIRIK">Girik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Market Value (Rp)
                  </label>
                  <input
                    name="marketValue"
                    type="number"
                    value={formData.marketValue}
                    onChange={handleModalChange}
                    required
                    placeholder="e.g. 2400000000"
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
                    Foto URL (Unsplash / Hosted)
                  </label>
                  <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleModalChange}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-white border-2 border-outline-variant/40 rounded-xl p-3 text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    "Simpan Properti"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
