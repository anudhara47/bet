
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BarChart, ChevronRight, Copy, Gift, Globe, HomeIcon, Languages, Bell, FileText, Landmark, Wallet, ShieldCheck, User, RefreshCw, Percent, Settings, MessageCircle, LogOut, FileQuestion, Megaphone, BookOpen, Building } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNotification } from "@/context/notification-context";

const ArWalletIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3V7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 3V7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 11H20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DepositIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FDBA74" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
  
const WithdrawIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="18" height="11" rx="2" stroke="#60A5FA" strokeWidth="1.5"/>
    <rect x="7" y="12" width="4" height="2" rx="1" fill="#60A5FA"/>
    </svg>
);

const VipIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.09 8.26L21 9.27L16.5 13.97L17.63 21L12 17.77L6.37 21L7.5 13.97L3 9.27L9.91 8.26L12 2Z" fill="#34D399" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12L11 14L14 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GameHistoryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="4" fill="#60A5FA"/>
    <path d="M12 12H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 24C18.2091 24 20 22.2091 20 20C20 17.7909 18.2091 16 16 16C13.7909 16 12 17.7909 12 20C12 22.2091 13.7909 24 16 24Z" fill="#3B82F6"/>
    <path d="M16 22V20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const TransactionIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="4" fill="#34D399"/>
    <path d="M12 12H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 18L8 16L10 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 12L24 14L22 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const DepositHistoryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="9" width="18" height="14" rx="2" fill="#FCA5A5" />
        <path d="M7 13H25" stroke="white" strokeWidth="2" />
        <path d="M11 17H15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const WithdrawHistoryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10C7 8.89543 7.89543 8 9 8H23C24.1046 8 25 8.89543 25 10V20C25 21.1046 24.1046 22 23 22H9C7.89543 22 7 21.1046 7 20V10Z" fill="#FDBA74"/>
    <path d="M10 15H14" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 19C20.6569 19 22 17.6569 22 16C22 14.3431 20.6569 13 19 13C17.3431 13 16 14.3431 16 16C16 17.6569 17.3431 19 19 19Z" fill="white"/>
    <path d="M19 17L18 16L19 15" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export default function AccountPage() {
  const { language, setLanguage, translations } = useLanguage();
  const { addNotification, unreadCount } = useNotification();
  const { toast } = useToast();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [uid, setUid] = React.useState<string | null>(null);

  React.useEffect(() => {
    // This code runs only on the client
    const storedUid = localStorage.getItem('user-uid');
    if (storedUid) {
      setUid(storedUid);
    } else {
      // Generate a new UID if one doesn't exist
      const newUid = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('user-uid', newUid);
      setUid(newUid);
    }

    addNotification({
        type: 'login',
        title: 'Login Successful',
        message: 'Welcome back to your account.',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = translations.account_page;

  const copyToClipboard = () => {
    if(uid) {
        navigator.clipboard.writeText(uid);
        toast({ title: "UID copied to clipboard!" });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
        setIsRefreshing(false);
        toast({ title: "Balance updated!"});
    }, 1000);
  }

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    router.push("/");
  }

  const serviceCenterItems = [
    { icon: <Settings className="text-red-500" />, label: t.service_center.settings, href: "/settings" },
    { icon: <FileQuestion className="text-red-500" />, label: t.service_center.feedback, href: "/feedback" },
    { icon: <Megaphone className="text-red-500" />, label: t.service_center.announcement, href: "/announcement" },
    { icon: <MessageCircle className="text-red-500" />, label: t.service_center.customer_service, href: "/customer-service" },
    { icon: <BookOpen className="text-red-500" />, label: t.service_center.beginners_guide, href: "/guide" },
    { icon: <Building className="text-red-500" />, label: t.service_center.about_us, href: "/about" },
  ];
  
  const mainWalletActions = [
    { icon: <ArWalletIcon/>, label: t.ar_wallet, href: '/wallet' },
    { icon: <DepositIcon/>, label: t.deposit, href: '/deposit' },
    { icon: <WithdrawIcon/>, label: t.withdraw, href: '/withdraw' },
    { icon: <VipIcon/>, label: t.vip, href: '/vip' },
  ];

  const historyCards = [
    { icon: <GameHistoryIcon/>, title: t.game_history.title, description: t.game_history.description, href: "/game-history" },
    { icon: <TransactionIcon/>, title: t.transaction.title, description: t.transaction.description, href: "/transaction-history" },
    { icon: <DepositHistoryIcon/>, title: t.deposit_history.title, description: t.deposit_history.description, href: "/deposit-history" },
    { icon: <WithdrawHistoryIcon/>, title: t.withdraw_history.title, description: t.withdraw_history.description, href: "/withdraw-history" },
  ];
  
  const infoLinks = [
      { icon: <Bell className="text-red-500" />, label: t.notification, badge: unreadCount, href: "/notifications" },
      { icon: <Gift className="text-red-500" />, label: t.gifts, href: "/gifts" },
      { icon: <BarChart className="text-red-500" />, label: t.game_statistics, href: "/statistics" },
  ];

  if (!t) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-40 max-w-lg mx-auto relative">
      <div className="bg-gradient-to-b from-red-400 to-red-500 text-white p-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">DEVIL47K</h1>
              <span className="bg-yellow-400 text-red-800 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                VIP1
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <span>UID: {uid || '...'}</span>
              <Button variant="ghost" size="icon" className="w-6 h-6" onClick={copyToClipboard}><Copy className="w-4 h-4" /></Button>
            </div>
            <p className="text-xs mt-1">{t.last_login}: 2025-08-28 16:55:53</p>
          </div>
        </div>
      </div>

      <div className="p-4 transform -translate-y-4">
        <Card className="rounded-xl shadow-lg">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">{t.total_balance}</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                ₹305.77 
                <RefreshCw 
                    className={cn("w-4 h-4 text-muted-foreground cursor-pointer", isRefreshing && "animate-spin")} 
                    onClick={handleRefresh}
                />
              </p>
            </div>
            <Button onClick={() => router.push('/wallet')} className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6">{t.enter_wallet}</Button>
          </CardContent>
          <Separator />
          <div className="grid grid-cols-4 gap-2 p-4 text-center">
             {mainWalletActions.map((action, index) => (
                 <Link href={action.href} key={index} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-red-50 rounded-lg p-1">
                    {action.icon}
                    <span className="text-xs font-medium">{action.label}</span>
                </Link>
             ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-4">
            {historyCards.map((card, index) => (
                <Link href={card.href} key={index}>
                    <Card className="rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                            {card.icon}
                            <div>
                                <p className="font-semibold">{card.title}</p>
                                <p className="text-xs text-muted-foreground">{card.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>

        <Card className="rounded-xl shadow-lg mt-4">
            <CardContent className="p-0">
                {infoLinks.map((link, index) => (
                    <React.Fragment key={link.href}>
                        <Link href={link.href}>
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-3 relative">
                                    {link.label === t.notification && unreadCount > 0 && 
                                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></div>
                                    }
                                    {link.icon}
                                    <span className="font-semibold">{link.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {link.badge && link.badge > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{link.badge}</span>}
                                    <ChevronRight className="text-muted-foreground" />
                                </div>
                            </div>
                        </Link>
                        {index < infoLinks.length && <Separator />}
                    </React.Fragment>
                ))}
                 <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Globe className="text-red-500" />
                        <span className="font-semibold">{t.language}</span>
                    </div>
                    <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi' | 'bn' | 'te' | 'mr')}>
                        <SelectTrigger className="w-auto border-none focus:ring-0 p-0 text-muted-foreground text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">हिन्दी</SelectItem>
                            <SelectItem value="bn">বাংলা</SelectItem>
                            <SelectItem value="te">తెలుగు</SelectItem>
                            <SelectItem value="mr">मराठी</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg mt-4">
            <CardContent className="p-4">
                <h2 className="font-semibold mb-4">{t.service_center.title}</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {serviceCenterItems.map((item, index) => (
                       <Link key={index} href={item.href || "#"} className="flex flex-col items-center gap-2 cursor-pointer hover:bg-red-50 rounded-lg p-2">
                           <div className="bg-red-100 p-3 rounded-full">
                               {item.icon}
                           </div>
                           <span className="text-xs text-muted-foreground">{item.label}</span>
                       </Link>
                    ))}
                </div>
            </CardContent>
        </Card>

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full mt-4 bg-card border-red-300 text-red-500 font-bold flex items-center gap-2 rounded-full py-6 text-lg">
                    <LogOut className="w-6 h-6" />
                    {t.log_out}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will end your current session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-start max-w-lg mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">{t.footer.home}</span>
        </Link>
        <Link href="/activity" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">{t.footer.activity}</span>
        </Link>
        <Link href="/promotion" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <Landmark className="w-6 h-6" />
          <span className="text-xs mt-1">{t.footer.promotion}</span>
        </Link>
        <Link href="/account" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-red-600")}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">{t.footer.account}</span>
        </Link>
      </footer>
    </div>
  );
}
