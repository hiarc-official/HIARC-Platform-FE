'use client';

import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog/dialog';
import { IconButton } from './icon-button';
import { NumberInput } from './input/number-input';
import { Label } from './label/label';

function WeekChip({ week }: { week: number }): React.ReactElement {
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-200 px-3 py-1 text-sm text-primary-300">
      {week}회차
    </div>
  );
}

function CreateCodeButton({ onComplete }: { onComplete(): void }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="fill_light" size="xs" onClick={() => setOpen(true)}>
          출석 생성
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>출석 생성</DialogTitle>
        </DialogHeader>
        <ol className="list-disc pl-4 pt-2 text-sm text-gray-600">
          <li>
            <Label size="lg">스터디명</Label>
          </li>
          <li>
            <Label size="lg">N주차 : 강의명</Label>
          </li>
        </ol>
        <NumberInput
          className="w-full justify-center pt-6"
          length={6}
          value={inputValue}
          onChange={function (value: string): void {
            setInputValue(value);
          }}
        />
        <div className="flex w-full gap-2 pt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setOpen(false);
              setInputValue('');
            }}
            className="w-full"
          >
            취소
          </Button>
          <Button
            className="w-full"
            variant="fill"
            size="sm"
            onClick={() => {
              setOpen(false);
              onComplete();
              setInputValue('');
            }}
          >
            생성
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShowCodeButton(): React.ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xs">
          번호 확인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출석 번호 확인</DialogTitle>
        </DialogHeader>
        <ol className="list-disc pl-4 pt-2 text-sm text-gray-600">
          <li>
            <Label size="lg">스터디명</Label>
          </li>
          <li>
            <Label size="lg">N주차 : 강의명</Label>
          </li>
        </ol>
        <NumberInput
          className="w-full justify-center pt-6"
          length={6}
          value={'123456'}
          onChange={(): void => {}}
          disabled
        />
        <Button className="mt-6" variant="fill" size="sm" onClick={() => setOpen(false)}>
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function InputCodeButton({ onComplete }: { onComplete(): void }): React.ReactElement {
  // 예시: 출석 번호 입력 다이얼로그
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // 번호 입력 및 검증 로직 추가 가능
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="fill_light"
          size="xs"
          onClick={() => {
            setOpen(true);
            setInputValue('');
          }}
        >
          출석 번호 입력
        </Button>
      </DialogTrigger>

      <DialogContent fullscreen>
        <DialogHeader>
          <DialogTitle>출석 번호 입력</DialogTitle>
        </DialogHeader>
        <ol className="list-disc pl-4 pt-2 text-sm text-gray-600">
          <li>
            <Label size="lg">스터디명</Label>
          </li>
          <li>
            <Label size="lg">N주차 : 강의명</Label>
          </li>
        </ol>
        <NumberInput
          className="w-full justify-center pt-6"
          length={6}
          value={inputValue}
          onChange={function (value: string): void {
            setInputValue(value);
          }}
        />
        <div className="flex w-full gap-2 pt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setOpen(false);
              setInputValue('');
            }}
            className="w-full"
          >
            취소
          </Button>
          <Button
            className="w-full"
            variant="fill"
            size="sm"
            onClick={() => {
              setOpen(false);
              onComplete();
            }}
          >
            출석하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AttendanceDoneButton(): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" disabled>
      출석 완료
    </Button>
  );
}

function DeleteButton({ onComplete }: { onComplete(): void }): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton
          iconSrc="/Delete.svg"
          className="text-red-500 hover:text-red-700"
          aria-label="Delete Lecture"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="w-[390px]">
        <DialogHeader>
          <DialogTitle>강의 삭제</DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-6">정말로 이 강의를 삭제하시겠습니까?</DialogDescription>
        <div className="flex w-full gap-2 pt-6">
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)} className="w-full">
            취소
          </Button>
          <Button
            variant="fill"
            size="sm"
            className="w-full"
            onClick={() => {
              setOpen(false);
              onComplete();
            }}
          >
            삭제
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface LectureCardProps {
  week: number;
  study: string;
  isAdmin?: boolean;
  classRoom: string;
}

function MobileLectureListItem({
  week,
  study,
  isAdmin,
  classRoom,
}: LectureCardProps): React.ReactElement {
  // 일반 유저는 isComplete, 어드민은 isAttendanceCreated
  const [isComplete, setIsComplete] = useState(false);
  const [isAttendanceCreated, setIsAttendanceCreated] = useState(false);

  let buttonElem;
  if (isAdmin) {
    buttonElem = !isAttendanceCreated ? (
      <CreateCodeButton onComplete={() => setIsAttendanceCreated(true)} />
    ) : (
      <ShowCodeButton />
    );
  } else {
    buttonElem = !isComplete ? (
      <InputCodeButton onComplete={() => setIsComplete(true)} />
    ) : (
      <AttendanceDoneButton />
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 px-4 py-3">
      <div className=" flex items-center justify-between">
        <WeekChip week={week} />
        <div className="flex items-center gap-2">
          <Label size="md" className="text-gray-700">
            {classRoom}
          </Label>
          {buttonElem}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label size="lg" className="underline decoration-gray-900 decoration-1 underline-offset-2">
          {study}
        </Label>
        {isAdmin && (
          <div className="ml-4 flex gap-4">
            <IconButton iconSrc="/shared-assets/Edit.svg" />
            <IconButton iconSrc="/shared-assets/Delete.svg" />
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopLectureCardListItem(props: LectureCardProps): React.ReactElement {
  const [isComplete, setIsComplete] = useState(false);
  const [isAttendanceCreated, setIsAttendanceCreated] = useState(false);

  let buttonElem;
  if (props.isAdmin) {
    buttonElem = !isAttendanceCreated ? (
      <CreateCodeButton onComplete={() => setIsAttendanceCreated(true)} />
    ) : (
      <ShowCodeButton />
    );
  } else {
    buttonElem = !isComplete ? (
      <InputCodeButton onComplete={() => setIsComplete(true)} />
    ) : (
      <AttendanceDoneButton />
    );
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between px-4 py-3',
        'rounded-sm border border-gray-200',
        'leading-normal'
      )}
    >
      <div className="flex gap-[13px]">
        <WeekChip week={props.week} />
        <Label size="lg" className="underline decoration-gray-900 decoration-1 underline-offset-2">
          {props.study}
        </Label>
      </div>
      <div className="mr-4 flex">
        <div className="flex items-center  gap-2">
          {buttonElem}
          <Label size="md" className="w-[80px] text-right text-gray-700">
            {props.classRoom}
          </Label>
        </div>
        {props.isAdmin && (
          <div className="ml-4 flex gap-4">
            <IconButton iconSrc="/shared-assets/Edit.svg" />
            <DeleteButton onComplete={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
}

export function LectureListItem({
  week,
  study,
  isAdmin = false,
  classRoom,
}: LectureCardProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="block md:hidden">
        <MobileLectureListItem week={week} study={study} isAdmin={isAdmin} classRoom={classRoom} />
      </div>
      <div className="hidden md:block">
        <DesktopLectureCardListItem
          week={week}
          study={study}
          isAdmin={isAdmin}
          classRoom={classRoom}
        />
      </div>
    </div>
  );
}
