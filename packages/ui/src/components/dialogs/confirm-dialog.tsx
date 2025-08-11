'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../dialog/dialog';
import { Button } from '../button';
import { Label } from '../label/label';
import { DialogConfig } from '../../store/dialog-store';

interface ConfirmDialogProps {
  dialog: DialogConfig;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  showBackground?: boolean;
}

export function ConfirmDialog({ dialog, onConfirm, onCancel, onClose, showBackground }: ConfirmDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  const handleCancel = (): void => {
    onCancel();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md" showBackground={showBackground ?? dialog.showBackground}>
        <div className="flex flex-col space-y-4 py-2">
          {/* Question Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <div className="h-8 w-8 text-blue-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {dialog.title}
            </DialogTitle>
          </DialogHeader>
          
          {/* Content */}
          <DialogDescription className="text-center text-gray-600">
            {typeof dialog.content === 'string' ? (
              <Label size="md" weight="regular">{dialog.content}</Label>
            ) : (
              dialog.content
            )}
          </DialogDescription>
          
          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              className="min-w-[80px]"
            >
              <Label>{dialog.cancelText || '취소'}</Label>
            </Button>
            <Button 
              onClick={handleConfirm}
              className="min-w-[80px] bg-blue-600 hover:bg-blue-700"
            >
              <Label>{dialog.confirmText || '확인'}</Label>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}