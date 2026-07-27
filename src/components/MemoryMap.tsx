import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Coffee, Navigation, X, ExternalLink, MapPin } from 'lucide-react';
import type { MemoryLocation } from '../types';

interface MemoryMapProps {
  locations: MemoryLocation[];
}

export const MemoryMap: React.FC<MemoryMapProps> = ({ locations }) => {
  const [selectedLoc, setSelectedLoc] = useState<MemoryLocation | null>(locations[0] || null);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flower2': return <Flower2 className="w-4 h-4 text-pink-300" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-300" />;
      default: return <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />;
    }
  };

  return (
    <div className="luxe-card p-6 md:p-8 w-full max-w-lg mx-auto rounded-3xl border-2 border-pink-300/50 shadow-2xl relative overflow-hidden flex flex-col justify-between items-center min-h-[500px]">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between mb-3 pb-3 border-b border-pink-300/20 z-10">
        <div className="flex items-center gap-2 text-left">
          <div className="w-10 h-10 rounded-full bg-pink-600/40 border border-pink-400/50 flex items-center justify-center text-pink-200 shadow-md">
            <Navigation className="w-5 h-5 text-pink-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Anı Haritamız (Memory Map)</h3>
            <p className="text-xs text-pink-200/80">Aşkımızın İz Bıraktığı Özel Noktalar</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-300 text-xs font-mono">
          📍 {locations.length} Konum
        </span>
      </div>

      {/* Stylized Map View Box */}
      <div className="relative w-full h-56 md:h-60 rounded-2xl overflow-hidden border-2 border-pink-300/50 bg-gradient-to-b from-rose-950 via-purple-950 to-pink-950 shadow-inner my-2 z-10">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 77, 141, 0.3) 0%, transparent 70%),
              linear-gradient(rgba(255, 182, 193, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 182, 193, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 28px 28px, 28px 28px',
          }}
        />

        {/* Curved Path Line connecting pins */}
        <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
          <path
            d="M 110 100 Q 200 50 320 70 T 230 160"
            fill="none"
            stroke="#ff4d8d"
            strokeWidth="3"
            strokeDasharray="6,6"
          />
        </svg>

        {/* Interactive Pins */}
        {locations.map((loc) => {
          const isSelected = selectedLoc?.id === loc.id;
          return (
            <motion.button
              key={loc.id}
              whileHover={{ scale: 1.2, zIndex: 40 }}
              onClick={() => setSelectedLoc(loc)}
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border-2 text-white shadow-xl flex items-center justify-center cursor-pointer transition-all ${
                isSelected
                  ? 'bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-300 border-white scale-110 z-30 shadow-pink-500/80'
                  : 'bg-rose-950/90 border-pink-400/60 z-20 hover:border-white'
              }`}
            >
              <div className="relative">
                {getIcon(loc.icon)}
                {isSelected && (
                  <div className="absolute -inset-2 rounded-full border border-pink-300 opacity-80 animate-ping pointer-events-none" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Location Card Display */}
      <div className="w-full z-10 my-1">
        <AnimatePresence mode="wait">
          {selectedLoc && (
            <motion.div
              key={selectedLoc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-black/60 border border-pink-400/40 backdrop-blur-md relative shadow-xl text-left flex items-start gap-3.5"
            >
              {selectedLoc.photoUrl ? (
                <img
                  src={selectedLoc.photoUrl}
                  alt={selectedLoc.title}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-pink-300/40 shrink-0 shadow-md"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-pink-600/40 border border-pink-300/40 flex items-center justify-center text-pink-300 shrink-0 shadow-md">
                  <MapPin className="w-6 h-6 text-pink-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white truncate font-heading">
                    {selectedLoc.title}
                  </h4>
                  <button onClick={() => setSelectedLoc(null)} className="text-pink-300 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-pink-300 font-medium mt-0.5">{selectedLoc.location} • {selectedLoc.date}</p>
                <p className="text-xs text-pink-100/90 mt-1 leading-relaxed line-clamp-2">
                  {selectedLoc.description}
                </p>

                {selectedLoc.mapUrl && (
                  <a
                    href={selectedLoc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-semibold hover:from-pink-500 hover:to-rose-400 transition-all shadow-md border border-white/30"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Konuma Haritada Git
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
