import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';

export default function useDeleteSchedule(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.DELETE_SCHEDULE,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.removeQueries({ queryKey: ['schedules', id] });
    },
  });
}