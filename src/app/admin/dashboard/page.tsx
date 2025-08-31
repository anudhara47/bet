

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, BarChart, Bell, Bot, ChevronsUpDown, Cloud, Cog, Compass, Database, Edit, FileText, Gift, Heart, Home, List, Lock, MessageSquare, PieChart, Plane, Settings, Shield, Star, ThumbsUp, TrafficCone, User, Users, Wallet } from "lucide-react";
import Link from "next/link";
import * as React from "react";


export default function AdminDashboardPage() {
    const [pendingDepositCount, setPendingDepositCount] = React.useState(0);

    React.useEffect(() => {
        const checkPendingDeposits = () => {
            const storedRequests = JSON.parse(localStorage.getItem('depositRequests') || '[]');
            const adminPendingCount = storedRequests.filter((req: any) => req.status === 'pending').length;
            setPendingDepositCount(adminPendingCount);
        };
        
        checkPendingDeposits();
        window.addEventListener('storage', checkPendingDeposits);
        return () => window.removeEventListener('storage', checkPendingDeposits);
    }, []);

    const menuItems = [
        { label: "Deposit Requests", icon: <ArrowDownCircle className="w-6 h-6 text-primary" />, href: "/admin/deposits", badge: pendingDepositCount },
        { label: "Withdrawal Requests", icon: <ArrowUpCircle className="w-6 h-6 text-primary" />, href: "/admin/withdrawals" },
        { label: "User Information", icon: <Users className="w-6 h-6 text-primary" />, href: "/admin/user-information" },
        { label: "User Balance", icon: <Wallet className="w-6 h-6 text-primary" />, href: "/admin/user-balance" },
        { label: "Game History", icon: <List className="w-6 h-6 text-primary" />, href: "/admin/game-history" },
        { label: "Control Panel", icon: <Compass className="w-6 h-6 text-primary" />, href: "/admin/control-panel" },
        { label: "Gift Code Generate", icon: <Gift className="w-6 h-6 text-primary" />, href: "/admin/gift-code" },
        { label: "Admin Wallet", icon: <Wallet className="w-6 h-6 text-primary" />, href: "/admin/wallet" },
        { label: "Manage Users", icon: <User className="w-6 h-6 text-primary" />, href: "/admin/manage-users" },
        { label: "Invitation Fund", icon: <Star className="w-6 h-6 text-primary" />, href: "/admin/invitation-fund" },
        { label: "Bonus Fund", icon: <Heart className="w-6 h-6 text-primary" />, href: "/admin/bonus-fund" },
        { label: "Payment Settings", icon: <Cog className="w-6 h-6 text-primary" />, href: "/admin/payment-settings" },
        { label: "Reports", icon: <FileText className="w-6 h-6 text-primary" />, href: "/admin/reports" },
        { label: "Security Logs", icon: <Shield className="w-6 h-6 text-primary" />, href: "/admin/security-logs" },
        { label: "Analytics", icon: <BarChart className="w-6 h-6 text-primary" />, href: "/admin/analytics" },
        { label: "Send Notifications", icon: <Bell className="w-6 h-6 text-primary" />, href: "/admin/notifications" },
        { label: "Content Management", icon: <Edit className="w-6 h-6 text-primary" />, href: "/admin/content-management" },
        { label: "Support Tickets", icon: <MessageSquare className="w-6 h-6 text-primary" />, href: "/admin/support-tickets" },
        { label: "System Settings", icon: <Settings className="w-6 h-6 text-primary" />, href: "/admin/app-settings" },
        { label: "API Status", icon: <Cloud className="w-6 h-6 text-primary" />, href: "/admin/api-status" },
        { label: "Database Management", icon: <Database className="w-6 h-6 text-primary" />, href: "/admin/database-management" },
    ];

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <Home className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Admin Dashboard</h1>
            </header>

            <main className="p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={index} className="text-center">
                            <Card className="rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer aspect-square flex items-center justify-center">
                                <CardContent className="p-2 flex flex-col items-center gap-2 relative">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                      {item.icon}
                                    </div>
                                    <p className="text-xs font-semibold text-center">{item.label}</p>
                                    {item.badge && item.badge > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-card">
                                            {item.badge}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
