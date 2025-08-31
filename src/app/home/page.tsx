
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Activity, Flame, Gamepad2, Gift, Handshake, Heart, HomeIcon, Landmark, LucideIcon, Menu, Rocket, Search, User, Volume2, Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useUser } from "@/context/user-context";
import { useLanguage } from "@/context/language-context";
import { Logo } from "@/components/ui/logo";


const GameIcon = ({ Icon, label, href }: { Icon: React.ElementType, label: string, href: string }) => (
    <Link href={href} className="flex flex-col items-center gap-2">
        <div className="bg-red-100 p-3 rounded-full">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <span className="font-semibold text-sm">{label}</span>
    </Link>
)

const LotteryIcon = (props: any) => <Rocket {...props} />;
const SlotsIcon = (props: any) => (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const SportsIcon = (props: any) => (
     <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12L16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const CasinoIcon = (props: any) => <Heart {...props} />;
const FishingIcon = (props: any) => (
    <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6V12L16.24 7.76Z" fill="currentColor"/>
    </svg>
);
const CardIcon = (props: any) => (
     <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6H4C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    </svg>
);


export default function HomePage() {
    const { uid, nickname } = useUser();
    const { translations } = useLanguage();
    const t = translations.account_page?.footer;

    const gameIcons = [
        { Icon: LotteryIcon, label: "Lottery", href: "/lottery/wingo-30s" },
        { Icon: SlotsIcon, label: "Slots", href: "/slots" },
        { Icon: SportsIcon, label: "Sports", href: "/sports" },
        { Icon: CasinoIcon, label: "Casino", href: "/casino" },
        { Icon: FishingIcon, label: "Fishing", href: "/fishing" },
        { Icon: CardIcon, label: "Card", href: "/card" },
    ];

    const recommendedGames = [
        { name: 'K3', image: '/images/recommend-2.png', href: '/lottery/k3' },
        { name: '5D', image: '/images/recommend-3.png', href: '/lottery/5d' },
    ]

    return (
        <div className="min-h-screen bg-neutral-100 text-gray-800 pb-40 max-w-lg mx-auto">
            <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-red-500/90 backdrop-blur-sm text-white">
                <Logo className="w-28" isLight={true} />
                {uid ? (
                    <div className="flex items-center gap-2 text-sm">
                        <span>{nickname}</span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-5 h-5"/>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/login" className={cn(buttonVariants({variant: 'link', size: 'sm'}), 'text-white')}>Login</Link>
                         <span className="text-white">|</span>
                         <Link href="/login" className={cn(buttonVariants({variant: 'link', size: 'sm'}), 'text-white')}>Sign Up</Link>
                        <Headset className="w-5 h-5 ml-2"/>
                    </div>
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
                                    <Image src="https://picsum.photos/800/300?random=1" alt="Promo Banner 1" width={800} height={300} className="w-full h-auto rounded-xl" data-ai-hint="waterfall stream"/>
                                </CarouselItem>
                                <CarouselItem>
                                    <Image src="https://picsum.photos/800/300?random=2" alt="Promo Banner 2" width={800} height={300} className="w-full h-auto rounded-xl" data-ai-hint="sports betting"/>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded-lg text-sm">
                    <Volume2 className="text-primary w-5 h-5"/>
                    <p className="truncate">Welcome to 9XBETCLUB! Enjoy the best gaming experience.</p>
                </div>

                <div className="my-6 grid grid-cols-3 gap-y-6">
                    {gameIcons.map((game, i) => <GameIcon key={i} {...game} />)}
                     <Link href="/all-games" className="flex flex-col items-center gap-2">
                        <div className="bg-red-100 p-3 rounded-full">
                            <Menu className="w-8 h-8 text-primary" />
                        </div>
                        <span className="font-semibold text-sm">All Games</span>
                    </Link>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3">Recommended Games</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {recommendedGames.map((game, index) => (
                            <Link href={game.href} key={index}>
                                <Card className="rounded-xl overflow-hidden bg-white border-none shadow-md">
                                    <Image src={`https://picsum.photos/300/200?random=${11+index}`} alt={game.name} width={300} height={200} className="w-full h-auto" data-ai-hint={index === 0 ? "forest path" : "woman sunset"}/>
                                    <p className="p-2 text-center text-sm font-semibold">{game.name}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            
             <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-2 flex justify-around items-start max-w-lg mx-auto">
                <Link href="/home" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-red-500")}>
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

    
