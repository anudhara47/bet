

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
import { AviatorIcon, VortexIcon, CricketIcon, ChickenRoadIcon, MinesIcon, LimboIcon, JavelinIcon, DragonTigerIcon, GoalIcon, SnakesIcon, DiceIcon, KingAndPauperIcon, HiloWaveIcon, ClashOfHandsIcon, PlinkoIcon, BombWaveIcon, HiloIcon, TreasureWaveIcon, HotlineIcon, CryptosIcon, SpaceDiceIcon, Goal3DIcon, MiniRouletteIcon } from "@/app/mini-game/page";


const GameIcon = ({ Icon, label, href, active }: { Icon: React.ElementType, label: string, href: string, active?: boolean }) => (
    <Link href={href} className="flex flex-col items-center gap-2 flex-shrink-0 w-20 transition-transform active:scale-95 active:shadow-lg active:shadow-primary/40 rounded-lg p-1">
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

const K3GameCardIcon = () => (
     <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-green-400 to-teal-500">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" rx="3" fill="white" fillOpacity="0.9" />
            <circle cx="9" cy="9" r="1.5" fill="#14B8A6" />
            <circle cx="15" cy="15" r="1.5" fill="#14B8A6" />
        </svg>
    </div>
)

const FiveDGameCardIcon = () => (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-red-500 to-orange-500">
         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V22" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
)

const TrxGameCardIcon = () => (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-sky-400 to-blue-500">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" fillOpacity="0.9"/>
            <path d="M10 8H14" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V16" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
)


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
        { href: "/mini-game/aviator-bonus", imageUrl: "https://picsum.photos/200/200?random=35", label: "AVIATOR BONUS" },
        { href: "/mini-game/vortex", imageUrl: "https://picsum.photos/200/200?random=11", label: "VORTEX" },
        { href: "/mini-game/cricket", imageUrl: "https://picsum.photos/200/200?random=12", label: "CRICKET" },
        { href: "/mini-game/chicken-road", imageUrl: "https://picsum.photos/200/200?random=13", label: "CHICKEN ROAD" },
        { href: "/mini-game/aviator", imageUrl: "https://picsum.photos/200/200?random=14", label: "AVIATOR" },
        { href: "/mini-game/mines", imageUrl: "https://picsum.photos/200/200?random=15", label: "MINES" },
        { href: "/mini-game/mines-pro", imageUrl: "https://picsum.photos/200/200?random=16", label: "MINES PRO" },
        { href: "/mini-game/limbo", imageUrl: "https://picsum.photos/200/200?random=17", label: "LIMBO" },
        { href: "/mini-game/javelin", imageUrl: "https://picsum.photos/200/200?random=18", label: "JAVELIN" },
        { href: "/mini-game/dragon-tiger", imageUrl: "https://picsum.photos/200/200?random=19", label: "DRAGON TIGER" },
        { href: "/mini-game/goal", imageUrl: "https://picsum.photos/200/200?random=20", label: "GOAL" },
        { href: "/mini-game/snakes", imageUrl: "https://picsum.photos/200/200?random=21", label: "SNAKES" },
        { href: "/mini-game/dice", imageUrl: "https://picsum.photos/200/200?random=22", label: "DICE" },
        { href: "/mini-game/king-pauper", imageUrl: "https://picsum.photos/200/200?random=23", label: "KING AND PAUPER" },
        { href: "/mini-game/hilo-wave", imageUrl: "https://picsum.photos/200/200?random=24", label: "HILO WAVE" },
        { href: "/mini-game/clash-of-hands", imageUrl: "https://picsum.photos/200/200?random=25", label: "CLASH OF HANDS" },
        { href: "/mini-game/plinko", imageUrl: "https://picsum.photos/200/200?random=26", label: "PLINKO" },
        { href: "/mini-game/bomb-wave", imageUrl: "https://picsum.photos/200/200?random=27", label: "BOMB WAVE" },
        { href: "/mini-game/hilo", imageUrl: "https://picsum.photos/200/200?random=28", label: "HILO" },
        { href: "/mini-game/treasure-wave", imageUrl: "https://picsum.photos/200/200?random=29", label: "TREASURE WAVE" },
        { href: "/mini-game/hotline", imageUrl: "https://picsum.photos/200/200?random=30", label: "HOTLINE" },
        { href: "/mini-game/cryptos", imageUrl: "https://picsum.photos/200/200?random=31", label: "CRYPTOS" },
        { href: "/mini-game/space-dice", imageUrl: "https://picsum.photos/200/200?random=32", label: "SPACE DICE" },
        { href: "/mini-game/goal", imageUrl: "https://picsum.photos/200/200?random=33", label: "GOAL" },
        { href: "/mini-game/mini-roulette", imageUrl: "https://picsum.photos/200/200?random=34", label: "MINI ROULETTE" },
    ];

    const lotteryGames = [
        { name: 'WINGO', href: '/lottery/wingo-30s', imageUrl: 'https://picsum.photos/400/300?random= wingo' },
        { name: 'K3', href: '/lottery/k3', Icon: K3GameCardIcon },
        { name: '5D', href: '/lottery/5d', Icon: FiveDGameCardIcon },
        { name: 'TRX', href: '/lottery/trx-hash', Icon: TrxGameCardIcon },
    ];

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
                                                ) : i === 2 ? (
                                                    <div className="text-center text-gray-800">
                                                        <p className="text-2xl font-black text-blue-600 drop-shadow-md">WINGO LOTTERY</p>
                                                        <p className="text-lg font-bold">Predict the Color, Win Big!</p>
                                                        <p className="text-sm font-semibold bg-blue-300 px-2 py-1 rounded-md inline-block mt-1">Fast-paced 30-second rounds!</p>
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
                         <Link href="/all-games" className="flex flex-col items-center gap-2 flex-shrink-0 w-20 transition-transform active:scale-95 active:shadow-lg active:shadow-primary/40 rounded-lg p-1">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Menu className="w-8 h-8 text-gray-500" />
                            </div>
                            <span className="font-semibold text-sm text-muted-foreground">All Games</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3">Recommended Games</h2>
                     <Carousel
                        opts={{ loop: true, align: "start" }}
                        plugins={[ Autoplay({ delay: 3000, stopOnInteraction: true }) ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {recommendedGames.map((game, index) => (
                                <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/3">
                                    <Link href={game.href} >
                                        <Card className="rounded-xl overflow-hidden bg-gray-800 border-none shadow-md aspect-square">
                                            <CardContent className="flex flex-col items-center justify-center h-full p-0 relative">
                                                <Image src={game.imageUrl} alt={game.label} layout="fill" className="object-cover" />
                                                <div className="w-full h-full absolute inset-0 bg-black/20"></div>
                                                <p className="p-2 text-center text-sm font-bold text-white absolute bottom-0 bg-black/30 w-full">{game.label}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div className="mt-6">
                    <h2 className="font-bold text-lg mb-3">Lottery</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {lotteryGames.map((game, index) => (
                            <Link href={game.href} key={index}>
                                <Card className="rounded-xl overflow-hidden bg-white border-none shadow-md">
                                    <div className="aspect-[4/3] relative">
                                      {game.imageUrl ? (
                                        <Image src={game.imageUrl} alt={game.name} layout="fill" className="object-cover"/>
                                      ) : (
                                        <game.Icon />
                                      )}
                                    </div>
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
