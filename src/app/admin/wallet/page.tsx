
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface GameTransaction {
    type: 'win' | 'loss';
    amount: number;
    timestamp: number;
}

export default function AdminWalletPage() {
    const [transactions, setTransactions] = React.useState<GameTransaction[]>([]);
    const [totalLosses, setTotalLosses] = React.useState(0);
    const [totalWins, setTotalWins] = React.useState(0);

    const updateWalletData = React.useCallback(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('gameTransactions') || '[]');
        setTransactions(storedTransactions);

        const losses = storedTransactions
            .filter((t: GameTransaction) => t.type === 'loss')
            .reduce((acc: number, t: GameTransaction) => acc + t.amount, 0);
        
        const wins = storedTransactions
            .filter((t: GameTransaction) => t.type === 'win')
            .reduce((acc: number, t: GameTransaction) => acc + t.amount, 0);

        setTotalLosses(losses);
        setTotalWins(wins);
    }, []);

    React.useEffect(() => {
        updateWalletData();

        const handleStorageChange = () => {
             updateWalletData();
        };
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
    }, [updateWalletData]);

    const adminProfit = totalLosses - totalWins;

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/deposits" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Admin Wallet</h1>
            </header>

            <main className="p-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="w-6 h-6 text-primary" />
                            Admin Profit Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">Current Balance (Profit)</p>
                        <p className="text-4xl font-bold mt-2">
                           ₹{adminProfit.toFixed(2)}
                        </p>
                         <p className="text-xs text-muted-foreground mt-2">Total User Losses - Total User Wins</p>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600">
                                <ArrowDownCircle className="w-6 h-6" />
                                Credits (User Losses)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">
                                + ₹{totalLosses.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Total amount lost by all users.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                                <ArrowUpCircle className="w-6 h-6" />
                                Debits (User Wins)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-red-600">
                                - ₹{totalWins.toFixed(2)}
                            </p>
                             <p className="text-sm text-muted-foreground mt-1">
                                Total amount won by all users.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Game Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {transactions.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {transactions.slice().reverse().map((tx, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                        <div>
                                            <p className={`font-semibold ${tx.type === 'win' ? 'text-red-500' : 'text-green-500'}`}>
                                                {tx.type === 'win' ? 'User Win (Debit)' : 'User Loss (Credit)'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</p>
                                        </div>
                                        <p className={`font-bold text-lg ${tx.type === 'win' ? 'text-red-500' : 'text-green-500'}`}>
                                            {tx.type === 'win' ? `-` : `+`} ₹{tx.amount.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center">No game transactions recorded yet.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
