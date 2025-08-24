import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAdminAnnouncementList } from '@/features/announcement/hooks';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { useSelectedSemester } from '@/hooks/use-semester-store';

export function useAnnouncementListPageState() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleWriteAnnouncement = (): void => {
    router.push('/announcement/write');
  };

  return {
    pageableModel,
    isLoading,
    error,
    currentPage,
    filters,
    handlePageChange,
    handleFilterChange,
    handleWriteAnnouncement,
  };
}