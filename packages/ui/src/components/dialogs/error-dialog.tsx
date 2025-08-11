'use client';

import React from 'react';
import { Label } from '../label/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../dialog/dialog';
import { Button } from '../button';
import { DialogConfig } from '../../store/dialog-store';

interface ErrorDialogProps {
  dialog: DialogConfig;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  showBackground?: boolean;
}

export function ErrorDialog({ dialog, onConfirm, onClose, showBackground }: ErrorDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" showBackground={showBackground ?? dialog.showBackground}>
        <div className="flex flex-col items-center space-y-4 py-2 text-center">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <div className="h-8 w-8 text-red-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {dialog.title}
            </DialogTitle>
          </DialogHeader>
          
          {/* Content */}
          <DialogDescription className="text-gray-600">
            {typeof dialog.content === 'string' ? (
              <Label size="md" weight="regular">{dialog.content}</Label>
            ) : (
              dialog.content
            )}
          </DialogDescription>
          
          {/* Button */}
          <div className="pt-4">
            <Button 
              onClick={handleConfirm}
              className="min-w-[100px] bg-red-600 hover:bg-red-700"
            >
              <Label>{dialog.confirmText || '닫기'}</Label>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}