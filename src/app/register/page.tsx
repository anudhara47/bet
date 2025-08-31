
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, MessageCircle, Eye, EyeOff, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import { Logo } from "@/components/ui/logo";

export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { uid, register } = useUser();
    
    // Register state
    const [registerIdentifier, setRegisterIdentifier] = React.useState('');
    const [registerPassword, setRegisterPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [invitationCode, setInvitationCode] = React.useState('');
    const [agreed, setAgreed] = React.useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    useEffect(() => {
        if (uid) {
            router.replace('/home');
        }
    }, [uid, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            toast({ title: "Please agree to the privacy policy.", variant: "destructive" });
            return;
        }
        if (registerPassword !== confirmPassword) {
            toast({ title: "Passwords do not match.", variant: "destructive" });
            return;
        }
        if (registerIdentifier && registerPassword) {
            const registerStatus = await register(registerIdentifier, registerPassword);
            if (registerStatus === 'success') {
                toast({ title: "Registration Successful!" });
                router.push('/home');
            } else if (registerStatus === 'email-exists') {
                toast({ title: "Registration Failed", description: "This email address is already in use.", variant: "destructive"});
            } else {
                toast({ title: "Registration Failed", description: "An unknown error occurred.", variant: "destructive"});
            }
        } else {
             toast({ title: "Please fill all required fields.", variant: "destructive" });
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative flex flex-col overflow-x-hidden">
             <header className="bg-primary text-primary-foreground p-4 flex items-center justify-end sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5"/>
                    <span className="text-sm font-semibold">Customer Service</span>
                </div>
            </header>
            
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                 <div className="w-32 mb-6 animate-logo-zoom">
                    <Logo />
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <form onSubmit={handleRegister} className="space-y-6">
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input 
                                    id="reg-identifier"
                                    type="email"
                                    placeholder=" "
                                    className="pl-10 peer"
                                    value={registerIdentifier}
                                    onChange={(e) => setRegisterIdentifier(e.target.value)}
                                    required
                                />
                                <Label htmlFor="reg-identifier" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                    Email Address
                                </Label>
                            </div>
                             <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="reg-password"
                                    type={showRegisterPassword ? "text" : "password"}
                                    placeholder=" "
                                    className="pl-10 pr-10 peer"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />
                                <Label htmlFor="reg-password" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                    Create Password
                                </Label>
                                <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">
                                    {showRegisterPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input 
                                    id="reg-confirm-password"
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder=" " 
                                    className="pl-10 pr-10 peer"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Label htmlFor="reg-confirm-password" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                    Confirm Password
                                </Label>
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                             <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input 
                                    id="reg-invite"
                                    type="text" 
                                    placeholder=" "
                                    className="pl-10 peer"
                                    value={invitationCode}
                                    onChange={(e) => setInvitationCode(e.target.value)}
                                />
                                <Label htmlFor="reg-invite" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                    Invitation Code (Optional)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                                </label>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-3 text-lg">Register</Button>
                             <div className="mt-6 text-center text-sm text-muted-foreground">
                                Already have an account?
                                <Link href="/login" className="ml-2 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                                    Login
                                    <ArrowRight className="w-4 h-4"/>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


