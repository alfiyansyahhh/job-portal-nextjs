'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import CreateNewJobDialog from '../sections/jobListSection/CreateNewJobDialog';

const CardRecrutCandidat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mx-3'>
      <CreateNewJobDialog {...{ isOpen, setIsOpen }} />

      <div className='w-full sm:w-[300px] bg-red-200 h-[168px] rounded-2xl relative overflow-hidden p-6 text-white'>
        <div
          className='absolute inset-0 bg-center bg-cover'
          style={{ backgroundImage: "url('/img/bg-card-bCandidate.jpg')" }}
        />

        <div className='absolute inset-0 bg-black/65' />

        <div className='relative flex flex-col h-full justify-between'>
          <div>
            <div className='text-[18px]'>Recruit the best candidates</div>
            <div className='text-[14px] mt-2'>
              Create jobs, invite, and hire with ease
            </div>
          </div>

          <Button
            variant='primary'
            className='w-full'
            onClick={() => setIsOpen(true)}
          >
            Create a new job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardRecrutCandidat;
