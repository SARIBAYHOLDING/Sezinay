import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { RELATIONSHIP_START_DATE } from '../data/content';

export const LoveCounter: React.FC = () => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date(RELATIONSHIP_START_DATE).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - startDate);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pink-glass-card p-6 md:p-8 w-full max-w-xl mx-auto rounded-3xl border border-pink-300/40 shadow-2xl text-center relative overflow-hidden my-8">
      {/* Decorative Shimmer Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pink-glass border border-pink-300/40 text-pink-200 text-xs font-semibold uppercase tracking-wider mb-4">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          Aşkımızın Canlı Sayacı
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading mb-6 flex items-center justify-center gap-2">
          Bizim Hikayemiz Başlayalı <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
        </h3>

        {/* 4 Cards Grid (Days, Hours, Mins, Secs) */}
        <div className="grid grid-cols-4 gap-2.5 md:gap-4">
          {[
            { label: 'Gün', value: timeTogether.days },
            { label: 'Saat', value: timeTogether.hours },
            { label: 'Dakika', value: timeTogether.minutes },
            { label: 'Saniye', value: timeTogether.seconds },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="pink-glass p-3 md:p-4 rounded-2xl border border-pink-400/30 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <span className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-rose-400 font-mono tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] md:text-xs font-medium text-pink-300 mt-1 uppercase tracking-wider">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-pink-200/70 font-mono mt-6 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          17 Temmuz 2026'dan Beri Kalbim Sadece Senine Çarpıyor 🌸
        </p>
      </div>
    </div>
  );
};
