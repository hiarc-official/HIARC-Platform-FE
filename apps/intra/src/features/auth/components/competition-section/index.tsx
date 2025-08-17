import { cn, DialogUtil, IconButton, Label, Title } from '@hiarc-platform/ui';
import React from 'react';
import { CompetitionListItem } from './competition-list-item';
import { CompetitionDialog } from './competition-dialog';
import { Award } from '@hiarc-platform/shared';

interface CompetitionSectionProps {
  awardList?: Award[];
  className?: string;
}

export function CompetitionSection({
  awardList,
  className,
}: CompetitionSectionProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <CompetitionDialog
        onSave={() => {
          DialogUtil.showSuccess('대회 정보가 성공적으로 저장되었습니다.');
        }}
        onCancel={() => {
          console.log('Competition dialog cancelled');
        }}
      />,
      { showBackground: false }
    );
  };

  console.log('Award List:', awardList);

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          참여한 대회
        </Title>
        <IconButton type="button" iconSrc="/shared-assets/Edit.svg" onClick={handleOpenDialog} />
      </div>

      {!awardList || awardList.length === 0 ? (
        <Label className="py-20 text-center">대회 정보가 없어요</Label>
      ) : (
        awardList.map((award) => <CompetitionListItem key={award.awardId} award={award} />)
      )}
    </div>
  );
}
