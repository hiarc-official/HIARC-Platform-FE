import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';

export const useCheckAttendanceCode = () => {
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
    }) => studyApi.CHECK_ATTENDANCE_CODE(studyId, lectureRound, attendanceCode),
    onSuccess: (_, { studyId }) => {
      queryClient.invalidateQueries({ queryKey: ['study', studyId] });
      queryClient.invalidateQueries({ queryKey: ['lectures', studyId] });
    },
  });
};
