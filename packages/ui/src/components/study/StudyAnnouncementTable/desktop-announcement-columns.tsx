import { AnnouncementSummary } from '@hiarc-platform/shared';
import { Label, IconButton, Popover, PopoverContent, PopoverTrigger } from '../../../';
import { DateUtil } from '@hiarc-platform/shared';
import { ColumnDef, Column, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headAlign?: 'left' | 'center' | 'right';
    bodyAlign?: 'left' | 'center' | 'right';
    isInstructor?: boolean;
    handleEdit?(announcement: AnnouncementSummary): void;
    handleDelete?(announcement: AnnouncementSummary): void;
  }
}

export const STUDY_ANNOUNCEMENT_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'number',
    accessorKey: 'number',
    enableSorting: false,
    size: 60,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        번호
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
  },
  {
    id: 'title',
    accessorKey: 'title',
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        제목
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 96,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성일
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="xs" weight="regular">
        {DateUtil.formatDateWithDots(row.original.createdAt ?? '') ?? '-'}
      </Label>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    size: 80,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        관리
      </Label>
    ),
    cell: ({
      row,
      column,
    }: {
      row: { original: AnnouncementSummary };
      column: Column<AnnouncementSummary>;
    }) => {
      const announcement = row.original;
      const isInstructor = column.columnDef.meta?.isInstructor;

      if (!isInstructor) {
        return null;
      }

      const handleMoreClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
      };

      const handleEditClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleEdit?.(announcement);
      };

      const handleDeleteClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleDelete?.(announcement);
      };

      return (
        <div className="flex items-center justify-center">
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
                  onClick={handleEditClick}
                >
                  <Label className="cursor-pointer">수정</Label>
                </button>
                <button
                  className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
                  onClick={handleDeleteClick}
                >
                  <Label className="cursor-pointer">삭제</Label>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
