import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../api/member';
import { MemberProfile } from '../types/model/member-profile';

export default function useMemberProfile(
  memberId: string
): UseQueryResult<MemberProfile, Error> {
  return useQuery({
    queryKey: ['members', memberId, 'profile'],
    queryFn: () => memberApi.GET_MEMBER_PROFILE(memberId),
    enabled: !!memberId,
  });
}