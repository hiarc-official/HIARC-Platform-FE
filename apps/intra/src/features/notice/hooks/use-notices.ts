import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { noticeApi } from '../api/notice';
import { NoticeQueryParams } from '../types/request/notice-query-params';
import { PageableModel } from '@/shared/types/pageable-model';
import { NoticeSummary } from '../types/notice-summary';

export default function useNotices(
  params: NoticeQueryParams = {}
): UseQueryResult<PageableModel<NoticeSummary>, Error> {
  const query = useQuery({
    queryKey: ['notices', params],
    queryFn: () => noticeApi.GET_NOTICES(params),
    placeholderData: keepPreviousData,
  });

  return query;
}
