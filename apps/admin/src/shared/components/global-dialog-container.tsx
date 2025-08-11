'use client';

import React from 'react';
import { useDialogStore, DialogConfig } from '../store/dialog-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
} from '@hiarc-platform/ui';

const getDialogIcon = (type: DialogConfig['type']): string => {
  switch (type) {
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'error':
      return '❌';
    case 'confirm':
      return '❓';
    default:
      return 'ℹ️';
  }
};

const getDialogColors = (type: DialogConfig['type']): string => {
  switch (type) {
    case 'success':
      return 'text-green-600';
    case 'warning':
      return 'text-yellow-600';
    case 'error':
      return 'text-red-600';
    case 'confirm':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getDialogSize = (size: DialogConfig['size']): string => {
  switch (size) {
    case 'sm':
      return '!w-[400px] !max-w-[400px]';
    case 'lg':
      return '!w-[700px] !max-w-[700px]';
    case 'xl':
      return '!w-[900px] !max-w-[900px]';
    default:
      return '!w-[500px] !max-w-[500px]';
  }
};

function DialogItem({ dialog }: { dialog: DialogConfig }): React.ReactElement {
  const { hideDialog } = useDialogStore();

  const handleConfirm = (): void => {
    dialog.onConfirm?.();
    hideDialog(dialog.id);
  };

  const handleCancel = (): void => {
    dialog.onCancel?.();
    hideDialog(dialog.id);
  };

  const showCancelButton = dialog.type === 'confirm' || dialog.onCancel;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && hideDialog(dialog.id)}>
      <DialogContent className={getDialogSize(dialog.size)}>
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${getDialogColors(dialog.type)}`}>
            <span>{getDialogIcon(dialog.type)}</span>
            {dialog.title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-4">
          {typeof dialog.content === 'string' ? (
            <div className="text-gray-700">{dialog.content}</div>
          ) : (
            dialog.content
          )}
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          {showCancelButton && (
            <Button variant="secondary" onClick={handleCancel}>
              <Label>{dialog.cancelText}</Label>
            </Button>
          )}
          <Button onClick={handleConfirm}>
            <Label>{dialog.confirmText}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GlobalDialogContainer(): React.ReactElement {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogItem key={dialog.id} dialog={dialog} />
      ))}
    </>
  );
}