
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useUser } from "@/context/user-context";

interface DepositRequest {
    id: string;
    userId: string;
    amount: number;
    method: string;
    utr: string;
    screenshot: string;
    timestamp: number;
    status: 'pending' | 'approved' | 'rejected';
}

const TransactionStatusBadge = ({ status }: { status: DepositRequest['status'] }) => {
    const statusClasses = {
        'approved': 'bg-green-100 text-green-700',
        'pending': 'bg-yellow-100 text-yellow-700',
        'rejected': 'bg-red-100 text-red-700'
    };
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', statusClasses[status])}>{statusText}</span>;
}

const TransactionRow = ({ transaction }: { transaction: DepositRequest }) => {
    return (
        <Card className="mb-3 shadow-md">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                        <ArrowDownToLine className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">₹{transaction.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.utr}</p>
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

export default function DepositHistoryPage() {
    const { uid } = useUser();
    const [depositHistory, setDepositHistory] = React.useState<DepositRequest[]>([]);

    React.useEffect(() => {
        if (uid) {
            const allRequests = JSON.parse(localStorage.getItem('depositRequests') || '[]');
            const userDeposits = allRequests.filter((req: DepositRequest) => req.userId === uid);
            userDeposits.sort((a: DepositRequest, b: DepositRequest) => b.timestamp - a.timestamp);
            setDepositHistory(userDeposits);
        }
    }, [uid]);

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Deposit History</h1>
            </header>

            <main className="p-4">
                {depositHistory.length > 0 ? (
                   depositHistory.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No deposit history found.
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
