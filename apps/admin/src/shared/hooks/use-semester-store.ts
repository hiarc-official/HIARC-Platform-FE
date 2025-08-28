import { useEffect } from 'react';
import { useSemesterStore } from '@/shared/stores/semester-store';
import { Semester } from '@hiarc-platform/shared';

export function useSemesterStoreInit(): void {
  const { initializeWithCurrentSemester, semesters } = useSemesterStore();

  useEffect(() => {
    if (semesters.length === 0) {
      initializeWithCurrentSemester();
    }
  }, [initializeWithCurrentSemester, semesters.length]);
}

export function useSelectedSemester(): {
  selectedSemester: Semester | null;
  selectedSemesterId: string | null;
} {
  const { getSelectedSemester, selectedSemesterId } = useSemesterStore();
  return {
    selectedSemester: getSelectedSemester(),
    selectedSemesterId,
  };
}

export { useSemesterStore };
