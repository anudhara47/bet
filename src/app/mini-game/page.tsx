
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const GameCard = ({
  href,
  imageSrc,
  imageHint,
  title,
  subtitle,
  bgColor,
  titleColor,
  subtitleColor,
  topText,
  bonusText,
}: {
  href: string;
  imageSrc: string;
  imageHint: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  titleColor?: string;
  subtitleColor?: string;
  topText?: string;
  bonusText?: string;
}) => (
  <Link href={href}>
    <Card className={`overflow-hidden rounded-xl shadow-lg border-none relative aspect-[4/5] ${bgColor}`}>
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        data-ai-hint={imageHint}
        className="opacity-80"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/60 to-transparent">
        {topText && (
          <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
            {topText}
          </div>
        )}
        {bonusText && (
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 text-4xl font-black ${titleColor || 'text-white'} text-center`}>
                {bonusText}
            </div>
        )}
        <div className="text-center">
            <h3 className={`font-bold text-xl ${titleColor || 'text-white'}`}>{title}</h3>
            {subtitle && <p className={`text-xs font-light ${subtitleColor || 'text-white/80'}`}>{subtitle}</p>}
        </div>
      </div>
    </Card>
  </Link>
);

export default function MiniGamePage() {
  const games = [
    {
      href: "/mini-game/aviator-bonus",
      imageSrc: "https://picsum.photos/300/400?random=1",
      imageHint: "red airplane",
      title: "AVIATOR",
      subtitle: "TB GAME",
      bgColor: "bg-red-800",
      topText: "10 SEC",
      bonusText: "+500%",
      titleColor: "text-amber-300"
    },
    {
      href: "/mini-game/cricket",
      imageSrc: "https://picsum.photos/300/400?random=2",
      imageHint: "cricket player",
      title: "CRICKET",
      subtitle: "TB GAME",
      bgColor: "bg-green-600",
      titleColor: "text-white"
    },
    {
      href: "/mini-game/chicken-road",
      imageSrc: "https://picsum.photos/300/400?random=3",
      imageHint: "cartoon chicken",
      title: "CHICKEN ROAD 2",
      subtitle: "TB GAME",
      bgColor: "bg-red-500",
      titleColor: "text-yellow-300"
    },
    {
      href: "/mini-game/aviator",
      imageSrc: "https://picsum.photos/300/400?random=4",
      imageHint: "yellow airplane sky",
      title: "AVIATOR",
      subtitle: "TB GAME",
      bgColor: "bg-sky-400",
      titleColor: "text-white"
    },
    {
      href: "/mini-game/mines",
      imageSrc: "https://picsum.photos/300/400?random=5",
      imageHint: "gems bombs",
      title: "MINES",
      subtitle: "TB GAME",
      bgColor: "bg-purple-700",
      titleColor: "text-white"
    },
    {
      href: "/mini-game/mines-pro",
      imageSrc: "https://picsum.photos/300/400?random=6",
      imageHint: "gems explosion",
      title: "MINES PRO",
      subtitle: "TB GAME",
      bgColor: "bg-purple-600",
      titleColor: "text-yellow-300"
    },
    {
      href: "/mini-game/limbo",
      imageSrc: "https://picsum.photos/300/400?random=7",
      imageHint: "rocket space",
      title: "LIMBO",
      subtitle: "TB GAME",
      bgColor: "bg-indigo-500",
      bonusText: "500X",
      titleColor: "text-white",
    },
    {
      href: "/mini-game/javelin",
      imageSrc: "https://picsum.photos/300/400?random=8",
      imageHint: "javelin thrower athlete",
      title: "JAVELIN",
      subtitle: "TB GAME",
      bgColor: "bg-orange-400",
      titleColor: "text-white"
    },
    {
      href: "/mini-game/dragon-tiger",
      imageSrc: "https://picsum.photos/300/400?random=9",
      imageHint: "dragon tiger",
      title: "DRAGON TIGER",
      subtitle: "TB GAME",
      bgColor: "bg-cyan-500",
      titleColor: "text-white"
    },
    {
        href: "/mini-game/goal",
        imageSrc: "https://picsum.photos/300/400?random=10",
        imageHint: "soccer goal",
        title: "GOAL",
        subtitle: "TB GAME",
        bgColor: "bg-green-500",
        titleColor: "text-white"
    },
    {
        href: "/mini-game/snakes",
        imageSrc: "https://picsum.photos/300/400?random=11",
        imageHint: "cobra snake jungle",
        title: "SNAKES",
        subtitle: "TB GAME",
        bgColor: "bg-teal-800",
        titleColor: "text-yellow-400"
    },
    {
        href: "/mini-game/dice",
        imageSrc: "https://picsum.photos/300/400?random=12",
        imageHint: "dice game",
        title: "DICE",
        subtitle: "TB GAME",
        bgColor: "bg-pink-600",
        titleColor: "text-white"
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex items-center gap-4">
        <Link href="/" className="text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl">Mini Game</h1>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-3 shadow-lg">
            <div className="bg-white rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16.5V3M15 13.5L12 16.5L9 13.5M21 16.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V16.5"/></svg>
            </div>
            Add to Desktop
        </Button>
      </div>
    </div>
  );
}
