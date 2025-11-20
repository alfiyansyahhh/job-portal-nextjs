'use client';

import { ReactNode } from 'react';
import MainLayout from '@/layout/mainLayout';

const LayoutMain = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default LayoutMain;
