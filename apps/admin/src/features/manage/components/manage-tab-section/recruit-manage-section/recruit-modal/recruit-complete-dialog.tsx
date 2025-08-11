import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  Button,
  LabeledTextarea,
} from '@hiarc-platform/ui';
import React from 'react';

interface RecruitCompleteDialogProps {
  onSave?: () => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function RecruitCompleteDialog({
  onSave,
  onCancel,
  showBackground = true,
}: RecruitCompleteDialogProps): React.ReactElement {
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
        className="relative !w-[540px] !max-w-[540px] overflow-visible"
        showBackground={showBackground}
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