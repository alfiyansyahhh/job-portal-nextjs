import React from 'react';
import Image from 'next/image';

const NoCandidatePlaceHolder = () => {
  return (
    <div className='flex flex-col text-center mt-20 w-full item-center justify-center'>
      <Image
        src='/icons/no-candidate.svg'
        alt='manage-job'
        width={276}
        height={260}
        className='mx-auto w-40 sm:w-auto'
      />
      <div className='text-[16px] font-bold'>No candidates found</div>
      <div className='text-[14px] text-[#757575]'>
        Share your job vacancies so that more candidates will apply.
      </div>
    </div>
  );
};

export default NoCandidatePlaceHolder;
