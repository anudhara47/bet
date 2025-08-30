
'use client';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, HelpCircle, History, MessageCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const WheelSegment = ({ rotation, label, icon, isCash }: { rotation: number; label: string; icon?: React.ReactNode; isCash?: boolean }) => (
    <div className="absolute w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
        <div 
            className="absolute w-1/2 h-1/2 bg-yellow-300 origin-bottom-right"
            style={{ 
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                transform: 'rotate(11.25deg) skewX(-22.5deg) scaleX(1.31) translateX(-24.5px) translateY(24.5px)',
            }}
        ></div>
        <div className="absolute w-full h-full flex justify-start items-center pl-4 transform -rotate-90 -translate-x-1/4">
            <div className="flex flex-col items-center text-center -rotate-90 transform -translate-y-4">
                {icon}
                <p className="text-sm font-bold text-red-700 mt-2">{label}</p>
            </div>
        </div>
    </div>
);

const CoinsIcon = () => (
    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="15" fill="#FBBF24"/>
        <circle cx="25" cy="25" r="12" fill="#FDE68A"/>
        <text x="25" y="30" textAnchor="middle" fontSize="12" fill="#F97316" fontWeight="bold">₹</text>
    </svg>
);

const CashIcon = () => (
    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="15" width="40" height="20" rx="3" fill="#4ADE80"/>
        <rect x="10" y="20" width="30" height="10" rx="2" fill="#16A34A"/>
        <circle cx="25" cy="25" r="5" fill="#FDE68A"/>
    </svg>
);


export default function InviteWheelPage() {
    const { toast } = useToast();
    const [timeLeft, setTimeLeft] = React.useState(41 * 3600 + 51 * 60 + 4);
    const [isSpinning, setIsSpinning] = React.useState(false);
    const [rotation, setRotation] = React.useState(0);

    const segments = [
        { label: "₹0-10", icon: <CoinsIcon /> },
        { label: "₹5", icon: <CoinsIcon /> },
        { label: "₹10", icon: <CoinsIcon /> },
        { label: "₹500", icon: <CashIcon />, isCash: true },
        { label: "₹80", icon: <CashIcon />, isCash: true },
        { label: "₹20", icon: <CoinsIcon /> },
        { label: "₹30", icon: <CoinsIcon /> },
        { label: "₹50", icon: <CashIcon />, isCash: true },
    ];
    const segmentAngle = 360 / segments.length;

    const handleSpin = () => {
        if(isSpinning) return;
        setIsSpinning(true);
        const randomSegment = Math.floor(Math.random() * segments.length);
        const targetRotation = 360 * 5 + (360 - (randomSegment * segmentAngle)); 
        setRotation(targetRotation);

        setTimeout(() => {
            const prize = segments[randomSegment].label;
            toast({
                title: "You won!",
                description: `Congratulations, you won ${prize}!`
            });
            setIsSpinning(false);
        }, 5000); // Corresponds to the animation duration
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-400 text-white overflow-hidden max-w-lg mx-auto relative">
            <header className="p-4 flex items-center justify-between sticky top-0 z-20 bg-red-500/80 backdrop-blur-sm">
                <Link href="/activity" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Invite Wheel</h1>
                <div className="flex items-center gap-4">
                    <HelpCircle className="w-6 h-6" />
                    <History className="w-6 h-6" />
                </div>
            </header>

            <main className="flex flex-col items-center justify-center p-4 z-10 relative">
                <div className="text-center">
                    <p className="text-sm opacity-90">my amount({formatTime(timeLeft)})</p>
                    <p className="text-4xl font-bold my-2">₹479.74</p>
                    <Button className="bg-gradient-to-b from-yellow-400 to-orange-500 border-b-4 border-orange-600 rounded-full h-10 px-8 text-orange-900 font-bold shadow-lg text-lg active:border-b-0 active:mt-1">
                        CASH OUT
                    </Button>
                </div>

                <div className="relative w-[340px] h-[340px] mt-8 flex items-center justify-center">
                    {/* Wheel base and pointer */}
                    <div className="absolute w-[340px] h-[340px] bg-red-500 rounded-full shadow-inner"></div>
                    <div className="absolute w-[320px] h-[320px] bg-red-400 rounded-full"></div>
                     <div 
                        className="absolute w-[300px] h-[300px] bg-white rounded-full transition-transform duration-[5000ms] ease-out"
                        style={{ transform: `rotate(${rotation}deg)` }}
                     >
                        {segments.map((seg, i) => (
                           <div key={i} className={`absolute w-full h-full transform origin-center`} style={{ transform: `rotate(${i * segmentAngle}deg)`}}>
                                <div 
                                    className={`absolute w-1/2 h-1/2 origin-bottom-right ${i % 2 === 0 ? 'bg-yellow-100' : 'bg-white'}`}
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                                ></div>
                                <div className="absolute w-1/2 h-1/2 top-0 right-0 p-4 text-center transform -rotate-45 -translate-y-2 -translate-x-2">
                                     <div className="flex flex-col items-center justify-center h-full gap-2">
                                        {seg.icon}
                                        <p className="text-sm font-bold text-red-700">{seg.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="absolute w-32 h-32 bg-red-400 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full flex flex-col items-center justify-center shadow-inner">
                            <p className="text-4xl font-bold text-white">X0</p>
                            <p className="text-xs text-white/90">FREE SPIN</p>
                        </div>
                    </div>

                    {/* Pointer */}
                    <div className="absolute -top-2 w-0 h-0 
                        border-l-[15px] border-l-transparent
                        border-r-[15px] border-r-transparent
                        border-b-[25px] border-b-red-600 z-10">
                    </div>
                    <div className="absolute top-[1px] w-4 h-4 bg-yellow-300 rounded-full z-10"></div>
                </div>
                
                {/* Stand */}
                <div className="w-full h-24 bg-red-500/80 -mt-12 rounded-t-xl"
                    style={{
                        clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)'
                    }}
                ></div>

            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-4 text-center max-w-lg mx-auto z-20">
                <Button onClick={handleSpin} disabled={isSpinning} className="bg-gradient-to-b from-yellow-400 to-orange-500 border-b-4 border-orange-600 rounded-full h-14 px-8 text-orange-900 font-bold shadow-lg text-xl w-full active:border-b-0 active:mt-1">
                    INVITE FRIENDS TO GET SPIN
                </Button>
                <p className="mt-2 text-sm">Only ₹20.26 left to get prize ₹500.00</p>
                <div className="flex justify-between items-center mt-4">
                     <p className="font-bold">Record</p>
                     <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white"/>
                    </div>
                </div>
            </footer>
             {/* Floating coins */}
            <div className="absolute top-1/4 left-4 w-10 h-10 bg-yellow-400/50 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-yellow-400/50 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-yellow-400/50 rounded-full animate-pulse delay-1000"></div>
        </div>
    );
}
