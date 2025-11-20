'use client';

import * as React from 'react';
import { CalendarDays, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
};

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  required,
  disabled,
}: DatePickerProps<T>) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-between font-normal'
                  onClick={() => setOpen(!open)}
                  disabled={disabled}
                >
                  <div className='w-48 flex items-center gap-2 font-normal'>
                    <CalendarDays />
                    {date ? (
                      <div className='mt-1'>{date.toLocaleDateString()}</div>
                    ) : (
                      <div className='mt-1 text-[#9E9E9E]'> Select date </div>
                    )}
                  </div>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden p-0'
                align='start'
              >
                <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    field.onChange(selectedDate); // Update react-hook-form field value
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {fieldState?.error && (
            <FormMessage className='text-xs -mt-1'>
              {fieldState?.error?.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
