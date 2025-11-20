'use client';

import { FormInput } from '@/components/ui/form-input';
import { Form } from '@/components/ui/form';
import { FormSelect } from '@/components/ui/form-select';
import { FormTextarea } from '@/components/ui/form-textArea';
import { FormNumberInput } from '@/components/ui/form-input-number';
import { FormBadgeSelect } from '@/components/ui/form-badge-select';
import { createJobSchema } from '@/schemas';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

type CreateNewJobFormProps = {
  form: UseFormReturn<z.infer<typeof createJobSchema>>;
  isPending: boolean;
  handleSubmit: (e: any) => void;
};

const CreateNewJobForm = ({
  form,
  isPending,
  handleSubmit,
}: CreateNewJobFormProps) => {
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-5'>
            <FormInput
              control={form.control}
              name='title'
              label='Job Name'
              type='email'
              placeholder='Ex. Front End Engineer'
              isPending={isPending}
              required
            />

            <FormSelect
              control={form.control}
              name='job_type'
              label='Job Type'
              required
              placeholder='Select job type'
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Internship', label: 'Internship' },
                { value: 'Freelance', label: 'Freelance' },
                { value: 'hr', label: 'Human Resources' },
                { value: 'finance', label: 'Finance' },
                { value: 'operations', label: 'Operations' },
              ]}
            />

            <FormTextarea
              control={form.control}
              name='description'
              label='Job Description'
              placeholder='Ex.'
              required
            />
            <FormInput
              control={form.control}
              name='number_of_candidate'
              label='Number of Candidate Needed'
              type='number'
              placeholder='Ex. 2'
              isPending={isPending}
              required
            />

            <div>Job Salary</div>

            <div className='flex flex-col sm:flex-row gap-3 w-full '>
              <div className='w-full sm:w-[50%]'>
                <FormNumberInput
                  control={form.control}
                  name='salary_range.min'
                  label='Minimum Estimated Salary'
                  placeholder='Rp 0'
                  prefix='Rp '
                  isPending={isPending}
                />
              </div>
              <div className='w-full sm:w-[50%]'>
                <FormNumberInput
                  control={form.control}
                  name='salary_range.max'
                  label='Maximum Estimated Salary'
                  placeholder='Rp 0'
                  prefix='Rp '
                  isPending={isPending}
                />
              </div>
            </div>

            <div className='border rounded-md p-4'>
              <div className='text-[14px] font-bold'>
                Minimum Profile Information Required
              </div>

              <div className='space-y-5 mt-4'>
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.full_name'
                  label='Full Name'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                      disabled: false,
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                      disabled: true,
                    },
                    { label: 'Off', value: 'off', disabled: true },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.photo_profile'
                  label='Photo Profile'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                      disabled: false,
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                      disabled: true,
                    },
                    { label: 'Off', value: 'off', disabled: true },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.gender'
                  label='Gender'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                    },
                    { label: 'Off', value: 'off' },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.domicile'
                  label='Domicile'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                    },
                    { label: 'Off', value: 'off' },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.email'
                  label='Email'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                      disabled: true,
                    },
                    { label: 'Off', value: 'off', disabled: true },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.phone_number'
                  label='Phone number'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                    },
                    { label: 'Off', value: 'off' },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.linkedin_link'
                  label='Linkedin link'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                    },
                    { label: 'Off', value: 'off' },
                  ]}
                />
                <hr />
                <FormBadgeSelect
                  control={form.control}
                  name='profile_requirements.date_of_birth'
                  label='Date of birth'
                  options={[
                    {
                      label: 'Mandatory',
                      value: 'mandatory',
                    },
                    {
                      label: 'Optional',
                      value: 'optional',
                    },
                    { label: 'Off', value: 'off' },
                  ]}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewJobForm;
