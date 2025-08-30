
import Link from "next/link";
import { ChevronLeft, Mail } from "lucide-react";

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-neutral-100 text-foreground max-w-lg mx-auto">
       <header className="bg-red-500 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/account" className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-xl">Customer Service</h1>
      </header>
      <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
        <Mail className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-muted-foreground mb-6">For any inquiries or support, please reach out to us via email.</p>
        <p className="text-lg font-semibold">
          <a href="mailto:bdhara47@gmail.com" className="text-red-600 hover:underline">
            bdhara47@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
