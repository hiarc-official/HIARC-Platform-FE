import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import { Recruitment } from '../types/model/recruitment';

export default function useRecruitment(): UseQueryResult<Recruitment, Error> {
  return useQuery({
    queryKey: ['recruitment'],
    queryFn: recruitmentApi.GET_RECRUITMENT,
  });
}