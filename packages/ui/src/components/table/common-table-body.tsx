import { flexRender, Row, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

interface TbodyProps<T> {
  table: Table<T>;
  onClick(row: Row<T>): void;
  emptyMessage?: string;
}

const CommonTableBody = <T,>({ emptyMessage, table, onClick }: TbodyProps<T>): ReactElement => {
  const rows = table.getRowModel().rows;
  const headerLength =
    table.getHeaderGroups().map((headerGroup) => headerGroup.headers.length)[0] ?? 1;

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={headerLength} className="h-13 relative text-center">
            {emptyMessage ? emptyMessage : '검색 결과가 없습니다.'}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className="cursor-pointer border-b border-gray-200 transition-colors hover:rounded-sm hover:bg-gray-100"
          onClick={() => onClick(row)}
        >
          {row.getVisibleCells().map((cell) => {
            const bodyAlign = cell.column.columnDef.meta?.bodyAlign || 'center';
            const bodyAlignmentClass =
              bodyAlign === 'left'
                ? 'text-left'
                : bodyAlign === 'right'
                  ? 'text-right'
                  : 'text-center';

            return (
              <td
                key={cell.id}
                style={{
                  width: cell.column.columnDef.size ? `${cell.column.columnDef.size}px` : 'auto',
                  minWidth: cell.column.columnDef.minSize
                    ? `${cell.column.columnDef.minSize}px`
                    : undefined,
                  maxWidth: cell.column.columnDef.maxSize
                    ? `${cell.column.columnDef.maxSize}px`
                    : undefined,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  padding: '0',
                }}
                className={`items-center ${bodyAlignmentClass} h-12`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export { CommonTableBody };
