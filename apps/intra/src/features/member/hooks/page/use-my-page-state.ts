import { useUpdateMyIntroduction } from '@/features/member/hooks/mutation/use-update-my-introduction';
import { useMyProfileData } from '@/features/member/hooks/query/use-my-page-data';
import { useAuthStore } from '@/shared/store/auth-store';
import { useRouter } from 'next/navigation';

export function useMyPageState() {
  const router = useRouter();
  const { user } = useAuthStore();

  const {
    data: myPageData,
    isLoading: myPageDataLoading,
    error: myPageDataError,
  } = useMyProfileData();

  const updateMyIntroduction = useUpdateMyIntroduction();

  const handleUpdateIntroduction = async (introduction: string): Promise<void> => {
    await updateMyIntroduction.mutateAsync(introduction);
  };

  const handleBackClick = (): void => {
    router.back();
  };

  const isDataReady = user && myPageData && !myPageDataLoading;

  return {
    user,
    myPageData,
    myPageDataLoading,
    myPageDataError,
    isDataReady,
    handleUpdateIntroduction,
    handleBackClick,
  };
}
