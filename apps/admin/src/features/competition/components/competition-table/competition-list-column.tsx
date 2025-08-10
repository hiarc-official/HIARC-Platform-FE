import { Label, IconButton } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

export interface Competition {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
  isPublic?: boolean;
}

export const COMPETITION_LIST_COLUMN: Array<ColumnDef<Competition>> = [
  {
    id: 'author',
    accessorKey: 'author',
    enableSorting: false,
    size: 150,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성자
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: false,
    size: 150,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        {'이름(핸들명)'}
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'institution',
    accessorKey: 'institution',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        {'주체(단체)명'}
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'competitionName',
    accessorKey: 'competitionName',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        대회명
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'award',
    accessorKey: 'award',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수상
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        진행일
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.date ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'date',
    accessorKey: 'date',
    size: 56,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수정
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
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
  {
    id: 'date',
    accessorKey: 'date',
    size: 56,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        삭제
      </Label>
    ),
    cell: ({ row }: { row: { original: Competition } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Delete.svg"
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
