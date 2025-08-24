import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useStudies } from '@/features/study/hooks';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';

export function useStudyListPageState() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();

  const {
    data: studiesData,
    isLoading,
    error,
  } = useStudies({
    semesterId: selectedSemesterId ? Number(selectedSemesterId) : 1,
    page: currentPage - 1,
    size: 10,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleCreateStudy = (): void => {
    router.push('/study/create');
  };

  return {
    studiesData,
    isLoading,
    error,
    currentPage,
    handlePageChange,
    handleCreateStudy,
  };
}