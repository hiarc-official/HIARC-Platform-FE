import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import type { PageRecruitingMemberResponse } from '../types/response/recruitment-response';
import type { RecruitmentQueryParams } from '../types/request/recruitment-request';

export function useRecruitingMembers(
  semesterId: number | undefined,
  params: RecruitmentQueryParams = {}
): UseQueryResult<PageRecruitingMemberResponse, Error> {
  console.log('[HOOK] useRecruitingMembers 호출:', { semesterId, params });

  const query = useQuery({
    queryKey: ['recruiting-members', semesterId, params],
    queryFn: () => recruitmentApi.GET_RECRUITING_MEMBERS(semesterId!, params),
    enabled: !!semesterId,
    placeholderData: keepPreviousData,
  });

  console.log('[HOOK] useRecruitingMembers 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    dataLength: query.data?.content?.length,
  });

  return query;
}