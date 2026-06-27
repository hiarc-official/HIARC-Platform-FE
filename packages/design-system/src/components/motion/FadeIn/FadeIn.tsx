'use client';

import React from 'react';

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isVisible: boolean;
  /** 트랜지션 길이(초). framer-motion 시절 API 호환을 위해 초 단위 유지. */
  duration?: number;
  /** CSS easing 값. */
  ease?: string;
  className?: string;
}

// ponytail: framer-motion → CSS opacity transition. 모든 페이지가 쓰던 컴포넌트라
// 라이브러리를 크리티컬 패스에서 제거. 동작은 controlled opacity로 동일.
export function FadeIn({
  children,
  isVisible,
  duration = 0.5,
  ease = 'ease-in-out',
  className,
  style,
  ...rest
}: FadeInProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}s ${ease}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
