
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useUser } from "@/context/user-context";

interface WithdrawalRequest {
    id: string;
    userId: string;
    amount: number;
    timestamp: number;
    status: 'pending' | 'approved' | 'rejected';
}

const TransactionStatusBadge = ({ status }: { status: WithdrawalRequest['status'] }) => {
    const statusClasses = {
        'approved': 'bg-green-100 text-green-700',
        'pending': 'bg-yellow-100 text-yellow-700',
        'rejected': 'bg-red-100 text-red-700'
    };
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', statusClasses[status])}>{statusText}</span>;
}

const TransactionRow = ({ transaction }: { transaction: WithdrawalRequest }) => {
    return (
        <Card className="mb-3 shadow-md">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-red-100">
                        <ArrowUpFromLine className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">₹{transaction.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Order ID: {transaction.id}</p>
                    </div>
                </div>
                <div className="text-right">
                    <TransactionStatusBadge status={transaction.status} />
                    <p className="text-xs text-muted-foreground mt-2">{new Date(transaction.timestamp).toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function WithdrawHistoryPage() {
    const { uid } = useUser();
    const [withdrawalHistory, setWithdrawalHistory] = React.useState<WithdrawalRequest[]>([]);

    React.useEffect(() => {
       if (uid) {
            const allRequests = JSON.parse(localStorage.getItem('withdrawalRequests') || '[]');
            const userWithdrawals = allRequests.filter((req: WithdrawalRequest) => req.userId === uid);
            userWithdrawals.sort((a: WithdrawalRequest, b: WithdrawalRequest) => b.timestamp - a.timestamp);
            setWithdrawalHistory(userWithdrawals);
        }
    }, [uid]);

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Withdrawal History</h1>
            </header>

            <main className="p-4">
                {withdrawalHistory.length > 0 ? (
                   withdrawalHistory.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No withdrawal history found.
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
