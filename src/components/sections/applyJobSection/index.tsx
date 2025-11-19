'use client';
import { Button } from '@/components/ui/button';
import ModalTAkePicture from './modalTakePicture';
import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

const ApplyJobSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative w-full my-5  p-[40px] sm:max-w-[700px] bg-white border h-[95vh] mx-auto '>
      <ModalTAkePicture
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className='flex gap-2 items-center justify-between mb-7'>
        <div className='flex gap-2 items-center'>
          <Button
            variant='outline'
            className='w-[20px] h-[25px]'
          >
            <ArrowLeft />
          </Button>
          <div>Apply Front End at Rakamin</div>
        </div>

        <div>ℹ️ This field required to fill</div>
      </div>

      <Button
        variant='outline'
        onClick={() => setIsOpen(true)}
      >
        <div className='flex gap-2 items-center'>
          <Upload />
          <div className='font-bold'>Take a Pitcure</div>
        </div>
      </Button>
      <div className='border-t w-full bottom-0 absolute px-10 py-6'>
        <Button
          variant='primary'
          className='w-full'
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApplyJobSection;
