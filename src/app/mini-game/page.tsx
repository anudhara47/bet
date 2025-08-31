

'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Download, Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";


export const AviatorIcon = () => (
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

export const VortexIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M100,100 m-80,0 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0" fill="none" stroke="#8b5cf6" strokeWidth="15" strokeDasharray="15, 10" transform="rotate(45 100 100)">
                <animateTransform attributeName="transform" type="rotate" from="45 100 100" to="405 100 100" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M100,100 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0" fill="none" stroke="#a78bfa" strokeWidth="12" strokeDasharray="10, 5" transform="rotate(-60 100 100)">
                 <animateTransform attributeName="transform" type="rotate" from="-60 100 100" to="300 100 100" dur="3s" repeatCount="indefinite" />
            </path>
             <circle cx="100" cy="100" r="20" fill="#c4b5fd" />
        </g>
    </svg>
);

export const CricketIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 40) scale(0.6)">
            <path d="M100 130 L110 120 L110 30 L100 20 Z" fill="#a16207" />
            <path d="M90 130 L100 120 L100 30 L90 20 Z" fill="#eab308" />
            <circle cx="100" cy="90" r="15" fill="#ef4444" />
        </g>
    </svg>
);

export const ChickenRoadIcon = () => (
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

export const MinesIcon = () => (
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

export const LimboIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(60, 40) scale(0.5)">
            <path d="M100 20 L120 70 L80 70 Z" fill="#4f46e5"/>
            <rect x="80" y="70" width="40" height="80" fill="#a5b4fc" />
            <path d="M90 150 L110 150 L120 170 L80 170 Z" fill="#ef4444" />
        </g>
    </svg>
);

export const JavelinIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5) rotate(45)">
            <path d="M10 100 L190 100" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
            <path d="M170 90 L190 100 L170 110" stroke="#d97706" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
);

export const DragonTigerIcon = () => (
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

export const GoalIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="40" fill="#16a34a" />
             <path d="M100,60 l19,38 h-38 Z" fill="white" transform="translate(0,-5)"/>
             <path d="M81,98 l38,0 l-19,38 Z" fill="white" transform="translate(0,5)"/>
        </g>
    </svg>
);

export const SnakesIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent" />
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M50 150 C 50 50, 150 50, 150 150" stroke="#0d9488" strokeWidth="12" fill="none" strokeLinecap="round"/>
            <path d="M140 60 L150 50 L160 60" fill="#fde047"/>
            <circle cx="150" cy="70" r="3" fill="red" />
        </g>
    </svg>
);

export const DiceIcon = () => (
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

export const KingAndPauperIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M50 20 L150 20 L150 60 L100 90 L50 60Z" fill="#be123c"/>
            <path d="M50 70 L150 70 L150 180 L50 180Z" fill="#9f1239"/>
            <circle cx="100" cy="40" r="10" fill="#facc15"/>
        </g>
    </svg>
);

export const HiloWaveIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M20 100 C 40 60, 60 60, 80 100 S 120 140, 140 100 S 180 60, 200 100" stroke="#4d7c0f" strokeWidth="12" fill="none" strokeLinecap="round"/>
            <path d="M20 120 C 40 80, 60 80, 80 120 S 120 160, 140 120 S 180 80, 200 120" stroke="#65a30d" strokeWidth="12" fill="none" strokeLinecap="round"/>
        </g>
    </svg>
);

export const ClashOfHandsIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 60) scale(0.6) rotate(-15)">
            <path d="M20 80 Q 40 20, 80 50 T 140 80" fill="#0c4a6e"/>
            <path d="M30 80 Q 50 30, 90 60 T 150 90" fill="#075985"/>
        </g>
        <g transform="translate(150, 140) scale(0.6) rotate(165)">
            <path d="M20 80 Q 40 20, 80 50 T 140 80" fill="#0c4a6e"/>
            <path d="M30 80 Q 50 30, 90 60 T 150 90" fill="#075985"/>
        </g>
    </svg>
);

