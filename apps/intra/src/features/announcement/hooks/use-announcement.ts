import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { Announcement } from '@hiarc-platform/shared';

export default function useAnnouncement(id: string): UseQueryResult<Announcement, Error> {
  const query = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => announcementApi.GET_ANNOUNCEMENT(id),
    enabled: Boolean(id),
  });
  return query;
}
