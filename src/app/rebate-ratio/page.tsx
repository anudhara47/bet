
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const RebateLevelIcon = ({ level }: { level: number }) => (
    <div className="flex items-center gap-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15.5L2 19L5 18L7.5 21.5L10 18L12.5 21.5L15 18L17.5 21.5L20 18L22 19L19 15.5H5Z" fill="#FBBF24"/>
            <path d="M5 15.5V10.75C5 8.12665 7.12665 6 9.75 6H14.25C16.8734 6 19 8.12665 19 10.75V15.5H5Z" fill="#FDE68A"/>
            <path d="M7.5 2L9 6H15L16.5 2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-bold text-sm text-yellow-600">L{level}</span>
    </div>
);


export default function RebateRatioPage() {

    const rebateLevels = [
        { level: 0, teamNumber: 0, teamBetting: "0", teamDeposit: "0" },
        { level: 1, teamNumber: 5, teamBetting: "500K", teamDeposit: "100K" },
        { level: 2, teamNumber: 10, teamBetting: "1,000K", teamDeposit: "200K" },
        { level: 3, teamNumber: 15, teamBetting: "2.50M", teamDeposit: "500K" },
        { level: 4, teamNumber: 20, teamBetting: "3.50M", teamDeposit: "700K" },
        { level: 5, teamNumber: 25, teamBetting: "5M", teamDeposit: "1,000K" },
        { level: 6, teamNumber: 30, teamBetting: "10M", teamDeposit: "2M" },
        { level: 7, teamNumber: 100, teamBetting: "100M", teamDeposit: "20M" },
        { level: 8, teamNumber: 500, teamBetting: "500M", teamDeposit: "100M" },
        { level: 9, teamNumber: 1000, teamBetting: "1,000M", teamDeposit: "" }, // Value is missing in OCR
        { level: 10, teamNumber: 5000, teamBetting: "1,500M", teamDeposit: "300M" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/promotion" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Rules</h1>
            </header>

            <main className="p-4 space-y-4">
                 <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-4 relative">
                        <div className="absolute top-0 left-4 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg">05</div>
                        <div className="pt-8 text-sm text-gray-700 space-y-2">
                             <p>Commission rates vary depending on your agency level on that day.</p>
                             <p><span className="font-bold">Number of Teams:</span> How many downline deposits you have to date.</p>
                             <p><span className="font-bold">Team Deposits:</span> The total number of deposits made by your downline in one day.</p>
                             <p><span className="font-bold">Team Deposit:</span> Your downline deposits within one day.</p>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-0">
                        <div className="bg-red-500 text-white grid grid-cols-4 text-center text-sm font-bold py-3 rounded-t-lg">
                            <div>Rebate level</div>
                            <div>Team Number</div>
                            <div>Team Betting</div>
                            <div>Team Deposit</div>
                        </div>
                        <div className="divide-y">
                            {rebateLevels.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 items-center text-center text-sm font-semibold">
                                    <div className="p-3 flex justify-center">
                                        <RebateLevelIcon level={item.level} />
                                    </div>
                                    <div className="p-3">{item.teamNumber}</div>
                                    <div className="p-3">{item.teamBetting}</div>
                                    <div className="p-3">{item.teamDeposit}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-4 relative">
                        <div className="absolute top-0 left-4 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg">06</div>
                        <div className="pt-8 text-sm text-gray-700">
                             <p>The commission amounts are automatically sent to the member's account the next day.</p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
