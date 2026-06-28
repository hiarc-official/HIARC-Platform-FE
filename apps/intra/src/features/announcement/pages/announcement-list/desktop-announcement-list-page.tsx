'use client';

import { AnnouncementSearchSection } from '@/features/announcement/components/announcement-search-section/AnnouncementSearchSection';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table/AnnouncementTable';

import {
  SkeletonTransition,
  Title,
  ListPageSkeleton,
  useMinimumLoading,
} from '@hiarc-platform/design-system';
import { useAnnouncementListPageState } from '../../hooks/page/use-announcement-list-page-state';

export function DesktopAnnouncementListPage(): React.ReactElement {
  const { filterParams, announcements, isLoading, error, handlePageChange, handleSearch } =
    useAnnouncementListPageState();

  const showSkeleton = useMinimumLoading(isLoading);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">공지사항을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <SkeletonTransition loading={showSkeleton} skeleton={<ListPageSkeleton />}>
      <div className="flex flex-col">
        <Title size="sm" weight="bold" className="hidden md:block">
          공지사항
        </Title>
        <AnnouncementSearchSection
          className="mt-6"
          onSearch={handleSearch}
          initialValues={filterParams}
        />
        <AnnouncementTable
          className="mt-8"
          pageableModel={announcements}
          onPageChange={handlePageChange}
        />
      </div>
    </SkeletonTransition>
  );
}
