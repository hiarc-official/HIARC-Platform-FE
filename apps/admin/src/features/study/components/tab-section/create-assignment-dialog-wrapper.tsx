'use client';

import { useAssignment } from '../../hooks/use-assignment';
import { useCreateAssignment } from '../../hooks/use-create-assignment';
import { CreateAssignmentDialog } from '@hiarc-platform/ui';

interface CreateAssignmentDialogWrapperProps {
  studyId: number;
  lectureId: number;
  isUpdate?: boolean;
}

export function CreateAssignmentDialogWrapper({
  studyId,
  lectureId,
  isUpdate = false,
}: CreateAssignmentDialogWrapperProps): React.ReactElement {
  const assignmentQuery = useAssignment(studyId, lectureId);
  const { mutate: createAssignment } = useCreateAssignment();

  return (
    <CreateAssignmentDialog
      isUpdate={isUpdate}
      assignment={assignmentQuery.data}
      isLoading={assignmentQuery.isLoading}
      error={assignmentQuery.error}
      fetchAssignment={() => assignmentQuery.refetch()}
      onComplete={() => {}}
      onCreateAssignment={(data) => {
        createAssignment({
          studyId,
          lectureId,
          data,
        });
      }}
      onUpdateAssignment={(data) => {
        createAssignment({
          studyId,
          lectureId,
          data,
        });
      }}
    />
  );
}