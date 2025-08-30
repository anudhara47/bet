
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Copy, ChevronRight, Diamond } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function PartnerRewardsPage() {
    const { toast } = useToast();
    const invitationLink = "https://91appt.com/#/register?invitationCode=67464927417";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(invitationLink);
        toast({ title: "Invitation link copied!" });
    };

    const invitationStats = [
        { label: "Invitation count", value: "32", color: "text-gray-800" },
        { label: "Effective Invitation count", value: "5", color: "text-green-500" },
        { label: "Invitation total bonus", value: "₹140.00", color: "text-red-500" },
    ];

    const invitationRules = [
        { condition: "₹100 ≤ Amount < ₹500 and Turnover ≥ ₹300", bonus: 28 },
        { condition: "₹500 ≤ Amount < ₹1,200 and Turnover ≥ ₹1,500", bonus: 68 },
        { condition: "₹1,200 ≤ Amount < ₹5,000 and Turnover ≥ ₹3,600", bonus: 128 },
        { condition: "₹5,000 ≤ Amount < ₹12,000 and Turnover ≥ ₹15,000", bonus: 328 },
        { condition: "₹12,000 ≤ Amount < ₹60,000 and Turnover ≥ ₹36,000", bonus: 528 },
        { condition: "Amount ≥ ₹60,000 and Turnover ≥ ₹180,000", bonus: 1888 },
    ];

    const additionalRules = [
        "*Each deposit can only get one bonus.",
        "eg: Player A 1st deposit ₹99.00 and turnover ₹300.00, you can't get bonus",
        "the reward has no limitation, the more you in the more rewards you will get it",
        "If the conditions are met the rewards will be automatically credited to player's balance"
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/promotion" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Partner rewards</h1>
            </header>

            <main className="space-y-4">
                <div className="relative h-40 bg-gradient-to-r from-yellow-300 to-orange-400 flex items-center justify-between p-4">
                    <Image src="https://picsum.photos/400/200?random=1" alt="Rewards Banner" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="trophy gold" />
                    <div className="relative z-10 text-white">
                        <h2 className="text-xl font-bold">Invite friends to get max rewards</h2>
                    </div>
                    <div className="relative z-10 bg-white text-orange-500 font-bold py-2 px-4 rounded-full shadow-lg">
                        ₹1,888.00
                    </div>
                </div>
                
                <div className="px-4 space-y-2">
                    {invitationStats.map((stat, index) => (
                        <Card key={index} className="rounded-lg shadow-sm">
                            <CardContent className="p-3 flex justify-between items-center">
                                <span className="text-muted-foreground">{stat.label}</span>
                                <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="px-4 text-right">
                     <Link href="#" className="text-sm text-red-500 font-semibold flex items-center justify-end">
                        Invitation record <ChevronRight className="w-4 h-4"/>
                    </Link>
                </div>

                <div className="px-4">
                    <h3 className="font-bold mb-1 relative">
                        <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-1 bg-red-500 rounded-full"></span>
                        Invitation link
                    </h3>
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            readOnly
                            value={invitationLink}
                            className="bg-white truncate"
                        />
                        <Button onClick={copyToClipboard} className="bg-red-500 hover:bg-red-600">
                            <Copy className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>

                <div className="px-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-100 flex items-center justify-center rounded">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 22V8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V22L12 18L4 22Z" fill="#F87171"/></svg>
                        </div>
                        Invitation rules
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">If you invites player A, with in <span className="text-red-500 font-bold">7 Day</span></p>

                    <Card>
                        <CardContent className="p-0">
                            <div className="bg-red-500 text-white grid grid-cols-2 text-center py-2 rounded-t-lg">
                                <div>When Player A</div>
                                <div>You get bonus</div>
                            </div>
                            <div className="divide-y">
                                {invitationRules.map((rule, index) => (
                                    <div key={index} className="grid grid-cols-2 items-center text-center">
                                        <div className="p-3 border-r">
                                            {index === 0 && <p className="text-xs text-muted-foreground mb-1">1st deposit</p>}
                                            <p className="text-sm text-gray-800">{rule.condition}</p>
                                        </div>
                                        <div className="p-3">
                                            <span className="font-bold text-red-500 text-lg">₹{rule.bonus}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 space-y-2">
                        {additionalRules.map((rule, index) => (
                             <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                {rule.startsWith('*') ? 
                                    <span className="text-red-500">{rule}</span> :
                                    <>
                                        <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                                        <p>{rule}</p>
                                    </>
                                }
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}

// Dummy Input component to resolve dependency
const Input = ({ ...props }) => (
    <input {...props} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
)
