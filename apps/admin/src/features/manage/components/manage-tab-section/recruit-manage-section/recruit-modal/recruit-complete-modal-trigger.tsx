import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import React from 'react';
import { LabeledTextarea } from '@hiarc-platform/ui';

export function RecruitCompleteModalTrigger(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  async function handleSave(): Promise<void> {
    alert('변경이 완료되었습니다');
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-md px-3 py-2 text-md hover:bg-gray-100">
          학회 가입 완료
        </div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="relative !w-[540px] !max-w-[540px] overflow-visible"
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 문구 관리 - 학회 가입 완료</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <div className="flex flex-col gap-6">
            <LabeledTextarea label="군 휴학 대상" />
            <LabeledTextarea label="일반 대상" className="min-h-[213px]" />
          </div>
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
