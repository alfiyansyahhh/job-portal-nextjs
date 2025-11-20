import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { NumericFormat } from 'react-number-format';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type FormNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isPending?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: string;
  thousandSeparator?: boolean;
};

export const FormNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  isPending,
  required,
  disabled,
  prefix,
}: FormNumberInputProps<T>) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {t(label)}{' '}
            {required && <span className='text-red-500 -ml-2'>*</span>}
          </FormLabel>
          <FormControl>
            <NumericFormat
              value={field.value ?? ''}
              customInput={Input}
              thousandSeparator='.'
              decimalSeparator=','
              prefix={prefix}
              disabled={isPending || disabled}
              className={cn(
                'h-10 border placeholder:text-[#94A3B8] py-4 px-3.5 w-full',
                disabled && 'bg-[#DDDDDD]'
              )}
              onValueChange={(values) => {
                field.onChange(values.floatValue ?? 0);
              }}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage className='text-xs -mt-1'>
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
