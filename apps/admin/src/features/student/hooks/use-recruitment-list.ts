import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studentApi } from '../api/student';
import { PageableModel, StudentApply } from '@hiarc-platform/shared';

interface RecruitmentListParams {
  semesterId: number;
  page: number;
  size: number;
}

export function useRecruitmentList(
  params: RecruitmentListParams
): UseQueryResult<PageableModel<StudentApply>, Error> {
  const query = useQuery({
    queryKey: ['recruitment-list', params],
    queryFn: () => studentApi.GET_RECRUITMENT_LIST(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(params.semesterId),
  });

  return query;
}