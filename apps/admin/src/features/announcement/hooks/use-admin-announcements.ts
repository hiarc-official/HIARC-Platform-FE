import { useQuery } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { AnnouncementQueryParams } from '../types/request/announcement-query-params';

export const useAdminAnnouncements = (params: AnnouncementQueryParams = {}) => {
  return useQuery({
    queryKey: ['admin-announcements', params],
    queryFn: () => announcementApi.GET_ADMIN_ANNOUNCEMENTS(params),
    staleTime: 5 * 60 * 1000, // 5분
  });
};