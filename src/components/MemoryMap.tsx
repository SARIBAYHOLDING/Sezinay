import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Coffee, Plus, Minus, Navigation, X, ExternalLink } from 'lucide-react';
import type { MemoryLocation } from '../types';

interface MemoryMapProps {
  locations: MemoryLocation[];
}

export const MemoryMap: React.FC<MemoryMapProps> = ({ locations }) => {
  const [selectedLoc, setSelectedLoc] = useState<MemoryLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flower2': return <Flower2 className="w-4 h-4 text-pink-300" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-300" />;
      default: return <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />;
    }
  };

  return (
    <div className="pink-glass-card p-5 md:p-6 w-full max-w-lg rounded-3xl border border-pink-300/40 shadow-2xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-300/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-600/40 border border-pink-400/50 flex items-center justify-center text-pink-200">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">Anı Haritamız (Memory Map)</h3>
            <p className="text-xs text-pink-200/70">Aşkımızın İz Bıraktığı Özel Noktalar</p>
          </div>
        </div>

        {/* Zoom Controls (+ -) */}
        <div className="flex items-center gap-1.5 pink-glass px-2 py-1 rounded-full border border-white/20 text-white text-xs">
          <button
            onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 1.4))}
            className="hover:text-pink-300 transition-colors p-1"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-pink-200">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
            className="hover:text-pink-300 transition-colors p-1"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Satellite / Romantic Stylized Map View Container */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-pink-300/30 bg-rose-950/80 shadow-inner">
        {/* Animated Grid Lines */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 77, 141, 0.25) 0%, transparent 60%),
              linear-gradient(rgba(255, 182, 193, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 182, 193, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
          }}
        >
          {/* Decorative Path Line connecting pins */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
            <path
              d="M 120 115 Q 220 70 330 85 T 250 180"
              fill="none"
              stroke="#ff4d8d"
              strokeWidth="3"
              strokeDasharray="6,6"
            />
          </svg>

          {/* Location Pins */}
          {locations.map((loc) => (
            <motion.button
              key={loc.id}
              whileHover={{ scale: 1.3, zIndex: 30 }}
              onClick={() => setSelectedLoc(loc)}
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 border-2 border-white text-white shadow-lg shadow-pink-600/60 flex items-center justify-center cursor-pointer group"
            >
              <div className="relative">
                {getIcon(loc.icon)}
                {/* Pulse Ring */}
                <div className="absolute -inset-1 rounded-full bg-pink-400 opacity-70 animate-ping pointer-events-none" />
              </div>

              {/* Hover Tooltip Preview */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2.5 py-1 rounded-lg bg-pink-950/95 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-pink-400/50 shadow-md">
                {loc.title}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-2xl bg-pink-950/95 border border-pink-400/50 backdrop-blur-md relative shadow-xl"
          >
            <button
              onClick={() => setSelectedLoc(null)}
              className="absolute top-3 right-3 text-pink-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              {selectedLoc.photoUrl ? (
                <img
                  src={selectedLoc.photoUrl}
                  alt={selectedLoc.title}
                  className="w-16 h-16 rounded-xl object-cover border border-pink-300/40 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-pink-600/40 border border-pink-300/40 flex items-center justify-center text-pink-300 shrink-0">
                  {getIcon(selectedLoc.icon)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  {selectedLoc.title}
                </h4>
                <p className="text-xs text-pink-300 font-medium">{selectedLoc.location} • {selectedLoc.date}</p>
                <p className="text-xs text-pink-100/90 mt-1.5 leading-relaxed">
                  {selectedLoc.description}
                </p>

                {/* Direct Google Maps Link Button */}
                {selectedLoc.mapUrl && (
                  <a
                    href={selectedLoc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-semibold hover:from-pink-500 hover:to-rose-400 transition-all shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Konuma Haritada Git
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
