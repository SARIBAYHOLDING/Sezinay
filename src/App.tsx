import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2, Star, Camera } from 'lucide-react';
import { ThreeBackground } from './components/3d/ThreeBackground';
import { PasswordScreen } from './components/PasswordScreen';
import { ScratchCard } from './components/ScratchCard';
import { VoiceNoteCard } from './components/VoiceNoteCard';
import { MemoryMap } from './components/MemoryMap';
import { LoveLetter } from './components/LoveLetter';
import { LoveCounter } from './components/LoveCounter';
import { MusicPlayer } from './components/MusicPlayer';
import {
  PASSCODE,
  BOYFRIEND_NAME,
  GIRLFRIEND_NAME,
  INITIAL_PHOTOS,
  MEMORY_LOCATIONS,
  VOICE_NOTES,
  LOVE_LETTER,
} from './data/content';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* 1. 3D Floating Rose & Heart Particles Background */}
      <ThreeBackground />

      {/* 2. Lock Screen (170726 Passcode Gate) */}
      {!isAuthenticated ? (
        <PasswordScreen
          correctCode={PASSCODE}
          onSuccess={() => setIsAuthenticated(true)}
        />
      ) : (
        /* 3. Main Dashboard / Romantic Experience */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
        >
          {/* Top Floating Music Player */}
          <MusicPlayer />

          {/* Hero Banner Section */}
          <header className="text-center my-6 md:my-10 relative">
            {/* Leopard Print Star Cutout Badges */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 md:-top-10 md:-left-12 w-16 h-16 md:w-20 md:h-20 leopard-star rounded-full flex items-center justify-center text-amber-200 border-2 border-white shadow-xl pointer-events-none"
            >
              <Star className="w-8 h-8 fill-amber-300 text-amber-300" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-10 w-14 h-14 md:w-16 md:h-16 leopard-star rounded-full flex items-center justify-center text-rose-300 border-2 border-white shadow-xl pointer-events-none"
            >
              <Heart className="w-7 h-7 fill-pink-400 text-pink-400" />
            </motion.div>

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full pink-glass border border-pink-300/40 text-pink-200 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 shadow-lg">
              <Flower2 className="w-4 h-4 text-pink-400" /> {BOYFRIEND_NAME} & {GIRLFRIEND_NAME} 🌸
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white font-heading tracking-tight drop-shadow-md leading-tight">
              Sonsuz Gül Bahçemiz <br />
              <span className="font-handwriting text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">
                Sezinay'ım ❤️
              </span>
            </h1>

            <p className="mt-4 text-pink-100/90 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
              17 Temmuz 2026'da başlayan hikayemize özel hazırladığım interaktif aşk dünyamıza hoş geldin prensesim.
            </p>
          </header>

          {/* Live Love Counter */}
          <LoveCounter />

          {/* Section 1: "Scratch Me" Polaroid Photos Gallery */}
          <section className="w-full my-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" /> İnteraktif Anılarımız
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
                Kazı & Keşfet Polaroid Kartları ✨
              </h2>
              <p className="text-xs md:text-sm text-pink-200/80 mt-1">
                Kartların üzerini fareyle veya parmağınla kazıyarak altındaki sürpriz fotoğraflarımızı aç! 🤫
              </p>
            </div>

            {/* Grid of Scratch Polaroid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
              {INITIAL_PHOTOS.map((photo) => (
                <ScratchCard key={photo.id} photo={photo} />
              ))}
            </div>
          </section>

          {/* Section 2: Cat Pair Illustration & Voice Note & Memory Map */}
          <section className="w-full my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Memory Map */}
            <MemoryMap locations={MEMORY_LOCATIONS} />

            {/* Right: Black & White Cats Illustration & Voice Note */}
            <div className="flex flex-col gap-6 items-center lg:items-start w-full">
              {/* Cute Cat Couple Card Inspired by Reference Image 2 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="pink-glass-card p-6 w-full rounded-3xl border border-pink-300/40 text-center relative overflow-hidden flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-900 to-rose-950 flex items-center justify-center border-2 border-pink-300/50 shadow-inner mb-3 text-4xl">
                  🐱🐾🐶
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  Bizim Tatlı Ruh İkimiz (SELO & Sezinay)
                </h4>
                <p className="text-xs text-pink-200/80 mt-1">
                  Siyah kedi & Beyaz kedi gibi birbirini tamamlayan en güzel çift! ❤️
                </p>
              </motion.div>

              {/* Voice Note Card */}
              {VOICE_NOTES.length > 0 && <VoiceNoteCard note={VOICE_NOTES[0]} />}
            </div>
          </section>

          {/* Section 3: Wax-Sealed Romantic Love Letter */}
          <section className="w-full my-10">
            <LoveLetter letter={LOVE_LETTER} />
          </section>

          {/* Footer Note */}
          <footer className="mt-16 text-center text-xs text-pink-200/60 pb-12 font-mono">
            <p className="flex items-center justify-center gap-1">
              Sonsuz Sevgilerle <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> SELO Tarafından Sezinay İçin Tasarlandı
            </p>
            <p className="mt-1 text-[11px] text-pink-300/40">17.07.2026 • Tüm Hakları Aşkımıza Aittir 🌹</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
