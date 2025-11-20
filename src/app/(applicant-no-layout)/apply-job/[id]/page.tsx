import React from 'react';
import ApplyJobSection from '@/components/sections/applyJobSection';
import { Metadata } from 'next';
import ProtectLayout from '@/layout/protectLayout';
import { Job } from '@/zustand/store/useJobs';

export const metadata: Metadata = {
  title: 'Apply Job',
};

const ApplyJob = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const url = new URL(`/api/jobs/${id}`, process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  const job: Job = data;
  return (
    <ProtectLayout>
      <ApplyJobSection dataJob={job} />
    </ProtectLayout>
  );
};

export default ApplyJob;
