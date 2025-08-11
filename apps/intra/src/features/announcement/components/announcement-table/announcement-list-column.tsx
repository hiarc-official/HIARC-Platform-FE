import { Label, CategoryChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import type { AnnouncementListItem } from '../../types/announcement';

function mapAnnouncementType(type: string): "rating" | "study" | "etc" | "general" | "external" {
  switch (type) {
    case 'RATING': return 'rating';
    case 'STUDY': return 'study';
    case 'GENERAL': return 'general';
    case 'ETC': return 'etc';
    case 'EXTERNAL': return 'external';
    default: return 'general';
  }
}

export const ANNOUNCEMENT_LIST_COLUMN: Array<ColumnDef<AnnouncementListItem>> = [
  {
    id: 'id',
    accessorKey: 'id',
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
    cell: ({ row }: { row: { original: AnnouncementListItem } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'category',
    accessorKey: 'category',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        카테고리
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementListItem } }) => (
      <CategoryChip category={mapAnnouncementType(row.original.announcementType)}></CategoryChip>
    ),
    footer: (props) => props.column.id,
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
    cell: ({ row }: { row: { original: AnnouncementListItem } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
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
    cell: ({ row }: { row: { original: AnnouncementListItem } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString('ko-KR') : '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];