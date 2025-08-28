'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";


const AviatorIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="200" height="200" fill="transparent" />
      <g transform="translate(100, 100) scale(0.7) rotate(-45)" filter="url(#dropShadow)">
        <path d="M-10,60 L-40,30 L-30,20 L-10,30 L10,30 L30,20 L40,30 L10,60 L10,70 L30,80 L30,90 L10,80 L-10,80 L-30,90 L-30,80 L-10,70 Z" fill="#ef4444" transform="translate(-10, -50)"/>
        <path d="M0-80 L10-60 L-10-60 Z" fill="#FBBF24"/>
        <path d="M-30,-20 L-70,20 L-50,30 L-20,0 Z" fill="#de2d2d" transform="translate(-10,-50)" />
        <path d="M30,-20 L70,20 L50,30 L20,0 Z" fill="#de2d2d" transform="translate(-10,-50)" />
      </g>
    </svg>
);

const CricketIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 40) scale(0.6)">
            <path d="M100 130 L110 120 L110 30 L100 20 Z" fill="#a16207" />
            <path d="M90 130 L100 120 L100 30 L90 20 Z" fill="#eab308" />
            <circle cx="100" cy="90" r="15" fill="#ef4444" />
        </g>
    </svg>
);

const ChickenRoadIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(55, 50) scale(0.5)">
            <circle cx="100" cy="100" r="50" fill="#fcd34d" />
            <circle cx="85" cy="90" r="5" fill="black" />
            <circle cx="115" cy="90" r="5" fill="black" />
            <path d="M100 110 C 105 120, 95 120, 100 110" fill="none" stroke="black" strokeWidth="2"/>
            <path d="M95 100 L105 105 L95 110 Z" fill="#f97316" />
        </g>
    </svg>
);

const MinesIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="200" height="200" fill="transparent"/>
      <g transform="translate(60, 50) scale(0.4)" filter="url(#glow)">
        <path d="M55 10 L100 10 L125 50 L100 90 L55 90 L30 50 Z" fill="#FBBF24" stroke="#FDE68A" strokeWidth="5"/>
        <path d="M77.5 25 L105 50 L77.5 75 L50 50 Z" fill="#a855f7" />
      </g>
    </svg>
);

const LimboIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(60, 40) scale(0.5)">
            <path d="M100 20 L120 70 L80 70 Z" fill="#4f46e5"/>
            <rect x="80" y="70" width="40" height="80" fill="#a5b4fc" />
            <path d="M90 150 L110 150 L120 170 L80 170 Z" fill="#ef4444" />
        </g>
    </svg>
);

const JavelinIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5) rotate(45)">
            <path d="M10 100 L190 100" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
            <path d="M170 90 L190 100 L170 110" stroke="#d97706" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
);

const DragonTigerIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(40, 50) scale(0.6)">
            {/* Dragon */}
            <path d="M50,20 C 20,50 40,100 80,100 C 100,100 100,80 80,70" fill="#ef4444" />
            {/* Tiger */}
            <path d="M150,120 C 180,90 160,40 120,40 C 100,40 100,60 120,70" fill="#f97316" />
        </g>
    </svg>
);

const GoalIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="40" fill="#16a34a" />
             <path d="M100,60 l19,38 h-38 Z" fill="white" transform="translate(0,-5)"/>
             <path d="M81,98 l38,0 l-19,38 Z" fill="white" transform="translate(0,5)"/>
        </g>
    </svg>
);

const SnakesIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M50 150 C 50 50, 150 50, 150 150" stroke="#0d9488" strokeWidth="12" fill="none" strokeLinecap="round"/>
            <path d="M140 60 L150 50 L160 60" fill="#fde047"/>
            <circle cx="150" cy="70" r="3" fill="red" />
        </g>
    </svg>
);

const DiceIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50,50) scale(0.5) rotate(-15)">
            <rect x="50" y="50" width="100" height="100" rx="15" fill="#db2777"/>
            <circle cx="75" cy="75" r="8" fill="white"/>
            <circle cx="125" cy="125" r="8" fill="white"/>
             <circle cx="75" cy="125" r="8" fill="white"/>
            <circle cx="125" cy="75" r="8" fill="white"/>
        </g>
    </svg>
);



const GameCard = ({
  href,
  Icon,
  label
}: {
  href: string;
  Icon: React.ComponentType;
  label: string;
}) => (
  <Link href={href} className="flex flex-col gap-2 items-center text-center">
    <Card className="w-full overflow-hidden rounded-lg bg-card shadow-sm aspect-square">
        <CardContent className="p-0 h-full w-full">
            <Icon />
        </CardContent>
    </Card>
    <span className="text-sm font-bold text-black opacity-80">{label}</span>
  </Link>
);

export default function MiniGamePage() {
  const games = [
    {
      href: "/mini-game/aviator-bonus",
      Icon: AviatorIcon,
      label: "AVIATOR BONUS"
    },
    {
      href: "/mini-game/cricket",
      Icon: CricketIcon,
      label: "CRICKET"
    },
    {
      href: "/mini-game/chicken-road",
      Icon: ChickenRoadIcon,
      label: "CHICKEN ROAD"
    },
    {
      href: "/mini-game/aviator",
      Icon: AviatorIcon,
      label: "AVIATOR"
    },
    {
      href: "/mini-game/mines",
      Icon: MinesIcon,
      label: "MINES"
    },
    {
      href: "/mini-game/mines-pro",
      Icon: MinesIcon,
      label: "MINES PRO"
    },
    {
      href: "/mini-game/limbo",
      Icon: LimboIcon,
      label: "LIMBO"
    },
    {
      href: "/mini-game/javelin",
      Icon: JavelinIcon,
      label: "JAVELIN"
    },
    {
      href: "/mini-game/dragon-tiger",
      Icon: DragonTigerIcon,
      label: "DRAGON TIGER"
    },
    {
        href: "/mini-game/goal",
        Icon: GoalIcon,
        label: "GOAL"
    },
    {
        href: "/mini-game/snakes",
        Icon: SnakesIcon,
        label: "SNAKES"
    },
    {
        href: "/mini-game/dice",
        Icon: DiceIcon,
        label: "DICE"
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-white pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-50 w-full bg-neutral-100/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 p-4 flex items-center gap-4">
        <Link href="/" className="text-black">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl text-black">Mini Game</h1>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-3 shadow-lg">
            <div className="bg-white rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16.5V3M15 13.5L12 16.5L9 13.5M21 16.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V16.5"/></svg>
            </div>
            Add to Desktop
        </Button>
      </div>
    </div>
  );
}
