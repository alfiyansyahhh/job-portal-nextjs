'use client';
import { Job, useJobs } from '@/zustand/store/useJobs';
import JobList from './jobList';
import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const JobListApplicantSection = ({
  list,
  dataJob,
  id,
}: {
  list?: Job[];
  dataJob?: Job;
  id?: any;
}) => {
  const setJobs = useJobs((state) => state.setJobs);

  let router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (list && list.length > 0) {
      setJobs(list);
    }
  }, [list, setJobs]);

  const jobs = useJobs((state) => state.jobs);

  const convertFormatting = (text: string) => {
    return text
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('### '))
          return trimmed.replace(/^###\s?/, 'H3: ');
        if (trimmed.startsWith('## ')) return trimmed.replace(/^##\s?/, 'H2: ');
        if (trimmed.startsWith('# ')) return trimmed.replace(/^#\s?/, 'H1: ');
        if (trimmed.startsWith('- ')) return trimmed.replace(/^- /, '• ');
        return line;
      })
      .join('\n');
  };

  if (status === 'loading') {
    return (
      <div className=' h-[768px]  flex justify-center items-center'>
        loading...
      </div>
    );
  }

  return (
    <div className='flex h-[768px] overflow-hidden gap-3 '>
      {/* list */}
      <JobList
        list={jobs}
        isDetail={Boolean(dataJob)}
        jobId={id}
      />

      {/* detail */}
      {dataJob && (
        <div className='w-full  overflow-auto'>
          <div
            className=' gap-1 cursor-pointer flex md:hidden'
            onClick={() => router.push('/job-list-candidate')}
          >
            <ChevronLeft />
            <div>Back</div>
          </div>
          <div className=' cursor-pointer my-5 md:border-2 rounded-xl py-6 px-[18px]'>
            <div className='flex justify-between w-full  gap-3 border-b pb-3'>
              <div className='flex items-start gap-3 pb-3'>
                <Image
                  width={48}
                  height={48}
                  src={'/icons/rakaminLogo.svg'}
                  alt={'123'}
                />
                <div className='space-y-1'>
                  <div className='bg-[#43936C]  w-fit text-[#FFFFFF] text-[12px] font-bold h-6 py-0.5 px-2 rounded-[4px]'>
                    {dataJob?.job_type}
                  </div>
                  <div className='font-bold text-[18px] mt-2'>
                    {dataJob.title}
                  </div>
                  <div className='text-[14px] text-[#757575]'>Rakamin</div>
                </div>
              </div>
              <Button
                className='font-bold h-8 w-auto'
                onClick={() => {
                  session
                    ? router.push(`/apply-job/${id}`)
                    : router.push('/login');
                }}
              >
                {session ? 'Apply' : 'Login to Apply'}
              </Button>
            </div>

            <div className='py-5  whitespace-pre-line'>
              {convertFormatting(dataJob.description)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListApplicantSection;
