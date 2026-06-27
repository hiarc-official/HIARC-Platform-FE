import type { Meta, StoryObj } from '@storybook/react';
import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import { CommonTableHead } from '../CommonTableHead/CommonTableHead';
import { CommonTableBody } from '../CommonTableBody/CommonTableBody';

interface Member {
  name: string;
  tier: string;
  score: number;
}
const DATA: Member[] = [
  { name: '홍길동', tier: 'Gold', score: 1850 },
  { name: '김철수', tier: 'Silver', score: 1420 },
  { name: '이영희', tier: 'Platinum', score: 2310 },
];
const ch = createColumnHelper<Member>();
const columns = [
  ch.accessor('name', { header: '이름', size: 120 }),
  ch.accessor('tier', { header: '티어', size: 120 }),
  ch.accessor('score', { header: '점수', size: 100 }),
];

function DemoTable(): React.ReactElement {
  const table = useReactTable({ data: DATA, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <table className="w-full border-separate border-spacing-0">
      <CommonTableHead table={table} />
      <CommonTableBody table={table} onClick={() => undefined} />
    </table>
  );
}

const meta = {
  title: 'Design System/Data Display/CommonTableBody',
  component: CommonTableBody,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CommonTableBody>;

export default meta;
type Story = StoryObj;

export const InTable: Story = { render: () => <DemoTable /> };
