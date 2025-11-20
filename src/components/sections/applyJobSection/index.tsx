'use client';
import { Button } from '@/components/ui/button';
import ModalTakePicture from './modalTakePicture';
import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import ApplyJobForm from '@/components/form/apply-job-form';
import { Job } from '@/zustand/store/useJobs';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';

const buildProfileRequirementsSchema = (profileRequirements: any[]) => {
  const schema: Record<string, any> = {};

  profileRequirements.forEach((fieldConfig) => {
    const { key, validation } = fieldConfig;

    const isRequired = validation?.required;

    switch (key) {
      case 'email':
        schema[key] = isRequired
          ? z.string().email('Invalid email').min(1, `${key} is required`)
          : z.string().optional();
        break;
      case 'date_of_birth':
        schema[key] = isRequired
          ? z.date().min(1, `${key} is required`)
          : z.any().optional();
        break;
      case 'photo_profile':
        schema[key] = isRequired
          ? z
              .instanceof(File)
              .refine((file) => file.size > 0, 'Photo profile is required')
              .refine(
                (file) => file.type.startsWith('image/'),
                'Invalid file type. Only image files are allowed'
              )
          : z.any().optional();
        break;
      default:
        schema[key] = isRequired
          ? z.string().min(1, `${key} is required`)
          : z.string().optional();
        break;
    }
  });

  return z.object(schema);
};

const ApplyJobSection = ({ dataJob }: { dataJob?: Job }) => {
  const [isOpenCamp, setIsOpenCamp] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  let router = useRouter();

  const profileRequirements =
    // dataJob?.application_form?.sections[0]
    //   ?.fields
    //   ||
    [
      { key: 'full_name', validation: { required: true } },
      { key: 'photo_profile', validation: { required: false } },
      { key: 'gender', validation: { required: false } },
      { key: 'domicile', validation: { required: false } },
      { key: 'email', validation: { required: false } },
      { key: 'phone_number', validation: { required: false } },
      { key: 'linkedin_link', validation: { required: false } },
      { key: 'date_of_birth', validation: { required: false } },
    ];

  const profileRequirementsSchema =
    buildProfileRequirementsSchema(profileRequirements);

  type ProfileRequirementsSchema = z.infer<typeof profileRequirementsSchema>;

  const getDefaultValues = (
    profileRequirements: Array<{
      key: string;
      validation: { required: boolean };
    }>
  ) => {
    return profileRequirements.reduce((defaults, requirement) => {
      defaults[requirement.key] = '';
      return defaults;
    }, {} as Record<string, string>);
  };

  const defaultValues = getDefaultValues(profileRequirements);

  const form = useForm<ProfileRequirementsSchema>({
    resolver: zodResolver(profileRequirementsSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const handleSubmitCapture = (file: File | null) => {
    form.setValue('photo_profile', file);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    console.log('sasdasd', values);
    router.push('/apply-success');
  });

  return (
    <div className='relative w-full my-5  sm:max-w-[700px] bg-white sm:border h-[95vh] mx-auto '>
      <ModalTakePicture
        handleSubmitCapture={handleSubmitCapture}
        capturedImage={capturedImage}
        setCapturedImage={setCapturedImage}
        isOpen={isOpenCamp}
        setIsOpen={setIsOpenCamp}
      />
      <div className=' sm:p-[40px]'>
        <div className='flex px-4 sm:px-0 gap-2 items-center justify-between mb-7'>
          <div className='flex gap-4 items-center'>
            <Button
              variant='outline'
              className='w-[20px] h-[25px]'
              onClick={() => router.back()}
            >
              <ArrowLeft />
            </Button>
            <div className='text-[18px] font-bold'>
              Apply {dataJob?.title} at Rakamin
            </div>
          </div>

          <div className='hidden sm:block'>ℹ️ This field required to fill</div>
        </div>
        <div className='max-h-[84vh] sm:max-h-[75vh] pb-10 px-4 overflow-auto'>
          <ApplyJobForm
            form={form}
            isPending={isPending}
            handleSubmit={handleSubmit}
            dataJob={dataJob}
            setIsOpenCamp={setIsOpenCamp}
            capturedImage={capturedImage}
          />
        </div>
      </div>

      <div className='border-t w-full bg-white -bottom-6 sm:bottom-0 absolute px-10 py-3 sm:py-6'>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <Button
              type='submit'
              variant='primary'
              className='w-full'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplyJobSection;
