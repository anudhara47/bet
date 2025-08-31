
'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserData, useUser } from "@/context/user-context";
import { ChevronLeft, ShieldCheck, UserCog, Ban, Copy } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";


export default function ManageUsersPage() {
    const { toast } = useToast();
    const { blockUser, unblockUser } = useUser();
    const [users, setUsers] = React.useState<UserData[]>([]);
    
    const refreshUsers = () => {
         const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
         setUsers(allUsers);
    }

    React.useEffect(() => {
        refreshUsers();

        const handleStorageChange = () => {
            refreshUsers();
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleBlock = (uid: string) => {
        blockUser(uid);
        refreshUsers();
        toast({ title: "User blocked successfully." });
    }

    const handleUnblock = (uid: string) => {
        unblockUser(uid);
        refreshUsers();
        toast({ title: "User unblocked successfully." });
    }

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
                <h1 className="font-bold text-xl">Manage Users</h1>
            </header>

            <main className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <UserCog className="w-6 h-6" />
                           User Status & Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>UID</TableHead>
                                    <TableHead>Identifier</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
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
                                            <TableCell>{user.email || user.phone}</TableCell>
                                            <TableCell>
                                                <Badge variant={user.blocked ? "destructive" : "default"}>
                                                    {user.blocked ? "Blocked" : "Active"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button 
                                                            variant={user.blocked ? "secondary" : "destructive"} 
                                                            size="sm"
                                                        >
                                                            {user.blocked ? <ShieldCheck className="w-4 h-4 mr-2"/> : <Ban className="w-4 h-4 mr-2"/>}
                                                            {user.blocked ? "Unblock" : "Block"}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action will {user.blocked ? "unblock" : "block"} the user and {user.blocked ? "allow" : "prevent"} them from accessing the application.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => user.blocked ? handleUnblock(user.uid) : handleBlock(user.uid)}>
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
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
