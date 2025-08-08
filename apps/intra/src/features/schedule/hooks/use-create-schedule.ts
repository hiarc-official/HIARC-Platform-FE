import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';
import { CreateScheduleRequest } from '../types/request/create-schedule-request';
import { Schedule } from '../types/model/schedule';

export default function useCreateSchedule(): UseMutationResult<
  Schedule,
  Error,
  CreateScheduleRequest,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleApi.CREATE_SCHEDULE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
}