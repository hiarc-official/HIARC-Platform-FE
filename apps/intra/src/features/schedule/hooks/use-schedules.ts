import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { scheduleApi } from '../api/schedule';
import { ScheduleQueryParams } from '../types/request/schedule-query-params';
import { PageableModel } from '@/shared/types/pageable-model';
import { Schedule } from '../types/model/schedule';

export default function useSchedules(
  params: ScheduleQueryParams = {}
): UseQueryResult<PageableModel<Schedule>, Error> {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: () => scheduleApi.GET_SCHEDULES(params),
    placeholderData: keepPreviousData,
  });
}