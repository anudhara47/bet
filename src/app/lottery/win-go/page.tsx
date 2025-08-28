'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, RefreshCw, History, BarChart2, TrendingUp, Volume2, HelpCircle, Headset, CircleHelp } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4Z"/>
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"/>
    </svg>
);

const DragonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4 11.2c.5-.9.4-2-.2-2.8c-.6-.8-1.5-1.2-2.4-1.2H9.5c-.9 0-1.8.3-2.5.9c-.7.6-1.1 1.4-1.1 2.3c0 .9.4 1.8 1.1 2.5c.7.6 1.6.9 2.5.9h.8c.6 0 1.1-.2 1.5-.6c.4-.4.6-.9.6-1.5c0-.6-.2-1.1-.6-1.5c-.4-.4-.9-.6-1.5-.6H10" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8A8A8A" strokeWidth="1.5"/>
        <circle cx="9" cy="12" r="1.5" fill="#8A8A8A"/>
        <circle cx="15" cy="12" r="1.5" fill="#8A8A8A"/>
    </svg>
);


export default function WinGoPage() {
    const [timeLeft, setTimeLeft] = React.useState(73);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    React.useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: minutes.toString().padStart(2, '0'),
            seconds: remainingSeconds.toString().padStart(2, '0')
        }
    }
    const { minutes, seconds } = formatTime(timeLeft);
    
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    }
    
    const numberButtons = [
        { num: 0, colors: ['violet', 'red'] }, { num: 1, colors: ['green'] }, { num: 2, colors: ['red'] },
        { num: 3, colors: ['green'] }, { num: 4, colors: ['red'] }, { num: 5, colors: ['violet', 'green'] },
        { num: 6, colors: ['red'] }, { num: 7, colors: ['green'] }, { num: 8, colors: ['red'] },
        { num: 9, colors: ['green'] }
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto">
            <header className="bg-[#FE3A60] text-white p-4 flex items-center justify-between sticky top-0 z-10">
                <Link href="/" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center space-x-1">
                    <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">9</span>
                    </div>
                    <span className="font-bold text-lg">91CLUB</span>
                </div>
                <div className="flex items-center gap-3">
                    <Headset className="w-6 h-6" />
                    <CircleHelp className="w-6 h-6" />
                </div>
            </header>

            <main className="space-y-4">
                <div className="bg-[#FE3A60] p-4 pt-2">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className="p-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><WalletIcon/> Wallet balance</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold">₹304.82</p>
                                    <RefreshCw className={cn("w-4 h-4 text-muted-foreground cursor-pointer", isRefreshing && "animate-spin")} onClick={handleRefresh}/>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-gradient-to-r from-red-400 to-red-500 text-white rounded-md px-6 shadow-md">Withdraw</Button>
                                <Button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-md px-6 shadow-md">Deposit</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex items-center bg-red-400/80 text-white rounded-lg p-2 mt-3 text-xs">
                        <Volume2 className="w-5 h-5 mr-2"/>
                        <p>if you experience slow performance or login issues, please ensure a stable internet co</p>
                        <Button variant="ghost" className="ml-auto text-white h-auto p-1 text-xs">Detail</Button>
                    </div>
                </div>

                <div className="px-2">
                    <Tabs defaultValue="30sec" className="w-full">
                        <TabsList className="grid grid-cols-4 bg-transparent p-0 h-auto gap-2">
                            <TabsTrigger value="30sec" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-red-400 text-white border-b-2 border-red-500 data-[state=active]:border-transparent py-3">
                                WinGo 30sec
                            </TabsTrigger>
                            <TabsTrigger value="1min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-3">
                                WinGo 1 Min
                            </TabsTrigger>
                            <TabsTrigger value="3min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-3">
                                WinGo 3 Min
                            </TabsTrigger>
                            <TabsTrigger value="5min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-3">
                                WinGo 5 Min
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="30sec" className="bg-white p-4 rounded-b-lg shadow-md -mt-1">
                            <div className="bg-red-100/50 border border-red-200 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" className="text-red-500 border-red-500 h-6 text-xs px-2"><HelpCircle className="w-3 h-3 mr-1"/>How to play</Button>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Time remaining</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-bold text-lg">WinGo 30sec</p>
                                    <div className="flex items-center gap-1 font-mono text-2xl font-bold">
                                        <span className="bg-gray-800 text-white rounded-md px-2 py-1">0</span>
                                        <span className="bg-gray-800 text-white rounded-md px-2 py-1">{minutes[1]}</span>
                                        <span className="text-gray-800">:</span>
                                        <span className="bg-gray-800 text-white rounded-md px-2 py-1">{seconds[0]}</span>
                                        <span className="bg-gray-800 text-white rounded-md px-2 py-1">{seconds[1]}</span>
                                    </div>
                                </div>
                                <Separator className="my-3"/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        {[0,0,5,1,4].map((n, i) => {
                                            const isViolet = n === 0 || n === 5;
                                            const isGreen = [1,3,7,9].includes(n) || (n===5);
                                            const isRed = [2,4,6,8].includes(n) || (n===0);
                                            return (
                                                <div key={i} className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm",
                                                    isGreen && "bg-green-500",
                                                    isRed && "bg-red-500",
                                                    isViolet && "bg-purple-500"
                                                )}>
                                                    {n}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-sm font-mono">20250828100051956</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 my-4">
                                <Button className="bg-green-500 hover:bg-green-600 text-white py-6 text-lg shadow-md">Green</Button>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white py-6 text-lg shadow-md">Violet</Button>
                                <Button className="bg-red-500 hover:bg-red-600 text-white py-6 text-lg shadow-md">Red</Button>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {numberButtons.map(btn => {
                                    const hasViolet = btn.colors.includes('violet');
                                    const hasGreen = btn.colors.includes('green');
                                    const hasRed = btn.colors.includes('red');
                                    
                                    return(
                                        <Button key={btn.num} variant="outline" className="p-0 h-14 w-14 rounded-full border-2 relative overflow-hidden shadow-sm">
                                            {hasViolet && <span className="absolute top-0 left-0 w-full h-1/2 bg-purple-500"></span>}
                                            {hasGreen && hasRed && <><span className="absolute top-0 left-0 w-1/2 h-full bg-green-500"></span><span className="absolute top-0 right-0 w-1/2 h-full bg-red-500"></span></>}
                                            {!hasViolet && hasGreen && !hasRed && <span className="absolute inset-0 bg-green-500"></span>}
                                            {!hasViolet && !hasGreen && hasRed && <span className="absolute inset-0 bg-red-500"></span>}
                                            <span className="relative text-white font-bold text-2xl">{btn.num}</span>
                                        </Button>
                                    )
                                })}
                                <Button variant="outline" className="p-0 h-14 w-14 rounded-full border-2 relative overflow-hidden shadow-sm">
                                    <span className="absolute inset-0 bg-green-500"></span>
                                    <DragonIcon />
                                </Button>
                            </div>

                             <div className="grid grid-cols-6 gap-2 my-4 items-center">
                                <Button variant="outline" className="text-red-500 border-red-300">Random</Button>
                                <Button className="bg-green-500 text-white shadow-md">X1</Button>
                                <Button variant="outline" className="border-gray-300">X5</Button>
                                <Button variant="outline" className="border-gray-300">X10</Button>
                                <Button variant="outline" className="border-gray-300">X20</Button>
                                <Button variant="outline" className="border-gray-300">X50</Button>
                             </div>
                             
                            <div className="flex items-center justify-between gap-2 relative">
                                <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 text-lg shadow-md">Big</Button>
                                <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-6 text-lg shadow-md">Small</Button>
                                <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-red-500 h-12 w-12 shadow-lg"><ChatIcon /></Button>
                            </div>

                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center max-w-lg mx-auto shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <Button variant="ghost" className="flex flex-col h-auto items-center text-red-500">
                  <History className="w-6 h-6" />
                  <span className="text-xs mt-1">Game history</span>
                </Button>
                <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                  <BarChart2 className="w-6 h-6" />
                  <span className="text-xs mt-1">Chart</span>
                </Button>
                <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-xs mt-1">Follow Strategy</span>
                </Button>
            </footer>

        </div>
    )
}
