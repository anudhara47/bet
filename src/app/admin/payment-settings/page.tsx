
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    upiId: string;
};

export default function PaymentSettingsPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();
    const { toast } = useToast();
    const [currentUpiId, setCurrentUpiId] = React.useState('');

    React.useEffect(() => {
        const savedUpiId = localStorage.getItem('adminUpiId');
        if (savedUpiId) {
            setCurrentUpiId(savedUpiId);
            setValue('upiId', savedUpiId);
        }
    }, [setValue]);

    const onSave: SubmitHandler<Inputs> = (data) => {
        localStorage.setItem('adminUpiId', data.upiId);
        setCurrentUpiId(data.upiId);
        toast({
            title: "Settings Saved!",
            description: "Your UPI ID has been updated successfully.",
        });
    };

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/dashboard" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Payment Settings</h1>
            </header>

            <main className="p-4">
                <form onSubmit={handleSubmit(onSave)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Deposit Receiver UPI</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="upiId">Your UPI ID</Label>
                                <Input 
                                    id="upiId"
                                    placeholder="e.g., yourname@ybl"
                                    {...register("upiId", { 
                                        required: "UPI ID is required",
                                        pattern: {
                                            value: /^[\w.-]+@[\w.-]+$/,
                                            message: "Invalid UPI ID format"
                                        }
                                    })}
                                />
                                {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>}
                                <p className="text-xs text-muted-foreground">This is the UPI ID where users will send their deposits.</p>
                            </div>

                            <Button type="submit" className="w-full">
                                <Save className="w-4 h-4 mr-2"/>
                                Save Settings
                            </Button>
                        </CardContent>
                    </Card>
                </form>

                {currentUpiId && (
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Current Setting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Users are currently sending payments to:</p>
                            <p className="font-mono font-bold text-lg mt-1">{currentUpiId}</p>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
