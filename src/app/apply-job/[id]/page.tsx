import React from 'react';
import ApplyJobSection from '@/components/sections/applyJobSection';
import { Metadata } from 'next';
import ProtectLayout from '@/layout/protectLayout';

export const metadata: Metadata = {
  title: 'Apply Job',
};

const ApplyJob = () => {
  return (
    // <ProtectLayout>
    <ApplyJobSection />
    // </ProtectLayout>
  );
};

export default ApplyJob;
