"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { MapPin, ArrowRight, Tag } from "lucide-react";

export interface PropertyMapItem {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  marketValue: number;
  rentalYield?: number | null;
  status: string;
  imageUrl?: string;
}

interface PropertyMapProps {
  properties: PropertyMapItem[];
  selectedId?: string;
  onSelect?: (prop: PropertyMapItem) => void;
}

export default function PropertyMap({ properties, onSelect }: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[540px] rounded-[2rem] bg-surface-container flex flex-col items-center justify-center border border-outline-variant/30 text-on-surface-variant animate-pulse">
        <MapPin className="w-10 h-10 text-primary/40 mb-2 animate-bounce" />
        <p className="font-label-md font-bold">Memuat Peta Spasial GIS...</p>
      </div>
    );
  }

  // Filter properties with valid coordinates
  const validProps = properties.filter(
    (p) => typeof p.latitude === "number" && typeof p.longitude === "number"
  );

  // Default center: Greater Jakarta / Bintaro
  const defaultCenter: [number, number] =
    validProps.length > 0 && validProps[0].latitude && validProps[0].longitude
      ? [validProps[0].latitude, validProps[0].longitude]
      : [-6.25, 106.8];

  const formatRp = (val: number) => {
    if (val >= 1_000_000_000) {
      return `Rp ${(val / 1_000_000_000).toFixed(1)}B`;
    }
    return `Rp ${(val / 1_000_000).toFixed(0)}Jt`;
  };

  // Custom emerald pin HTML icon
  const createCustomIcon = (type: string, isAvailable: boolean) => {
    const bgColor = isAvailable ? "#13423C" : "#AC331C";
    const label = type.substring(0, 3).toUpperCase();

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div style="
          background: ${bgColor};
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
          border: 2px solid white;
          cursor: pointer;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 10px;
            font-weight: 800;
            letter-spacing: -0.5px;
          ">${label}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });
  };

  return (
    <div className="w-full h-[540px] rounded-[2rem] overflow-hidden border border-outline-variant/40 shadow-sm relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {validProps.map((prop) => {
          const isAvail = prop.status === "AVAILABLE";
          return (
            <Marker
              key={prop.id}
              position={[prop.latitude!, prop.longitude!]}
              icon={createCustomIcon(prop.type, isAvail)}
              eventHandlers={{
                click: () => onSelect && onSelect(prop),
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="w-64 p-1 text-on-surface">
                  {prop.imageUrl && (
                    <div className="h-28 w-full rounded-xl overflow-hidden mb-2 relative bg-surface-container">
                      <img
                        src={prop.imageUrl}
                        alt={prop.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 text-primary shadow-sm">
                        {prop.type}
                      </span>
                    </div>
                  )}

                  <h4 className="font-bold text-sm text-on-surface leading-snug line-clamp-1">
                    {prop.name}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" /> {prop.city}
                  </p>

                  <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-outline-variant/30">
                    <div>
                      <span className="text-[9px] font-bold text-on-surface-variant uppercase block">
                        Market Value
                      </span>
                      <strong className="text-primary font-black text-sm">
                        {formatRp(prop.marketValue)}
                      </strong>
                    </div>
                    {prop.rentalYield && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Yield {prop.rentalYield}%
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/feasibility?name=${encodeURIComponent(prop.name)}&city=${encodeURIComponent(prop.city)}`}
                    className="mt-2.5 w-full bg-primary hover:bg-primary-container text-white py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Analisis Feasibility</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-outline-variant/40 text-[11px] flex items-center gap-3">
        <span className="font-bold text-on-surface flex items-center gap-1">
          <Tag className="w-3 h-3 text-primary" /> Pin:
        </span>
        <span className="flex items-center gap-1 text-on-surface-variant font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#13423C]"></span> Available
        </span>
        <span className="flex items-center gap-1 text-on-surface-variant font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#AC331C]"></span> Rented / Sold
        </span>
      </div>
    </div>
  );
}
