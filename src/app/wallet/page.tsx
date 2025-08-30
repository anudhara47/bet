

'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/user-context";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const WalletIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 24V16C40 13.7909 38.2091 12 36 12H10C7.79086 12 6 13.7909 6 16V32C6 34.2091 7.79086 36 10 36H36C38.2091 36 40 34.2091 40 32V28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 24H30C28.3431 24 27 22.6569 27 21V15C27 13.3431 28.3431 12 30 12H42C43.6569 12 45 13.3431 45 15V21C45 22.6569 43.6569 24 42 24Z" fill="white" fillOpacity="0.2"/>
    </svg>
);


const DepositIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="7" width="18" height="11" rx="2" fill="#FDBA74"/>
            <path d="M7 12H11" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </div>
);
  
const WithdrawIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="7" width="18" height="11" rx="2" fill="#93C5FD"/>
            <path d="M13 12H17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </div>
);

const DepositHistoryIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="12" height="16" rx="2" fill="#FCA5A5"/>
            <path d="M9 9H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 13H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </div>
);

const WithdrawHistoryIcon = () => (
     <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="12" height="16" rx="2" fill="#FDE68A"/>
            <path d="M9 9H15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 13H12" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </div>
);


const CircularProgress = ({ percentage, label, amount }: { percentage: number, label: string, amount: number }) => {
    const strokeWidth = 8;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50"
                        cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                        className="text-red-500"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50"
                        cy="50"
                        style={{ transition: 'stroke-dashoffset 0.5s ease 0s', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                    <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-xl font-bold fill-current text-gray-700">
                        {percentage}%
                    </text>
                </svg>
            </div>
            <p className="font-semibold text-lg">₹{amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground -mt-1">{label}</p>
        </div>
    );
};


export default function WalletPage() {
    const { balance, totalDepositAmount } = useUser();
    
    // These are placeholders. You can wire them up to real state management.
    const totalAmount = balance + totalDepositAmount; // Example calculation
    const thirdPartyBalance = 0;

    const mainWalletPercentage = balance > 0 ? 100 : 0;
    const thirdPartyPercentage = 0;

    const historyActions = [
        { icon: <DepositIcon/>, label: "Deposit", href: "/deposit" },
        { icon: <WithdrawIcon/>, label: "Withdraw", href: "/withdraw" },
        { icon: <DepositHistoryIcon/>, label: "Deposit history", href: "/deposit-history" },
        { icon: <WithdrawHistoryIcon/>, label: "Withdrawal history", href: "/withdrawal-history" },
    ];

  return (
    <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
      <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/account" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl">Wallet</h1>
      </header>
        
      <main>
          <div className="bg-red-500 text-white text-center p-6 rounded-b-3xl">
            <div className="flex justify-center mb-2">
                <WalletIcon />
            </div>
            <h2 className="text-sm opacity-80">Total balance</h2>
            <p className="text-4xl font-bold my-2">₹{balance.toFixed(2)}</p>

            <div className="grid grid-cols-2 mt-4">
                <div>
                    <p className="font-bold text-lg">{totalAmount.toLocaleString()}</p>
                    <p className="text-xs opacity-80">Total amount</p>
                </div>
                 <div>
                    <p className="font-bold text-lg">{totalDepositAmount.toLocaleString()}</p>
                    <p className="text-xs opacity-80">Total deposit amount</p>
                </div>
            </div>
          </div>
          
          <div className="p-4 transform -translate-y-8">
            <Card className="rounded-xl shadow-lg">
                <CardContent className="p-4">
                    <div className="flex justify-around items-center">
                        <CircularProgress percentage={mainWalletPercentage} label="Main wallet" amount={balance} />
                        <CircularProgress percentage={thirdPartyPercentage} label="3rd party wallet" amount={thirdPartyBalance} />
                    </div>
                    <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 rounded-full py-6 text-lg">
                        Main wallet transfer
                    </Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4 text-center mt-6">
                {historyActions.map((action, index) => (
                    <Link href={action.href} key={index} className="flex flex-col items-center gap-2 cursor-pointer">
                        {action.icon}
                        <span className="text-xs text-muted-foreground font-medium">{action.label}</span>
                    </Link>
                ))}
            </div>
          </div>
      </main>

    </div>
  );
}
