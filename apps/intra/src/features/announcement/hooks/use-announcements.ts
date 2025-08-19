import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { PageableModel } from '@hiarc-platform/shared';
import type { AnnouncementQueryParams } from '../types/request/announcement-query-params';
import { AnnouncementSummary } from '../types/model/announcement-summary';

export default function useAnnouncements(
  params: AnnouncementQueryParams = {}
): UseQueryResult<PageableModel<AnnouncementSummary>, Error> {
  console.log('[HOOK] useAnnouncements 호출:', params);

  const query = useQuery({
    queryKey: ['announcements', params],
    queryFn: () => announcementApi.GET_ANNOUNCEMENTS(params),
    placeholderData: keepPreviousData,
  });

  return query;
}
