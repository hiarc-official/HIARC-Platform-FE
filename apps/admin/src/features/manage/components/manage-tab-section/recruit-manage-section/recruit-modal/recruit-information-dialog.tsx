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

interface RecruitInformationDialogProps {
  onSave?: () => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function RecruitInformationDialog({
  onSave,
  onCancel,
  showBackground = true,
}: RecruitInformationDialogProps): React.ReactElement {
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
          <DialogTitle className="w-full">학회원 모집 문구 관리 - 안내사항</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledTextarea label="일반 대상" className="min-h-[213px]" />
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