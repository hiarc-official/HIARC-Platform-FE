'use client';

import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { AddStaffDialog } from './add-staff-dialog';

export default function AddStaffTriggerButton(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <AddStaffDialog
        onSave={async () => {
          alert('변경이 완료되었습니다');
        }}
        onCancel={() => {
          console.log('Add staff dialog cancelled');
        }}
      />
    );
  };
  return (
    <Button size="sm" className="w-[106px]" onClick={handleOpenDialog}>
      추가하기
    </Button>
  );
}
