'use client';

import { Title, Button, PageLayout, LoadingDots } from '@hiarc-platform/ui';
import { AnnouncementFilter } from '@/features/announcement/components/announcement-filter';
import { useRouter } from 'next/navigation';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import { useAdminAnnouncementList } from '@/features/announcement/hooks';
import { useState } from 'react';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { FadeIn } from '@/components/fade-in';
import { useSelectedSemester } from '@/hooks/use-semester-store';

export default function AnnouncementPage(): React.ReactElement {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // 1-based page
  const [filters, setFilters] = useState<Partial<AnnouncementQueryParams>>({});
  const { selectedSemesterId } = useSelectedSemester();

  const {
    data: pageableModel,
    isLoading,
    error,
  } = useAdminAnnouncementList({
    page: currentPage - 1,
    size: 10,
    semesterId: Number(selectedSemesterId),
    ...filters,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Partial<AnnouncementQueryParams>): void => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />
      </FadeIn>
    );
  }

  if (error) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-gray-500">문제가 발생했습니다.</p>
      </FadeIn>
    );
  }

  const contentComponent = (
    <FadeIn isVisible={Boolean(pageableModel)} duration={0.4} className="flex flex-col">
      <div className="mb-7 flex justify-between">
        <Title size="sm" weight="bold">
          공지사항
        </Title>
        <Button size="md" onClick={() => router.push('/announcement/write')}>
          작성하기
        </Button>
      </div>
      <AnnouncementFilter onFilterChange={handleFilterChange} filters={filters} />
      <AnnouncementTable
        className="mt-6"
        pageableModel={pageableModel}
        onPageChange={handlePageChange}
      />
    </FadeIn>
  );

  return <PageLayout desktopChildren={contentComponent} mobileChildren={contentComponent} />;
}
