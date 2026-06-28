import { cn } from '../../../lib/utils';
import { Skeleton } from '../Skeleton/Skeleton';

/**
 * 데이터 패칭 중 보여줄 페이지 단위 스켈레톤 모음.
 * 모두 w-full 기준이며, 상위 컨테이너(PageLayout 등)의 폭/패딩을 그대로 따릅니다.
 */

interface SkeletonViewProps {
  className?: string;
}

/**
 * 리스트/테이블 페이지용 스켈레톤.
 * 실제 레이아웃(제목 + 테두리 검색 박스 + 상단 보더 테이블)을 반영하며,
 * 검색 박스는 데스크톱에서 테두리 카드, 모바일에서 "상세 검색" 버튼으로 표시됩니다.
 */
export function ListPageSkeleton({
  rows = 6,
  filters = 3,
  headerAction = false,
  className,
}: SkeletonViewProps & {
  rows?: number;
  filters?: number;
  headerAction?: boolean;
}): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col', className)} aria-hidden="true">
      {/* 제목 + (선택) 우측 액션 버튼 (데스크톱) */}
      <div className="hidden items-center justify-between md:flex">
        <Skeleton className="h-7 w-24" />
        {headerAction && <Skeleton className="h-10 w-24" />}
      </div>

      {/* 검색 섹션 - 데스크톱: 테두리 박스 */}
      <div className="mt-6 hidden w-full items-end gap-4 rounded-md border border-gray-200 p-6 md:flex">
        {Array.from({ length: filters }).map((_, index) => (
          <div key={`filter-${index}`} className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[134px]" />
          <Skeleton className="h-10 w-[134px]" />
        </div>
      </div>
      {/* 검색 섹션 - 모바일: 상세 검색 버튼 */}
      <Skeleton className="mt-6 h-8 w-24 rounded-md md:hidden" />

      {/* 테이블 */}
      <div className="mt-8 flex w-full flex-col">
        {/* 테이블 헤더 (데스크톱, 상/하단 보더) */}
        <div className="hidden border-b border-t border-b-gray-200 border-t-gray-900 py-3 md:block">
          <Skeleton className="h-5 w-full" />
        </div>
        {/* 행 */}
        <div className="flex flex-col">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={`list-row-${index}`} className="border-b border-gray-100 py-4">
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
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
