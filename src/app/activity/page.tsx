
'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Activity, HomeIcon, Landmark, User, Gift, Trophy, Users, Star, Disc } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const InvitationBonusIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-blue-400 flex items-center justify-center">
        <Users className="w-8 h-8 text-white" />
    </div>
);

const BettingRebateIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-orange-400 flex items-center justify-center">
        <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="16" height="10" rx="2" fill="white"/>
                <circle cx="12" cy="13" r="2" fill="#F97316"/>
            </svg>
        </div>
    </div>
);

const SuperJackpotIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-green-400 flex items-center justify-center">
        <Trophy className="w-8 h-8 text-white" />
    </div>
);

const FirstGiftIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-purple-400 flex items-center justify-center">
        <Gift className="w-8 h-8 text-white" />
    </div>
);

const InviteWheelIcon = () => (
    <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center">
        <Disc className="w-8 h-8 text-white" />
    </div>
);


export default function ActivityPage() {

    const activities = [
        { icon: <InvitationBonusIcon />, label: "Invitation bonus", href: "/invitation-bonus" },
        { icon: <BettingRebateIcon />, label: "Betting rebate", href: "/betting-rebate" },
        { icon: <SuperJackpotIcon />, label: "Super Jackpot", href: "/super-jackpot" },
        { icon: <FirstGiftIcon />, label: "First gift", href: "/first-gift" },
        { icon: <InviteWheelIcon />, label: "Invite Wheel", href: "/invite-wheel" },
    ];


  return (
    <div className="min-h-screen bg-neutral-100 text-foreground pb-40 max-w-lg mx-auto">
      <header className="bg-gradient-to-b from-yellow-400 to-yellow-500 text-white p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-white">9XBETCLUB</span>
        </div>
        <h1 className="text-2xl font-bold">Activity</h1>
        <p className="text-xs mt-2 opacity-90">
            Please remember to follow the event page<br/>
            We will launch user feedback activities from time to time
        </p>
      </header>

      <main className="p-4 space-y-6">
        <div className="grid grid-cols-5 gap-2 text-center">
            {activities.map((activity, index) => (
                <Link href={activity.href} key={index} className="flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1">
                    {activity.icon}
                    <span className="text-xs text-muted-foreground font-medium">{activity.label}</span>
                </Link>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Link href="/gifts-activity">
                <Card className="rounded-xl shadow-lg overflow-hidden h-full">
                    <CardContent className="p-0">
                        <div className="bg-yellow-200 h-24 flex items-center justify-center">
                           <Gift className="w-12 h-12 text-yellow-500" />
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold">Gifts</h3>
                            <p className="text-xs text-muted-foreground mt-1">Enter the redemption code to receive gift rewards</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/attendance-bonus">
                <Card className="rounded-xl shadow-lg overflow-hidden h-full">
                    <CardContent className="p-0">
                        <div className="bg-orange-100 h-24 flex items-center justify-center">
                           <Star className="w-12 h-12 text-orange-500" />
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold">Attendance bonus</h3>
                            <p className="text-xs text-muted-foreground mt-1">The more consecutive days you sign in, the higher the reward will be.</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>

        <Link href="/cross-the-road-challenge">
            <Card className="rounded-xl shadow-lg overflow-hidden bg-green-200 h-36 flex items-center justify-center">
                <CardContent className="p-3 text-center">
                    <h3 className="font-semibold text-green-800">CROSS-THE-ROAD CHALLENGE</h3>
                </CardContent>
            </Card>
        </Link>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around items-start max-w-lg mx-auto">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/activity" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-primary")}>
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Activity</span>
        </Link>
        <Link href="/promotion" className={cn(buttonVariants({ variant: 'ghost' }), "flex flex-col h-auto items-center text-muted-foreground")}>
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
