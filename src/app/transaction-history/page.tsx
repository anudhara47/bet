
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Transaction {
    id: string;
    amount: number;
    status: 'Successful' | 'Pending' | 'Failed';
    date: string;
    type: 'deposit' | 'withdrawal';
}

const depositHistory: Transaction[] = [
    { id: 'DEPO-001', amount: 500, status: 'Successful', date: '2024-08-28 10:00', type: 'deposit' },
    { id: 'DEPO-002', amount: 1000, status: 'Successful', date: '2024-08-27 15:30', type: 'deposit' },
    { id: 'DEPO-003', amount: 200, status: 'Failed', date: '2024-08-26 11:00', type: 'deposit' },
];

const withdrawalHistory: Transaction[] = [
    { id: 'WDRW-001', amount: 300, status: 'Successful', date: '2024-08-28 12:00', type: 'withdrawal' },
    { id: 'WDRW-002', amount: 500, status: 'Pending', date: '2024-08-27 18:00', type: 'withdrawal' },
    { id: 'WDRW-003', amount: 100, status: 'Successful', date: '2024-08-25 09:45', type: 'withdrawal' },
];

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
                    <p className="text-xs text-muted-foreground mt-2">{transaction.date}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function TransactionHistoryPage() {
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
