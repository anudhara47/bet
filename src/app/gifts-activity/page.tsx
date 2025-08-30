
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const HistoryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="14" height="14" rx="2" fill="#FEE2E2"/>
        <path d="M9 9H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 13H12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#EF4444"/>
        <path d="M15.5 14C15.5 15.1046 13.8807 16 12 16C10.1193 16 8.5 15.1046 8.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9.5" cy="10.5" r="1" fill="white"/>
        <circle cx="14.5" cy="10.5" r="1" fill="white"/>
    </svg>
);

const NoDataIcon = () => (
    <svg width="100" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45.5 8.5H104.5V91.5H45.5V8.5Z" fill="#f3f4f6"/>
        <path d="M37.5 17.5L45.5 8.5V91.5L37.5 82.5V17.5Z" fill="#e5e7eb"/>
        <path d="M45.5 8.5L52.0156 12.5595L57.5 18.5L37.5 17.5L45.5 8.5Z" fill="#e5e7eb"/>
        <path d="M93.3137 68.8137L109.127 53L124.941 68.8137L109.127 84.6274L93.3137 68.8137Z" fill="#f3f4f6"/>
        <circle cx="68.5" cy="88.5" r="5.5" fill="#e5e7eb"/>
    </svg>

)


export default function GiftPage() {
    const [giftCode, setGiftCode] = React.useState("");
    const { toast } = useToast();

    const handleReceive = () => {
        if (!giftCode) {
            toast({
                title: "Please enter a gift code",
                variant: "destructive"
            });
            return;
        }
        toast({
            title: "Gift Received!",
            description: `You have received a gift for code: ${giftCode}`
        })
        setGiftCode("");
    }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-24 max-w-lg mx-auto relative">
        <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
            <Link href="/activity" className="text-gray-800">
                <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="font-semibold text-xl">Gift</h1>
        </header>

        <main className="space-y-4">
            <div className="h-40 relative">
                <Image src="https://picsum.photos/400/200?random=11" layout="fill" objectFit="cover" alt="Gift banner" data-ai-hint="gift box lottery"/>
            </div>

            <div className="px-4 -mt-12 relative z-10">
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="p-4 space-y-3">
                        <div>
                            <p className="font-semibold">Hi</p>
                            <p className="text-sm text-muted-foreground">We have a gift for you</p>
                        </div>
                        <p className="text-sm font-semibold">Please enter the gift code below</p>
                        <Input 
                            placeholder="Please enter gift code" 
                            className="bg-gray-100 border-gray-200 text-center"
                            value={giftCode}
                            onChange={(e) => setGiftCode(e.target.value)}
                        />
                        <Button 
                            className="w-full bg-red-500 hover:bg-red-600 rounded-full py-5 text-lg"
                            onClick={handleReceive}
                        >
                            Receive
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="px-4">
                 <Card className="rounded-xl shadow-lg">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-2">
                           <HistoryIcon />
                           <h3 className="font-bold">History</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center py-8">
                            <NoDataIcon />
                            <p className="text-muted-foreground mt-4">No data</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
        
        <div className="fixed bottom-6 right-6 z-20">
            <Button variant="ghost" size="icon" className="w-14 h-14 bg-white rounded-full shadow-lg">
                <ChatIcon />
            </Button>
        </div>
    </div>
  );
}

    