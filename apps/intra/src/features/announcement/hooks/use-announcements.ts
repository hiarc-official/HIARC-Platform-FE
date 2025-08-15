import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { PageableModel, Announcement } from '@hiarc-platform/shared';
import type { AnnouncementQueryParams } from '../types/request/announcement-query-params';

export default function useAnnouncements(
  params: AnnouncementQueryParams = {}
): UseQueryResult<PageableModel<Announcement>, Error> {
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
