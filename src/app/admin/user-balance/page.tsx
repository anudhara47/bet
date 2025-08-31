
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserData } from "@/context/user-context";
import { ChevronLeft, Wallet, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export default function UserBalancePage() {
    const [users, setUsers] = React.useState<UserData[]>([]);
    const { toast } = useToast();

    const refreshUsers = React.useCallback(() => {
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        setUsers(allUsers);
    }, []);

    React.useEffect(() => {
        refreshUsers();

        const handleStorageChange = () => {
            refreshUsers();
        };
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage', handleStorageChange); // Listen for custom event

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
    }, [refreshUsers]);
    
    const copyToClipboard = (text: string) => {
        if(text) {
            navigator.clipboard.writeText(text);
            toast({ title: "UID copied to clipboard!" });
        }
    };


    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/dashboard" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">User Balances</h1>
            </header>

            <main className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Wallet className="w-6 h-6" />
                           All User Wallets
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>UID</TableHead>
                                    <TableHead className="text-right">Wallet</TableHead>
                                    <TableHead className="text-right">Total Deposit</TableHead>
                                    <TableHead className="text-right">Total Withdraw</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow key={user.uid}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span>{user.uid}</span>
                                                    <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={() => copyToClipboard(user.uid)} />
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-blue-600">₹{user.balance.toFixed(2)}</TableCell>
                                            <TableCell className="text-right text-green-600">₹{(user.totalDepositAmount || 0).toFixed(2)}</TableCell>
                                            <TableCell className="text-right text-red-600">₹{(user.totalWithdrawalAmount || 0).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

    