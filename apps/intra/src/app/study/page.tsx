'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import useStudies from '@/features/study/hooks/use-studies';
import { PageLayout, Title, LoadingDots } from '@hiarc-platform/ui';
import { useState } from 'react';

export default function StudyListPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: studies,
    isLoading,
    error,
  } = useStudies({
    page: currentPage - 1,
    size: 10,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <LoadingDots size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">스터디 목록을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          스터디
        </Title>
      </div>
      <StudySearchSection className="mt-6" />
      <StudyTable className="mt-6" pageableModel={studies} onPageChange={handlePageChange} />
    </PageLayout>
  );
}
