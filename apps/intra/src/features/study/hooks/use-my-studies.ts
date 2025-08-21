import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { MyStudy } from '../types/model/my-study';

export const useMyStudies = (isCurrent: boolean): UseQueryResult<MyStudy[], Error> =>
  useQuery({
    queryKey: ['my-studies', isCurrent],
    queryFn: () => studyApi.GET_MY_STUDIES(isCurrent),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
