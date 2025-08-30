
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/user-context";
import { ChevronLeft, CheckCircle, Diamond, Gift, Star, Gem, Crown, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";


const VipBadge = ({ level = 0, size = 'md' }: { level: number, size?: 'sm' | 'md' }) => {
    const sizeClasses = {
        sm: "w-12 h-6",
        md: "w-16 h-8"
    }
    const textSizeClasses = {
        sm: "text-xs",
        md: "text-sm"
    }

    return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full">
            <polygon points="0,25 15,25 20,0 80,0 85,25 100,25 85,25 80,50 20,50 15,25" fill="#4a5568"/>
            <polygon points="2,25 16,25 21,5 79,5 84,25 98,25 84,25 79,45 21,45 16,25" fill="#718096"/>
            <polygon points="4,25 17,25 22,10 78,10 83,25 96,25 83,25 78,40 22,40 17,25" fill="#a0aec0"/>
            <polygon points="6,25 18,25 23,15 77,15 82,25 94,25 82,25 77,35 23,35 18,25" fill="#e2e8f0"/>
        </svg>
        <span className={`relative text-gray-800 font-bold z-10 ${textSizeClasses[size]}`}>VIP{level}</span>
    </div>
)};

const LevelUpRewardIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-yellow-400 flex items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="9" width="16" height="11" rx="2" fill="#FBBF24"/>
        <path d="M4 9H20L18 5H6L4 9Z" fill="#FDE68A"/>
        <rect x="11" y="4" width="2" height="5" fill="#F97316"/>
        <path d="M8 9C8 7.34315 9.34315 6 11 6H13C14.6569 6 16 7.34315 16 9" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
);

const MonthlyRewardIcon = () => (
    <div className="w-14 h-14 rounded-xl bg-orange-400 flex items-center justify-center">
       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#FDBA74"/>
        <path d="M12 2L14.09 8.26L21 9.27L16.5 13.97L17.63 21L12 17.77L6.37 21L7.5 13.97L3 9.27L9.91 8.26L12 2Z" fill="white" stroke="#F97316" strokeWidth="0.5"/>
       </svg>
    </div>
);

const RebateRateIcon = () => (
     <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#FDE68A"/>
            <path d="M12 5C11.4477 5 11 5.44772 11 6V7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7V6C13 5.44772 12.5523 5 12 5Z" fill="#F97316"/>
            <path d="M12 16C11.4477 16 11 16.4477 11 17V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V17C13 16.4477 12.5523 16 12 16Z" fill="#F97316"/>
            <path d="M16 12C16 11.4477 16.4477 11 17 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H17C16.4477 13 16 12.5523 16 12Z" fill="#F97316"/>
            <path d="M5 12C5 11.4477 5.44772 11 6 11H7C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="#F97316"/>
            </svg>
    </div>
);

const HistoryChatIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FEE2E2"/>
    <path d="M7 14.5C7 14.5 8.5 12.5 12 12.5C15.5 12.5 17 14.5 17 14.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9.5" cy="10.5" r="1" fill="#EF4444"/>
    <circle cx="14.5" cy="10.5" r="1" fill="#EF4444"/>
    </svg>
);

const vipLevels = [
    { level: 1, expRequired: 0, levelUpReward: 0, monthlyReward: 30, rebateRate: `0%` },
    { level: 2, expRequired: 10000, levelUpReward: 60, monthlyReward: 80, rebateRate: `0%` },
    { level: 3, expRequired: 30000, levelUpReward: 160, monthlyReward: 40, rebateRate: `0%` },
    { level: 4, expRequired: 70000, levelUpReward: 200, monthlyReward: 60, rebateRate: `0%` },
    { level: 5, expRequired: 100000, levelUpReward: 500, monthlyReward: 100, rebateRate: `0%` },
    { level: 6, expRequired: 300000, levelUpReward: 1200, monthlyReward: 250, rebateRate: `0%` },
    { level: 7, expRequired: 700000, levelUpReward: 2500, monthlyReward: 500, rebateRate: `0%` },
    { level: 8, expRequired: 1000000, levelUpReward: 5000, monthlyReward: 1000, rebateRate: `0%` },
    { level: 9, expRequired: 3000000, levelUpReward: 15000, monthlyReward: 3000, rebateRate: `0%` },
    { level: 10, expRequired: 7000000, levelUpReward: 35000, monthlyReward: 8000, rebateRate: `0%` },
];

