import { Skeleton } from '@hiarc-platform/design-system';

// 랭킹/리스트 행 스켈레톤 — 순위 · 티어 · 핸들 · 값(들) 레이아웃에 맞춤.
export function RankRowsSkeleton({
  count = 6,
  trailing = 1,
}: {
  count?: number;
  trailing?: number;
}): React.ReactElement {
  return (
    <div className="flex flex-col" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="grid h-11 grid-cols-[20px_24px_1fr_auto] items-center gap-3 border-b border-gray-100 px-1 last:border-b-0"
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-[19px] w-[19px] rounded" />
          <Skeleton className="h-4 w-24" />
          <div className="flex justify-end gap-3">
            {Array.from({ length: trailing }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-10" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 스트릭 요약 카드(IndividualBlock) 그리드 스켈레톤.
export function StreakCardsSkeleton({ count = 6 }: { count?: number }): React.ReactElement {
  return (
    <div
      className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[19px] w-[19px] rounded" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-4 w-10 rounded-md" />
          </div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-1 h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

// 스트릭 상세 카드(NewStreakEntity) 그리드 스켈레톤 — 헤더 + 기여도 격자 + 통계.
export function StreakEntitySkeleton({ count = 4 }: { count?: number }): React.ReactElement {
  return (
    <div className="grid w-full grid-cols-1 gap-4 min-[1180px]:grid-cols-2" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-8">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

// DS 테이블(CommonTableHead/Body) 모양 스켈레톤 — 헤더 + 행.
export function TableSkeleton({ rows = 8 }: { rows?: number }): React.ReactElement {
  return (
    <div className="w-full" aria-hidden="true">
      <div className="flex items-center border-b border-gray-200 py-3">
        <Skeleton className="h-4 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center border-b border-gray-100 py-3 last:border-b-0">
          <Skeleton className="h-5 w-full" />
        </div>
      ))}
    </div>
  );
}

// 도넛 차트 자리 스켈레톤.
export function DonutSkeleton(): React.ReactElement {
  return (
    <div className="flex items-center justify-center p-4" aria-hidden="true">
      <Skeleton className="h-[180px] w-[180px] rounded-full" />
    </div>
  );
}
