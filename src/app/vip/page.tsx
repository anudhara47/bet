
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const VipBadge = ({ level = 0, size = 'md' }: { level: number, size?: 'sm' | 'md' }) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12"
    }
    const textSizeClasses = {
        sm: "text-xs",
        md: "text-sm"
    }

    return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <polygon points="50,5 61,39 98,39 68,62 79,96 50,75 21,96 32,62 2,39 39,39" fill="#4a5568"/>
            <polygon points="50,10 59,39 90,39 65,58 74,88 50,70 26,88 35,58 10,39 41,39" fill="#718096"/>
            <polygon points="50,15 58,40 85,40 65,55 71,80 50,65 29,80 35,55 15,40 42,40" fill="#a0aec0"/>
            <polygon points="50,20 57,40 80,40 65,53 69,75 50,62 31,75 35,53 20,40 43,40" fill="#e2e8f0"/>
        </svg>
        <span className={`relative text-gray-800 font-bold z-10 ${textSizeClasses[size]}`}>V{level}</span>
    </div>
)};

const BenefitIcon = ({ children, color = 'bg-yellow-400' }: { children: React.ReactNode, color?: string }) => (
    <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}>
        {children}
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


const vipLevels = Array.from({ length: 11 }, (_, i) => ({
    level: i,
    expRequired: i * 1000,
    levelUpReward: i * 100,
    monthlyReward: i * 50,
    rebateRate: `${(i * 0.1).toFixed(1)}%`,
}));


export default function VipPage() {
    const { nickname, avatar } = useUser();
    
    const currentLevel = 0;
    const currentExp = 0;

    const experienceHistory = [
        { title: "Experience Bonus", type: "Betting EXP", date: "0000-00-00 00:00:00", amount: "0 EXP" },
        { title: "Experience Bonus", type: "Betting EXP", date: "0000-00-00 00:00:00", amount: "0 EXP" },
        { title: "Experience Bonus", type: "Betting EXP", date: "0000-00-00 00:00:00", amount: "0 EXP" },
        { title: "Experience Bonus", type: "Betting EXP", date: "0000-00-00 00:00:00", amount: "0 EXP" },
    ];

    return (
        <div className="min-h-screen bg-neutral-100 text-foreground pb-24 max-w-lg mx-auto relative">
            <header className="bg-primary text-white p-4 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/account" className="text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-xl mx-auto">VIP</h1>
            </header>

            <main className="space-y-4">
                <div className="bg-primary p-4 rounded-b-2xl">
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
                                    <span>VIP{currentLevel}</span>
                               </div>
                            </div>
                             <h2 className="text-lg font-bold mt-1">{nickname}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                        <Card className="bg-white/90 text-primary rounded-lg py-2">
                           <p className="text-xl font-bold">0 EXP</p>
                           <p className="text-xs text-muted-foreground">My experience</p>
                        </Card>
                        <Card className="bg-white/90 text-primary rounded-lg py-2">
                           <p className="text-xl font-bold">0 <span className="text-sm">Days</span></p>
                           <p className="text-xs text-muted-foreground">Payout time</p>
                        </Card>
                    </div>
                </div>

                <div className="px-4 text-center text-sm text-muted-foreground">
                    <p>VIP level rewards are settled at 0:00 am on the 0st of every month</p>
                </div>
                
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {vipLevels.map((vip, index) => (
                            <CarouselItem key={index} className="basis-11/12">
                               <div className="px-1">
                                     <Card className="rounded-xl shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                                        <CardContent className="p-4 relative">
                                            <div className="absolute top-4 right-4 opacity-30">
                                                <VipBadge level={vip.level} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-bold">VIP{vip.level}</h3>
                                                {currentLevel >= vip.level && (
                                                    <div className="flex items-center gap-1 text-green-300 bg-green-900/50 rounded-full px-2 py-0.5 text-xs">
                                                        <CheckCircle className="w-3 h-3" />
                                                        <span>Achieved</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm opacity-80 mt-1">Dear VIP{vip.level} customer</p>
                                            
                                            <div className="mt-4">
                                                <div className="flex justify-between items-center text-xs">
                                                     <p>Level maintenance</p>
                                                     <p>{currentLevel === vip.level ? '0' : '0'}% Completed</p>
                                                </div>
                                                <Progress value={currentLevel === vip.level ? 0 : (currentLevel > vip.level ? 100 : 0)} className="h-2 mt-1 bg-white/20" indicatorClassName="bg-yellow-400" />
                                                <div className="flex justify-between items-center text-xs mt-1">
                                                    <p className="opacity-80">{currentLevel === vip.level ? `0/${vip.expRequired}` : `0/0`}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs mt-3 opacity-80">Incomplete will be deducted by the system [0EXP]</p>
                                        </CardContent>
                                     </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden sm:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>

                 <div className="px-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Gem className="text-primary" />
                        VIP Benefits levels
                    </h3>
                     <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {vipLevels.map((vip, index) => (
                                <CarouselItem key={index} className="basis-11/12">
                                    <div className="px-1">
                                        <Card className="rounded-xl shadow-lg">
                                            <CardContent className="p-4 space-y-4">
                                                <div className="text-center font-bold text-lg">VIP{vip.level}</div>
                                                {[
                                                    { 
                                                        icon: <BenefitIcon color="bg-gradient-to-br from-yellow-300 to-orange-400"><Gift className="w-8 h-8 text-white" /></BenefitIcon>, 
                                                        title: "Level up rewards", 
                                                        description: "Each account can only receive 0 time", 
                                                        value: vip.levelUpReward,
                                                        received: 0,
                                                        isCurrency: true
                                                    },
                                                    { 
                                                        icon: <BenefitIcon color="bg-gradient-to-br from-orange-300 to-amber-500"><Star className="w-8 h-8 text-white" /></BenefitIcon>, 
                                                        title: "Monthly reward", 
                                                        description: "Each account can only receive 0 time per month",
                                                        value: vip.monthlyReward,
                                                        received: 0,
                                                        isCurrency: true
                                                    },
                                                    { 
                                                        icon: <BenefitIcon color="bg-gradient-to-br from-amber-400 to-yellow-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                                                        </BenefitIcon>, 
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
                                                                <span className="font-bold text-orange-600">{benefit.value}</span>
                                                            </div>
                                                            {benefit.received !== undefined && (
                                                                <div className="flex items-center justify-end gap-1 text-sm border border-red-300 bg-red-50 rounded-md px-2 py-1 mt-1">
                                                                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                                                                    <span className="font-bold text-red-600">{benefit.received}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                     </Carousel>
                 </div>

                 <div className="px-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                        <Crown className="text-primary" />
                        My benefits
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-xl shadow-lg bg-primary overflow-hidden">
                           <CardContent className="p-0">
                             <div className="h-24 bg-red-300 flex items-center justify-center">
                               <Image src="https://picsum.photos/200/100?random=1" width={200} height={100} alt="Benefit 1" className="object-cover w-full h-full" data-ai-hint="gift box gold coins"/>
                             </div>
                             <div className="p-3 text-white">
                                <p className="font-bold">Weekly Bonus</p>
                                <Button size="sm" className="w-full mt-2 bg-white text-primary hover:bg-gray-100">Claim</Button>
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
                            <div className="space-y-4">
                                {experienceHistory.map((item, index) => (
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
                        </TabsContent>
                        <TabsContent value="rules" className="pt-4">
                           <p className="text-center text-muted-foreground">VIP rules will be displayed here.</p>
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
