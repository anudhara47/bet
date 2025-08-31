

'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Activity, Flame, Gamepad2, Gift, Handshake, Heart, HomeIcon, Landmark, LucideIcon, Menu, Rocket, Search, User, Volume2, Headset, Wallet, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useUser } from "@/context/user-context";
import { useLanguage } from "@/context/language-context";


const GameIcon = ({ Icon, label, href, active }: { Icon: React.ElementType, label: string, href: string, active?: boolean }) => (
    <Link href={href} className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
        <div className={cn("p-3 rounded-full", active ? "bg-primary/20" : "bg-gray-100")}>
            <Icon className={cn("w-8 h-8", active ? "text-primary" : "text-gray-500")} />
        </div>
        <span className={cn("font-semibold text-sm", active ? "text-primary" : "text-muted-foreground")}>{label}</span>
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
const MiniGameIcon = (props: any) => <Gamepad2 {...props} />;
const HotIcon = (props: any) => <Flame {...props} />;


export default function HomePage() {
    const { uid, nickname, balance } = useUser();
    const { translations } = useLanguage();
    const t = translations.account_page?.footer;

    const gameIcons = [
        { Icon: LotteryIcon, label: "Lottery", href: "/lottery/wingo-30s" },
        { Icon: SlotsIcon, label: "Slots", href: "/slots" },
        { Icon: SportsIcon, label: "Sports", href: "/sports" },
        { Icon: CasinoIcon, label: "Casino", href: "/casino" },
        { Icon: FishingIcon, label: "Fishing", href: "/fishing" },
        { Icon: CardIcon, label: "Card", href: "/card" },
        { Icon: MiniGameIcon, label: "Mini Game", href: "/mini-game"},
        { Icon: HotIcon, label: "Hot", href: "/hot-games"},
    ];

    const recommendedGames = [
        { name: 'K3', image: '/images/recommend-2.png', href: '/lottery/k3' },
        { name: '5D', image: '/images/recommend-3.png', href: '/lottery/5d' },
    ]

    const carouselCards = Array.from({ length: 8 });

    return (
        <div className="min-h-screen bg-neutral-100 text-gray-800 pb-40 max-w-lg mx-auto">
            <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-primary/90 backdrop-blur-sm text-white">
                <h1 className="text-2xl font-bold text-white">9xbetclub</h1>
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
                         <Link href="/register" className={cn(buttonVariants({variant: 'link', size: 'sm'}), 'text-white')}>Sign Up</Link>
                        <Headset className="w-5 h-5 ml-2"/>
                    </div>
                )}
            </header>

            <main className="px-4">
                 <Card className="rounded-xl my-4 bg-gray-800 text-white">
                    <CardContent className="p-4 flex justify-between items-center">
                        <Link href="/deposit" className={cn(buttonVariants({variant: 'success'}))}>
                            <PlusCircle />
                            Deposit
                        </Link>
                        <Link href="/wallet" className="text-center">
                            <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto border-2 border-yellow-400">
                                <Wallet className="w-6 h-6 text-yellow-300"/>
                            </div>
                            <p className="font-bold mt-1">₹{balance.toFixed(2)}</p>
                        </Link>
                        <Link href="/withdraw" className={cn(buttonVariants({variant: 'destructive'}))}>
                            <MinusCircle />
                            Withdraw
                        </Link>
                    </CardContent>
                </Card>

                <Card className="rounded-xl overflow-hidden my-4 bg-transparent border-none">
                    <CardContent className="p-0">
                         <Carousel
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                    stopOnInteraction: true,
                                })
                            ]}
                         >
                            <CarouselContent>
                                {carouselCards.map((_, i) => (
                                <CarouselItem key={i}>
                                    <Link href={i === 0 ? "/deposit" : "/all-games"}>
                                        <Card className="rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 aspect-[8/3]">
                                            <CardContent className="flex flex-col items-center justify-center p-3 h-full">
                                                {i === 0 ? (
                                                    <p className="text-xl font-bold text-center text-gray-700">
                                                        Get <span className="text-red-500">100% bonus</span> on your first deposit.
                                                        <br />
                                                        <span className="text-sm">Claim from the office after depositing.</span>
                                                    </p>
                                                ) : i === 1 ? (
                                                    <div className="text-center text-gray-800">
                                                        <p className="text-2xl font-black text-red-600 drop-shadow-md">AVIATOR</p>
                                                        <p className="text-lg font-bold">Play and earn more</p>
                                                        <p className="text-sm font-semibold bg-yellow-400 px-2 py-1 rounded-md inline-block mt-1">Up to 99x cash out!</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl font-bold text-gray-700">Card {i + 1}</span>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 p-2 rounded-lg text-sm">
                    <Volume2 className="text-primary w-5 h-5"/>
                    <p className="truncate">Welcome to 9XBETCLUB! Enjoy the best gaming experience.</p>
                </div>

                <div className="my-6">
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                         {gameIcons.map((game, i) => <GameIcon key={i} {...game} />)}
                         <Link href="/all-games" className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Menu className="w-8 h-8 text-gray-500" />
                            </div>
                            <span className="font-semibold text-sm text-muted-foreground">All Games</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3">Recommended Games</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {recommendedGames.map((game, index) => (
                            <Link href={game.href} key={index}>
                                <Card className="rounded-xl overflow-hidden bg-white border-none shadow-md">
                                    <Image src={`https://picsum.photos/300/200?random=${11+index}`} alt={game.name} width={300} height={200} className="w-full h-auto" data-ai-hint={index === 0 ? "aviator airplane" : "wingo lottery"}/>
                                    <p className="p-2 text-center text-sm font-semibold">{game.name}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            
             <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-2 flex justify-around items-start max-w-lg mx-auto">
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
