import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, Maximize2, X } from 'lucide-react';
import type { PolaroidPhoto } from '../types';

interface ScratchCardProps {
  photo: PolaroidPhoto;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ photo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 320;
    canvas.height = rect.height || 280;

    // Draw ultra luxury rose-gold silver metallic foil gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e8b4b8');
    gradient.addColorStop(0.3, '#ffd1dc');
    gradient.addColorStop(0.7, '#f4a261');
    gradient.addColorStop(1, '#c58b95');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise texture & metallic specks
    for (let i = 0; i < 1200; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
      ctx.fillRect(rx, ry, 2, 2);
    }

    // Border inner glow on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Foil Banner Text
    ctx.font = 'italic bold 24px "Dancing Script", cursive';
    ctx.fillStyle = '#6b1124';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 4;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(photo.scratchText || 'Kazı Beni Sezinay 🌹', canvas.width / 2, canvas.height / 2);
  }, [photo]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++;
    }

    const totalSampled = pixels.length / 16;
    const percentage = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
    setScratchPercent(percentage);

    if (percentage > 38 && !isRevealed) {
      setIsRevealed(true);
      setScratchPercent(100);

      // Heart confetti explosion
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4d8d', '#ffd700', '#ffffff', '#ff80ab'],
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching && e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.04, rotate: 0 }}
        style={{ rotate: `${photo.rotation}deg` }}
        className="relative bg-gradient-to-b from-amber-50 via-amber-100/90 to-rose-50 p-4 pb-7 rounded-2xl shadow-2xl border-2 border-amber-200/80 w-full max-w-[300px] md:max-w-[320px] transition-all duration-300 group"
      >
        {/* Decorative Washi Tape on Top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/80 border border-pink-300/60 backdrop-blur-md transform -rotate-1 z-20 shadow-md rounded-sm flex items-center justify-center">
          <span className="text-[10px] font-mono text-pink-900 tracking-widest uppercase">Sezinay & SELO</span>
        </div>

        {/* Leopard Star Badge Beside Polaroid */}
        <div className="absolute -right-4 -top-4 w-12 h-12 leopard-star rounded-full flex items-center justify-center text-amber-100 z-10 shadow-lg border-2 border-white transform rotate-12">
          <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-pulse" />
        </div>

        {/* Photo Container */}
        <div
          onClick={() => isRevealed && setIsZoomed(true)}
          className={`relative w-full h-60 md:h-64 bg-rose-950 rounded-xl overflow-hidden border border-amber-300/60 shadow-inner ${
            isRevealed ? 'cursor-pointer' : ''
          }`}
        >
          {/* Real Photo Underneath */}
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
          />

          {/* Canvas Scratch Overlay */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
            />
          )}

          {/* Revealed Sparkle Effect Badge & Zoom Hint */}
          {isRevealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-2.5 right-2.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md border border-white/40 shadow-xl"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" /> Büyütmek İçin Dokun <Maximize2 className="w-3 h-3 ml-0.5" />
            </motion.div>
          )}
        </div>

        {/* Progress bar under scratch card */}
        {!isRevealed && (
          <div className="mt-3.5 px-1">
            <div className="flex items-center justify-between text-[11px] text-rose-900 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" /> Kazıma Oranı
              </span>
              <span>%{scratchPercent}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-rose-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 transition-all duration-200"
                style={{ width: `${scratchPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Polaroid Handwritten Caption */}
        <div className="mt-3 text-center">
          <p className="font-handwriting text-2xl text-rose-950 font-bold leading-tight">
            {photo.caption}
          </p>
          {photo.date && (
            <span className="text-xs text-rose-800/80 font-sans tracking-wide block mt-1">
              {photo.date}
            </span>
          )}
        </div>

        {/* Wax Seal Stamp Accent */}
        <div className="absolute -bottom-3 right-4 w-10 h-10 rounded-full wax-seal-btn border-2 border-amber-300 flex items-center justify-center shadow-lg text-amber-200 text-xs font-serif font-bold">
          S&S
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Zoom Modal when photo is clicked */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
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
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-rose-950 text-white flex items-center justify-center hover:bg-rose-800"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full max-h-[70vh] object-contain rounded-2xl border border-amber-300 shadow-lg"
              />

              <div className="mt-4">
                <h3 className="font-handwriting text-3xl font-bold text-rose-950">
                  {photo.caption}
                </h3>
                <p className="text-xs text-rose-800 font-mono mt-1">{photo.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
