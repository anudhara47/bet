
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const RuleCard = ({ number, children }: { number: string, children: React.ReactNode }) => (
    <Card className="rounded-xl shadow-sm overflow-hidden">
        <CardContent className="p-4 relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold text-sm px-6 py-2 rounded-br-xl">
                {number}
            </div>
            <div className="pt-10 text-gray-700">
                {children}
            </div>
        </CardContent>
    </Card>
);

const RebateLevelIcon = ({ level }: { level: number }) => (
    <div className="flex items-center gap-1 justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15.5L2 19L5 18L7.5 21.5L10 18L12.5 21.5L15 18L17.5 21.5L20 18L22 19L19 15.5H5Z" fill="#FBBF24"/>
            <path d="M5 15.5V10.75C5 8.12665 7.12665 6 9.75 6H14.25C16.8734 6 19 8.12665 19 10.75V15.5H5Z" fill="#FDE68A"/>
            <path d="M7.5 2L9 6H15L16.5 2" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-bold text-sm text-yellow-600">L{level}</span>
    </div>
);

const FinalTermIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FEE2E2"/>
    <path d="M7 14.5C7 14.5 8.5 12.5 12 12.5C15.5 12.5 17 14.5 17 14.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9.5" cy="10.5" r="1" fill="#EF4444"/>
    <circle cx="14.5" cy="10.5" r="1" fill="#EF4444"/>
    </svg>
);


export default function InvitationRulesPage() {
    const rules = [
        {
            number: "01",
            content: "There are 6 subordinate levels in inviting friends, if A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A."
        },
        {
            number: "02",
            content: "When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates."
        },
        {
            number: "03",
            content: "The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately."
        },
        {
            number: "04",
            content: "The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation completed, the commission is rewarded to the wallet and can be viewed through the commission collection record."
        },
    ];

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
        { level: 9, teamNumber: 1000, teamBetting: "1,000M", teamDeposit: "" },
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
                <div className="text-center">
                    <h2 className="font-bold text-red-500">[Promotion partner] program</h2>
                    <p className="text-sm text-muted-foreground">This activity is valid for a long time</p>
                </div>
                {rules.map((rule, index) => (
                    <RuleCard key={index} number={rule.number}>
                        <p className="text-sm leading-relaxed">{rule.content}</p>
                    </RuleCard>
                ))}

                 <Card className="rounded-xl shadow-sm overflow-hidden">
                    <CardContent className="p-4 relative">
                        <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold text-sm px-6 py-2 rounded-br-xl">
                            05
                        </div>
                        <div className="pt-10 text-sm text-gray-700 space-y-1">
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
                                <div key={index} className="grid grid-cols-4 items-center text-center text-sm font-semibold text-gray-700 bg-white">
                                    <div className="p-3">
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

                <RuleCard number="06">
                    <div className="text-sm leading-relaxed space-y-2">
                        <p>The commission percentage depends on the membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.</p>
                        <p>The commission rate is specifically explained as follows</p>
                        <Link href="/rebate-ratio" className="text-red-500 font-bold flex items-center">
                            View rebate ratio <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </RuleCard>
                
                <RuleCard number="07">
                    <p className="text-sm leading-relaxed">TOP20 commission rankings will be randomly awarded with a separate bonus</p>
                </RuleCard>

                <RuleCard number="08">
                    <div className="flex justify-between items-center">
                        <p className="text-sm leading-relaxed">The final interpretation of this activity belongs to</p>
                        <FinalTermIcon />
                    </div>
                </RuleCard>

            </main>
        </div>
    );
}

