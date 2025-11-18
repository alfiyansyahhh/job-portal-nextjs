'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema } from '@/schemas';
import { z } from 'zod';
import { Form } from '@/components/ui/form';

import CreateNewJobForm from '@/components/form/create-new-job-form';
import { createNewJob, deleteJob, editJob } from '@/zustand/action/jobAction';
import { useJobs } from '@/zustand/store/useJobs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type CreateNewJobModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  jobId?: string;
};

const CreateNewJobModal = ({
  isOpen,
  setIsOpen,
  jobId,
}: CreateNewJobModalProps) => {
  const [isPending, setIsPending] = useState(false);

  const getJobById = useJobs((state) => state.getJobById);
  const jobsStore = useJobs();

  const job = getJobById(jobId);

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      job_type: '',
      description: '',
      number_of_candidate: 0,
      salary_range: {
        min: 0,
        max: 0,
      },
      profile_requirements: {
        full_name: 'mandatory',
        photo_profile: 'mandatory',
        gender: '',
        domicile: '',
        email: 'mandatory',
        phone_number: '',
        linkedin_link: '',
        date_of_birth: '',
      },
    },
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        job_type: job.job_type,
        description: job.description,
        number_of_candidate: job.number_of_candidate,
        salary_range: {
          min: job.salary_range.min,
          max: job.salary_range.max,
        },
        profile_requirements: job.profile_requirements || {
          full_name: 'mandatory',
          photo_profile: 'mandatory',
          gender: '',
          domicile: '',
          email: 'mandatory',
          phone_number: '',
          linkedin_link: '',
          date_of_birth: '',
        },
      });
    }
  }, [job]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitter = (event.nativeEvent as any).submitter as HTMLButtonElement;
    const status = submitter.dataset.status;

    form.handleSubmit((values) => {
      setIsPending(true);

      let promise: Promise<any> | null = null;

      if (status === 'Delete' && jobId) {
        promise = deleteJob(jobId);
      } else if (jobId) {
        promise = editJob({ ...values, id: jobId, status });
      } else {
        promise = createNewJob({ ...values, status });
      }

      if (promise) {
        promise
          .then((res) => {
            if (status === 'Delete' && jobId) {
              jobsStore.removeJob(jobId);
            } else if (jobId) {
              jobsStore.updateJob(res);
            } else {
              jobsStore.addJob(res);
            }

            if (status !== 'Delete') form.reset();
            setIsOpen(false);
          })
          .catch(console.error)
          .finally(() => setIsPending(false));
      } else {
        setIsPending(false);
      }
    })(event);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white  mx-5 overflow-hidden relative w-[900px] max-w-full rounded-lg min-h-[30vh] max-h-[80vh] '>
            <div className='flex justify-between border-b items-center mb-4  p-6'>
              <h2 className='text-[18px] font-bold'>Job Opening</h2>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-500 hover:text-gray-700 font-bold cursor-pointer'
              >
                <X />
              </button>
            </div>
            <div className='px-6  max-h-[500px] pb-40 scrollbar overflow-auto  '>
              <CreateNewJobForm
                form={form}
                handleSubmit={handleSubmit}
                isPending={isPending}
              />
            </div>

            <div className='flex absolute bottom-0 bg-white w-full  justify-end border-t  items-center   p-6 -mb-6'>
              <Form {...form}>
                <form
                  onSubmit={handleSubmit}
                  className=' gap-2 flex flex-wrap-reverse mb-6 justify-end'
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      tooltip='Action'
                      asChild
                      className='block sm:hidden'
                    >
                      <Button
                        variant='ghost'
                        className=' bg-gray-100'
                      >
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='block sm:hidden'
                      align='end'
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuItem>
                        <Button
                          variant='default'
                          className='h-8   rounded-md w-[106px]'
                          type='submit'
                          disabled={!form.formState.isValid}
                          loading={isPending}
                          data-status='Draft'
                        >
                          Draft Job
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Button
                          variant='danger'
                          className='h-8  rounded-md w-[106px]'
                          type='submit'
                          disabled={!form.formState.isValid}
                          loading={isPending}
                          data-status='Delete'
                        >
                          Detele
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {jobId && (
                    <Button
                      variant='danger'
                      className='h-8 hidden sm:block rounded-md w-[106px]'
                      type='submit'
                      disabled={!form.formState.isValid}
                      loading={isPending}
                      data-status='Delete'
                    >
                      Detele
                    </Button>
                  )}

                  <Button
                    variant='default'
                    className='h-8  hidden sm:block  rounded-md w-[106px]'
                    type='submit'
                    disabled={!form.formState.isValid}
                    loading={isPending}
                    data-status='Draft'
                  >
                    Draft Job
                  </Button>
                  <Button
                    variant='primary'
                    className='h-8 rounded-md w-[106px]'
                    type='submit'
                    disabled={!form.formState.isValid}
                    loading={isPending}
                    data-status='Active'
                  >
                    Publish Job
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewJobModal;
