import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { UpdateStudyRequest } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';
import { queryKeys, mutationKeys } from '@/shared/constants/query-keys';

interface UpdateStudyParams {
  studyId: number;
  data: UpdateStudyRequest;
}

export function useUpdateStudy(): UseMutationResult<void, Error, UpdateStudyParams, unknown> {
  const mutation = useMutation({
    mutationKey: mutationKeys.studies.update,
    mutationFn: ({ studyId, data }: UpdateStudyParams) => studyApi.UPDATE_STUDY(studyId, data),
    meta: {
      invalidateQueries: [
        queryKeys.studies.all,
        queryKeys.studies.detail,
      ],
    },
    onSuccess: (response, variables) => {
      DialogUtil.showSuccess('스터디 정보가 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}
