import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { cn } from '../../lib/utils';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useTranslation } from 'react-i18next';

type FormInputProps<T extends FieldValues> =
  React.ComponentPropsWithRef<'input'> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending?: boolean;
    noShowError?: boolean;
    labelPosition?: 'top' | 'left';
    labelWidth?: string;
    inputWidth?: string;
    labelSize?: string;
    type?: 'text' | 'password' | 'textarea' | string;
    rightUtil?: React.ReactNode;
    labelWeight?: string;
  };

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const {
    control,
    name,
    label,
    isPending,
    disabled,
    required,
    type = 'text',
    noShowError = false,
    labelPosition = 'top',
    labelWidth = 'w-[150px]',
    inputWidth = 'w-full',
    labelSize = 'font-medium',
    labelWeight = 'font-normal',
    ...rest
  } = props;

  const { placeholder } = rest;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div
            className={cn(
              labelPosition === 'left'
                ? 'flex flex-wrap items-center gap-4 '
                : 'flex flex-col space-y-1',
              'w-full'
            )}
          >
            <FormLabel
              className={cn(
                labelSize,

                labelPosition === 'left' && `${labelWidth} min-w-fit `,
                labelWeight
              )}
            >
              {t(label)}{' '}
              {required && <div className='text-red-500 -ml-2'>*</div>}
            </FormLabel>

            <div className={cn('flex items-center gap-2 w-full', inputWidth)}>
              <FormControl>
                <div className='relative w-full'>
                  <Input
                    {...field}
                    {...rest}
                    placeholder={t(placeholder ?? '')}
                    type={type === 'password' && !showPassword ? type : 'text'}
                    value={type === 'password' ? passwordValue : field?.value}
                    onChange={(e) => {
                      if (type === 'password') {
                        setPasswordValue(e.target.value);
                      }

                      if (type === 'number') {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        field.onChange(Number(numericValue));
                        return;
                      }
                      field.onChange(e);
                    }}
                    isError={!noShowError && fieldState.error}
                    className={cn(
                      disabled && 'bg-[#DDDDDD]',
                      'h-10 border placeholder:text-[#94A3B8] py-4 px-3.5 w-full'
                    )}
                    disabled={isPending || disabled}
                  />

                  {type === 'password' && (
                    <div
                      onClick={togglePasswordVisibility}
                      className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer'
                    >
                      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  )}
                </div>
              </FormControl>

              {props.rightUtil && (
                <div className='shrink-0'>{props.rightUtil}</div>
              )}
            </div>

            {!noShowError && <FormMessage className='text-xs ' />}
          </div>
        </FormItem>
      )}
    />
  );
};
