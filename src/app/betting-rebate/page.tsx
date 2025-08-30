
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Receipt } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const LotteryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
);

const CasinoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 10H14" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8V12" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const AllIcon = () => (
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor"/>
        <rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor"/>
        <rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor"/>
        <rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/>
    </svg>
);

const RebateHistoryItem = ({ title, date, status, details }: { title: string, date: string, status: string, details: { label: string, value: string | number }[] }) => (
    <Card className="rounded-xl shadow-sm">
        <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold">{title}</h4>
                <span className="text-xs text-muted-foreground">{date}</span>
            </div>
            <div className="relative pl-5">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-red-200"></div>
                {details.map((detail, index) => (
                     <div key={index} className="flex justify-between items-center py-2 relative">
                        <div className="absolute -left-[1.2rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-red-300"></div>
                        <span className="text-sm text-muted-foreground">{detail.label}</span>
                        <span className="font-semibold text-red-500">{detail.value}</span>
                    </div>
                ))}
            </div>
            <div className="text-right text-sm font-semibold text-green-500 mt-2">
                {status}
            </div>
        </CardContent>
    </Card>
);


export default function BettingRebatePage() {
    const { toast } = useToast();

    const handleRebateClaim = () => {
        toast({
            title: "Rebate Claimed!",
            description: "Your rebate has been added to your wallet."
        });
    }

    const rebateHistory = {
        lottery: [
            { date: "2025-08-29 15:23:21", status: "Completed", details: [{ label: "Betting rebate", value: 1 }, { label: "Rebate rate", value: "0.05%" }, { label: "Rebate amount", value: 0 }] }
        ],
        slots: [
            { date: "2025-08-29 15:23:21", status: "Completed", details: [{ label: "Betting rebate", value: 520 }, { label: "Rebate rate", value: "0.05%" }, { label: "Rebate amount", value: 0.26 }] }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/activity" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Rebate</h1>
            </header>
            
            <main className="p-4 space-y-4">
                 <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 h-auto gap-2">
                        <TabsTrigger value="all" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-white text-gray-500 py-2 text-sm flex flex-col items-center justify-center gap-1 h-auto">
                            <AllIcon /> All
                        </TabsTrigger>
                        <TabsTrigger value="lottery" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-white text-gray-500 py-2 text-sm flex flex-col items-center justify-center gap-1 h-auto">
                           <LotteryIcon /> Lottery
                        </TabsTrigger>
                        <TabsTrigger value="casino" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-white text-gray-500 py-2 text-sm flex flex-col items-center justify-center gap-1 h-auto">
                            <CasinoIcon /> Casino
                        </TabsTrigger>
                         <TabsTrigger value="rummy" disabled className="rounded-lg bg-white text-gray-500 py-2 text-sm flex flex-col items-center justify-center gap-1 h-auto opacity-50">
                            Rummy
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                         <Card className="rounded-xl shadow-lg">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">All-Total betting rebate</h3>
                                    <div className="border border-red-500 text-red-500 rounded-full px-2 py-0.5 text-xs font-semibold">
                                        Real-time count
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Receipt className="w-8 h-8 text-red-500"/>
                                    <p className="text-3xl font-bold text-red-500">514.06</p>
                                </div>
                                <p className="text-sm text-red-400">Upgrade VIP level to increase rebate rate</p>
                                <div className="grid grid-cols-2 text-center my-2 bg-gray-50 p-2 rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Today rebate</p>
                                        <p className="font-bold text-lg">0</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-muted-foreground">Total rebate</p>
                                        <p className="font-bold text-lg">0.76</p>
                                    </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">Automatic code washing at 01:00:00 every morning</p>
                                <Button onClick={handleRebateClaim} className="w-full bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg">
                                    One-Click Rebate
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <div className="mt-6">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                <span className="w-1 h-5 bg-red-500 rounded-full"></span>
                                Rebate history
                            </h3>
                            <div className="space-y-3">
                                <RebateHistoryItem title="Lottery" {...rebateHistory.lottery[0]} />
                                <RebateHistoryItem title="Slots" {...rebateHistory.slots[0]} />
                            </div>
                        </div>

                    </TabsContent>
                 </Tabs>
            </main>
        </div>
    );
}

    