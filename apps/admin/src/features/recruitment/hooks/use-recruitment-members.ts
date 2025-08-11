import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import type { 
  PageRecruitingMemberResponse, 
  RecruitmentQueryParams 
} from '../api/recruitment';

export function useRecruitmentMembers(
  semesterId: number, 
  params: RecruitmentQueryParams = {}
): UseQueryResult<PageRecruitingMemberResponse, Error> {
  return useQuery({
    queryKey: ['recruitment', 'members', semesterId, params],
    queryFn: () => recruitmentApi.GET_RECRUITING_MEMBERS(semesterId, params),
    enabled: !!semesterId,
  });
}