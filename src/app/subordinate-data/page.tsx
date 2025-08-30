
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Search, Copy, MessageSquare } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FEE2E2"/>
    <path d="M7 14.5C7 14.5 8.5 12.5 12 12.5C15.5 12.5 17 14.5 17 14.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9.5" cy="10.5" r="1" fill="#EF4444"/>
    <circle cx="14.5" cy="10.5" r="1" fill="#EF4444"/>
    </svg>
);


const summaryData = {
    depositNumber: 1,
    depositAmount: 200,
    bettors: 1,
    totalBet: 759.7,
    firstDepositors: 1,
    firstDepositAmount: 200,
};

const subordinateData = [
    {
        uid: "19863997",
        level: 1,
        depositAmount: 200,
        betAmount: 759.7,
        commission: 2.28,
        time: "2025-08-29",
    },
    {
        uid: "1749827",
        level: 2,
        depositAmount: 0,
        betAmount: 0,
        commission: 0,
        time: "2025-08-29",
    }
];

export default function SubordinateDataPage() {
    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "UID copied!" });
    };

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/promotion" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Subordinate data</h1>
            </header>

            <main className="p-4 space-y-4">
                <div className="flex gap-2">
                    <Input placeholder="Search subordinate UID" className="flex-grow bg-white" />
                    <Button className="bg-red-500 hover:bg-red-600">
                        <Search className="w-5 h-5"/>
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-1/2 bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="direct">Direct</SelectItem>
                            <SelectItem value="team">Team</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="2025-08-29">
                        <SelectTrigger className="w-1/2 bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025-08-29">2025-08-29</SelectItem>
                            <SelectItem value="2025-08-28">2025-08-28</SelectItem>
                            <SelectItem value="2025-08-27">2025-08-27</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="bg-red-500 text-white rounded-lg">
                    <CardContent className="p-4 grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="text-center border-r border-white/30 pr-2">
                            <p className="text-2xl font-bold">{summaryData.depositNumber}</p>
                            <p className="text-xs opacity-90">Deposit number</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{summaryData.depositAmount}</p>
                            <p className="text-xs opacity-90">Deposit amount</p>
                        </div>
                         <div className="text-center border-r border-white/30 pr-2">
                            <p className="text-2xl font-bold">{summaryData.bettors}</p>
                            <p className="text-xs opacity-90">Number of bettors</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{summaryData.totalBet}</p>
                            <p className="text-xs opacity-90">Total bet</p>
                        </div>
                        <div className="text-center border-r border-white/30 pr-2">
                            <p className="text-2xl font-bold">{summaryData.firstDepositors}</p>
                            <p className="text-xs opacity-90">Number of people making first deposit</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{summaryData.firstDepositAmount}</p>
                            <p className="text-xs opacity-90">First deposit amount</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    {subordinateData.map((sub, index) => (
                        <Card key={index} className="bg-white rounded-lg">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">UID:{sub.uid}</h3>
                                        <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={() => copyToClipboard(sub.uid)} />
                                    </div>
                                    {sub.uid === '1749827' && <ChatIcon />}
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <div className="text-muted-foreground">Level</div>
                                    <div className="text-right font-semibold">{sub.level}</div>
                                    <div className="text-muted-foreground">Deposit amount</div>
                                    <div className="text-right font-semibold">{sub.depositAmount}</div>
                                    {sub.betAmount > 0 && (
                                        <>
                                            <div className="text-muted-foreground">Bet amount</div>
                                            <div className="text-right font-semibold">{sub.betAmount}</div>
                                        </>
                                    )}
                                    <div className="text-muted-foreground">Commission</div>
                                    <div className="text-right font-semibold text-red-500">{sub.commission.toFixed(2)}</div>
                                    <div className="text-muted-foreground">Time</div>
                                    <div className="text-right font-semibold">{sub.time}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
