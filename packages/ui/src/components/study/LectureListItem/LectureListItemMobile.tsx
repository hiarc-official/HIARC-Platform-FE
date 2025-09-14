'use client';

import { cn } from '../../../lib/utils';
import { IconButton } from '../../icon-button';
import { Label } from '../../label/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Lecture } from '@hiarc-platform/shared';
import { WeekChip } from './WeekChip';
import {
  AttendanceCheckButton,
  AttendanceDoneButton,
  DoAssignmentButton,
  AssignmentDoneButton,
} from './LectureActionButtons';

interface LectureListItemMobileProps {
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

export function LectureListItemMobile({
  lecture,
  isAdmin,
  isStudent,
  onTitleClick,
  onCreateAttendanceClick,
  onShowAttendanceClick,
  onCreateAssignmentClick,
  onShowAssignmentClick,
  onAttendanceCheckClick,
  onDoAssignmentClick,
  onEditClick,
  onDeleteClick,
}: LectureListItemMobileProps): React.ReactElement {
  const isAttendanceCreated = lecture?.isAttendanceCodeExist || false;
  const isAssignmentCreated = lecture?.isAssignmentExist || false;
  const attendanceCompleted = lecture?.isAttendanceCompleted || false;
  const assignmentCompleted = lecture?.isAssignmentCompleted || false;

  // 출석 관련 버튼만 상단에 배치 (Student일 때만)
  const attendanceButtons = [];
  // 과제 관련 버튼은 하단에 배치 (Student일 때만)
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
          onClick={onDoAssignmentClick}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }

  const handleMoreClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const renderAdminMenuItems = (): React.ReactElement[] => {
    const menuItems = [];

    // 출석 관련 메뉴
    if (!isAttendanceCreated) {
      menuItems.push(
        <button
          key="create-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(event) => {
            event.stopPropagation();
            onCreateAttendanceClick?.();
          }}
        >
          <Label className="cursor-pointer">출석 생성</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(event) => {
            event.stopPropagation();
            onShowAttendanceClick?.();
          }}
        >
          <Label className="cursor-pointer">번호 확인</Label>
        </button>
      );
    }

    // 과제 관련 메뉴
    if (!isAssignmentCreated) {
      menuItems.push(
        <button
          key="create-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(event) => {
            event.stopPropagation();
            onCreateAssignmentClick?.();
          }}
        >
          <Label className="cursor-pointer">과제 등록</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(event) => {
            event.stopPropagation();
            onShowAssignmentClick?.();
          }}
        >
          <Label className="cursor-pointer">과제 확인</Label>
        </button>
      );
    }

    // 수정, 삭제 메뉴
    menuItems.push(
      <button
        key="edit"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(event) => {
          event.stopPropagation();
          onEditClick?.();
        }}
      >
        <Label className="cursor-pointer">수정</Label>
      </button>
    );

    menuItems.push(
      <button
        key="delete"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(event) => {
          event.stopPropagation();
          onDeleteClick?.();
        }}
      >
        <Label className="cursor-pointer">삭제</Label>
      </button>
    );

    return menuItems;
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 px-4 py-3">
      <div className=" flex items-center justify-between">
        <WeekChip week={lecture?.round || 0} />
        <div className="flex items-center gap-2">
          <Label size={lecture?.place ? 'md' : 'sm'} className="text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
          {isStudent && <div className="flex gap-2">{attendanceButtons}</div>}
          {isAdmin && (
            <Popover>
              <PopoverTrigger asChild>
                <IconButton iconSrc="/shared-assets/More.svg" size="sm" onClick={handleMoreClick} />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-1" align="end">
                <div className="flex flex-col">{renderAdminMenuItems()}</div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label
          size="lg"
          className={cn(
            (isStudent || isAdmin) && 'cursor-pointer hover:opacity-70',
            (isStudent || isAdmin) &&
              'underline decoration-gray-900 decoration-1 underline-offset-2'
          )}
          onClick={isStudent || isAdmin ? onTitleClick : undefined}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
        {isStudent && <div className="flex gap-2">{assignmentButton}</div>}
      </div>
    </div>
  );
}
