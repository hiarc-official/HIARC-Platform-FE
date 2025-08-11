import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { studyApi } from '../api/study';
import type { StudyResponse, CreateStudyRequest } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';

export function useCreateStudy(): UseMutationResult<
  StudyResponse,
  Error,
  CreateStudyRequest,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: studyApi.CREATE_STUDY,
    onSuccess: (response) => {
      console.log('[HOOK] useCreateStudy 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      showSuccess('스터디가 성공적으로 생성되었습니다.');
      router.push(`/study/${response.data.studyId}`);
    },
    onError: (error) => {
      console.error('[HOOK] useCreateStudy 에러:', error);
    },
  });

  return mutation;
}