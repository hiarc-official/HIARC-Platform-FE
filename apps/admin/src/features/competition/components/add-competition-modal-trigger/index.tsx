'use client';
import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { AddCompetitionDialog } from './add-competition-dialog';

export function AddCompetitionModalTrigger(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <AddCompetitionDialog
        onSave={async () => {
          console.log('Add competition dialog saved');
        }}
        onCancel={() => {
          console.log('Add competition dialog cancelled');
        }}
      />
    );
  };

  return (
    <Button size="md" className="w-[100px]" onClick={handleOpenDialog}>
      개설하기
    </Button>
  );
}
