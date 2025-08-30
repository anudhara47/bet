
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, RefreshCw, History, BarChart2, TrendingUp, Volume2, HelpCircle, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4Z"/>
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"/>
    </svg>
);


const ResultDot = ({ color }: { color: 'green' | 'violet' | 'red' | string }) => {
    const colorClass = {
        'green': 'bg-green-500',
        'violet': 'bg-purple-500',
        'red': 'bg-red-500'
    }[color] || 'bg-gray-500';

    return <div className={cn("w-2.5 h-2.5 rounded-full", colorClass)}></div>;
}

const NumberButton = ({ number, color }: { number: number, color: string }) => {
    let colorClasses = '';
    if (color === 'red') colorClasses = 'bg-gradient-to-br from-red-400 to-red-600 border-red-700';
    if (color === 'green') colorClasses = 'bg-gradient-to-br from-green-400 to-green-600 border-green-700';
    if (color === 'violet') colorClasses = 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-700';
    if (color === 'red-violet') colorClasses = 'bg-gradient-to-br from-red-400 via-purple-500 to-red-600 border-purple-700';
    if (color === 'green-violet') colorClasses = 'bg-gradient-to-br from-green-400 via-purple-500 to-green-600 border-purple-700';

    return (
        <Button className={cn("relative w-12 h-12 rounded-full text-white font-bold text-xl shadow-lg border-b-4 active:border-b-0 active:mt-1", colorClasses)}>
            <div className="absolute inset-0 bg-black/10 rounded-full"></div>
            {number}
        </Button>
    )
}

const getResultForPeriod = (periodId: string) => {
    const number = Math.floor(Math.random() * 10);
    let color: 'green' | 'violet' | 'red' | string = 'gray';
    let size: 'Big' | 'Small' = 'Small';

    if ([1, 3, 7, 9].includes(number)) color = 'green';
    if ([2, 4, 6, 8].includes(number)) color = 'red';
    if (number === 5) color = 'green-violet';
    if (number === 0) color = 'red-violet';

    if (number >= 5) size = 'Big';

    return {
        period: periodId,
        number: number,
        size: size,
        color: color,
    };
};

