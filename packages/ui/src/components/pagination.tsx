import { usePagination } from '@hiarc-platform/util';
import { Table } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Button } from './button';

const TablePagination = <T,>({ table }: { table: Table<T> }): ReactElement => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const paginationRange = usePagination({
    totalPageCount: pageCount,
    currentPage,
    siblingCount: 1,
  });

  return (
    <div className="flex flex-row items-center justify-center gap-2 py-4">
      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </Button>
      <ul className="m-0 flex list-none flex-row items-center justify-center gap-2 p-0">
        {paginationRange.map((page, index) => {
          if (page === 'DOTS') {
            return (
              <li key={`dots-${index}`} className="select-none px-2 text-gray-400">
                ...
              </li>
            );
          }
          return (
            <li key={page as number}>
              <Button
                variant="line_secondary"
                size="xs"
                className="h-8 min-w-8 px-2"
                onClick={() => table.setPageIndex((page as number) - 1)}
              >
                {page}
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default TablePagination;
