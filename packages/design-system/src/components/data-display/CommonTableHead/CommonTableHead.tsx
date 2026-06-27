'use client';

import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { cn } from '../../../lib/utils';

interface TheadProps<T> {
  table: Table<T>;
  sortColumns?: string[];
  sort?: string;
  setSort?(fn: (prevSort: string) => string): void;
  className?: string;
  gapPx?: number;
}

export function CommonTableHead<T>({
  table,
  sortColumns,
  sort,
  setSort,
  className,
  gapPx = 16,
}: TheadProps<T>): ReactElement {
  return (
    <div className={cn('w-full', className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        // headerGroup.id 는 보통 1개뿐이지만 그대로 루프
        <div key={headerGroup.id} className="flex items-center">
          {headerGroup.headers.map((header, idx, arr) => {
            const colId = header.column.id;
            const isSortable = sortColumns?.includes(colId);
            const currentSortDir = sort?.endsWith('desc')
              ? 'desc'
              : sort?.endsWith('asc')
                ? 'asc'
                : null;

            const isAsc = isSortable && currentSortDir === 'asc';
            const isDesc = isSortable && currentSortDir === 'desc';

            const headAlign = header.column.columnDef.meta?.headAlign ?? 'center';
            const alignCls =
              headAlign === 'left'
                ? 'text-left'
                : headAlign === 'right'
                  ? 'text-right'
                  : 'text-center';

            const gapStyle = idx < arr.length - 1 ? { marginRight: `${gapPx}px` } : undefined;

            const size = header.column.columnDef.size as number | undefined;
            const widthStyle: React.CSSProperties | undefined = size
              ? { width: `${size}px`, minWidth: `${size}px`, maxWidth: `${size}px` }
              : undefined;

            return (
              <div
                key={header.id}
                // colspan 은 table 에만 해당 → div 구조에선 무시
                style={{ ...widthStyle, ...gapStyle }}
                className={cn(
                  alignCls,
                  'px-2 py-3 text-xs font-semibold',
                  size ? 'shrink-0 grow-0' : 'min-w-0 flex-1',
                  isSortable ? 'cursor-pointer select-none' : 'cursor-default'
                )}
                onClick={() => {
                  if (!isSortable || !setSort) {
                    return;
                  }
                  setSort((prev) => {
                    if (prev === '') {
                      return `${colId},asc`;
                    }
                    if (prev === `${colId},asc`) {
                      return `${colId},desc`;
                    }
                    return '';
                  });
                }}
              >
                <span className="truncate">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </span>
                {isAsc && <span className="ml-1">🔼</span>}
                {isDesc && <span className="ml-1">🔽</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
