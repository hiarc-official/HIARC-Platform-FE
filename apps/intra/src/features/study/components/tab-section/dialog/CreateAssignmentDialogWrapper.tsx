'use client';

import { useCheckAssignment } from '@/features/study/hooks/study-instructor/mutation/use-check-assignment';
import { useCreateAssignment } from '@/features/study/hooks/study-instructor/mutation/use-create-assignment';
import { useAssignment } from '@/features/study/hooks/study-member/query/use-assignment';
import { CreateAssignmentDialog } from '@hiarc-platform/ui';

interface CreateAssignmentDialogWrapperProps {
  studyId: number;
  lectureId: number;
  isUpdate?: boolean;
  onSuccess?(): void;
}

export function CreateAssignmentDialogWrapper({
  studyId,
  lectureId,
  isUpdate = false,
  onSuccess,
}: CreateAssignmentDialogWrapperProps): React.ReactElement {
  const assignmentQuery = useAssignment(studyId, lectureId);
  const { mutate: createAssignment } = useCreateAssignment();
  const { mutate: checkAssignment } = useCheckAssignment();

  return (
    <CreateAssignmentDialog
      studyId={studyId}
      round={lectureId}
      isUpdate={isUpdate}
      assignment={assignmentQuery.data}
      isLoading={assignmentQuery.isLoading}
      error={assignmentQuery.error}
      fetchAssignment={() => assignmentQuery.refetch()}
      onComplete={() => {}}
      onCheckAssignment={(studyId, round) => {
        checkAssignment({ studyId, round });
      }}
      onCreateAssignment={(data) => {
        createAssignment({
          studyId,
          lectureId,
          data,
        });
        onSuccess?.();
      }}
      onUpdateAssignment={(data) => {
        createAssignment({
          studyId,
          lectureId,
          data,
        });
        onSuccess?.();
      }}
    />
  );
}
