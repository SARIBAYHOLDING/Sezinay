import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Heart, Sparkles } from 'lucide-react';

interface RoseLoadingScreenProps {
  onComplete: () => void;
}

export const RoseLoadingScreen: React.FC<RoseLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl p-6 text-center"
    >
      {/* Blooming 3D Animated Rose */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 flex items-center justify-center text-white shadow-2xl shadow-pink-600/60 border-4 border-white/80 mb-6 relative"
      >
        <Flower2 className="w-14 h-14" />
        <div className="absolute -inset-2 rounded-full border-2 border-pink-400 opacity-60 animate-ping" />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading mb-2 flex items-center justify-center gap-2">
        Pembe Gül Bahçemiz Hazırlanıyor <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" />
      </h2>

      <p className="text-pink-200 text-sm md:text-base mb-8 font-light flex items-center justify-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-300" /> SELO & Sezinay Özel Dünyasına Giriş Yapılıyor...
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md bg-pink-950/80 p-1.5 rounded-full border border-pink-400/40 shadow-inner mb-3">
        <motion.div
          className="h-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 shadow-md"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs font-mono text-pink-300 font-bold tracking-widest">
        %{progress} YÜKLENDİ 🌹
      </span>
    </motion.div>
  );
};
