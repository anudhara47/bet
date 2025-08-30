
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Landmark, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

const paymentMethods = [
    { id: "upi", name: "UPI", icon: "/icons/upi.svg" },
    { id: "phonepe", name: "PhonePe", icon: "/icons/phonepe.svg" },
    { id: "paytm", name: "Paytm", icon: "/icons/paytm.svg" },
    { id: "googlepay", name: "Google Pay", icon: "/icons/googlepay.svg" },
];

const depositAmounts = [100, 500, 1000, 2000, 5000, 10000];

export default function DepositPage() {
    const { balance, setBalance } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const [selectedMethod, setSelectedMethod] = React.useState("upi");
    const [amount, setAmount] = React.useState(100);
    const [customAmount, setCustomAmount] = React.useState("");

    const handleAmountSelect = (value: number) => {
        setAmount(value);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value && !isNaN(Number(value))) {
            setAmount(Number(value));
        } else if (!value) {
            setAmount(0);
        }
    };

    const handleDeposit = () => {
        if (amount < 100) {
            toast({
                title: "Invalid Amount",
                description: "Minimum deposit amount is ₹100.",
                variant: "destructive",
            });
            return;
        }

        const depositRequest = {
            amount,
            method: selectedMethod,
            timestamp: Date.now(),
            status: 'pending'
        };

        localStorage.setItem('pendingDeposit', JSON.stringify(depositRequest));
        router.push('/deposit/confirm');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Deposit</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Balance</p>
                                <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
                            </div>
                            <RefreshCw className="w-5 h-5 text-muted-foreground cursor-pointer" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h2 className="font-semibold mb-3">Select Payment Method</h2>
                        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                            <div className="space-y-3">
                                {paymentMethods.map(method => (
                                    <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Image src={method.icon} alt={method.name} width={24} height={24} />
                                            <label htmlFor={method.id} className="font-medium">{method.name}</label>
                                        </div>
                                        <RadioGroupItem value={method.id} id={method.id} />
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h2 className="font-semibold mb-3">Select Amount</h2>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {depositAmounts.map(val => (
                                <Button
                                    key={val}
                                    variant={amount === val && !customAmount ? "default" : "outline"}
                                    onClick={() => handleAmountSelect(val)}
                                    className="py-6"
                                >
                                    ₹{val}
                                </Button>
                            ))}
                        </div>
                        <Input
                            type="number"
                            placeholder="Enter custom amount (min. ₹100)"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="text-center text-lg"
                        />
                    </CardContent>
                </Card>

                <Button onClick={handleDeposit} className="w-full bg-red-500 hover:bg-red-600 py-6 text-lg">
                    Deposit
                </Button>
            </main>
        </div>
    );
}
