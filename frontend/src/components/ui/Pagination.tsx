import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  hasMore?: boolean;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasMore = false,
  onPageChange,
  showPageNumbers = true,
  className = '',
}) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = hasMore || (totalPages && currentPage < totalPages);

  const getPageNumbers = () => {
    if (!totalPages) return [];
    
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const buttonBaseClasses = 'p-2 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed';
  const buttonActiveClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300';
  const pageButtonClasses = 'min-w-[40px] h-10 rounded-lg transition-all duration-200';

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Page */}
      {totalPages && totalPages > 5 && (
        <button
          onClick={() => onPageChange(1)}
          disabled={!canGoPrev}
          className={`${buttonBaseClasses} ${buttonActiveClasses} hidden sm:flex`}
          title="First page"
        >
          <FiChevronsLeft className="w-5 h-5" />
        </button>
      )}

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`${buttonBaseClasses} ${buttonActiveClasses} flex items-center gap-1`}
      >
        <FiChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      {showPageNumbers && totalPages && (
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`${pageButtonClasses} ${
                    currentPage === page
                      ? 'bg-purple-600 text-white font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Current Page Indicator (Mobile) */}
      <span className="sm:hidden text-sm text-gray-600 dark:text-gray-400 px-4">
        Page {currentPage}{totalPages ? ` of ${totalPages}` : ''}
      </span>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`${buttonBaseClasses} ${buttonActiveClasses} flex items-center gap-1`}
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Last Page */}
      {totalPages && totalPages > 5 && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className={`${buttonBaseClasses} ${buttonActiveClasses} hidden sm:flex`}
          title="Last page"
        >
          <FiChevronsRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
