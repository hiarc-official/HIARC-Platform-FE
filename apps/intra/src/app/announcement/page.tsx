'use client';

import { AnnouncementSearchSection } from '@/features/announcement/components/announcement-search-section';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import useAnnouncements from '@/features/announcement/hooks/use-announcements';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { useSemesterStoreInit } from '@/hooks/use-semester-store';
import { PageLayout, Title, LoadingDots } from '@hiarc-platform/ui';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AnnouncementList(): React.ReactElement {
  useSemesterStoreInit();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<Omit<AnnouncementQueryParams, 'page' | 'size'>>(
    {}
  );
  const pageSize = 10;

  // URL에서 파라미터 읽기
  useEffect(() => {
    const page = searchParams.get('page');
    const title = searchParams.get('title');
    const announcementType = searchParams.get('announcementType');
    const semesterId = searchParams.get('semesterId');

    if (page) {
      setCurrentPage(Number(page));
    }

    const params: Omit<AnnouncementQueryParams, 'page' | 'size'> = {};
    if (title) {
      params.title = title;
    }
    if (announcementType) {
      params.announcementType = announcementType || 'GENERAL';
    }
    if (semesterId) {
      params.semesterId = Number(semesterId);
    }

    setFilterParams(params);
  }, [searchParams]);

  const {
    data: announcements,
    isLoading,
    error,
  } = useAnnouncements({
    page: currentPage - 1,
    size: pageSize,
    ...filterParams,
  });

  const updateURL = (
    page: number,
    params: Omit<AnnouncementQueryParams, 'page' | 'size'>
  ): void => {
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
    const newURL = queryString ? `?${queryString}` : '/announcement';
    router.replace(newURL, { scroll: false });
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    updateURL(page, filterParams);
  };

  const handleSearch = (params: Omit<AnnouncementQueryParams, 'page' | 'size'>): void => {
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
          <p className="text-gray-500">공지사항을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
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
    </PageLayout>
  );
}
