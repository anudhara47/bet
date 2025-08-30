
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
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
        {
            number: "05",
            content: "Commission rates vary depending on your agency level on that day. The commission amounts are automatically sent to the member's account the next day."
        }
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
            </main>
        </div>
    );
}
