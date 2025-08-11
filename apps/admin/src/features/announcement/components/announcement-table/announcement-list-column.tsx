import { Label, CategoryChip, IconButton } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

export interface Announcement {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
  isPublic?: boolean;
}

export const ADMIN_ANNOUNCEMENT_LIST_COLUMN: Array<ColumnDef<Announcement>> = [
  {
    id: 'name',
    accessorKey: 'name',
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
        {row.original.number ?? '-'}
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <CategoryChip category={row.original.category} />
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
    accessorKey: 'name',
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
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
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
    cell: ({ row }: { row: { original: Announcement } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.date ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
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
        {row.original.isPublic ? '공개' : '비공개'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
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
