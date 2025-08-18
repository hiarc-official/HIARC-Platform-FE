import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { PageableModel, Student } from '@hiarc-platform/shared';
import { StudentRequestParam } from '../types/request/student-request-param';

export function useStudentList(
  params: StudentRequestParam
): UseQueryResult<PageableModel<Student>, Error> {
  const query = useQuery({
    queryKey: ['student-list', params],
    queryFn: () => studentApi.GET_STUDENT_LIST(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return query;
}