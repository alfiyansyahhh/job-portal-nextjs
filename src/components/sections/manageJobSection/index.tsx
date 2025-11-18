'use client';

import React, { useEffect } from 'react';
import NoCandidatePlaceHolder from './noCandidatePlaceHolder';
import { useJobs } from '@/zustand/store/useJobs';
import { useBreadcrumbStore } from '@/zustand/store/useBreadCrumb';
import { CandidateTable } from '@/components/table/tableListCandidate';

const ManageJobSection = ({ jobId, list }: { jobId: any; list: any }) => {
  let { getJobById } = useJobs();
  let dataJOb = getJobById(jobId);

  const addCrumbs = useBreadcrumbStore((s) => s.addCrumbs);

  useEffect(() => {
    addCrumbs({ label: 'Manage Candidate', href: `/manage-job/${jobId}` });
  }, []);

  let dataBe = [
    {
      id: 'cand_20251008_0001',
      attributes: [
        {
          key: 'full_name',
          label: 'Full Name',
          value: 'Nadia Putri',
          order: 1,
        },
        {
          key: 'email',
          label: 'Email',
          value: 'nadia.putri@example.com',
          order: 2,
        },
        { key: 'phone', label: 'Phone', value: '+62 812-1234-5678', order: 3 },
        { key: 'domicile', label: 'Domicile', value: 'Jakarta', order: 4 },
        { key: 'gender', label: 'Gender', value: 'Female', order: 5 },
        {
          key: 'linkedin_link',
          label: 'LinkedIn',
          value: 'https://linkedin.com/in/nadiaputri',
          order: 6,
        },
      ],
    },
    {
      id: 'cand_20251008_0001',
      attributes: [
        {
          key: 'full_name',
          label: 'Full Name',
          value: 'aNadia Putri',
          order: 1,
        },
        {
          key: 'email',
          label: 'Email',
          value: 'nadia.putri@example.com',
          order: 2,
        },
        { key: 'phone', label: 'Phone', value: '+62 812-1234-5678', order: 3 },
        { key: 'domicile', label: 'Domicile', value: 'Jakarta', order: 4 },
        { key: 'gender', label: 'Gender', value: 'Female', order: 5 },
        {
          key: 'linkedin_link',
          label: 'LinkedIn',
          value: 'https://linkedin.com/in/nadiaputri',
          order: 6,
        },
      ],
    },
  ];

  return (
    <div>
      <div className='text-[#1D1F20] text-[18px] font-bold mb-5'>
        {dataJOb?.title}
      </div>
      <div className='border p-5 rounded-md min-h-[500px]'>
        {list.length === 0 && <NoCandidatePlaceHolder />}
        {list.length >= 1 && <CandidateTable dataBe={dataBe} />}
      </div>
    </div>
  );
};

export default ManageJobSection;
