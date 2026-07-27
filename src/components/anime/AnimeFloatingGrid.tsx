import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export const AnimeFloatingGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const gridEls = containerRef.current.querySelectorAll('.grid-dot');

    // 1. Initial Stagger Entrance
    animate(gridEls, {
      scale: [0.1, 1],
      translateY: [-15, 0],
      opacity: [0, 0.85],
      duration: 1000,
      easing: 'easeInOutQuad',
      delay: stagger(40, { grid: [10, 6], from: 'center' }),
    });

    // 2. Continuous Anime.js Wave Loop across grid dots
    const waveAnimation = animate(gridEls, {
      scale: [1, 1.4, 1],
      backgroundColor: ['#ff4d8d', '#ffffff', '#ffd700', '#ff4d8d'],
      delay: stagger(100, { grid: [10, 6], from: 'center' }),
      loop: true,
      duration: 3500,
      easing: 'easeInOutSine',
    });

    return () => {
      waveAnimation.pause();
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (!containerRef.current) return;
    const gridEls = containerRef.current.querySelectorAll('.grid-dot');

    // Radial wave ripple animation from clicked dot
    animate(gridEls, {
      scale: [2.2, 1],
      backgroundColor: ['#ffffff', '#ffd700', '#ff4d8d'],
      duration: 900,
      easing: 'easeInOutQuad',
      delay: stagger(50, { grid: [10, 6], from: index }),
    });
  };

  const dots = Array.from({ length: 60 });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-10 gap-3 md:gap-5 p-4 max-w-2xl mx-auto my-4 pointer-events-auto opacity-90 justify-center items-center"
    >
      {dots.map((_, i) => (
        <div
          key={i}
          onClick={() => handleDotClick(i)}
          className="grid-dot w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full bg-pink-400 shadow-lg shadow-pink-500/60 cursor-pointer border-2 border-white/80 transform-gpu transition-shadow hover:shadow-white"
        />
      ))}
    </div>
  );
};
