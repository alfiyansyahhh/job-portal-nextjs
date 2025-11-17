'use client';

import React from 'react';
import NoCandidatePlaceHolder from './noCandidatePlaceHolder';
import { useJobs } from '@/zustand/store/useJobs';

const ManageJobSection = ({ jobId, list }: { jobId: any; list: any }) => {
  let { getJobById } = useJobs();
  let dataJOb = getJobById(jobId);

  console.log(dataJOb, 'dataJOb');
  console.log('list', list);
  return (
    <div>
      <div className='text-[#1D1F20] text-[18px] font-bold mb-5'>
        {dataJOb?.title}
      </div>
      <div className='border p-5 rounded-md min-h-[500px]'>
        {list.length === 0 && <NoCandidatePlaceHolder />}
      </div>
    </div>
  );
};

export default ManageJobSection;
