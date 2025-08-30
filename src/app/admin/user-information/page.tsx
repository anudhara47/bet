
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserData } from "@/context/user-context";
import { ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function UserInformationPage() {
    const [users, setUsers] = React.useState<UserData[]>([]);

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

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/admin/dashboard" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">User Information</h1>
            </header>

            <main className="p-4">
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
                                            <TableCell>{user.uid}</TableCell>
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
