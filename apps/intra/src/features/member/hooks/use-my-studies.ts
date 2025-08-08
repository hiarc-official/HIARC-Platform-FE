import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { memberApi } from '../api/member';
import { StudySummary } from '../../study/types/study-summary';

export default function useMyStudies(): UseQueryResult<StudySummary[], Error> {
  return useQuery({
    queryKey: ['members', 'me', 'studies'],
    queryFn: memberApi.GET_MY_STUDIES,
  });
}