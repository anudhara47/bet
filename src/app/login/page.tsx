
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, MessageCircle, Eye, EyeOff, Mail, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { uid, login, register } = useUser();
    
    // Login state
    const [loginIdentifier, setLoginIdentifier] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [showLoginPassword, setShowLoginPassword] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState(false);
    
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loginIdentifier && loginPassword) {
            setLoginLoading(true);
            setLoginSuccess(false);

            const loginStatus = await login(loginIdentifier, loginPassword);

            setLoginLoading(false);

            if (loginStatus === 'success') {
                setLoginSuccess(true);
                toast({ title: "Login Successful!" });
                setTimeout(() => {
                    router.push('/home');
                }, 1000); // 1-second delay to show success state
            } else if (loginStatus === 'blocked') {
                toast({ title: "Account Blocked", description: "This account has been blocked by an administrator.", variant: "destructive" });
            } else if (loginStatus === 'not_found') {
                 toast({ title: "Invalid Credentials", description: "Please check your email and password.", variant: "destructive" });
            } else {
                 toast({ title: "Login Failed", description: "An unknown error occurred.", variant: "destructive" });
            }
        } else {
            toast({ title: "Please enter your identifier and password.", variant: "destructive" });
        }
    }

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
                <div className="w-24 h-24 mb-6 rounded-full bg-white shadow-lg flex items-center justify-center animate-logo-zoom">
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
                        <TabsContent value="login" className="animate-in fade-in-0 slide-in-from-left-1/2 duration-500">
                            <CardContent className="pt-6">
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="login-identifier"
                                            type="email" 
                                            placeholder=" " 
                                            className="pl-10 peer" 
                                            value={loginIdentifier}
                                            onChange={(e) => setLoginIdentifier(e.target.value)}
                                            required
                                        />
                                        <Label htmlFor="login-identifier" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                            Email
                                        </Label>
                                    </div>
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input 
                                            id="login-password" 
                                            type={showLoginPassword ? "text" : "password"}
                                            placeholder=" " 
                                            className="pl-10 pr-10 peer" 
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                        <Label htmlFor="login-password" className="absolute left-10 top-2.5 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary">
                                            Password
                                        </Label>
                                        <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">
                                            {showLoginPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-3 text-lg animate-in zoom-in-95 duration-500" disabled={loginLoading || loginSuccess}>
                                        {loginLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : loginSuccess ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                                Success
                                            </div>
                                        ) : "Login"}
                                    </Button>
                                    <div className="text-center text-sm">
                                        <Link href="#" className="text-primary hover:underline">Forgot Password?</Link>
                                    </div>
                                </form>
                            </CardContent>
                        </TabsContent>
                        <TabsContent value="register" className="animate-in fade-in-0 slide-in-from-right-1/2 duration-500">
                             <CardContent className="pt-6">
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
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>

        </div>
    );
}
