import { Label, Button } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

export interface Student {
  number?: number;
  name: string;
  category: 'rating' | 'study' | 'etc' | 'general' | 'external';
  title: string;
  date: string;
  isPublic?: boolean;
}

export const STUDENT_APPLY_LIST_COLUMN: Array<ColumnDef<Student>> = [
  {
    id: 'number',
    accessorKey: 'number',
    enableSorting: false,
    size: 56,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        번호
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
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
    size: 100,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        이름
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.name ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'handleName',
    accessorKey: 'handleName',
    enableSorting: false,
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        핸들명
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'contact',
    accessorKey: 'contact',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        연락처
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studentId',
    accessorKey: 'studentId',
    enableSorting: false,
    size: 100,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        학번
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'major',
    accessorKey: 'major',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        학과
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'doubleMajor',
    accessorKey: 'doubleMajor',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        복전 여부
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'grade',
    accessorKey: 'grade',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        Grade
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        재학여부
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'approve',
    accessorKey: 'approve',
    enableSorting: false,
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        승인여부
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Label size="md" weight="regular">
        {row.original.number ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'approveButton',
    accessorKey: 'approveButton',
    size: 60,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        승인
      </Label>
    ),
    cell: ({ row }: { row: { original: Student } }) => (
      <Button
        className="relative z-10 w-full bg-primary-100"
        size="xs"
        onClick={(event) => {
          event.stopPropagation();
          console.log('Edit clicked for:', row.original);
        }}
      >
        승인하기
      </Button>
    ),
    footer: (props) => props.column.id,
  },
];
