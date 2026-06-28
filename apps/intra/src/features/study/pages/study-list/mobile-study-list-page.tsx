'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import { useStudyListPageState } from '@/features/study/hooks/page/use-study-list-page-state';
import {
  SkeletonTransition,
  Title,
  ListPageSkeleton,
  useMinimumLoading,
} from '@hiarc-platform/design-system';

export function MobileStudyListPage(): React.ReactElement {
  const { studies, isLoading, error, filterParams, handlePageChange, handleSearch } =
    useStudyListPageState();

  const showSkeleton = useMinimumLoading(isLoading);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">스터디 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <SkeletonTransition loading={showSkeleton} skeleton={<ListPageSkeleton />}>
      <div className="flex w-full flex-col pt-10">
        <StudySearchSection
          className="mt-4"
          onSearchChange={handleSearch}
          initialValues={filterParams}
        />
        <StudyTable className="mt-4" pageableModel={studies} onPageChange={handlePageChange} />
      </div>
    </SkeletonTransition>
  );
}
