import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full flex flex-col items-center text-center p-8 md:p-14 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-2xl shadow-[0_0_90px_rgba(255,255,255,0.08)]"
      >
        {/* Floating Heart Icon with Glow */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 p-5 rounded-full bg-white/5 border border-white/20 text-white shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          <Heart className="w-12 h-12 text-white fill-white/20 animate-pulse" />
        </motion.div>

        {/* Maintenance Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 text-xs md:text-sm tracking-widest uppercase text-white/80 font-mono mb-6"
        >
          <Sparkles className="w-4 h-4 text-white/90 animate-spin-slow" /> GEÇİCİ BAKIM MODU
        </motion.div>

        {/* Primary Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-heading drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] mb-4 leading-tight"
        >
          Geçici Bakımdayız
        </motion.h1>

        {/* Heartfelt Subtitle in Handwriting Font */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-handwriting text-4xl md:text-6xl text-white/95 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] my-3 leading-relaxed"
        >
          Ömrüm barışana kadar...
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-6"
        />

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs md:text-sm text-white/50 font-mono tracking-widest uppercase"
        >
          Selo & Sezinay ❤️
        </motion.p>
      </motion.div>
    </div>
  );
}
