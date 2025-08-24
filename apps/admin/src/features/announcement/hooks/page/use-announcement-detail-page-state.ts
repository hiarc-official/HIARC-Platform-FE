import { useParams, useRouter } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks';

export function useAnnouncementDetailPageState() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);

  const handleBackClick = (): void => {
    router.back();
  };

  const handleGoToList = (): void => {
    router.push('/announcement');
  };

  return {
    announcement,
    isLoading,
    error,
    handleBackClick,
    handleGoToList,
  };
}