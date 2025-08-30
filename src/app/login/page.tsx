
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Lock, Phone, User, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { uid, login } = useUser();
    const [mobile, setMobile] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [invitationCode, setInvitationCode] = React.useState('');
    const [agreed, setAgreed] = React.useState(false);

    useEffect(() => {
        if (uid) {
            router.replace('/account');
        }
    }, [uid, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a dummy login. In a real app, you'd call an API.
        if (mobile && password) {
            login(mobile);
            toast({ title: "Login Successful!" });
            router.push('/account');
        } else {
            toast({ title: "Please enter mobile and password.", variant: "destructive" });
        }
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            toast({ title: "Please agree to the privacy policy.", variant: "destructive" });
            return;
        }
        if (password !== confirmPassword) {
            toast({ title: "Passwords do not match.", variant: "destructive" });
            return;
        }
        if (mobile && password) {
            login(mobile); // Use the same login function to simulate registration
            toast({ title: "Registration Successful!" });
            router.push('/account');
        } else {
             toast({ title: "Please fill all required fields.", variant: "destructive" });
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative flex flex-col">
             <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-10">
                <Link href="/" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5"/>
                    <span className="text-sm font-semibold">Customer Service</span>
                </div>
            </header>
            
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 mb-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold text-5xl">
                        9
                    </div>
                </div>

                <Card className="w-full">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <CardContent className="pt-6">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="login-mobile"
                                            type="tel" 
                                            placeholder="Mobile Number" 
                                            className="pl-10" 
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="login-password" 
                                            type="password" 
                                            placeholder="Password" 
                                            className="pl-10" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-3 text-lg">Login</Button>
                                    <div className="text-center text-sm">
                                        <Link href="#" className="text-primary hover:underline">Forgot Password?</Link>
                                    </div>
                                </form>
                            </CardContent>
                        </TabsContent>
                        <TabsContent value="register">
                             <CardContent className="pt-6">
                                <form onSubmit={handleRegister} className="space-y-4">
                                     <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="reg-mobile"
                                            type="tel"
                                            placeholder="Mobile Number"
                                            className="pl-10"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="reg-password"
                                            type="password"
                                            placeholder="Create Password"
                                            className="pl-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="reg-confirm-password"
                                            type="password" 
                                            placeholder="Confirm Password" 
                                            className="pl-10"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                     <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="reg-invite"
                                            type="text" 
                                            placeholder="Invitation Code (Optional)" 
                                            className="pl-10"
                                            value={invitationCode}
                                            onChange={(e) => setInvitationCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                                        </label>
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-3 text-lg">Register</Button>
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>

        </div>
    );
}
