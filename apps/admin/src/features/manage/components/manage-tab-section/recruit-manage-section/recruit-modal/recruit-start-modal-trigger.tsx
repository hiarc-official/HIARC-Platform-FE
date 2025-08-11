'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@hiarc-platform/ui';
import { IconButton } from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import React from 'react';
import { LabeledCalanderInput } from '@hiarc-platform/ui';

interface RecruitStartModalTriggerProps {
  onClick?(): void;
}

export function RecruitStartModalTrigger({
  onClick,
}: RecruitStartModalTriggerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  async function handleSave(): Promise<void> {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      alert('변경이 완료되었습니다');
      onClick?.();
      setOpen(false);
    } else {
      alert('모집 시작일과 모집 종료일을 입력해주세요');
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">모집 시작하기</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2 !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 관리</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledCalanderInput
            placeholder="기간을 선택해주세요"
            rangeMode={true}
            label="모집 기간"
            value={[startDate, endDate]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                const [start, end] = value as [Date | null, Date | null];
                setStartDate(start);
                setEndDate(end);
              }
            }}
          />
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={() => setOpen(false)}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">모집 시작하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
