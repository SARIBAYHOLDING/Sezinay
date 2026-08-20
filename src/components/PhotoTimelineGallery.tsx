import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PolaroidPhoto } from '../types';

interface PhotoTimelineGalleryProps {
  photos: PolaroidPhoto[];
}

export const PhotoTimelineGallery: React.FC<PhotoTimelineGalleryProps> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tüm Anılarımız 🌸' },
    { id: 'date', label: 'Buluşmalar & Geziler 🛍️' },
    { id: 'study', label: 'Ders & FaceTime 🎧' },
    { id: 'sweet', label: 'Tatlı Pozlarımız 💋' },
  ];

  const filteredPhotos = photos.filter((photo) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'date') return photo.caption.includes('AVM') || photo.caption.includes('Kahve') || photo.caption.includes('Sahil') || photo.caption.includes('Kitabevi');
    if (activeCategory === 'study') return photo.caption.includes('Ders') || photo.caption.includes('FaceTime');
    if (activeCategory === 'sweet') return photo.caption.includes('Gülüşün') || photo.caption.includes('Öpücük') || photo.caption.includes('Komik') || photo.caption.includes('Polaroid');
    return true;
  });

  const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : (prev as number) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <section className="w-full my-12 text-center flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2 px-4 py-1.5 rounded-full bg-pink-950/70 border border-pink-400/40 shadow-lg">
          <Camera className="w-4 h-4 text-pink-400" /> Aşk Hikayemizin Fotoğraf Galerisi
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading drop-shadow-lg mt-1">
          Anılarımız & Fotoğraflarımız ✨
        </h2>
        <p className="text-xs md:text-sm text-pink-100/90 mt-2 max-w-md mx-auto font-light leading-relaxed">
          Sevgilimle geçirdiğim en tatlı, en güzel anlar... Büyütmek ve slayt olarak gezmek için fotoğrafların üzerine tıklayabilirsin! 💖
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 px-2 z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-md border ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-amber-300 scale-105 shadow-pink-600/50'
                : 'luxe-glass text-pink-200 border-white/30 hover:border-white/60 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3D Scroll Driven Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 place-items-center justify-center w-full max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.04, y: -6 }}
              onClick={() => setSelectedIndex(idx)}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                  <span className="text-[11px] text-white font-mono font-semibold px-3 py-1 rounded-full bg-pink-900/90 backdrop-blur-md border border-white/40 flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" /> Büyüt & İncele
                  </span>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl text-rose-950 font-bold leading-tight">
                  {photo.caption}
                </p>
                {photo.date && (
                  <p className="text-xs text-rose-800/80 font-mono mt-1">{photo.date}</p>
                )}
              </div>

              {/* Wax Seal Stamp Accent */}
              <div className="absolute -bottom-3 right-4 w-10 h-10 rounded-full wax-seal-btn border-2 border-amber-300 flex items-center justify-center shadow-lg text-amber-200 text-xs font-serif font-bold">
                S&S
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Zoom Modal with Previous/Next Navigation */}
      <AnimatePresence>
        {selectedPhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-gradient-to-b from-amber-50 via-amber-100 to-rose-100 p-4 md:p-6 rounded-3xl border-4 border-amber-300 shadow-2xl text-center flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-rose-950 text-white flex items-center justify-center hover:bg-rose-800 transition-colors shadow-lg border border-amber-300/40"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Previous Arrow Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-pink-950/90 text-white flex items-center justify-center hover:bg-pink-800 transition-transform hover:scale-110 shadow-2xl border-2 border-amber-300"
              >
                <ChevronLeft className="w-7 h-7 text-amber-300" />
              </button>

              {/* Next Arrow Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-pink-950/90 text-white flex items-center justify-center hover:bg-pink-800 transition-transform hover:scale-110 shadow-2xl border-2 border-amber-300"
              >
                <ChevronRight className="w-7 h-7 text-amber-300" />
              </button>

              {/* Main Expanded Image */}
              <div className="relative w-full overflow-hidden rounded-2xl border-2 border-amber-300 shadow-inner bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full max-h-[70vh] object-contain select-none"
                />
              </div>

              {/* Caption & Counter */}
              <div className="mt-4 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-rose-950 text-amber-300 text-xs font-mono font-bold">
                    {selectedIndex + 1} / {filteredPhotos.length}
                  </span>
                  <span className="text-xs text-rose-800 font-mono font-semibold">
                    {selectedPhoto.date}
                  </span>
                </div>
                <h3 className="font-handwriting text-3xl md:text-4xl font-extrabold text-rose-950 mt-1">
                  {selectedPhoto.caption}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
