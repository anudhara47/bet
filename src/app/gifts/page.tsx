
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { ChevronLeft, Gift } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function GiftsPage() {
    const { balance, setBalance, usedCodes, addUsedCode, redeemGlobalCode } = useUser();
    const [giftCode, setGiftCode] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const handleRedeem = () => {
        setIsLoading(true);

        setTimeout(() => {
            const validCodes = JSON.parse(localStorage.getItem('validGiftCodes') || '[]');

            if (usedCodes.includes(giftCode.toUpperCase())) {
                toast({
                    title: "Gift code already used",
                    description: "You have already redeemed this gift code.",
                    variant: "destructive",
                });
            } else if (validCodes.includes(giftCode.toUpperCase())) {
                const bonusAmount = Math.floor(Math.random() * (200 - 10 + 1)) + 10;
                setBalance(balance + bonusAmount);
                addUsedCode(giftCode.toUpperCase()); // Track that this user has used this code
                redeemGlobalCode(giftCode.toUpperCase()); // Remove from global list

                toast({
                    title: "Success!",
                    description: `You have received a bonus of ₹${bonusAmount.toFixed(2)}.`,
                });
                setGiftCode("");
            } else {
                toast({
                    title: "Invalid or Expired Gift Code",
                    description: "The code you entered is not valid. Please check and try again.",
                    variant: "destructive",
                });
            }
            setIsLoading(false);
        }, 1000);
    };


  return (
    <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
        <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
            <Link href="/account" className="text-white">
                <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="font-bold text-xl">Gifts</h1>
        </header>

        <main className="p-4">
            <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6 text-center">
                    <div className="mx-auto bg-red-100 rounded-full w-20 h-20 flex items-center justify-center">
                        <Gift className="w-12 h-12 text-red-500"/>
                    </div>
                    <h2 className="text-lg font-semibold mt-4">Redeem Gift Code</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the gift code provided by the administrator to receive your bonus.
                    </p>

                    <div className="mt-6 flex flex-col gap-2">
                        <Input 
                            type="text" 
                            placeholder="Enter gift code" 
                            className="text-center tracking-widest font-mono uppercase"
                            value={giftCode}
                            onChange={(e) => setGiftCode(e.target.value)}
                        />
                        <Button 
                            onClick={handleRedeem}
                            disabled={isLoading || !giftCode}
                            className="w-full bg-red-500 hover:bg-red-600"
                        >
                            {isLoading ? "Redeeming..." : "Redeem Now"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

             <Card className="rounded-xl shadow-lg mt-4">
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">How it works</h3>
                    <ul className="text-sm text-muted-foreground list-decimal list-inside space-y-2">
                        <li>Obtain a gift code from official announcements or customer service.</li>
                        <li>Enter the code exactly as provided in the input field above.</li>
                        <li>Click "Redeem Now" to claim your bonus.</li>
                        <li>Each gift code can only be used once.</li>
                        <li>Bonuses are credited to your main wallet balance immediately.</li>
                    </ul>
                </CardContent>
             </Card>
        </main>
    </div>
  );
}
