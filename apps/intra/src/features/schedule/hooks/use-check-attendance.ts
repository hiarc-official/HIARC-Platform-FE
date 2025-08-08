import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';

export default function useCheckAttendance(): UseMutationResult<
  void,
  Error,
  { scheduleId: string; memberId: string; isPresent: boolean },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduleId, memberId, isPresent }) =>
      scheduleApi.CHECK_ATTENDANCE(scheduleId, memberId, isPresent),
    onSuccess: (_, { scheduleId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId] });
    },
  });
}