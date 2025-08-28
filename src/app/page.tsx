'use client';
import { Activity, ArrowDownCircle, ArrowUpCircle, BarChart3, ChevronLeft, ChevronRight, Crown, Download, Fish, Flame, Gamepad2, Heart, Home as HomeIcon, House, Percent, RefreshCw, Star, User, HeartCrack, Trophy, Ticket, MessageCircle, Landmark } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

export default function HomePage() {

  const navItems = [
    { name: "Lobby", icon: <Image src="https://placehold.co/24x24/FEE2E2/EF4444?text=L" alt="Lobby" width={24} height={24} className="rounded-full" /> },
    { name: "Mini Game", icon: <Gamepad2 className="w-5 h-5" /> },
    { name: "Slots", icon: <Image src="https://placehold.co/24x24/FEE2E2/EF4444?text=7" alt="7" width={24} height={24} className="rounded-full" /> },
    { name: "Card", icon: <Heart className="w-5 h-5" /> },
    { name: "Fishing", icon: <Fish className="w-5 h-5" /> },
  ]

  const winners = [
    { game: 'Wickets9', user: 'Mem***BMK', amount: '₹200.00' },
    { game: 'Wickets9', user: 'Mem***IYV', amount: '₹112.00' },
    { game: 'Wickets9', user: 'Mem***EOQ', amount: '₹400.00' },
    { game: 'Card365', user: 'Mem***FPA', amount: '₹235.50' },
    { game: 'Wickets9', user: 'Mem***RW', amount: '₹200.00' },
  ];

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
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-red-600">9XBETCLUB</span>
          </div>
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
              <Button className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex-1 sm:flex-none text-xs sm:text-sm">
                <ArrowUpCircle className="w-4 h-4 mr-1" />
                Withdraw
              </Button>
              <Button className="bg-gradient-to-br from-red-500 to-red-700 text-white flex-1 sm:flex-none text-xs sm:text-sm">
                <ArrowDownCircle className="w-4 h-4 mr-1" />
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="relative">
            <Image src="https://picsum.photos/600/200?random=1" alt="Moto Racing" width={600} height={200} className="rounded-lg" data-ai-hint="motorcycle racing" />
        </div>

        <div className="grid grid-cols-5 gap-1">
          <Button variant="secondary" className="flex-col h-auto p-2 rounded-lg bg-red-100 text-red-600 font-bold">
            <Landmark className="w-5 h-5" />
            <span className="mt-1 text-xs">Lobby</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto p-2 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-muted-foreground" />
            <span className="mt-1 text-xs">Mini Game</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto p-2 rounded-lg">
             <Trophy className="w-5 h-5 text-muted-foreground" />
            <span className="mt-1 text-xs">Slots</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto p-2 rounded-lg">
            <Heart className="w-5 h-5 text-muted-foreground" />
            <span className="mt-1 text-xs">Card</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto p-2 rounded-lg">
            <Fish className="w-5 h-5 text-muted-foreground" />
            <span className="mt-1 text-xs">Fishing</span>
          </Button>
        </div>
        
        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Trophy className="text-yellow-500" /> Super Jackpot</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">Detail</Button>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
           <div className="grid grid-cols-1 gap-2 sm:gap-4">
             <Card className="rounded-lg overflow-hidden relative">
                 <Image src="https://picsum.photos/400/150?random=50" alt="Super Jackpot" width={400} height={150} className="w-full" data-ai-hint="gold coins treasure" />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h3 className="text-2xl font-bold">SUPER JACKPOT</h3>
                        <p className="text-sm mt-1">Play now for a chance to win big!</p>
                    </div>
                 </div>
             </Card>
           </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Gamepad2 className="text-blue-500" /> Mini game</h2>
            <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Card className="overflow-hidden rounded-lg bg-blue-400/20">
              <Image src="https://picsum.photos/200/200?random=10" alt="Aviator" width={200} height={200} data-ai-hint="aviator game" />
              <CardContent className="p-1 sm:p-2 text-center">
                <p className="font-bold text-blue-800 text-xs sm:text-sm">AVIATOR</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg bg-purple-400/20">
              <Image src="https://picsum.photos/200/200?random=11" alt="Mines" width={200} height={200} data-ai-hint="mines game" />
              <CardContent className="p-1 sm:p-2 text-center">
                <p className="font-bold text-purple-800 text-xs sm:text-sm">MINES</p>
                <p className="text-xs text-purple-600">TB GAME</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg bg-purple-400/20">
              <Image src="https://picsum.photos/200/200?random=12" alt="Mines Pro" width={200} height={200} data-ai-hint="mines game explosion" />
               <CardContent className="p-1 sm:p-2 text-center">
                <p className="font-bold text-purple-800 text-xs sm:text-sm">MINES PRO</p>
                <p className="text-xs text-purple-600">TB GAME</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Image src="https://placehold.co/24x24/FEE2E2/EF4444?text=7" alt="7" width={24} height={24} className="rounded-full" /> Slots</h2>
            <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden bg-red-400/20">
                <Image src="https://picsum.photos/200/200?random=13" alt="Evolution" width={200} height={200} className="w-full" data-ai-hint="woman casino" />
                 <p className="font-bold text-red-800 text-center text-sm py-1">&gt;Evolution</p>
            </Card>
            <Card className="rounded-lg overflow-hidden bg-red-400/20">
                <Image src="https://picsum.photos/200/200?random=14" alt="PG" width={200} height={200} className="w-full" data-ai-hint="panda character" />
                <p className="font-bold text-red-800 text-center text-sm py-1">PG <span className="text-xs font-normal">POCKET GAMES SOFT</span></p>
            </Card>
            <Card className="rounded-lg overflow-hidden bg-red-400/20">
                <Image src="https://picsum.photos/200/200?random=15" alt="9G Game" width={200} height={200} className="w-full" data-ai-hint="woman magic" />
                <p className="font-bold text-red-800 text-center text-sm py-1">9G GAME</p>
            </Card>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><HeartCrack className="text-red-500" /> Rummy</h2>
            <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/400/150?random=16" alt="Rummy" width={400} height={150} className="w-full" data-ai-hint="man cards" />
            </Card>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Fish className="text-cyan-500" /> Fishing</h2>
            <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=21" alt="Spirit Tide Legend" width={200} height={200} className="w-full" data-ai-hint="water dragon" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=22" alt="Fighter Fire" width={200} height={200} className="w-full" data-ai-hint="gorilla warrior" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=23" alt="Dragon Fishing" width={200} height={200} className="w-full" data-ai-hint="dragon fishing" />
            </Card>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Star className="text-pink-500" /> Casino</h2>
             <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=24" alt="Evo" width={200} height={200} className="w-full" data-ai-hint="woman gold" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=25" alt="Playace" width={200} height={200} className="w-full" data-ai-hint="woman cards traditional" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/200?random=26" alt="MG Live Grand" width={200} height={200} className="w-full" data-ai-hint="woman fire" />
            </Card>
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Gamepad2 className="text-purple-500" /> Sports</h2>
            <Button variant="outline" size="sm" className="text-xs">All</Button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/400/200?random=27" alt="Sports" width={400} height={200} className="w-full" data-ai-hint="baseball player" />
            </Card>
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
              <div className="divide-y">
                {winners.map((winner, index) => (
                  <div key={index} className="grid grid-cols-3 text-center text-xs sm:text-sm p-2 items-center">
                    <div className="flex items-center justify-center gap-1">
                      <Ticket className="w-4 h-4 text-purple-500" /> 
                      <span>{winner.game}</span>
                    </div>
                    <div>{winner.user}</div>
                    <div className="text-red-500 font-bold">{winner.amount}</div>
                  </div>
                ))}
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
