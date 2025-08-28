'use client';
import { Activity, ArrowDownCircle, ArrowUpCircle, ChevronLeft, ChevronRight, Download, Fish, Flame, Gamepad2, Heart, Home as HomeIcon, House, Percent, RefreshCw, Star, User, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function HomePage() {

  const navItems = [
    { name: "Lobby", icon: <House className="w-4 h-4" /> },
    { name: "Mini Game", icon: <Gamepad2 className="w-4 h-4" /> },
    { name: "Slots", icon: <Flame className="w-4 h-4" /> },
    { name: "Card", icon: <Heart className="w-4 h-4" /> },
    { name: "Fishing", icon: <Fish className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 max-w-lg mx-auto">
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

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Button className="h-16 sm:h-20 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm sm:text-lg font-bold flex items-center justify-center gap-2 rounded-lg">
            <Image src="https://picsum.photos/40/40?random=1" alt="Wheel of fortune" width={40} height={40} className="rounded-full" data-ai-hint="fortune wheel" />
            Wheel of fortune
          </Button>
          <Button className="h-16 sm:h-20 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm sm:text-lg font-bold flex items-center justify-center gap-2 rounded-lg">
            <Image src="https://picsum.photos/40/40?random=2" alt="VIP privileges" width={40} height={40} data-ai-hint="vip crown" />
            VIP privileges
          </Button>
        </div>

        <div className="flex justify-around bg-card p-2 rounded-full shadow-inner">
          {navItems.map((item, index) => (
             <Button key={item.name} variant={index === 0 ? "secondary" : "ghost"} className={cn("flex-col h-auto p-1 rounded-full", index === 0 && "bg-red-100 text-red-600")}>
               {item.icon}
               <span className="text-xs mt-1">{item.name}</span>
             </Button>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md sm:text-lg font-bold flex items-center gap-2"><Star className="text-yellow-400" /> Recommended Games</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Card className="overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/200/200?random=10" alt="Aviator" width={200} height={200} data-ai-hint="aviator game" />
              <CardContent className="p-1 sm:p-2 bg-blue-500 text-center">
                <p className="font-bold text-white text-xs sm:text-sm">AVIATOR</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/200/200?random=11" alt="Mines" width={200} height={200} data-ai-hint="mines game" />
              <CardContent className="p-1 sm:p-2 bg-purple-600 text-center">
                <p className="font-bold text-white text-xs sm:text-sm">MINES</p>
                <p className="text-xs text-purple-200">TB GAME</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/200/200?random=12" alt="Mines Pro" width={200} height={200} data-ai-hint="mines game pro" />
               <CardContent className="p-1 sm:p-2 bg-purple-700 text-center">
                <p className="font-bold text-white text-xs sm:text-sm">MINES PRO</p>
                <p className="text-xs text-purple-200">TB GAME</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">8</div>
            <div>
              <h3 className="font-bold">Lottery</h3>
              <p className="text-xs text-muted-foreground">The games are independently developed by our team, fun, fair, and safe</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=13" alt="Win Go" width={200} height={120} className="w-full" data-ai-hint="lottery game" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=14" alt="K3" width={200} height={120} className="w-full" data-ai-hint="dice game" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=15" alt="5D" width={200} height={120} className="w-full" data-ai-hint="lottery balls" />
            </Card>
             <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=16" alt="TRX Wings" width={200} height={120} className="w-full" data-ai-hint="crypto game" />
            </Card>
          </div>
        </div>

      </main>
      
      <div className="fixed bottom-24 right-4 sm:bottom-10">
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg h-10 px-4 text-xs sm:text-sm">
           Add to Desktop
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
