import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { MyStudyInfo } from '../types/model/my-study-info';

export const useMyStudyInfo = (studyId: number): UseQueryResult<MyStudyInfo, Error> =>
  useQuery({
    queryKey: ['my-study-info', studyId],
    queryFn: () => studyApi.GET_MY_STUDY_INFO(studyId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
