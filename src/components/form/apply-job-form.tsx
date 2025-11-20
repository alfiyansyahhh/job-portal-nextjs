'use client';

import { FormInput } from '@/components/ui/form-input';
import { Form } from '@/components/ui/form';
import { FormSelect } from '@/components/ui/form-select';
import { FormDatePicker } from '../ui/form-input-date-picker';
import { FormRadioGroup } from '../ui/form-input-radio';
import { FormPhoneInput } from '../ui/form-input-phone';
import { Job } from '@/zustand/store/useJobs';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type ApplyJobFormProps = {
  form: any;
  isPending: boolean;
  handleSubmit: (e: any) => void;
  dataJob?: Job;
  setIsOpenCamp: Dispatch<SetStateAction<boolean>>;
  capturedImage: any;
};

// Helper to render form fields dynamically
const renderField = (
  field: string,
  fieldConfig: { validation: { required: boolean } },
  form: any,
  isPending: boolean
) => {
  const isRequired = fieldConfig.validation.required;

  switch (field) {
    case 'full_name':
      return (
        <FormInput
          key={field}
          control={form.control}
          name={field}
          label='Full name'
          type='text'
          placeholder='Enter your full name'
          isPending={isPending}
          required={isRequired}
        />
      );

    case 'date_of_birth':
      return (
        <FormDatePicker
          key={field}
          control={form.control}
          name={field}
          label='Select your date of birth'
          required={isRequired}
        />
      );

    case 'gender':
      return (
        <FormRadioGroup
          key={field}
          control={form.control}
          name={field}
          label='Pronoun (gender)'
          required={isRequired}
          layout='flex'
          options={[
            { value: 'm', label: 'She/her (Female)' },
            { value: 'f', label: 'He/him (Male)' },
          ]}
        />
      );

    case 'domicile':
      return (
        <FormSelect
          key={field}
          control={form.control}
          name={field}
          label='Domicile'
          required={isRequired}
          placeholder='Choose your domicile'
          options={[
            { value: 'Full-time', label: 'Kabupaten Aceh Barat - Aceh' },
            { value: 'Contract', label: 'Kabupaten Aceh Besar - Aceh' },
            { value: 'Part-time', label: 'Kabupaten Aceh Selatan - Aceh' },
            { value: 'Internship', label: 'Kabupaten Aceh Tamiang - Aceh' },
            { value: 'Freelance', label: 'Kabupaten Aceh Tengah - Aceh' },
            { value: 'hr', label: 'Kabupaten Aceh Tenggara - Aceh' },
            { value: 'finance', label: 'Kabupaten Aceh Utara - Aceh' },
          ]}
        />
      );

    case 'phone_number':
      return (
        <FormPhoneInput
          key={field}
          control={form.control}
          name={field}
          label='Phone number'
          isPending={isPending}
          required={isRequired}
        />
      );

    case 'email':
      return (
        <FormInput
          key={field}
          control={form.control}
          name={field}
          label='Email'
          type='email'
          placeholder='Enter your email address'
          isPending={isPending}
          required={isRequired}
        />
      );

    case 'linkedin_link':
      return (
        <FormInput
          key={field}
          control={form.control}
          name={field}
          label='LinkedIn Link'
          placeholder='https://linkedin.com/in/username'
          isPending={isPending}
          required={isRequired}
        />
      );

    default:
      return null;
  }
};

const ApplyJobForm = ({
  form,
  isPending,
  handleSubmit,
  dataJob,
  setIsOpenCamp,
  capturedImage,
}: ApplyJobFormProps) => {
  // Profile requirements configuration
  const profileRequirements = dataJob?.application_form?.sections[0]
    ?.fields || [
    { key: 'full_name', validation: { required: true } },
    { key: 'photo_profile', validation: { required: true } },
    { key: 'gender', validation: { required: true } },
    { key: 'domicile', validation: { required: false } },
    { key: 'email', validation: { required: true } },
    { key: 'phone_number', validation: { required: true } },
    { key: 'linkedin_link', validation: { required: true } },
    { key: 'date_of_birth', validation: { required: false } },
  ];

  const photoProfileField = profileRequirements.find(
    (field: any) => field.key === 'photo_profile'
  );

  return (
    <div>
      {photoProfileField && (
        <div className='mb-5'>
          <div className='flex items-center gap-1'>
            <div className='text-[14px] font-bold'>Photo Profile</div>
            {photoProfileField?.validation?.required && (
              <div className='text-red-500 font-bold text-[12px]'>*</div>
            )}
          </div>
          <div className='text-red-500 text-[12px] font-medium'>
            {form.formState.errors?.photo_profile?.message}
          </div>

          {capturedImage && (
            <img
              src={capturedImage}
              alt='captured'
              width={128}
              height={128}
              className='mb-3 mt-2 rounded-xl'
            />
          )}

          <Button
            className='mt-2'
            variant='outline'
            onClick={() => setIsOpenCamp(true)}
          >
            <div className='flex gap-2 items-center'>
              <Upload />
              <div className='font-bold'>Take a Pitcure</div>
            </div>
          </Button>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-5'>
            {profileRequirements.map((fieldConfig: any) => {
              return renderField(
                fieldConfig?.key,
                fieldConfig,
                form,
                isPending
              );
            })}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplyJobForm;
