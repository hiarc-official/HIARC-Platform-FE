'use client';

import { useMemo } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type Row,
} from '@tanstack/react-table';
import { CommonTableHead, CommonTableBody, Label } from '@hiarc-platform/design-system';
import TierImg from '../util/TierImg';

interface RankingRow {
  num: number;
  bojHandle: string;
  tier: number;
  today: number;
  total: number;
  memberId: number;
}

interface RankingContainerProps {
  rankingData: Array<{
    num: number;
    bojHandle: string;
    tier: number;
    today: number;
    totalScore: number;
    currentSeasonScore: number | null;
    memberId: number;
  }>;
  error: string | null;
}

const columnHelper = createColumnHelper<RankingRow>();

const columns = [
  columnHelper.accessor('num', {
    header: '#',
    size: 48,
    meta: { headAlign: 'center', bodyAlign: 'center' },
    cell: (info) => <span className="text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('tier', {
    header: 'tier',
    size: 48,
    meta: { headAlign: 'center', bodyAlign: 'center' },
    cell: (info) => (
      <div className="flex justify-center">
        <TierImg tier={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor('bojHandle', {
    header: 'handle',
    meta: { headAlign: 'left', bodyAlign: 'left' },
    cell: (info) => <span className="truncate">{info.getValue()}</span>,
  }),
  columnHelper.accessor('today', {
    header: 'today',
    size: 72,
    meta: { headAlign: 'right', bodyAlign: 'right' },
    cell: (info) => {
      const v = info.getValue();
      return <span className="tabular-nums text-gray-600">{v < 0 ? 0 : v}</span>;
    },
  }),
  columnHelper.accessor('total', {
    header: 'total',
    size: 80,
    meta: { headAlign: 'right', bodyAlign: 'right' },
    cell: (info) => {
      const v = info.getValue();
      return <span className="font-bold tabular-nums text-primary-300">{v < 0 ? 0 : v}</span>;
    },
  }),
];

const RankingContainer = ({ rankingData, error }: RankingContainerProps): React.ReactElement => {
  const data = useMemo<RankingRow[]>(
    () =>
      rankingData.map((r) => ({
        num: r.num,
        bojHandle: r.bojHandle,
        tier: r.tier,
        today: r.today,
        total: r.currentSeasonScore !== null ? r.currentSeasonScore : r.totalScore,
        memberId: r.memberId,
      })),
    [rankingData]
  );

  const table = useReactTable({
    data,
    columns,
    // size를 지정하지 않은 컬럼(handle)이 TanStack 기본값(150)으로 고정되지 않고
    // CommonTable에서 flex-1로 늘어나도록 기본 size를 비운다.
    defaultColumn: { size: undefined },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Row<RankingRow>): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${row.original.memberId}`;
  };

  if (error) {
    return <Label className="text-gray-600">오류 발생: {error}</Label>;
  }

  return (
    <div className="w-full">
      <CommonTableHead table={table} className="text-gray-500" />
      <CommonTableBody table={table} onClick={handleRowClick} emptyMessage="랭킹 데이터가 없습니다." />
    </div>
  );
};

export default RankingContainer;
