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
  title: 'Design System/Data Display/CommonTableHead',
  component: CommonTableHead,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'react-table 의 table 인스턴스를 받아 thead 를 렌더하는 공통 테이블 헤더. 정렬 표시를 지원합니다.' } }, layout: 'padded' },
} satisfies Meta<typeof CommonTableHead>;

export default meta;
type Story = StoryObj;

export const InTable: Story = { render: () => <DemoTable /> };
