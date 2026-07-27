import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Heart, KeyRound, Sparkles, Delete, Flower2 } from 'lucide-react';

interface PasswordScreenProps {
  correctCode: string;
  onSuccess: () => void;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ correctCode, onSuccess }) => {
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleKeyPress = (num: string) => {
    if (digits.length < 6 && !isUnlocked) {
      const newDigits = [...digits, num];
      setDigits(newDigits);
      setError(false);

      if (newDigits.length === 6) {
        verifyCode(newDigits.join(''));
      }
    }
  };

  const handleDelete = () => {
    if (digits.length > 0 && !isUnlocked) {
      setDigits(digits.slice(0, -1));
      setError(false);
    }
  };

  const verifyCode = (enteredCode: string) => {
    if (enteredCode === correctCode) {
      setIsUnlocked(true);
      
      // Trigger romantic pink & gold confetti explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4d8d', '#ff80ab', '#ffd700', '#c2185b', '#ffffff'],
        shapes: ['circle', 'square'],
      });

      setTimeout(() => {
        onSuccess();
      }, 1400);
    } else {
      setError(true);
      // Shake effect & reset after 800ms
      setTimeout(() => {
        setDigits([]);
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
        >
          {/* Main Vault Container */}
          <div className="relative w-full max-w-md pink-glass-card p-8 md:p-10 text-center overflow-hidden border border-pink-300/40">
            {/* Top Glowing Flower Header */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Animated Lock Badge */}
              <motion.div
                animate={{
                  scale: error ? [1, 1.15, 0.95, 1.1, 1] : [1, 1.05, 1],
                  rotate: error ? [0, -10, 10, -5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-300 flex items-center justify-center shadow-lg shadow-pink-500/40 mb-6 border-2 border-white/60"
              >
                <Lock className="w-9 h-9 text-white drop-shadow" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 font-heading tracking-wide flex items-center gap-2 justify-center">
                Sezinay & SELO <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" />
              </h2>
              
              <p className="text-pink-200 text-sm md:text-base font-light mb-6 flex items-center gap-1.5 justify-center">
                <Flower2 className="w-4 h-4 text-pink-400" />
                Özel Gül Bahçemize Giriş İçin Şifreyi Giriniz
              </p>

              {/* 6-Digit Password Boxes */}
              <motion.div
                animate={error ? { x: [-12, 12, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const isFilled = idx < digits.length;
                  return (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={{
                        scale: isFilled ? 1.1 : 1,
                        borderColor: isFilled ? '#ff4d8d' : 'rgba(255, 255, 255, 0.25)',
                        backgroundColor: isFilled ? 'rgba(255, 77, 141, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                      }}
                      className="w-11 h-13 md:w-12 md:h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold text-white shadow-inner backdrop-blur-md"
                    >
                      {isFilled ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-pink-300"
                        >
                          ●
                        </motion.span>
                      ) : (
                        <span className="text-white/20 text-sm">•</span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Error & Hint Message */}
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 px-4 py-2 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs md:text-sm font-medium flex items-center gap-2 justify-center"
                >
                  <span>⚠️ Hatalı Şifre! İpucu: Bizim Çıkma Tarihimiz ❤️ (DDMMYY)</span>
                </motion.div>
              ) : (
                <div className="mb-6 text-xs text-pink-300/80 font-mono tracking-wider flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Tarihimiz: 17.07.2026
                </div>
              )}

              {/* Keypad Grid (1-9, Backspace, 0) */}
              <div className="grid grid-cols-3 gap-3.5 w-full max-w-xs">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.06, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleKeyPress(num)}
                    className="h-14 rounded-2xl pink-glass text-xl font-bold text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-pink-300/60 shadow-md"
                  >
                    {num}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleKeyPress('0')}
                  className="h-14 col-start-2 rounded-2xl pink-glass text-xl font-bold text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-pink-300/60 shadow-md"
                >
                  0
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06, backgroundColor: 'rgba(244, 63, 94, 0.3)' }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleDelete}
                  className="h-14 col-start-3 rounded-2xl pink-glass text-lg font-bold text-rose-300 flex items-center justify-center transition-all duration-200 border border-rose-400/30 shadow-md"
                >
                  <Delete className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Decorative Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 w-full flex items-center justify-between text-xs text-pink-200/60">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> SELO & Sezinay
                </span>
                <span>17.07.2026 🌹</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
