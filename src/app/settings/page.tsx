'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Copy, Info, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-100 text-foreground max-w-lg mx-auto">
      <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/account" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl">Settings Center</h1>
      </header>

      <div className="p-4">
        <Card className="rounded-xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Image
                  src="https://picsum.photos/80/80"
                  width={64}
                  height={64}
                  alt="User Avatar"
                  className="rounded-full"
                  data-ai-hint="woman face"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Change avatar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
              <span className="text-muted-foreground">Nickname</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">DEVIL47K</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
              <span className="text-muted-foreground">UID</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">927417</span>
                <Copy className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-sm text-muted-foreground my-4 flex items-center">
            <span className="w-1 h-4 bg-red-500 mr-2 inline-block rounded-full"></span>
            Security information
        </h2>

        <Card className="rounded-xl shadow-lg">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                        <Lock className="w-5 h-5 text-red-500" />
                    </div>
                    <span>Login password</span>
                </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Edit</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
                 <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-red-500" />
                    </div>
                    <span>Bind mailbox</span>
                </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>to bind</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                        <Info className="w-5 h-5 text-red-500" />
                    </div>
                    <span>Updated version</span>
                </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>1.0.9</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
