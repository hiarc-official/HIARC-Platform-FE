'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React from 'react';
import { selectOption } from 'constants/selectOption';

interface AddStaffDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function AddStaffDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AddStaffDialogProps): React.ReactElement {
  const handleSave = async (): Promise<void> => {
    try {
      if (onSave) {
        await onSave();
      } else {
        alert('변경이 완료되었습니다');
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('저장 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        className="!w-[540px] !max-w-[540px]"
        showBackground={showBackground}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>직함 추가하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-6">
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
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
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
