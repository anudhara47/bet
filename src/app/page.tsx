'use client';
import { Activity, ArrowDownCircle, ArrowUpCircle, ChevronLeft, ChevronRight, Download, Fish, Flame, Gamepad2, Heart, Home as HomeIcon, House, Percent, RefreshCw, Star, User, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function HomePage() {

  const navItems = [
    { name: "Lobby", icon: <Image src="https://placehold.co/24x24/FEE2E2/EF4444?text=L" alt="Lobby" width={24} height={24} className="rounded-full" /> },
    { name: "Mini Game", icon: <Gamepad2 className="w-5 h-5" /> },
    { name: "Slots", icon: <Flame className="w-5 h-5" /> },
    { name: "Card", icon: <Heart className="w-5 h-5" /> },
    { name: "Fishing", icon: <Fish className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-red-600">91 CLUB</span>
          </div>
          <Button variant="ghost" size="icon">
            <Download className="h-6 w-6" />
          </Button>
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


        <div className="flex justify-around bg-card p-1 rounded-full shadow-inner">
          {navItems.map((item, index) => (
             <Button key={item.name} variant={index === 0 ? "secondary" : "ghost"} className={cn("flex-col h-auto p-2 rounded-full text-xs", index === 0 && "bg-red-100 text-red-600 font-bold")}>
               {item.icon}
               <span className="mt-1">{item.name}</span>
             </Button>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Gamepad2 className="text-blue-500" /> Mini game</h2>
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
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden bg-red-400/20">
                <Image src="https://picsum.photos/200/200?random=13" alt="Evolution" width={200} height={200} className="w-full" data-ai-hint="woman casino" />
                 <p className="font-bold text-red-800 text-center text-sm py-1">>Evolution</p>
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
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/400/150?random=16" alt="Rummy" width={400} height={150} className="w-full" data-ai-hint="man cards" />
            </Card>
          </div>
        </div>

      </main>
      
      <div className="fixed bottom-24 right-4 sm:bottom-10 space-y-2 flex flex-col items-end">
        <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-lg">
          <Image src="https://placehold.co/40x40/FFFFFF/000000?text=C" alt="chat" width={40} height={40} className="rounded-full" data-ai-hint="chat bubble" />
        </Button>
      </div>


      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-center max-w-lg mx-auto">
        <Button variant="ghost" className="flex flex-col h-auto items-center text-red-600">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Activity</span>
        </Button>
        <div className="relative">
          <Image src="https://picsum.photos/80/80?random=99" alt="Fortune wheel" width={80} height={80} className="absolute -top-12 left-1/2 -translate-x-1/2" data-ai-hint="fortune wheel" />
        </div>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <Percent className="w-6 h-6" />
          <span className="text-xs mt-1">Promotion</span>
        </Button>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Button>
      </footer>
    </div>
  );
}
