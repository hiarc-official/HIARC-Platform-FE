import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { Instructor } from '@hiarc-platform/shared';

export function useInstructorList(semesterId: number): UseQueryResult<Instructor[], Error> {
  const query = useQuery({
    queryKey: ['instructor-list', semesterId],
    queryFn: () => studentApi.GET_INSTRUCTOR_LIST(semesterId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(semesterId),
  });

  return query;
}