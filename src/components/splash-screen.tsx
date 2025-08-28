
"use client";

import { useEffect, useState } from 'react';
import AppLogo from './app-logo';
import { cn } from '@/lib/utils';

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
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),   // dot 1 drops
      setTimeout(() => setStep(2), 1500),  // other dots appear
      setTimeout(() => setStep(3), 3000),  // rotation starts
      setTimeout(() => setStep(4), 5000),  // dot 9 moves to center
      setTimeout(() => setStep(5), 6000),  // logo appears
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const getDotStyle = (i: number) => {
    const angle = (i / (DOT_COUNT-1)) * 2 * Math.PI;
    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);
    
    // Dot 1 (index 0)
    if (i === 0) {
      if (step >= 4) return { opacity: 0, transform: 'translate(0px, 120px) scale(1)' }; // Hide
      if (step >= 1) return { opacity: 1, transform: 'translate(0px, 120px) scale(1)' }; // Dropped position
      return { opacity: 0, transform: 'translate(0px, 0px) scale(1)' }; // Initial
    }
    
    // Dot 9 (index 8)
    if (i === 8) {
        if (step >= 4) return { transform: 'translate(0px, 0px) scale(1.5)', transitionDuration: '1000ms' }; // Move to center
    } else { // Other dots
        if (step >= 4) return { opacity: 0, transitionDuration: '500ms' }; // Hide
    }

    if (step >= 2) {
      return {
        transform: `translate(${x}px, ${y}px) scale(1)`,
        opacity: 1,
        transitionDuration: '800ms',
        transitionDelay: `${(i - 1) * 100}ms`
      };
    }

    // Initial state for dots 2-9
    return {
      transform: 'translate(0px, 0px) scale(0)',
      opacity: 0,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className={cn(
        "relative flex h-64 w-64 items-center justify-center transition-transform duration-1000",
        step >= 3 && step < 4 && "animate-spin-slow"
      )}>
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          return (
            <div
              key={i}
              className={`absolute h-6 w-6 rounded-full shadow-lg transition-all ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] flex items-center justify-center text-white font-bold text-sm ${DOT_COLORS[i]}`}
              style={getDotStyle(i)}
            >
              {i + 1}
            </div>
          );
        })}

        {step >= 5 && (
          <div className="absolute animate-logo-zoom">
            <AppLogo className="text-6xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
