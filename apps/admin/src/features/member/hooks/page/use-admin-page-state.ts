import { useSelectedSemester } from '@/hooks/use-semester-store';
import { useAdmins, useInstructors } from '@/features/member/hooks';

export function useAdminPageState() {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: adminList } = useAdmins(Number(selectedSemesterId));
  const { data: instructorList } = useInstructors(Number(selectedSemesterId));

  return {
    adminList: adminList || [],
    instructorList: instructorList || [],
  };
}