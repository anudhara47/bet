
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useUser } from "@/context/user-context";

interface Transaction {
    id: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    timestamp: number;
    type: 'deposit' | 'withdrawal';
    userId?: string; 
}


const TransactionStatusBadge = ({ status }: { status: Transaction['status'] }) => {
    const statusClasses = {
        'approved': 'bg-green-100 text-green-700',
        'pending': 'bg-yellow-100 text-yellow-700',
        'rejected': 'bg-red-100 text-red-700'
    };
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', statusClasses[status])}>{statusText}</span>;
}

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
    return (
        <Card className="mb-3 shadow-md">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-full", transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100')}>
                        {transaction.type === 'deposit' ? 
                            <ArrowDownToLine className="w-5 h-5 text-green-600" /> : 
                            <ArrowUpFromLine className="w-5 h-5 text-red-600" />
                        }
                    </div>
                    <div>
                        <p className="font-bold text-lg">₹{transaction.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.id}</p>
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

export default function TransactionHistoryPage() {
    const { uid } = useUser();
    const [depositHistory, setDepositHistory] = React.useState<Transaction[]>([]);
    const [withdrawalHistory, setWithdrawalHistory] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        if(uid) {
            const allDeposits = JSON.parse(localStorage.getItem('depositRequests') || '[]');
            const userDeposits = allDeposits
                .filter((req: Transaction) => req.userId === uid)
                .map((req: any) => ({ ...req, type: 'deposit' }))
                .sort((a: Transaction, b: Transaction) => b.timestamp - a.timestamp);
            setDepositHistory(userDeposits);

            const allWithdrawals = JSON.parse(localStorage.getItem('withdrawalRequests') || '[]');
            const userWithdrawals = allWithdrawals
                .filter((req: Transaction) => req.userId === uid)
                .map((req: any) => ({ ...req, type: 'withdrawal' }))
                .sort((a: Transaction, b: Transaction) => b.timestamp - a.timestamp);
            setWithdrawalHistory(userWithdrawals);
        }
    }, [uid]);


    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Transaction History</h1>
            </header>

            <main className="p-2">
                <Tabs defaultValue="deposit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-red-100/80 text-red-900 rounded-lg">
                        <TabsTrigger value="deposit" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Deposit History</TabsTrigger>
                        <TabsTrigger value="withdrawal" className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Withdrawal History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="deposit" className="mt-4">
                        {depositHistory.length > 0 ? (
                           depositHistory.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                        ) : (
                            <Card>
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    No deposit history found.
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="withdrawal" className="mt-4">
                         {withdrawalHistory.length > 0 ? (
                           withdrawalHistory.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                        ) : (
                            <Card>
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    No withdrawal history found.
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
