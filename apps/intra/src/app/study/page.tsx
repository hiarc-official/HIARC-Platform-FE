'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import useStudies from '@/features/study/hooks/use-studies';
import { PageLayout, Title, LoadingDots, Button } from '@hiarc-platform/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudyListPage(): React.ReactElement {
  const router = useRouter();
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
      <div className="flex justify-between items-center">
        <Title size="sm" weight="bold">
          스터디
        </Title>
        <Button size="md" className="w-[100px]" onClick={() => router.push('/study/create')}>
          개설하기
        </Button>
      </div>
      <StudySearchSection className="mt-6" />
      <StudyTable 
        className="mt-6" 
        pageableModel={studies} 
        onPageChange={handlePageChange} 
      />
    </PageLayout>
  );
}
