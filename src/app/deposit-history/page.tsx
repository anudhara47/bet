
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Transaction {
    id: string;
    amount: number;
    status: 'Successful' | 'Pending' | 'Failed';
    date: string;
    type: 'deposit' | 'withdrawal';
}

const generateRandomTransaction = (date: Date): Transaction => {
    const statuses: ('Successful' | 'Pending' | 'Failed')[] = ['Successful', 'Successful', 'Successful', 'Pending', 'Failed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 2000) + 50;
    const id = `DEP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    return {
        id,
        amount,
        status,
        date: date.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ''),
        type: 'deposit',
    };
};

const TransactionStatusBadge = ({ status }: { status: Transaction['status'] }) => {
    const statusClasses = {
        'Successful': 'bg-green-100 text-green-700',
        'Pending': 'bg-yellow-100 text-yellow-700',
        'Failed': 'bg-red-100 text-red-700'
    };
    return <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', statusClasses[status])}>{status}</span>;
}

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
    return (
        <Card className="mb-3 shadow-md">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                        <ArrowDownToLine className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">₹{transaction.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.id}</p>
                    </div>
                </div>
                <div className="text-right">
                    <TransactionStatusBadge status={transaction.status} />
                    <p className="text-xs text-muted-foreground mt-2">{transaction.date}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function DepositHistoryPage() {
    const [depositHistory, setDepositHistory] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        const generateHistory = () => {
            const now = new Date();
            const deposits: Transaction[] = [];

            for (let i = 0; i < 30; i++) {
                const pastDate = new Date(now);
                pastDate.setDate(now.getDate() - i);
                
                const numDeposits = Math.floor(Math.random() * 3) + 1;
                for(let j = 0; j < numDeposits; j++) {
                    const randomHour = Math.floor(Math.random() * 24);
                    const randomMinute = Math.floor(Math.random() * 60);
                    const transactionDate = new Date(pastDate);
                    transactionDate.setHours(randomHour, randomMinute);
                    deposits.push(generateRandomTransaction(transactionDate));
                }
            }
            deposits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setDepositHistory(deposits);
        };

        generateHistory();
    }, []);

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
