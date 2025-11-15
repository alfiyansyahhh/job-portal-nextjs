// import AppDashboardLayout from '@/layout/mainLayout.tsx';
import ProtectLayout from '@/layout/protectLayout';
import React, { ReactNode } from 'react';

const LayoutMain = async ({ children }: { children: ReactNode }) => {
  return (
    <ProtectLayout>
      {children}
      {/* <AppDashboardLayout>{children}</AppDashboardLayout> */}
    </ProtectLayout>
  );
};

export default LayoutMain;
