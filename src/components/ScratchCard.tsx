import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle2 } from 'lucide-react';
import type { PolaroidPhoto } from '../types';

interface ScratchCardProps {
  photo: PolaroidPhoto;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ photo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to parent element size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 300;
    canvas.height = rect.height || 260;

    // Draw luxury rose-gold silver foil pattern on canvas
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e8b4b8');
    gradient.addColorStop(0.5, '#ffd1dc');
    gradient.addColorStop(1, '#c58b95');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise & metallic shimmer texture
    for (let i = 0; i < 800; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.25})`;
      ctx.fillRect(rx, ry, 2, 2);
    }

    // Write "Scratch me" text on foil
    ctx.font = 'italic bold 22px "Dancing Script", cursive';
    ctx.fillStyle = '#6b1124';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(photo.scratchText || 'Scratch me 🌹', canvas.width / 2, canvas.height / 2);
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
    ctx.arc(x, y, 24, 0, Math.PI * 2);
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

    // Sample every 4th pixel for performance
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++;
    }

    const totalSampled = pixels.length / 16;
    const percentage = (transparentCount / totalSampled) * 100;

    if (percentage > 45) {
      setIsRevealed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0 }}
      style={{ rotate: `${photo.rotation}deg` }}
      className="relative bg-amber-50/95 p-3.5 pb-6 rounded-lg shadow-2xl border border-amber-200/60 w-full max-w-[280px] md:max-w-[300px] transition-all duration-300 group"
    >
      {/* Decorative Washi Tape on Top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/70 border border-pink-300/40 backdrop-blur-sm transform -rotate-1 z-20 shadow-sm rounded-sm" />

      {/* Leopard Star Badge Behind / Beside Polaroid */}
      <div className="absolute -right-4 -top-4 w-12 h-12 leopard-star rounded-full flex items-center justify-center text-amber-100 z-10 shadow-md border-2 border-white transform rotate-12">
        <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
      </div>

      {/* Photo Container */}
      <div className="relative w-full h-56 md:h-64 bg-rose-950 rounded overflow-hidden border border-amber-200/50 shadow-inner">
        {/* Real Photo Underneath */}
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover select-none"
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

        {/* Revealed Sparkle Effect Badge */}
        {isRevealed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2 right-2 bg-pink-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md border border-pink-300/40 shadow-lg"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" /> Açıldı!
          </motion.div>
        )}
      </div>

      {/* Polaroid Handwritten Caption */}
      <div className="mt-4 text-center">
        <p className="font-handwriting text-2xl text-rose-950 font-bold leading-tight">
          {photo.caption}
        </p>
        {photo.date && (
          <span className="text-xs text-rose-800/70 font-sans tracking-wide block mt-1">
            {photo.date}
          </span>
        )}
      </div>

      {/* Bottom Wax Seal Stamp Accent */}
      <div className="absolute -bottom-3 right-4 w-9 h-9 rounded-full bg-rose-700 border-2 border-rose-400 flex items-center justify-center shadow-md text-amber-200 text-xs font-serif font-bold">
        S&S
      </div>
    </motion.div>
  );
};
