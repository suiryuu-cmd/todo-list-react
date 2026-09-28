import React from 'react';
import styles from './index.module.css';
import { useTasksContext } from '../../context/tasksContext';

export const UndoToast: React.FC = () => {
  const { removed, undoRemove } = useTasksContext();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {removed.length > 0 && (
        <div className={styles.toast}>
          <span>{removed.length === 1 ? 'Task deleted' : `${removed.length} tasks cleared`}</span>
          <button type="button" className={styles.undo} onClick={undoRemove}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
};
