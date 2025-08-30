
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-lg mx-auto text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Analytics</h1>
        <p className="text-lg mb-8">This page is under construction.</p>
        <Link href="/admin/deposits" className="flex items-center justify-center text-red-500 hover:text-red-700">
          <ChevronLeft className="w-6 h-6" />
          Go Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
