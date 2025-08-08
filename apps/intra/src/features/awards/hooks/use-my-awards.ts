import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { awardsApi } from '../api/awards';
import { Award } from '../types/model/award';

export default function useMyAwards(): UseQueryResult<Award[], Error> {
  return useQuery({
    queryKey: ['awards', 'me'],
    queryFn: awardsApi.GET_MY_AWARDS,
  });
}