export default function VipPage() {
    const { nickname, avatar, experience, setBalance, addClaimedLevel, hasClaimedLevel, expHistory } = useUser();
    const { toast } = useToast();
    
    const [mainApi, setMainApi] = React.useState<CarouselApi>()
    const [benefitsApi, setBenefitsApi] = React.useState<CarouselApi>()
    const [payoutDays, setPayoutDays] = React.useState(0);
    
    const currentLevelInfo = vipLevels.slice().reverse().find(l => experience >= l.expRequired);
    const currentLevel = currentLevelInfo ? currentLevelInfo.level : 1;
    const nextLevelInfo = vipLevels.find(l => l.level === currentLevel + 1);

    const canClaimLevelUpReward = nextLevelInfo && experience >= nextLevelInfo.expRequired && !hasClaimedLevel(nextLevelInfo.level);

    const handleClaimLevelUpReward = () => {
        if(canClaimLevelUpReward && nextLevelInfo) {
            setBalance(prev => prev + nextLevelInfo.levelUpReward);
            addClaimedLevel(nextLevelInfo.level);
            toast({
                title: "Reward Claimed!",
                description: `You have received ₹${nextLevelInfo.levelUpReward.toFixed(2)} for reaching VIP ${nextLevelInfo.level}.`
            });
        }
    };
    
    React.useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        const currentDayOfMonth = now.getDate();
        const daysRemaining = totalDaysInMonth - currentDayOfMonth;
        setPayoutDays(daysRemaining);
    }, []);
    
    React.useEffect(() => {
        if (!mainApi || !benefitsApi) return;

        const handleMainSelect = () => {
            if (benefitsApi.selectedScrollSnap() !== mainApi.selectedScrollSnap()) {
                benefitsApi.scrollTo(mainApi.selectedScrollSnap());
            }
        };

        const handleBenefitsSelect = () => {
            if (mainApi.selectedScrollSnap() !== benefitsApi.selectedScrollSnap()) {
                mainApi.scrollTo(benefitsApi.selectedScrollSnap());
            }
        };

        mainApi.on("select", handleMainSelect);
        benefitsApi.on("select", handleBenefitsSelect);

        return () => {
            mainApi.off("select", handleMainSelect);
            benefitsApi.off("select", handleBenefitsSelect);
        };
    }, [mainApi, benefitsApi]);

    const vipRules = [
        {
            title: "Upgrade standard",
            content: "The IP member's experience points (valid bet amount) that meet the requirements of the corresponding rank will be promoted to the corresponding VIP level, the member's VIP data statistics period starts from 00:00:00 days VIP system launched. VIP level calculation is refreshed every 10 minutes! The corresponding experience level is calculated according to valid odds 1:1 !"
        },
        {
            title: "Upgrade order",
            content: "The VIP level that meets the corresponding requirements can be promoted by one level every day, but the VIP level cannot be promoted by leapfrogging."
        },
        {
            title: "Level maintenance",
            content: "VIP members need to complete the maintenance requirements of the corresponding level within 30 days after the 'VIP level change'; if the promotion is completed during this period, the maintenance requirements will be calculated according to the current level."
        },
        {
            title: "Downgrade standard",
            content: "If a VIP member fails to complete the corresponding level maintenance requirements within 30 days, the system will automatically deduct the experience points corresponding to the level. If the experience points are insufficient, the level will be downgraded, and the corresponding discounts will be adjusted to the downgraded level accordingly."
        },
        {
            title: "Upgrade Bonus",
            content: "The upgrade benefits can be claimed on the VIP page after the member reaches the VIP membership level, and each VIP member can only get the upgrade reward of each level once."
        },
        {
            title: "Monthly reward",
            content: "VIP members can earn the highest level of VIP rewards once a month.Can only be received once a month. Prizes cannot be accumulated. And any unclaimed rewards will be refreshed on the next settlement day. When receiving the highest level of monthly rewards this month Monthly Rewards earned in this month will be deducted e.g. when VIP1 earns 500 and upgrades to VIP2 to receive monthly rewards 500 will be deducted."
        },
        {
            title: "Real-time rebate",
            content: "The higher the VIP level, the higher the return rate, all the games are calculated in real time and can be self-rewarded!"
        },
        {
            title: "Safe",
            content: "VIP members who have reached the corresponding level will get additional benefits on safe deposit based on the member's VIP level."
        }
    ]

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl mx-auto">VIP</h1>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                </div>
            </header>

            <main className="space-y-4">
                <div className="bg-red-500 p-4 rounded-b-2xl">
                    <div className="flex items-center gap-4 text-white">
                        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                           {avatar ? (
                               <Image src={avatar} alt="User Avatar" width={64} height={64} className="object-cover"/>
                           ) : (
                               <User className="w-10 h-10 text-gray-400 mt-3 ml-3" />
                           )}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                               <div className="bg-blue-900/50 border border-blue-400 rounded-full pl-0.5 pr-2 py-0.5 text-xs flex items-center gap-1">
                                    <VipBadge level={currentLevel} />
                               </div>
                            </div>
                             <h2 className="text-lg font-bold mt-1">{nickname}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                        <Card className="bg-white text-red-500 rounded-lg py-2">
                           <p className="text-xl font-bold">{experience.toLocaleString()} EXP</p>
                           <p className="text-xs text-muted-foreground">My experience</p>
                        </Card>
                        <Card className="bg-white text-red-500 rounded-lg py-2">
                           <p className="text-xl font-bold">{payoutDays} <span className="text-sm">Days</span></p>
                           <p className="text-xs text-muted-foreground">Payout time</p>
                        </Card>
                    </div>
                </div>

                <div className="px-4 text-center text-sm text-muted-foreground">
                    <p>VIP level rewards are settled at 2:00 am on the 1st of every month</p>
                </div>
                
                <Carousel
                    setApi={setMainApi}
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {vipLevels.map((vip, index) => {
                            const isCurrentLevel = vip.level === currentLevel;
                            const nextLevel = vipLevels.find(l => l.level === currentLevel + 1);
                            
                            const expForCurrentLevel = vipLevels.find(l => l.level === currentLevel)?.expRequired || 0;
                            
                            const progress = nextLevel 
                                ? ((experience - expForCurrentLevel) / (nextLevel.expRequired - expForCurrentLevel)) * 100
                                : (vip.level <= currentLevel ? 100 : 0);
                            
                            const requiredForUpgrade = nextLevel ? nextLevel.expRequired - experience : 0;
                            const isNextLevel = vip.level === currentLevel + 1;
                            const isAchieved = vip.level <= currentLevel;

                            return (
                            <CarouselItem key={index} className="basis-11/12">
                               <div className="px-1">
                                    <Card className="rounded-xl shadow-lg bg-gradient-to-br from-orange-300 to-yellow-400 text-yellow-900">
                                        <CardContent className="p-4 relative">
                                            <div className="absolute top-4 right-4 opacity-30">
                                                <VipBadge level={vip.level} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-bold">VIP{vip.level}</h3>
                                                {!isAchieved && (
                                                    <div className="flex items-center gap-1 text-red-800 bg-red-200/80 rounded-full px-2 py-0.5 text-xs">
                                                        <CheckCircle className="w-3 h-3" />
                                                        <span>Not open yet</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm opacity-80 mt-1">
                                                {isCurrentLevel && nextLevel ? `Upgrading VIP${nextLevel.level} requires ${requiredForUpgrade.toLocaleString()} EXP` : `Dear VIP${vip.level} customer`}
                                            </p>
                                            
                                            {isCurrentLevel && nextLevel && (
                                                <>
                                                    <div className="mt-4">
                                                        <Button size="sm" variant="outline" className="bg-white/50 border-white/80 text-yellow-800">Bet ₹1=1EXP</Button>
                                                        <Progress value={progress} className="h-2 mt-2 bg-white/50" indicatorClassName="bg-yellow-600" />
                                                        <div className="flex justify-between items-center text-xs mt-1">
                                                            <p className="opacity-80">{(experience - expForCurrentLevel).toLocaleString()}/{ (nextLevel.expRequired - expForCurrentLevel).toLocaleString()}</p>
                                                            <p>{nextLevel.expRequired.toLocaleString()} EXP can be leveled up</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </CardContent>
                                     </Card>
                                </div>
                            </CarouselItem>
                        )})}
                    </CarouselContent>
                    <div className="hidden sm:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>

                 <div className="px-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Diamond className="text-red-500" />
                        VIP Benefits levels
                    </h3>
                     <Carousel
                        setApi={setBenefitsApi}
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {vipLevels.map((vip, index) => {
                                const nextVipLevel = vipLevels.find(l => l.level === vip.level + 1);

                                return(
                                <CarouselItem key={index} className="basis-11/12">
                                    <div className="px-1">
                                        <Card className="rounded-xl shadow-lg">
                                            <CardContent className="p-4 space-y-4">
                                                <div className="text-center font-bold text-lg">VIP{vip.level} Benefits level</div>
                                                {[
                                                    { 
                                                        icon: <LevelUpRewardIcon />, 
                                                        title: "Level up rewards", 
                                                        description: "Each account can only receive 1 time", 
                                                        value: vip.levelUpReward || 0,
                                                        isCurrency: true
                                                    },
                                                    { 
                                                        icon: <MonthlyRewardIcon />, 
                                                        title: "Monthly reward", 
                                                        description: "Each account can only receive 1 time per month",
                                                        value: vip.monthlyReward,
                                                        isCurrency: true
                                                    },
                                                    { 
                                                        icon: <RebateRateIcon />, 
                                                        title: "Rebate rate", 
                                                        description: "Increase income of rebate",
                                                        value: vip.rebateRate,
                                                        isCurrency: false
                                                    }
                                                ].map((benefit, bIndex) => (
                                                    <div key={bIndex} className="flex items-center gap-3">
                                                        {benefit.icon}
                                                        <div className="flex-grow">
                                                            <p className="font-semibold">{benefit.title}</p>
                                                            <p className="text-xs text-muted-foreground">{benefit.description}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center justify-end gap-1 text-sm border border-orange-300 bg-orange-50 rounded-md px-2 py-1">
                                                                {benefit.isCurrency && <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>}
                                                                <span className="font-bold text-orange-600">{benefit.isCurrency ? `₹${benefit.value}`: benefit.value}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )})}
                        </CarouselContent>
                     </Carousel>
                 </div>

                 <div className="px-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Crown className="text-red-500" />
                        My benefits
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-xl shadow-lg bg-primary overflow-hidden">
                           <CardContent className="p-0">
                             <div className="h-24 bg-red-300 flex items-center justify-center">
                               <Image src="https://picsum.photos/200/100?random=1" width={200} height={100} alt="Benefit 1" className="object-cover w-full h-full" data-ai-hint="gift box"/>
                             </div>
                             <div className="p-3 text-white">
                                <p className="font-bold">Level up rewards</p>
                                <Button size="sm" className="w-full mt-2 bg-white text-primary hover:bg-gray-100" onClick={handleClaimLevelUpReward} disabled={!canClaimLevelUpReward}>
                                    {canClaimLevelUpReward ? 'Claim' : (hasClaimedLevel(nextLevelInfo?.level || 0) ? 'Claimed' : 'Locked')}
                                </Button>
                             </div>
                           </CardContent>
                        </Card>
                         <Card className="rounded-xl shadow-lg bg-primary overflow-hidden">
                           <CardContent className="p-0">
                            <div className="h-24 bg-red-300 flex items-center justify-center">
                               <Image src="https://picsum.photos/200/100?random=2" width={200} height={100} alt="Benefit 2" className="object-cover w-full h-full" data-ai-hint="gold coins treasure"/>
                             </div>
                             <div className="p-3 text-white">
                                <p className="font-bold">Monthly Bonus</p>
                                <Button size="sm" className="w-full mt-2 bg-white text-primary hover:bg-gray-100">Claim</Button>
                             </div>
                           </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="px-4">
                    <Tabs defaultValue="history" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-transparent border-b">
                            <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none pb-2">History</TabsTrigger>
                            <TabsTrigger value="rules" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none pb-2">Rules</TabsTrigger>
                        </TabsList>
                        <TabsContent value="history" className="pt-4">
                            {expHistory.length > 0 ? (
                                <div className="space-y-4">
                                    {expHistory.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-blue-600">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.type}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                                            </div>
                                            <div className="text-right flex items-center gap-2">
                                            <div>
                                                <p className="font-bold text-green-600">{item.amount}</p>
                                                <HistoryChatIcon/>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    No experience history yet. Play games to earn EXP!
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="rules" className="pt-4 space-y-4">
                            {vipRules.map((rule, index) => (
                                <Card key={index} className="bg-white shadow-md">
                                    <CardContent className="p-4">
                                        <div className="flex items-center mb-2">
                                            <div className="bg-red-500 text-white font-bold text-sm px-4 py-1 rounded-r-full -ml-4">{rule.title}</div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{rule.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>


            </main>
             <div className="fixed bottom-20 right-4">
                <Button className="rounded-full w-14 h-14 bg-primary/80 backdrop-blur-sm shadow-lg hover:bg-primary">
                    <MessageCircle className="w-8 h-8 text-white" />
                </Button>
            </div>
        </div>
    );

    

}
