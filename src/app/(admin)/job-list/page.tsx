import CardRecrutCandidat from '@/components/card/cardRecrutCandidat';
import { Metadata } from 'next';
import JobListSection from '@/components/sections/jobListSection';
import SearchBox from '@/components/ui/searchBox';

export const metadata: Metadata = {
  title: 'JobList ',
};

interface Job {
  id: string;
  slug: string;
  title: string;
  status: string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
    display_text: string;
  };
  list_card: {
    badge: string;
    started_on_text: string;
    cta: string;
  };
}

interface MessagePageProps {
  searchParams: Promise<{ [key: string]: string }>;
}

const JobList = async ({ searchParams }: MessagePageProps) => {
  const awaitedSearchParams = await searchParams;
  const search = awaitedSearchParams.s;

  const url = new URL('/api/jobs', process.env.NEXT_PUBLIC_BASE_URL);
  if (search) url.searchParams.set('q', search);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  const jobs: Job[] = data.data;

  return (
    <div className='flex flex-wrap-reverse  gap-5 h-screen overflow-auto scrollbar'>
      <div className='w-[1043px] mr-3'>
        <div className=' mt-1 sm:mx-2 bg-white z-10 pb-2'>
          <SearchBox placeholder='Search by job details' />
        </div>
        <JobListSection list={jobs} />
      </div>
      <div className='w-full sm:w-auto  mr-5 z-10 pb-2'>
        <CardRecrutCandidat />
      </div>
    </div>
  );
};

export default JobList;
