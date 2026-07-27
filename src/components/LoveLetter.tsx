import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Mail, MailOpen } from 'lucide-react';
import type { LoveLetterData } from '../types';

interface LoveLetterProps {
  letter: LoveLetterData;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ letter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Closed Wax Sealed Envelope */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer pink-glass-card p-8 rounded-3xl text-center border-2 border-pink-300/40 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-3 right-3 text-pink-300/60">
              <Mail className="w-6 h-6" />
            </div>

            <div className="flex flex-col items-center">
              {/* Wax Seal Stamp */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-800 via-rose-700 to-pink-900 border-4 border-amber-300/80 flex flex-col items-center justify-center text-amber-200 shadow-xl shadow-rose-900/60 mb-4 relative"
              >
                <Heart className="w-6 h-6 fill-amber-300 text-amber-300" />
                <span className="text-[10px] font-serif font-bold tracking-widest mt-0.5">S & S</span>
              </motion.div>

              <h3 className="text-2xl font-bold text-white font-heading mb-1">
                {letter.title}
              </h3>
              <p className="text-xs text-pink-200/80 font-mono tracking-wide">
                Mührü kırmak ve mektubu okumak için tıkla 🌸
              </p>
            </div>
          </motion.div>
        ) : (
          /* Opened Parchment Letter */
          <motion.div
            key="letter-content"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-b from-amber-50 via-rose-50 to-amber-100/90 text-rose-950 p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-amber-200 relative overflow-hidden"
          >
            {/* Top Close / Envelope Icon Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-rose-800 hover:text-rose-950 text-xs font-semibold flex items-center gap-1 bg-amber-200/60 px-3 py-1.5 rounded-full border border-amber-300"
            >
              <MailOpen className="w-4 h-4" /> Kapat
            </button>

            {/* Floral Corner Accent */}
            <div className="absolute top-0 left-0 w-20 h-20 opacity-15 pointer-events-none">
              <Flower2 className="w-full h-full text-rose-900" />
            </div>

            {/* Letter Header */}
            <div className="border-b border-rose-300/60 pb-4 mb-6 text-center">
              <span className="text-xs font-mono tracking-widest text-rose-800/80 uppercase">
                Özel Aşk Mektubu
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-handwriting text-rose-900 mt-1">
                {letter.title}
              </h2>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-4 font-handwriting text-xl md:text-2xl leading-relaxed text-rose-950">
              {letter.paragraphs.map((para, index) => (
                <p key={index} className="indent-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Signature Block */}
            <div className="mt-8 pt-6 border-t border-rose-300/60 flex flex-col items-end">
              <span className="font-handwriting text-3xl font-bold text-rose-900">
                Sonsuz Sevgimle, {letter.sender} ❤️
              </span>
              <span className="text-xs text-rose-800/70 font-mono mt-1">
                {letter.signatureDate}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
