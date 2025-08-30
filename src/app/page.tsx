
'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { useEffect } from 'react';

export default function HomeRedirectPage() {
    const router = useRouter();
    const { uid } = useUser();

    useEffect(() => {
        // This logic will run on the client side after hydration.
        // It checks if a user identifier exists and redirects accordingly.
        if (uid) {
            router.replace('/account'); // or a dashboard page
        } else {
            router.replace('/login');
        }
    }, [uid, router]);

    // Render a loading state while the redirect is happening.
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-lg font-semibold">Loading...</div>
        </div>
    );
}
