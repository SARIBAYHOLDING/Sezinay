import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Coffee, Plus, Minus, Navigation, X } from 'lucide-react';
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
              radial-gradient(circle at 50% 50%, rgba(255, 77, 141, 0.2) 0%, transparent 60%),
              linear-gradient(rgba(255, 182, 193, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 182, 193, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
          }}
        >
          {/* Decorative Rivers & Parks Paths */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
            <path
              d="M 10 120 Q 150 40 300 180 T 500 100"
              fill="none"
              stroke="#ff80ab"
              strokeWidth="4"
              strokeDasharray="6,6"
            />
          </svg>

          {/* Location Pins */}
          {locations.map((loc) => (
            <motion.button
              key={loc.id}
              whileHover={{ scale: 1.25, zIndex: 30 }}
              onClick={() => setSelectedLoc(loc)}
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 border-2 border-white text-white shadow-lg shadow-pink-600/50 flex items-center justify-center cursor-pointer group"
            >
              <div className="relative">
                {getIcon(loc.icon)}
                {/* Pulse Ring */}
                <div className="absolute -inset-1 rounded-full bg-pink-400 opacity-60 animate-ping pointer-events-none" />
              </div>

              {/* Hover Tooltip Preview */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2.5 py-1 rounded-lg bg-pink-950/90 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-pink-400/40">
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
            className="mt-4 p-4 rounded-2xl bg-pink-950/90 border border-pink-400/40 backdrop-blur-md relative"
          >
            <button
              onClick={() => setSelectedLoc(null)}
              className="absolute top-3 right-3 text-pink-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/40 border border-pink-300/40 flex items-center justify-center text-pink-300 shrink-0 mt-0.5">
                {getIcon(selectedLoc.icon)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {selectedLoc.title}
                </h4>
                <p className="text-xs text-pink-300 font-medium">{selectedLoc.location} • {selectedLoc.date}</p>
                <p className="text-xs text-pink-100/90 mt-2 leading-relaxed">
                  {selectedLoc.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
