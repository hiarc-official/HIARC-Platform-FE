import { cn, CreateAttendanceCodeDialog, DialogUtil, LectureListItem } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';
import { useCreateAttendanceCode } from '../../hooks/use-create-attendance-code';
import { ShowAttendanceCodeDialogWrapper } from './show-attendance-code-dialog-wrapper';
import { CreateAssignmentDialogWrapper } from './create-assignment-dialog-wrapper';
import { ShowAssignmentDialogWrapper } from './show-assignment-dialog-wrapper';

interface LectureListProps {
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
}

export function LectureList({
  className,
  lectureList,
  studyId,
}: LectureListProps): React.ReactElement {
  const { mutate: createAttendanceCode } = useCreateAttendanceCode();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {lectureList?.map((lecture) => (
        <LectureListItem
          isAdmin
          key={lecture.round}
          lecture={lecture}
          onTitleClick={() => {}}
          onCreateAttendanceClick={() => {
            DialogUtil.showComponent(
              <CreateAttendanceCodeDialog
                studyName={''}
                round={lecture.round ?? 0}
                lectureName={lecture.title ?? ''}
                onCreateAttendance={(attendanceCode: string) => {
                  createAttendanceCode({
                    studyId: studyId ?? 0,
                    lectureId: lecture.round ?? 0,
                    code: attendanceCode,
                  });
                }}
              />
            );
          }}
          onShowAttendanceClick={() => {
            DialogUtil.showComponent(
              <ShowAttendanceCodeDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
              />
            );
          }}
          onCreateAssignmentClick={() => {
            DialogUtil.showComponent(
              <CreateAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
                isUpdate={false}
              />
            );
          }}
          onShowAssignmentClick={() => {
            DialogUtil.showComponent(
              <ShowAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
              />
            );
          }}
          onAttendanceCheckClick={() => {}}
          onDoAssignmentClick={() => {}}
          onDeleteClick={() => {}}
        />
      ))}
    </div>
  );
}
