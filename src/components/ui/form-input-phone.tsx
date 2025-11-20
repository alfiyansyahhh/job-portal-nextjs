'use client';

import React, { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type CountryOption = {
  label: string;
  value: string;
  flag: string;
  dialCode: string;
};

// List of countries with dial codes
const countryOptions: CountryOption[] = [
  { label: 'Indonesia', value: 'ID', flag: '🇮🇩', dialCode: '+62' },
  { label: 'United States', value: 'US', flag: '🇺🇸', dialCode: '+1' },
  { label: 'United Kingdom', value: 'GB', flag: '🇬🇧', dialCode: '+44' },
  // Add more countries as needed
];

type FormPhoneInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  isPending?: boolean;
};

export const FormPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  disabled,
  isPending,
}: FormPhoneInputProps<T>) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    countryOptions[0]
  );

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
            <div className='relative w-full'>
              <div className='relative'>
                <Select
                  value={selectedCountry?.value}
                  onValueChange={(value) => {
                    const country = countryOptions.find(
                      (option) => option.value === value
                    );
                    if (country) {
                      setSelectedCountry(country);
                      field.onChange(country.dialCode);
                    }
                  }}
                >
                  <SelectTrigger className='flex shadow-none absolute items-center px-3 cursor-pointer border-none bg-transparent outline-none focus:ring-0 focus:outline-none focus-visible:ring-0'>
                    <SelectValue>{selectedCountry?.flag}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                      >
                        <div className='flex cursor-pointer items-center gap-2'>
                          {opt.flag} {opt.label} ({opt.dialCode})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className='absolute left-13 top-1.5 text-[#E0E0E0]'>|</div>

                <Input
                  type='tel'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='+62 81XXXXXXXXX'
                  disabled={disabled || isPending}
                  className='flex-1  pl-15'
                />
              </div>
            </div>
          </FormControl>

          {fieldState?.error && (
            <FormMessage className='text-xs text-red-500 -mt-1'>
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
