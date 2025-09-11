import { cn, Label, LectureListItem } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';

interface LectureListProps {
  isAdmin?: boolean;
  isStudent?: boolean;
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
  studyName?: string;
  semesterId?: number;
  // Handler props
  onTitleClick?(lecture: Lecture): void;
  onAttendanceCheckClick?(lecture: Lecture): void;
  onDoAssignmentClick?(lecture: Lecture): void;
  onCreateAttendanceClick?(lecture: Lecture): void;
  onShowAttendanceClick?(lecture: Lecture): void;
  onCreateAssignmentClick?(lecture: Lecture): void;
  onShowAssignmentClick?(lecture: Lecture): void;
  onEditClick?(lecture: Lecture): void;
  onDeleteClick?(lecture: Lecture): void;
}

export function LectureList({
  isAdmin,
  isStudent,
  className,
  lectureList,
  onTitleClick,
  onAttendanceCheckClick,
  onDoAssignmentClick,
  onCreateAttendanceClick,
  onShowAttendanceClick,
  onCreateAssignmentClick,
  onShowAssignmentClick,
  onEditClick,
  onDeleteClick,
}: LectureListProps): React.ReactElement {
  return (
    <section className={cn('flex w-full flex-col gap-2', className)}>
      {lectureList && lectureList.length > 0 ? (
        lectureList.map((lecture) => (
          <LectureListItem
            isAdmin={isAdmin}
            isStudent={isStudent}
            key={lecture.round}
            lecture={lecture}
            onTitleClick={() => onTitleClick?.(lecture)}
            onAttendanceCheckClick={() => onAttendanceCheckClick?.(lecture)}
            onDoAssignmentClick={() => onDoAssignmentClick?.(lecture)}
            onCreateAttendanceClick={() => onCreateAttendanceClick?.(lecture)}
            onShowAttendanceClick={() => onShowAttendanceClick?.(lecture)}
            onCreateAssignmentClick={() => onCreateAssignmentClick?.(lecture)}
            onShowAssignmentClick={() => onShowAssignmentClick?.(lecture)}
            onEditClick={() => onEditClick?.(lecture)}
            onDeleteClick={() => onDeleteClick?.(lecture)}
          />
        ))
      ) : (
        <Label className="p-4 text-center text-gray-500">커리큘럼이 없습니다.</Label>
      )}
    </section>
  );
}
