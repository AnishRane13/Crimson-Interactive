'use client';

import { useState, useCallback } from 'react';
import styles from './SearchBar.module.scss';

export default function SearchBar({ 
  searchQuery, 
  searchField, 
  onSearchChange, 
  onFieldChange, 
  isLoading = false 
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const searchFields = [
    { value: 'title', label: 'Title' },
    { value: 'authors', label: 'Authors' },
    { value: 'journal', label: 'Journal' },
    { value: 'doi', label: 'DOI' }
  ];

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleFieldChange = useCallback((e) => {
    onFieldChange(e.target.value);
  }, [onFieldChange]);

  const handleClear = useCallback(() => {
    setLocalQuery('');
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <svg 
              className={styles.searchIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={localQuery}
              onChange={handleInputChange}
              placeholder={`Search by ${searchFields.find(f => f.value === searchField)?.label.toLowerCase()}...`}
              className={styles.searchInput}
              disabled={isLoading}
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="search-field" className={styles.fieldLabel}>
            Search in:
          </label>
          <select
            id="search-field"
            value={searchField}
            onChange={handleFieldChange}
            className={styles.fieldSelect}
            disabled={isLoading}
          >
            {searchFields.map(field => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner}></div>
          <span>Searching...</span>
        </div>
      )}

      {searchQuery && (
        <div className={styles.searchInfo}>
          <span>Searching for "{searchQuery}" in {searchFields.find(f => f.value === searchField)?.label}</span>
        </div>
      )}
    </div>
  );
}