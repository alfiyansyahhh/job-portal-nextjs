'use client';

import i18n from '@/config/i18n';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

const ProtectLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      localStorage.clear();
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div>
        <div className=' h-screen  flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </>
    );
  }

  return null;
};

export default ProtectLayout;
