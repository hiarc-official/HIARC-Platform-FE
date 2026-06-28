'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface SegmentedControlOption<T extends string | number> {
  label: React.ReactNode;
  value: T;
}

interface SegmentedControlProps<T extends string | number> {
  options: Array<SegmentedControlOption<T>>;
  value: T;
  onChange(value: T): void;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
}

// iOS 스타일 세그먼트 컨트롤 — gray 트랙 위에 선택된 세그먼트가 흰색으로 떠오른다.
export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>): React.ReactElement {
  const padCls = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-1.5 text-md';

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('inline-flex w-fit items-center gap-1 rounded-lg bg-gray-100 p-1', className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'cursor-pointer rounded-md font-medium transition-colors',
              padCls,
              selected
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
