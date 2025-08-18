import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { studyApi } from '../api/study';
import { useErrorHandler } from '@/shared/hooks/use-error-handler';
import { CreateStudyRequest, Study } from '@hiarc-platform/shared';

export function useCreateStudy(): UseMutationResult<Study, Error, CreateStudyRequest, unknown> {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess } = useErrorHandler();

  const mutation = useMutation({
    mutationFn: studyApi.CREATE_STUDY,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      showSuccess('스터디가 성공적으로 생성되었습니다.');
      router.push(`/study/${response.studyId}`);
    },
    onError: (error) => {
    },
  });

  return mutation;
}
