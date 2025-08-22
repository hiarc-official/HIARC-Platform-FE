'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from '../dialog/alert-dialog';
import { DialogConfig } from '../../store/dialog-store';
import { Label } from '../label/label';
import { Button } from '../button';
import Image from 'next/image';

interface AlertDialogComponentProps {
  dialog: DialogConfig;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  showBackground?: boolean;
}

export function AlertDialogComponent({
  dialog,
  onConfirm,
  onCancel,
  onClose,
}: AlertDialogComponentProps): React.ReactElement {
  const showCancelButton = dialog.onCancel !== undefined;

  const handleAction = (): void => {
    onConfirm();
    onClose();
  };

  const handleCancel = (): void => {
    onCancel();
    onClose();
  };

  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg sm:max-w-sm">
        <div className="flex flex-col items-center py-2 text-center">
          {/* Error Icon */}
          <Image src="/shared-assets/Error.svg" alt="Error Icon" width={32} height={32} />

          {/* Content */}
          <div className="mt-6">
            {typeof dialog.content === 'string' ? (
              <Label size="lg" weight="medium">
                {dialog.content}
              </Label>
            ) : (
              dialog.content
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            {showCancelButton && (
              <AlertDialogCancel asChild>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  <Label>{dialog.cancelText || '취소'}</Label>
                </Button>
              </AlertDialogCancel>
            )}
            <AlertDialogAction asChild>
              <Button size="sm" onClick={handleAction}>
                <Label>{dialog.confirmText || '닫기'}</Label>
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
