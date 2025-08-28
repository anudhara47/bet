
"use client";

import { useEffect, useState } from 'react';
import AppLogo from './app-logo';

const DOT_COUNT = 9;
const RADIUS = 80;
const DOT_COLORS = [
  "bg-primary",
  "bg-accent",
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

const SplashScreen = () => {
  const [dotsVisible, setDotsVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const dotTimer = setTimeout(() => setDotsVisible(true), 200);
    const logoTimer = setTimeout(() => setLogoVisible(true), DOT_COUNT * 150 + 500); // After dots animate in
    
    return () => {
      clearTimeout(dotTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className="relative flex h-64 w-64 items-center justify-center">
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          const angle = (i / DOT_COUNT) * 2 * Math.PI;
          const x = RADIUS * Math.cos(angle);
          const y = RADIUS * Math.sin(angle);
          
          return (
            <div
              key={i}
              className={`absolute h-5 w-5 rounded-full shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${DOT_COLORS[i % DOT_COLORS.length]}`}
              style={{
                transform: dotsVisible ? `translate(${x}px, ${y}px) scale(1)` : `translate(0px, -150px) scale(0)`,
                opacity: dotsVisible ? 1 : 0,
                transitionDelay: `${i * 150}ms`,
              }}
            />
          );
        })}

        {logoVisible && (
          <div className="absolute animate-logo-zoom">
            <AppLogo className="text-9xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
