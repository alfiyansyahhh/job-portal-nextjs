'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ApplySucces = () => {
  let router = useRouter();
  return (
    <div className=' h-screen  flex flex-col justify-center items-center'>
      <Image
        src={'/icons/verifiedApply.svg'}
        width={214.002197265625}
        height={192.2778778076172}
        alt={''}
      />
      <div className='text-[#404040] text-[24px] font-bold mt-3'>
        🎉 Your application was sent!
      </div>
      <div className='w-[606px] text-[16px] text-center my-3'>
        Congratulations! You've taken the first step towards a rewarding career
        at Rakamin. We look forward to learning more about you during the
        application process.
      </div>
      <Button onClick={() => router.push('/job-list-candidate')}>
        Back to Home
      </Button>
    </div>
  );
};

export default ApplySucces;
