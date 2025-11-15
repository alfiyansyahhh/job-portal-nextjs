import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden", // Added relative and overflow-hidden
  {
    variants: {
      variant: {
        default:
          'bg-[#FBC037] text-black shadow-xs hover:bg-[#cf9b21] hover:text-white rounded-[4px] ',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineBold:
          'border border-black rounded-[4px] border-2 font-bold bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineGreen:
          'border border-[#21AF7D] text-[#21AF7D] rounded-[4px] border-2 font-bold bg-background shadow-xs hover:bg-accent  dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineRed:
          'border-[1px] border-red-500 text-red-500 rounded-[4px] font-bold bg-background shadow-xs hover:bg-accent  dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Ripple effect component with a single ripple
const Ripple = ({
  position,
  size,
  delay,
}: {
  position: { x: number; y: number };
  size: number;
  delay: number;
}) => {
  return (
    <div
      className='absolute bg-white/50 rounded-full opacity-60 pointer-events-none animate-ripple'
      style={{
        left: `${position.x - size / 2}px`,
        top: `${position.y - size / 2}px`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const [ripple, setRipple] = React.useState<any | null>(null); // Store a single ripple
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(buttonRect.width, buttonRect.height);
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;

    const newRipple = {
      x,
      y,
      size: size * 0.8,
      delay: 0,
    };

    setRipple(newRipple);

    setTimeout(() => {
      setRipple(null);
    }, 800);
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size, className }), {
        'opacity-50 pointer-events-none': loading,
      })}
      disabled={loading}
      {...props}
      onClick={(e: any) => {
        handleClick(e);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {loading ? (
        <span className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin' />
      ) : (
        children
      )}
      {ripple && (
        <Ripple
          position={{ x: ripple.x, y: ripple.y }}
          size={ripple.size}
          delay={ripple.delay}
        />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
