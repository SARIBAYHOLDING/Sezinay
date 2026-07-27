import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialMasterpieceLoaderProps {
  onComplete: () => void;
}

export const InitialMasterpieceLoader: React.FC<InitialMasterpieceLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);

  useEffect(() => {
    // 10.5-second total duration (10,500ms)
    const duration = 10500;
    const intervalTime = 50;
    const increment = (100 * intervalTime) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }

        // Advance stages based on progress percentage
        if (next >= 75 && stage < 4) setStage(4);
        else if (next >= 50 && stage < 3) setStage(3);
        else if (next >= 25 && stage < 2) setStage(2);

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, stage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-950 via-black to-pink-950 p-6 text-center overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-pink-600/30 to-rose-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Content Multi-Stage Container */}
      <div className="relative z-10 max-w-lg w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* STAGE 1: Initial Rose & Sparkle Vortex (0% - 25%) */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-pink-400/60 shadow-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-amber-300 shadow-2xl bg-rose-950"
                >
                  <img
                    src="/photos/photo1.jpg"
                    alt="SELO & Sezinay"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-wide mb-2 drop-shadow-lg">
                SELO & Sezinay
              </h2>
              <p className="text-pink-200 text-sm md:text-base font-light tracking-widest uppercase">
                Sonsuz Gül Bahçemiz Yükleniyor...
              </p>
            </motion.div>
          )}

          {/* STAGE 2: Real Coffee Photo & First Meeting Memory (25% - 50%) */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-44 h-44 md:w-52 md:h-52 mb-6 rounded-2xl overflow-hidden border-2 border-amber-200/80 shadow-2xl bg-amber-50 p-2 transform rotate-2">
                <img
                  src="/photos/photo6.jpg"
                  alt="İlk Kahvemiz"
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>

              <h3 className="font-handwriting text-3xl md:text-4xl text-amber-200 font-bold mb-2">
                "Selo & Ada İlk Kahvemiz..."
              </h3>
              <p className="text-pink-100 text-xs md:text-sm font-light">
                Kushimoto Sokağı EspressoLab Anılarımız Hazırlanıyor ✨
              </p>
            </motion.div>
          )}

          {/* STAGE 3: Relationship Start Date 17.07.2026 (50% - 75%) */}
          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full wax-seal-btn border-2 border-amber-300 flex items-center justify-center shadow-2xl text-amber-100 font-serif font-bold text-xl md:text-2xl mb-6">
                17.07.26
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold text-white font-heading mb-2">
                17 Temmuz 2026
              </h3>
              <p className="text-pink-200 text-xs md:text-sm font-light">
                Kalplerimizin İlk Defa Birlikte Atmaya Başladığı Tarih... ❤️
              </p>
            </motion.div>
          )}

          {/* STAGE 4: Final Golden Opening (75% - 100%) */}
          {stage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-600 to-amber-300 flex items-center justify-center shadow-2xl border-4 border-white mb-6 animate-pulse">
                <img
                  src="/photos/photo2.jpg"
                  alt="Aşkımız"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 font-heading mb-2">
                Hoş Geldin Sezinay'ım
              </h3>
              <p className="text-pink-100 text-xs md:text-sm font-light">
                Sana Özel Tasarladığım Gül Bahçesi Açılıyor...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10-Second Progress Bar */}
        <div className="w-full mt-10 px-4">
          <div className="w-full h-2.5 rounded-full bg-black/60 p-0.5 border border-pink-400/40 shadow-inner overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 shadow-md"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-pink-300 font-bold">
            <span>SELO & SEZİNAY</span>
            <span>%{Math.round(progress)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
