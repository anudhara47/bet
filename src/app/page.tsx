'use client';
import { Activity, ArrowDownCircle, ArrowUpCircle, BarChart3, ChevronLeft, ChevronRight, Crown, Download, Fish, Flame, Gamepad2, Heart, Home as HomeIcon, House, Percent, RefreshCw, Star, User, HeartCrack, Trophy, Ticket, MessageCircle, Landmark, Bot } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

const AviatorIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="aviatorGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: 'rgba(96, 165, 250, 1)', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: 'rgba(59, 130, 246, 1)', stopOpacity: 1}} />
      </radialGradient>
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
    <circle cx="100" cy="100" r="90" fill="url(#aviatorGrad)" />
    <g transform="translate(100, 100) scale(0.8)" filter="url(#dropShadow)">
      <path d="M-10,60 L-40,30 L-30,20 L-10,30 L10,30 L30,20 L40,30 L10,60 L10,70 L30,80 L30,90 L10,80 L-10,80 L-30,90 L-30,80 L-10,70 Z" fill="white" transform="rotate(-45) translate(-10, -50)"/>
      <path d="M0-80 L10-60 L-10-60 Z" fill="#FBBF24"/>
      <path d="M-30,-20 L-70,20 L-50,30 L-20,0 Z" fill="white" transform="rotate(-45) translate(-10,-50)" />
      <path d="M30,-20 L70,20 L50,30 L20,0 Z" fill="white" transform="rotate(-45) translate(-10,-50)" />
    </g>
  </svg>
);

const RummyIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feOffset in="blur" dx="2" dy="4" result="offsetBlur" />
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g transform="translate(140 25) rotate(15)" style={{filter: 'url(#cardShadow)'}}>
            <rect x="0" y="0" width="80" height="110" rx="8" fill="url(#cardGrad)" stroke="#cbd5e1" strokeWidth="1" />
            <text x="10" y="25" fontFamily="Arial" fontSize="20" fill="#ef4444" fontWeight="bold">A</text>
            <path d="M35 45 L45 45 L40 55 Z M40 50 L40 70" stroke="#ef4444" strokeWidth="5" />
        </g>
        <g transform="translate(190 20) rotate(5)" style={{filter: 'url(#cardShadow)'}}>
            <rect x="0" y="0" width="80" height="110" rx="8" fill="url(#cardGrad)" stroke="#cbd5e1" strokeWidth="1" />
            <text x="10" y="25" fontFamily="Arial" fontSize="20" fill="#1e293b" fontWeight="bold">K</text>
            <path d="M30 45 L50 45 M40 45 L40 75 M30 75 L50 75" stroke="#1e293b" strokeWidth="4" />
        </g>
        <g transform="translate(80 30) rotate(-10)" style={{filter: 'url(#cardShadow)'}}>
            <rect x="0" y="0" width="80" height="110" rx="8" fill="url(#cardGrad)" stroke="#cbd5e1" strokeWidth="1" />
            <text x="10" y="25" fontFamily="Arial" fontSize="20" fill="#ef4444" fontWeight="bold">Q</text>
            <circle cx="40" cy="60" r="15" stroke="#ef4444" strokeWidth="4" fill="none" />
             <path d="M50 70 L55 75" stroke="#ef4444" strokeWidth="4" />
        </g>
    </svg>
);


const SportsIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sportsGrad" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <filter id="ballShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="10" stdDeviation="5" floodColor="#000" floodOpacity="0.2" />
            </filter>
        </defs>
        <g style={{filter: 'url(#ballShadow)'}}>
            <circle cx="200" cy="100" r="70" fill="url(#sportsGrad)" />
            <path d="M150,55 C180,75 220,75 250,55" stroke="#ef4444" strokeWidth="5" fill="none" />
            <path d="M150,145 C180,125 220,125 250,145" stroke="#ef4444" strokeWidth="5" fill="none" />
        </g>
    </svg>
);

const CasinoIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="diceGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef2f2" />
                <stop offset="100%" stopColor="#fee2e2" />
            </linearGradient>
            <filter id="diceShadow" x="-20%" y="-20%" width="140%" height="140%">
                 <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
            </filter>
        </defs>
        <g transform="translate(100,100)">
            <g transform="rotate(20) translate(-50, -50)" style={{filter: 'url(#diceShadow)'}}>
                <rect x="0" y="0" width="100" height="100" rx="15" fill="url(#diceGrad)" stroke="#fca5a5" />
                <circle cx="25" cy="25" r="8" fill="#dc2626"/>
                <circle cx="75" cy="75" r="8" fill="#dc2626"/>
            </g>
            <g transform="rotate(-20) translate(0, -60)" style={{filter: 'url(#diceShadow)'}}>
                <rect x="0" y="0" width="100" height="100" rx="15" fill="url(#diceGrad)" stroke="#fca5a5" />
                <circle cx="50" cy="50" r="8" fill="#dc2626"/>
                <circle cx="25" cy="25" r="8" fill="#dc2626"/>
                <circle cx="75" cy="25" r="8" fill="#dc2626"/>
                <circle cx="25" cy="75" r="8" fill="#dc2626"/>
                <circle cx="75" cy="75" r="8" fill="#dc2626"/>
            </g>
        </g>
    </svg>
);

const SlotsIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="slotsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FBBF24', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#F59E0B', stopOpacity:1}} />
            </linearGradient>
            <filter id="slotShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.3"/>
            </filter>
        </defs>
        <g style={{filter: 'url(#slotShadow)'}}>
            <rect x="30" y="50" width="140" height="100" rx="20" fill="#E11D48"/>
            <rect x="40" y="60" width="120" height="80" rx="10" fill="#1F2937"/>
            <rect x="55" y="75" width="30" height="50" rx="5" fill="url(#slotsGrad)"/>
            <rect x="85" y="75" width="30" height="50" rx="5" fill="url(#slotsGrad)"/>
            <rect x="115" y="75" width="30" height="50" rx="5" fill="url(#slotsGrad)"/>
            <text x="70" y="105" fontFamily="Arial" fontSize="30" fill="white" fontWeight="bold">7</text>
            <text x="100" y="105" fontFamily="Arial" fontSize="30" fill="white" fontWeight="bold">7</text>
            <text x="130" y="105" fontFamily="Arial" fontSize="30" fill="white" fontWeight="bold">7</text>
            <circle cx="160" cy="100" r="10" fill="#FBBF24"/>
            <path d="M160 80 L180 100 L160 120" fill="none" stroke="#FBBF24" strokeWidth="4" />
        </g>
    </svg>
);


const FishingIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="waterGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
            </radialGradient>
             <filter id="fishShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.2"/>
            </filter>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#waterGrad)" />
        <g transform="translate(100, 100) scale(0.6) rotate(-30)" style={{filter: 'url(#fishShadow)'}}>
            <path d="M-50,0 C-50,-50 50,-50 50,0 C50,50 -50,50 -50,0 Z" fill="#F97316"/>
            <path d="M50,0 C70,-20 70,20 50,0 Z" fill="#FB923C" />
            <circle cx="-20" cy="-10" r="5" fill="white"/>
            <circle cx="-20" cy="-10" r="2" fill="black"/>
        </g>
    </svg>
);

const MinesIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="minesGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{stopColor: 'rgba(192, 132, 252, 1)', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'rgba(168, 85, 247, 1)', stopOpacity: 1}} />
        </radialGradient>
         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#minesGrad)"/>
      <g transform="translate(45, 45) scale(0.7)" filter="url(#glow)">
        <path d="M55 10 L100 10 L125 50 L100 90 L55 90 L30 50 Z" fill="#FBBF24" stroke="#FDE68A" strokeWidth="5"/>
        <path d="M77.5 25 L105 50 L77.5 75 L50 50 Z" fill="white" />
      </g>
       <g transform="translate(100, 105) scale(0.3)" filter="url(#glow)">
        <path d="M55 10 L100 10 L125 50 L100 90 L55 90 L30 50 Z" fill="#A78BFA" stroke="white" strokeWidth="8"/>
         <path d="M77.5 25 L105 50 L77.5 75 L50 50 Z" fill="white" />
      </g>
    </svg>
  );

