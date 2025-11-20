import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Job = {
  id: string;
  title: string;
  description: string;
  job_type: string;
  number_of_candidate: number;
  salary_range: {
    min: number;
    max: number;
    currency: string;
    display_text: string;
  };
  status: string;
  profile_requirements?: Record<string, string>;
  list_card?: Record<string, string>;
  application_form: any;
};

type JobsState = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (updatedJob: Job) => void;
  removeJob: (id: string) => void;
  getJobById: (id?: string) => Job | undefined;
};

export const useJobs = create<JobsState>()(
  persist(
    (set, get) => ({
      jobs: [],

      setJobs: (jobs) => set({ jobs }),

      addJob: (job) =>
        set((state) => ({
          jobs: [job, ...state.jobs],
        })),

      updateJob: (updatedJob) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
          ),
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),

      getJobById: (id?: string) => {
        return get().jobs.find((job) => job?.id === id);
      },
    }),
    {
      name: 'jobs-storage',
      partialize: (state) => {
        const { setJobs, addJob, updateJob, removeJob, getJobById, ...rest } =
          state;
        return rest;
      },
    }
  )
);
