import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

interface AnimeStaggerHeaderProps {
  text: string;
  className?: string;
}

export const AnimeStaggerHeader: React.FC<AnimeStaggerHeaderProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letterEls = containerRef.current.querySelectorAll('.anime-letter');

    const tl = createTimeline({ loop: false });
    tl.add(letterEls, {
      translateY: [40, 0],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, 0.5)',
      duration: 1200,
      delay: stagger(60, { start: 200 }),
    });

    animate(letterEls, {
      translateY: [-4, 4],
      duration: 2000,
      alternate: true,
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(80),
    });
  }, [text]);

  const letters = text.split('');

  return (
    <h1 ref={containerRef} className={`inline-flex flex-wrap justify-center overflow-hidden ${className}`}>
      {letters.map((char, index) => (
        <span
          key={index}
          className="anime-letter inline-block transform-gpu select-none"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};
