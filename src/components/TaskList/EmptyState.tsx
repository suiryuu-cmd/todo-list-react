import React from 'react';
import styles from './index.module.css';
import { useTasksContext } from '../../context/tasksContext';

const SUGGESTIONS = ['Drink a glass of water', 'Stretch for 5 minutes', 'Plan tomorrow'];

export const EmptyState: React.FC = () => {
  const { addTask } = useTasksContext();

  return (
    <div className={styles.emptyState}>
      <svg className={styles.illustration} viewBox="0 0 160 96" aria-hidden="true">
        <g className={styles.sketchRow}>
          <circle cx="16" cy="18" r="9" fill="var(--accent)" />
          <path d="M11.5 18.5l3 3 6-6.5" fill="none" stroke="var(--accent-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y="14" width="96" height="8" rx="4" fill="var(--muted)" opacity="0.35" />
        </g>
        <g className={styles.sketchRow}>
          <circle cx="16" cy="48" r="8" fill="none" stroke="var(--muted)" strokeWidth="2" opacity="0.6" />
          <rect x="34" y="44" width="120" height="8" rx="4" fill="var(--muted)" opacity="0.25" />
        </g>
        <g className={styles.sketchRow}>
          <circle cx="16" cy="78" r="8" fill="none" stroke="var(--muted)" strokeWidth="2" opacity="0.4" />
          <rect x="34" y="74" width="72" height="8" rx="4" fill="var(--muted)" opacity="0.15" />
        </g>
      </svg>
      <p className={styles.emptyTitle}>Nothing yet. What’s first?</p>
      <p className={styles.emptyHint}>Type above, or start with one of these:</p>
      <div className={styles.chips}>
        {SUGGESTIONS.map(suggestion => (
          <button key={suggestion} type="button" className={styles.chip} onClick={() => addTask(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