export const PlinkoIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="60" fill="#d946ef"/>
            <circle cx="100" cy="100" r="40" fill="#c026d3"/>
            <circle cx="100" cy="100" r="20" fill="#a21caf"/>
            <text x="80" y="70" fill="white" fontSize="20" fontWeight="bold">50X</text>
        </g>
    </svg>
);

export const BombWaveIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(40, 50) scale(0.5)">
            <circle cx="80" cy="120" r="50" fill="#1e293b"/>
            <rect x="70" y="60" width="20" height="20" fill="#94a3b8"/>
            <path d="M80 60 Q 120 20, 140 40" stroke="#f59e0b" strokeWidth="8" fill="none"/>
        </g>
         <g transform="translate(100, 80) scale(0.3)">
            <circle cx="80" cy="120" r="50" fill="#1e293b"/>
            <rect x="70" y="60" width="20" height="20" fill="#94a3b8"/>
            <path d="M80 60 Q 120 20, 140 40" stroke="#f59e0b" strokeWidth="8" fill="none"/>
        </g>
    </svg>
);

export const HiloIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(30, 50) scale(0.4) rotate(-15)">
            <rect x="0" y="0" width="100" height="140" rx="10" fill="#e0e7ff"/>
            <text x="10" y="30" fill="red" fontSize="30">A♥️</text>
        </g>
        <g transform="translate(90, 50) scale(0.4) rotate(15)">
            <rect x="0" y="0" width="100" height="140" rx="10" fill="#e0e7ff"/>
            <text x="10" y="30" fill="black" fontSize="30">K♠️</text>
        </g>
    </svg>
);

export const TreasureWaveIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="70" fill="#475569"/>
            <circle cx="100" cy="100" r="50" fill="#334155"/>
            <path d="M100 20 L120 50 L80 50 Z" fill="#ca8a04"/>
            <path d="M100 180 L120 150 L80 150 Z" fill="#ca8a04"/>
            <path d="M20 100 L50 120 L50 80 Z" fill="#ca8a04"/>
            <path d="M180 100 L150 120 L150 80 Z" fill="#ca8a04"/>
        </g>
    </svg>
);

export const HotlineIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M20 100 L100 30 L180 100 L180 170 L20 170Z" fill="#3b82f6"/>
            <rect x="60" y="110" width="80" height="60" fill="#93c5fd"/>
            <path d="M90 70 L110 70 L110 90 L90 90 Z" fill="#60a5fa"/>
            <path d="M20,90 Q 50 20, 100 50 T 180 90" stroke="#ef4444" strokeWidth="8" fill="none"/>
        </g>
    </svg>
);

export const CryptosIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <path d="M100 10 L140 80 L60 80Z" fill="#f59e0b"/>
            <rect x="80" y="80" width="40" height="80" fill="#fbbf24"/>
            <path d="M70 160 L130 160 L100 190Z" fill="#f97316"/>
        </g>
    </svg>
);

export const SpaceDiceIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(40, 60) scale(0.4) rotate(-25)">
            <rect x="0" y="0" width="100" height="100" rx="15" fill="#a78bfa"/>
            <circle cx="25" cy="25" r="8" fill="white"/>
            <circle cx="75" cy="75" r="8" fill="white"/>
        </g>
        <g transform="translate(100, 60) scale(0.4) rotate(15)">
            <rect x="0" y="0" width="100" height="100" rx="15" fill="#a78bfa"/>
            <circle cx="50" cy="50" r="8" fill="white"/>
            <circle cx="25" cy="25" r="8" fill="white"/>
            <circle cx="75" cy="25" r="8" fill="white"/>
            <circle cx="25" cy="75" r="8" fill="white"/>
            <circle cx="75" cy="75" r="8" fill="white"/>
        </g>
    </svg>
);

