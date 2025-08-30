
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, MessageCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function FirstGiftPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/activity" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Activity details</h1>
            </header>

            <main className="space-y-4">
                <div className="relative h-48 bg-gradient-to-r from-orange-400 to-red-500 flex flex-col justify-center p-6 text-white">
                    <Image src="https://picsum.photos/400/200?random=5" alt="Banner" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="gift box celebration"/>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold">First gift</h2>
                        <p className="mt-2 text-sm">There are two types of new member gift package rewards:</p>
                        <div className="mt-3 space-y-1 text-xs">
                           <div className="flex items-center gap-2">
                             <div className="bg-white text-orange-500 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">1</div>
                             <span>Bonus for first deposit negative profit</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="bg-white text-orange-500 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">2</div>
                             <span>Play games and get bonuses only for new members</span>
                           </div>
                        </div>
                         <Button variant="outline" className="bg-transparent border-white text-white rounded-full mt-4 h-8 px-4 text-xs">
                           Activity details
                        </Button>
                    </div>
                </div>

                <div className="px-4">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-muted-foreground">Event start time</p>
                            <p className="text-lg font-bold font-mono mt-1">2025-03-10 00:00:00</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="px-4">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-3 text-center font-semibold text-white bg-red-500 rounded-t-xl py-3 text-sm">
                                <div>Conditions of participation</div>
                                <div>Get Compensation Bonus</div>
                                <div>Bonus limit</div>
                            </div>
                            <div className="grid grid-cols-3 text-center items-center py-4">
                                <div className="text-sm px-2">First deposit for new users</div>
                                <div className="text-sm px-2 border-x">Total <span className="text-red-500 font-bold">30%</span> compensation from First Deposit Amount</div>
                                <div className="text-red-500 font-bold px-2">₹150.00</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="px-4">
                    <div className="flex items-center gap-2 p-3 bg-red-100/50 text-red-500 rounded-lg text-sm">
                        <AlertCircle className="w-5 h-5"/>
                        <p>The membership system that meets the standard automatically distributes bonuses</p>
                    </div>
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
