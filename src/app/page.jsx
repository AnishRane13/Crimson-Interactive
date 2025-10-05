'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPapers } from '../utils/api';
import { filterPapers, sortPapers, paginatePapers, normalizePaper, debounce } from '../utils/filters';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import styles from './page.module.scss';

export default function Home() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('title');
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await fetchPapers();
        
        if (fetchError) {
          setError(fetchError);
        } else {
          const normalizedPapers = Array.isArray(data) 
            ? data.map(normalizePaper)
            : [];
          
          if (normalizedPapers.length > 0) {
            console.log('First normalized paper:', normalizedPapers[0]);
          }
          
          setPapers(normalizedPapers);
        }
      } catch (err) {
        setError('Failed to load research papers. Please try again later.');
        console.error('Error loading papers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearchChange = useCallback((query) => {
    debouncedSearch(query);
  }, [debouncedSearch]);

  const handleSearchFieldChange = useCallback((field) => {
    setSearchField(field);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((field) => {
    setSortBy(field);
    setCurrentPage(1);
  }, []);

  const handleSortOrderChange = useCallback((order) => {
    setSortOrder(order);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  }, []);

  const handleViewDetails = useCallback((paper) => {
    setSelectedPaper(paper);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPaper(null);
  }, []);

  const processedPapers = useMemo(() => {
    if (!papers.length) return { data: [], meta: { page: 1, pageSize: itemsPerPage, total: 0, totalPages: 0 } };

    const filtered = filterPapers(papers, searchQuery, searchField);
    const sorted = sortPapers(filtered, sortBy, sortOrder);
    const paginated = paginatePapers(sorted, currentPage, itemsPerPage);
    
    return paginated;
  }, [papers, searchQuery, searchField, sortBy, sortOrder, currentPage, itemsPerPage]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2 className={styles.errorTitle}>Error Loading Papers</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Research Paper Browser</h1>
        <p className={styles.subtitle}>
          Discover and explore academic research papers
        </p>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        searchField={searchField}
        onSearchChange={handleSearchChange}
        onFieldChange={handleSearchFieldChange}
        isLoading={loading}
      />

      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onOrderChange={handleSortOrderChange}
        isLoading={loading}
      />

      <main className={styles.main}>
        {loading ? (
          <Loading count={6} message="Loading research papers..." />
        ) : (
          <>
            {processedPapers.data.length > 0 ? (
              <div className={styles.papersGrid}>
                {processedPapers.data.map((paper) => (
                  <Card
                    key={paper.id}
                    paper={paper}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3 className={styles.noResultsTitle}>No Papers Found</h3>
                <p className={styles.noResultsMessage}>
                  {searchQuery 
                    ? `No papers found matching "${searchQuery}" in ${searchField}.`
                    : 'No research papers available at the moment.'
                  }
                </p>
                {searchQuery && (
                  <button
                    className={styles.clearSearchButton}
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}

            {processedPapers.data.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={processedPapers.meta.totalPages}
                totalItems={processedPapers.meta.total}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={loading}
              />
            )}
          </>
        )}
      </main>

      <Modal
        paper={selectedPaper}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
