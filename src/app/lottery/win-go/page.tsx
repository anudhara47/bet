
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, RefreshCw, History, BarChart2, TrendingUp, Volume2, HelpCircle, Headset, CircleHelp, ChevronRight } from "lucide-react";
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

const FloatingDragonIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="white" />
        <path d="M20.2667 15.6C20.6 14.9333 20.5333 14.1333 20.0667 13.6C19.6 13.0667 18.9 12.8 18.2 12.8H16.0667C15.3667 12.8 14.7333 13.0333 14.2 13.5C13.6667 13.9667 13.4 14.5667 13.4 15.2C13.4 15.8667 13.6667 16.4667 14.2 16.9333C14.7333 17.4 15.3667 17.6333 16.0667 17.6333H16.6C17.0667 17.6333 17.4667 17.5 17.7333 17.2333C18 16.9667 18.1333 16.6333 18.1333 16.2C18.1333 15.7667 18 15.4333 17.7333 15.1667C17.4667 14.9 17.0667 14.7667 16.5333 14.7667H16.4" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.6933 21.06C11.4194 20.3155 11.2889 19.5312 11.3104 18.745C11.3318 17.9588 11.5048 17.1853 11.8208 16.4639C12.1368 15.7424 12.5901 15.0872 13.1581 14.5367C13.7262 13.9863 14.4001 13.5517 15.1402 13.2642C15.8803 12.9767 16.6713 12.8427 17.4658 12.871C18.2604 12.8993 19.0422 13.0894 19.7699 13.4312C20.4975 13.773 21.159 14.2598 21.7206 14.8631C22.2822 15.4664 22.7328 16.1751 23.0487 16.9535C23.3646 17.7319 23.5401 18.5678 23.5649 19.4187C23.5897 20.2696 23.4635 21.1166 23.1933 21.9133" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8A8A8A" strokeWidth="1.5"/>
        <circle cx="9" cy="12" r="1.5" fill="#8A8A8A"/>
        <circle cx="15" cy="12" r="1.5" fill="#8A8A8A"/>
    </svg>
);

const FloatingChatIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="white" />
        <path d="M16 26C22.0914 26 27 21.0914 27 15C27 8.90861 22.0914 4 16 4C9.90861 4 5 8.90861 5 15C5 21.0914 9.90861 26 16 26Z" stroke="#8A8A8A" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="2" fill="#8A8A8A" />
        <circle cx="20" cy="15" r="2" fill="#8A8A8A" />
    </svg>
);

const getResultForPeriod = (periodId: string) => {
    // Using a client-side RNG
    const newNumber = Math.floor(Math.random() * 10);
    const newColors = [];
    if ([0, 5].includes(newNumber)) newColors.push('purple');
    if ([1, 3, 7, 9, 5].includes(newNumber)) newColors.push('green');
    if ([2, 4, 6, 8, 0].includes(newNumber)) newColors.push('red');

    return {
        period: periodId,
        number: newNumber,
        bigSmall: newNumber >= 5 ? 'Big' : 'Small',
        colors: [...new Set(newColors)]
    };
};

