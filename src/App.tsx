import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { Heart, Flower2, Star, Camera } from 'lucide-react';
import { ThreeBackground } from './components/3d/ThreeBackground';
import { TiltCard } from './components/3d/TiltCard';
import { PasswordScreen } from './components/PasswordScreen';
import { ScratchCard } from './components/ScratchCard';
import { SpotifyBlendCard } from './components/SpotifyBlendCard';
import { MemoryMap } from './components/MemoryMap';
import { LoveLetter } from './components/LoveLetter';
import { LoveCounter } from './components/LoveCounter';
import { MusicPlayer } from './components/MusicPlayer';
import { SecretNotes } from './components/SecretNotes';
import { AnimeStaggerHeader } from './components/anime/AnimeStaggerHeader';
import {
  PASSCODE,
  BOYFRIEND_NAME,
  GIRLFRIEND_NAME,
  INITIAL_PHOTOS,
  MEMORY_LOCATIONS,
  LOVE_LETTER,
} from './data/content';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        animate('.anime-stagger-card', {
          translateY: [60, 0],
          opacity: [0, 1],
          scale: [0.92, 1],
          delay: stagger(120, { start: 200 }),
          easing: 'easeOutElastic(1, 0.6)',
        });
      }, 100);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-pink-500 selection:text-white flex flex-col items-center">
      {/* 1. 3D Animated Silk Curtain & Falling Mixed Rose Petals Canvas Background */}
      <ThreeBackground />

      {/* 2. Lock Screen (170726 Passcode Gate) */}
      {!isAuthenticated ? (
        <PasswordScreen
          correctCode={PASSCODE}
          onSuccess={() => setIsAuthenticated(true)}
        />
      ) : (
        /* 3. Main Dashboard / Perfectly Symmetric & Centered Layout */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center text-center"
        >
          {/* Top Floating Music Player */}
          <MusicPlayer />

          {/* Hero Banner Section */}
          <header className="text-center my-6 md:my-10 relative flex flex-col items-center justify-center w-full">
            {/* Centered Symmetrical Badges */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 leopard-star rounded-full flex items-center justify-center text-amber-200 border border-white shadow-lg shrink-0"
              >
                <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              </motion.div>

              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full luxe-glass border-2 border-white/60 text-white text-xs md:text-sm font-semibold tracking-widest uppercase shadow-xl animate-pulse-glow">
                <Flower2 className="w-4 h-4 text-pink-400" /> {BOYFRIEND_NAME} & {GIRLFRIEND_NAME} 🌸
              </span>

              <motion.div
                animate={{ rotate: [0, -8, 8, 0], y: [0, 4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 leopard-star rounded-full flex items-center justify-center text-rose-300 border border-white shadow-lg shrink-0"
              >
                <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
              </motion.div>
            </div>

            {/* Anime.js Powered Staggered Typography Header */}
            <div className="my-2 text-center w-full flex flex-col items-center">
              <AnimeStaggerHeader
                text="Sonsuz Gül Bahçemiz"
                className="text-4xl md:text-6xl font-extrabold text-white font-heading tracking-tight drop-shadow-xl leading-tight block text-center"
              />
              <div className="mt-2 text-center">
                <AnimeStaggerHeader
                  text="Sezinay'ım ❤️"
                  className="font-handwriting text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 block drop-shadow-xl text-center"
                />
              </div>
            </div>

            <p className="mt-4 text-pink-100 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed drop-shadow text-center">
              17 Temmuz 2026'da başlayan hikayemize özel hazırladığım 3D interaktif pembe dünyamıza hoş geldin prensesim.
            </p>
          </header>

          {/* Live Love Counter */}
          <div className="anime-stagger-card w-full max-w-xl mx-auto flex justify-center my-4">
            <TiltCard className="w-full">
              <LoveCounter />
            </TiltCard>
          </div>

          {/* Section 1: "Scratch Me" Polaroid Photos Gallery */}
          <section className="w-full my-10 text-center flex flex-col items-center">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" /> İnteraktif Anılarımız
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading drop-shadow-lg">
                Kazı & Keşfet Polaroid Kartları ✨
              </h2>
              <p className="text-xs md:text-sm text-pink-100/90 mt-1">
                Kartların üzerini fareyle veya parmağınla kazıyarak altındaki sürpriz fotoğraflarımızı aç! 🤫
              </p>
            </div>

            {/* Grid of Scratch Polaroid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center justify-center w-full max-w-5xl mx-auto">
              {INITIAL_PHOTOS.map((photo) => (
                <div key={photo.id} className="anime-stagger-card w-full flex justify-center">
                  <TiltCard className="w-full flex justify-center">
                    <ScratchCard photo={photo} />
                  </TiltCard>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: 3D Flip Secret Love Notes */}
          <div className="anime-stagger-card w-full text-center flex justify-center my-6">
            <SecretNotes />
          </div>

          {/* Section 3: Memory Map & Spotify Blend Card (Perfect 2-Column Equal Heights) */}
          <section className="w-full my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-center max-w-5xl mx-auto">
            {/* Left: Memory Map */}
            <div className="anime-stagger-card w-full flex justify-center h-full">
              <TiltCard className="w-full h-full flex">
                <MemoryMap locations={MEMORY_LOCATIONS} />
              </TiltCard>
            </div>

            {/* Right: Spotify Blend Playlist Card */}
            <div className="anime-stagger-card w-full flex justify-center h-full">
              <TiltCard className="w-full h-full flex">
                <SpotifyBlendCard />
              </TiltCard>
            </div>
          </section>

          {/* Section 4: Wax-Sealed Romantic Love Letter */}
          <section className="w-full my-10 text-center flex justify-center">
            <div className="anime-stagger-card w-full max-w-2xl mx-auto">
              <TiltCard className="w-full">
                <LoveLetter letter={LOVE_LETTER} />
              </TiltCard>
            </div>
          </section>

          {/* Footer Note */}
          <footer className="mt-16 text-center text-xs text-white/80 pb-12 font-mono flex flex-col items-center justify-center">
            <p className="flex items-center justify-center gap-1.5 text-sm font-semibold">
              Sonsuz Sevgilerle <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> SELO Tarafından Sezinay İçin Tasarlandı
            </p>
            <p className="mt-1 text-xs text-pink-200/60">17.07.2026 • Tüm Hakları Aşkımıza Aittir 🌹</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
