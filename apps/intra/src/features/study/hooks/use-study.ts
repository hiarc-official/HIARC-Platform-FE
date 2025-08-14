import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Study } from '../types/model/study-model/study';

export default function useStudy(id: string): UseQueryResult<Study, Error> {
  const query = useQuery({
    queryKey: ['study', id],
    queryFn: () => studyApi.GET_STUDY(id),
    enabled: Boolean(id),
  });

  return query;
}