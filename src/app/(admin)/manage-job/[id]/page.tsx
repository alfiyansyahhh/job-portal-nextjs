import React from 'react';
import ManageJobSection from '@/components/sections/manageJobSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Candidates',
};

interface Candidate {
  id: string;
  attributes: Attribute[];
}

interface Attribute {
  key: string;
  label: string;
  value: string;
  order: number;
}

const ManageJob = async ({ params }: { params: Promise<{ id: string }> }) => {
  const url = new URL('/api/candidate', process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  const candidates: Candidate[] = data.data;

  const { id } = await params;

  return (
    <>
      <ManageJobSection
        jobId={id}
        list={candidates}
      />
    </>
  );
};

export default ManageJob;
