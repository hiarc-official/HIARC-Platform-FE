'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface SkeletonTransitionProps {
  /** 스켈레톤 표시 여부 (보통 useMinimumLoading 결과) */
  loading: boolean;
  /** 로딩 중 보여줄 스켈레톤 */
  skeleton: React.ReactNode;
  children: React.ReactNode;
  /** 페이드 인 길이(ms) */
  duration?: number;
  className?: string;
}

// 로딩이 끝나면 콘텐츠를 페이드 인 해 스켈레톤 → 콘텐츠 전환을 부드럽게 한다.
// 콘텐츠는 데이터가 필요하므로 로딩 중에는 렌더하지 않는다(스켈레톤만 표시).
export function SkeletonTransition({
  loading,
  skeleton,
  children,
  duration = 300,
  className,
}: SkeletonTransitionProps): React.ReactElement {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (loading) {
      setShown(false);
      return;
    }
    // 마운트 직후 한 프레임 뒤 opacity 를 올려 transition 이 작동하게 한다.
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [loading]);

  if (loading) {
    return <>{skeleton}</>;
  }

  return (
    <div
      className={className}
      style={{ opacity: shown ? 1 : 0, transition: `opacity ${duration}ms ease-out` }}
    >
      {children}
    </div>
  );
}
