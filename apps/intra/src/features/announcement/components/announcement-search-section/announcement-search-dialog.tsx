'use client';

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React from 'react';

interface AnnouncementSearchDialogProps {
  onSave?: () => Promise<void>;
  onCancel?: () => void;
  showBackground?: boolean;
}

export function AnnouncementSearchDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AnnouncementSearchDialogProps): React.ReactElement {
  const handleSave = async (): Promise<void> => {
    try {
      if (onSave) {
        await onSave();
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('검색 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  const handleReset = (): void => {
    // Reset form logic here
    console.log('Form reset');
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent fullscreen showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>스터디 검색</DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <div className={cn('flex flex-col gap-6')}>
            <LabeledSelector
              placeholder={'123'}
              required={false}
              label={'진행 학기'}
              options={[]}
              value="123"
              onChange={(value: unknown) => {
                console.log(value);
              }}
            />
            <LabeledInput label={'스터디명'} />
            <div className="flex w-full items-center gap-2">
              <Button variant="secondary" size="md" className="w-full" onClick={handleReset}>
                초기화
              </Button>
              <Button
                variant="fill"
                size="md"
                className="w-full bg-primary-200"
                onClick={handleSave}
              >
                검색
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}