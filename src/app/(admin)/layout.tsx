'use client';

import { ReactNode } from 'react';
import ProtectLayout from '@/layout/protectLayout';
import { useSession } from 'next-auth/react';
import MainLayout from '@/layout/mainLayout';

const LayoutMain = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  return (
    <ProtectLayout>
      <MainLayout>
        {session?.user?.role === 'admin' ? <>{children}</> : <>No Permission</>}
      </MainLayout>
    </ProtectLayout>
  );
};

export default LayoutMain;
