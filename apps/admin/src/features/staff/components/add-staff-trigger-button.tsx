'use client';

import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { AddStaffDialog } from './add-staff-dialog';

export default function AddStaffTriggerButton(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<AddStaffDialog />);
  };
  return (
    <Button size="sm" className="w-[106px]" onClick={handleOpenDialog}>
      추가하기
    </Button>
  );
}
