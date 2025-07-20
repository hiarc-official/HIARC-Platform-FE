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
        rating: 'bg-category-rating/20 text-category-rating',
        study: 'bg-category-study/20 text-category-study',
        etc: 'bg-category-etc_background/20 text-category-etc',
        general: 'bg-category-general/20 text-category-general',
        external: 'bg-category-external/20 text-category-external',
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