export default function HomePage() {

  const navItems = [
    { name: "Lobby", icon: <Landmark className="w-5 h-5" />, href: "/lobby", active: true },
    { name: "Mini Game", icon: <Gamepad2 className="w-5 h-5" />, href: "/mini-game" },
    { name: "Slots", icon: <Trophy className="w-5 h-5" />, href: "/slots" },
    { name: "Card", icon: <Heart className="w-5 h-5" />, href: "/card" },
    { name: "Fishing", icon: <Fish className="w-5 h-5" />, href: "/fishing" },
  ]

  const generateWinners = React.useCallback((count: number) => {
    const games = ['Wickets9', 'Card365', 'Slots', 'Rummy', 'Aviator', 'Mines'];
    const winners = [];
    for (let i = 0; i < count; i++) {
        const game = games[Math.floor(Math.random() * games.length)];
        const user = `Mem***${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const amount = `₹${(Math.random() * 1000 + 100).toFixed(2)}`;
        winners.push({ game, user, amount });
    }
    return winners;
  }, []);
  
  const [winners, setWinners] = React.useState<{ game: string; user: string; amount: string; }[]>([]);

  React.useEffect(() => {
    setWinners(generateWinners(100));

    const interval = setInterval(() => {
        setWinners(prev => [...prev, ...generateWinners(1)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [generateWinners]);

  const extendedWinners = React.useMemo(() => {
    // We need a stable list on the client for the animation to be smooth.
    // If the list is empty, we can't repeat it, so we'll just have an empty list.
    if (winners.length === 0) {
      return [];
    }
  
    // To ensure the animation is smooth, we need to have enough items to fill the marquee.
    // We'll repeat the list until we have at least 50 items.
    const repeated = [];
    while (repeated.length < 50) {
      repeated.push(...winners);
    }
    return repeated;
  }, [winners]);


  const earningsChart = [
    { rank: 1, user: 'Mem***6YM', amount: '₹16,587,734.80', avatar: 'https://picsum.photos/40/40?random=31' },
    { rank: 2, user: 'Mem***414', amount: '₹7,611,909.70', avatar: 'https://picsum.photos/40/40?random=32' },
    { rank: 3, user: 'Mem***SNC', amount: '₹5,697,645.11', avatar: 'https://picsum.photos/40/40?random=33' },
    { rank: 4, user: 'Mem***AL6', amount: '₹4,465,167.10', avatar: 'https://picsum.photos/40/40?random=34' },
    { rank: 5, user: 'AVA****TAR', amount: '₹2,775,264.00', avatar: 'https://picsum.photos/40/40?random=35' },
    { rank: 6, user: 'Mem***ZVV', amount: '₹2,627,244.10', avatar: 'https://picsum.photos/40/40?random=36' },
    { rank: 7, user: 'Mem***EBW', amount: '₹1,810,966.40', avatar: 'https://picsum.photos/40/40?random=37' },
    { rank: 8, user: 'Sun***ina', amount: '₹1,611,913.30', avatar: 'https://picsum.photos/40/40?random=38' },
    { rank: 9, user: 'Mem***N52', amount: '₹1,383,809.43', avatar: 'https://picsum.photos/40/40?random=39' },
    { rank: 10, user: 'Mem***IHA', amount: '₹1,362,900.00', avatar: 'https://picsum.photos/40/40?random=40' },
  ];

  const topEarners = earningsChart.slice(0, 3);
  const otherEarners = earningsChart.slice(3);


  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-red-600">9XBETCLUB</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 space-y-4">
        <Card className="bg-card shadow-lg">
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex justify-between items-center w-full sm:w-auto">
                <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Wallet balance</p>
                    <div className="flex items-center gap-2">
                        <p className="text-xl sm:text-2xl font-bold">₹305.77</p>
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link href="/withdraw" className={cn(buttonVariants(), "bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex-1 sm:flex-none text-xs sm:text-sm")}>
                <ArrowUpCircle className="w-4 h-4 mr-1" />
                Withdraw
              </Link>
              <Link href="/deposit" className={cn(buttonVariants(), "bg-gradient-to-br from-red-500 to-red-700 text-white flex-1 sm:flex-none text-xs sm:text-sm")}>
                <ArrowDownCircle className="w-4 h-4 mr-1" />
                Deposit
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="relative">
            <Image src="https://picsum.photos/600/200?random=1" alt="Moto Racing" width={600} height={200} className="rounded-lg" data-ai-hint="motorcycle racing" />
        </div>

        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className={cn(
              buttonVariants({ variant: item.active ? "secondary" : "ghost" }),
              "flex-col h-auto p-2 rounded-lg",
              item.active ? "bg-red-100 text-red-600 font-bold" : "text-muted-foreground"
            )}>
              {item.icon}
              <span className="mt-1 text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Trophy className="text-yellow-500" /> Super Jackpot</h2>
            <div className="flex items-center gap-2">
              <Link href="/super-jackpot" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>Detail</Link>
            </div>
          </div>
           <div className="grid grid-cols-1 gap-2 sm:gap-4">
             <Link href="/super-jackpot">
                <Card className="rounded-lg overflow-hidden relative h-36">
                    <Image src="https://picsum.photos/600/250?random=51" alt="Super Jackpot" layout="fill" objectFit="cover" className="w-full h-full" data-ai-hint="gold coins treasure chest" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-bold text-white tracking-widest">SUPER JACKPOT</h3>
                        <p className="text-yellow-300 text-sm mt-2">Play games to win massive prizes!</p>
                    </div>
                </Card>
            </Link>
           </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">8</span>
              </div>
              <h2 className="text-md sm:text-lg font-bold">Lottery</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-2">The games are independently developed by our team, fun, fair, and safe</p>
          <div className="grid grid-cols-2 gap-4">
              <Link href="/lottery/win-go">
                  <Card className="rounded-lg overflow-hidden relative aspect-video">
                      <Image src="https://picsum.photos/300/150?random=61" alt="Win Go" layout="fill" objectFit="cover" data-ai-hint="lottery balls win go"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-2 flex flex-col justify-end">
                          <h3 className="text-white font-bold text-lg">WIN GO</h3>
                      </div>
                  </Card>
              </Link>
              <Link href="/lottery/k3">
                  <Card className="rounded-lg overflow-hidden relative aspect-video">
                      <Image src="https://picsum.photos/300/150?random=62" alt="K3" layout="fill" objectFit="cover" data-ai-hint="dice game k3"/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-2 flex flex-col justify-end">
                          <h3 className="text-white font-bold text-lg">K3</h3>
                      </div>
                  </Card>
              </Link>
              <Link href="/lottery/5d">
                  <Card className="rounded-lg overflow-hidden relative aspect-video">
                      <Image src="https://picsum.photos/300/150?random=63" alt="5D" layout="fill" objectFit="cover" data-ai-hint="lottery game 5d"/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-2 flex flex-col justify-end">
                          <h3 className="text-white font-bold text-lg">5D</h3>
                      </div>
                  </Card>
              </Link>
              <Link href="/lottery/trx-wingo">
                  <Card className="rounded-lg overflow-hidden relative aspect-video">
                      <Image src="https://picsum.photos/300/150?random=64" alt="TRX Wingo" layout="fill" objectFit="cover" data-ai-hint="crypto lottery trx"/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-2 flex flex-col justify-end">
                          <h3 className="text-white font-bold text-lg">TRX WINGO</h3>
                      </div>
                  </Card>
              </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Gamepad2 className="text-blue-500" /> Mini game</h2>
            <Link href="/all-games" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/mini-game">
                <Card className="overflow-hidden rounded-lg bg-blue-400/20 aspect-square flex flex-col">
                  <div className="flex-grow">
                    <AviatorIcon />
                  </div>
                  <CardContent className="p-1 sm:p-2 text-center bg-blue-100/50">
                      <p className="font-bold text-blue-800 text-xs sm:text-sm">AVIATOR</p>
                  </CardContent>
                </Card>
            </Link>
            <Link href="/mini-game">
                <Card className="overflow-hidden rounded-lg bg-purple-400/20 aspect-square flex flex-col">
                  <div className="flex-grow">
                    <MinesIcon />
                  </div>
                  <CardContent className="p-1 sm:p-2 text-center bg-purple-100/50">
                      <p className="font-bold text-purple-800 text-xs sm:text-sm">MINES</p>
                      <p className="text-xs text-purple-600">TB GAME</p>
                  </CardContent>
                </Card>
            </Link>
            <Link href="/mini-game">
                <Card className="overflow-hidden rounded-lg bg-purple-400/20 aspect-square flex flex-col">
                  <div className="flex-grow">
                     <MinesIcon />
                  </div>
                  <CardContent className="p-1 sm:p-2 text-center bg-purple-100/50">
                      <p className="font-bold text-purple-800 text-xs sm:text-sm">MINES PRO</p>
                      <p className="text-xs text-purple-600">TB GAME</p>
                  </CardContent>
                </Card>
            </Link>
          </div>
        </div>
        
        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Trophy className="text-green-500" /> Slots</h2>
            <Link href="/slots" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Link href="/slots">
                <Card className="rounded-lg overflow-hidden bg-red-400/20 aspect-square">
                    <SlotsIcon />
                </Card>
            </Link>
            <Link href="/slots">
                <Card className="rounded-lg overflow-hidden bg-red-400/20 aspect-square">
                    <SlotsIcon />
                </Card>
            </Link>
            <Link href="/slots">
                <Card className="rounded-lg overflow-hidden bg-red-400/20 aspect-square">
                    <SlotsIcon />
                </Card>
            </Link>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><HeartCrack className="text-red-500" /> Rummy</h2>
            <Link href="/card" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            <Link href="/card">
                <Card className="rounded-lg overflow-hidden bg-slate-200">
                    <RummyIcon />
                </Card>
            </Link>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Fish className="text-cyan-500" /> Fishing</h2>
            <Link href="/fishing" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Link href="/fishing">
                <Card className="rounded-lg overflow-hidden aspect-square">
                    <FishingIcon />
                </Card>
            </Link>
            <Link href="/fishing">
                <Card className="rounded-lg overflow-hidden aspect-square">
                    <FishingIcon />
                </Card>
            </Link>
            <Link href="/fishing">
                <Card className="rounded-lg overflow-hidden aspect-square">
                    <FishingIcon />
                </Card>
            </Link>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Star className="text-pink-500" /> Casino</h2>
             <Link href="/casino" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Link href="/casino">
                <Card className="rounded-lg overflow-hidden bg-red-100/50 aspect-square">
                    <CasinoIcon />
                </Card>
            </Link>
            <Link href="/casino">
                <Card className="rounded-lg overflow-hidden bg-red-100/50 aspect-square">
                    <CasinoIcon />
                </Card>
            </Link>
            <Link href="/casino">
                <Card className="rounded-lg overflow-hidden bg-red-100/50 aspect-square">
                    <CasinoIcon />
                </Card>
            </Link>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Gamepad2 className="text-purple-500" /> Sports</h2>
            <Link href="/sports" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "text-xs")}>All</Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            <Link href="/sports">
                <Card className="rounded-lg overflow-hidden bg-slate-200">
                    <SportsIcon />
                </Card>
            </Link>
          </div>
        </div>
        
        <div>
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2 mb-2"><Ticket className="text-red-500" /> Winning information</h2>
            <Card>
                <CardContent className="p-0">
                    <div className="grid grid-cols-3 text-center text-xs sm:text-sm font-semibold bg-muted/50 p-2">
                        <div>Game</div>
                        <div>User</div>
                        <div>Winning amount</div>
                    </div>
                    <div className="relative h-48 overflow-hidden group">
                        <div className="animate-marquee-up group-hover:pause flex flex-col absolute top-0 left-0 w-full">
                            {extendedWinners.map((winner, index) => (
                                <div key={index} className="grid grid-cols-3 text-center text-xs sm:text-sm p-2 items-center h-12">
                                    <div className="flex items-center justify-center gap-1">
                                        <Ticket className="w-4 h-4 text-purple-500" />
                                        <span>{winner.game}</span>
                                    </div>
                                    <div>{winner.user}</div>
                                    <div className="text-red-500 font-bold">{winner.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <Card className="bg-card shadow-lg mt-4">
          <CardHeader>
            <CardTitle className="flex items-center text-md sm:text-lg font-bold"><BarChart3 className="w-5 h-5 mr-2 text-red-500" /> Today's earnings chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative flex justify-center items-end h-48">
              {/* Rank 2 */}
              <div className="absolute bottom-0 left-0 text-center flex flex-col items-center">
                  <Image src={topEarners[1].avatar} alt="Winner" width={50} height={50} className="rounded-full border-2 border-orange-300" data-ai-hint="woman face" />
                  <div className="text-sm font-bold text-orange-500">{topEarners[1].user}</div>
                  <div className="text-xs text-muted-foreground">{topEarners[1].amount}</div>
                  <div className="bg-orange-200/50 rounded-lg p-4 pt-8 w-24 h-20 flex flex-col justify-end items-center relative -mt-6">
                      <div className="text-4xl font-black text-orange-400/50 absolute top-1">2</div>
                  </div>
              </div>

              {/* Rank 1 */}
              <div className="relative text-center flex flex-col items-center z-10">
                  <Crown className="text-yellow-400 w-8 h-8 absolute -top-6" />
                  <Image src={topEarners[0].avatar} alt="Winner" width={60} height={60} className="rounded-full border-2 border-red-400" data-ai-hint="woman face" />
                  <div className="text-md font-bold text-red-500">{topEarners[0].user}</div>
                  <div className="text-sm text-muted-foreground">{topEarners[0].amount}</div>
                  <div className="bg-red-200/50 rounded-lg p-4 pt-10 w-28 h-24 flex flex-col justify-end items-center relative -mt-6">
                      <div className="text-6xl font-black text-red-400/50 absolute top-1">1</div>
                  </div>
              </div>
              
              {/* Rank 3 */}
              <div className="absolute bottom-0 right-0 text-center flex flex-col items-center">
                  <Image src={topEarners[2].avatar} alt="Winner" width={50} height={50} className="rounded-full border-2 border-yellow-300" data-ai-hint="woman face" />
                  <div className="text-sm font-bold text-yellow-500">{topEarners[2].user}</div>
                  <div className="text-xs text-muted-foreground">{topEarners[2].amount}</div>
                  <div className="bg-yellow-200/50 rounded-lg p-4 pt-8 w-24 h-20 flex flex-col justify-end items-center relative -mt-6">
                      <div className="text-4xl font-black text-yellow-400/50 absolute top-1">3</div>
                  </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {otherEarners.map((earner) => (
                <div key={earner.rank} className="flex items-center justify-between p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg w-6 text-center">{earner.rank}</div>
                    <Image src={earner.avatar} alt="User" width={40} height={40} className="rounded-full" data-ai-hint="woman face" />
                    <span className="font-semibold text-sm">{earner.user}</span>
                  </div>
                  <span className="font-bold text-red-500 text-sm">{earner.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow-lg mt-4">
            <CardContent className="p-4 text-xs text-muted-foreground space-y-3">
                <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-sm">
                        +18
                    </div>
                </div>
                <p>• The platform advocates fairness, justice, and openness. We mainly operate fair lottery, blockchain games, live casinos, and slot machine games.</p>
                <p>• 9xbetclub works with more than 10,000 online live game dealers and slot games, all of which are verified fair games.</p>
                <p>• 9xbetclub supports fast deposit and withdrawal, and look forward to your joining. Gambling can be addictive, please play rationally. 9xbetclub only accepts users over the age of 18.</p>
            </CardContent>
        </Card>

      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-start max-w-lg mx-auto">
        <Link href="/" className={cn('flex flex-col h-auto items-center text-red-600', 'p-2')}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/activity" className={cn('flex flex-col h-auto items-center text-muted-foreground', 'p-2')}>
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Activity</span>
        </Link>
        
        <Link href="/promotion" className={cn('flex flex-col h-auto items-center text-muted-foreground', 'p-2')}>
          <Landmark className="w-6 h-6" />
          <span className="text-xs mt-1">Promotion</span>
        </Link>
        <Link href="/account" className={cn('flex flex-col h-auto items-center text-muted-foreground', 'p-2')}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </footer>
    </div>
  );
}
