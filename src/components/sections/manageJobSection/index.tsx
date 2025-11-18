'use client';

import React, { useEffect } from 'react';
import NoCandidatePlaceHolder from './noCandidatePlaceHolder';
import { useJobs } from '@/zustand/store/useJobs';
import { useBreadcrumbStore } from '@/zustand/store/useBreadCrumb';
import { CandidateTable } from '@/components/table/tableListCandidate';
import CardActionJob from '@/components/card/cardActionJob';
import StatusBadge from '@/components/ui/statusBadge';

const ManageJobSection = ({ jobId, list }: { jobId: any; list: any }) => {
  let { getJobById } = useJobs();
  let dataJOb = getJobById(jobId);

  const addCrumbs = useBreadcrumbStore((s) => s.addCrumbs);

  useEffect(() => {
    addCrumbs({ label: 'Manage Candidate', href: `/manage-job/${jobId}` });
  }, []);

  return (
    <div>
      <div className='flex items-center gap-3  mb-5'>
        <div className='text-[#1D1F20] text-[18px] font-bold '>
          {dataJOb?.title}
        </div>
        <CardActionJob job={dataJOb} />
        <StatusBadge status={dataJOb.status} />
      </div>
      <div className='border p-5 rounded-md min-h-[500px]'>
        {list?.length === 0 && <NoCandidatePlaceHolder />}
        {list?.length >= 1 && <CandidateTable dataBe={list} />}
      </div>
    </div>
  );
};

export default ManageJobSection;
