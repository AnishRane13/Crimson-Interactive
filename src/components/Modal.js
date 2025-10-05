'use client';

import { useEffect, useCallback } from 'react';
import styles from './Modal.module.scss';

export default function Modal({ paper, isOpen, onClose }) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !paper) return null;

  const {
    title,
    authors,
    year,
    journal,
    doi,
    impactFactor,
    pdfUrl,
    abstract,
    keywords,
    citationCount,
    publishedDate
  } = paper;

  const safeTitle = String(title || 'Untitled');
  const safeJournal = String(journal || 'Unknown Journal');
  const safeYear = Number(year || new Date().getFullYear());
  const safeImpactFactor = Number(impactFactor || 0);
  const safeDoi = String(doi || '');
  const safePdfUrl = String(pdfUrl || '');
  const safeAbstract = String(abstract || '');
  const safeCitationCount = Number(citationCount || 0);

  const authorsText = Array.isArray(authors) 
    ? authors.join(', ') 
    : authors || 'Unknown Authors';

  const keywordsText = Array.isArray(keywords) 
    ? keywords.join(', ') 
    : keywords || '';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div 
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {safeTitle}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.metadata}>
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Authors:</span>
              <span className={styles.metadataValue}>{authorsText}</span>
            </div>
            
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Journal:</span>
              <span className={styles.metadataValue}>{safeJournal}</span>
            </div>
            
            {paper.publisher && (
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>Publisher:</span>
                <span className={styles.metadataValue}>{String(paper.publisher)}</span>
              </div>
            )}
            
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Year:</span>
              <span className={styles.metadataValue}>{safeYear}</span>
            </div>
            
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Impact Factor:</span>
              <span className={styles.metadataValue}>
                {safeImpactFactor ? safeImpactFactor.toFixed(2) : 'N/A'}
              </span>
            </div>
            
            {safeDoi && (
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>DOI:</span>
                <span className={styles.metadataValue}>
                  <a 
                    href={`https://doi.org/${safeDoi}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.doiLink}
                  >
                    {safeDoi}
                  </a>
                </span>
              </div>
            )}
            
            {safeCitationCount > 0 && (
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>Citations:</span>
                <span className={styles.metadataValue}>{safeCitationCount}</span>
              </div>
            )}
            
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Published:</span>
              <span className={styles.metadataValue}>{formatDate(publishedDate)}</span>
            </div>
          </div>

          {safeAbstract && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Abstract</h3>
              <p className={styles.abstract}>{safeAbstract}</p>
            </div>
          )}

          {keywordsText && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Keywords</h3>
              <div className={styles.keywords}>
                {Array.isArray(keywords) ? keywords.map((keyword, index) => (
                  <span key={index} className={styles.keyword}>
                    {keyword}
                  </span>
                )) : (
                  <span className={styles.keyword}>{keywordsText}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          {safePdfUrl && (
            <a
              href={safePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pdfButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
          )}
          
          <button
            className={styles.closeModalButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}