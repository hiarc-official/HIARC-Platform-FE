import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';
import { useSelectedSemester } from '@/hooks/use-semester-store';
import { StudentApply } from '@hiarc-platform/shared';
import { Button, Label } from '@hiarc-platform/ui';
import { ReactElement } from 'react';
import { useUpdateStudentApply } from '../../hooks/use-update-student-apply';

export function ApprovalButton({
  studentApply,
}: {
  studentApply: StudentApply;
}): ReactElement | null {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: currentSemester } = useCurrentSemester();
  const { mutate: updateStudentApply } = useUpdateStudentApply();

  const isCurrentSemesterSelected =
    selectedSemesterId === currentSemester?.currentSemester?.semesterId?.toString();

  if (!isCurrentSemesterSelected) {
    return null;
  }

  const isApproved = studentApply.applicationStatus === 'APPROVED';

  return (
    <Button
      className={`relative z-10 w-full ${isApproved ? 'border-primary-100 text-primary-100' : 'bg-primary-100'}`}
      size="xs"
      variant={isApproved ? 'line' : 'fill'}
      onClick={(event) => {
        event.stopPropagation();
        if (isApproved) {
          updateStudentApply({
            semesterId: Number(selectedSemesterId),
            memberId: studentApply.memberId ?? 0,
            applicationStatus: 'PENDING_APPROVAL',
          });
        } else {
          updateStudentApply({
            semesterId: Number(selectedSemesterId),
            memberId: studentApply.memberId ?? 0,
            applicationStatus: 'APPROVED',
          });
        }
      }}
    >
      <Label size="md">{isApproved ? '철회하기' : '승인하기'}</Label>
    </Button>
  );
}
