import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { Semester } from '@hiarc-platform/shared';
import { semesterApi } from '../api/semester';

export const useCreateAdminAnnouncement = (): UseMutationResult<
  Semester,
  unknown,
  { semesterYear: number; semesterType: 'FIRST' | 'SECOND' },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    Semester,
    unknown,
    { semesterYear: number; semesterType: 'FIRST' | 'SECOND' },
    unknown
  >({
    mutationFn: ({ semesterYear, semesterType }) =>
      semesterApi.CREATE_SEMESTER({ semesterYear, semesterType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-semesters'] });
    },
  });
};
