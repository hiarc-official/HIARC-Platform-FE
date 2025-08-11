'use client';
import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { RecruitStartDialog } from './recruit-start-dialog';

interface RecruitStartModalTriggerProps {
  onClick?(): void;
}

export function RecruitStartModalTrigger({
  onClick,
}: RecruitStartModalTriggerProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <RecruitStartDialog
        onSave={async () => {
          onClick?.();
        }}
        onCancel={() => {
          console.log('Recruit start dialog cancelled');
        }}
      />
    );
  };

  return (
    <Button className="w-full" onClick={handleOpenDialog}>
      모집 시작하기
    </Button>
  );
}
