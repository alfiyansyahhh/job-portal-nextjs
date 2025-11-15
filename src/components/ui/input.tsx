import * as React from 'react';
import { cn } from '../../lib/utils';

function Input({
  className,
  type,
  isError = false,
  ...props
}: React.ComponentProps<'input'> & { isError?: any }) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground focus-visible:ring-[1px] placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-[4px] border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        {
          'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500 ':
            isError,
          'focus-visible:border-[#FBC037] focus-visible:ring-[#FBC037]':
            !isError,
        },
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
