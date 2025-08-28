
'use client';
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const categories = [
    { name: "lobby", path: "/lobby", colors: "from-sky-400 via-blue-500 to-indigo-500" },
    { name: "mini game", path: "/mini-game", colors: "from-green-400 via-emerald-500 to-teal-500" },
    { name: "card", path: "/card", colors: "from-amber-400 via-orange-500 to-red-500" },
    { name: "sports", path: "/sports", colors: "from-blue-400 via-cyan-500 to-sky-500" },
    { name: "casino", path: "/casino", colors: "from-purple-400 via-fuchsia-500 to-pink-500" },
    { name: "fantasy", path: "/fantasy", colors: "from-yellow-400 via-amber-500 to-orange-500" },
    { name: "Live bet", path: "/live-bet", colors: "from-red-500 via-rose-500 to-pink-500" },
    { name: "All games", path: "/all-games", colors: "from-indigo-400 via-purple-500 to-violet-500" }
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-primary">9</span>
                <span className="text-foreground">X</span>
              </div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Wallet className="h-5 w-5" />
            <div className="flex flex-col gap-1">
              <Button variant="success" size="sm" className="px-2 py-0 h-auto text-[10px]">Deposit</Button>
              <Button variant="destructive" size="sm" className="px-2 py-0 h-auto text-[10px]">Withdrawal</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {categories.map((category) => (
              <CarouselItem key={category.name} className="basis-auto pl-2">
                <div className="p-0">
                  <Link href={category.path}>
                    <Button
                      className={cn(
                        "capitalize w-[60px] h-[50px] text-[10px] text-white font-bold rounded-md border-b-4 border-gray-800/80 transition-all hover:border-b-2 active:border-b-0 active:translate-y-1",
                        "bg-gradient-to-br",
                        category.colors
                      )}
                    >
                      {category.name}
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recommended Games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="w-[100px] h-[100px] shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <Image src={`https://picsum.photos/100/100?random=${index + 200}`} alt={`Game ${index + 1}`} width={100} height={100} data-ai-hint="recommended game" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
}
