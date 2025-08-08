import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';
import { Schedule } from '../types/model/schedule';

export default function useSchedule(id: string): UseQueryResult<Schedule, Error> {
  return useQuery({
    queryKey: ['schedules', id],
    queryFn: () => scheduleApi.GET_SCHEDULE(id),
    enabled: !!id,
  });
}