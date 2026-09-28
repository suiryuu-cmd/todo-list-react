import React from 'react';
import styles from './index.module.css';
import { useTasksContext } from '../../context/tasksContext';
import type { Filter } from '../../context/tasksContext';

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'incomplete', label: 'To do' },
  { value: 'completed', label: 'Done' },
];

export const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useTasksContext();

  return (
    <div className={styles.group} role="group" aria-label="Filter tasks">
      {OPTIONS.map(option => (
        <button
          key={option.value}
          type="button"
          className={styles.option}
          aria-pressed={filter === option.value}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
