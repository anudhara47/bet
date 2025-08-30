
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Crown, MessageCircle, FileText, Grid3x3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const RuleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="18" rx="2" fill="#FEE2E2"/>
    <path d="M9 8H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 12H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 16H12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const WinningStarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#EF4444"/>
    </svg>
);

const PlaceholderJackpotIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5H80C82.7614 5 85 7.23858 85 10V90C85 92.7614 82.7614 95 80 95H20C17.2386 95 15 92.7614 15 90V10C15 7.23858 17.2386 5 20 5Z" fill="#e5e7eb"/>
        <path d="M25 15H75V60H25V15Z" fill="#d1d5db"/>
        <path d="M55 70H75V85H55V70Z" fill="#d1d5db"/>
        <path d="M30 75L45 70L30 65V75Z" fill="#e5e7eb" />
        <path d="M60 40L70 45L60 50V40Z" fill="#e5e7eb" />
    </svg>

);

export default function SuperJackpotPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/activity" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Super Jackpot</h1>
            </header>
            
            <main className="space-y-4">
                <div className="relative h-40 bg-gradient-to-r from-orange-400 to-red-500 flex flex-col justify-center p-6 text-white">
                    <Image src="https://picsum.photos/400/200?random=4" alt="Banner" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="gift box celebration"/>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold">Super Jackpot</h2>
                        <p className="mt-1 text-sm">When you get the Super Jackpot in 【Slots】Can get 1 additional bonus</p>
                        <p className="text-xs mt-2 opacity-80">The reward is valid for 1 day, and you will not be able to claim it after it expires!</p>
                    </div>
                </div>

                <div className="px-4">
                     <Button variant="secondary" className="w-full justify-center bg-gray-200 text-gray-700 py-5 rounded-lg shadow-sm">
                        <Grid3x3 className="w-5 h-5 mr-2"/>
                        Receive in batches
                    </Button>
                </div>

                <div className="px-4 grid grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-white py-6 flex-col h-auto gap-1">
                        <RuleIcon />
                        <span className="font-semibold text-gray-700">Rule</span>
                    </Button>
                     <Button variant="outline" className="bg-white py-6 flex-col h-auto gap-1">
                        <WinningStarIcon />
                        <span className="font-semibold text-gray-700">Winning star</span>
                    </Button>
                </div>
                
                <div className="pt-8 text-center flex flex-col items-center justify-center space-y-4">
                    <PlaceholderJackpotIcon />
                    <p className="text-muted-foreground">You don't have a big jackpot yet, let's bet</p>
                </div>

                <div className="px-4 mt-8">
                     <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 text-lg rounded-full">
                        Go bet
                    </Button>
                </div>
            </main>

             <div className="fixed bottom-6 right-6 z-20">
                <Button variant="ghost" size="icon" className="w-14 h-14 bg-red-500/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-500">
                    <MessageCircle className="w-8 h-8 text-white" />
                </Button>
            </div>
        </div>
    );
}
