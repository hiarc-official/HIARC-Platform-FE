import React from 'react';
import { cn } from '../lib/utils';

interface DividerProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const sizeValues = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  size = 'md',
  className,
}) => {
  const isHorizontal = variant === 'horizontal';

  const sizeClass = (() => {
    if (size === 'full') {
      return isHorizontal ? 'w-px h-full' : 'h-px w-full';
    }
    const thickness = sizeValues[size];
    return isHorizontal ? `w-[${thickness}] h-px` : `h-[${thickness}] w-px`;
  })();

  return <div className={cn('bg-gray-500', sizeClass, className)} />;
};
