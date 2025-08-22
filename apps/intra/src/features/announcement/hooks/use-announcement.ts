import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { announcementApi } from '../api/announcement';
import { Announcement } from '@hiarc-platform/shared';
import { DialogUtil } from '@hiarc-platform/ui';

export default function useAnnouncement(id: string): UseQueryResult<Announcement, Error> {
  const query = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => announcementApi.GET_ANNOUNCEMENT(id),
    enabled: Boolean(id),
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      const axiosError = query.error as AxiosError<{ message?: string }>;
      const backendMessage = axiosError.response?.data?.message;
      const errorMessage =
        backendMessage || query.error.message || '공지사항을 불러오는 중 오류가 발생했습니다.';

      DialogUtil.showError(errorMessage, () => {
        window.history.back();
      });
    }
  }, [query.error]);

  return query;
}
