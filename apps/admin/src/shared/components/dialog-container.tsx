'use client';

import React from 'react';
import { useDialogStore } from '../store/dialog-store';
import { UnauthorizedDialog } from './unauthorized-dialog';

export function DialogContainer(): React.ReactElement {
  const { isUnauthorizedDialogOpen, hideUnauthorizedDialog } = useDialogStore();

  const handleUnauthorizedConfirm = (): void => {
    hideUnauthorizedDialog();
    window.location.href = '/';
  };

  return (
    <UnauthorizedDialog isOpen={isUnauthorizedDialogOpen} onConfirm={handleUnauthorizedConfirm} />
  );
}
