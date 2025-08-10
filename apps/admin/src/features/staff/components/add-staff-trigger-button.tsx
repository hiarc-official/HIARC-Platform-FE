'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import React from 'react';
import { LabeledTextarea } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';

export default function AddStaffTriggerButton(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  async function handleSave(): Promise<void> {
    alert('변경이 완료되었습니다');
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-[106px]">
          추가하기
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2 !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
      >
        <DialogHeader>
          <DialogTitle className="w-full">직함 추가하기</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-2">
              <LabeledInput label="핸들명" placeholder="핸들명 입력하기" />
              <Button size="md" className="w-[120px]">
                인증하기
              </Button>
            </div>
            <LabeledSelector
              label="직함"
              placeholder="직함을 입력해주세요"
              options={selectOption['직함']}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={() => setOpen(false)}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">출석하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
