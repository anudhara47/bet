
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Users, History, LayoutDashboard, Gift, Wallet, UserX, Star, ArrowDownCircle, ArrowUpCircle, Settings, FileText, ShieldCheck, BarChart, Bell, Edit, ShieldAlert, Database, Cloud, MessageSquare } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function AdminDashboardPage() {

    const adminOptions = [
        { label: "User Information", icon: <Users className="w-6 h-6 text-primary" />, href: "/admin/user-information" },
        { label: "Game History", icon: <History className="w-6 h-6 text-primary" />, href: "/admin/game-history" },
        { label: "Control Panel", icon: <LayoutDashboard className="w-6 h-6 text-primary" />, href: "/admin/control-panel" },
        { label: "Gifts Code Generate", icon: <Gift className="w-6 h-6 text-primary" />, href: "/admin/gift-code" },
        { label: "Admin Wallet", icon: <Wallet className="w-6 h-6 text-primary" />, href: "/admin/wallet" },
        { label: "User Delete and Block", icon: <UserX className="w-6 h-6 text-primary" />, href: "/admin/manage-users" },
        { label: "Invitation Fund", icon: <Users className="w-6 h-6 text-primary" />, href: "/admin/invitation-fund" },
        { label: "Bonus Fund", icon: <Star className="w-6 h-6 text-primary" />, href: "/admin/bonus-fund" },
        { label: "Deposit Request", icon: <ArrowDownCircle className="w-6 h-6 text-primary" />, href: "/admin/deposits" },
        { label: "Withdrawal Request", icon: <ArrowUpCircle className="w-6 h-6 text-primary" />, href: "/admin/withdrawals" },
        { label: "Payment Settings", icon: <Settings className="w-6 h-6 text-primary" />, href: "/admin/payment-settings" },
        { label: "Reports", icon: <FileText className="w-6 h-6 text-primary" />, href: "/admin/reports" },
        { label: "Security Logs", icon: <ShieldCheck className="w-6 h-6 text-primary" />, href: "/admin/security-logs" },
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
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl">Admin Dashboard</h1>
            </header>

            <main className="p-4 space-y-3">
                {adminOptions.map((option, index) => (
                    <Link href={option.href} key={index}>
                        <Card className="rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {option.icon}
                                    <span className="font-semibold">{option.label}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </main>
        </div>
    );
}
