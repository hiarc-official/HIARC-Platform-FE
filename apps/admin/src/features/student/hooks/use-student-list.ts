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
    enabled: Boolean(params.semesterId), // semesterId가 있을 때만 실행
    retry: (failureCount, error: any) => {
      // 403 에러면 재시도하지 않음
      if (error?.response?.status === 403) {
        return false;
      }
      // 다른 에러는 최대 3번까지 재시도
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return query;
}