export default function WinGoPage() {
    const [gameInterval, setGameInterval] = React.useState(30);
    const [timeLeft, setTimeLeft] = React.useState(0);
    const [periodId, setPeriodId] = React.useState<string | null>(null);
    const [gameHistory, setGameHistory] = React.useState<ReturnType<typeof getResultForPeriod>[]>([]);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    
    // Using a fixed date now to avoid issues with client/server time differences
    const [baseTime, setBaseTime] = React.useState<number | null>(null);
    const [basePeriod, setBasePeriod] = React.useState<bigint | null>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
        // Set the base time and period only once on the client
        if (baseTime === null || basePeriod === null) {
            setBaseTime(Date.now());
            setBasePeriod(BigInt("20250830100050768"));
        }
    }, [baseTime, basePeriod]);
    

    // Function to calculate the current period ID
    const calculateCurrentPeriod = React.useCallback((interval: number) => {
        if (baseTime === null || basePeriod === null) {
            return { currentPeriodId: "0", newTimeLeft: interval };
        }
        const now = Date.now();
        const diffInSeconds = Math.floor((now - baseTime) / 1000);
        const periodsPassed = Math.floor(diffInSeconds / interval);
        const currentPeriodId = basePeriod + BigInt(periodsPassed);
        
        const secondsIntoCurrentPeriod = diffInSeconds % interval;
        const newTimeLeft = interval - secondsIntoCurrentPeriod;

        return { currentPeriodId: currentPeriodId.toString(), newTimeLeft };
    }, [baseTime, basePeriod]);

    // Effect for initializing and updating the timer
    React.useEffect(() => {
        const updateTimer = () => {
            const { currentPeriodId, newTimeLeft } = calculateCurrentPeriod(gameInterval);
            setPeriodId(currentPeriodId);
            setTimeLeft(newTimeLeft);
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [gameInterval, calculateCurrentPeriod]);
    
    // Effect for updating game history when period changes
    React.useEffect(() => {
        if (!periodId || periodId === "0" || !isClient) return;

        const history = [];
        const currentPeriodBigInt = BigInt(periodId);
        // Ensure we don't show history for future periods if client time is ahead
        for (let i = 0; i < 10; i++) {
             const pastPeriodId = (currentPeriodBigInt - BigInt(i + 1));
             if(pastPeriodId > 0) { // Check to ensure we are not creating negative period Ids
                history.push(getResultForPeriod(pastPeriodId.toString()));
             }
        }
        setGameHistory(history);
    }, [periodId, isClient]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
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

    const getNumberColorClass = (num: number) => {
        if ([0, 5].includes(num)) return 'text-purple-600'; // Special case for 0 and 5
        if ([1, 3, 7, 9].includes(num)) return 'text-green-500';
        if ([2, 4, 6, 8].includes(num)) return 'text-red-500';
        return 'text-gray-800';
    };


    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
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
                        <CardContent className="p-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="w-full sm:w-auto">
                                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1"><WalletIcon/> Wallet balance</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xl sm:text-2xl font-bold">₹304.82</p>
                                    <RefreshCw className={cn("w-4 h-4 text-muted-foreground cursor-pointer", isRefreshing && "animate-spin")} onClick={handleRefresh}/>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button className="bg-gradient-to-r from-red-400 to-red-500 text-white rounded-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-md flex-1">Withdraw</Button>
                                <Button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-md flex-1">Deposit</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex items-center bg-red-400/80 text-white rounded-lg p-2 mt-3 text-xs">
                        <Volume2 className="w-5 h-5 mr-2"/>
                        <p className="truncate">if you experience slow performance or login issues, please ensure a stable internet co</p>
                        <Button variant="ghost" className="ml-auto text-white h-auto p-1 text-xs">Detail</Button>
                    </div>
                </div>

                <div className="px-2">
                    <Tabs defaultValue="30sec" className="w-full" onValueChange={(value) => {
                        if (value === '30sec') setGameInterval(30);
                        if (value === '1min') setGameInterval(60);
                        if (value === '3min') setGameInterval(180);
                        if (value === '5min') setGameInterval(300);
                    }}>
                        <TabsList className="grid grid-cols-4 bg-transparent p-0 h-auto gap-1 sm:gap-2">
                            <TabsTrigger value="30sec" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-red-400 text-white border-b-2 border-red-500 data-[state=active]:border-transparent py-2 sm:py-3 text-xs sm:text-sm">
                                WinGo 30s
                            </TabsTrigger>
                            <TabsTrigger value="1min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                WinGo 1m
                            </TabsTrigger>
                            <TabsTrigger value="3min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                WinGo 3m
                            </TabsTrigger>
                            <TabsTrigger value="5min" className="data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                WinGo 5m
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="30sec" className="bg-white p-2 sm:p-4 rounded-b-lg shadow-md -mt-1">
                            <div className="bg-red-100/50 border border-red-200 rounded-lg p-2 sm:p-3">
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" className="text-red-500 border-red-500 h-6 text-xs px-2"><HelpCircle className="w-3 h-3 mr-1"/>How to play</Button>
                                    <div className="text-right">
                                        <p className="text-xs sm:text-sm text-muted-foreground">Time remaining</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-bold text-base sm:text-lg">WinGo 30sec</p>
                                    <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold">
                                        <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{minutes[0]}</span>
                                        <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{minutes[1]}</span>
                                        <span className="text-gray-800">:</span>
                                        <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{seconds[0]}</span>
                                        <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{seconds[1]}</span>
                                    </div>
                                </div>
                                <Separator className="my-2 sm:my-3"/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        {[5,6,7,8,9].map((n, i) => {
                                            const isViolet = n === 0 || n === 5;
                                            const isGreen = [1,3,7,9].includes(n) || (n===5);
                                            const isRed = [2,4,6,8].includes(n) || (n===0) || (n===6);
                                            return (
                                                <div key={i} className={cn("relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-inner")}>
                                                    <div className={cn("absolute inset-0 rounded-full",
                                                        isGreen && "bg-green-400",
                                                        isRed && "bg-red-400"
                                                    )}></div>
                                                     <div className="absolute inset-0.5 sm:inset-1 rounded-full bg-white"></div>
                                                     <div className={cn("relative w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white",
                                                        isGreen && "bg-green-500",
                                                        isRed && "bg-red-500",
                                                        isViolet && "bg-gradient-to-br from-red-500 to-purple-500"
                                                     )}>
                                                        {n}
                                                     </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono">{periodId}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4">
                                <Button className="bg-gradient-to-b from-green-400 to-green-600 text-white py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg border-b-4 border-green-700 active:border-b-0 active:mt-1">Green</Button>
                                <Button className="bg-gradient-to-b from-purple-400 to-purple-600 text-white py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg border-b-4 border-purple-700 active:border-b-0 active:mt-1">Violet</Button>
                                <Button className="bg-gradient-to-b from-red-400 to-red-600 text-white py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg border-b-4 border-red-700 active:border-b-0 active:mt-1">Red</Button>
                            </div>

                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                                {numberButtons.map(btn => {
                                    const hasViolet = btn.colors.includes('violet');
                                    const hasGreen = btn.colors.includes('green');
                                    const hasRed = btn.colors.includes('red');
                                    
                                    return(
                                        <Button key={btn.num} variant="outline" className="p-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 relative overflow-hidden shadow-md active:mt-0.5">
                                            {hasViolet && hasGreen && <div className="absolute inset-0"><span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-green-400 to-green-600"></span><span className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-purple-400 to-purple-600"></span></div>}
                                            {hasViolet && hasRed && <div className="absolute inset-0"><span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-400 to-red-600"></span><span className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-purple-400 to-purple-600"></span></div>}
                                            {!hasViolet && hasGreen && !hasRed && <span className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600"></span>}
                                            {!hasViolet && !hasGreen && hasRed && <span className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600"></span>}
                                            <span className="relative text-white font-bold text-xl sm:text-2xl" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{btn.num}</span>
                                        </Button>
                                    )
                                })}
                                <Button variant="outline" className="p-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 relative overflow-hidden shadow-md active:mt-0.5">
                                    <span className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600"></span>
                                    <DragonIcon />
                                </Button>
                            </div>

                             <div className="grid grid-cols-7 gap-1 sm:gap-2 my-3 sm:my-4 items-center">
                                <Button variant="outline" className="text-red-500 border-red-300 text-xs px-1 h-8 sm:h-auto sm:px-2">Random</Button>
                                <Button className="bg-green-500 text-white shadow-md text-xs px-1 h-8 sm:h-auto sm:px-2">X1</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X5</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X10</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X20</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X50</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X100</Button>
                             </div>
                             
                            <div className="flex items-center justify-between gap-2 relative">
                                <Button className="w-full bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-600 text-white py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg border-b-4 border-orange-700 active:border-b-0 active:mt-1 rounded-l-full rounded-r-none">Big</Button>
                                <Button className="w-full bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg border-b-4 border-blue-700 active:border-b-0 active:mt-1 rounded-r-full rounded-l-none">Small</Button>
                            </div>

                        </TabsContent>
                    </Tabs>
                </div>
                <div className="px-2 mt-4 relative">
                    <Tabs defaultValue="results" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="results">Game history</TabsTrigger>
                            <TabsTrigger value="chart">Chart</TabsTrigger>
                            <TabsTrigger value="my-bets">My Bets</TabsTrigger>
                        </TabsList>
                        <TabsContent value="results">
                             <Card>
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-4 bg-red-500 text-white text-center text-sm py-2 rounded-t-lg">
                                        <div>Period</div>
                                        <div>Number</div>
                                        <div>Big Small</div>
                                        <div>Color</div>
                                    </div>
                                    <div>
                                        {gameHistory.map((item, index) => (
                                            <div key={index} className="grid grid-cols-4 text-center items-center py-3 border-b">
                                                <div className="text-xs text-muted-foreground">{item.period.slice(-6)}</div>
                                                <div className={cn("font-bold text-lg", getNumberColorClass(item.number))}>
                                                    {item.number}
                                                </div>
                                                <div className="text-sm">{item.bigSmall}</div>
                                                <div className="flex justify-center items-center gap-1">
                                                    {item.colors.map(color => (
                                                        <span key={color} className={cn("w-3 h-3 rounded-full", {
                                                            'bg-red-500': color === 'red',
                                                            'bg-green-500': color === 'green',
                                                            'bg-purple-500': color === 'purple',
                                                        })}></span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center items-center p-4 gap-4">
                                        <Button variant="outline" size="icon" className="rounded-md bg-gray-200">
                                            <ChevronLeft />
                                        </Button>
                                        <span className="text-sm font-medium">1 / 50</span>
                                        <Button variant="destructive" size="icon" className="rounded-md">
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="chart">
                             <Card>
                                <CardContent className="p-4 text-center text-muted-foreground">
                                    Chart will be displayed here.
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="my-bets">
                            <Card>
                                <CardContent className="p-4 text-center text-muted-foreground">
                                    You have no bets yet.
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="absolute right-0 bottom-16 space-y-2">
                        <Button variant="ghost" size="icon" className="p-0 h-auto w-auto">
                            <FloatingDragonIcon />
                        </Button>
                         <Button variant="ghost" size="icon" className="p-0 h-auto w-auto">
                            <FloatingChatIcon />
                        </Button>
                    </div>

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
