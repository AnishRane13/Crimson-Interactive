'use client';

import styles from './Loading.module.scss';

export default function Loading({ count = 6, message = 'Loading research papers...' }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingMessage}>
        <div className={styles.spinner}></div>
        <span>{message}</span>
      </div>
      
      <div className={styles.skeletonGrid}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonBadge}></div>
            </div>
            
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonImage}></div>
              
              <div className={styles.skeletonDetails}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonAuthors}></div>
                <div className={styles.skeletonMeta}>
                  <div className={styles.skeletonJournal}></div>
                  <div className={styles.skeletonYear}></div>
                </div>
                <div className={styles.skeletonAbstract}></div>
                <div className={styles.skeletonAbstract}></div>
              </div>
            </div>
            
            <div className={styles.skeletonFooter}>
              <div className={styles.skeletonButton}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}