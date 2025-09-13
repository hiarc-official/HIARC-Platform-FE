import { useCreateAttendanceCode } from '@/features/study/hooks/study-instructor/mutation/use-create-attendance-code';
import { CreateAttendanceCodeDialog } from '@hiarc-platform/ui';

interface CreateAttendanceCodeDialogWrapperProps {
  studyId: number;
  lectureId: number;
  studyName?: string;
  round: number;
  lectureName: string;
  onSuccess?(): void;
}

export function CreateAttendanceCodeDialogWrapper({
  studyId,
  lectureId,
  studyName,
  round,
  lectureName,
  onSuccess,
}: CreateAttendanceCodeDialogWrapperProps): React.ReactElement {
  const { mutate: createAttendanceCode } = useCreateAttendanceCode();

  return (
    <CreateAttendanceCodeDialog
      studyName={studyName ?? ''}
      round={round}
      lectureName={lectureName}
      onCreateAttendance={(attendanceCode: string) => {
        createAttendanceCode(
          {
            studyId,
            lectureId,
            code: attendanceCode,
          },
          {
            onSuccess: () => {
              onSuccess?.();
            },
            onError: (error) => {
              console.error('출석 코드 생성 실패:', error);
            },
          }
        );
      }}
    />
  );
}
