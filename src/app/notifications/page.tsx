
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNotification } from "@/context/notification-context";
import { cn } from "@/lib/utils";
import { ChevronLeft, Bell, ArrowDownToLine, ArrowUpFromLine, LogIn } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'deposit':
            return <ArrowDownToLine className="w-5 h-5 text-green-600" />;
        case 'withdrawal':
            return <ArrowUpFromLine className="w-5 h-5 text-red-600" />;
        case 'login':
            return <LogIn className="w-5 h-5 text-blue-600" />;
        default:
            return <Bell className="w-5 h-5 text-gray-600" />;
    }
}

export default function NotificationsPage() {
    const { notifications, markAsRead, unreadCount, markAllAsRead } = useNotification();
    
    React.useEffect(() => {
        // Mark all as read when the page is viewed
        markAllAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Notifications</h1>
            </header>

            <main className="p-4">
                {notifications.length > 0 ? (
                    <div className="space-y-3">
                        {notifications.map(notification => (
                             <Card key={notification.id} className={cn("shadow-md", !notification.read && "bg-red-50 border-red-200")}>
                                <CardContent className="p-4 flex items-start gap-4">
                                    <div className={cn("p-2 rounded-full", 
                                        notification.type === 'deposit' ? 'bg-green-100' :
                                        notification.type === 'withdrawal' ? 'bg-red-100' :
                                        notification.type === 'login' ? 'bg-blue-100' :
                                        'bg-gray-100'
                                    )}>
                                        <NotificationIcon type={notification.type} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                                    </div>
                                     {!notification.read && <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1"></div>}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            You have no notifications.
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
