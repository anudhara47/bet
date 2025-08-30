
'use client';
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

const generateRandomTransaction = (date: Date, type: 'deposit' | 'withdrawal'): Transaction => {
    const statuses: ('Successful' | 'Pending' | 'Failed')[] = ['Successful', 'Successful', 'Successful', 'Pending', 'Failed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 2000) + 50;
    const id = `${type.toUpperCase().substring(0,3)}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    return {
        id,
        amount,
        status,
        date: date.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ''),
        type,
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
    const [depositHistory, setDepositHistory] = React.useState<Transaction[]>([]);
    const [withdrawalHistory, setWithdrawalHistory] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        const generateHistory = () => {
            const now = new Date();
            const deposits: Transaction[] = [];
            const withdrawals: Transaction[] = [];

            for (let i = 0; i < 30; i++) {
                const pastDate = new Date(now);
                pastDate.setDate(now.getDate() - i);
                
                // Add 1 to 3 random deposits for the day
                const numDeposits = Math.floor(Math.random() * 3) + 1;
                for(let j = 0; j < numDeposits; j++) {
                    const randomHour = Math.floor(Math.random() * 24);
                    const randomMinute = Math.floor(Math.random() * 60);
                    const transactionDate = new Date(pastDate);
                    transactionDate.setHours(randomHour, randomMinute);
                    deposits.push(generateRandomTransaction(transactionDate, 'deposit'));
                }

                // Add 0 to 2 random withdrawals for the day
                const numWithdrawals = Math.floor(Math.random() * 3);
                 for(let k = 0; k < numWithdrawals; k++) {
                    const randomHour = Math.floor(Math.random() * 24);
                    const randomMinute = Math.floor(Math.random() * 60);
                    const transactionDate = new Date(pastDate);
                    transactionDate.setHours(randomHour, randomMinute);
                    withdrawals.push(generateRandomTransaction(transactionDate, 'withdrawal'));
                }
            }
            // sort by date descending
            deposits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            withdrawals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setDepositHistory(deposits);
            setWithdrawalHistory(withdrawals);
        };

        generateHistory();
    }, []);


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
