import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import type { AnnouncementResponse } from '../types/announcement';

export default function useAnnouncement(id: string): UseQueryResult<AnnouncementResponse, Error> {
  console.log('[HOOK] useAnnouncement 호출:', id);

  const query = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => announcementApi.GET_ANNOUNCEMENT(id),
    enabled: Boolean(id),
  });

  console.log('[HOOK] useAnnouncement 결과:', {
    isLoading: query.isLoading,
    error: query.error,
    hasData: Boolean(query.data),
  });

  return query;
}
