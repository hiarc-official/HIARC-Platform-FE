'use client';

import { AnnouncementSearchSection } from '@/features/announcement/components/announcement-search-section';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';
import useAnnouncements from '@/features/announcement/hooks/use-announcements';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { PageLayout, Title } from '@hiarc-platform/ui';
import { useState } from 'react';

export default function AnnouncementList(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Omit<AnnouncementQueryParams, 'page' | 'size'>>({});
  const pageSize = 10;

  const {
    data: announcements,
    isLoading,
    error,
  } = useAnnouncements({
    page: currentPage - 1,
    size: pageSize,
    ...searchParams,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleSearch = (params: Omit<AnnouncementQueryParams, 'page' | 'size'>): void => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>공지사항을 불러올 수 없습니다.</div>;
  }
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
        공지사항
      </Title>
      <AnnouncementSearchSection className="mt-6" onSearch={handleSearch} />
      <AnnouncementTable
        className="mt-8"
        pageableModel={announcements}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}
