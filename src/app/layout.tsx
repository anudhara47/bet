
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/context/language-context';
import { WingoGameProvider } from '@/context/wingo-game-context';
import { NotificationProvider } from '@/context/notification-context';
import { UserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: '9xbetclub',
  description: 'A new application built in Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <UserProvider>
          <LanguageProvider>
            <NotificationProvider>
              <WingoGameProvider>
                {children}
                <Toaster />
              </WingoGameProvider>
            </NotificationProvider>
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
