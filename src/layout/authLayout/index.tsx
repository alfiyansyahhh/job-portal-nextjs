'use client';

import i18n from '@/config/i18n';
import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Image from 'next/image';
import LanguageDropdown from '@/components/ui/LanguageDropDown';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  let { t } = useTranslation();
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/job-list');
      }

      if (session?.user?.role === 'applicant') {
        router.push('/job-list-candidate');
      }
    }
  }, [status, router]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='mx-5 w-[500px]     '>
          <div className='items-center flex justify-between'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={100}
              height={100}
            />
            <LanguageDropdown />
          </div>
          <div className='mt-4  rounded-md min-h-[334px] p-10 shadow-lg flex flex-col '>
            <h1 className='text-xl font-bold mt-4'>{t(title)}</h1>
            <div className='mt-4'>{children}</div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AuthLayout;
