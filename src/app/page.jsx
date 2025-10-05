"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { fetchPapers } from "../utils/api";

export default function Home() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await fetchPapers();
        if (error) {
          setError(error);
        } else {
          const normalizedPapers = Array.isArray(data)
            ? data.map(normalizePaper)
            : [];
          setPapers(normalizedPapers);
        }
      } catch (error) {
        setError("Failed to load research papers. Please try again later.");
        console.error("Error loading papers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPapers();
  }, []);

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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {papers.map((paper) => (
            <div key={paper.id}>{paper.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
