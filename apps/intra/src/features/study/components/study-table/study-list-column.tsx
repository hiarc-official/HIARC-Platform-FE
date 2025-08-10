import { Label, CategoryChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { StudySummary } from '../../types/study-summary';

export const STUDY_LIST_COLUMN: Array<ColumnDef<StudySummary>> = [
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
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <CategoryChip category={row.original.category}></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        상태
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular">
        {row.original.status === 'active' ? '진행중' : row.original.status === 'completed' ? '완료' : '취소'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'title',
    accessorKey: 'title',
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
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.title ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'author',
    accessorKey: 'author',
    size: 200,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디장
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.author ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'participants',
    accessorKey: 'currentParticipants',
    size: 150,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        참여자
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.currentParticipants}/{row.original.maxParticipants}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];
