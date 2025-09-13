import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MemberStatus } from '../../../types/response/member-status';
import { studyMemberApi } from '@/features/study/api';

export function useMemberStatus(
  studyId: number,
  memberId: number
): UseQueryResult<MemberStatus, Error> {
  const query = useQuery({
    queryKey: ['study', studyId, 'member', memberId],
    queryFn: () => studyMemberApi.GET_MEMBER_STATUS(studyId!, memberId!),
    enabled: Boolean(studyId && memberId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
