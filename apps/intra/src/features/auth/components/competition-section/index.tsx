import { cn, DialogUtil, IconButton, Title } from '@hiarc-platform/ui';
import React from 'react';
import { CompetitionListItem } from './competition-list-item';
import { CompetitionDialog } from './competition-dialog';

interface CompetitionSectionProps {
  className?: string;
}

export function CompetitionSection({ className }: CompetitionSectionProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <CompetitionDialog
        onSave={() => {
          // Additional logic when competition is saved
          console.log('Competition saved successfully!');
          // You can also trigger data refresh, show success message, etc.
        }}
        onCancel={() => {
          console.log('Competition dialog cancelled');
        }}
      />,
      { showBackground: false }
    );
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          참여한 대회
        </Title>
        <IconButton type="button" iconSrc="/shared-assets/Edit.svg" onClick={handleOpenDialog} />
      </div>
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
    </div>
  );
}
