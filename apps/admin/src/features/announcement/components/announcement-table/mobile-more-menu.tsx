'use client';

import React from 'react';
import { IconButton, Label } from '@hiarc-platform/ui';
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
  const handleMoreClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleEdit = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onEdit(announcement);
  };

  const handleDelete = (event: React.MouseEvent): void => {
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
          <button
            className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
            onClick={handleEdit}
          >
            <Label className="cursor-pointer">수정</Label>
          </button>
          <button
            className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
            onClick={handleDelete}
          >
            <Label className="cursor-pointer">삭제</Label>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