export default function Wingo30sPage() {
    const [gameInterval, setGameInterval] = React.useState(30);
    const [timeLeft, setTimeLeft] = React.useState(0);
    const [periodId, setPeriodId] = React.useState<string | null>(null);
    const [gameHistory, setGameHistory] = React.useState<ReturnType<typeof getResultForPeriod>[]>([]);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isClient, setIsClient] = React.useState(false);
    const [lastResult, setLastResult] = React.useState<ReturnType<typeof getResultForPeriod> | null>(null);

    const basePeriod = BigInt("20250830100050825");
    const baseTime = 1724985600000; 

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        if (!isClient) return;

        const calculateCurrentPeriod = (interval: number) => {
            const now = Date.now();
            const diffInSeconds = Math.floor((now - baseTime) / 1000);
            const periodsPassed = Math.floor(diffInSeconds / interval);
            const currentPeriodId = basePeriod + BigInt(periodsPassed);
            
            const secondsIntoCurrentPeriod = diffInSeconds % interval;
            const newTimeLeft = interval - secondsIntoCurrentPeriod;

            return { currentPeriodId: currentPeriodId.toString(), newTimeLeft };
        };

        const updateTimer = () => {
            const { currentPeriodId, newTimeLeft } = calculateCurrentPeriod(gameInterval);
            if (periodId !== currentPeriodId) {
                setPeriodId(currentPeriodId);
            }
            setTimeLeft(newTimeLeft);
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [isClient, gameInterval, periodId]);
    
    React.useEffect(() => {
        if (!periodId || !isClient) return;

        const history = [];
        const currentPeriodBigInt = BigInt(periodId);

        const lastPeriodResult = getResultForPeriod((currentPeriodBigInt - BigInt(1)).toString());
        setLastResult(lastPeriodResult);

        for (let i = 0; i < 10; i++) {
             const pastPeriodId = currentPeriodBigInt - BigInt(i + 1);
             if (pastPeriodId > 0) {
                history.push(getResultForPeriod(pastPeriodId.toString()));
             }
        }
        setGameHistory(history);
    }, [periodId, isClient]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return { minutes: m, seconds: s };
    }
    
    const { minutes, seconds } = formatTime(timeLeft);
    
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    }
    
    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white text-gray-800 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <Link href="/" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center space-x-1">
                    <div className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">9</span>
                    </div>
                    <span className="font-bold text-lg text-red-600">91 CLUB</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                   <RefreshCw className="w-6 h-6"/>
                </div>
            </header>

            <main className="space-y-4">
                <div className="bg-white p-4 pt-2">
                    <Card className="rounded-xl shadow-lg bg-red-500 text-white">
                        <CardContent className="p-3">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-xs sm:text-sm opacity-80 flex items-center gap-1"> Wallet balance</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xl sm:text-2xl font-bold">₹0.00</p>
                                        <RefreshCw className={cn("w-4 h-4 cursor-pointer", isRefreshing && "animate-spin")} onClick={handleRefresh}/>
                                    </div>
                                </div>
                                <WalletIcon />
                            </div>
                           
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button className="bg-white/90 hover:bg-white text-red-500 rounded-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-md flex-1">Withdraw</Button>
                                <Button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-md px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-md flex-1">Deposit</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex items-center bg-red-100 text-red-700 rounded-lg p-2 mt-3 text-xs">
                        <Volume2 className="w-5 h-5 mr-2"/>
                        <p className="truncate">Only deposit funds through the official 91C LUB website and you can check from our al</p>
                        <Button variant="ghost" className="ml-auto text-red-500 h-auto p-1 text-xs font-bold">Detail</Button>
                    </div>
                </div>

                <div className="px-2">
                    <Tabs defaultValue="30sec" className="w-full">
                        <TabsList className="grid grid-cols-4 bg-transparent p-0 h-auto gap-1 sm:gap-2">
                            <TabsTrigger value="30sec" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-gray-200 text-gray-500 py-2 sm:py-2 text-xs sm:text-sm flex flex-col items-center gap-1 h-auto">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"><Info className="w-4 h-4 text-red-500"/></div>
                                WinGo 30Sec
                            </TabsTrigger>
                            <TabsTrigger value="1min" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-gray-200 text-gray-500 py-2 sm:py-2 text-xs sm:text-sm flex flex-col items-center gap-1 h-auto">
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center"><Info className="w-4 h-4 text-gray-600"/></div>
                                WinGo 1 Min
                            </TabsTrigger>
                             <TabsTrigger value="3min" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-gray-200 text-gray-500 py-2 sm:py-2 text-xs sm:text-sm flex flex-col items-center gap-1 h-auto">
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center"><Info className="w-4 h-4 text-gray-600"/></div>
                                WinGo 3 Min
                            </TabsTrigger>
                             <TabsTrigger value="5min" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg bg-gray-200 text-gray-500 py-2 sm:py-2 text-xs sm:text-sm flex flex-col items-center gap-1 h-auto">
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center"><Info className="w-4 h-4 text-gray-600"/></div>
                                WinGo 5 Min
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="30sec" className="bg-white p-2 sm:p-4 rounded-lg shadow-md mt-2">
                            <div className="bg-red-100/50 border border-red-200 rounded-lg p-2 sm:p-3">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-base sm:text-lg">WinGo 30sec</p>
                                    <Button variant="outline" className="text-red-500 border-red-500 h-6 text-xs px-2"><HelpCircle className="w-3 h-3 mr-1"/>How to play</Button>
                                </div>
                                <Separator className="my-2 sm:my-3"/>
                                <div className="flex justify-between items-center mt-2">
                                     <div className="text-left">
                                        <p className="text-xs sm:text-sm text-muted-foreground">Time remaining</p>
                                        <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold">
                                            <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{minutes[0]}</span>
                                            <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{minutes[1]}</span>
                                            <span className="text-gray-800">:</span>
                                            <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{seconds[0]}</span>
                                            <span className="bg-gray-800 text-white rounded-md px-1.5 py-1 sm:px-2">{seconds[1]}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono text-right">{periodId}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 my-4">
                                <Button className="bg-gradient-to-b from-green-400 to-green-600 text-white py-3 text-md font-bold shadow-lg border-b-4 border-green-700 active:border-b-0 active:mt-1">Green</Button>
                                <Button className="bg-gradient-to-b from-purple-400 to-purple-600 text-white py-3 text-md font-bold shadow-lg border-b-4 border-purple-700 active:border-b-0 active:mt-1">Violet</Button>
                                <Button className="bg-gradient-to-b from-red-400 to-red-600 text-white py-3 text-md font-bold shadow-lg border-b-4 border-red-700 active:border-b-0 active:mt-1">Red</Button>
                            </div>

                            <div className="grid grid-cols-5 gap-2 my-4">
                               <NumberButton number={0} color="red-violet" />
                               <NumberButton number={1} color="green" />
                               <NumberButton number={2} color="red" />
                               <NumberButton number={3} color="green" />
                               <NumberButton number={4} color="red" />
                               <NumberButton number={5} color="green-violet" />
                               <NumberButton number={6} color="red" />
                               <NumberButton number={7} color="green" />
                               <NumberButton number={8} color="red" />
                               <NumberButton number={9} color="green" />
                            </div>

                             <div className="grid grid-cols-7 gap-1 sm:gap-2 my-3 sm:my-4 items-center">
                                <Button variant="outline" className="text-gray-700 border-gray-300 text-xs px-1 h-8 sm:h-9">Random</Button>
                                <Button className="bg-red-500 text-white shadow-md text-xs px-1 h-8 sm:h-9">X1</Button>
                                <Button variant="outline" className="border-gray-300 text-gray-500 text-xs px-1 h-8 sm:h-9">X5</Button>
                                <Button variant="outline" className="border-gray-300 text-gray-500 text-xs px-1 h-8 sm:h-9">X10</Button>
                                <Button variant="outline" className="border-gray-300 text-gray-500 text-xs px-1 h-8 sm:h-9">X20</Button>
                                <Button variant="outline" className="border-gray-300 text-gray-500 text-xs px-1 h-8 sm:h-9">X50</Button>
                                <Button variant="outline" className="border-gray-300 text-gray-500 text-xs px-1 h-8 sm:h-9">X100</Button>
                             </div>

                             <div className="grid grid-cols-2 gap-3 mb-4">
                               <Button className="bg-gradient-to-b from-orange-400 to-orange-500 text-white py-3 text-lg font-bold shadow-lg border-b-4 border-orange-600 active:border-b-0 active:mt-1">Big</Button>
                               <Button className="bg-gradient-to-b from-blue-400 to-blue-500 text-white py-3 text-lg font-bold shadow-lg border-b-4 border-blue-600 active:border-b-0 active:mt-1">Small</Button>
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
                                                <div className={cn("font-bold text-lg", item.color.includes('red') ? 'text-red-500' : 'text-green-500' )}>{item.number}</div>
                                                <div className={cn("text-sm font-bold", item.size === 'Big' ? 'text-orange-500' : 'text-blue-500')}>{item.size}</div>
                                                <div className="flex justify-center items-center gap-1">
                                                    {item.color.includes('red') && <ResultDot color="red"/>}
                                                    {item.color.includes('green') && <ResultDot color="green"/>}
                                                    {item.color.includes('violet') && <ResultDot color="violet"/>}
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

    