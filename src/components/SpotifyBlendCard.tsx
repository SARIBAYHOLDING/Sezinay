import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, Heart, Sparkles } from 'lucide-react';

export const SpotifyBlendCard: React.FC = () => {
  const spotifyPlaylistUrl = 'https://open.spotify.com/playlist/37i9dQZF1EJJMgSFQbFwvi?si=e8e1005067f74ed7';
  const embedUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1EJJMgSFQbFwvi?utm_source=generator&theme=0';
  const blendCoverImage = '/photos/spotify_blend.jpg';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="luxe-card p-6 md:p-8 w-full max-w-lg mx-auto rounded-3xl border-2 border-emerald-400/50 shadow-2xl relative overflow-hidden text-center flex flex-col justify-between items-center"
    >
      {/* Glow Backdrop */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/25 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center mb-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> SELO & Sezinay Spotify Blend 🎵
        </div>
        <h3 className="text-xl font-bold text-white font-heading">
          Bizim Aşk Playlistimiz <Heart className="inline w-5 h-5 text-pink-400 fill-pink-400 ml-1" />
        </h3>
      </div>

      {/* Official Spotify Blend Cover Photo + Barcode */}
      <div className="relative w-48 h-56 md:w-52 md:h-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-300/60 my-2 group">
        <img
          src={blendCoverImage}
          alt="SELO & Sezinay Spotify Blend"
          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
          <span className="text-[11px] text-white font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md">
            Spotify Kodunu Tara 🎵
          </span>
        </div>
      </div>

      {/* Live Spotify Embed Player */}
      <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-black/50 my-3">
        <iframe
          title="Spotify Blend Player"
          src={embedUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0 rounded-2xl w-full"
        />
      </div>

      {/* Action Button */}
      <a
        href={spotifyPlaylistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 border border-white/40 hover:from-emerald-400 hover:to-green-400 transition-all transform hover:scale-105"
      >
        <Music className="w-4 h-4" /> Spotify Blend Playlist'ini Aç <ExternalLink className="w-4 h-4 ml-0.5" />
      </a>
    </motion.div>
  );
};
