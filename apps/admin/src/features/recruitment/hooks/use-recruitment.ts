import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import type { RecruitmentDetailResponse } from '../types/response/recruitment-response';

export function useRecruitment(
  semesterId: number | undefined
): UseQueryResult<RecruitmentDetailResponse, Error> {
  console.log('[HOOK] useRecruitment 호출:', semesterId);

  const query = useQuery({
    queryKey: ['recruitment', semesterId],
    queryFn: () => recruitmentApi.GET_RECRUITMENT(semesterId!),
    enabled: !!semesterId,
  });

  console.log('[HOOK] useRecruitment 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    recruitmentId: query.data?.data?.recruitmentId,
  });

  return query;
}