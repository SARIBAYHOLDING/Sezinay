import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink, Heart, Sparkles, Volume2, Disc, Music2 } from 'lucide-react';

export const SpotifyBlendCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyPlaylistUrl = 'https://open.spotify.com/playlist/37i9dQZF1EJJMgSFQbFwvi?si=e8e1005067f74ed7';
  const blendCoverImage = '/photos/spotify_blend.jpg';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="luxe-card p-6 md:p-8 w-full max-w-lg mx-auto rounded-3xl border-2 border-emerald-400/50 shadow-2xl relative overflow-hidden text-center flex flex-col justify-between items-center min-h-[500px]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex flex-col items-center mb-2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-300" /> SELO & Sezinay Spotify Blend 🎵
        </div>
        <h3 className="text-2xl font-bold text-white font-heading tracking-wide flex items-center justify-center gap-1.5">
          Bizim Aşk Playlistimiz <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
        </h3>
        <p className="text-xs text-pink-200/80 mt-1">
          Müzik zevklerimizin ve en güzel anlarımızın buluştuğu listemiz...
        </p>
      </div>

      {/* Centerpiece: Official Spotify Cover Photo + Spinning Vinyl Disc Accent */}
      <div className="relative my-4 flex items-center justify-center z-10">
        {/* Spinning Vinyl Disc behind Cover */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-8 w-44 h-44 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-gray-900 via-black to-gray-800 border-4 border-amber-300/40 shadow-2xl flex items-center justify-center pointer-events-none"
        >
          <div className="w-16 h-16 rounded-full border-4 border-emerald-400/50 bg-rose-950 flex items-center justify-center">
            <Disc className="w-8 h-8 text-emerald-300" />
          </div>
        </motion.div>

        {/* Main Cover Artwork + Barcode */}
        <div className="relative w-48 h-56 md:w-52 md:h-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-300/70 z-10 bg-emerald-950 group">
          <img
            src={blendCoverImage}
            alt="SELO & Sezinay Spotify Blend"
            className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
            <span className="text-[11px] text-white font-mono font-semibold px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-400/40 flex items-center gap-1">
              <Music2 className="w-3.5 h-3.5 text-emerald-400" /> Spotify Barkodunu Tara
            </span>
          </div>
        </div>
      </div>

      {/* Animated Sound Spectrum Equalizer Bars */}
      <div className="flex items-center justify-center gap-1.5 h-8 my-2 z-10">
        {[0.8, 1.2, 0.6, 1.4, 0.9, 1.3, 0.7, 1.1, 0.5, 1.0].map((heightMultiplier, i) => (
          <motion.div
            key={i}
            animate={{
              height: isPlaying
                ? [`${12 * heightMultiplier}px`, `${28 * heightMultiplier}px`, `${10 * heightMultiplier}px`]
                : '12px',
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.08,
            }}
            className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-green-300"
          />
        ))}
      </div>

      {/* Interactive Controls & Track Info */}
      <div className="w-full p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-between z-10 my-2 shadow-xl">
        <div className="flex items-center gap-3 text-left">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/50 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
          </button>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">Blend Playlist 🎵</h4>
            <p className="text-xs text-emerald-300 font-mono">SELO & Sezinay Özel Listesi</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-400">
          <Volume2 className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      {/* Direct Open Button */}
      <a
        href={spotifyPlaylistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/80 border border-white/40 hover:from-emerald-400 hover:to-green-400 transition-all transform hover:scale-[1.02] z-10"
      >
        <Music2 className="w-4.5 h-4.5" /> Spotify'da Aç ve Dinle <ExternalLink className="w-4 h-4 ml-0.5" />
      </a>
    </motion.div>
  );
};
