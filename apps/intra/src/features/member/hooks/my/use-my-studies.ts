import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myApi } from '../../api/my';
import type { CurrentStudyParticipantResponse, PastStudyListResponse } from '../../types/member';

export function useMyCurrentStudies(): UseQueryResult<CurrentStudyParticipantResponse[], Error> {
  return useQuery({
    queryKey: ['member', 'me', 'studies', 'current'],
    queryFn: myApi.GET_MY_CURRENT_STUDIES,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export function useMyPastStudies(): UseQueryResult<Record<string, PastStudyListResponse>, Error> {
  return useQuery({
    queryKey: ['member', 'me', 'studies', 'past'],
    queryFn: myApi.GET_MY_PAST_STUDIES,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
