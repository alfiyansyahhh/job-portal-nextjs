import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { cn } from '@/lib/utils';

type BadgeOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type FormBadgeSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: BadgeOption[];
};

export function FormBadgeSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormBadgeSelectProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-4'>
      <label className='text-[14px] font-medium text-[#404040]'>{label}</label>

      <div className='flex gap-2'>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => !option.disabled && field.onChange(option.value)}
            className={cn(
              'px-3 sm:px-4 py-1 rounded-full cursor-pointer border text-sm',
              option.disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : field.value === option.value
                ? 'bg-white text-[#01959F] border-[#01959F]'
                : 'bg-white text-gray-800 border-gray-300 hover:border-[#01959F] hover:text-[#01959F]  hover:bg-gray-50'
            )}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
