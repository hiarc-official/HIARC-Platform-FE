import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import type { AnnouncementQueryParams, AnnouncementListResponse } from '../types/announcement';

export default function useAnnouncements(
  params: AnnouncementQueryParams = {}
): UseQueryResult<AnnouncementListResponse, Error> {
  console.log('[HOOK] useAnnouncements 호출:', params);

  const query = useQuery({
    queryKey: ['announcements', params],
    queryFn: () => announcementApi.GET_ANNOUNCEMENTS(params),
    placeholderData: keepPreviousData,
  });

  console.log('[HOOK] useAnnouncements 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    dataLength: query.data?.content?.length,
  });

  return query;
}
