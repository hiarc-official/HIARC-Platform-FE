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

interface SuccessDialogProps {
  dialog: DialogConfig;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  showBackground?: boolean;
}

export function SuccessDialog({ dialog, onConfirm, onClose, showBackground }: SuccessDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" showBackground={showBackground ?? dialog.showBackground}>
        <div className="flex flex-col items-center space-y-4 py-2 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <div className="h-8 w-8 text-green-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
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
              className="min-w-[100px] bg-green-600 hover:bg-green-700"
            >
              <Label>{dialog.confirmText || '확인'}</Label>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}