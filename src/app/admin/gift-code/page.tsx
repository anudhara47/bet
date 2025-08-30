
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";

// Function to generate a random alphanumeric code
const generateGiftCode = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


export default function GiftCodeGeneratorPage() {
    const [validCodes, setValidCodes] = React.useState<string[]>([]);
    const { toast } = useToast();

    React.useEffect(() => {
        const storedCodes = JSON.parse(localStorage.getItem('validGiftCodes') || '[]');
        setValidCodes(storedCodes);
    }, []);

    const handleGenerateCode = () => {
        const newCode = generateGiftCode();
        const updatedCodes = [...validCodes, newCode];
        setValidCodes(updatedCodes);
        localStorage.setItem('validGiftCodes', JSON.stringify(updatedCodes));
        toast({
            title: "New Gift Code Generated!",
            description: `Code: ${newCode}`,
        });
    };
    
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({ title: "Code copied to clipboard!" });
    };

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/deposits" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Gift Code Generator</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate New Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleGenerateCode} className="w-full">
                            Generate New Gift Code
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Gift Codes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {validCodes.length > 0 ? (
                            <div className="space-y-2">
                                {validCodes.map((code) => (
                                    <div key={code} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                                        <span className="font-mono text-lg">{code}</span>
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(code)}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center">No active gift codes.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

