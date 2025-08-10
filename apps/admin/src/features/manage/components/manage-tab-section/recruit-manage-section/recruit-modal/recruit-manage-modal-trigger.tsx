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

export function RecruitManageModalTrigger(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [recruitPeriod, setRecruitPeriod] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  async function handleSave(): Promise<void> {
    alert('변경이 완료되었습니다');
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton iconSize="lg" size="sm" type="button" iconSrc="/shared-assets/Edit.svg" />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="relative !w-[540px] !max-w-[540px] overflow-visible"
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 관리</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledCalanderInput
            placeholder="기간을 선택해주세요"
            rangeMode={true}
            label="모집 기간"
            value={recruitPeriod}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setRecruitPeriod(value);
              }
            }}
          />
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={() => setOpen(false)}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">수정하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
