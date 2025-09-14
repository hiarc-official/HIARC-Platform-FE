'use client';

import { Button, IconButton } from '@hiarc-platform/ui';

// 출석 관련 버튼들
export function CreateCodeButton({ onClick }: { onClick?(): void }): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick}>
      출석 생성
    </Button>
  );
}

export function ShowCodeButton({ onClick }: { onClick?(): void }): React.ReactElement {
  return (
    <Button variant="secondary" size="xs" onClick={onClick}>
      번호 확인
    </Button>
  );
}

export function AttendanceCheckButton({
  onClick,
  disabled = false,
}: {
  onClick?(): void;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick} disabled={disabled}>
      출석 체크
    </Button>
  );
}

export function AttendanceDoneButton(): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" disabled>
      출석 완료
    </Button>
  );
}

// 과제 관련 버튼들
export function CreateAssignmentButton({ onClick }: { onClick?(): void }): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick}>
      과제 등록
    </Button>
  );
}

export function ShowAssignmentButton({ onClick }: { onClick?(): void }): React.ReactElement {
  return (
    <Button variant="secondary" size="xs" onClick={onClick}>
      과제 확인
    </Button>
  );
}

export function DoAssignmentButton({
  onClick,
  disabled = false,
}: {
  onClick?(): void;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick} disabled={disabled}>
      과제 하기
    </Button>
  );
}

export function AssignmentDoneButton(): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" disabled>
      과제 완료
    </Button>
  );
}

// 관리 관련 버튼들
export function DeleteButton({ onClick }: { onClick?(): void }): React.ReactElement {
  return (
    <IconButton
      iconSrc="/shared-assets/Delete.svg"
      className="text-red-500 hover:text-red-700"
      aria-label="Delete Lecture"
      onClick={onClick}
    />
  );
}
