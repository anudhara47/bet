import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-primary">9</span>
                <span className="text-foreground">X</span>
              </div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Wallet className="h-5 w-5" />
            <div className="flex flex-col gap-1">
              <Button variant="success" size="sm" className="px-2 py-0 h-auto text-[10px]">Deposit</Button>
              <Button variant="destructive" size="sm" className="px-2 py-0 h-auto text-[10px]">Withdrawal</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex flex-col items-center justify-center p-4">
      </main>
    </div>
  );
}
