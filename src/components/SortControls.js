'use client';

import { useState, useCallback } from 'react';
import styles from './SortControls.module.scss';

export default function SortControls({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  onOrderChange, 
  isLoading = false 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortFields = [
    { value: 'year', label: 'Year', icon: '📅' },
    { value: 'title', label: 'Title', icon: '📝' },
    { value: 'impactFactor', label: 'Impact Factor', icon: '⭐' },
    { value: 'authors', label: 'Authors', icon: '👥' },
    { value: 'journal', label: 'Journal', icon: '📚' }
  ];

  const sortOrders = [
    { value: 'desc', label: 'Descending', icon: '↓' },
    { value: 'asc', label: 'Ascending', icon: '↑' }
  ];

  const handleSortFieldChange = useCallback((field) => {
    onSortChange(field);
    setIsExpanded(false);
  }, [onSortChange]);

  const handleSortOrderChange = useCallback((order) => {
    onOrderChange(order);
  }, [onOrderChange]);

  const toggleDropdown = useCallback(() => {
    if (!isLoading) {
      setIsExpanded(!isExpanded);
    }
  }, [isExpanded, isLoading]);

  const currentField = sortFields.find(field => field.value === sortBy) || sortFields[0];
  const currentOrder = sortOrders.find(order => order.value === sortOrder) || sortOrders[0];

  return (
    <div className={styles.sortControls}>
      <div className={styles.sortHeader}>
        <h3 className={styles.sortTitle}>Sort Papers</h3>
        <button
          className={styles.toggleButton}
          onClick={toggleDropdown}
          disabled={isLoading}
          aria-label={isExpanded ? 'Collapse sort options' : 'Expand sort options'}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={`${styles.chevron} ${isExpanded ? styles.rotated : ''}`}
          >
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={styles.sortOptions}>
          <div className={styles.sortSection}>
            <label className={styles.sectionLabel}>Sort by:</label>
            <div className={styles.fieldButtons}>
              {sortFields.map(field => (
                <button
                  key={field.value}
                  className={`${styles.fieldButton} ${sortBy === field.value ? styles.active : ''}`}
                  onClick={() => handleSortFieldChange(field.value)}
                  disabled={isLoading}
                >
                  <span className={styles.fieldIcon}>{field.icon}</span>
                  <span className={styles.fieldLabel}>{field.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortSection}>
            <label className={styles.sectionLabel}>Order:</label>
            <div className={styles.orderButtons}>
              {sortOrders.map(order => (
                <button
                  key={order.value}
                  className={`${styles.orderButton} ${sortOrder === order.value ? styles.active : ''}`}
                  onClick={() => handleSortOrderChange(order.value)}
                  disabled={isLoading}
                >
                  <span className={styles.orderIcon}>{order.icon}</span>
                  <span className={styles.orderLabel}>{order.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.currentSort}>
        <span className={styles.currentLabel}>Currently sorting by:</span>
        <span className={styles.currentValue}>
          {currentField.icon} {currentField.label} {currentOrder.icon}
        </span>
      </div>
    </div>
  );
}