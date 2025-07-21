import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  cn(
    'shadow-xs border-input file:text-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] selection:bg-primary file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'placeholder-gray-500'
  ),
  {
    variants: {
      variant: {
        search: cn('w-60 rounded-md bg-gray-100 px-3 py-2 pl-10 text-sm'),
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Input({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>): React.ReactElement {
  return (
    <div className="relative w-full">
      {type === 'search' && (
        /* eslint-disable @next/next/no-img-element */
        /*img태그 성능이슈 있음 */
        <img
          src="/ZoomIn.svg"
          alt="Search Icon"
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
        />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
}

export { Input };
