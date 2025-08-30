
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Activity, Flame, Gamepad2, Gift, Handshake, Heart, HomeIcon, Landmark, LucideIcon, Menu, Rocket, Search, User, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useUser } from "@/context/user-context";
import { useLanguage } from "@/context/language-context";


const GameIcon = ({ Icon, label, href }: { Icon: LucideIcon, label: string, href: string }) => (
    <Link href={href} className="flex flex-col items-center gap-2">
        <div className="bg-white/20 p-4 rounded-full">
            <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="font-semibold">{label}</span>
    </Link>
)

export default function HomePage() {
    const { uid, nickname } = useUser();
    const { translations } = useLanguage();
    const t = translations.account_page?.footer;

    const gameIcons = [
        { Icon: Rocket, label: "Lottery", href: "/lottery/wingo-30s" },
        { Icon: Gamepad2, label: "Slots", href: "/slots" },
        { Icon: Handshake, label: "Sports", href: "/sports" },
        { Icon: Heart, label: "Casino", href: "/casino" },
        { Icon: Gift, label: "Fishing", href: "/fishing" },
        { Icon: Flame, label: "Card", href: "/card" },
    ];

    const recommendedGames = [
        { name: 'Win Go', image: '/images/recommend-1.png', href: '/lottery/wingo-30s' },
        { name: 'K3', image: '/images/recommend-2.png', href: '/lottery/k3' },
        { name: '5D', image: '/images/recommend-3.png', href: '/lottery/5d' },
        { name: 'Aviator', image: '/images/recommend-4.png', href: '/mini-game' },
        { name: 'Fruit Slots', image: '/images/recommend-5.png', href: '/slots' }
    ]

    return (
        <div className="min-h-screen bg-neutral-900 text-white pb-40 max-w-lg mx-auto">
            <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
                        9
                    </div>
                    <span className="font-bold text-xl">91CLUB</span>
                </div>
                {uid ? (
                    <div className="flex items-center gap-2 text-sm">
                        <span>{nickname}</span>
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                            <User className="w-5 h-5"/>
                        </div>
                    </div>
                ) : (
                    <Link href="/login" className={cn(buttonVariants({variant: 'default'}))}>Login</Link>
                )}
            </header>

            <main className="px-4">
                <Card className="rounded-xl overflow-hidden my-4 bg-transparent border-none">
                    <CardContent className="p-0">
                         <Carousel
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                    stopOnInteraction: true,
                                })
                            ]}
                         >
                            <CarouselContent>
                                <CarouselItem>
                                    <Image src="https://picsum.photos/600/400?random=1" alt="Promo Banner 1" width={600} height={400} className="w-full h-auto rounded-xl" data-ai-hint="casino promotion"/>
                                </CarouselItem>
                                <CarouselItem>
                                    <Image src="https://picsum.photos/600/400?random=2" alt="Promo Banner 2" width={600} height={400} className="w-full h-auto rounded-xl" data-ai-hint="sports betting"/>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-sm">
                    <Volume2 className="text-primary w-5 h-5"/>
                    <p className="truncate">Welcome to 91Club! Enjoy the best gaming experience.</p>
                </div>

                <div className="my-6 grid grid-cols-3 gap-y-6">
                    {gameIcons.map((game, i) => <GameIcon key={i} {...game} />)}
                     <Link href="/all-games" className="flex flex-col items-center gap-2">
                        <div className="bg-white/10 p-4 rounded-full">
                            <Menu className="w-8 h-8 text-white" />
                        </div>
                        <span className="font-semibold">All Games</span>
                    </Link>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3">Recommended Games</h2>
                    <Carousel 
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                         plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: true,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {recommendedGames.map((game, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
                                    <Link href={game.href}>
                                        <Card className="rounded-xl overflow-hidden bg-gray-800 border-none">
                                            <Image src={`https://picsum.photos/300/200?random=${10+index}`} alt={game.name} width={300} height={200} className="w-full h-auto" data-ai-hint="casino game"/>
                                            <p className="p-2 text-center text-sm font-semibold">{game.name}</p>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

            </main>
            
             <footer className="fixed bottom-0 left-0 right-0 bg-neutral-800/90 backdrop-blur-sm border-t border-white/10 p-2 flex justify-around items-start max-w-lg mx-auto">
                <Link href="/home" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-primary")}>
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs mt-1">{t?.home || 'Home'}</span>
                </Link>
                <Link href="/activity" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
                <Activity className="w-6 h-6" />
                <span className="text-xs mt-1">{t?.activity || 'Activity'}</span>
                </Link>
                <Link href="/promotion" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
                <Landmark className="w-6 h-6" />
                <span className="text-xs mt-1">{t?.promotion || 'Promotion'}</span>
                </Link>
                <Link href="/account" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">{t?.account || 'Account'}</span>
                </Link>
            </footer>
        </div>
    );
}
