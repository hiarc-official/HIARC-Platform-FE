'use client';

import { cn } from '../../../lib/utils';
import { IconButton } from '../../icon-button';
import { Label } from '../../label/label';
import { Lecture } from '@hiarc-platform/shared';
import { WeekChip } from './WeekChip';
import {
  CreateCodeButton,
  ShowCodeButton,
  AttendanceCheckButton,
  AttendanceDoneButton,
  CreateAssignmentButton,
  ShowAssignmentButton,
  DoAssignmentButton,
  AssignmentDoneButton,
  DeleteButton,
} from './LectureActionButtons';

interface LectureListItemDesktopProps {
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

export function LectureListItemDesktop({
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
}: LectureListItemDesktopProps): React.ReactElement {
  const isAttendanceCreated = lecture?.isAttendanceCodeExist || false;
  const isAssignmentCreated = lecture?.isAssignmentExist || false;
  const attendanceCompleted = lecture?.isAttendanceCompleted;
  const assignmentCompleted = lecture?.isAssignmentCompleted;

  // 출석 관련 버튼만 메인 영역에 배치 (Student일 때만)
  const attendanceButtons = [];
  // 과제 관련 버튼은 제목 옆에 배치 (Student일 때만)
  const assignmentButton = [];

  if (isStudent) {
    // 출석 관련 버튼
    if (attendanceCompleted === true) {
      attendanceButtons.push(<AttendanceDoneButton key="attendance-done" />);
    } else {
      attendanceButtons.push(
        <AttendanceCheckButton
          key="attendance-check"
          onClick={onAttendanceCheckClick}
          disabled={!isAttendanceCreated}
        />
      );
    }

    // 과제 관련 버튼
    if (assignmentCompleted === true) {
      assignmentButton.push(<AssignmentDoneButton key="assignment-done" />);
    } else {
      assignmentButton.push(
        <DoAssignmentButton
          key="assignment-do"
          onClick={() => {
            onDoAssignmentClick?.();
          }}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between px-4 py-3',
        'rounded-sm border border-gray-200',
        'leading-normal'
      )}
    >
      <div className="flex items-center gap-[13px]">
        <WeekChip week={lecture?.round || 0} />
        <Label
          size="lg"
          className={cn(
            (isStudent || isAdmin) &&
              'cursor-pointer underline decoration-gray-900 decoration-1 underline-offset-2 hover:opacity-70'
          )}
          onClick={isStudent || isAdmin ? onTitleClick : undefined}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
      </div>
      <div className="mr-4 flex">
        <div className="flex items-center gap-2">
          {isStudent && (
            <>
              <div className="flex gap-2">{attendanceButtons}</div>
              <div className="flex gap-2">{assignmentButton}</div>
            </>
          )}
          {isAdmin && (
            <>
              {/* 출석 관련 버튼 */}
              {!isAttendanceCreated ? (
                <CreateCodeButton onClick={onCreateAttendanceClick} />
              ) : (
                <ShowCodeButton onClick={onShowAttendanceClick} />
              )}

              {/* 과제 관련 버튼 */}
              {!isAssignmentCreated ? (
                <CreateAssignmentButton onClick={onCreateAssignmentClick} />
              ) : (
                <ShowAssignmentButton onClick={onShowAssignmentClick} />
              )}
            </>
          )}
          <Label size={lecture?.place ? 'md' : 'sm'} className="w-[80px] text-right text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
        </div>
        {isAdmin && (
          <div className="ml-2 flex gap-2">
            <IconButton iconSrc="/shared-assets/Edit.svg" onClick={onEditClick} />
            <DeleteButton onClick={onDeleteClick} />
          </div>
        )}
      </div>
    </div>
  );
}
