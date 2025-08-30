
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Copy, Info, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [nickname, setNickname] = React.useState("DEVIL47K");
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
        toast({ title: "Avatar changed successfully!" });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNicknameSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNickname = (e.currentTarget.elements.namedItem("nickname") as HTMLInputElement).value;
    if (newNickname) {
        setNickname(newNickname);
        toast({ title: "Nickname updated successfully!" });
        // Manually close dialog
        document.getElementById('closeNicknameDialog')?.click();
    }
  };

  const handlePasswordSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldPassword = (e.currentTarget.elements.namedItem("oldPassword") as HTMLInputElement).value;
    const newPassword = (e.currentTarget.elements.namedItem("newPassword") as HTMLInputElement).value;
    if (oldPassword && newPassword) {
      toast({ title: "Password changed successfully!" });
      // Manually close dialog
      document.getElementById('closePasswordDialog')?.click();
    } else {
        toast({ title: "Please fill in all fields.", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("927417");
    toast({ title: "UID copied to clipboard!" });
  };


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
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {avatar ? (
                        // This part is not ideal for real apps as it's not storing the image anywhere.
                        // It's just for display simulation.
                        <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${avatar})`}}></div>
                    ) : (
                        <User className="w-8 h-8 text-gray-400" />
                    )}
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <span>Change avatar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <Separator />
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <span className="text-muted-foreground">Nickname</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{nickname}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Nickname</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNicknameSave}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nickname" className="text-right">Nickname</Label>
                            <Input id="nickname" name="nickname" defaultValue={nickname} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" id="closeNicknameDialog">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Separator />
            <div className="flex items-center justify-between p-4">
              <span className="text-muted-foreground">UID</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">927417</span>
                <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={copyToClipboard} />
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
             <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer">
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
                </DialogTrigger>
                 <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePasswordSave}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="oldPassword" className="text-right">Old Password</Label>
                                <Input id="oldPassword" name="oldPassword" type="password" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="newPassword" className="text-right">New Password</Label>
                                <Input id="newPassword" name="newPassword" type="password" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="secondary" id="closePasswordDialog">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
