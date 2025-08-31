'use client';

import React from 'react';
import { IconButton, Button } from '@hiarc-platform/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@hiarc-platform/ui';
import { AnnouncementSummary } from '@hiarc-platform/shared';

interface MobileMoreMenuProps {
  announcement: AnnouncementSummary;
  onEdit(announcement: AnnouncementSummary): void;
  onDelete(announcement: AnnouncementSummary): void;
}

export function MobileMoreMenu({
  announcement,
  onEdit,
  onDelete,
}: MobileMoreMenuProps): React.ReactElement {
  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit(announcement);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(announcement);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          type="button"
          iconSrc="/shared-assets/More.svg"
          size="sm"
          onClick={handleMoreClick}
        />
      </PopoverTrigger>
      <PopoverContent className="w-24 p-1" align="end">
        <div className="flex flex-col">
          <Button size="sm" className="justify-start px-3 py-2 text-sm" onClick={handleEdit}>
            수정
          </Button>
          <Button
            size="sm"
            className="text-red-600 hover:text-red-700 justify-start px-3 py-2 text-sm"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
