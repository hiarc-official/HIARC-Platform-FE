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
import React, { useState } from 'react';

interface GreetingDialogProps {
  title: string;
  message: string;
  showBackground?: boolean;
  onConfirm?(): void;
}

export function GreetingDialog({
  title,
  message,
  showBackground = true,
  onConfirm,
}: GreetingDialogProps): React.ReactElement {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleConfirm = async (): Promise<void> => {
    DialogUtil.hideAllDialogs();
    onConfirm?.();
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  const extractAccountNumber = (text: string): string | null => {
    const accountPattern = /\b\d{8,}\b|\d[0-9,-]{3,6}-[0-9,-]{2,6}-[0-9,-]/;
    const match = text.match(accountPattern);
    return match ? match[0] : null;
  };

  const handleCopyAccount = async (accountNumber: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (error) {
      console.error('Failed to copy account number:', error);
    }
  };

  const accountNumber = extractAccountNumber(message);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[380px]" showBackground={showBackground}>
        <DialogHeader className="mb-6 text-left">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <Label>
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Label>
        </DialogDescription>
        {accountNumber && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="line"
              size="xs"
              onClick={() => handleCopyAccount(accountNumber)}
              className="px-2 text-xs"
            >
              {copiedAccount === accountNumber ? '복사됨' : '계좌번호 복사'}
            </Button>
          </div>
        )}
        <Button className="mt-6 w-full" onClick={handleConfirm}>
          <Label size="md">확인</Label>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
