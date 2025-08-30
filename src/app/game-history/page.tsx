
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWingoGame } from "@/context/wingo-game-context";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function GameHistoryPage() {
    const { myBets } = useWingoGame();

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Game History</h1>
            </header>

            <main className="p-4">
                <Card>
                    <CardContent className="p-0">
                       <div className="grid grid-cols-4 bg-red-500 text-white text-center text-sm py-2 rounded-t-lg">
                            <div>Period</div>
                            <div>Selection</div>
                            <div>Amount</div>
                            <div>Status</div>
                        </div>
                        {myBets.length > 0 ? (
                        <div>
                            {myBets.slice().reverse().map((bet, index) => (
                                <div key={index} className="grid grid-cols-4 text-center items-center py-3 border-b">
                                    <div className="text-xs text-muted-foreground">{bet.period}</div>
                                    <div className="font-semibold">{bet.selection}</div>
                                    <div className="font-semibold">{bet.amount}</div>
                                    <div className={cn("font-bold", 
                                        bet.status === 'Win' ? 'text-green-500' : 
                                        bet.status === 'Loss' ? 'text-red-500' :
                                        'text-gray-500'
                                    )}>
                                        {bet.status}
                                        {bet.status !== 'Pending' && `(${bet.result?.number})`}
                                    </div>
                                </div>
                            ))}
                        </div>
                         ) : (
                            <div className="p-4 text-center text-muted-foreground">You have no game history yet.</div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
