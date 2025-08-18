import { cn, CreateAttendanceCodeDialog, DialogUtil, LectureListItem } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';
import { useCreateAttendanceCode } from '../../hooks/use-create-attendance-code';
import { ShowAttendanceCodeDialogWrapper } from './show-attendance-code-dialog-wrapper';
import { CreateAssignmentDialogWrapper } from './create-assignment-dialog-wrapper';

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
          onCreateAttendanceClick={(onSuccess) => {
            DialogUtil.showComponent(
              <CreateAttendanceCodeDialog
                studyName={''}
                round={lecture.round ?? 0}
                lectureName={lecture.title ?? ''}
                onCreateAttendance={(attendanceCode: string) => {
                  createAttendanceCode(
                    {
                      studyId: studyId ?? 0,
                      lectureId: lecture.round ?? 0,
                      code: attendanceCode,
                    },
                    {
                      onSuccess: () => {
                        onSuccess();
                      },
                      onError: (error) => {
                        console.error('출석 코드 생성 실패:', error);
                        // 에러 발생 시 onSuccess를 호출하지 않음
                      },
                    }
                  );
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
          onCreateAssignmentClick={(onSuccess) => {
            DialogUtil.showComponent(
              <CreateAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
                isUpdate={false}
                onSuccess={onSuccess}
              />
            );
          }}
          onShowAssignmentClick={() => {
            DialogUtil.showComponent(
              <CreateAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
                isUpdate={true}
              />
            );
          }}
          onEditClick={() => {
            // 강의 수정 로직 추가
            console.log('강의 수정:', lecture);
          }}
          onDeleteClick={() => {}}
        />
      ))}
    </div>
  );
}
