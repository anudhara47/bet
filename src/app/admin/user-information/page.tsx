
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserData } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Users, Copy, Search, Wallet, ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function UserInformationPage() {
    const [users, setUsers] = React.useState<UserData[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedUser, setSearchedUser] = React.useState<UserData | null>(null);
    const { toast } = useToast();

    React.useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        setUsers(allUsers);

        const handleStorageChange = () => {
            const updatedUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
            setUsers(updatedUsers);
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const copyToClipboard = (text: string) => {
        if(text) {
            navigator.clipboard.writeText(text);
            toast({ title: "UID copied to clipboard!" });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(u => u.uid === searchTerm);
        setSearchedUser(user || null);
        if(!user) {
            toast({ title: "User not found", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/dashboard" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">User Information</h1>
            </header>

            <main className="p-4 space-y-4">
                 <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                        placeholder="Search by User ID" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Search className="w-5 h-5"/>
                    </Button>
                </form>

                {searchedUser && (
                    <Card className="border-primary border-2">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-primary">
                                <span>User Details</span>
                                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(searchedUser.uid)}>
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p><strong>UID:</strong> {searchedUser.uid}</p>
                            <p><strong>Email:</strong> {searchedUser.email}</p>
                            <p><strong>Phone:</strong> {searchedUser.phone || 'N/A'}</p>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Wallet Balance</p>
                                        <p className="font-bold">₹{searchedUser.balance.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowDown className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Deposit</p>
                                        <p className="font-bold">₹{searchedUser.totalDepositAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowUp className="w-5 h-5 text-red-500" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Withdrawal</p>
                                        <p className="font-bold">₹{searchedUser.totalWithdrawalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}


                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Registered Users</span>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Users className="w-5 h-5" />
                                <span>Total: {users.length}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>UID</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Password</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow key={user.uid}>
                                            <TableCell className="flex items-center gap-2">
                                                <span>{user.uid}</span>
                                                 <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={() => copyToClipboard(user.uid)} />
                                            </TableCell>
                                            <TableCell>{user.email || 'N/A'}</TableCell>
                                            <TableCell>{user.phone || 'N/A'}</TableCell>
                                            <TableCell>{user.password || 'N/A'}</TableCell>
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
