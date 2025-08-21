import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
} from '@hiarc-platform/ui';

interface NoticeDialogProps {
  message: string;
  showBackground?: boolean;
  onConfirm?(): void;
}

export function NoticeDialog({
  message,
  showBackground = true,
  onConfirm,
}: NoticeDialogProps): React.ReactElement {
  const handleConfirm = async (): Promise<void> => {
    DialogUtil.hideAllDialogs();
    onConfirm?.();
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[380px]" showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>안내사항</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6" asChild>
          <div className="mt-6" />
          <Label>
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Label>
          <div className="mt-6" />
        </DialogDescription>
        <Button className="w-full" onClick={handleConfirm}>
          <Label size="md">확인</Label>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
