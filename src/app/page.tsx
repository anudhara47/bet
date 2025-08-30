
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BarChart, ChevronRight, Copy, DollarSign, Filter, Gift, Globe, HomeIcon, Languages, Bell, FileText, Landmark, Wallet, ShieldCheck, User, RefreshCw, Percent, Settings, MessageCircle, LogOut, FileQuestion, Megaphone, BookOpen, Building, Users, Calendar, Clipboard, FileBarChart, Headset, Star, Search, Download, Trophy, Gamepad2, Cherry, Dices, Sailboat, Swords } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const MarqueeItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 py-2">
      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
        <Megaphone className="w-5 h-5 text-red-500" />
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
);

const GameCard = ({ href, imageSrc, label, dataAiHint }: { href: string; imageSrc: string; label: string; dataAiHint: string }) => (
  <Link href={href} className="block relative overflow-hidden rounded-xl shadow-lg group">
    <Image src={imageSrc} alt={label} width={200} height={120} className="w-full h-auto transform group-hover:scale-110 transition-transform duration-300" data-ai-hint={dataAiHint}/>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <h3 className="text-white font-bold text-sm">{label}</h3>
    </div>
  </Link>
);


export default function HomePage() {
    const { toast } = useToast();
    const autoplay = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    const mainCategories = [
        { icon: <Trophy className="w-8 h-8 text-yellow-500" />, label: "Lottery", href: "/lottery/wingo-30s" },
        { icon: <Gamepad2 className="w-8 h-8 text-blue-500" />, label: "Mini Game", href: "/mini-game" },
        { icon: <Cherry className="w-8 h-8 text-red-500" />, label: "Slots", href: "/slots" },
        { icon: <Dices className="w-8 h-8 text-green-500" />, label: "Casino", href: "/casino" },
        { icon: <Sailboat className="w-8 h-8 text-purple-500" />, label: "Fishing", href: "/fishing" },
        { icon: <Swords className="w-8 h-8 text-gray-500" />, label: "Sports", href: "/sports" },
    ]

  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-40 max-w-lg mx-auto relative">
      <header className="bg-gradient-to-r from-red-500 to-orange-400 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">9</span>
            </div>
            <h1 className="font-bold text-xl">9XBETCLUB</h1>
        </div>
        <div className="flex items-center gap-3">
            <Search className="w-6 h-6"/>
            <Download className="w-6 h-6"/>
        </div>
      </header>
      
      <main className="space-y-4">
        <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            className="w-full"
        >
            <CarouselContent>
                <CarouselItem>
                    <Image src="https://picsum.photos/600/400?random=10" width={600} height={400} alt="Promo Banner 1" className="w-full h-auto" data-ai-hint="casino promotion" />
                </CarouselItem>
                <CarouselItem>
                    <Image src="https://picsum.photos/600/400?random=11" width={600} height={400} alt="Promo Banner 2" className="w-full h-auto" data-ai-hint="sports betting" />
                </CarouselItem>
            </CarouselContent>
        </Carousel>

        <div className="px-4 py-2 bg-white shadow-sm overflow-hidden h-14">
            <div className="animate-marquee-up-slow">
                <MarqueeItem text="Congratulations to user 1***23 on winning ₹10,000 in Wingo!" />
                <MarqueeItem text="User 8***99 just hit the jackpot in Slots for ₹50,000!" />
                <MarqueeItem text="Welcome our new VIP member, user 4***56!" />
                <MarqueeItem text="Don't miss the 100% first deposit bonus!" />
                <MarqueeItem text="Congratulations to user 1***23 on winning ₹10,000 in Wingo!" />
                <MarqueeItem text="User 8***99 just hit the jackpot in Slots for ₹50,000!" />
                <MarqueeItem text="Welcome our new VIP member, user 4***56!" />
                <MarqueeItem text="Don't miss the 100% first deposit bonus!" />
            </div>
        </div>
        
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
                {mainCategories.map((cat, index) => (
                     <Link key={index} href={cat.href} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition">
                        {cat.icon}
                        <span className="font-semibold text-sm text-gray-700">{cat.label}</span>
                     </Link>
                ))}
            </div>
        </div>

        <div className="px-4">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-200">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="hot">Hot</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <GameCard href="/lottery/wingo-30s" imageSrc="https://picsum.photos/300/200?random=1" label="Win Go" dataAiHint="lottery balls" />
                        <GameCard href="/lottery/k3" imageSrc="https://picsum.photos/300/200?random=2" label="K3" dataAiHint="dice game" />
                        <GameCard href="/mini-game" imageSrc="https://picsum.photos/300/200?random=3" label="Aviator" dataAiHint="airplane sky" />
                        <GameCard href="/slots" imageSrc="https://picsum.photos/300/200?random=4" label="Fruit Slots" dataAiHint="slot machine fruits" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>


      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-start max-w-lg mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-red-600")}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/activity" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Activity</span>
        </Link>
        <Link href="/promotion" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <Landmark className="w-6 h-6" />
          <span className="text-xs mt-1">Promotion</span>
        </Link>
        <Link href="/account" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </footer>
    </div>
  );
}
