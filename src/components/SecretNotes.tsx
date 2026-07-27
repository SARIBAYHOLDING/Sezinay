import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

interface SecretCard {
  id: string;
  frontTitle: string;
  frontSubtitle: string;
  icon: string;
  backText: string;
  bgGradient: string;
}

const SECRET_CARDS: SecretCard[] = [
  {
    id: 'sc-1',
    frontTitle: 'Seni Neden Çok Seviyorum? 💖',
    frontSubtitle: 'Kartı Çevirmek İçin Tıkla ✨',
    icon: '💖',
    backText: 'Çünkü gülüşün dünyadaki tüm pembe güllerden daha güzel. Yanındayken zamanın nasıl geçtiğini hiç anlamıyorum sevgilim...',
    bgGradient: 'from-pink-600 to-rose-700',
  },
  {
    id: 'sc-2',
    frontTitle: 'En Sevdiğim Anımız 🌹',
    frontSubtitle: 'Dokun & Oku 🤫',
    icon: '🌹',
    backText: '17 Temmuz 2026 kafa kafaya verip ilk kahvelerimizi içtiğimiz ve gözlerimin içinde kaybolduğun o ilk gün!',
    bgGradient: 'from-rose-600 to-pink-800',
  },
  {
    id: 'sc-3',
    frontTitle: 'Gözlerinin Güzelliği 👀',
    frontSubtitle: 'Sadece Sana Özel ✨',
    icon: '✨',
    backText: 'O kadar duru ve o kadar güzel bakıyorsun ki, her baktığımda seni yeniden ve yeniden sevmeme sebep oluyorsun.',
    bgGradient: 'from-pink-700 to-purple-800',
  },
  {
    id: 'sc-4',
    frontTitle: 'Bizim Geleceğimiz 💍',
    frontSubtitle: 'Gizli Sözümüz 🌸',
    icon: '🌸',
    backText: 'Seni her gün bir öncekinden daha çok seveceğime ve ne olursa olsun elini hiç bırakmayacağıma söz veriyorum prensesim.',
    bgGradient: 'from-rose-700 to-amber-600',
  },
];

export const SecretNotes: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full my-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-1">
          <Gift className="w-4 h-4" /> Sezinay'a Özel Sürprizler
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading drop-shadow">
          Gizli Aşk Notları (Çevir & Oku) 💌
        </h2>
        <p className="text-xs md:text-sm text-pink-200/90 mt-1">
          Kartların üzerine tıklayarak arkasındaki gizli mesajlarımı oku! ✨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {SECRET_CARDS.map((card) => {
          const isFlipped = !!flippedIds[card.id];
          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="w-full max-w-[280px] h-64 cursor-pointer perspective-1000 group"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                {/* Front Side */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br ${card.bgGradient} border-2 border-white/40 shadow-2xl flex flex-col items-center justify-between text-center`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-heading leading-tight mb-2">
                      {card.frontTitle}
                    </h4>
                    <span className="text-xs text-pink-200/90 font-mono tracking-wide">
                      {card.frontSubtitle}
                    </span>
                  </div>
                  <div className="w-full pt-3 border-t border-white/20 flex items-center justify-center gap-1 text-xs text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" /> Tıkla & Çevir
                  </div>
                </div>

                {/* Back Side */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-b from-amber-50 via-rose-50 to-amber-100 text-rose-950 border-2 border-amber-300 shadow-2xl flex flex-col items-center justify-between text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-rose-800 text-xs font-bold font-mono">
                    SELO
                  </div>
                  <p className="font-handwriting text-xl text-rose-950 leading-relaxed font-bold">
                    "{card.backText}"
                  </p>
                  <span className="text-[11px] text-rose-800/80 font-sans tracking-wide">
                    Seni Çok Seviyorum 🌹
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
