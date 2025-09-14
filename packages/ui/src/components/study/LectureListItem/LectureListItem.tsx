'use client';

import { Lecture } from '@hiarc-platform/shared';
import { LectureListItemMobile } from './LectureListItemMobile';
import { LectureListItemDesktop } from './LectureListItemDesktop';

interface LectureListItemProps {
  lecture: Lecture;
  isAdmin?: boolean;
  isStudent?: boolean;
  onTitleClick?(): void;
  onCreateAttendanceClick?(): void;
  onShowAttendanceClick?(): void;
  onCreateAssignmentClick?(): void;
  onShowAssignmentClick?(): void;
  onAttendanceCheckClick?(): void;
  onDoAssignmentClick?(): void;
  onEditClick?(): void;
  onDeleteClick?(): void;
}

export function LectureListItem({
  lecture,
  isAdmin = false,
  isStudent = false,
  onTitleClick,
  onCreateAttendanceClick,
  onShowAttendanceClick,
  onCreateAssignmentClick,
  onShowAssignmentClick,
  onAttendanceCheckClick,
  onDoAssignmentClick,
  onEditClick,
  onDeleteClick,
}: LectureListItemProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="block md:hidden">
        <LectureListItemMobile
          lecture={lecture}
          isAdmin={isAdmin}
          isStudent={isStudent}
          onTitleClick={onTitleClick}
          onCreateAttendanceClick={onCreateAttendanceClick}
          onShowAttendanceClick={onShowAttendanceClick}
          onCreateAssignmentClick={onCreateAssignmentClick}
          onShowAssignmentClick={onShowAssignmentClick}
          onAttendanceCheckClick={onAttendanceCheckClick}
          onDoAssignmentClick={onDoAssignmentClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
      <div className="hidden md:block">
        <LectureListItemDesktop
          lecture={lecture}
          isAdmin={isAdmin}
          isStudent={isStudent}
          onTitleClick={onTitleClick}
          onCreateAttendanceClick={onCreateAttendanceClick}
          onShowAttendanceClick={onShowAttendanceClick}
          onCreateAssignmentClick={onCreateAssignmentClick}
          onShowAssignmentClick={onShowAssignmentClick}
          onAttendanceCheckClick={onAttendanceCheckClick}
          onDoAssignmentClick={onDoAssignmentClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
}
