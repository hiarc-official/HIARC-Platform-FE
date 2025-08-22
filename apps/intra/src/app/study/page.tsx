'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import useStudies from '@/features/study/hooks/use-studies';
import { StudyQueryParams } from '@/features/study/types/request/study-query-params';
import { useSemesterStoreInit } from '@/hooks/use-semester-store';
import { PageLayout, Title, LoadingDots } from '@hiarc-platform/ui';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudyListPage(): React.ReactElement {
  useSemesterStoreInit();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<Omit<StudyQueryParams, 'page' | 'size'>>({});
  const pageSize = 10;

  // URL에서 파라미터 읽기
  useEffect(() => {
    const page = searchParams.get('page');
    const studyName = searchParams.get('studyName');
    const semesterId = searchParams.get('semesterId');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    if (page) {
      setCurrentPage(Number(page));
    }

    const params: Omit<StudyQueryParams, 'page' | 'size'> = {};
    if (studyName) {
      params.studyName = studyName;
    }
    if (semesterId) {
      params.semesterId = Number(semesterId);
    }
    if (category) {
      params.category = category;
    }
    if (status) {
      params.status = status as 'active' | 'completed' | 'cancelled';
    }

    setFilterParams(params);
  }, [searchParams]);

  const {
    data: studies,
    isLoading,
    error,
  } = useStudies({
    page: currentPage - 1,
    size: pageSize,
    ...filterParams,
  });

  const updateURL = (page: number, params: Omit<StudyQueryParams, 'page' | 'size'>): void => {
    const newSearchParams = new URLSearchParams();

    if (page > 1) {
      newSearchParams.set('page', page.toString());
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newSearchParams.set(key, value.toString());
      }
    });

    const queryString = newSearchParams.toString();
    const newURL = queryString ? `?${queryString}` : '/study';
    router.replace(newURL, { scroll: false });
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    updateURL(page, filterParams);
  };

  const handleSearch = (params: Omit<StudyQueryParams, 'page' | 'size'>): void => {
    setFilterParams(params);
    setCurrentPage(1);
    updateURL(1, params);
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
      <StudySearchSection
        className="mt-6"
        onSearchChange={handleSearch}
        initialValues={filterParams}
      />
      <StudyTable className="mt-6" pageableModel={studies} onPageChange={handlePageChange} />
    </PageLayout>
  );
}
