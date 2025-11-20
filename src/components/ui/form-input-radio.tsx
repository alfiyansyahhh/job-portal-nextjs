'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  layout?: 'flex' | 'flex-col';
};

export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required,
  disabled,
  layout = 'flex-col',
}: FormRadioGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className='text-red-500 -ml-1'>*</span>}
          </FormLabel>

          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
              className={cn(
                'mt-3',
                layout === 'flex' ? 'flex gap-6' : 'flex flex-col gap-3'
              )}
            >
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className='flex  items-center gap-3'
                >
                  <RadioGroupItem
                    id={`${name}-${opt.value}`}
                    value={opt.value}
                    disabled={disabled}
                    className='cursor-pointer'
                  />
                  <Label
                    className='text-[#404040]'
                    htmlFor={`${name}-${opt.value}`}
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>

          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
