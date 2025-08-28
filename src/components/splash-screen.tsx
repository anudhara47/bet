
"use client";

import { useEffect, useState } from 'react';
import AppLogo from './app-logo';
import { cn } from '@/lib/utils';

const DOT_COUNT = 9;
const RADIUS = 80;
const DOT_ANIMATION_DURATION = 700;
const DOT_ANIMATION_DELAY_STEP = 150;
const ROTATION_DURATION = 3000;

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
  const [isRotating, setIsRotating] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const dotsTimer = setTimeout(() => setDotsVisible(true), 200);
    const rotationTimer = setTimeout(() => setIsRotating(true), DOT_COUNT * DOT_ANIMATION_DELAY_STEP + DOT_ANIMATION_DURATION);
    const logoTimer = setTimeout(() => setLogoVisible(true), DOT_COUNT * DOT_ANIMATION_DELAY_STEP + DOT_ANIMATION_DURATION + ROTATION_DURATION);
    
    return () => {
      clearTimeout(dotsTimer);
      clearTimeout(rotationTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className={cn("relative flex h-64 w-64 items-center justify-center", isRotating && "animate-spin-splash")}>
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          const angle = (i / DOT_COUNT) * 2 * Math.PI;
          const x = RADIUS * Math.cos(angle);
          const y = RADIUS * Math.sin(angle);
          
          return (
            <div
              key={i}
              className={`absolute h-5 w-5 rounded-full shadow-lg transition-all ease-[cubic-bezier(0.25,1,0.5,1)] ${DOT_COLORS[i % DOT_COLORS.length]}`}
              style={{
                transform: dotsVisible ? `translate(${x}px, ${y}px) scale(1)` : `translate(0px, -150px) scale(0)`,
                opacity: dotsVisible ? 1 : 0,
                transitionDuration: `${DOT_ANIMATION_DURATION}ms`,
                transitionDelay: `${i * DOT_ANIMATION_DELAY_STEP}ms`,
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
