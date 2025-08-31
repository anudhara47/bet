
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function AdminApiStatusPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="min-h-screen bg-gray-100 text-foreground pb-24 max-w-lg mx-auto relative">
      <header className="bg-primary text-white p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/admin/dashboard" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl">API Status</h1>
      </header>
      <main className="p-4 space-y-4">
        <div className="flex gap-2">
            <Input 
                placeholder="Search API endpoints..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white"
            />
            <Button className="bg-primary hover:bg-primary/90">
                <Search className="w-5 h-5"/>
            </Button>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h1 className="text-2xl font-bold mb-4">API Status</h1>
          <p className="text-lg text-muted-foreground">This page is under construction.</p>
        </div>
      </main>
    </div>
  );
}
