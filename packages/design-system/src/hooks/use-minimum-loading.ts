'use client';

import { useEffect, useRef, useState } from 'react';

interface UseMinimumLoadingOptions {
  /** 스켈레톤이 한 번 표시되면 최소 이 시간(ms)만큼은 유지합니다. */
  minDuration?: number;
}

/**
 * 로딩 상태가 너무 빨리 끝날 때 스켈레톤이 깜빡이며 사라지는 현상을 방지합니다.
 *
 * - isLoading이 true가 되면 즉시 true를 반환(콘텐츠가 데이터 없이 렌더되는 것을 막기 위함).
 * - isLoading이 false가 되어도, 스켈레톤이 표시된 지 minDuration이 지나지 않았다면
 *   남은 시간 동안 true를 유지한 뒤 false로 전환합니다.
 *
 * @param isLoading 원본 로딩 상태
 * @param options.minDuration 최소 표시 시간(ms), 기본 400ms
 * @returns 스켈레톤 표시 여부
 */
export function useMinimumLoading(
  isLoading: boolean,
  { minDuration = 400 }: UseMinimumLoadingOptions = {}
): boolean {
  // 최초 렌더에서 콘텐츠가 데이터 없이 그려지지 않도록 isLoading으로 초기화
  const [show, setShow] = useState(isLoading);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      if (startedAtRef.current === null) {
        startedAtRef.current = Date.now();
      }
      setShow(true);
      return;
    }

    // 로딩 종료: 스켈레톤이 표시된 적이 없으면 즉시 숨김
    if (startedAtRef.current === null) {
      setShow(false);
      return;
    }

    const remaining = minDuration - (Date.now() - startedAtRef.current);
    if (remaining <= 0) {
      startedAtRef.current = null;
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      startedAtRef.current = null;
      setShow(false);
    }, remaining);
    return () => clearTimeout(timer);
  }, [isLoading, minDuration]);

  return show;
}
