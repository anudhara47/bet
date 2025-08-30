
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Copy, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function DepositConfirmPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { uid } = useUser();
    const [pendingDeposit, setPendingDeposit] = React.useState<{ amount: number; method: string } | null>(null);
    const [utr, setUtr] = React.useState("");
    const [screenshot, setScreenshot] = React.useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const upiId = "9xbetclub-official@ybl";

    React.useEffect(() => {
        const storedDeposit = localStorage.getItem('pendingDeposit');
        if (storedDeposit) {
            setPendingDeposit(JSON.parse(storedDeposit));
        } else {
            router.push('/deposit');
        }
    }, [router]);

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setScreenshot(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(upiId);
        toast({ title: "UPI ID copied to clipboard!" });
    };

    const handleSubmit = () => {
        const utrRegex = /^\d{12}$/;
        if (!utrRegex.test(utr)) {
            toast({
                title: "Invalid UTR",
                description: "Please enter a valid 12-digit UTR number.",
                variant: "destructive"
            });
            return;
        }

        if (!screenshot) {
            toast({
                title: "Missing Information",
                description: "Please provide a payment screenshot.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.readAsDataURL(screenshot);
        reader.onload = () => {
            const screenshotDataUrl = reader.result as string;

            const newRequest = {
                id: `DEP-${Date.now()}`,
                userId: uid,
                amount: pendingDeposit?.amount,
                method: pendingDeposit?.method,
                utr,
                screenshot: screenshotDataUrl,
                timestamp: Date.now(),
                status: 'pending',
            };

            // Simulate sending to admin panel by storing in localStorage
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
        };
        reader.onerror = () => {
            toast({ title: "Could not process screenshot. Please try again.", variant: "destructive" });
            setIsLoading(false);
        }
    };

    if (!pendingDeposit) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/deposit" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Confirm Deposit</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardContent className="p-6 text-center space-y-4">
                        <h2 className="text-lg font-semibold">Scan QR Code to Pay</h2>
                        <p className="text-muted-foreground">Pay ₹{pendingDeposit.amount.toFixed(2)} to complete your deposit.</p>
                        <div className="flex justify-center">
                            <Image src="/icons/qr-code.svg" alt="QR Code" width={200} height={200} />
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Or pay to this UPI ID</p>
                            <div className="flex items-center justify-center gap-2 mt-1 font-semibold text-lg">
                                <span>{upiId}</span>
                                <Copy onClick={copyToClipboard} className="w-5 h-5 text-muted-foreground cursor-pointer"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Submit Payment Proof</h2>
                        <div className="space-y-2">
                            <Label htmlFor="utr">UTR / Transaction ID</Label>
                            <Input 
                                id="utr" 
                                placeholder="Enter the 12-digit UTR number" 
                                value={utr}
                                onChange={(e) => setUtr(e.target.value)}
                                maxLength={12}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="screenshot">Upload Screenshot</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="screenshot-input" className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    {screenshotPreview ? (
                                        <Image src={screenshotPreview} alt="Screenshot preview" layout="fill" objectFit="contain" className="rounded-lg p-2"/>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                                        </div>
                                    )}
                                    <input id="screenshot-input" type="file" className="hidden" onChange={handleScreenshotChange} accept="image/*" />
                                </label>
                            </div> 
                        </div>
                    </CardContent>
                </Card>

                 <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-red-500 hover:bg-red-600 py-6 text-lg">
                    {isLoading ? "Submitting..." : "Submit for Review"}
                </Button>
            </main>
        </div>
    );
}
