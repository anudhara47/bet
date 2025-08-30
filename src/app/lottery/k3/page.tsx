
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4Z"/>
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"/>
    </svg>
);

const Die = ({ value }: { value: number }) => {
    const dots = [];
    const positions = [
        [], // 0
        [[50, 50]], // 1
        [[30, 30], [70, 70]], // 2
        [[30, 30], [50, 50], [70, 70]], // 3
        [[30, 30], [70, 30], [30, 70], [70, 70]], // 4
        [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]], // 5
        [[30, 30], [70, 30], [30, 50], [70, 50], [30, 70], [70, 70]], // 6
    ];

    if (value > 0 && value <= 6) {
        dots.push(...positions[value].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="8" fill="white" />));
    }

    return (
        <svg width="40" height="40" viewBox="0 0 100 100" className="bg-blue-500 rounded-md shadow-md">
            {dots}
        </svg>
    )
};


const getResultForPeriod = (periodId: string) => {
    // This function will only run on the client, so Math.random is safe here.
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    const sum = dice1 + dice2 + dice3;

    return {
        period: periodId,
        dice: [dice1, dice2, dice3],
        sum: sum,
        size: sum > 10 ? 'Big' : 'Small',
        parity: sum % 2 === 0 ? 'Even' : 'Odd',
    };
};

export default function K3Page() {
    const [gameInterval, setGameInterval] = React.useState(30);
    const [timeLeft, setTimeLeft] = React.useState(0);
    const [periodId, setPeriodId] = React.useState<string | null>(null);
    const [gameHistory, setGameHistory] = React.useState<ReturnType<typeof getResultForPeriod>[]>([]);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isClient, setIsClient] = React.useState(false);
    const [lastResult, setLastResult] = React.useState<ReturnType<typeof getResultForPeriod> | null>(null);

    // Using a fixed base period and time.
    const basePeriod = BigInt("20250830100050825");
    const baseTime = 1724985600000; // A fixed timestamp in the past (e.g., Aug 30, 2024 10:00:00 AM UTC)

    React.useEffect(() => {
        // This ensures the following code only runs on the client
        setIsClient(true);

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
            setPeriodId(currentPeriodId);
            setTimeLeft(newTimeLeft);
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [gameInterval]);
    
    // Effect for updating game history when period changes
    React.useEffect(() => {
        if (!periodId || periodId === "0" || !isClient) return;

        const history = [];
        const currentPeriodBigInt = BigInt(periodId);
        
        const lastPeriodResult = getResultForPeriod((currentPeriodBigInt - BigInt(1)).toString());
        setLastResult(lastPeriodResult);

        // Ensure we don't show history for future periods
        for (let i = 0; i < 10; i++) {
             const pastPeriodId = (currentPeriodBigInt - BigInt(i + 1));
             if(pastPeriodId > 0) {
                history.push(getResultForPeriod(pastPeriodId.toString()));
             }
        }
        setGameHistory(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-10">
                <Link href="/" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center space-x-1">
                    <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">9</span>
                    </div>
                    <span className="font-bold text-lg">K3</span>
                </div>
                <div className="flex items-center gap-3">
                    <Headset className="w-6 h-6" />
                    <CircleHelp className="w-6 h-6" />
                </div>
            </header>

            <main className="space-y-4">
                <div className="bg-blue-500 p-4 pt-2">
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
                    <div className="flex items-center bg-blue-400/80 text-white rounded-lg p-2 mt-3 text-xs">
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
                            <TabsTrigger value="30sec" className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-md rounded-t-lg bg-blue-400 text-white border-b-2 border-blue-500 data-[state=active]:border-transparent py-2 sm:py-3 text-xs sm:text-sm">
                                K3 30s
                            </TabsTrigger>
                            <TabsTrigger value="1min" className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                K3 1m
                            </TabsTrigger>
                            <TabsTrigger value="3min" className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                K3 3m
                            </TabsTrigger>
                            <TabsTrigger value="5min" className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-md rounded-t-lg bg-gray-200 text-gray-500 py-2 sm:py-3 text-xs sm:text-sm">
                                K3 5m
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="30sec" className="bg-white p-2 sm:p-4 rounded-b-lg shadow-md -mt-1">
                            <div className="bg-blue-100/50 border border-blue-200 rounded-lg p-2 sm:p-3">
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" className="text-blue-500 border-blue-500 h-6 text-xs px-2"><HelpCircle className="w-3 h-3 mr-1"/>How to play</Button>
                                    <div className="text-right">
                                        <p className="text-xs sm:text-sm text-muted-foreground">Time remaining</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-bold text-base sm:text-lg">K3 30sec</p>
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
                                    <div className="flex items-center gap-2">
                                        {lastResult ? lastResult.dice.map((die, i) => <Die key={i} value={die} />) : [0,0,0].map((_, i) => <div key={i} className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>)}
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono">{periodId}</p>
                                </div>
                            </div>
                            
                            <p className="text-center text-muted-foreground my-4 text-sm">Choose your bet</p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                               <Button className="bg-gradient-to-b from-orange-400 to-orange-600 text-white py-6 text-lg font-bold shadow-lg border-b-4 border-orange-700 active:border-b-0 active:mt-1">Big</Button>
                               <Button className="bg-gradient-to-b from-blue-400 to-blue-600 text-white py-6 text-lg font-bold shadow-lg border-b-4 border-blue-700 active:border-b-0 active:mt-1">Small</Button>
                               <Button className="bg-gradient-to-b from-green-400 to-green-600 text-white py-6 text-lg font-bold shadow-lg border-b-4 border-green-700 active:border-b-0 active:mt-1">Odd</Button>
                               <Button className="bg-gradient-to-b from-purple-400 to-purple-600 text-white py-6 text-lg font-bold shadow-lg border-b-4 border-purple-700 active:border-b-0 active:mt-1">Even</Button>
                            </div>

                             <div className="grid grid-cols-7 gap-1 sm:gap-2 my-3 sm:my-4 items-center">
                                <Button variant="outline" className="text-blue-500 border-blue-300 text-xs px-1 h-8 sm:h-auto sm:px-2">Random</Button>
                                <Button className="bg-blue-500 text-white shadow-md text-xs px-1 h-8 sm:h-auto sm:px-2">X1</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X5</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X10</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X20</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X50</Button>
                                <Button variant="outline" className="border-gray-300 text-xs px-1 h-8 sm:h-auto sm:px-2">X100</Button>
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
                                    <div className="grid grid-cols-5 bg-blue-500 text-white text-center text-sm py-2 rounded-t-lg">
                                        <div>Period</div>
                                        <div className="col-span-2">Result</div>
                                        <div>Size</div>
                                        <div>Parity</div>
                                    </div>
                                    <div>
                                        {gameHistory.map((item, index) => (
                                            <div key={index} className="grid grid-cols-5 text-center items-center py-3 border-b">
                                                <div className="text-xs text-muted-foreground">{item.period.slice(-6)}</div>
                                                <div className="col-span-2 flex justify-center items-center gap-1">
                                                    {item.dice.map((d, i) => <Die key={i} value={d}/>)}
                                                    <span className="font-bold text-lg ml-2">{item.sum}</span>
                                                </div>
                                                <div className={cn("text-sm font-bold", item.size === 'Big' ? 'text-orange-500' : 'text-blue-500')}>{item.size}</div>
                                                <div className={cn("text-sm font-bold", item.parity === 'Even' ? 'text-purple-500' : 'text-green-500')}>{item.parity}</div>
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
                <Button variant="ghost" className="flex flex-col h-auto items-center text-blue-500">
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

    