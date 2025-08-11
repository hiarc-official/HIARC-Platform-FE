'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  Button,
  LabeledCalanderInput,
} from '@hiarc-platform/ui';
import React from 'react';

interface RecruitStartDialogProps {
  onSave?: () => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function RecruitStartDialog({
  onSave,
  onCancel,
  showBackground = true,
}: RecruitStartDialogProps): React.ReactElement {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleSave = async (): Promise<void> => {
    try {
      if (startDate && endDate) {
        console.log(startDate);
        console.log(endDate);
        alert('변경이 완료되었습니다');
        if (onSave) {
          await onSave();
        }
        DialogUtil.hideAllDialogs();
      } else {
        alert('모집 시작일과 모집 종료일을 입력해주세요');
      }
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
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2 !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        showBackground={showBackground}
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
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
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