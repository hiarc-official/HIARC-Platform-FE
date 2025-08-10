import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Study } from '../types/model/study';
import { UpdateStudyRequest } from '../types/request/update-study-request';

interface UpdateStudyData {
  id: string;
  data: UpdateStudyRequest;
}

export default function useUpdateStudy(): UseMutationResult<
  Study,
  Error,
  UpdateStudyData,
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateStudyData) => studyApi.UPDATE_STUDY(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['study', variables.id] });
    },
  });

  return mutation;
}