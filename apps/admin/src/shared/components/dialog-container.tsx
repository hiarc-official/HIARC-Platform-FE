'use client';

import { useDialogStore } from '../store/dialog-store';
import { UnauthorizedDialog } from './unauthorized-dialog';

export function DialogContainer() {
  const { isUnauthorizedDialogOpen, hideUnauthorizedDialog } = useDialogStore();

  const handleUnauthorizedConfirm = () => {
    hideUnauthorizedDialog();
    window.location.href = '/';
  };

  return (
    <>
      <UnauthorizedDialog
        isOpen={isUnauthorizedDialogOpen}
        onConfirm={handleUnauthorizedConfirm}
      />
    </>
  );
}