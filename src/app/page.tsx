
"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/splash-screen";
import AppLogo from "@/components/app-logo";

export default function Home() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 7000); // Splash screen visible for 7 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16 text-center">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="text-primary">Splashy</span>
          <span className="text-accent">Logo</span>
        </h1>
        
        <div className="relative h-80 w-80">
          <div className="absolute inset-0 animate-spin-slow">
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = (i / 9) * 360;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-start justify-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    className="origin-center"
                    style={{
                      transform: `translateY(-140px) rotate(${-angle}deg) scale(0.6)`,
                    }}
                  >
                    <AppLogo className="text-5xl" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AppLogo className="text-7xl" />
          </div>
        </div>
        
        <p className="max-w-xl text-lg text-muted-foreground">
          Welcome to the application. The splash screen has completed. This is the main content area with a continuous logo animation.
        </p>
      </main>
    </div>
  );
}