export const Goal3DIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="40" fill="#e2e8f0"/>
            <path d="M100 60 L118 95 L82 95 Z" fill="black"/>
            <path d="M100 140 L118 105 L82 105 Z" fill="black"/>
            <path d="M70 80 L95 100 L70 120Z" fill="black"/>
            <path d="M130 80 L105 100 L130 120Z" fill="black"/>
        </g>
    </svg>
);

export const MiniRouletteIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="transparent"/>
        <g transform="translate(50, 50) scale(0.5)">
            <circle cx="100" cy="100" r="80" fill="#dc2626"/>
            <circle cx="100" cy="100" r="70" fill="#1e293b"/>
            <circle cx="100" cy="100" r="30" fill="#f59e0b"/>
            <path d="M100 20 L100 180" stroke="#facc15" strokeWidth="10"/>
            <path d="M20 100 L180 100" stroke="#facc15" strokeWidth="10"/>
            <path d="M45 45 L155 155" stroke="#facc15" strokeWidth="10"/>
            <path d="M45 155 L155 45" stroke="#facc15" strokeWidth="10"/>
        </g>
    </svg>
);

const DownloadIconSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16.5V3M15 13.5L12 16.5L9 13.5M21 16.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V16.5"/></svg>
)

const GameCard = ({
  href,
  Icon,
  label,
  sublabel
}: {
  href: string;
  Icon: React.ComponentType;
  label: string;
  sublabel?: string;
}) => (
  <Link href={href} className="flex flex-col gap-2 items-center text-center">
    <Card className="w-full overflow-hidden rounded-lg bg-transparent shadow-sm aspect-square">
        <CardContent className="p-0 h-full w-full">
            <Icon />
        </CardContent>
    </Card>
    <span className="text-sm font-bold text-white opacity-80">{label}</span>
    {sublabel && <span className="text-xs text-white/50 -mt-2">{sublabel}</span>}
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
      href: "/mini-game/vortex",
      Icon: VortexIcon,
      label: "VORTEX"
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

  const newGames = [
      { href: "/mini-game/king-pauper", Icon: KingAndPauperIcon, label: "KING AND PAUPER" },
      { href: "/mini-game/hilo-wave", Icon: HiloWaveIcon, label: "HILO WAVE" },
      { href: "/mini-game/clash-of-hands", Icon: ClashOfHandsIcon, label: "CLASH OF HANDS" },
      { href: "/mini-game/plinko", Icon: PlinkoIcon, label: "PLINKO", sublabel: "TB GAME" },
      { href: "/mini-game/bomb-wave", Icon: BombWaveIcon, label: "BOMB WAVE", sublabel: "TB GAME" },
      { href: "/mini-game/hilo", Icon: HiloIcon, label: "HILO", sublabel: "TB GAME" },
      { href: "/mini-game/treasure-wave", Icon: TreasureWaveIcon, label: "TREASURE WAVE", sublabel: "TB GAME" },
      { href: "/mini-game/hotline", Icon: HotlineIcon, label: "HOTLINE", sublabel: "TB GAME" },
      { href: "/mini-game/cryptos", Icon: CryptosIcon, label: "CRYPTOS", sublabel: "TB GAME" },
      { href: "/mini-game/space-dice", Icon: SpaceDiceIcon, label: "SPACE DICE", sublabel: "TB GAME" },
      { href: "/mini-game/goal", Icon: Goal3DIcon, label: "GOAL", sublabel: "TB GAME" },
      { href: "/mini-game/mini-roulette", Icon: MiniRouletteIcon, label: "MINI ROULETTE", sublabel: "TB GAME" },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 p-4 flex items-center gap-4">
        <Link href="/home" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <Gamepad2 className="w-6 h-6 text-primary" />
        <h1 className="font-bold text-xl text-white">Mini Game</h1>
      </header>

      <main className="p-4 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {newGames.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 shadow-lg">
            <div className="bg-white rounded-full p-1 mr-2">
                <DownloadIconSvg/>
            </div>
            Add to Desktop
        </Button>
      </div>
    </div>
  );
}
