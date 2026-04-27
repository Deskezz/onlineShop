import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface PaginationProps {
  page: number;
  totalPages: number;
  prevLabel: string;
  nextLabel: string;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  prevLabel,
  nextLabel,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={prevLabel}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex max-w-full items-center gap-1 overflow-x-auto">
        {pages.map((pageNumber) => {
          if (pageNumber === 'ellipsis-left' || pageNumber === 'ellipsis-right') {
            return (
              <span
                key={pageNumber}
                className="inline-flex h-8 min-w-8 items-center justify-center text-foreground-secondary"
              >
                ...
              </span>
            );
          }

          const isActive = pageNumber === page;
          return (
            <Button
              key={pageNumber}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              aria-label={String(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={nextLabel}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
): Array<number | 'ellipsis-left' | 'ellipsis-right'> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }).map((_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis-right', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis-left', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-right',
    totalPages,
  ];
}
