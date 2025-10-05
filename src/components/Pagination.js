'use client';

import { useState, useCallback, useMemo } from 'react';
import styles from './Pagination.module.scss';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  isLoading = false
}) {
  const [showPageSizeOptions, setShowPageSizeOptions] = useState(false);

  const pageSizeOptions = [6, 12, 24, 48];

  const { startItem, endItem } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { startItem: start, endItem: end };
  }, [currentPage, itemsPerPage, totalItems]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  }, [currentPage, totalPages, onPageChange, isLoading]);

  const handlePageSizeChange = useCallback((size) => {
    onPageSizeChange(size);
    setShowPageSizeOptions(false);
  }, [onPageSizeChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange, isLoading]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange, isLoading]);

  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.resultsInfo}>
        <span className={styles.resultsText}>
          Showing {startItem}-{endItem} of {totalItems} results
        </span>
        
        <div className={styles.pageSizeContainer}>
          <button
            className={styles.pageSizeButton}
            onClick={() => setShowPageSizeOptions(!showPageSizeOptions)}
            disabled={isLoading}
          >
            {itemsPerPage} per page
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={`${styles.chevron} ${showPageSizeOptions ? styles.rotated : ''}`}
            >
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {showPageSizeOptions && (
            <div className={styles.pageSizeOptions}>
              {pageSizeOptions.map(size => (
                <button
                  key={size}
                  className={`${styles.pageSizeOption} ${itemsPerPage === size ? styles.active : ''}`}
                  onClick={() => handlePageSizeChange(size)}
                >
                  {size} per page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.pageNavigation}>
        <button
          className={`${styles.navButton} ${styles.previousButton}`}
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Previous
        </button>

        <div className={styles.pageNumbers}>
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                onClick={() => handlePageChange(page)}
                disabled={isLoading}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Next page"
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}