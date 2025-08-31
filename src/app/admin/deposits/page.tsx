
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { ChevronLeft, Check, X, Download, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";


interface DepositRequest {
    id: string;
    userId: string;
    amount: number;
    utr?: string; // Optional
    screenshot?: string; // Optional
    razorpay_payment_id?: string; // Optional
    timestamp: number;
    status: 'pending' | 'approved' | 'rejected';
}

export default function AdminDepositsPage() {
    const { toast } = useToast();
    const [requests, setRequests] = React.useState<DepositRequest[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    
    const fetchRequests = () => {
        const storedRequests = JSON.parse(localStorage.getItem('depositRequests') || '[]');
        setRequests(storedRequests);
    };

    React.useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = (requestId: string, newStatus: 'approved' | 'rejected') => {
        let depositAmount = 0;
        let depositUserId = '';
        
        const updatedRequests = requests.map(req => {
            if (req.id === requestId) {
                if (newStatus === 'approved' && req.status === 'pending') {
                    depositAmount = req.amount;
                    depositUserId = req.userId;
                }
                return { ...req, status: newStatus };
            }
            return req;
        });

        if (newStatus === 'approved' && depositAmount > 0 && depositUserId) {
            const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const userIndex = allUsers.findIndex((u: any) => u.uid === depositUserId);
            
            if (userIndex !== -1) {
                allUsers[userIndex].balance += depositAmount;
                allUsers[userIndex].totalDepositAmount = (allUsers[userIndex].totalDepositAmount || 0) + depositAmount;
                allUsers[userIndex].hasDeposited = true; // Set hasDeposited flag
                localStorage.setItem('allUsers', JSON.stringify(allUsers));
                // Dispatch a custom event to notify other components of the change
                window.dispatchEvent(new CustomEvent('local-storage'));
            }
        }

        localStorage.setItem('depositRequests', JSON.stringify(updatedRequests));
        setRequests(updatedRequests);
        toast({ title: `Request has been ${newStatus}.`});
    };

    const filteredRequests = requests.filter(req => 
        req.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.utr && req.utr.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (req.razorpay_payment_id && req.razorpay_payment_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const pendingRequests = filteredRequests.filter(r => r.status === 'pending');
    const processedRequests = filteredRequests.filter(r => r.status !== 'pending');

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/dashboard" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Admin - Deposits</h1>
            </header>

            <main className="p-4 space-y-6">
                <div className="flex gap-2">
                    <Input 
                        placeholder="Search by User ID or Transaction ID" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white"
                    />
                    <Button className="bg-primary hover:bg-primary/90">
                        <Search className="w-5 h-5"/>
                    </Button>
                </div>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Pending Requests ({pendingRequests.length})</h2>
                     {pendingRequests.length > 0 ? (
                        pendingRequests.map(req => (
                            <Card key={req.id} className="mb-4">
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-xl">₹{req.amount.toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground">User ID: {req.userId}</p>
                                        </div>
                                        <Badge>Pending</Badge>
                                    </div>
                                    {req.razorpay_payment_id && <p className="text-sm"><strong>Razorpay ID:</strong> {req.razorpay_payment_id}</p>}
                                    {req.utr && <p className="text-sm"><strong>UTR:</strong> {req.utr}</p>}
                                    
                                    {req.screenshot && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">View Screenshot</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Payment Screenshot</DialogTitle>
                                                <DialogDescription>
                                                    User ID: {req.userId} | UTR: {req.utr}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="relative h-96 mt-4">
                                                <Image src={req.screenshot} alt="Payment Screenshot" layout="fill" objectFit="contain"/>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    )}
                                     <div className="flex gap-2 pt-3 border-t">
                                        <Button onClick={() => handleAction(req.id, 'approved')} className="w-full bg-green-500 hover:bg-green-600"><Check className="w-4 h-4 mr-2"/>Approve</Button>
                                        <Button onClick={() => handleAction(req.id, 'rejected')} className="w-full" variant="destructive"><X className="w-4 h-4 mr-2"/>Reject</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No pending deposit requests.</p>
                    )}
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2">Processed Requests</h2>
                     {processedRequests.length > 0 ? (
                        processedRequests.map(req => (
                             <Card key={req.id} className="mb-4 opacity-80">
                                <CardContent className="p-4">
                                     <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">₹{req.amount.toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground">User ID: {req.userId}</p>
                                        </div>
                                        <Badge variant={req.status === 'approved' ? 'default' : 'destructive'} className={req.status === 'approved' ? 'bg-green-500' : ''}>
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No processed requests found.</p>
                    )}
                </section>

            </main>
        </div>
    );
}
