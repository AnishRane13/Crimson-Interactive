'use client';

import { useState } from 'react';
import styles from './Card.module.scss';

export default function Card({ paper, onViewDetails }) {
  const [imageError, setImageError] = useState(false);
  
  if (!paper) return null;

  const {
    id,
    title,
    authors,
    year,
    journal,
    doi,
    impactFactor,
    pdfUrl,
    abstract
  } = paper;

  const safeTitle = String(title || 'Untitled');
  const safeJournal = String(journal || 'Unknown Journal');
  const safeYear = Number(year || new Date().getFullYear());
  const safeImpactFactor = Number(impactFactor || 0);
  const safeDoi = String(doi || '');
  const safePdfUrl = String(pdfUrl || '');
  const safeAbstract = String(abstract || '');

  const authorsText = Array.isArray(authors) 
    ? authors.join(', ') 
    : authors || 'Unknown Authors';

  const formattedIF = safeImpactFactor ? `IF ${safeImpactFactor.toFixed(2)}` : 'N/A';

  const handleImageError = () => {
    setImageError(true);
  };

  const journalAbbrev = paper.journalAbbreviation || safeJournal || 'J';
  const journalFirstChar = typeof journalAbbrev === 'string' ? journalAbbrev.charAt(0) : 'J';

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.impactFactor}>
          {formattedIF}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          {!imageError ? (
            <img
              src={`https://via.placeholder.com/120x160/4f46e5/ffffff?text=${journalFirstChar}`}
              alt={`${journal} cover`}
              className={styles.coverImage}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>
                {journalFirstChar}
              </span>
            </div>
          )}
        </div>

        <div className={styles.paperDetails}>
          <h3 className={styles.title} title={safeTitle}>
            {safeTitle}
          </h3>

          <p className={styles.authors} title={authorsText}>
            {authorsText}
          </p>

          <div className={styles.metaInfo}>
            <span className={styles.journal}>{safeJournal}</span>
            <span className={styles.year}>{safeYear}</span>
          </div>

          {paper.publisher && (
            <p className={styles.publisher}>
              Publisher: {String(paper.publisher)}
            </p>
          )}

          {safeDoi && (
            <p className={styles.doi} title={safeDoi}>
              DOI: {safeDoi}
            </p>
          )}

          {safeAbstract && (
            <p className={styles.abstract} title={safeAbstract}>
              {safeAbstract.length > 150 
                ? `${safeAbstract.substring(0, 150)}...` 
                : safeAbstract
              }
            </p>
          )}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button
          className={styles.viewDetailsBtn}
          onClick={() => onViewDetails(paper)}
          aria-label={`View details for ${safeTitle}`}
        >
          View Details
        </button>
        
        {safePdfUrl && (
          <a
            href={safePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
            aria-label={`Download PDF for ${safeTitle}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF
          </a>
        )}
      </div>
    </div>
  );
}