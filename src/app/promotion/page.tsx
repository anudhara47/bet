
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BarChart, ChevronRight, Copy, DollarSign, Filter, Gift, Globe, HomeIcon, Languages, Bell, FileText, Landmark, Wallet, ShieldCheck, User, RefreshCw, Percent, Settings, MessageCircle, LogOut, FileQuestion, Megaphone, BookOpen, Building, Users, Calendar, Clipboard, FileBarChart, Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PartnerRewardsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14.5C14.2091 14.5 16 12.7091 16 10.5C16 8.29086 14.2091 6.5 12 6.5C9.79086 6.5 8 8.29086 8 10.5C8 12.7091 9.79086 14.5 12 14.5Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 19.5C17.5 17.2909 15.2091 15.5 12.5 15.5H11.5C8.79086 15.5 6.5 17.2909 6.5 19.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 9.5H21C21.5523 9.5 22 9.94772 22 10.5V11.5C22 12.0523 21.5523 12.5 21 12.5H20" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 9.5H3C2.44772 9.5 2 9.94772 2 10.5V11.5C2 12.0523 2.44772 12.5 3 12.5H4" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4.5V3" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6.5L18 5.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 6.5L6 5.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const InvitationRulesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 22V8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V22L12 18L4 22Z" fill="#FCA5A5" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 14H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const RebateRatioIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#FCA5A5" stroke="#F87171" strokeWidth="1.5"/>
        <path d="M15 9H9V15H15V9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 12H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PromotionDataIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="14" rx="2" fill="#FDBA74"/>
    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#F97316" strokeWidth="2"/>
    <path d="M12 11V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);


export default function PromotionPage() {
  const { toast } = useToast();

  const subordinateStats = {
    register: 0,
    depositNumber: 0,
    depositAmount: 0,
    firstDeposit: 0,
  }

  const teamSubordinateStats = {
    register: 0,
    depositNumber: 0,
    depositAmount: 0,
    firstDeposit: 0,
  };

  const promotionData = {
    thisWeek: 0.71,
    totalCommission: 4669.6,
    directSubordinates: 31,
    teamSubordinates: 4,
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Invitation code copied!" });
  };

  const downloadQRCode = () => {
    toast({ title: "QR Code download started." });
  }

  const menuItems = [
      { icon: <PartnerRewardsIcon />, label: "Partner rewards", href: "/partner-rewards"},
      { icon: <Clipboard className="text-red-500" />, label: "Copy invitation code", value: "67464927417", copy: true },
      { icon: <Calendar className="text-red-500" />, label: "Subordinate data", href: "/subordinate-data"},
      { icon: <DollarSign className="text-red-500" />, label: "Commission detail", href: "/commission-detail"},
      { icon: <InvitationRulesIcon />, label: "Invitation rules", href: "/invitation-rules"},
      { icon: <Headset className="text-red-500" />, label: "Agent line customer service", href: "/agent-support"},
  ]

  const SubordinateStatsView = ({ stats }: { stats: typeof subordinateStats}) => (
    <div className="p-2 space-y-2">
        <div>
          <p className="text-lg font-bold">{stats.register}</p>
          <p className="text-xs text-muted-foreground">number of register</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-500">{stats.depositNumber}</p>
          <p className="text-xs text-muted-foreground">Deposit number</p>
        </div>
        <div>
          <p className="text-lg font-bold text-yellow-500">{stats.depositAmount}</p>
          <p className="text-xs text-muted-foreground">Deposit amount</p>
        </div>
        <div>
          <p className="text-lg font-bold">{stats.firstDeposit}</p>
          <p className="text-xs text-muted-foreground">Number of people making first deposit</p>
        </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-40 max-w-lg mx-auto relative">
      <header className="bg-card p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <h1 className="font-bold text-xl">Agency</h1>
        <Button variant="ghost" size="icon">
          <Filter className="text-muted-foreground" />
        </Button>
      </header>
      
      <div className="relative p-4 bg-gradient-to-b from-red-400 via-red-400 to-red-300 text-white text-center rounded-b-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-red-400/50 rounded-full -mt-20 -ml-20"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-red-400/50 rounded-full mt-4 -mr-20"></div>

        <div className="relative">
            <p className="text-sm font-light">Yesterday&apos;s total commission</p>
            <p className="text-5xl font-bold my-2">0</p>
            <div className="bg-white/30 backdrop-blur-sm rounded-full inline-block px-4 py-1 text-xs">
                Upgrade the level to increase commission income
            </div>
        </div>
      </div>
      
      <div className="p-4 transform -translate-y-6">
        <Card className="rounded-xl shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="direct" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-b-none">
                <TabsTrigger value="direct">Direct subordinates</TabsTrigger>
                <TabsTrigger value="team">Team subordinates</TabsTrigger>
              </TabsList>
              <TabsContent value="direct">
                <div className="grid grid-cols-2 text-center text-sm">
                    <SubordinateStatsView stats={subordinateStats} />
                    <div className="p-2 space-y-2 bg-red-50/50 border-l">
                      {/* Empty placeholder for right side if needed, or another component */}
                    </div>
                </div>
              </TabsContent>
              <TabsContent value="team">
                <div className="grid grid-cols-2 text-center text-sm">
                    <SubordinateStatsView stats={teamSubordinateStats} />
                    <div className="p-2 space-y-2 bg-red-50/50 border-l">
                      {/* Empty placeholder for right side if needed, or another component */}
                    </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button onClick={downloadQRCode} className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold py-6 text-lg rounded-full">
            Download QR Code
        </Button>

        <Card className="rounded-xl shadow-lg mt-4">
            <CardContent className="p-0">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                         <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                           onClick={() => item.copy && item.value && copyToClipboard(item.value)}
                         >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                {item.href ? (
                                  <Link href={item.href} className="font-semibold">{item.label}</Link>
                                ) : (
                                  <span className="font-semibold">{item.label}</span>
                                )}
                            </div>
                            {item.href ? (
                                 <Link href={item.href}>
                                  <ChevronRight className="text-muted-foreground" />
                                 </Link>
                            ) : item.copy ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono">{item.value}</span>
                                    <Button variant="ghost" size="icon" className="w-6 h-6"><Copy className="w-4 h-4" /></Button>
                                </div>
                            ) : null}
                        </div>
                        {index < menuItems.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg mt-4">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <PromotionDataIcon />
                    <h2 className="font-semibold">Promotion data</h2>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-center">
                    <div>
                        <p className="text-xl font-bold">{promotionData.thisWeek}</p>
                        <p className="text-xs text-muted-foreground">This Week</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">{promotionData.totalCommission}</p>
                        <p className="text-xs text-muted-foreground">Total commission</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">{promotionData.directSubordinates}</p>
                        <p className="text-xs text-muted-foreground">direct subordinate</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">{promotionData.teamSubordinates}</p>
                        <p className="text-xs text-muted-foreground">Total number of subordinates</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-start max-w-lg mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/activity" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Activity</span>
        </Link>
        <Link href="/promotion" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-red-600")}>
          <Landmark className="w-6 h-6" />
          <span className="text-xs mt-1">Promotion</span>
        </Link>
        <Link href="/account" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </footer>
    </div>
  );
}

    