import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyMemberApi } from '@/features/study/api';

export const useCheckAttendanceCode = (): UseMutationResult<
  void,
  Error,
  {
    studyId: number;
    lectureRound: number;
    attendanceCode: string;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studyId,
      lectureRound,
      attendanceCode,
    }: {
      studyId: number;
      lectureRound: number;
      attendanceCode: string;
    }) => studyMemberApi.CHECK_ATTENDANCE_CODE(studyId, lectureRound, attendanceCode),
    onSuccess: (_, { studyId }) => {
      queryClient.invalidateQueries({ queryKey: ['study', studyId] });
      queryClient.invalidateQueries({ queryKey: ['lectures', studyId] });
    },
  });
};
