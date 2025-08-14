import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { studyApi } from '../api/study';
import { Study } from '../types/model/study-model/study';
import { CreateStudyRequest } from '../types/request/create-study-request';

export default function useCreateStudy(): UseMutationResult<
  Study,
  Error,
  CreateStudyRequest,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: studyApi.CREATE_STUDY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      router.push('/study');
    },
  });

  return mutation;
}