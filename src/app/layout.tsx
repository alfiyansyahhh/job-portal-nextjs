import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { Nunito_Sans, Geist } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import SessionProvider from '../providers/nextAuthSessionProvider';
import SignOutHandler from './(auth)/signOut';

const nunito_Sans = Nunito_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'jobportal -  Rakamin Academy',
    template: '%s | jobportal -  Rakamin Academy',
  },
  description: 'jobportal - Rakamin Academy',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <meta
        name='referrer'
        content='origin'
      />
      <body className={nunito_Sans.className}>
        <Toaster position='top-center' />
        <SessionProvider>
          <SignOutHandler />
          {children}
          <ToastContainer position='top-right' />
        </SessionProvider>
      </body>
    </html>
  );
}
