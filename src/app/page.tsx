
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { useEffect } from 'react';

export default function EntryPage() {
  const { uid } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (uid) {
      router.replace('/account');
    } else {
      router.replace('/login');
    }
  }, [uid, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
