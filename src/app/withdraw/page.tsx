
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { ChevronLeft, Landmark, Wallet, CircleUser, Phone, Hash, Pencil, AlertTriangle, ShieldCheck, Diamond } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface BankDetails {
    bankName: string;
    accountNumber: string;
    holderName: string;
    phone: string;
    ifsc: string;
}

interface UpiDetails {
    holderName: string;
    upiId: string;
}

type Inputs = {
    amount: number;
    password:  string;
}

const bankList = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Punjab National Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IDBI Bank",
    "Bank of India",
    "IndusInd Bank",
    "Yes Bank",
    "Central Bank of India",
    "Indian Bank",
    "Federal Bank",
    "UCO Bank",
    "Bank of Maharashtra",
    "Punjab & Sind Bank",
    "South Indian Bank"
];

export default function WithdrawPage() {
    const { balance, setBalance, uid } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const [bankDetails, setBankDetails] = React.useState<BankDetails | null>(null);
    const [upiDetails, setUpiDetails] = React.useState<UpiDetails | null>(null);
    const [remainingWithdrawals, setRemainingWithdrawals] = React.useState(2);

    // Load saved details from localStorage
    React.useEffect(() => {
        const savedBankDetails = localStorage.getItem('bankDetails');
        if (savedBankDetails) {
            setBankDetails(JSON.parse(savedBankDetails));
        }
        const savedUpiDetails = localStorage.getItem('upiDetails');
        if (savedUpiDetails) {
            setUpiDetails(JSON.parse(savedUpiDetails));
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if(remainingWithdrawals <= 0) {
            toast({ title: "No remaining withdrawal times for today.", variant: 'destructive' });
            return;
        }

        if (data.amount > balance) {
            toast({ title: "Insufficient balance", variant: 'destructive' });
            return;
        }
        if (data.amount < 110) {
            toast({ title: "Minimum withdrawal is ₹110.00", variant: 'destructive' });
            return;
        }
        if (data.amount > 200000) {
            toast({ title: "Maximum withdrawal is ₹200,000.00", variant: 'destructive' });
            return;
        }
        // This is a dummy password check
        if (data.password !== 'password') {
            toast({ title: "Invalid password", variant: 'destructive' });
            return;
        }

        const withdrawalRequest = {
            id: `WDR-${Date.now()}`,
            userId: uid,
            amount: data.amount,
            method: 'bank', // This would depend on the active tab
            timestamp: Date.now(),
            status: 'pending',
        };
        
        // Deduct balance immediately upon request
        setBalance(prev => prev - data.amount);

        const existingRequests = JSON.parse(localStorage.getItem('withdrawalRequests') || '[]');
        localStorage.setItem('withdrawalRequests', JSON.stringify([withdrawalRequest, ...existingRequests]));
        setRemainingWithdrawals(prev => prev - 1);
        
        toast({
            title: "Withdrawal Request Submitted",
            description: "Your request is under review. Please wait for admin approval.",
        });
        
        router.push('/account');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Withdraw</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Balance</p>
                                <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="bank" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-yellow-100/80 text-yellow-900 rounded-lg">
                        <TabsTrigger value="bank" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Bank Account</TabsTrigger>
                        <TabsTrigger value="upi" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">UPI</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bank" className="mt-4">
                        {bankDetails ? <SavedBankCard details={bankDetails} /> : <AddBankCardForm setBankDetails={setBankDetails} />}
                    </TabsContent>
                    <TabsContent value="upi" className="mt-4">
                        {upiDetails ? <SavedUpiCard details={upiDetails} /> : <AddUpiForm setUpiDetails={setUpiDetails} />}
                    </TabsContent>
                </Tabs>
                
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="amount">Amount</Label>
                                <Input 
                                    id="amount" 
                                    type="number" 
                                    placeholder="Enter withdrawal amount"
                                    {...register("amount", { required: "Amount is required", valueAsNumber: true })}
                                />
                                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password">Login Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="Enter your login password"
                                     {...register("password", { required: "Password is required" })}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                                Withdraw
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                 <Card>
                    <CardContent className="p-4 text-muted-foreground text-sm space-y-2">
                        <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>Need to bet <span className="text-primary font-semibold">₹0.00</span> to be able to withdraw</p>
                        </div>
                         <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>Withdraw time <span className="text-primary font-semibold">00:05-23:55</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>Today Remaining Withdrawal Times: <span className="text-primary font-semibold">{remainingWithdrawals}</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>Withdrawal amount range <span className="text-primary font-semibold">₹110.00-₹200,000.00</span></p>
                        </div>
                         <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>Please confirm your beneficial account information before withdrawing. If your information is incorrect, our company will not be liable for the amount of loss</p>
                        </div>
                         <div className="flex items-start gap-2">
                            <Diamond className="w-3 h-3 text-red-500 mt-1.5 flex-shrink-0" fill="currentColor"/>
                            <p>If your beneficial information is incorrect, please contact customer service</p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

// Components for Bank/UPI cards
const AddBankCardForm = ({ setBankDetails }: { setBankDetails: (details: BankDetails) => void }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<BankDetails>();
    const { toast } = useToast();

    const onSave: SubmitHandler<BankDetails> = (data) => {
        localStorage.setItem('bankDetails', JSON.stringify(data));
        setBankDetails(data);
        toast({ title: "Bank account saved successfully!" });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Bank Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSave)} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="holderName">Holder Name</Label>
                        <Input id="holderName" {...register("holderName", { required: "Holder name is required" })} />
                        {errors.holderName && <p className="text-red-500 text-xs mt-1">{errors.holderName.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Controller
                            name="bankName"
                            control={control}
                            rules={{ required: "Bank name is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bankList.map(bank => (
                                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                         {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" {...register("accountNumber", { required: "Account number is required" })} />
                        {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" {...register("phone", { required: "Phone number is required" })} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input id="ifsc" {...register("ifsc", { 
                            required: "IFSC Code is required",
                            pattern: {
                                value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                message: "Invalid IFSC code format"
                            } 
                        })} />
                        {errors.ifsc && <p className="text-red-500 text-xs mt-1">{errors.ifsc.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">Save Bank Card</Button>
                </form>
            </CardContent>
        </Card>
    );
}

const SavedBankCard = ({ details }: { details: BankDetails }) => (
    <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Landmark className="w-6 h-6" />
                    <p className="font-bold text-lg">{details.bankName}</p>
                </div>
                 <Pencil className="w-4 h-4 opacity-70" />
            </div>
            <p className="font-mono text-xl tracking-wider text-center">{details.accountNumber.replace(/\d(?=\d{4})/g, "*")}</p>
            <div className="flex justify-between text-sm pt-2">
                <div>
                    <p className="opacity-80">Holder Name</p>
                    <p className="font-semibold">{details.holderName}</p>
                </div>
                <div>
                    <p className="opacity-80">IFSC</p>
                    <p className="font-semibold">{details.ifsc}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white/10 rounded-md text-xs mt-2">
                <AlertTriangle className="w-4 h-4 text-yellow-300"/>
                <p>To change details, please contact customer support.</p>
            </div>
        </CardContent>
    </Card>
);

const AddUpiForm = ({ setUpiDetails }: { setUpiDetails: (details: UpiDetails) => void }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<UpiDetails & { confirmUpiId: string }>();
    const { toast } = useToast();
    const upiId = watch("upiId");

    const onSave: SubmitHandler<UpiDetails> = (data) => {
        localStorage.setItem('upiDetails', JSON.stringify(data));
        setUpiDetails(data);
        toast({ title: "UPI ID saved successfully!" });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add UPI Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSave)} className="space-y-4">
                     <div className="space-y-1">
                        <Label htmlFor="holderName">Holder Name</Label>
                        <Input id="holderName" {...register("holderName", { required: true })} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" {...register("upiId", { 
                            required: "UPI ID is required",
                            pattern: {
                                value: /^[\w.-]+@[\w.-]+$/,
                                message: "Invalid UPI ID format. It should be like name@bank"
                            }
                         })} />
                        {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmUpiId">Confirm UPI ID</Label>
                        <Input 
                            id="confirmUpiId" 
                            {...register("confirmUpiId", { 
                                required: "Please confirm your UPI ID",
                                validate: value => value === upiId || "UPI IDs do not match"
                            })} 
                        />
                         {errors.confirmUpiId && <p className="text-red-500 text-xs mt-1">{errors.confirmUpiId.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">Save UPI ID</Button>
                </form>
            </CardContent>
        </Card>
    );
};


const SavedUpiCard = ({ details }: { details: UpiDetails }) => (
    <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
        <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                     <Wallet className="w-6 h-6" />
                    <p className="font-bold text-lg">UPI</p>
                </div>
                <Pencil className="w-4 h-4 opacity-70" />
            </div>
            <p className="font-mono text-lg text-center">{details.upiId}</p>
            <div className="text-sm pt-2">
                <p className="opacity-80">Holder Name</p>
                <p className="font-semibold">{details.holderName}</p>
            </div>
             <div className="flex items-center gap-2 p-2 bg-white/10 rounded-md text-xs mt-2">
                <AlertTriangle className="w-4 h-4 text-yellow-300"/>
                <p>To change details, please contact customer support.</p>
            </div>
        </CardContent>
    </Card>
);
