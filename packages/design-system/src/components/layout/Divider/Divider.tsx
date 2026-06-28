import React from 'react';
import { cn } from '../../../lib/utils';

interface DividerProps {
  variant?: 'horizontal' | 'vertical';
  size?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  size = '8px',
  className,
}) => {
  const isHorizontal = variant === 'horizontal';
  const isFull = size === 'full';

  // 임의 px 크기는 동적 Tailwind 클래스(w-[${size}]) 대신 인라인 스타일로 적용한다.
  // (Tailwind v4 는 런타임 생성 클래스를 감지하지 못함 — 길이는 스타일, 두께(1px)는 클래스로)
  const sizeClass = isFull
    ? isHorizontal
      ? 'h-px w-full'
      : 'h-full w-px'
    : isHorizontal
      ? 'h-px'
      : 'w-px';

  const sizeStyle: React.CSSProperties = isFull
    ? {}
    : isHorizontal
      ? { width: size }
      : { height: size };

  return <div className={cn('bg-gray-500', sizeClass, className)} style={sizeStyle} />;
};
