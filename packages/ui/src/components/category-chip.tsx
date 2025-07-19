'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/utils';

const categoryChipVariants = cva(
  cn(
    'inline-flex items-center leading-none px-2 py-1 rounded-lg',
    'select-none',
    'text-xs font-normal'
  ),
  {
    variants: {
      category: {
        rating: 'bg-yellow-100 text-yellow-700',
        study: 'bg-blue-100 text-blue-700',
        etc: 'bg-gray-100 text-gray-700',
        general: 'bg-green-100 text-green-700',
        external: 'bg-purple-100 text-purple-700',
      },
    },
    defaultVariants: {
      category: 'rating',
    },
  }
);

const categoryText: Record<
  NonNullable<VariantProps<typeof categoryChipVariants>['category']>,
  string
> = {
  rating: '하이팅',
  study: '스터디',
  etc: '기타',
  general: '학회일정',
  external: '외부',
};

type CategoryChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof categoryChipVariants>;

function CategoryChip({
  className,
  category = 'rating',
  children,
  ...props
}: CategoryChipProps): React.ReactElement {
  return (
    <span data-slot="chip" className={cn(categoryChipVariants({ category }), className)} {...props}>
      {children ?? categoryText[category ?? 'rating']}
    </span>
  );
}

export { CategoryChip };
