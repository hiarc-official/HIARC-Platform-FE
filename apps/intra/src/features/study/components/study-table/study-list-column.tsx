import { Label, CategoryChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Study } from '.';

export const STUDY_LIST_COLUMN: Array<ColumnDef<Study>> = [
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
    cell: ({ row }: { row: { original: Study } }) => (
      <CategoryChip category={row.original.category}></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        진행 학기
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="md" weight="regular">
        {row.original.semester ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyName',
    accessorKey: 'studyName',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'studyHead',
    accessorKey: 'studyHead',
    size: 300,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디장
      </Label>
    ),
    cell: ({ row }: { row: { original: Study } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyHead ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];
