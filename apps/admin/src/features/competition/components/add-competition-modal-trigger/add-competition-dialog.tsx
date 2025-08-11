'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  Label,
  Button,
  LabeledCalanderInput,
  IconButton,
} from '@hiarc-platform/ui';
import React from 'react';
import { AwardRecordForm } from '../award-record-form';

interface AddCompetitionDialogProps {
  onSave?: () => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function AddCompetitionDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AddCompetitionDialogProps): React.ReactElement {
  const [time, setTime] = React.useState<Date | null>(null);
  const [awardForms, setAwardForms] = React.useState<number[]>([0]);

  function handleAddForm(): void {
    setAwardForms((prev) => [...prev, prev.length]);
  }

  function handleDeleteForm(id: number): void {
    setAwardForms((prev) => prev.filter((formId) => formId !== id));
  }

  const handleSave = async (): Promise<void> => {
    try {
      alert('변경이 완료되었습니다');
      if (onSave) {
        await onSave();
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
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2  !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible bg-white"
        showBackground={showBackground}
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 관리</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 flex max-h-[400px] w-[482px] flex-col gap-6 overflow-y-auto px-1 py-1">
          <LabeledInput label="주최 단체명" placeholder="예) 현대모비스,카카오,홍익대학교" />
          <LabeledInput label="대회명" placeholder="예) 코드 페스티벌, 알고리즘 경진대회" />
          <LabeledCalanderInput
            label="일시"
            value={time}
            placeholder="일시를 선택해주세요"
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setTime(val);
              }
            }}
          />
          {awardForms.map((id) => (
            <AwardRecordForm key={id} onDelete={() => handleDeleteForm(id)} />
          ))}
        </DialogDescription>
        <div className="mt-6 flex w-full items-center justify-center">
          <IconButton
            size="sm"
            iconSize="lg"
            iconSrc="/shared-assets/PlusButton.svg"
            onClick={handleAddForm}
          />
        </div>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
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