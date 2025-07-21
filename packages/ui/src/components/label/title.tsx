'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const titleVariants = cva(
  cn(
    'flex items-center gap-2 leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50'
  ),
  {
    variants: {
      size: {
        sm: 'text-2xl',
        lg: 'text-5xl',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

type TitleProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof titleVariants> & {
    selectable?: boolean;
  };

function Title({
  className,
  size,
  weight,
  selectable = true,
  ...props
}: TitleProps): React.ReactElement {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        titleVariants({ size, weight }),
        selectable ? 'select-text' : 'select-none',
        className
      )}
      {...props}
    />
  );
}

export { Title };
