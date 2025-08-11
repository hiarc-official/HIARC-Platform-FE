'use client';

import {
  Button,
  cn,
  DialogUtil,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React from 'react';
import { AnnouncementSearchDialog } from './announcement-search-dialog';

interface AnnouncementSearchSectionProps {
  className?: string;
}

export function AnnouncementSearchSection({ className }: AnnouncementSearchSectionProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <AnnouncementSearchDialog
        onSave={async () => {
          console.log('Search performed');
        }}
        onCancel={() => {
          console.log('Search cancelled');
        }}
      />
    );
  };

  return (
    <>
      {/* Desktop View */}
      <div
        className={cn(
          'hidden w-full items-end justify-between gap-4 rounded-md border border-gray-100 p-6 md:flex',
          className
        )}
      >
        <LabeledSelector
          placeholder={'123'}
          required={false}
          label={'진행 학기'}
          options={[]}
          value="123"
          onChange={(value: unknown) => {
            console.log(value);
          }}
        />
        <LabeledInput label={'스터디명'} />
        <div className="flex w-full items-center gap-2">
          <Button variant="secondary" size="md" className="w-full">
            초기화
          </Button>
          <Button variant="fill" size="md" className="w-full bg-primary-200">
            검색
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={cn('md:hidden', className)}>
        <Button variant="line_secondary" size="xs" onClick={handleOpenDialog}>
          상세 검색
        </Button>
      </div>
    </>
  );
}