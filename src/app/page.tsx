'use client';
import { Award, ChevronLeft, ChevronRight, Download, Gamepad2, Heart, House, Search, Send, Star, User, Wallet, Flame, Home, Activity, Percent } from "lucide-react";
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
    { name: "Fishing", icon: <FishIcon className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-2xl text-red-600">91 CLUB</span>
          </div>
          <Button variant="ghost" size="icon">
            <Download className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-4">
        <Card className="bg-card shadow-lg">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Wallet balance</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">₹305.77</p>
                <RefreshCwIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <ArrowUpCircleIcon className="w-4 h-4 mr-1" />
                Withdraw
              </Button>
              <Button className="bg-gradient-to-br from-red-500 to-red-700 text-white">
                <ArrowDownCircleIcon className="w-4 h-4 mr-1" />
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-lg font-bold flex items-center justify-center gap-2 rounded-lg">
            <Image src="https://picsum.photos/40/40?random=1" alt="Wheel of fortune" width={40} height={40} className="rounded-full" data-ai-hint="fortune wheel" />
            Wheel of fortune
          </Button>
          <Button className="h-20 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-bold flex items-center justify-center gap-2 rounded-lg">
            <Image src="https://picsum.photos/40/40?random=2" alt="VIP privileges" width={40} height={40} data-ai-hint="vip crown" />
            VIP privileges
          </Button>
        </div>

        <div className="flex justify-around bg-card p-2 rounded-full shadow-inner">
          {navItems.map((item, index) => (
             <Button key={item.name} variant={index === 0 ? "secondary" : "ghost"} className={cn("flex-col h-auto p-1 rounded-full", index === 0 && "bg-red-100 text-red-600")}>
               {item.icon}
               <span className="text-xs">{item.name}</span>
             </Button>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2"><Star className="text-yellow-400" /> Recommended Games</h2>
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
              <CardContent className="p-2 bg-blue-500 text-center">
                <p className="font-bold text-white">AVIATOR</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/200/200?random=11" alt="Mines" width={200} height={200} data-ai-hint="mines game" />
              <CardContent className="p-2 bg-purple-600 text-center">
                <p className="font-bold text-white">MINES</p>
                <p className="text-xs text-purple-200">TB GAME</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden rounded-lg">
              <Image src="https://picsum.photos/200/200?random=12" alt="Mines Pro" width={200} height={200} data-ai-hint="mines game pro" />
               <CardContent className="p-2 bg-purple-700 text-center">
                <p className="font-bold text-white">MINES PRO</p>
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
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=13" alt="Win Go" width={200} height={120} data-ai-hint="lottery game" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=14" alt="K3" width={200} height={120} data-ai-hint="dice game" />
            </Card>
            <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=15" alt="5D" width={200} height={120} data-ai-hint="lottery balls" />
            </Card>
             <Card className="rounded-lg overflow-hidden">
                <Image src="https://picsum.photos/200/120?random=16" alt="TRX Wings" width={200} height={120} data-ai-hint="crypto game" />
            </Card>
          </div>
        </div>

      </main>
      
      <div className="fixed bottom-10 right-4">
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg">
           Add to Desktop
        </Button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-center">
        <Button variant="ghost" className="flex flex-col h-auto items-center text-red-600">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <Activity className="w-6 h-6" />
          <span className="text-xs">Activity</span>
        </Button>
        <div className="relative">
          <div className="absolute -top-10">
             <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex flex-col items-center justify-center text-white">
                <div className="font-bold">GO</div>
             </div>
             <p className="text-center font-bold text-xs mt-1">Get ₹500</p>
          </div>
        </div>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <Percent className="w-6 h-6" />
          <span className="text-xs">Promotion</span>
        </Button>
        <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
          <User className="w-6 h-6" />
          <span className="text-xs">Account</span>
        </Button>
      </footer>
    </div>
  );
}

function FishIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 12c.9 0 1.7-.3 2.3-.8.6-.5.9-1.3.9-2.2s-.3-1.7-.9-2.2C8.2 6.3 7.4 6 6.5 6a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 6.5 13H11" />
      <path d="M11 12a9 9 0 0 0 10.7-7.7 1 1 0 0 0-1-1.2C12.5 3.4 11 5.4 11 12" />
      <path d="M18 12a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1 3 3 0 0 1 3-3" />
    </svg>
  )
}

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    )
}

function ArrowUpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    )
}
  
function ArrowDownCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 4 4 4-4" />
        <path d="M12 8v8" />
      </svg>
    )
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function PercentIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" x2="5" y1="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    )
}
