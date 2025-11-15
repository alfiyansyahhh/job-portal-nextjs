'use client';

// import { CardWrapper } from '@//components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormInput } from '../ui/form-input';

import dynamic from 'next/dynamic';
import { Form } from '../ui/form';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '@/schemas';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [isPending, setisPending] = useState(false);

  let { t } = useTranslation();
  let router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setisPending(true);

    signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((data: any) => {
        setisPending(false);

        if (data?.status === 200) {
          router.push('dashboard');
        } else {
          // setisPending(false);
          toast.error('Something went wrong.');
        }
      })
      .catch(() => {
        setisPending(false);
        toast.error('Something went wrong.');
      });
  });

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
              name='email'
              label='E-mail'
              type='email'
              placeholder='Masukkan E-mail'
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name='password'
              label='Password'
              type='password'
              placeholder='Masukkan Kata Sandi'
              isPending={isPending}
              required
              noShowError
            />

            <Button
              type='submit'
              disabled={!form.formState.isValid}
              loading={isPending}
              className='w-full rounded-[5px] h-[50px]'
            >
              {t('Masuk')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
