import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminAnnouncementList } from '../use-admin-announcement-list';
import { AnnouncementQueryParams } from '../../types/request/announcement-query-params';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { AnnnouncementType } from '@hiarc-platform/shared';

export function useAdminAnnouncementListPageState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedSemesterId } = useSelectedSemester();

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
    const isPublic = searchParams.get('isPublic');

    if (page) {
      setCurrentPage(Number(page));
    }

    const params: Omit<AnnouncementQueryParams, 'page' | 'size'> = {};
    if (title) {
      params.title = title;
    }
    if (announcementType) {
      params.announcementType = announcementType as AnnnouncementType;
    }
    if (isPublic !== null) {
      if (isPublic === 'true') {
        params.isPublic = true;
      } else if (isPublic === 'false') {
        params.isPublic = false;
      }
      // isPublic가 null이거나 다른 값이면 undefined로 처리 (전체)
    }

    setFilterParams(params);
  }, [searchParams]);

  const {
    data: pageableModel,
    isLoading,
    error,
  } = useAdminAnnouncementList({
    page: currentPage - 1,
    size: pageSize,
    semesterId: Number(selectedSemesterId),
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

  const handleFilterChange = (params: Partial<AnnouncementQueryParams>): void => {
    setFilterParams(params);
    setCurrentPage(1);
    updateURL(1, params);
  };

  return {
    currentPage,
    filterParams,
    pageableModel,
    isLoading,
    error,
    handlePageChange,
    handleFilterChange,
  };
}