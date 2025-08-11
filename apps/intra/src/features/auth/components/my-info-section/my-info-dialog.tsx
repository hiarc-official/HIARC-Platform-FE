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
} from '@hiarc-platform/ui';
import React from 'react';

interface MyInfoDialogProps {
  initialValue?: string;
  onSave?: (value: string) => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function MyInfoDialog({
  initialValue = '',
  onSave,
  onCancel,
  showBackground = true,
}: MyInfoDialogProps): React.ReactElement {
  const [introductionValue, setIntroductionValue] = React.useState(initialValue);

  const handleSave = async (): Promise<void> => {
    console.log('💾 [MY INFO] 저장 시작:', introductionValue);

    try {
      if (onSave) {
        await onSave(introductionValue);
        console.log('✨ [MY INFO] 저장 성공');
      } else {
        console.log('⚠️ [MY INFO] onSave 함수 없음');
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('💥 [MY INFO] 저장 실패:', error);
      // 에러는 상위 컴포넌트에서 처리하도록 다시 throw
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="!w-[540px] !max-w-[540px]" showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>자기소개 한줄 작성하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 w-full">
            <LabeledInput
              label=""
              placeholder="예) 좋은 아침입니다! 줄여서 좋아!"
              value={introductionValue}
              onChange={(value) => setIntroductionValue(value)}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">기록하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}