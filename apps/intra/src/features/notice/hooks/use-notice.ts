import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { noticeApi } from '../api/notice';
import { Notice } from '../types/model/notice';

export default function useNotice(id: string): UseQueryResult<Notice, Error> {
  const query = useQuery({
    queryKey: ['notice', id],
    queryFn: () => noticeApi.GET_NOTICE(id),
    enabled: Boolean(id),
  });

  return query;
}
