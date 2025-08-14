import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { Announcement } from '../types/model/announcement';

export const useAdminAnnouncement = (id: number): UseQueryResult<Announcement, Error> =>
  useQuery({
    queryKey: ['admin-announcement', id],
    queryFn: () => announcementApi.GET_ADMIN_ANNOUNCEMENT(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000, // 5분
  });
