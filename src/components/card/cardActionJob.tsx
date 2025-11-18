import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { deactiveJob, deleteJob, publishJob } from '@/zustand/action/jobAction';
import { Job, useJobs } from '@/zustand/store/useJobs';
import { Button } from '../ui/button';
import CreateNewJobDialog from '../sections/jobListSection/CreateNewJobDialog';

const CardActionJob = ({ job }: { job: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobId, setJobId] = useState('');

  const jobsStore = useJobs();

  const handleActionDelete = (id: string) => {
    deleteJob(id)
      .then(() => {
        jobsStore.removeJob(id);
        setIsOpen(false);
      })
      .catch(console.error);
  };

  const handleActionDeactive = (id: string) => {
    deactiveJob(id)
      .then((res) => {
        jobsStore.updateJob(res);
      })
      .catch(console.error);
  };

  const handleActionPublish = (id: string) => {
    publishJob(id)
      .then((res) => {
        jobsStore.updateJob(res);
      })
      .catch(console.error);
  };

  return (
    <>
      <CreateNewJobDialog {...{ isOpen, setIsOpen, jobId }} />

      <DropdownMenu>
        <DropdownMenuTrigger
          tooltip='Action'
          asChild
        >
          <Button
            variant='ghost'
            className='h-8 w-8 p-0 bg-gray-100'
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {job?.status !== 'Active' && (
            <DropdownMenuItem
              className='text-[#01959F] font-bold focus:text-[#01959F]'
              onClick={() => handleActionPublish(job.id)}
            >
              Publish Job
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              setJobId(job.id);
              setIsOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {job?.status !== 'Inactive' && (
            <DropdownMenuItem onClick={() => handleActionDeactive(job.id)}>
              Deactive
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className='text-red-500 font-bold focus:text-red-500'
            onClick={() => handleActionDelete(job.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CardActionJob;
