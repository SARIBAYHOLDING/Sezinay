import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic, Sparkles } from 'lucide-react';
import type { VoiceNote } from '../types';

interface VoiceNoteCardProps {
  note: VoiceNote;
}

export const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({ note }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="pink-glass-card p-5 md:p-6 w-full max-w-sm rounded-3xl border border-pink-300/40 shadow-xl relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-600/30 border border-pink-400/40 flex items-center justify-center text-pink-300">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">{note.title}</h4>
            <span className="text-[11px] text-pink-200/70">{note.sender} • {note.date}</span>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300">
          {note.duration}
        </span>
      </div>

      {/* Waveform Player Bar */}
      <div className="pink-glass rounded-2xl p-3 flex items-center gap-3 border border-pink-400/20">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-600/30 border border-white/50 shrink-0"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </motion.button>

        {/* Animated Sound Waves */}
        <div className="flex-1 flex items-center gap-1 h-8 px-1 overflow-hidden">
          {[40, 70, 30, 90, 50, 80, 100, 45, 65, 85, 30, 95, 60, 40, 75, 90, 50, 30].map((height, i) => (
            <motion.div
              key={i}
              animate={{
                height: isPlaying ? [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] : '30%',
              }}
              transition={{
                duration: 0.5 + (i % 5) * 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className={`w-1 rounded-full ${
                isPlaying ? 'bg-gradient-to-t from-pink-500 to-amber-300' : 'bg-pink-300/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Transcript Toggle Button */}
      {note.transcript && (
        <div className="mt-3 text-right">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-xs text-pink-300 hover:text-white underline font-medium transition-colors inline-flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            {showTranscript ? 'Yazıyı Gizle' : 'Ses Metnini Oku'}
          </button>
        </div>
      )}

      {/* Transcript Text Drawer */}
      {showTranscript && note.transcript && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3 rounded-xl bg-pink-950/60 border border-pink-500/30 text-xs text-pink-100 font-handwriting text-lg leading-relaxed italic"
        >
          "{note.transcript}"
        </motion.div>
      )}
    </motion.div>
  );
};
