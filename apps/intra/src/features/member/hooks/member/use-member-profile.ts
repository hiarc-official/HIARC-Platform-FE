import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../../api/member';
import type { MemberProfileResponse } from '../../types/member';

export function useMemberProfile(memberId: number): UseQueryResult<MemberProfileResponse, Error> {
  console.log('useMemberProfile called with memberId:', memberId);
  
  return useQuery({
    queryKey: ['member', memberId, 'profile'],
    queryFn: () => {
      console.log('Calling memberApi.GET_MEMBER_PROFILE with memberId:', memberId);
      return memberApi.GET_MEMBER_PROFILE(memberId);
    },
    enabled: true, // 항상 실행
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
