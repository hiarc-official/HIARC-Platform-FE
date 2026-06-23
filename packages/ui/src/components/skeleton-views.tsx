import { cn } from '../lib/utils';
import { Skeleton } from './skeleton';

/**
 * 데이터 패칭 중 보여줄 페이지 단위 스켈레톤 모음.
 * 모두 w-full 기준이며, 상위 컨테이너(PageLayout 등)의 폭/패딩을 그대로 따릅니다.
 */

interface SkeletonViewProps {
  className?: string;
}

/**
 * 리스트/테이블 페이지용 스켈레톤 (제목 + 검색/필터 + 테이블 행)
 */
export function ListPageSkeleton({
  rows = 8,
  className,
}: SkeletonViewProps & { rows?: number }): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} aria-hidden="true">
      <Skeleton className="h-8 w-40" />
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-11 w-full" />
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={`list-row-${index}`} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

/**
 * 상세 페이지용 스켈레톤 (카테고리 칩 + 제목 + 메타 + 본문)
 */
export function DetailPageSkeleton({ className }: SkeletonViewProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} aria-hidden="true">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-9 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/**
 * 작성/편집 폼 페이지용 스켈레톤 (헤더 + 라벨/인풋 묶음 + 액션 버튼)
 */
export function FormSkeleton({
  fields = 5,
  className,
}: SkeletonViewProps & { fields?: number }): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} aria-hidden="true">
      <Skeleton className="h-8 w-40" />
      <div className="flex flex-col gap-5">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={`form-field-${index}`} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

/**
 * 프로필(내 정보/회원 상세) 페이지용 스켈레톤 (아바타 + 이름 + 섹션 블록)
 */
export function ProfileSkeleton({
  sections = 3,
  className,
}: SkeletonViewProps & { sections?: number }): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)} aria-hidden="true">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: sections }).map((_, index) => (
          <Skeleton key={`profile-section-${index}`} className="h-28 w-full" />
        ))}
      </div>
    </div>
  );
}
