import { Label, CategoryChip, IconButton } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Announcement } from '../../types/model/announcement';

export const ADMIN_ANNOUNCEMENT_LIST_COLUMN: Array<ColumnDef<Announcement>> = [
  {
    id: 'announcementId',
    accessorKey: 'announcementId',
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'announcementType',
    accessorKey: 'announcementType',
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <CategoryChip category={row.original.announcementType?.toLowerCase() as any} />
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.title ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'author',
    accessorKey: 'authorName',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성자
      </Label>
    ),
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.authorName ?? '-'}
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString('ko-KR') : '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'isPublished',
    accessorKey: 'isPublished',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        공개 여부
      </Label>
    ),
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.isPublished ? '공개' : '비공개'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'edit',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수정
      </Label>
    ),
    cell: ({ row }: { row: { original: Announcement } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Edit.svg"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          console.log('Edit clicked for:', row.original);
        }}
      />
    ),
    footer: (props) => props.column.id,
  },
];
