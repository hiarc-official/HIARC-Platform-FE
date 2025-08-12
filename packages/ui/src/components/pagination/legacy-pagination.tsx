import { ReactElement } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';

interface LegacyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  visiblePages?: number;
}

export const LegacyPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  visiblePages = 5,
}: LegacyPaginationProps): ReactElement => {
  const getPageRange = (): number[] => {
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={cn('flex flex-row items-center justify-center gap-2', className)}>
      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        {'<'}
      </Button>

      <ul className="m-0 flex list-none flex-row items-center justify-center gap-2 p-0">
        {pageRange[0] > 1 && (
          <>
            <li>
              <Button
                variant="line_secondary"
                size="xs"
                className="h-8 min-w-8 px-2"
                onClick={() => onPageChange(1)}
              >
                1
              </Button>
            </li>
            {pageRange[0] > 2 && <li className="select-none px-2 text-gray-400">...</li>}
          </>
        )}

        {pageRange.map((page) => (
          <li key={page}>
            <Button
              variant={page === currentPage ? 'fill' : 'line_secondary'}
              size="xs"
              className="h-8 min-w-8 px-2"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}

        {pageRange[pageRange.length - 1] < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && (
              <li className="select-none px-2 text-gray-400">...</li>
            )}
            <li>
              <Button
                variant="line_secondary"
                size="xs"
                className="h-8 min-w-8 px-2"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </li>
          </>
        )}
      </ul>

      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        {'>'}
      </Button>
    </div>
  );
};