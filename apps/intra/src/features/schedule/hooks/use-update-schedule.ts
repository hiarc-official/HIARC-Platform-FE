import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';
import { UpdateScheduleRequest } from '../types/request/update-schedule-request';
import { Schedule } from '../types/model/schedule';

export default function useUpdateSchedule(): UseMutationResult<
  Schedule,
  Error,
  { id: string; scheduleData: UpdateScheduleRequest },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, scheduleData }) => scheduleApi.UPDATE_SCHEDULE(id, scheduleData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', id] });
    },
  });
}