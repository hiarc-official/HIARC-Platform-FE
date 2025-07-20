import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md text-sm font-medium transition-all duration-150',
    'hover:-translate-y-[2px] hover:shadow-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none'
  ),
  {
    variants: {
      variant: {
        fill: cn(
          'bg-primary-300 text-white',
          'hover:bg-primary-300/80',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        fill_light: cn(
          'bg-primary-100 text-gray-100',
          'hover:bg-primary-100/80',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        fill_secondary: cn(
          'bg-gray-200 text-gray-900',
          'hover:bg-gray-200/50',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        line: cn(
          'border border-primary-300 bg-background text-gray-900',
          'hover:bg-gray-100 hover:border-primary-300/50',
          'disabled:border-gray-200 disabled:text-gray-300'
        ),
        line_secondary: cn(
          'border border-gray-300 bg-background text-gray-900',
          'hover:bg-gray-100 hover:border-gray-300/50',
          'disabled:border-gray-200 disabled:text-gray-300'
        ),
        social_login: cn(
          'border border-gray-200 bg-background',
          'hover:bg-gray-100 hover:border-gray-200/50',
          'disabled:border-gray-200 disabled:text-gray-300'
        ),
      },
      size: {
        xs: 'h-8 px-4 rounded-sm',
        sm: 'h-10 px-4',
        md: 'h-11 px-5',
        lg: 'h-12 px-7',
        xl: 'h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'fill',
      size: 'lg',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): React.ReactElement {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
