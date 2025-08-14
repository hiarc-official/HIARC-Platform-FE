import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { StudyQueryParams } from '../types/request/study-query-params';
import { PageableModel } from '@hiarc-platform/shared';
import { StudySummary } from '../types/model/study-model/study-summary';

export default function useStudies(
  params: StudyQueryParams = {}
): UseQueryResult<PageableModel<StudySummary>, Error> {
  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyApi.GET_STUDIES(params),
    placeholderData: keepPreviousData,
  });

  return query;
}
