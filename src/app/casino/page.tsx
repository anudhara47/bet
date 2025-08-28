
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CasinoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
        <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <ArrowLeft />
              Back
            </Link>
            <h1 className="text-2xl font-bold capitalize">Casino</h1>
            <div />
        </div>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Card key={index} className="w-[150px] h-[200px] shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Image src={`https://picsum.photos/150/200?random=${index+80}`} alt={`Game ${index + 1}`} width={150} height={200} data-ai-hint="casino game" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
