
"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Logo = ({ className, isLight = false }: { className?: string, isLight?: boolean }) => {
    const textColor = isLight ? "text-white" : "text-primary-foreground";
    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div className="relative flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#fde047', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor: '#f97316', stopOpacity:1}} />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#fca5a5', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity:1}} />
                        </linearGradient>
                         <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity:1}} />
                        </linearGradient>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#60a5fa', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity:1}} />
                        </linearGradient>
                         <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#4ade80', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor: '#22c55e', stopOpacity:1}} />
                        </linearGradient>
                    </defs>
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="url(#grad1)" />
                    <path d="M50, 0 A50,50 0 0,1 100,50 L50,50 Z" fill="url(#grad2)" />
                    <path d="M100, 50 A50,50 0 0,1 50,100 L50,50 Z" fill="url(#grad3)" />
                    <path d="M50, 100 A50,50 0 0,1 0,50 L50,50 Z" fill="url(#grad4)" />
                    <path d="M0, 50 A50,50 0 0,1 50,0 L50,50 Z" fill="url(#grad5)" />
                    <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute text-primary font-black text-5xl flex items-center">
                    <span className="-mr-1">9</span>
                    <span className="text-4xl text-red-500">X</span>
                </div>
            </div>
            <div className={`-mt-1 font-bold text-xl tracking-wider ${textColor}`}>
                BETCLUB
            </div>
        </div>
    )
}
