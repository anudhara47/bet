
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { ChevronLeft, CheckCircle, MessageCircle, FileText, History, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const bonusTiers = [
    { id: 1, inviteesRequired: 1, rechargeRequired: 300, reward: 55 },
    { id: 2, inviteesRequired: 3, rechargeRequired: 300, reward: 155 },
    { id: 3, inviteesRequired: 10, rechargeRequired: 500, reward: 555 },
    { id: 4, inviteesRequired: 30, rechargeRequired: 800, reward: 1555 },
    { id: 5, inviteesRequired: 50, rechargeRequired: 1200, reward: 2775 },
];

export default function InvitationBonusPage() {
    const { 
        setBalance, 
        invitees, 
        claimedInvitationBonuses, 
        addClaimedInvitationBonus 
    } = useUser();
    const { toast } = useToast();

    const handleClaim = (tierId: number, reward: number) => {
        addClaimedInvitationBonus(tierId);
        setBalance(prev => prev + reward);
        toast({
            title: "Bonus Claimed!",
            description: `You have received a bonus of ₹${reward.toFixed(2)}.`,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/activity" className="text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl text-gray-800">Invitation bonus</h1>
            </header>

            <main className="space-y-4">
                <div className="relative h-40 bg-gradient-to-r from-orange-400 to-red-500 flex flex-col justify-center p-4 text-white">
                     <Image src="https://picsum.photos/400/200?random=3" alt="Banner" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="red envelope gift"/>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold">Invite friends and deposit</h2>
                        <p className="mt-1">Both parties can receive rewards</p>
                        <p className="text-xs mt-2">activity date: 2000-01-01 - 2099-01-01</p>
                    </div>
                </div>

                <div className="px-4 -mt-10 relative z-10">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className="p-2 grid grid-cols-2 gap-2">
                             <Button variant="ghost" className="flex flex-col h-auto items-center text-primary gap-1">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FileText className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="text-xs font-semibold">Invitation reward rules</span>
                            </Button>
                            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground gap-1">
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <History className="w-6 h-6 text-gray-500" />
                                </div>
                                <span className="text-xs font-semibold">Invitation record</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="px-4 space-y-4">
                    {bonusTiers.map(tier => {
                        const isClaimed = claimedInvitationBonuses.includes(tier.id);
                        const canClaim = invitees.count >= tier.inviteesRequired && invitees.rechargedCount >= tier.inviteesRequired;

                        return (
                        <Card key={tier.id} className="rounded-xl shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-green-500 text-white rounded-full px-3 py-1 font-bold flex items-center gap-1.5">
                                            Bonus {tier.id}
                                            {canClaim || isClaimed ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-yellow-500">₹{tier.reward.toFixed(2)}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-3 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Number of invitees</p>
                                        <p className="font-bold text-lg">{tier.inviteesRequired}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Recharge per people</p>
                                        <p className="font-bold text-lg text-red-500">₹{tier.rechargeRequired.toFixed(2)}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 py-3 text-center bg-gray-50 rounded-lg text-sm">
                                    <div>
                                        <p className="font-bold">{Math.min(invitees.count, tier.inviteesRequired)} / {tier.inviteesRequired}</p>
                                        <p className="text-muted-foreground text-xs">Number of invitees</p>
                                    </div>
                                     <div>
                                        <p className="font-bold">{Math.min(invitees.rechargedCount, tier.inviteesRequired)} / {tier.inviteesRequired}</p>
                                        <p className="text-muted-foreground text-xs">Deposit number</p>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full mt-4 text-lg py-6"
                                    disabled={isClaimed || !canClaim}
                                    onClick={() => handleClaim(tier.id, tier.reward)}
                                >
                                    {isClaimed ? 'Received' : (canClaim ? 'Receive' : 'Unfinished')}
                                </Button>
                            </CardContent>
                        </Card>
                    )})}
                </div>

                <div className="fixed bottom-4 right-4 z-20">
                    <Button variant="ghost" size="icon" className="w-14 h-14 bg-white rounded-full shadow-lg">
                        <MessageCircle className="w-8 h-8 text-red-500" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
