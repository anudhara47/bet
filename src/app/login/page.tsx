
'use client';
import * as React from 'react';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/context/user-context';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { language, setLanguage } = useLanguage();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { uid } = useUser();

     useEffect(() => {
        if (uid) {
            router.replace('/account');
        }
    }, [uid, router]);

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        // Dummy logic for demonstration
        const mobile = (event.currentTarget.elements.namedItem('mobile') as HTMLInputElement).value;
        const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

        setTimeout(() => {
            if (mobile && password) {
                toast({
                    title: "Login Successful",
                    description: "Welcome back!",
                });
                router.push('/account');
            } else {
                toast({
                    title: "Login Failed",
                    description: "Please check your mobile number and password.",
                    variant: "destructive",
                });
            }
            setIsSubmitting(false);
        }, 1000);
    };

    const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const mobile = (event.currentTarget.elements.namedItem('reg_mobile') as HTMLInputElement).value;
        const password = (event.currentTarget.elements.namedItem('reg_password') as HTMLInputElement).value;
        const confirmPassword = (event.currentTarget.elements.namedItem('reg_confirm_password') as HTMLInputElement).value;
        const privacy = (event.currentTarget.elements.namedItem('privacy') as HTMLInputElement).checked;

        setTimeout(() => {
            if (password !== confirmPassword) {
                toast({ title: "Registration Failed", description: "Passwords do not match.", variant: "destructive" });
                setIsSubmitting(false);
                return;
            }
            if (!privacy) {
                 toast({ title: "Registration Failed", description: "Please agree to the privacy policy.", variant: "destructive" });
                 setIsSubmitting(false);
                 return;
            }

            if (mobile && password) {
                 toast({
                    title: "Registration Successful",
                    description: "Your account has been created. Please log in.",
                });
                router.push('/account'); // Or redirect to login tab
            } else {
                 toast({
                    title: "Registration Failed",
                    description: "Please fill in all required fields.",
                    variant: "destructive",
                });
            }
            setIsSubmitting(false);
        }, 1000);
    };
    
    if (uid) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="text-lg font-semibold">Redirecting...</div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative flex flex-col justify-between">
            <header className="p-4 flex justify-between items-center">
                 <div className="flex items-center space-x-2">
                    <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">9</span>
                    </div>
                    <span className="font-bold text-xl text-primary">9XBETCLUB</span>
                 </div>
                 <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                    <SelectTrigger className="w-auto border-none focus:ring-0 p-0 text-muted-foreground text-sm bg-transparent">
                        <Globe className="w-4 h-4 mr-1"/>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                        <SelectItem value="bn">বাংলা</SelectItem>
                        <SelectItem value="te">తెలుగు</SelectItem>
                        <SelectItem value="mr">मराठी</SelectItem>
                    </SelectContent>
                </Select>
            </header>

            <main className="p-4">
                <Card className="rounded-xl shadow-lg border-primary/20">
                    <CardHeader>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
                                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Login</TabsTrigger>
                                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Register</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <CardContent className="pt-6">
                                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="mobile">Mobile Number</Label>
                                            <Input id="mobile" name="mobile" placeholder="Enter your mobile number" type="tel" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input id="password" name="password" placeholder="Enter your password" type="password" required />
                                        </div>
                                        <div className="flex justify-end">
                                            <Link href="#" className="text-sm text-primary hover:underline">Forgot Password?</Link>
                                        </div>
                                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                                            {isSubmitting ? 'Logging in...' : 'Login'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </TabsContent>
                            <TabsContent value="register">
                                 <CardContent className="pt-6">
                                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="reg_mobile">Mobile Number</Label>
                                            <Input id="reg_mobile" name="reg_mobile" placeholder="Enter your mobile number" type="tel" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reg_password">Set Password</Label>
                                            <Input id="reg_password" name="reg_password" placeholder="Enter your password" type="password" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reg_confirm_password">Confirm Password</Label>
                                            <Input id="reg_confirm_password" name="reg_confirm_password" placeholder="Confirm your password" type="password" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="invitation_code">Invitation Code</Label>
                                            <Input id="invitation_code" name="invitation_code" placeholder="Enter invitation code (optional)" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="privacy" name="privacy" />
                                            <label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                I have read and agree to the <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                                            </label>
                                        </div>
                                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                                            {isSubmitting ? 'Registering...' : 'Register'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
                    </CardHeader>
                </Card>
            </main>
            
            <footer className="text-center p-4">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    All information on this site is encrypted and protected
                </p>
            </footer>
        </div>
    );
}
