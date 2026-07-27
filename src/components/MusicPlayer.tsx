import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { FEATURED_MUSIC } from '../data/content';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-4 z-40 pink-glass p-3 pr-5 rounded-full border border-pink-300/40 shadow-2xl flex items-center gap-3 backdrop-blur-xl max-w-xs md:max-w-sm"
    >
      {/* Vinyl Disc Container */}
      <div className="relative w-11 h-11 shrink-0">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full bg-gradient-to-tr from-gray-900 via-rose-950 to-pink-900 border-2 border-pink-400/60 flex items-center justify-center shadow-md relative overflow-hidden"
        >
          {/* Vinyl Grooves */}
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-pink-500 border border-white/40 flex items-center justify-center text-[8px] text-white">
              S
            </div>
          </div>
        </motion.div>

        {/* Heart Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-600 flex items-center justify-center text-white text-[8px]">
          <Heart className="w-2.5 h-2.5 fill-white" />
        </div>
      </div>

      {/* Song Details */}
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold text-white truncate font-heading">{FEATURED_MUSIC.title}</h5>
        <p className="text-[10px] text-pink-200/80 truncate font-mono">{FEATURED_MUSIC.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 text-pink-200 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center shadow-md border border-white/40"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </motion.button>
      </div>
    </motion.div>
  );
};
