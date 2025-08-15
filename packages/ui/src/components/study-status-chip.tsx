'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/utils';

const studyStatusChipVariants = cva(
  cn(
    'inline-flex items-center leading-none px-2 py-1 rounded-lg',
    'select-none',
    'text-xs font-normal'
  ),
  {
    variants: {
      status: {
        PREPARING: 'bg-category-rating/20 text-category-rating',
        PRE_OPEN: 'bg-category-study/20 text-category-study',
        RECRUITING: 'bg-category-etc_background/20 text-category-etc',
        IN_PROGRESS: 'bg-category-general/20 text-category-general',
        CLOSED: 'bg-category-external/20 text-category-external',
      },
    },
    defaultVariants: {
      status: 'PREPARING',
    },
  }
);

const statusText: Record<
  NonNullable<VariantProps<typeof studyStatusChipVariants>['status']>,
  string
> = {
  PREPARING: '준비중',
  PRE_OPEN: '오픈예정',
  RECRUITING: '모집중',
  IN_PROGRESS: '진행중',
  CLOSED: '종료',
};

type StudyStatusChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof studyStatusChipVariants>;

function StudyStatusChip({
  className,
  status = 'PREPARING',
  children,
  ...props
}: StudyStatusChipProps): React.ReactElement {
  return (
    <span
      data-slot="chip"
      className={cn(studyStatusChipVariants({ status }), className)}
      {...props}
    >
      {children ?? statusText[status ?? 'PREPARING']}
    </span>
  );
}

export { StudyStatusChip };
