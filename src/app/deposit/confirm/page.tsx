
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import Script from 'next/script';


export default function DepositConfirmPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { uid } = useUser();
    const [pendingDeposit, setPendingDeposit] = React.useState<{ amount: number; method: string } | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const key_id = 'rzp_test_RBz3gDZKs0ykVK';

    React.useEffect(() => {
        const storedDeposit = localStorage.getItem('pendingDeposit');
        if (storedDeposit) {
            setPendingDeposit(JSON.parse(storedDeposit));
        } else {
            router.push('/deposit');
        }
    }, [router]);
    
    const handlePaymentSuccess = (response: any) => {
        const newRequest = {
            id: `DEP-${Date.now()}`,
            userId: uid,
            amount: pendingDeposit?.amount,
            method: 'Razorpay',
            razorpay_payment_id: response.razorpay_payment_id,
            timestamp: Date.now(),
            status: 'pending',
        };

        const existingRequests = JSON.parse(localStorage.getItem('depositRequests') || '[]');
        localStorage.setItem('depositRequests', JSON.stringify([newRequest, ...existingRequests]));
        
        localStorage.removeItem('pendingDeposit');

        toast({
            title: "Deposit Request Submitted",
            description: "Your request is under review. Please wait for admin approval.",
        });

        setTimeout(() => {
            router.push('/account');
            setIsLoading(false);
        }, 1500);
    }

    const openRazorpayCheckout = () => {
        setIsLoading(true);
        const options = {
            key: key_id,
            amount: (pendingDeposit?.amount ?? 0) * 100, // Amount in paise
            currency: "INR",
            name: "9XBETCLUB",
            description: "Deposit to Wallet",
            image: "/logo.png", // Add a logo if you have one in /public
            handler: handlePaymentSuccess,
            prefill: {
                name: "Test User",
                email: "test.user@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
                userId: uid,
            },
            theme: {
                color: "#F87171",
            },
        };
        
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any){
            toast({
                title: "Payment Failed",
                description: response.error.description,
                variant: 'destructive'
            });
            setIsLoading(false);
        });
        rzp.open();
    };


    if (!pendingDeposit) {
        return null;
    }

    return (
        <>
        <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/deposit" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Confirm Deposit</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardContent className="p-6 text-center space-y-4">
                        <h2 className="text-lg font-semibold">Complete Your Payment</h2>
                        <p className="text-4xl font-bold text-primary">₹{pendingDeposit.amount.toFixed(2)}</p>
                        <p className="text-muted-foreground">You are about to deposit funds into your wallet. Please proceed with the payment.</p>
                    </CardContent>
                </Card>

                 <Button onClick={openRazorpayCheckout} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                    {isLoading ? "Processing..." : "Pay with Razorpay"}
                </Button>
            </main>
        </div>
        </>
    );
}
