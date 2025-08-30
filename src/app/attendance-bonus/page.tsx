
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EF4444"/>
    <path d="M7 14.5C7 14.5 8.5 12.5 12 12.5C15.5 12.5 17 14.5 17 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9.5" cy="10.5" r="1" fill="white"/>
    <circle cx="14.5" cy="10.5" r="1" fill="white"/>
    </svg>
);

const GoldCoinIcon = () => (
    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-inner">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
        </div>
    </div>
);


export default function AttendanceBonusPage() {
    const { toast } = useToast();
    const { setBalance } = useUser();
    const [consecutiveDays, setConsecutiveDays] = React.useState(0);
    const [accumulated, setAccumulated] = React.useState(53);
    const [todayAttended, setTodayAttended] = React.useState(false);

    const dailyRewards = [5, 18, 100, 200, 400, 3000, 7000];

    const handleAttendance = () => {
        if (todayAttended) {
            toast({ title: "You have already checked in today.", variant: "destructive"});
            return;
        }

        const newConsecutiveDays = consecutiveDays + 1;
        const rewardIndex = Math.min(newConsecutiveDays - 1, dailyRewards.length - 1);
        const rewardAmount = dailyRewards[rewardIndex];

        setConsecutiveDays(newConsecutiveDays);
        setAccumulated(prev => prev + rewardAmount);
        setBalance(prev => prev + rewardAmount);
        setTodayAttended(true);

        toast({
            title: "Attendance Successful!",
            description: `You have received a bonus of ₹${rewardAmount.toFixed(2)}.`
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center gap-4">
                <Link href="/activity" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-white">Attendance</h1>
            </header>
            
            <main>
                <div className="relative h-56 bg-gradient-to-b from-red-500 to-red-400 rounded-b-3xl text-white p-4 pt-16 flex flex-col justify-between">
                    <div className="absolute top-10 right-4 w-32 h-32 opacity-80">
                        <Image src="https://picsum.photos/200/200?random=12" alt="Calendar" layout="fill" objectFit="contain" data-ai-hint="calendar pencil"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Attendance bonus</h2>
                        <p className="text-sm opacity-90">Get rewards based on consecutive login days</p>
                    </div>

                    <div className="relative">
                        <div className="bg-white text-red-500 font-bold py-1 px-4 pr-6 rounded-r-full inline-block relative">
                            Attended consecutively <span className="text-lg">{consecutiveDays}</span> Day
                             <div className="absolute right-0 top-0 h-full w-4 bg-red-400" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
                        </div>
                        <div className="mt-2">
                            <p className="text-xs opacity-90">Accumulated</p>
                            <p className="text-2xl font-bold">₹{accumulated.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 absolute bottom-4">
                        <Button size="sm" className="bg-white/20 text-white rounded-full h-8">Game Rules</Button>
                        <Button size="sm" className="bg-white/20 text-white rounded-full h-8">Attendance history</Button>
                    </div>
                </div>

                <div className="p-4 space-y-3 -mt-4">
                    <div className="grid grid-cols-3 gap-3">
                        {dailyRewards.slice(0, 6).map((reward, index) => (
                            <Card key={index} className="rounded-xl shadow-md">
                                <CardContent className="p-3 text-center">
                                    <p className="font-bold text-lg text-gray-800">₹{reward.toFixed(2)}</p>
                                    <div className="flex justify-center my-2">
                                        <GoldCoinIcon />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{index + 1} Day</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                     <Card className="rounded-xl shadow-md">
                        <CardContent className="p-3 flex items-center justify-between">
                             <div className="w-24 h-24 relative -ml-4 -my-4">
                                <Image src="https://picsum.photos/200/200?random=13" alt="Big Gift" layout="fill" objectFit="contain" data-ai-hint="gift box gold coins"/>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl text-red-500">₹{dailyRewards[6].toFixed(2)}</p>
                                <p className="text-muted-foreground">7 Day</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <div className="fixed bottom-24 right-4 z-20">
                <Button variant="ghost" size="icon" className="w-12 h-12 bg-white rounded-full shadow-lg">
                    <ChatIcon />
                </Button>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto bg-gray-100">
                 <Button onClick={handleAttendance} className="w-full bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg shadow-lg">
                    Attendance
                </Button>
            </div>
        </div>
    );
}

