'use client';

import { flexRender, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { cn } from '../../lib/utils';

interface TheadProps<T> {
  table: Table<T>;
  sortColumns?: string[];
  sort?: string;
  setSort?(fn: (prevSort: string) => string): void;
}

const CommonTableHead = <T,>({
  table,
  sortColumns,
  sort,
  setSort,
}: TheadProps<T>): ReactElement => (
  <thead className="border-b border-t border-b-gray-200 border-t-gray-900 bg-white">
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id} className="h-12">
        {headerGroup.headers.map((header, idx, arr) => {
          const colId = header.column.id;
          const isSortable = sortColumns?.includes(colId);
          const currentSortDirection = sort?.endsWith('desc')
            ? 'desc'
            : sort?.endsWith('asc')
              ? 'asc'
              : null;

          const isAsc = isSortable && currentSortDirection === 'asc';
          const isDesc = isSortable && currentSortDirection === 'desc';

          const headAlign = header.column.columnDef.meta?.headAlign || 'center';
          const headAlignmentClass =
            headAlign === 'left'
              ? 'text-left'
              : headAlign === 'right'
                ? 'text-right'
                : 'text-center';

          const marginRightClass = idx < arr.length - 1 ? 'mr-4' : '';

          return (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: header.column.columnDef.size
                  ? `${header.column.columnDef.size}px`
                  : undefined,
                minWidth: header.column.columnDef.minSize
                  ? `${header.column.columnDef.minSize}px`
                  : undefined,
                maxWidth: header.column.columnDef.maxSize
                  ? `${header.column.columnDef.maxSize}px`
                  : undefined,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: 0,
              }}
              className={cn(
                headAlignmentClass,
                isSortable ? 'cursor-pointer select-none' : 'cursor-default',
                marginRightClass,
                'px-2'
              )}
            >
              <div
                className="w-full overflow-hidden text-ellipsis whitespace-normal"
                onClick={() => {
                  if (!sortColumns) {
                    return;
                  }
                  if (isSortable && setSort) {
                    setSort((prevSort: string) => {
                      if (prevSort === '') {
                        return `${colId},asc`;
                      }
                      if (prevSort === `${colId},asc`) {
                        return `${colId},desc`;
                      }
                      return '';
                    });
                  }
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {isAsc && ' 🔼'}
                {isDesc && ' 🔽'}
              </div>
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);

export { CommonTableHead };
