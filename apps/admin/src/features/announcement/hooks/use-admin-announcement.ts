import { useQuery } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';

export const useAdminAnnouncement = (id: string) => {
  return useQuery({
    queryKey: ['admin-announcement', id],
    queryFn: () => announcementApi.GET_ADMIN_ANNOUNCEMENT(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  });
};