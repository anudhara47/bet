
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ChevronLeft, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useUser } from "@/context/user-context";
import { useNotification } from "@/context/notification-context";

interface WithdrawalRequest {
    id: string;
    amount: number;
    timestamp: number;
    status: 'pending' | 'approved' | 'rejected';
}

export default function AdminWithdrawalPage() {
    const [requests, setRequests] = React.useState<WithdrawalRequest[]>([]);
    const { toast } = useToast();
    const { setBalance, addWithdrawalAmount } = useUser();
    const { addNotification } = useNotification();

    React.useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem('withdrawalRequests') || '[]');
        setRequests(storedRequests);
    }, []);

    const handleApproval = (id: string, status: 'approved' | 'rejected') => {
        let amountToUpdate = 0;
        let requestFound: WithdrawalRequest | undefined;

        const updatedRequests = requests.map(req => {
            if (req.id === id) {
                requestFound = req;
                if (status === 'approved') {
                    addWithdrawalAmount(req.amount);
                    addNotification({
                        type: 'withdrawal',
                        title: 'Withdrawal Approved',
                        message: `Your withdrawal of ₹${req.amount.toFixed(2)} has been approved.`,
                    });
                } else if (status === 'rejected') {
                    // Refund the amount to user's balance if rejected
                    amountToUpdate = req.amount;
                    addNotification({
                        type: 'withdrawal',
                        title: 'Withdrawal Rejected',
                        message: `Your withdrawal of ₹${req.amount.toFixed(2)} has been rejected and the amount returned to your balance.`,
                    });
                }
                return { ...req, status };
            }
            return req;
        });

        if (status === 'rejected' && amountToUpdate > 0) {
            setBalance(prev => prev + amountToUpdate);
        }
        
        setRequests(updatedRequests);
        localStorage.setItem('withdrawalRequests', JSON.stringify(updatedRequests));

        toast({
            title: `Request ${status}`,
            description: `The withdrawal request has been ${status}.`,
            variant: status === 'rejected' ? 'destructive' : 'default',
        });
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white pb-24 max-w-lg mx-auto relative">
            <header className="bg-gray-900 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Admin - Withdrawal Requests</h1>
            </header>

            <main className="p-4 space-y-4">
                {requests.length === 0 ? (
                    <Card className="bg-gray-700 border-gray-600">
                        <CardContent className="p-6 text-center text-gray-400">
                            No pending withdrawal requests.
                        </CardContent>
                    </Card>
                ) : (
                    requests.map(req => (
                        <Card key={req.id} className="bg-gray-700 border-gray-600 text-white">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                     <p className="text-2xl font-bold text-red-400">₹{req.amount.toFixed(2)}</p>
                                     <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                        req.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        req.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {req.status === 'pending' && <Clock className="w-3 h-3"/>}
                                        {req.status === 'approved' && <CheckCircle className="w-3 h-3"/>}
                                        {req.status === 'rejected' && <XCircle className="w-3 h-3"/>}
                                        {req.status}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">Request time: {new Date(req.timestamp).toLocaleString()}</p>
                                 {req.status === 'pending' && (
                                    <div className="flex gap-2 pt-2">
                                        <Button onClick={() => handleApproval(req.id, 'rejected')} variant="destructive" className="w-full">Reject</Button>
                                        <Button onClick={() => handleApproval(req.id, 'approved')} className="w-full bg-green-600 hover:bg-green-700">Approve</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </main>
        </div>
    );
}
