import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Camera } from 'lucide-react';
import type { PolaroidPhoto } from '../types';

interface PhotoTimelineGalleryProps {
  photos: PolaroidPhoto[];
}

export const PhotoTimelineGallery: React.FC<PhotoTimelineGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <section className="w-full my-12 text-center flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-1 px-4 py-1.5 rounded-full bg-pink-950/70 border border-pink-400/40">
          <Camera className="w-4 h-4 text-pink-400" /> Aşk Hikayemizin Fotoğraf Galerisi
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading drop-shadow-lg mt-2">
          Anılarımız & Fotoğraflarımız ✨
        </h2>
        <p className="text-xs md:text-sm text-pink-100/90 mt-2 max-w-md mx-auto font-light">
          Aşağı kaydırdıkça sırayla açılan en tatlı fotoğraflarımız... Büyütmek için üzerine tıklayabilirsin! 💖
        </p>
      </div>

      {/* 3D Scroll Driven Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 place-items-center justify-center w-full max-w-5xl mx-auto">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.04, y: -6 }}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer relative bg-gradient-to-b from-amber-50 via-amber-100/90 to-rose-50 p-4 pb-7 rounded-2xl shadow-2xl border-2 border-amber-200/80 w-full max-w-[300px] md:max-w-[320px] transition-all duration-300 group"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/80 border border-pink-300/60 backdrop-blur-md transform -rotate-1 z-20 shadow-md rounded-sm flex items-center justify-center">
              <span className="text-[10px] font-mono text-pink-900 tracking-widest uppercase">
                {photo.date || 'Sezinay & SELO'}
              </span>
            </div>

            {/* Leopard Star Badge */}
            <div className="absolute -right-4 -top-4 w-12 h-12 leopard-star rounded-full flex items-center justify-center text-amber-100 z-10 shadow-lg border-2 border-white transform rotate-12">
              <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-pulse" />
            </div>

            {/* Image Container */}
            <div className="relative w-full h-60 md:h-64 bg-rose-950 rounded-xl overflow-hidden border border-amber-300/60 shadow-inner">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                <span className="text-[11px] text-white font-mono font-semibold px-3 py-1 rounded-full bg-pink-900/80 backdrop-blur-md border border-white/30 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> Büyüt
                </span>
              </div>
            </div>

            {/* Polaroid Caption */}
            <div className="mt-4 text-center">
              <p className="font-handwriting text-2xl text-rose-950 font-bold leading-tight">
                {photo.caption}
              </p>
            </div>

            {/* Wax Seal Stamp Accent */}
            <div className="absolute -bottom-3 right-4 w-10 h-10 rounded-full wax-seal-btn border-2 border-amber-300 flex items-center justify-center shadow-lg text-amber-200 text-xs font-serif font-bold">
              S&S
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-amber-50 p-4 md:p-6 rounded-3xl border-2 border-amber-200 shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-rose-950 text-white flex items-center justify-center hover:bg-rose-800"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[70vh] object-contain rounded-2xl border border-amber-300 shadow-lg"
              />

              <div className="mt-4">
                <h3 className="font-handwriting text-3xl font-bold text-rose-950">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-xs text-rose-800 font-mono mt-1">{selectedPhoto.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
